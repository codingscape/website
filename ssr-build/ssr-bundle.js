module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/codingscape-web/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "/Uqj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _warning = __webpack_require__("XOCG");

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
    (0, _warning2.default)(prompt == null, 'A history supports only one prompt at a time');

    prompt = nextPrompt;

    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          (0, _warning2.default)(false, 'A history needs a getUserConfirmation function in order to use a prompt message');

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);

    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

exports.default = createTransitionManager;

/***/ }),

/***/ "3thq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = __webpack_require__("eW0v");
var React__default = _interopDefault(React);
var ExecutionEnvironment = _interopDefault(__webpack_require__("RKsu"));
var shallowEqual = _interopDefault(__webpack_require__("pz6A"));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }
  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }
  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state = void 0;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = function (_Component) {
      _inherits(SideEffect, _Component);

      function SideEffect() {
        _classCallCheck(this, SideEffect);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      // Try to use displayName of wrapped component
      SideEffect.peek = function peek() {
        return state;
      };

      // Expose canUseDOM so tests can monkeypatch it


      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      SideEffect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
      };

      SideEffect.prototype.componentWillMount = function componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      SideEffect.prototype.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      SideEffect.prototype.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      SideEffect.prototype.render = function render() {
        return React__default.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    }(React.Component);

    SideEffect.displayName = 'SideEffect(' + getDisplayName(WrappedComponent) + ')';
    SideEffect.canUseDOM = ExecutionEnvironment.canUseDOM;

    return SideEffect;
  };
}

module.exports = withSideEffect;

/***/ }),

/***/ "4gcd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var hasBasename = exports.hasBasename = function hasBasename(path, prefix) {
  return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
};

var stripBasename = exports.stripBasename = function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
};

var stripTrailingSlash = exports.stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
};

var parsePath = exports.parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = exports.createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;

  var path = pathname || '/';

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

  return path;
};

/***/ }),

/***/ "5D9O":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__("wVGV")();
}

/***/ }),

/***/ "7YO4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash = void 0;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/* harmony default export */ __webpack_exports__["default"] = (resolvePathname);

/***/ }),

/***/ "Asjh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),

/***/ "J4Nk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(_extends({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var d3_ease_namespaceObject = {};
__webpack_require__.d(d3_ease_namespaceObject, "easeLinear", function() { return linear; });
__webpack_require__.d(d3_ease_namespaceObject, "easeQuad", function() { return quadInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeQuadIn", function() { return quadIn; });
__webpack_require__.d(d3_ease_namespaceObject, "easeQuadOut", function() { return quadOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeQuadInOut", function() { return quadInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeCubic", function() { return cubicInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeCubicIn", function() { return cubicIn; });
__webpack_require__.d(d3_ease_namespaceObject, "easeCubicOut", function() { return cubicOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeCubicInOut", function() { return cubicInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easePoly", function() { return polyInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easePolyIn", function() { return polyIn; });
__webpack_require__.d(d3_ease_namespaceObject, "easePolyOut", function() { return polyOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easePolyInOut", function() { return polyInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeSin", function() { return sinInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeSinIn", function() { return sinIn; });
__webpack_require__.d(d3_ease_namespaceObject, "easeSinOut", function() { return sinOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeSinInOut", function() { return sinInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeExp", function() { return expInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeExpIn", function() { return expIn; });
__webpack_require__.d(d3_ease_namespaceObject, "easeExpOut", function() { return expOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeExpInOut", function() { return expInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeCircle", function() { return circleInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeCircleIn", function() { return circleIn; });
__webpack_require__.d(d3_ease_namespaceObject, "easeCircleOut", function() { return circleOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeCircleInOut", function() { return circleInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeBounce", function() { return bounceOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeBounceIn", function() { return bounceIn; });
__webpack_require__.d(d3_ease_namespaceObject, "easeBounceOut", function() { return bounceOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeBounceInOut", function() { return bounceInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeBack", function() { return backInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeBackIn", function() { return backIn; });
__webpack_require__.d(d3_ease_namespaceObject, "easeBackOut", function() { return backOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeBackInOut", function() { return backInOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeElastic", function() { return elasticOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeElasticIn", function() { return elasticIn; });
__webpack_require__.d(d3_ease_namespaceObject, "easeElasticOut", function() { return elasticOut; });
__webpack_require__.d(d3_ease_namespaceObject, "easeElasticInOut", function() { return elasticInOut; });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// EXTERNAL MODULE: ../node_modules/history/createHashHistory.js
var createHashHistory = __webpack_require__("nqnI");
var createHashHistory_default = /*#__PURE__*/__webpack_require__.n(createHashHistory);

// CONCATENATED MODULE: ../node_modules/@fortawesome/fontawesome-svg-core/index.es.js
/*!
 * Font Awesome Free 5.1.0-11 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
var noop = function noop() {};

var _WINDOW = {};
var _DOCUMENT = {};
var _MUTATION_OBSERVER$1 = null;
var _PERFORMANCE = { mark: noop, measure: noop };

try {
  if (typeof window !== 'undefined') _WINDOW = window;
  if (typeof document !== 'undefined') _DOCUMENT = document;
  if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER$1 = MutationObserver;
  if (typeof performance !== 'undefined') _PERFORMANCE = performance;
} catch (e) {}

var index_es__ref = _WINDOW.navigator || {};
var _ref$userAgent = index_es__ref.userAgent;
var userAgent = _ref$userAgent === undefined ? '' : _ref$userAgent;

var WINDOW = _WINDOW;
var DOCUMENT = _DOCUMENT;
var MUTATION_OBSERVER = _MUTATION_OBSERVER$1;
var PERFORMANCE = _PERFORMANCE;

var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
var UNITS_IN_GRID = 16;
var DEFAULT_FAMILY_PREFIX = 'fa';
var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
var DATA_FA_I2SVG = 'data-fa-i2svg';
var DATA_FA_PSEUDO_ELEMENT = 'data-fa-pseudo-element';
var DATA_PREFIX = 'data-prefix';
var DATA_ICON = 'data-icon';
var HTML_CLASS_I2SVG_BASE_CLASS = 'fontawesome-i2svg';
var TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'];
var PRODUCTION = function () {
  try {
    return "production" === 'production';
  } catch (e) {
    return false;
  }
}();

var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

var ATTRIBUTES_WATCHED_FOR_MUTATION = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'];

var RESERVED_CLASSES = ['xs', 'sm', 'lg', 'fw', 'ul', 'li', 'border', 'pull-left', 'pull-right', 'spin', 'pulse', 'rotate-90', 'rotate-180', 'rotate-270', 'flip-horizontal', 'flip-vertical', 'stack', 'stack-1x', 'stack-2x', 'inverse', 'layers', 'layers-text', 'layers-counter'].concat(oneToTen.map(function (n) {
  return n + 'x';
})).concat(oneToTwenty.map(function (n) {
  return 'w-' + n;
}));

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
};

var initial = WINDOW.FontAwesomeConfig || {};

function getAttrConfig(attr) {
  var element = DOCUMENT.querySelector('script[' + attr + ']');

  if (element) {
    return element.getAttribute(attr);
  }
}

function coerce(val) {
  // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
  // We'll assume that this is an indication that it should be toggled to true
  // For example <script data-search-pseudo-elements src="..."></script>
  if (val === '') return true;
  if (val === 'false') return false;
  if (val === 'true') return true;
  return val;
}

if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
  var attrs = [['data-family-prefix', 'familyPrefix'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];

  attrs.forEach(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        attr = _ref2[0],
        key = _ref2[1];

    var val = coerce(getAttrConfig(attr));

    if (val !== undefined && val !== null) {
      initial[key] = val;
    }
  });
}

var _default = _extends({
  familyPrefix: DEFAULT_FAMILY_PREFIX,
  replacementClass: DEFAULT_REPLACEMENT_CLASS,
  autoReplaceSvg: true,
  autoAddCss: true,
  autoA11y: true,
  searchPseudoElements: false,
  observeMutations: true,
  keepOriginalSource: true,
  measurePerformance: false,
  showMissingIcons: true
}, initial);

if (!_default.autoReplaceSvg) _default.observeMutations = false;

var config = _extends({}, _default);

WINDOW.FontAwesomeConfig = config;

var w = WINDOW || {};

if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];

var namespace = w[NAMESPACE_IDENTIFIER];

var functions = [];
var listener = function listener() {
  DOCUMENT.removeEventListener('DOMContentLoaded', listener);
  loaded = 1;
  functions.map(function (fn) {
    return fn();
  });
};

var loaded = false;

if (IS_DOM) {
  loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);

  if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
}

var domready = function domready(fn) {
  if (!IS_DOM) return;
  loaded ? setTimeout(fn, 0) : functions.push(fn);
};

var d = UNITS_IN_GRID;

var meaninglessTransform = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: false,
  flipY: false
};

function isReserved(name) {
  return ~RESERVED_CLASSES.indexOf(name);
}

function insertCss(css) {
  if (!css || !IS_DOM) {
    return;
  }

  var style = DOCUMENT.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;

  var headChildren = DOCUMENT.head.childNodes;
  var beforeChild = null;

  for (var i = headChildren.length - 1; i > -1; i--) {
    var child = headChildren[i];
    var tagName = (child.tagName || '').toUpperCase();
    if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
      beforeChild = child;
    }
  }

  DOCUMENT.head.insertBefore(style, beforeChild);

  return css;
}

var _uniqueId = 0;

function nextUniqueId() {
  _uniqueId++;

  return _uniqueId;
}

function toArray(obj) {
  var array = [];

  for (var i = (obj || []).length >>> 0; i--;) {
    array[i] = obj[i];
  }

  return array;
}

function classArray(node) {
  if (node.classList) {
    return toArray(node.classList);
  } else {
    return (node.getAttribute('class') || '').split(' ').filter(function (i) {
      return i;
    });
  }
}

function getIconName(familyPrefix, cls) {
  var parts = cls.split('-');
  var prefix = parts[0];
  var iconName = parts.slice(1).join('-');

  if (prefix === familyPrefix && iconName !== '' && !isReserved(iconName)) {
    return iconName;
  } else {
    return null;
  }
}

function htmlEscape(str) {
  return ('' + str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function joinAttributes(attributes) {
  return Object.keys(attributes || {}).reduce(function (acc, attributeName) {
    return acc + (attributeName + '="' + htmlEscape(attributes[attributeName]) + '" ');
  }, '').trim();
}

function joinStyles(styles) {
  return Object.keys(styles || {}).reduce(function (acc, styleName) {
    return acc + (styleName + ': ' + styles[styleName] + ';');
  }, '');
}

function transformIsMeaningful(transform) {
  return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
}

function transformForSvg(_ref) {
  var transform = _ref.transform,
      containerWidth = _ref.containerWidth,
      iconWidth = _ref.iconWidth;

  var outer = {
    transform: 'translate(' + containerWidth / 2 + ' 256)'
  };
  var innerTranslate = 'translate(' + transform.x * 32 + ', ' + transform.y * 32 + ') ';
  var innerScale = 'scale(' + transform.size / 16 * (transform.flipX ? -1 : 1) + ', ' + transform.size / 16 * (transform.flipY ? -1 : 1) + ') ';
  var innerRotate = 'rotate(' + transform.rotate + ' 0 0)';
  var inner = {
    transform: innerTranslate + ' ' + innerScale + ' ' + innerRotate
  };
  var path = {
    transform: 'translate(' + iconWidth / 2 * -1 + ' -256)'
  };
  return {
    outer: outer,
    inner: inner,
    path: path
  };
}

function transformForCss(_ref2) {
  var transform = _ref2.transform,
      _ref2$width = _ref2.width,
      width = _ref2$width === undefined ? UNITS_IN_GRID : _ref2$width,
      _ref2$height = _ref2.height,
      height = _ref2$height === undefined ? UNITS_IN_GRID : _ref2$height,
      _ref2$startCentered = _ref2.startCentered,
      startCentered = _ref2$startCentered === undefined ? false : _ref2$startCentered;

  var val = '';

  if (startCentered && IS_IE) {
    val += 'translate(' + (transform.x / d - width / 2) + 'em, ' + (transform.y / d - height / 2) + 'em) ';
  } else if (startCentered) {
    val += 'translate(calc(-50% + ' + transform.x / d + 'em), calc(-50% + ' + transform.y / d + 'em)) ';
  } else {
    val += 'translate(' + transform.x / d + 'em, ' + transform.y / d + 'em) ';
  }

  val += 'scale(' + transform.size / d * (transform.flipX ? -1 : 1) + ', ' + transform.size / d * (transform.flipY ? -1 : 1) + ') ';
  val += 'rotate(' + transform.rotate + 'deg) ';

  return val;
}

var ALL_SPACE = {
  x: 0,
  y: 0,
  width: '100%',
  height: '100%'
};

var makeIconMasking = function makeIconMasking(_ref) {
  var children = _ref.children,
      attributes = _ref.attributes,
      main = _ref.main,
      mask = _ref.mask,
      transform = _ref.transform;
  var mainWidth = main.width,
      mainPath = main.icon;
  var maskWidth = mask.width,
      maskPath = mask.icon;

  var trans = transformForSvg({ transform: transform, containerWidth: maskWidth, iconWidth: mainWidth });

  var maskRect = {
    tag: 'rect',
    attributes: _extends({}, ALL_SPACE, {
      fill: 'white'
    })
  };
  var maskInnerGroup = {
    tag: 'g',
    attributes: _extends({}, trans.inner),
    children: [{ tag: 'path', attributes: _extends({}, mainPath.attributes, trans.path, { fill: 'black' }) }]
  };
  var maskOuterGroup = {
    tag: 'g',
    attributes: _extends({}, trans.outer),
    children: [maskInnerGroup]
  };
  var maskId = 'mask-' + nextUniqueId();
  var clipId = 'clip-' + nextUniqueId();
  var maskTag = {
    tag: 'mask',
    attributes: _extends({}, ALL_SPACE, {
      id: maskId,
      maskUnits: 'userSpaceOnUse',
      maskContentUnits: 'userSpaceOnUse'
    }),
    children: [maskRect, maskOuterGroup]
  };
  var defs = {
    tag: 'defs',
    children: [{ tag: 'clipPath', attributes: { id: clipId }, children: [maskPath] }, maskTag]
  };

  children.push(defs, { tag: 'rect', attributes: _extends({ fill: 'currentColor', 'clip-path': 'url(#' + clipId + ')', mask: 'url(#' + maskId + ')' }, ALL_SPACE) });

  return {
    children: children,
    attributes: attributes
  };
};

var makeIconStandard = function makeIconStandard(_ref) {
  var children = _ref.children,
      attributes = _ref.attributes,
      main = _ref.main,
      transform = _ref.transform,
      styles = _ref.styles;

  var styleString = joinStyles(styles);

  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }

  if (transformIsMeaningful(transform)) {
    var trans = transformForSvg({ transform: transform, containerWidth: main.width, iconWidth: main.width });
    children.push({
      tag: 'g',
      attributes: _extends({}, trans.outer),
      children: [{
        tag: 'g',
        attributes: _extends({}, trans.inner),
        children: [{
          tag: main.icon.tag,
          children: main.icon.children,
          attributes: _extends({}, main.icon.attributes, trans.path)
        }]
      }]
    });
  } else {
    children.push(main.icon);
  }

  return {
    children: children,
    attributes: attributes
  };
};

var asIcon = function asIcon(_ref) {
  var children = _ref.children,
      main = _ref.main,
      mask = _ref.mask,
      attributes = _ref.attributes,
      styles = _ref.styles,
      transform = _ref.transform;

  if (transformIsMeaningful(transform) && main.found && !mask.found) {
    var width = main.width,
        height = main.height;

    var offset = {
      x: width / height / 2,
      y: 0.5
    };
    attributes['style'] = joinStyles(_extends({}, styles, {
      'transform-origin': offset.x + transform.x / 16 + 'em ' + (offset.y + transform.y / 16) + 'em'
    }));
  }

  return [{
    tag: 'svg',
    attributes: attributes,
    children: children
  }];
};

var asSymbol = function asSymbol(_ref) {
  var prefix = _ref.prefix,
      iconName = _ref.iconName,
      children = _ref.children,
      attributes = _ref.attributes,
      symbol = _ref.symbol;

  var id = symbol === true ? prefix + '-' + config.familyPrefix + '-' + iconName : symbol;

  return [{
    tag: 'svg',
    attributes: {
      style: 'display: none;'
    },
    children: [{
      tag: 'symbol',
      attributes: _extends({}, attributes, { id: id }),
      children: children
    }]
  }];
};

function makeInlineSvgAbstract(params) {
  var _params$icons = params.icons,
      main = _params$icons.main,
      mask = _params$icons.mask,
      prefix = params.prefix,
      iconName = params.iconName,
      transform = params.transform,
      symbol = params.symbol,
      title = params.title,
      extra = params.extra,
      _params$watchable = params.watchable,
      watchable = _params$watchable === undefined ? false : _params$watchable;

  var _ref = mask.found ? mask : main,
      width = _ref.width,
      height = _ref.height;

  var widthClass = 'fa-w-' + Math.ceil(width / height * 16);
  var attrClass = [config.replacementClass, iconName ? config.familyPrefix + '-' + iconName : '', widthClass].filter(function (c) {
    return extra.classes.indexOf(c) === -1;
  }).concat(extra.classes).join(' ');

  var content = {
    children: [],
    attributes: _extends({}, extra.attributes, {
      'data-prefix': prefix,
      'data-icon': iconName,
      'class': attrClass,
      'role': 'img',
      'xmlns': 'http://www.w3.org/2000/svg',
      'viewBox': '0 0 ' + width + ' ' + height
    })
  };

  if (watchable) {
    content.attributes[DATA_FA_I2SVG] = '';
  }

  if (title) content.children.push({ tag: 'title', attributes: { id: content.attributes['aria-labelledby'] || 'title-' + nextUniqueId() }, children: [title] });

  var args = _extends({}, content, {
    prefix: prefix,
    iconName: iconName,
    main: main,
    mask: mask,
    transform: transform,
    symbol: symbol,
    styles: extra.styles
  });

  var _ref2 = mask.found && main.found ? makeIconMasking(args) : makeIconStandard(args),
      children = _ref2.children,
      attributes = _ref2.attributes;

  args.children = children;
  args.attributes = attributes;

  if (symbol) {
    return asSymbol(args);
  } else {
    return asIcon(args);
  }
}

function makeLayersTextAbstract(params) {
  var content = params.content,
      width = params.width,
      height = params.height,
      transform = params.transform,
      title = params.title,
      extra = params.extra,
      _params$watchable2 = params.watchable,
      watchable = _params$watchable2 === undefined ? false : _params$watchable2;

  var attributes = _extends({}, extra.attributes, title ? { 'title': title } : {}, {
    'class': extra.classes.join(' ')
  });

  if (watchable) {
    attributes[DATA_FA_I2SVG] = '';
  }

  var styles = _extends({}, extra.styles);

  if (transformIsMeaningful(transform)) {
    styles['transform'] = transformForCss({ transform: transform, startCentered: true, width: width, height: height });
    styles['-webkit-transform'] = styles['transform'];
  }

  var styleString = joinStyles(styles);

  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }

  var val = [];

  val.push({
    tag: 'span',
    attributes: attributes,
    children: [content]
  });

  if (title) {
    val.push({ tag: 'span', attributes: { class: 'sr-only' }, children: [title] });
  }

  return val;
}

function makeLayersCounterAbstract(params) {
  var content = params.content,
      title = params.title,
      extra = params.extra;

  var attributes = _extends({}, extra.attributes, title ? { 'title': title } : {}, {
    'class': extra.classes.join(' ')
  });

  var styleString = joinStyles(extra.styles);

  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }

  var val = [];

  val.push({
    tag: 'span',
    attributes: attributes,
    children: [content]
  });

  if (title) {
    val.push({ tag: 'span', attributes: { class: 'sr-only' }, children: [title] });
  }

  return val;
}

var noop$2 = function noop() {};
var p = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : { mark: noop$2, measure: noop$2 };
var preamble = 'FA "5.1.0-11"';

var begin = function begin(name) {
  p.mark(preamble + ' ' + name + ' begins');
  return function () {
    return end(name);
  };
};

var end = function end(name) {
  p.mark(preamble + ' ' + name + ' ends');
  p.measure(preamble + ' ' + name, preamble + ' ' + name + ' begins', preamble + ' ' + name + ' ends');
};

var perf = { begin: begin, end: end };

'use strict';

/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */
var bindInternal4 = function bindInternal4(func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
};

'use strict';

/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i,
      key,
      result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[keys[0]];
  } else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }

  return result;
};

var styles$2 = namespace.styles;
var shims = namespace.shims;

var _byUnicode = {};
var _byLigature = {};
var _byOldName = {};

var build = function build() {
  var lookup = function lookup(reducer) {
    return reduce(styles$2, function (o, style, prefix) {
      o[prefix] = reduce(style, reducer, {});
      return o;
    }, {});
  };

  _byUnicode = lookup(function (acc, icon, iconName) {
    acc[icon[3]] = iconName;

    return acc;
  });

  _byLigature = lookup(function (acc, icon, iconName) {
    var ligatures = icon[2];

    acc[iconName] = iconName;

    ligatures.forEach(function (ligature) {
      acc[ligature] = iconName;
    });

    return acc;
  });

  var hasRegular = 'far' in styles$2;

  _byOldName = reduce(shims, function (acc, shim) {
    var oldName = shim[0];
    var prefix = shim[1];
    var iconName = shim[2];

    if (prefix === 'far' && !hasRegular) {
      prefix = 'fas';
    }

    acc[oldName] = { prefix: prefix, iconName: iconName };

    return acc;
  }, {});
};

build();

function byUnicode(prefix, unicode) {
  return _byUnicode[prefix][unicode];
}

function byLigature(prefix, ligature) {
  return _byLigature[prefix][ligature];
}

function byOldName(name) {
  return _byOldName[name] || { prefix: null, iconName: null };
}

var styles$1 = namespace.styles;

var emptyCanonicalIcon = function emptyCanonicalIcon() {
  return { prefix: null, iconName: null, rest: [] };
};

function getCanonicalIcon(values) {
  return values.reduce(function (acc, cls) {
    var iconName = getIconName(config.familyPrefix, cls);

    if (styles$1[cls]) {
      acc.prefix = cls;
    } else if (iconName) {
      var shim = acc.prefix === 'fa' ? byOldName(iconName) : {};

      acc.iconName = shim.iconName || iconName;
      acc.prefix = shim.prefix || acc.prefix;
    } else if (cls !== config.replacementClass && cls.indexOf('fa-w-') !== 0) {
      acc.rest.push(cls);
    }

    return acc;
  }, emptyCanonicalIcon());
}

function iconFromMapping(mapping, prefix, iconName) {
  if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
    return {
      prefix: prefix,
      iconName: iconName,
      icon: mapping[prefix][iconName]
    };
  }
}

function toHtml(abstractNodes) {
  var tag = abstractNodes.tag,
      _abstractNodes$attrib = abstractNodes.attributes,
      attributes = _abstractNodes$attrib === undefined ? {} : _abstractNodes$attrib,
      _abstractNodes$childr = abstractNodes.children,
      children = _abstractNodes$childr === undefined ? [] : _abstractNodes$childr;

  if (typeof abstractNodes === 'string') {
    return htmlEscape(abstractNodes);
  } else {
    return '<' + tag + ' ' + joinAttributes(attributes) + '>' + children.map(toHtml).join('') + '</' + tag + '>';
  }
}

var noop$1 = function noop() {};

function isWatched(node) {
  var i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;

  return typeof i2svg === 'string';
}

function getMutator() {
  if (config.autoReplaceSvg === true) {
    return mutators.replace;
  }

  var mutator = mutators[config.autoReplaceSvg];

  return mutator || mutators.replace;
}

var mutators = {
  replace: function replace(mutation) {
    var node = mutation[0];
    var abstract = mutation[1];
    var newOuterHTML = abstract.map(function (a) {
      return toHtml(a);
    }).join('\n');

    if (node.parentNode && node.outerHTML) {
      node.outerHTML = newOuterHTML + (config.keepOriginalSource && node.tagName.toLowerCase() !== 'svg' ? '<!-- ' + node.outerHTML + ' -->' : '');
    } else if (node.parentNode) {
      var newNode = document.createElement('span');
      node.parentNode.replaceChild(newNode, node);
      newNode.outerHTML = newOuterHTML;
    }
  },
  nest: function nest(mutation) {
    var node = mutation[0];
    var abstract = mutation[1];

    // If we already have a replaced node we do not want to continue nesting within it.
    // Short-circuit to the standard replacement
    if (~classArray(node).indexOf(config.replacementClass)) {
      return mutators.replace(mutation);
    }

    var forSvg = new RegExp(config.familyPrefix + '-.*');

    delete abstract[0].attributes.style;

    var splitClasses = abstract[0].attributes.class.split(' ').reduce(function (acc, cls) {
      if (cls === config.replacementClass || cls.match(forSvg)) {
        acc.toSvg.push(cls);
      } else {
        acc.toNode.push(cls);
      }

      return acc;
    }, { toNode: [], toSvg: [] });

    abstract[0].attributes.class = splitClasses.toSvg.join(' ');

    var newInnerHTML = abstract.map(function (a) {
      return toHtml(a);
    }).join('\n');
    node.setAttribute('class', splitClasses.toNode.join(' '));
    node.setAttribute(DATA_FA_I2SVG, '');
    node.innerHTML = newInnerHTML;
  }
};

function perform(mutations, callback) {
  var callbackFunction = typeof callback === 'function' ? callback : noop$1;

  if (mutations.length === 0) {
    callbackFunction();
  } else {
    var frame = WINDOW.requestAnimationFrame || function (op) {
      return op();
    };

    frame(function () {
      var mutator = getMutator();
      var mark = perf.begin('mutate');

      mutations.map(mutator);

      mark();

      callbackFunction();
    });
  }
}

var index_es_disabled = false;

function disableObservation(operation) {
  index_es_disabled = true;
  operation();
  index_es_disabled = false;
}

var mo = null;

function observe(options) {
  if (!MUTATION_OBSERVER) {
    return;
  }

  if (!config.observeMutations) {
    return;
  }

  var treeCallback = options.treeCallback,
      nodeCallback = options.nodeCallback,
      pseudoElementsCallback = options.pseudoElementsCallback,
      _options$observeMutat = options.observeMutationsRoot,
      observeMutationsRoot = _options$observeMutat === undefined ? DOCUMENT.body : _options$observeMutat;

  mo = new MUTATION_OBSERVER(function (objects) {
    if (index_es_disabled) return;

    toArray(objects).forEach(function (mutationRecord) {
      if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
        if (config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target);
        }

        treeCallback(mutationRecord.target);
      }

      if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {
        pseudoElementsCallback(mutationRecord.target.parentNode);
      }

      if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
        if (mutationRecord.attributeName === 'class') {
          var _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)),
              prefix = _getCanonicalIcon.prefix,
              iconName = _getCanonicalIcon.iconName;

          if (prefix) mutationRecord.target.setAttribute('data-prefix', prefix);
          if (iconName) mutationRecord.target.setAttribute('data-icon', iconName);
        } else {
          nodeCallback(mutationRecord.target);
        }
      }
    });
  });

  if (!IS_DOM) return;

  mo.observe(observeMutationsRoot, {
    childList: true, attributes: true, characterData: true, subtree: true
  });
}

function disconnect() {
  if (!mo) return;

  mo.disconnect();
}

var styleParser = function styleParser(node) {
  var style = node.getAttribute('style');

  var val = [];

  if (style) {
    val = style.split(';').reduce(function (acc, style) {
      var styles = style.split(':');
      var prop = styles[0];
      var value = styles.slice(1);

      if (prop && value.length > 0) {
        acc[prop] = value.join(':').trim();
      }

      return acc;
    }, {});
  }

  return val;
};

function toHex(unicode) {
  var result = '';

  for (var i = 0; i < unicode.length; i++) {
    var hex = unicode.charCodeAt(i).toString(16);
    result += ('000' + hex).slice(-4);
  }

  return result;
}

var classParser = function classParser(node) {
  var existingPrefix = node.getAttribute('data-prefix');
  var existingIconName = node.getAttribute('data-icon');
  var innerText = node.innerText !== undefined ? node.innerText.trim() : '';

  var val = getCanonicalIcon(classArray(node));

  if (existingPrefix && existingIconName) {
    val.prefix = existingPrefix;
    val.iconName = existingIconName;
  }

  if (val.prefix && innerText.length > 1) {
    val.iconName = byLigature(val.prefix, node.innerText);
  } else if (val.prefix && innerText.length === 1) {
    val.iconName = byUnicode(val.prefix, toHex(node.innerText));
  }

  return val;
};

var parseTransformString = function parseTransformString(transformString) {
  var transform = {
    size: 16,
    x: 0,
    y: 0,
    flipX: false,
    flipY: false,
    rotate: 0
  };

  if (!transformString) {
    return transform;
  } else {
    return transformString.toLowerCase().split(' ').reduce(function (acc, n) {
      var parts = n.toLowerCase().split('-');
      var first = parts[0];
      var rest = parts.slice(1).join('-');

      if (first && rest === 'h') {
        acc.flipX = true;
        return acc;
      }

      if (first && rest === 'v') {
        acc.flipY = true;
        return acc;
      }

      rest = parseFloat(rest);

      if (isNaN(rest)) {
        return acc;
      }

      switch (first) {
        case 'grow':
          acc.size = acc.size + rest;
          break;
        case 'shrink':
          acc.size = acc.size - rest;
          break;
        case 'left':
          acc.x = acc.x - rest;
          break;
        case 'right':
          acc.x = acc.x + rest;
          break;
        case 'up':
          acc.y = acc.y - rest;
          break;
        case 'down':
          acc.y = acc.y + rest;
          break;
        case 'rotate':
          acc.rotate = acc.rotate + rest;
          break;
      }

      return acc;
    }, transform);
  }
};

var transformParser = function transformParser(node) {
  return parseTransformString(node.getAttribute('data-fa-transform'));
};

var symbolParser = function symbolParser(node) {
  var symbol = node.getAttribute('data-fa-symbol');

  return symbol === null ? false : symbol === '' ? true : symbol;
};

var attributesParser = function attributesParser(node) {
  var extraAttributes = toArray(node.attributes).reduce(function (acc, attr) {
    if (acc.name !== 'class' && acc.name !== 'style') {
      acc[attr.name] = attr.value;
    }
    return acc;
  }, {});

  var title = node.getAttribute('title');

  if (config.autoA11y) {
    if (title) {
      extraAttributes['aria-labelledby'] = config.replacementClass + '-title-' + nextUniqueId();
    } else {
      extraAttributes['aria-hidden'] = 'true';
    }
  }

  return extraAttributes;
};

var maskParser = function maskParser(node) {
  var mask = node.getAttribute('data-fa-mask');

  if (!mask) {
    return emptyCanonicalIcon();
  } else {
    return getCanonicalIcon(mask.split(' ').map(function (i) {
      return i.trim();
    }));
  }
};

var blankMeta = {
  iconName: null,
  title: null,
  prefix: null,
  transform: meaninglessTransform,
  symbol: false,
  mask: null,
  extra: { classes: [], styles: {}, attributes: {} }
};

function parseMeta(node) {
  var _classParser = classParser(node),
      iconName = _classParser.iconName,
      prefix = _classParser.prefix,
      extraClasses = _classParser.rest;

  var extraStyles = styleParser(node);
  var transform = transformParser(node);
  var symbol = symbolParser(node);
  var extraAttributes = attributesParser(node);
  var mask = maskParser(node);

  return {
    iconName: iconName,
    title: node.getAttribute('title'),
    prefix: prefix,
    transform: transform,
    symbol: symbol,
    mask: mask,
    extra: {
      classes: extraClasses,
      styles: extraStyles,
      attributes: extraAttributes
    }
  };
}

function MissingIcon(error) {
  this.name = 'MissingIcon';
  this.message = error || 'Icon unavailable';
  this.stack = new Error().stack;
}

MissingIcon.prototype = Object.create(Error.prototype);
MissingIcon.prototype.constructor = MissingIcon;

var FILL = { fill: 'currentColor' };
var ANIMATION_BASE = {
  attributeType: 'XML',
  repeatCount: 'indefinite',
  dur: '2s'
};
var RING = {
  tag: 'path',
  attributes: _extends({}, FILL, {
    d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
  })
};
var OPACITY_ANIMATE = _extends({}, ANIMATION_BASE, {
  attributeName: 'opacity'
});
var DOT = {
  tag: 'circle',
  attributes: _extends({}, FILL, {
    cx: '256',
    cy: '364',
    r: '28'
  }),
  children: [{ tag: 'animate', attributes: _extends({}, ANIMATION_BASE, { attributeName: 'r', values: '28;14;28;28;14;28;' }) }, { tag: 'animate', attributes: _extends({}, OPACITY_ANIMATE, { values: '1;0;1;1;0;1;' }) }]
};
var QUESTION = {
  tag: 'path',
  attributes: _extends({}, FILL, {
    opacity: '1',
    d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
  }),
  children: [{ tag: 'animate', attributes: _extends({}, OPACITY_ANIMATE, { values: '1;0;0;0;0;1;' }) }]
};
var EXCLAMATION = {
  tag: 'path',
  attributes: _extends({}, FILL, {
    opacity: '0',
    d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
  }),
  children: [{ tag: 'animate', attributes: _extends({}, OPACITY_ANIMATE, { values: '0;0;1;1;0;0;' }) }]
};

var missing = { tag: 'g', children: [RING, DOT, QUESTION, EXCLAMATION] };

var index_es_styles = namespace.styles;

var LAYERS_TEXT_CLASSNAME = 'fa-layers-text';
var FONT_FAMILY_PATTERN = /Font Awesome 5 (Solid|Regular|Light|Brands)/;
var STYLE_TO_PREFIX = {
  'Solid': 'fas',
  'Regular': 'far',
  'Light': 'fal',
  'Brands': 'fab'
};

function findIcon(iconName, prefix) {
  var val = {
    found: false,
    width: 512,
    height: 512,
    icon: missing
  };

  if (iconName && prefix && index_es_styles[prefix] && index_es_styles[prefix][iconName]) {
    var icon = index_es_styles[prefix][iconName];
    var width = icon[0];
    var height = icon[1];
    var vectorData = icon.slice(4);

    val = {
      found: true,
      width: width,
      height: height,
      icon: { tag: 'path', attributes: { fill: 'currentColor', d: vectorData[0] } }
    };
  } else if (iconName && prefix && !config.showMissingIcons) {
    throw new MissingIcon('Icon is missing for prefix ' + prefix + ' with icon name ' + iconName);
  }

  return val;
}

function generateSvgReplacementMutation(node, nodeMeta) {
  var iconName = nodeMeta.iconName,
      title = nodeMeta.title,
      prefix = nodeMeta.prefix,
      transform = nodeMeta.transform,
      symbol = nodeMeta.symbol,
      mask = nodeMeta.mask,
      extra = nodeMeta.extra;

  return [node, makeInlineSvgAbstract({
    icons: {
      main: findIcon(iconName, prefix),
      mask: findIcon(mask.iconName, mask.prefix)
    },
    prefix: prefix,
    iconName: iconName,
    transform: transform,
    symbol: symbol,
    mask: mask,
    title: title,
    extra: extra,
    watchable: true
  })];
}

function generateLayersText(node, nodeMeta) {
  var title = nodeMeta.title,
      transform = nodeMeta.transform,
      extra = nodeMeta.extra;

  var width = null;
  var height = null;

  if (IS_IE) {
    var computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
    var boundingClientRect = node.getBoundingClientRect();
    width = boundingClientRect.width / computedFontSize;
    height = boundingClientRect.height / computedFontSize;
  }

  if (config.autoA11y && !title) {
    extra.attributes['aria-hidden'] = 'true';
  }

  return [node, makeLayersTextAbstract({
    content: node.innerHTML,
    width: width,
    height: height,
    transform: transform,
    title: title,
    extra: extra,
    watchable: true
  })];
}

function generateMutation(node) {
  var nodeMeta = parseMeta(node);

  if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
    return generateLayersText(node, nodeMeta);
  } else {
    return generateSvgReplacementMutation(node, nodeMeta);
  }
}

function searchPseudoElements(root) {
  if (!IS_DOM) return;

  var end = perf.begin('searchPseudoElements');

  disableObservation(function () {
    toArray(root.querySelectorAll('*')).filter(function (n) {
      return n.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(n.tagName.toUpperCase()) && !n.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!n.parentNode || n.parentNode.tagName !== 'svg');
    }).forEach(function (node) {
      [':before', ':after'].forEach(function (pos) {
        var children = toArray(node.children);
        var alreadyProcessedPseudoElement = children.filter(function (c) {
          return c.getAttribute(DATA_FA_PSEUDO_ELEMENT) === pos;
        })[0];

        var styles = WINDOW.getComputedStyle(node, pos);
        var fontFamily = styles.getPropertyValue('font-family').match(FONT_FAMILY_PATTERN);

        if (alreadyProcessedPseudoElement && !fontFamily) {
          // If we've already processed it but the current computed style does not result in a font-family,
          // that probably means that a class name that was previously present to make the icon has been
          // removed. So we now should delete the icon.
          node.removeChild(alreadyProcessedPseudoElement);
        } else if (fontFamily) {
          var content = styles.getPropertyValue('content');
          var prefix = STYLE_TO_PREFIX[fontFamily[1]];
          var iconName = byUnicode(prefix, toHex(content.length === 3 ? content.substr(1, 1) : content));
          // Only convert the pseudo element in this :before/:after position into an icon if we haven't
          // already done so with the same prefix and iconName
          if (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconName) {
            if (alreadyProcessedPseudoElement) {
              // Delete the old one, since we're replacing it with a new one
              node.removeChild(alreadyProcessedPseudoElement);
            }

            var extra = blankMeta.extra;

            extra.attributes[DATA_FA_PSEUDO_ELEMENT] = pos;
            var abstract = makeInlineSvgAbstract(_extends({}, blankMeta, {
              icons: {
                main: findIcon(iconName, prefix),
                mask: emptyCanonicalIcon()
              },
              prefix: prefix,
              iconName: iconName,
              extra: extra,
              watchable: true
            }));

            var element = DOCUMENT.createElement('svg');

            if (pos === ':before') {
              node.insertBefore(element, node.firstChild);
            } else {
              node.appendChild(element);
            }

            element.outerHTML = abstract.map(function (a) {
              return toHtml(a);
            }).join('\n');
          }
        }
      });
    });
  });

  end();
}

function onTree(root) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!IS_DOM) return;

  var htmlClassList = DOCUMENT.documentElement.classList;
  var hclAdd = function hclAdd(suffix) {
    return htmlClassList.add(HTML_CLASS_I2SVG_BASE_CLASS + '-' + suffix);
  };
  var hclRemove = function hclRemove(suffix) {
    return htmlClassList.remove(HTML_CLASS_I2SVG_BASE_CLASS + '-' + suffix);
  };
  var prefixes = Object.keys(index_es_styles);
  var prefixesDomQuery = ['.' + LAYERS_TEXT_CLASSNAME + ':not([' + DATA_FA_I2SVG + '])'].concat(prefixes.map(function (p) {
    return '.' + p + ':not([' + DATA_FA_I2SVG + '])';
  })).join(', ');

  if (prefixesDomQuery.length === 0) {
    return;
  }

  var candidates = toArray(root.querySelectorAll(prefixesDomQuery));

  if (candidates.length > 0) {
    hclAdd('pending');
    hclRemove('complete');
  } else {
    return;
  }

  var mark = perf.begin('onTree');

  var mutations = candidates.reduce(function (acc, node) {
    try {
      var mutation = generateMutation(node);

      if (mutation) {
        acc.push(mutation);
      }
    } catch (e) {
      if (!PRODUCTION) {
        if (e instanceof MissingIcon) {
          console.error(e);
        }
      }
    }

    return acc;
  }, []);

  mark();

  perform(mutations, function () {
    hclAdd('active');
    hclAdd('complete');
    hclRemove('pending');

    if (typeof callback === 'function') callback();
  });
}

function onNode(node) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var mutation = generateMutation(node);

  if (mutation) {
    perform([mutation], callback);
  }
}

var baseStyles = "svg:not(:root).svg-inline--fa {\n  overflow: visible; }\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -.125em; }\n  .svg-inline--fa.fa-lg {\n    vertical-align: -.225em; }\n  .svg-inline--fa.fa-w-1 {\n    width: 0.0625em; }\n  .svg-inline--fa.fa-w-2 {\n    width: 0.125em; }\n  .svg-inline--fa.fa-w-3 {\n    width: 0.1875em; }\n  .svg-inline--fa.fa-w-4 {\n    width: 0.25em; }\n  .svg-inline--fa.fa-w-5 {\n    width: 0.3125em; }\n  .svg-inline--fa.fa-w-6 {\n    width: 0.375em; }\n  .svg-inline--fa.fa-w-7 {\n    width: 0.4375em; }\n  .svg-inline--fa.fa-w-8 {\n    width: 0.5em; }\n  .svg-inline--fa.fa-w-9 {\n    width: 0.5625em; }\n  .svg-inline--fa.fa-w-10 {\n    width: 0.625em; }\n  .svg-inline--fa.fa-w-11 {\n    width: 0.6875em; }\n  .svg-inline--fa.fa-w-12 {\n    width: 0.75em; }\n  .svg-inline--fa.fa-w-13 {\n    width: 0.8125em; }\n  .svg-inline--fa.fa-w-14 {\n    width: 0.875em; }\n  .svg-inline--fa.fa-w-15 {\n    width: 0.9375em; }\n  .svg-inline--fa.fa-w-16 {\n    width: 1em; }\n  .svg-inline--fa.fa-w-17 {\n    width: 1.0625em; }\n  .svg-inline--fa.fa-w-18 {\n    width: 1.125em; }\n  .svg-inline--fa.fa-w-19 {\n    width: 1.1875em; }\n  .svg-inline--fa.fa-w-20 {\n    width: 1.25em; }\n  .svg-inline--fa.fa-pull-left {\n    margin-right: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-pull-right {\n    margin-left: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-border {\n    height: 1.5em; }\n  .svg-inline--fa.fa-li {\n    width: 2em; }\n  .svg-inline--fa.fa-fw {\n    width: 1.25em; }\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -.125em;\n  width: 1em; }\n  .fa-layers svg.svg-inline--fa {\n    -webkit-transform-origin: center center;\n            transform-origin: center center; }\n\n.fa-layers-text, .fa-layers-counter {\n  display: inline-block;\n  position: absolute;\n  text-align: center; }\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center; }\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: .25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right; }\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left; }\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left; }\n\n.fa-lg {\n  font-size: 1.33333em;\n  line-height: 0.75em;\n  vertical-align: -.0667em; }\n\n.fa-xs {\n  font-size: .75em; }\n\n.fa-sm {\n  font-size: .875em; }\n\n.fa-1x {\n  font-size: 1em; }\n\n.fa-2x {\n  font-size: 2em; }\n\n.fa-3x {\n  font-size: 3em; }\n\n.fa-4x {\n  font-size: 4em; }\n\n.fa-5x {\n  font-size: 5em; }\n\n.fa-6x {\n  font-size: 6em; }\n\n.fa-7x {\n  font-size: 7em; }\n\n.fa-8x {\n  font-size: 8em; }\n\n.fa-9x {\n  font-size: 9em; }\n\n.fa-10x {\n  font-size: 10em; }\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em; }\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0; }\n  .fa-ul > li {\n    position: relative; }\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit; }\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: .1em;\n  padding: .2em .25em .15em; }\n\n.fa-pull-left {\n  float: left; }\n\n.fa-pull-right {\n  float: right; }\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: .3em; }\n\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: .3em; }\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear; }\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8); }\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg); }\n\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg); }\n\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg); }\n\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1); }\n\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1); }\n\n.fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1); }\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  -webkit-filter: none;\n          filter: none; }\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2em; }\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1em; }\n\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2em; }\n\n.fa-inverse {\n  color: #fff; }\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto; }\n";

var css = function css() {
  var dfp = DEFAULT_FAMILY_PREFIX;
  var drc = DEFAULT_REPLACEMENT_CLASS;
  var fp = config.familyPrefix;
  var rc = config.replacementClass;
  var s = baseStyles;

  if (fp !== dfp || rc !== drc) {
    var dPatt = new RegExp('\\.' + dfp + '\\-', 'g');
    var rPatt = new RegExp('\\.' + drc, 'g');

    s = s.replace(dPatt, '.' + fp + '-').replace(rPatt, '.' + rc);
  }

  return s;
};

function define(prefix, icons) {
  var normalized = Object.keys(icons).reduce(function (acc, iconName) {
    var icon = icons[iconName];
    var expanded = !!icon.icon;

    if (expanded) {
      acc[icon.iconName] = icon.icon;
    } else {
      acc[iconName] = icon;
    }
    return acc;
  }, {});

  if (typeof namespace.hooks.addPack === 'function') {
    namespace.hooks.addPack(prefix, normalized);
  } else {
    namespace.styles[prefix] = _extends({}, namespace.styles[prefix] || {}, normalized);
  }

  /**
   * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
   * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
   * for `fas` so we'll easy the upgrade process for our users by automatically defining
   * this as well.
   */
  if (prefix === 'fas') {
    define('fa', icons);
  }
}

var Library = function () {
  function Library() {
    classCallCheck(this, Library);

    this.definitions = {};
  }

  createClass(Library, [{
    key: 'add',
    value: function add() {
      var _this = this;

      for (var _len = arguments.length, definitions = Array(_len), _key = 0; _key < _len; _key++) {
        definitions[_key] = arguments[_key];
      }

      var additions = definitions.reduce(this._pullDefinitions, {});

      Object.keys(additions).forEach(function (key) {
        _this.definitions[key] = _extends({}, _this.definitions[key] || {}, additions[key]);
        define(key, additions[key]);
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.definitions = {};
    }
  }, {
    key: '_pullDefinitions',
    value: function _pullDefinitions(additions, definition) {
      var normalized = definition.prefix && definition.iconName && definition.icon ? { 0: definition } : definition;

      Object.keys(normalized).map(function (key) {
        var _normalized$key = normalized[key],
            prefix = _normalized$key.prefix,
            iconName = _normalized$key.iconName,
            icon = _normalized$key.icon;

        if (!additions[prefix]) additions[prefix] = {};

        additions[prefix][iconName] = icon;
      });

      return additions;
    }
  }]);
  return Library;
}();

function prepIcon(icon) {
  var width = icon[0];
  var height = icon[1];
  var vectorData = icon.slice(4);

  return {
    found: true,
    width: width,
    height: height,
    icon: { tag: 'path', attributes: { fill: 'currentColor', d: vectorData[0] } }
  };
}

function ensureCss() {
  if (config.autoAddCss && !_cssInserted) {
    insertCss(css());
    _cssInserted = true;
  }
}

function apiObject(val, abstractCreator) {
  Object.defineProperty(val, 'abstract', {
    get: abstractCreator
  });

  Object.defineProperty(val, 'html', {
    get: function get() {
      return val.abstract.map(function (a) {
        return toHtml(a);
      });
    }
  });

  Object.defineProperty(val, 'node', {
    get: function get() {
      if (!IS_DOM) return;

      var container = DOCUMENT.createElement('div');
      container.innerHTML = val.html;
      return container.children;
    }
  });

  return val;
}

function findIconDefinition(params) {
  var _params$prefix = params.prefix,
      prefix = _params$prefix === undefined ? 'fa' : _params$prefix,
      iconName = params.iconName;

  if (!iconName) return;

  return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
}

function resolveIcons(next) {
  return function (maybeIconDefinition) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});

    var mask = params.mask;

    if (mask) {
      mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
    }

    return next(iconDefinition, _extends({}, params, { mask: mask }));
  };
}

var library = new Library();

var noAuto = function noAuto() {
  config.autoReplaceSvg = false;
  config.observeMutations = false;

  disconnect();
};

var _cssInserted = false;

var dom = {
  i2svg: function i2svg() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (IS_DOM) {
      ensureCss();

      var _params$node = params.node,
          node = _params$node === undefined ? DOCUMENT : _params$node,
          _params$callback = params.callback,
          callback = _params$callback === undefined ? function () {} : _params$callback;

      if (config.searchPseudoElements) {
        searchPseudoElements(node);
      }

      onTree(node, callback);
    }
  },

  css: css,

  insertCss: function insertCss$$1() {
    if (!_cssInserted) {
      insertCss(css());
      _cssInserted = true;
    }
  },

  watch: function watch() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var autoReplaceSvgRoot = params.autoReplaceSvgRoot,
        observeMutationsRoot = params.observeMutationsRoot;

    if (config.autoReplaceSvg === false) {
      config.autoReplaceSvg = true;
    }

    config.observeMutations = true;

    domready(function () {
      autoReplace({
        autoReplaceSvgRoot: autoReplaceSvgRoot
      });

      observe({
        treeCallback: onTree,
        nodeCallback: onNode,
        pseudoElementsCallback: searchPseudoElements,
        observeMutationsRoot: observeMutationsRoot
      });
    });
  }
};

var parse = {
  transform: function transform(transformString) {
    return parseTransformString(transformString);
  }
};

var index_es_icon = resolveIcons(function (iconDefinition) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$transform = params.transform,
      transform = _params$transform === undefined ? meaninglessTransform : _params$transform,
      _params$symbol = params.symbol,
      symbol = _params$symbol === undefined ? false : _params$symbol,
      _params$mask = params.mask,
      mask = _params$mask === undefined ? null : _params$mask,
      _params$title = params.title,
      title = _params$title === undefined ? null : _params$title,
      _params$classes = params.classes,
      classes = _params$classes === undefined ? [] : _params$classes,
      _params$attributes = params.attributes,
      attributes = _params$attributes === undefined ? {} : _params$attributes,
      _params$styles = params.styles,
      styles = _params$styles === undefined ? {} : _params$styles;

  if (!iconDefinition) return;

  var prefix = iconDefinition.prefix,
      iconName = iconDefinition.iconName,
      icon = iconDefinition.icon;

  return apiObject(_extends({ type: 'icon' }, iconDefinition), function () {
    ensureCss();

    if (config.autoA11y) {
      if (title) {
        attributes['aria-labelledby'] = config.replacementClass + '-title-' + nextUniqueId();
      } else {
        attributes['aria-hidden'] = 'true';
      }
    }

    return makeInlineSvgAbstract({
      icons: {
        main: prepIcon(icon),
        mask: mask ? prepIcon(mask.icon) : { found: false, width: null, height: null, icon: {} }
      },
      prefix: prefix,
      iconName: iconName,
      transform: _extends({}, meaninglessTransform, transform),
      symbol: symbol,
      title: title,
      extra: {
        attributes: attributes,
        styles: styles,
        classes: classes
      }
    });
  });
});

var index_es_text = function text(content) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$transform2 = params.transform,
      transform = _params$transform2 === undefined ? meaninglessTransform : _params$transform2,
      _params$title2 = params.title,
      title = _params$title2 === undefined ? null : _params$title2,
      _params$classes2 = params.classes,
      classes = _params$classes2 === undefined ? [] : _params$classes2,
      _params$attributes2 = params.attributes,
      attributes = _params$attributes2 === undefined ? {} : _params$attributes2,
      _params$styles2 = params.styles,
      styles = _params$styles2 === undefined ? {} : _params$styles2;

  return apiObject({ type: 'text', content: content }, function () {
    ensureCss();

    return makeLayersTextAbstract({
      content: content,
      transform: _extends({}, meaninglessTransform, transform),
      title: title,
      extra: {
        attributes: attributes,
        styles: styles,
        classes: [config.familyPrefix + '-layers-text'].concat(toConsumableArray(classes))
      }
    });
  });
};

var counter = function counter(content) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$title3 = params.title,
      title = _params$title3 === undefined ? null : _params$title3,
      _params$classes3 = params.classes,
      classes = _params$classes3 === undefined ? [] : _params$classes3,
      _params$attributes3 = params.attributes,
      attributes = _params$attributes3 === undefined ? {} : _params$attributes3,
      _params$styles3 = params.styles,
      styles = _params$styles3 === undefined ? {} : _params$styles3;

  return apiObject({ type: 'counter', content: content }, function () {
    ensureCss();

    return makeLayersCounterAbstract({
      content: content.toString(),
      title: title,
      extra: {
        attributes: attributes,
        styles: styles,
        classes: [config.familyPrefix + '-layers-counter'].concat(toConsumableArray(classes))
      }
    });
  });
};

var index_es_layer = function layer(assembler) {
  return apiObject({ type: 'layer' }, function () {
    ensureCss();

    var children = [];

    assembler(function (args) {
      Array.isArray(args) ? args.map(function (a) {
        children = children.concat(a.abstract);
      }) : children = children.concat(args.abstract);
    });

    return [{
      tag: 'span',
      attributes: { class: config.familyPrefix + '-layers' },
      children: children
    }];
  });
};

var api = {
  noAuto: noAuto,
  config: config,
  dom: dom,
  library: library,
  parse: parse,
  findIconDefinition: findIconDefinition,
  icon: index_es_icon,
  text: index_es_text,
  counter: counter,
  layer: index_es_layer,
  toHtml: toHtml
};

var autoReplace = function autoReplace() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _params$autoReplaceSv = params.autoReplaceSvgRoot,
      autoReplaceSvgRoot = _params$autoReplaceSv === undefined ? DOCUMENT : _params$autoReplaceSv;

  if (Object.keys(namespace.styles).length > 0 && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({ node: autoReplaceSvgRoot });
};


// CONCATENATED MODULE: ../node_modules/@fortawesome/free-solid-svg-icons/index.es.js
/*!
 * Font Awesome Free 5.1.0-11 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
var prefix = "fas";
var faAddressBook = { prefix: 'fas', iconName: 'address-book', icon: [448, 512, [], "f2b9", "M436 160c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20zm-228-32c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H118.4C106 384 96 375.4 96 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2z"] };
var faAddressCard = { prefix: 'fas', iconName: 'address-card', icon: [576, 512, [], "f2bb", "M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-352 96c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H86.4C74 384 64 375.4 64 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2zM512 312c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"] };
var faAdjust = { prefix: 'fas', iconName: 'adjust', icon: [512, 512, [], "f042", "M8 256c0 136.966 111.033 248 248 248s248-111.034 248-248S392.966 8 256 8 8 119.033 8 256zm248 184V72c101.705 0 184 82.311 184 184 0 101.705-82.311 184-184 184z"] };
var faAlignCenter = { prefix: 'fas', iconName: 'align-center', icon: [448, 512, [], "f037", "M352 44v40c0 8.837-7.163 16-16 16H112c-8.837 0-16-7.163-16-16V44c0-8.837 7.163-16 16-16h224c8.837 0 16 7.163 16 16zM16 228h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 256h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm320-200H112c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16h224c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16z"] };
var faAlignJustify = { prefix: 'fas', iconName: 'align-justify', icon: [448, 512, [], "f039", "M0 84V44c0-8.837 7.163-16 16-16h416c8.837 0 16 7.163 16 16v40c0 8.837-7.163 16-16 16H16c-8.837 0-16-7.163-16-16zm16 144h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 256h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0-128h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"] };
var faAlignLeft = { prefix: 'fas', iconName: 'align-left', icon: [448, 512, [], "f036", "M288 44v40c0 8.837-7.163 16-16 16H16c-8.837 0-16-7.163-16-16V44c0-8.837 7.163-16 16-16h256c8.837 0 16 7.163 16 16zM0 172v40c0 8.837 7.163 16 16 16h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16zm16 312h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm256-200H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16h256c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16z"] };
var faAlignRight = { prefix: 'fas', iconName: 'align-right', icon: [448, 512, [], "f038", "M160 84V44c0-8.837 7.163-16 16-16h256c8.837 0 16 7.163 16 16v40c0 8.837-7.163 16-16 16H176c-8.837 0-16-7.163-16-16zM16 228h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 256h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm160-128h256c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H176c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"] };
var faAllergies = { prefix: 'fas', iconName: 'allergies', icon: [448, 512, [], "f461", "M416 112c-17.6 0-32 14.4-32 32v72c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8V64c0-17.6-14.4-32-32-32s-32 14.4-32 32v152c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8V32c0-17.6-14.4-32-32-32s-32 14.4-32 32v184c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8V64c0-17.6-14.4-32-32-32S96 46.4 96 64v241l-23.6-32.5c-13-17.9-38-21.8-55.9-8.8s-21.8 38-8.8 55.9l125.6 172.7c9 12.4 23.5 19.8 38.8 19.8h197.6c22.3 0 41.6-15.3 46.7-37l26.5-112.7c3.2-13.7 4.9-28.3 5.1-42.3V144c0-17.6-14.4-32-32-32zM176 416c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm0-96c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm64 128c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm0-96c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm64 32c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm32 64c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm32-128c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z"] };
var faAmbulance = { prefix: 'fas', iconName: 'ambulance', icon: [640, 512, [], "f0f9", "M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm144-248c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48zm176 248c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"] };
var faAmericanSignLanguageInterpreting = { prefix: 'fas', iconName: 'american-sign-language-interpreting', icon: [640, 512, [], "f2a3", "M290.547 189.039c-20.295-10.149-44.147-11.199-64.739-3.89 42.606 0 71.208 20.475 85.578 50.576 8.576 17.899-5.148 38.071-23.617 38.071 18.429 0 32.211 20.136 23.617 38.071-14.725 30.846-46.123 50.854-80.298 50.854-.557 0-94.471-8.615-94.471-8.615l-66.406 33.347c-9.384 4.693-19.815.379-23.895-7.781L1.86 290.747c-4.167-8.615-1.111-18.897 6.946-23.621l58.072-33.069L108 159.861c6.39-57.245 34.731-109.767 79.743-146.726 11.391-9.448 28.341-7.781 37.51 3.613 9.446 11.394 7.78 28.067-3.612 37.516-12.503 10.559-23.618 22.509-32.509 35.57 21.672-14.729 46.679-24.732 74.186-28.067 14.725-1.945 28.063 8.336 29.73 23.065 1.945 14.728-8.336 28.067-23.062 29.734-16.116 1.945-31.12 7.503-44.178 15.284 26.114-5.713 58.712-3.138 88.079 11.115 13.336 6.669 18.893 22.509 12.224 35.848-6.389 13.06-22.504 18.617-35.564 12.226zm-27.229 69.472c-6.112-12.505-18.338-20.286-32.231-20.286a35.46 35.46 0 0 0-35.565 35.57c0 21.428 17.808 35.57 35.565 35.57 13.893 0 26.119-7.781 32.231-20.286 4.446-9.449 13.614-15.006 23.339-15.284-9.725-.277-18.893-5.835-23.339-15.284zm374.821-37.237c4.168 8.615 1.111 18.897-6.946 23.621l-58.071 33.069L532 352.16c-6.39 57.245-34.731 109.767-79.743 146.726-10.932 9.112-27.799 8.144-37.51-3.613-9.446-11.394-7.78-28.067 3.613-37.516 12.503-10.559 23.617-22.509 32.508-35.57-21.672 14.729-46.679 24.732-74.186 28.067-10.021 2.506-27.552-5.643-29.73-23.065-1.945-14.728 8.336-28.067 23.062-29.734 16.116-1.946 31.12-7.503 44.178-15.284-26.114 5.713-58.712 3.138-88.079-11.115-13.336-6.669-18.893-22.509-12.224-35.848 6.389-13.061 22.505-18.619 35.565-12.227 20.295 10.149 44.147 11.199 64.739 3.89-42.606 0-71.208-20.475-85.578-50.576-8.576-17.899 5.148-38.071 23.617-38.071-18.429 0-32.211-20.136-23.617-38.071 14.033-29.396 44.039-50.887 81.966-50.854l92.803 8.615 66.406-33.347c9.408-4.704 19.828-.354 23.894 7.781l44.455 88.926zm-229.227-18.618c-13.893 0-26.119 7.781-32.231 20.286-4.446 9.449-13.614 15.006-23.339 15.284 9.725.278 18.893 5.836 23.339 15.284 6.112 12.505 18.338 20.286 32.231 20.286a35.46 35.46 0 0 0 35.565-35.57c0-21.429-17.808-35.57-35.565-35.57z"] };
var faAnchor = { prefix: 'fas', iconName: 'anchor', icon: [576, 512, [], "f13d", "M12.971 352h32.394C67.172 454.735 181.944 512 288 512c106.229 0 220.853-57.38 242.635-160h32.394c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.029 67.029c-7.56 7.56-2.206 20.485 8.485 20.485h35.146c-20.29 54.317-84.963 86.588-144.117 94.015V256h52c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-52v-5.47c37.281-13.178 63.995-48.725 64-90.518C384.005 43.772 341.605.738 289.37.01 235.723-.739 192 42.525 192 96c0 41.798 26.716 77.35 64 90.53V192h-52c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h52v190.015c-58.936-7.399-123.82-39.679-144.117-94.015h35.146c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0L4.485 331.515C-3.074 339.074 2.28 352 12.971 352zM288 64c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32z"] };
var faAngleDoubleDown = { prefix: 'fas', iconName: 'angle-double-down', icon: [320, 512, [], "f103", "M143 256.3L7 120.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0L313 86.3c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.4 9.5-24.6 9.5-34 .1zm34 192l136-136c9.4-9.4 9.4-24.6 0-33.9l-22.6-22.6c-9.4-9.4-24.6-9.4-33.9 0L160 352.1l-96.4-96.4c-9.4-9.4-24.6-9.4-33.9 0L7 278.3c-9.4 9.4-9.4 24.6 0 33.9l136 136c9.4 9.5 24.6 9.5 34 .1z"] };
var faAngleDoubleLeft = { prefix: 'fas', iconName: 'angle-double-left', icon: [448, 512, [], "f100", "M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"] };
var faAngleDoubleRight = { prefix: 'fas', iconName: 'angle-double-right', icon: [448, 512, [], "f101", "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"] };
var faAngleDoubleUp = { prefix: 'fas', iconName: 'angle-double-up', icon: [320, 512, [], "f102", "M177 255.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 351.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 425.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1zm-34-192L7 199.7c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l96.4-96.4 96.4 96.4c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9l-136-136c-9.2-9.4-24.4-9.4-33.8 0z"] };
var faAngleDown = { prefix: 'fas', iconName: 'angle-down', icon: [320, 512, [], "f107", "M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"] };
var faAngleLeft = { prefix: 'fas', iconName: 'angle-left', icon: [256, 512, [], "f104", "M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"] };
var faAngleRight = { prefix: 'fas', iconName: 'angle-right', icon: [256, 512, [], "f105", "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"] };
var faAngleUp = { prefix: 'fas', iconName: 'angle-up', icon: [320, 512, [], "f106", "M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"] };
var faArchive = { prefix: 'fas', iconName: 'archive', icon: [512, 512, [], "f187", "M32 448c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V160H32v288zm160-212c0-6.6 5.4-12 12-12h104c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-8zM480 32H32C14.3 32 0 46.3 0 64v48c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16V64c0-17.7-14.3-32-32-32z"] };
var faArrowAltCircleDown = { prefix: 'fas', iconName: 'arrow-alt-circle-down', icon: [512, 512, [], "f358", "M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM212 140v116h-70.9c-10.7 0-16.1 13-8.5 20.5l114.9 114.3c4.7 4.7 12.2 4.7 16.9 0l114.9-114.3c7.6-7.6 2.2-20.5-8.5-20.5H300V140c0-6.6-5.4-12-12-12h-64c-6.6 0-12 5.4-12 12z"] };
var faArrowAltCircleLeft = { prefix: 'fas', iconName: 'arrow-alt-circle-left', icon: [512, 512, [], "f359", "M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm116-292H256v-70.9c0-10.7-13-16.1-20.5-8.5L121.2 247.5c-4.7 4.7-4.7 12.2 0 16.9l114.3 114.9c7.6 7.6 20.5 2.2 20.5-8.5V300h116c6.6 0 12-5.4 12-12v-64c0-6.6-5.4-12-12-12z"] };
var faArrowAltCircleRight = { prefix: 'fas', iconName: 'arrow-alt-circle-right', icon: [512, 512, [], "f35a", "M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z"] };
var faArrowAltCircleUp = { prefix: 'fas', iconName: 'arrow-alt-circle-up', icon: [512, 512, [], "f35b", "M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm292 116V256h70.9c10.7 0 16.1-13 8.5-20.5L264.5 121.2c-4.7-4.7-12.2-4.7-16.9 0l-115 114.3c-7.6 7.6-2.2 20.5 8.5 20.5H212v116c0 6.6 5.4 12 12 12h64c6.6 0 12-5.4 12-12z"] };
var faArrowCircleDown = { prefix: 'fas', iconName: 'arrow-circle-down', icon: [512, 512, [], "f0ab", "M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-143.6-28.9L288 302.6V120c0-13.3-10.7-24-24-24h-16c-13.3 0-24 10.7-24 24v182.6l-72.4-75.5c-9.3-9.7-24.8-9.9-34.3-.4l-10.9 11c-9.4 9.4-9.4 24.6 0 33.9L239 404.3c9.4 9.4 24.6 9.4 33.9 0l132.7-132.7c9.4-9.4 9.4-24.6 0-33.9l-10.9-11c-9.5-9.5-25-9.3-34.3.4z"] };
var faArrowCircleLeft = { prefix: 'fas', iconName: 'arrow-circle-left', icon: [512, 512, [], "f0a8", "M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"] };
var faArrowCircleRight = { prefix: 'fas', iconName: 'arrow-circle-right', icon: [512, 512, [], "f0a9", "M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"] };
var faArrowCircleUp = { prefix: 'fas', iconName: 'arrow-circle-up', icon: [512, 512, [], "f0aa", "M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm143.6 28.9l72.4-75.5V392c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V209.4l72.4 75.5c9.3 9.7 24.8 9.9 34.3.4l10.9-11c9.4-9.4 9.4-24.6 0-33.9L273 107.7c-9.4-9.4-24.6-9.4-33.9 0L106.3 240.4c-9.4 9.4-9.4 24.6 0 33.9l10.9 11c9.6 9.5 25.1 9.3 34.4-.4z"] };
var faArrowDown = { prefix: 'fas', iconName: 'arrow-down', icon: [448, 512, [], "f063", "M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"] };
var faArrowLeft = { prefix: 'fas', iconName: 'arrow-left', icon: [448, 512, [], "f060", "M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"] };
var faArrowRight = { prefix: 'fas', iconName: 'arrow-right', icon: [448, 512, [], "f061", "M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"] };
var faArrowUp = { prefix: 'fas', iconName: 'arrow-up', icon: [448, 512, [], "f062", "M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"] };
var faArrowsAlt = { prefix: 'fas', iconName: 'arrows-alt', icon: [512, 512, [], "f0b2", "M352.201 425.775l-79.196 79.196c-9.373 9.373-24.568 9.373-33.941 0l-79.196-79.196c-15.119-15.119-4.411-40.971 16.971-40.97h51.162L228 284H127.196v51.162c0 21.382-25.851 32.09-40.971 16.971L7.029 272.937c-9.373-9.373-9.373-24.569 0-33.941L86.225 159.8c15.119-15.119 40.971-4.411 40.971 16.971V228H228V127.196h-51.23c-21.382 0-32.09-25.851-16.971-40.971l79.196-79.196c9.373-9.373 24.568-9.373 33.941 0l79.196 79.196c15.119 15.119 4.411 40.971-16.971 40.971h-51.162V228h100.804v-51.162c0-21.382 25.851-32.09 40.97-16.971l79.196 79.196c9.373 9.373 9.373 24.569 0 33.941L425.773 352.2c-15.119 15.119-40.971 4.411-40.97-16.971V284H284v100.804h51.23c21.382 0 32.09 25.851 16.971 40.971z"] };
var faArrowsAltH = { prefix: 'fas', iconName: 'arrows-alt-h', icon: [512, 512, [], "f337", "M377.941 169.941V216H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.568 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296h243.882v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.568 0-33.941l-86.059-86.059c-15.119-15.12-40.971-4.412-40.971 16.97z"] };
var faArrowsAltV = { prefix: 'fas', iconName: 'arrows-alt-v', icon: [256, 512, [], "f338", "M214.059 377.941H168V134.059h46.059c21.382 0 32.09-25.851 16.971-40.971L144.971 7.029c-9.373-9.373-24.568-9.373-33.941 0L24.971 93.088c-15.119 15.119-4.411 40.971 16.971 40.971H88v243.882H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.568 9.373 33.941 0l86.059-86.059c15.12-15.119 4.412-40.971-16.97-40.971z"] };
var faAssistiveListeningSystems = { prefix: 'fas', iconName: 'assistive-listening-systems', icon: [512, 512, [], "f2a2", "M216 260c0 15.464-12.536 28-28 28s-28-12.536-28-28c0-44.112 35.888-80 80-80s80 35.888 80 80c0 15.464-12.536 28-28 28s-28-12.536-28-28c0-13.234-10.767-24-24-24s-24 10.766-24 24zm24-176c-97.047 0-176 78.953-176 176 0 15.464 12.536 28 28 28s28-12.536 28-28c0-66.168 53.832-120 120-120s120 53.832 120 120c0 75.164-71.009 70.311-71.997 143.622L288 404c0 28.673-23.327 52-52 52-15.464 0-28 12.536-28 28s12.536 28 28 28c59.475 0 107.876-48.328 108-107.774.595-34.428 72-48.24 72-144.226 0-97.047-78.953-176-176-176zm-80 236c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zM32 448c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm480-187.993c0-1.518-.012-3.025-.045-4.531C510.076 140.525 436.157 38.47 327.994 1.511c-14.633-4.998-30.549 2.809-35.55 17.442-5 14.633 2.81 30.549 17.442 35.55 85.906 29.354 144.61 110.513 146.077 201.953l.003.188c.026 1.118.033 2.236.033 3.363 0 15.464 12.536 28 28 28s28.001-12.536 28.001-28zM152.971 439.029l-80-80L39.03 392.97l80 80 33.941-33.941z"] };
var faAsterisk = { prefix: 'fas', iconName: 'asterisk', icon: [512, 512, [], "f069", "M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z"] };
var faAt = { prefix: 'fas', iconName: 'at', icon: [512, 512, [], "f1fa", "M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z"] };
var faAudioDescription = { prefix: 'fas', iconName: 'audio-description', icon: [512, 512, [], "f29e", "M162.925 238.709l8.822 30.655h-25.606l9.041-30.652c1.277-4.421 2.651-9.994 3.872-15.245 1.22 5.251 2.594 10.823 3.871 15.242zm166.474-32.099h-14.523v98.781h14.523c29.776 0 46.175-17.678 46.175-49.776 0-32.239-17.49-49.005-46.175-49.005zM512 112v288c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48zM245.459 336.139l-57.097-168A12.001 12.001 0 0 0 177 160h-35.894a12.001 12.001 0 0 0-11.362 8.139l-57.097 168C70.003 343.922 75.789 352 84.009 352h29.133a12 12 0 0 0 11.535-8.693l8.574-29.906h51.367l8.793 29.977A12 12 0 0 0 204.926 352h29.172c8.22 0 14.006-8.078 11.361-15.861zm184.701-80.525c0-58.977-37.919-95.614-98.96-95.614h-57.366c-6.627 0-12 5.373-12 12v168c0 6.627 5.373 12 12 12H331.2c61.041 0 98.96-36.933 98.96-96.386z"] };
var faBackward = { prefix: 'fas', iconName: 'backward', icon: [512, 512, [], "f04a", "M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z"] };
var faBalanceScale = { prefix: 'fas', iconName: 'balance-scale', icon: [640, 512, [], "f24e", "M256 336h-.02c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0C-2.06 328.75.02 320.33.02 336H0c0 44.18 57.31 80 128 80s128-35.82 128-80zM128 176l72 144H56l72-144zm511.98 160c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0-87.12 174.26-85.04 165.84-85.04 181.51H384c0 44.18 57.31 80 128 80s128-35.82 128-80h-.02zM440 320l72-144 72 144H440zm88 128H352V153.25c23.51-10.29 41.16-31.48 46.39-57.25H528c8.84 0 16-7.16 16-16V48c0-8.84-7.16-16-16-16H383.64C369.04 12.68 346.09 0 320 0s-49.04 12.68-63.64 32H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h129.61c5.23 25.76 22.87 46.96 46.39 57.25V448H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"] };
var faBan = { prefix: 'fas', iconName: 'ban', icon: [512, 512, [], "f05e", "M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"] };
var faBandAid = { prefix: 'fas', iconName: 'band-aid', icon: [640, 512, [], "f462", "M0 160v192c0 35.3 28.7 64 64 64h96V96H64c-35.3 0-64 28.7-64 64zm576-64h-96v320h96c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64zM192 416h256V96H192v320zm176-232c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm0 96c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm-96-96c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm0 96c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24z"] };
var faBarcode = { prefix: 'fas', iconName: 'barcode', icon: [512, 512, [], "f02a", "M0 448V64h18v384H0zm26.857-.273V64H36v383.727h-9.143zm27.143 0V64h8.857v383.727H54zm44.857 0V64h8.857v383.727h-8.857zm36 0V64h17.714v383.727h-17.714zm44.857 0V64h8.857v383.727h-8.857zm18 0V64h8.857v383.727h-8.857zm18 0V64h8.857v383.727h-8.857zm35.715 0V64h18v383.727h-18zm44.857 0V64h18v383.727h-18zm35.999 0V64h18.001v383.727h-18.001zm36.001 0V64h18.001v383.727h-18.001zm26.857 0V64h18v383.727h-18zm45.143 0V64h26.857v383.727h-26.857zm35.714 0V64h9.143v383.727H476zm18 .273V64h18v384h-18z"] };
var faBars = { prefix: 'fas', iconName: 'bars', icon: [448, 512, [], "f0c9", "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"] };
var faBaseballBall = { prefix: 'fas', iconName: 'baseball-ball', icon: [496, 512, [], "f433", "M368.5 363.9l28.8-13.9c11.1 22.9 26 43.2 44.1 60.9 34-42.5 54.5-96.3 54.5-154.9 0-58.5-20.4-112.2-54.2-154.6-17.8 17.3-32.6 37.1-43.6 59.5l-28.7-14.1c12.8-26 30-49 50.8-69C375.6 34.7 315 8 248 8 181.1 8 120.5 34.6 75.9 77.7c20.7 19.9 37.9 42.9 50.7 68.8l-28.7 14.1c-11-22.3-25.7-42.1-43.5-59.4C20.4 143.7 0 197.4 0 256c0 58.6 20.4 112.3 54.4 154.7 18.2-17.7 33.2-38 44.3-61l28.8 13.9c-12.9 26.7-30.3 50.3-51.5 70.7 44.5 43.1 105.1 69.7 172 69.7 66.8 0 127.3-26.5 171.9-69.5-21.1-20.4-38.5-43.9-51.4-70.6zm-228.3-32l-30.5-9.8c14.9-46.4 12.7-93.8-.6-134l30.4-10c15 45.6 18 99.9.7 153.8zm216.3-153.4l30.4 10c-13.2 40.1-15.5 87.5-.6 134l-30.5 9.8c-17.3-54-14.3-108.3.7-153.8z"] };
var faBasketballBall = { prefix: 'fas', iconName: 'basketball-ball', icon: [496, 512, [], "f434", "M212.3 10.3c-43.8 6.3-86.2 24.1-122.2 53.8l77.4 77.4c27.8-35.8 43.3-81.2 44.8-131.2zM248 222L405.9 64.1c-42.4-35-93.6-53.5-145.5-56.1-1.2 63.9-21.5 122.3-58.7 167.7L248 222zM56.1 98.1c-29.7 36-47.5 78.4-53.8 122.2 50-1.5 95.5-17 131.2-44.8L56.1 98.1zm272.2 204.2c45.3-37.1 103.7-57.4 167.7-58.7-2.6-51.9-21.1-103.1-56.1-145.5L282 256l46.3 46.3zM248 290L90.1 447.9c42.4 34.9 93.6 53.5 145.5 56.1 1.3-64 21.6-122.4 58.7-167.7L248 290zm191.9 123.9c29.7-36 47.5-78.4 53.8-122.2-50.1 1.6-95.5 17.1-131.2 44.8l77.4 77.4zM167.7 209.7C122.3 246.9 63.9 267.3 0 268.4c2.6 51.9 21.1 103.1 56.1 145.5L214 256l-46.3-46.3zm116 292c43.8-6.3 86.2-24.1 122.2-53.8l-77.4-77.4c-27.7 35.7-43.2 81.2-44.8 131.2z"] };
var faBath = { prefix: 'fas', iconName: 'bath', icon: [512, 512, [], "f2cd", "M488 256H80V112c0-17.645 14.355-32 32-32 11.351 0 21.332 5.945 27.015 14.88-16.492 25.207-14.687 59.576 6.838 83.035-4.176 4.713-4.021 11.916.491 16.428l11.314 11.314c4.686 4.686 12.284 4.686 16.971 0l95.03-95.029c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.512-4.512-11.715-4.666-16.428-.491-17.949-16.469-42.294-21.429-64.178-15.365C163.281 45.667 139.212 32 112 32c-44.112 0-80 35.888-80 80v144h-8c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h8v32c0 28.43 12.362 53.969 32 71.547V456c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-8h256v8c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-32.453c19.638-17.578 32-43.117 32-71.547v-32h8c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"] };
var faBatteryEmpty = { prefix: 'fas', iconName: 'battery-empty', icon: [640, 512, [], "f244", "M544 160v64h32v64h-32v64H64V160h480m16-64H48c-26.51 0-48 21.49-48 48v224c0 26.51 21.49 48 48 48h512c26.51 0 48-21.49 48-48v-16h8c13.255 0 24-10.745 24-24V184c0-13.255-10.745-24-24-24h-8v-16c0-26.51-21.49-48-48-48z"] };
var faBatteryFull = { prefix: 'fas', iconName: 'battery-full', icon: [640, 512, [], "f240", "M544 160v64h32v64h-32v64H64V160h480m16-64H48c-26.51 0-48 21.49-48 48v224c0 26.51 21.49 48 48 48h512c26.51 0 48-21.49 48-48v-16h8c13.255 0 24-10.745 24-24V184c0-13.255-10.745-24-24-24h-8v-16c0-26.51-21.49-48-48-48zm-48 96H96v128h416V192z"] };
var faBatteryHalf = { prefix: 'fas', iconName: 'battery-half', icon: [640, 512, [], "f242", "M544 160v64h32v64h-32v64H64V160h480m16-64H48c-26.51 0-48 21.49-48 48v224c0 26.51 21.49 48 48 48h512c26.51 0 48-21.49 48-48v-16h8c13.255 0 24-10.745 24-24V184c0-13.255-10.745-24-24-24h-8v-16c0-26.51-21.49-48-48-48zm-240 96H96v128h224V192z"] };
var faBatteryQuarter = { prefix: 'fas', iconName: 'battery-quarter', icon: [640, 512, [], "f243", "M544 160v64h32v64h-32v64H64V160h480m16-64H48c-26.51 0-48 21.49-48 48v224c0 26.51 21.49 48 48 48h512c26.51 0 48-21.49 48-48v-16h8c13.255 0 24-10.745 24-24V184c0-13.255-10.745-24-24-24h-8v-16c0-26.51-21.49-48-48-48zm-336 96H96v128h128V192z"] };
var faBatteryThreeQuarters = { prefix: 'fas', iconName: 'battery-three-quarters', icon: [640, 512, [], "f241", "M544 160v64h32v64h-32v64H64V160h480m16-64H48c-26.51 0-48 21.49-48 48v224c0 26.51 21.49 48 48 48h512c26.51 0 48-21.49 48-48v-16h8c13.255 0 24-10.745 24-24V184c0-13.255-10.745-24-24-24h-8v-16c0-26.51-21.49-48-48-48zm-144 96H96v128h320V192z"] };
var faBed = { prefix: 'fas', iconName: 'bed', icon: [576, 512, [], "f236", "M552 288c13.255 0 24 10.745 24 24v136h-96v-64H96v64H0V88c0-13.255 10.745-24 24-24h48c13.255 0 24 10.745 24 24v200h456zM192 96c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80zm384 128c0-53.019-42.981-96-96-96H312c-13.255 0-24 10.745-24 24v104h288v-32z"] };
var faBeer = { prefix: 'fas', iconName: 'beer', icon: [448, 512, [], "f0fc", "M368 96h-48V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56v400c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24v-42.11l80.606-35.977C429.396 365.063 448 336.388 448 304.86V176c0-44.112-35.888-80-80-80zm16 208.86a16.018 16.018 0 0 1-9.479 14.611L320 343.805V160h48c8.822 0 16 7.178 16 16v128.86zM208 384c-8.836 0-16-7.164-16-16V144c0-8.836 7.164-16 16-16s16 7.164 16 16v224c0 8.836-7.164 16-16 16zm-96 0c-8.836 0-16-7.164-16-16V144c0-8.836 7.164-16 16-16s16 7.164 16 16v224c0 8.836-7.164 16-16 16z"] };
var faBell = { prefix: 'fas', iconName: 'bell', icon: [448, 512, [], "f0f3", "M433.884 366.059C411.634 343.809 384 316.118 384 208c0-79.394-57.831-145.269-133.663-157.83A31.845 31.845 0 0 0 256 32c0-17.673-14.327-32-32-32s-32 14.327-32 32c0 6.75 2.095 13.008 5.663 18.17C121.831 62.731 64 128.606 64 208c0 108.118-27.643 135.809-49.893 158.059C-16.042 396.208 5.325 448 48.048 448H160c0 35.346 28.654 64 64 64s64-28.654 64-64h111.943c42.638 0 64.151-51.731 33.941-81.941zM224 472a8 8 0 0 1 0 16c-22.056 0-40-17.944-40-40h16c0 13.234 10.766 24 24 24z"] };
var faBellSlash = { prefix: 'fas', iconName: 'bell-slash', icon: [576, 512, [], "f1f6", "M78.107 366.059C47.958 396.208 69.325 448 112.048 448H224c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64h32.685L127.848 221.379c-2.198 97.078-28.439 123.378-49.741 144.68zM264 448c0 13.234 10.766 24 24 24a8 8 0 0 1 0 16c-22.056 0-40-17.944-40-40h16zm305.896 43.733l-10.762 12.086c-8.915 10.012-24.333 10.967-34.437 2.133L8.256 54.393C-1.848 45.558-2.811 30.28 6.104 20.267L16.865 8.181C25.781-1.831 41.199-2.786 51.303 6.049l113.81 99.512c24.017-28.778 57.946-48.996 96.55-55.39A31.85 31.85 0 0 1 256 32c0-17.673 14.327-32 32-32s32 14.327 32 32c0 6.75-2.095 13.008-5.663 18.17C390.169 62.731 448 128.606 448 208c0 108.118 27.634 135.809 49.884 158.059 12.149 12.149 15.923 27.776 13.33 42.121l56.53 49.427c10.104 8.835 11.067 24.113 2.152 34.126z"] };
var faBicycle = { prefix: 'fas', iconName: 'bicycle', icon: [640, 512, [], "f206", "M512.509 192.001c-16.373-.064-32.03 2.955-46.436 8.495l-77.68-125.153A24 24 0 0 0 368.001 64h-64c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h50.649l14.896 24H256.002v-16c0-8.837-7.163-16-16-16h-87.459c-13.441 0-24.777 10.999-24.536 24.437.232 13.044 10.876 23.563 23.995 23.563h48.726l-29.417 47.52c-13.433-4.83-27.904-7.483-42.992-7.52C58.094 191.83.412 249.012.002 319.236-.413 390.279 57.055 448 128.002 448c59.642 0 109.758-40.793 123.967-96h52.033a24 24 0 0 0 20.406-11.367L410.37 201.77l14.938 24.067c-25.455 23.448-41.385 57.081-41.307 94.437.145 68.833 57.899 127.051 126.729 127.719 70.606.685 128.181-55.803 129.255-125.996 1.086-70.941-56.526-129.72-127.476-129.996zM186.75 265.772c9.727 10.529 16.673 23.661 19.642 38.228h-43.306l23.664-38.228zM128.002 400c-44.112 0-80-35.888-80-80s35.888-80 80-80c5.869 0 11.586.653 17.099 1.859l-45.505 73.509C89.715 331.327 101.213 352 120.002 352h81.3c-12.37 28.225-40.562 48-73.3 48zm162.63-96h-35.624c-3.96-31.756-19.556-59.894-42.383-80.026L237.371 184h127.547l-74.286 120zm217.057 95.886c-41.036-2.165-74.049-35.692-75.627-76.755-.812-21.121 6.633-40.518 19.335-55.263l44.433 71.586c4.66 7.508 14.524 9.816 22.032 5.156l13.594-8.437c7.508-4.66 9.817-14.524 5.156-22.032l-44.468-71.643a79.901 79.901 0 0 1 19.858-2.497c44.112 0 80 35.888 80 80-.001 45.54-38.252 82.316-84.313 79.885z"] };
var faBinoculars = { prefix: 'fas', iconName: 'binoculars', icon: [512, 512, [], "f1e5", "M192 104H96V56c0-13.255 10.745-24 24-24h48c13.255 0 24 10.745 24 24v48zm224-48c0-13.255-10.745-24-24-24h-48c-13.255 0-24 10.745-24 24v48h96V56zM0 456c0 13.255 10.745 24 24 24h120c13.255 0 24-10.745 24-24v-16H0v16zm88-328c-13.255 0-24 10.745-24 24C64 256 0 272 0 416h168V312c0-13.255 10.745-24 24-24V128H88zm256 328c0 13.255 10.745 24 24 24h120c13.255 0 24-10.745 24-24v-16H344v16zM216 128v160h80V128h-80zm128 288h168c0-144-64-160-64-264 0-13.255-10.745-24-24-24H320v160c13.255 0 24 10.745 24 24v104z"] };
var faBirthdayCake = { prefix: 'fas', iconName: 'birthday-cake', icon: [448, 512, [], "f1fd", "M448 384c-28.02 0-31.26-32-74.5-32-43.43 0-46.825 32-74.75 32-27.695 0-31.454-32-74.75-32-42.842 0-47.218 32-74.5 32-28.148 0-31.202-32-74.75-32-43.547 0-46.653 32-74.75 32v-80c0-26.5 21.5-48 48-48h16V112h64v144h64V112h64v144h64V112h64v144h16c26.5 0 48 21.5 48 48v80zm0 128H0v-96c43.356 0 46.767-32 74.75-32 27.951 0 31.253 32 74.75 32 42.843 0 47.217-32 74.5-32 28.148 0 31.201 32 74.75 32 43.357 0 46.767-32 74.75-32 27.488 0 31.252 32 74.5 32v96zM96 96c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40z"] };
var faBlender = { prefix: 'fas', iconName: 'blender', icon: [512, 512, [], "f517", "M416 384H160c-35.35 0-64 28.65-64 64v32c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-32c0-35.35-28.65-64-64-64zm-128 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm40-416h166.54L512 0H48C21.49 0 0 21.49 0 48v160c0 26.51 21.49 48 48 48h103.27l8.73 96h256l17.46-64H328c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h114.18l17.46-64H328c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h140.36l17.46-64H328c-4.42 0-8-3.58-8-8V72c0-4.42 3.58-8 8-8zM64 192V64h69.82l11.64 128H64z"] };
var faBlind = { prefix: 'fas', iconName: 'blind', icon: [384, 512, [], "f29d", "M380.15 510.837a8 8 0 0 1-10.989-2.687l-125.33-206.427a31.923 31.923 0 0 0 12.958-9.485l126.048 207.608a8 8 0 0 1-2.687 10.991zM142.803 314.338l-32.54 89.485 36.12 88.285c6.693 16.36 25.377 24.192 41.733 17.501 16.357-6.692 24.193-25.376 17.501-41.734l-62.814-153.537zM96 88c24.301 0 44-19.699 44-44S120.301 0 96 0 52 19.699 52 44s19.699 44 44 44zm154.837 169.128l-120-152c-4.733-5.995-11.75-9.108-18.837-9.112V96H80v.026c-7.146.003-14.217 3.161-18.944 9.24L0 183.766v95.694c0 13.455 11.011 24.791 24.464 24.536C37.505 303.748 48 293.1 48 280v-79.766l16-20.571v140.698L9.927 469.055c-6.04 16.609 2.528 34.969 19.138 41.009 16.602 6.039 34.968-2.524 41.009-19.138L136 309.638V202.441l-31.406-39.816a4 4 0 1 1 6.269-4.971l102.3 129.217c9.145 11.584 24.368 11.339 33.708 3.965 10.41-8.216 12.159-23.334 3.966-33.708z"] };
var faBold = { prefix: 'fas', iconName: 'bold', icon: [384, 512, [], "f032", "M304.793 243.891c33.639-18.537 53.657-54.16 53.657-95.693 0-48.236-26.25-87.626-68.626-104.179C265.138 34.01 240.849 32 209.661 32H24c-8.837 0-16 7.163-16 16v33.049c0 8.837 7.163 16 16 16h33.113v318.53H24c-8.837 0-16 7.163-16 16V464c0 8.837 7.163 16 16 16h195.69c24.203 0 44.834-1.289 66.866-7.584C337.52 457.193 376 410.647 376 350.014c0-52.168-26.573-91.684-71.207-106.123zM142.217 100.809h67.444c16.294 0 27.536 2.019 37.525 6.717 15.828 8.479 24.906 26.502 24.906 49.446 0 35.029-20.32 56.79-53.029 56.79h-76.846V100.809zm112.642 305.475c-10.14 4.056-22.677 4.907-31.409 4.907h-81.233V281.943h84.367c39.645 0 63.057 25.38 63.057 63.057.001 28.425-13.66 52.483-34.782 61.284z"] };
var faBolt = { prefix: 'fas', iconName: 'bolt', icon: [320, 512, [], "f0e7", "M295.973 160H180.572L215.19 30.184C219.25 14.956 207.756 0 192 0H56C43.971 0 33.8 8.905 32.211 20.828l-31.996 240C-1.704 275.217 9.504 288 24.004 288h118.701L96.646 482.466C93.05 497.649 104.659 512 119.992 512c8.35 0 16.376-4.374 20.778-11.978l175.973-303.997c9.244-15.967-2.288-36.025-20.77-36.025z"] };
var faBomb = { prefix: 'fas', iconName: 'bomb', icon: [512, 512, [], "f1e2", "M440.5 88.5l-52 52L415 167c9.4 9.4 9.4 24.6 0 33.9l-17.4 17.4c11.8 26.1 18.4 55.1 18.4 85.6 0 114.9-93.1 208-208 208S0 418.9 0 304 93.1 96 208 96c30.5 0 59.5 6.6 85.6 18.4L311 97c9.4-9.4 24.6-9.4 33.9 0l26.5 26.5 52-52 17.1 17zM500 60h-24c-6.6 0-12 5.4-12 12s5.4 12 12 12h24c6.6 0 12-5.4 12-12s-5.4-12-12-12zM440 0c-6.6 0-12 5.4-12 12v24c0 6.6 5.4 12 12 12s12-5.4 12-12V12c0-6.6-5.4-12-12-12zm33.9 55l17-17c4.7-4.7 4.7-12.3 0-17-4.7-4.7-12.3-4.7-17 0l-17 17c-4.7 4.7-4.7 12.3 0 17 4.8 4.7 12.4 4.7 17 0zm-67.8 0c4.7 4.7 12.3 4.7 17 0 4.7-4.7 4.7-12.3 0-17l-17-17c-4.7-4.7-12.3-4.7-17 0-4.7 4.7-4.7 12.3 0 17l17 17zm67.8 34c-4.7-4.7-12.3-4.7-17 0-4.7 4.7-4.7 12.3 0 17l17 17c4.7 4.7 12.3 4.7 17 0 4.7-4.7 4.7-12.3 0-17l-17-17zM112 272c0-35.3 28.7-64 64-64 8.8 0 16-7.2 16-16s-7.2-16-16-16c-52.9 0-96 43.1-96 96 0 8.8 7.2 16 16 16s16-7.2 16-16z"] };
var faBook = { prefix: 'fas', iconName: 'book', icon: [448, 512, [], "f02d", "M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"] };
var faBookOpen = { prefix: 'fas', iconName: 'book-open', icon: [576, 512, [], "f518", "M542.2.1c-54.8 3.1-163.7 14.4-231 55.6-4.6 2.8-7.3 7.9-7.3 13.2v363.9c0 11.5 12.6 18.8 23.3 13.5 69.2-34.8 169.2-44.3 218.7-46.9 16.9-.9 30-14.4 30-30.7v-338C576 13 560.6-1 542.2.1zM264.7 55.6C197.5 14.5 88.6 3.2 33.8.1 15.4-1 0 13 0 30.7v337.8c0 16.2 13.1 29.8 30 30.7 49.5 2.6 149.6 12.1 218.8 47 10.6 5.4 23.2-1.9 23.2-13.5V68.6c0-5.3-2.6-10.1-7.3-13z"] };
var faBookmark = { prefix: 'fas', iconName: 'bookmark', icon: [384, 512, [], "f02e", "M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"] };
var faBowlingBall = { prefix: 'fas', iconName: 'bowling-ball', icon: [496, 512, [], "f436", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM120 192c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm64-96c0-17.7 14.3-32 32-32s32 14.3 32 32-14.3 32-32 32-32-14.3-32-32zm48 144c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"] };
var faBox = { prefix: 'fas', iconName: 'box', icon: [512, 512, [], "f466", "M509.5 184.6L458.9 32.8C452.4 13.2 434.1 0 413.4 0H272v192h238.7c-.4-2.5-.4-5-1.2-7.4zM240 0H98.6c-20.7 0-39 13.2-45.5 32.8L2.5 184.6c-.8 2.4-.8 4.9-1.2 7.4H240V0zM0 224v240c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V224H0z"] };
var faBoxOpen = { prefix: 'fas', iconName: 'box-open', icon: [640, 512, [], "f49e", "M53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9zm585.1 102.8L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9z"] };
var faBoxes = { prefix: 'fas', iconName: 'boxes', icon: [576, 512, [], "f468", "M560 288h-80v96l-32-21.3-32 21.3v-96h-80c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16zm-384-64h224c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16h-80v96l-32-21.3L256 96V0h-80c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16zm64 64h-80v96l-32-21.3L96 384v-96H16c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16z"] };
var faBraille = { prefix: 'fas', iconName: 'braille', icon: [640, 512, [], "f2a1", "M128 256c0 35.346-28.654 64-64 64S0 291.346 0 256s28.654-64 64-64 64 28.654 64 64zM64 384c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0-352C28.654 32 0 60.654 0 96s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64zm160 192c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0 160c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0-352c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64zm224 192c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0 160c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0-352c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64zm160 192c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0 160c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0-320c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z"] };
var faBriefcase = { prefix: 'fas', iconName: 'briefcase', icon: [512, 512, [], "f0b1", "M320 288h192v144c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V288h192v20c0 6.627 5.373 12 12 12h104c6.627 0 12-5.373 12-12v-20zm192-112v80H0v-80c0-26.51 21.49-48 48-48h80V80c0-26.51 21.49-48 48-48h160c26.51 0 48 21.49 48 48v48h80c26.51 0 48 21.49 48 48zM320 96H192v32h128V96z"] };
var faBriefcaseMedical = { prefix: 'fas', iconName: 'briefcase-medical', icon: [512, 512, [], "f469", "M464 128h-80V80c0-26.5-21.5-48-48-48H176c-26.5 0-48 21.5-48 48v48H48c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V176c0-26.5-21.5-48-48-48zM192 96h128v32H192V96zm160 248c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48z"] };
var faBroadcastTower = { prefix: 'fas', iconName: 'broadcast-tower', icon: [640, 512, [], "f519", "M150.94 192h33.73c11.01 0 18.61-10.83 14.86-21.18-4.93-13.58-7.55-27.98-7.55-42.82s2.62-29.24 7.55-42.82C203.29 74.83 195.68 64 184.67 64h-33.73c-7.01 0-13.46 4.49-15.41 11.23C130.64 92.21 128 109.88 128 128c0 18.12 2.64 35.79 7.54 52.76 1.94 6.74 8.39 11.24 15.4 11.24zM89.92 23.34C95.56 12.72 87.97 0 75.96 0H40.63c-6.27 0-12.14 3.59-14.74 9.31C9.4 45.54 0 85.65 0 128c0 24.75 3.12 68.33 26.69 118.86 2.62 5.63 8.42 9.14 14.61 9.14h34.84c12.02 0 19.61-12.74 13.95-23.37-49.78-93.32-16.71-178.15-.17-209.29zM614.06 9.29C611.46 3.58 605.6 0 599.33 0h-35.42c-11.98 0-19.66 12.66-14.02 23.25 18.27 34.29 48.42 119.42.28 209.23-5.72 10.68 1.8 23.52 13.91 23.52h35.23c6.27 0 12.13-3.58 14.73-9.29C630.57 210.48 640 170.36 640 128s-9.42-82.48-25.94-118.71zM489.06 64h-33.73c-11.01 0-18.61 10.83-14.86 21.18 4.93 13.58 7.55 27.98 7.55 42.82s-2.62 29.24-7.55 42.82c-3.76 10.35 3.85 21.18 14.86 21.18h33.73c7.02 0 13.46-4.49 15.41-11.24 4.9-16.97 7.53-34.64 7.53-52.76 0-18.12-2.64-35.79-7.54-52.76-1.94-6.75-8.39-11.24-15.4-11.24zm-116.3 100.12c7.05-10.29 11.2-22.71 11.2-36.12 0-35.35-28.63-64-63.96-64-35.32 0-63.96 28.65-63.96 64 0 13.41 4.15 25.83 11.2 36.12l-130.5 313.41c-3.4 8.15.46 17.52 8.61 20.92l29.51 12.31c8.15 3.4 17.52-.46 20.91-8.61L244.96 384h150.07l49.2 118.15c3.4 8.16 12.76 12.01 20.91 8.61l29.51-12.31c8.15-3.4 12-12.77 8.61-20.92l-130.5-313.41zM271.62 320L320 203.81 368.38 320h-96.76z"] };
var faBroom = { prefix: 'fas', iconName: 'broom', icon: [512, 512, [], "f51a", "M10.8 247.2C-.7 251.8-3.7 266.7 5 275.4l54.8 54.8 73.2-24.4-24.4 73.2 128 128c8.8 8.8 23.6 5.7 28.2-5.8l98.1-243.7-108.4-108.4-243.7 98.1zM507.3 27.3L484.7 4.7c-6.2-6.3-16.4-6.3-22.6 0L359.8 106.9l-40.4-40.4c-4.2-4.3-11.4-3-13.9 2.5l-27.2 58.6 106.1 106.1 58.6-27.2c5.4-2.5 6.7-9.7 2.5-13.9l-40.4-40.4L507.3 49.9c6.3-6.2 6.3-16.3 0-22.6z"] };
var faBug = { prefix: 'fas', iconName: 'bug', icon: [512, 512, [], "f188", "M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z"] };
var faBuilding = { prefix: 'fas', iconName: 'building', icon: [448, 512, [], "f1ad", "M436 480h-20V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v456H12c-6.627 0-12 5.373-12 12v20h448v-20c0-6.627-5.373-12-12-12zM128 76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76zm0 96c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm52 148h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12zm76 160h-64v-84c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v84zm64-172c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40z"] };
var faBullhorn = { prefix: 'fas', iconName: 'bullhorn', icon: [576, 512, [], "f0a1", "M576 224c0-20.896-13.36-38.666-32-45.258V64c0-35.346-28.654-64-64-64-64.985 56-142.031 128-272 128H48c-26.51 0-48 21.49-48 48v96c0 26.51 21.49 48 48 48h43.263c-18.742 64.65 2.479 116.379 18.814 167.44 1.702 5.32 5.203 9.893 9.922 12.88 20.78 13.155 68.355 15.657 93.773 5.151 16.046-6.633 19.96-27.423 7.522-39.537-18.508-18.026-30.136-36.91-19.795-60.858a12.278 12.278 0 0 0-1.045-11.673c-16.309-24.679-3.581-62.107 28.517-72.752C346.403 327.887 418.591 395.081 480 448c35.346 0 64-28.654 64-64V269.258c18.64-6.592 32-24.362 32-45.258zm-96 139.855c-54.609-44.979-125.033-92.94-224-104.982v-69.747c98.967-12.042 169.391-60.002 224-104.982v279.711z"] };
var faBullseye = { prefix: 'fas', iconName: 'bullseye', icon: [512, 512, [], "f140", "M256 72c101.689 0 184 82.295 184 184 0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-101.689 82.295-184 184-184m0-64C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 184c35.29 0 64 28.71 64 64s-28.71 64-64 64-64-28.71-64-64 28.71-64 64-64m0-64c-70.692 0-128 57.308-128 128s57.308 128 128 128 128-57.308 128-128-57.308-128-128-128z"] };
var faBurn = { prefix: 'fas', iconName: 'burn', icon: [384, 512, [], "f46a", "M192 0C79.7 101.3 0 220.9 0 300.5 0 425 79 512 192 512s192-87 192-211.5c0-79.9-80.2-199.6-192-300.5zm0 448c-56.5 0-96-39-96-94.8 0-13.5 4.6-61.5 96-161.2 91.4 99.7 96 147.7 96 161.2 0 55.8-39.5 94.8-96 94.8z"] };
var faBus = { prefix: 'fas', iconName: 'bus', icon: [512, 512, [], "f207", "M512 152v80c0 13.255-10.745 24-24 24h-8v168c0 13.255-10.745 24-24 24h-8v40c0 13.255-10.745 24-24 24h-48c-13.255 0-24-10.745-24-24v-40H160v40c0 13.255-10.745 24-24 24H88c-13.255 0-24-10.745-24-24v-40h-8c-13.255 0-24-10.745-24-24V256h-8c-13.255 0-24-10.745-24-24v-80c0-13.255 10.745-24 24-24h8V80C32 35.817 132.288 0 256 0s224 35.817 224 80v48h8c13.255 0 24 10.745 24 24zM112 320c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm288 0c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm32-56V120c0-13.255-10.745-24-24-24H104c-13.255 0-24 10.745-24 24v144c0 13.255 10.745 24 24 24h304c13.255 0 24-10.745 24-24z"] };
var faCalculator = { prefix: 'fas', iconName: 'calculator', icon: [448, 512, [], "f1ec", "M0 464V48C0 21.49 21.49 0 48 0h352c26.51 0 48 21.49 48 48v416c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48zm384-284V76c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v104c0 6.627 5.373 12 12 12h296c6.627 0 12-5.373 12-12zM128 308v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm256 128V268c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v168c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-256 0v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm128-128v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm0 128v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z"] };
var faCalendar = { prefix: 'fas', iconName: 'calendar', icon: [448, 512, [], "f133", "M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"] };
var faCalendarAlt = { prefix: 'fas', iconName: 'calendar-alt', icon: [448, 512, [], "f073", "M436 160H12c-6.6 0-12-5.4-12-12v-36c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48v36c0 6.6-5.4 12-12 12zM12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm116 204c0-6.6-5.4-12-12-12H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm0-128c0-6.6-5.4-12-12-12H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm128 128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm0-128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm128 128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm0-128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40z"] };
var faCalendarCheck = { prefix: 'fas', iconName: 'calendar-check', icon: [448, 512, [], "f274", "M436 160H12c-6.627 0-12-5.373-12-12v-36c0-26.51 21.49-48 48-48h48V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h128V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h48c26.51 0 48 21.49 48 48v36c0 6.627-5.373 12-12 12zM12 192h424c6.627 0 12 5.373 12 12v260c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V204c0-6.627 5.373-12 12-12zm333.296 95.947l-28.169-28.398c-4.667-4.705-12.265-4.736-16.97-.068L194.12 364.665l-45.98-46.352c-4.667-4.705-12.266-4.736-16.971-.068l-28.397 28.17c-4.705 4.667-4.736 12.265-.068 16.97l82.601 83.269c4.667 4.705 12.265 4.736 16.97.068l142.953-141.805c4.705-4.667 4.736-12.265.068-16.97z"] };
var faCalendarMinus = { prefix: 'fas', iconName: 'calendar-minus', icon: [448, 512, [], "f272", "M436 160H12c-6.6 0-12-5.4-12-12v-36c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48v36c0 6.6-5.4 12-12 12zM12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm304 192c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12H132c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h184z"] };
var faCalendarPlus = { prefix: 'fas', iconName: 'calendar-plus', icon: [448, 512, [], "f271", "M436 160H12c-6.6 0-12-5.4-12-12v-36c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48v36c0 6.6-5.4 12-12 12zM12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm316 140c0-6.6-5.4-12-12-12h-60v-60c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v60h-60c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h60v60c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-60h60c6.6 0 12-5.4 12-12v-40z"] };
var faCalendarTimes = { prefix: 'fas', iconName: 'calendar-times', icon: [448, 512, [], "f273", "M436 160H12c-6.6 0-12-5.4-12-12v-36c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48v36c0 6.6-5.4 12-12 12zM12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm257.3 160l48.1-48.1c4.7-4.7 4.7-12.3 0-17l-28.3-28.3c-4.7-4.7-12.3-4.7-17 0L224 306.7l-48.1-48.1c-4.7-4.7-12.3-4.7-17 0l-28.3 28.3c-4.7 4.7-4.7 12.3 0 17l48.1 48.1-48.1 48.1c-4.7 4.7-4.7 12.3 0 17l28.3 28.3c4.7 4.7 12.3 4.7 17 0l48.1-48.1 48.1 48.1c4.7 4.7 12.3 4.7 17 0l28.3-28.3c4.7-4.7 4.7-12.3 0-17L269.3 352z"] };
var faCamera = { prefix: 'fas', iconName: 'camera', icon: [512, 512, [], "f030", "M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"] };
var faCameraRetro = { prefix: 'fas', iconName: 'camera-retro', icon: [512, 512, [], "f083", "M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H48zm0 32h106c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H38c-3.3 0-6-2.7-6-6V80c0-8.8 7.2-16 16-16zm426 96H38c-3.3 0-6-2.7-6-6v-36c0-3.3 2.7-6 6-6h138l30.2-45.3c1.1-1.7 3-2.7 5-2.7H464c8.8 0 16 7.2 16 16v74c0 3.3-2.7 6-6 6zM256 424c-66.2 0-120-53.8-120-120s53.8-120 120-120 120 53.8 120 120-53.8 120-120 120zm0-208c-48.5 0-88 39.5-88 88s39.5 88 88 88 88-39.5 88-88-39.5-88-88-88zm-48 104c-8.8 0-16-7.2-16-16 0-35.3 28.7-64 64-64 8.8 0 16 7.2 16 16s-7.2 16-16 16c-17.6 0-32 14.4-32 32 0 8.8-7.2 16-16 16z"] };
var faCapsules = { prefix: 'fas', iconName: 'capsules', icon: [576, 512, [], "f46b", "M555.3 300.1L424.2 112.8C401.9 81 366.4 64 330.4 64c-22.6 0-45.5 6.7-65.5 20.7-19.7 13.8-33.7 32.8-41.5 53.8C220.5 79.2 172 32 112 32 50.1 32 0 82.1 0 144v224c0 61.9 50.1 112 112 112s112-50.1 112-112V218.9c3.3 8.6 7.3 17.1 12.8 25L368 431.2c22.2 31.8 57.7 48.8 93.8 48.8 22.7 0 45.5-6.7 65.5-20.7 51.7-36.2 64.2-107.5 28-159.2zM160 256H64V144c0-26.5 21.5-48 48-48s48 21.5 48 48v112zm194.8 44.9l-65.6-93.7c-7.7-11-10.7-24.4-8.3-37.6 2.3-13.2 9.7-24.8 20.7-32.5 8.5-6 18.5-9.1 28.8-9.1 16.5 0 31.9 8 41.3 21.5l65.6 93.7-82.5 57.7z"] };
var faCar = { prefix: 'fas', iconName: 'car', icon: [512, 512, [], "f1b9", "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"] };
var faCaretDown = { prefix: 'fas', iconName: 'caret-down', icon: [320, 512, [], "f0d7", "M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"] };
var faCaretLeft = { prefix: 'fas', iconName: 'caret-left', icon: [192, 512, [], "f0d9", "M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"] };
var faCaretRight = { prefix: 'fas', iconName: 'caret-right', icon: [192, 512, [], "f0da", "M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"] };
var faCaretSquareDown = { prefix: 'fas', iconName: 'caret-square-down', icon: [448, 512, [], "f150", "M448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zM92.5 220.5l123 123c4.7 4.7 12.3 4.7 17 0l123-123c7.6-7.6 2.2-20.5-8.5-20.5H101c-10.7 0-16.1 12.9-8.5 20.5z"] };
var faCaretSquareLeft = { prefix: 'fas', iconName: 'caret-square-left', icon: [448, 512, [], "f191", "M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zM259.515 124.485l-123.03 123.03c-4.686 4.686-4.686 12.284 0 16.971l123.029 123.029c7.56 7.56 20.485 2.206 20.485-8.485V132.971c.001-10.691-12.925-16.045-20.484-8.486z"] };
var faCaretSquareRight = { prefix: 'fas', iconName: 'caret-square-right', icon: [448, 512, [], "f152", "M48 32h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48zm140.485 355.515l123.029-123.029c4.686-4.686 4.686-12.284 0-16.971l-123.029-123.03c-7.56-7.56-20.485-2.206-20.485 8.485v246.059c0 10.691 12.926 16.045 20.485 8.486z"] };
var faCaretSquareUp = { prefix: 'fas', iconName: 'caret-square-up', icon: [448, 512, [], "f151", "M0 432V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48zm355.515-140.485l-123.03-123.03c-4.686-4.686-12.284-4.686-16.971 0L92.485 291.515c-7.56 7.56-2.206 20.485 8.485 20.485h246.059c10.691 0 16.045-12.926 8.486-20.485z"] };
var faCaretUp = { prefix: 'fas', iconName: 'caret-up', icon: [320, 512, [], "f0d8", "M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"] };
var faCartArrowDown = { prefix: 'fas', iconName: 'cart-arrow-down', icon: [576, 512, [], "f218", "M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM403.029 192H360v-60c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v60h-43.029c-10.691 0-16.045 12.926-8.485 20.485l67.029 67.029c4.686 4.686 12.284 4.686 16.971 0l67.029-67.029c7.559-7.559 2.205-20.485-8.486-20.485z"] };
var faCartPlus = { prefix: 'fas', iconName: 'cart-plus', icon: [576, 512, [], "f217", "M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM408 168h-48v-40c0-8.837-7.163-16-16-16h-16c-8.837 0-16 7.163-16 16v40h-48c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h48v40c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-40h48c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16z"] };
var faCertificate = { prefix: 'fas', iconName: 'certificate', icon: [512, 512, [], "f0a3", "M458.622 255.92l45.985-45.005c13.708-12.977 7.316-36.039-10.664-40.339l-62.65-15.99 17.661-62.015c4.991-17.838-11.829-34.663-29.661-29.671l-61.994 17.667-15.984-62.671C337.085.197 313.765-6.276 300.99 7.228L256 53.57 211.011 7.229c-12.63-13.351-36.047-7.234-40.325 10.668l-15.984 62.671-61.995-17.667C74.87 57.907 58.056 74.738 63.046 92.572l17.661 62.015-62.65 15.99C.069 174.878-6.31 197.944 7.392 210.915l45.985 45.005-45.985 45.004c-13.708 12.977-7.316 36.039 10.664 40.339l62.65 15.99-17.661 62.015c-4.991 17.838 11.829 34.663 29.661 29.671l61.994-17.667 15.984 62.671c4.439 18.575 27.696 24.018 40.325 10.668L256 458.61l44.989 46.001c12.5 13.488 35.987 7.486 40.325-10.668l15.984-62.671 61.994 17.667c17.836 4.994 34.651-11.837 29.661-29.671l-17.661-62.015 62.65-15.99c17.987-4.302 24.366-27.367 10.664-40.339l-45.984-45.004z"] };
var faChalkboard = { prefix: 'fas', iconName: 'chalkboard', icon: [640, 512, [], "f51b", "M96 64h448v352h64V40c0-22.06-17.94-40-40-40H72C49.94 0 32 17.94 32 40v376h64V64zm528 384H480v-64H288v64H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"] };
var faChalkboardTeacher = { prefix: 'fas', iconName: 'chalkboard-teacher', icon: [640, 512, [], "f51c", "M208 352c-2.39 0-4.78.35-7.06 1.09C187.98 357.3 174.35 360 160 360c-14.35 0-27.98-2.7-40.95-6.91-2.28-.74-4.66-1.09-7.05-1.09C49.94 352-.33 402.48 0 464.62.14 490.88 21.73 512 48 512h224c26.27 0 47.86-21.12 48-47.38.33-62.14-49.94-112.62-112-112.62zm-48-32c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96zM592 0H208c-26.47 0-48 22.25-48 49.59V96c23.42 0 45.1 6.78 64 17.8V64h352v288h-64v-64H384v64h-76.24c19.1 16.69 33.12 38.73 39.69 64H592c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0z"] };
var faChartArea = { prefix: 'fas', iconName: 'chart-area', icon: [512, 512, [], "f1fe", "M500 384c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v308h436zM372.7 159.5L288 216l-85.3-113.7c-5.1-6.8-15.5-6.3-19.9 1L96 248v104h384l-89.9-187.8c-3.2-6.5-11.4-8.7-17.4-4.7z"] };
var faChartBar = { prefix: 'fas', iconName: 'chart-bar', icon: [512, 512, [], "f080", "M500 384c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v308h436zm-308-44v-72c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v72c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0V204c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v136c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0V140c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v200c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0V108c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v232c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"] };
var faChartLine = { prefix: 'fas', iconName: 'chart-line', icon: [512, 512, [], "f201", "M500 384c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v308h436zM456 96H344c-21.4 0-32.1 25.9-17 41l32.9 32.9-72 72.9-55.6-55.6c-4.7-4.7-12.2-4.7-16.9 0L96.4 305c-4.7 4.6-4.8 12.2-.2 16.9l28.5 29.4c4.7 4.8 12.4 4.9 17.1.1l82.1-82.1 55.5 55.5c4.7 4.7 12.3 4.7 17 0l109.2-109.2L439 249c15.1 15.1 41 4.4 41-17V120c0-13.3-10.7-24-24-24z"] };
var faChartPie = { prefix: 'fas', iconName: 'chart-pie', icon: [576, 512, [], "f200", "M288 12.3V240h227.7c6.9 0 12.3-5.8 12-12.7-6.4-122.4-104.5-220.6-227-227-6.9-.3-12.7 5.1-12.7 12zM552.7 288c6.9 0 12.3 5.8 12 12.7-2.8 53.2-23.2 105.6-61.2 147.8-4.6 5.1-12.6 5.4-17.5.5L325 288h227.7zM401 433c4.8 4.8 4.7 12.8-.4 17.3-42.6 38.4-99 61.7-160.8 61.7C107.6 511.9-.2 403.8 0 271.5.2 143.4 100.8 38.9 227.3 32.3c6.9-.4 12.7 5.1 12.7 12V272l161 161z"] };
var faCheck = { prefix: 'fas', iconName: 'check', icon: [512, 512, [], "f00c", "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"] };
var faCheckCircle = { prefix: 'fas', iconName: 'check-circle', icon: [512, 512, [], "f058", "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"] };
var faCheckSquare = { prefix: 'fas', iconName: 'check-square', icon: [448, 512, [], "f14a", "M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"] };
var faChess = { prefix: 'fas', iconName: 'chess', icon: [512, 512, [], "f439", "M199.821 217.633a6 6 0 0 1 6 6l-.001 20.766a6 6 0 0 1-6 6h-25.805c0 31.715-2.153 96.201 17.398 153.229H64.597C84.54 345.452 82.02 279.245 82.02 250.399H56.183a6 6 0 0 1-6-6l.002-20.766a6 6 0 0 1 6-6h143.636zM41.554 115.088l34.58 95.071h103.734l34.572-95.072c2.846-7.826-2.95-16.101-11.278-16.101H152v-30.22h21.57a6 6 0 0 0 6-6V40.383a6 6 0 0 0-6-6h-28.367V6a6 6 0 0 0-6-6H116.82a6 6 0 0 0-6 6v28.383H82.421a6 6 0 0 0-6 6v22.383a6 6 0 0 0 6 6H104v30.219H52.831c-8.328.001-14.124 8.276-11.277 16.103zM222.678 445.17v-28.067a6 6 0 0 0-6-6H39.322a6 6 0 0 0-6 6v28.067l-22.148 14.164a6 6 0 0 0-2.767 5.055V506a6 6 0 0 0 6 6h227.187a6 6 0 0 0 6-6v-41.612a6 6 0 0 0-2.767-5.055l-22.149-14.163zm90.578-144.225l24.88 16.963c.09 18.124-.167 63.904-11.905 114.522h147.526c-11.713-50.475-11.969-96.324-11.882-114.537l24.859-16.949a3.856 3.856 0 0 0 1.684-3.187v-69.901a3.857 3.857 0 0 0-3.857-3.857h-27.655a3.857 3.857 0 0 0-3.857 3.857v31.514h-22.737v-31.514a3.857 3.857 0 0 0-3.858-3.857h-52.918a3.857 3.857 0 0 0-3.857 3.857v31.514h-22.737v-31.514a3.857 3.857 0 0 0-3.857-3.857H315.43a3.857 3.857 0 0 0-3.857 3.857v69.901a3.855 3.855 0 0 0 1.683 3.188zm71.585 51.906c0-8.372 6.787-15.158 15.159-15.158s15.158 6.787 15.158 15.158v30.318h-30.317v-30.318zM504.62 470.059l-13.664-10.639v-15.552a3.857 3.857 0 0 0-3.857-3.857H312.915a3.857 3.857 0 0 0-3.857 3.857v15.552l-13.677 10.639a3.857 3.857 0 0 0-1.488 3.044v35.039a3.857 3.857 0 0 0 3.857 3.857h204.5a3.857 3.857 0 0 0 3.857-3.857v-35.04a3.859 3.859 0 0 0-1.487-3.043z"] };
var faChessBishop = { prefix: 'fas', iconName: 'chess-bishop', icon: [320, 512, [], "f43a", "M123.158 77.881C107.369 72.53 96 57.597 96 40c0-22.091 17.909-40 40-40h47.796c22.091 0 40 17.909 40 40 0 17.541-11.295 32.434-27.005 37.829 23.993 16.657 48.577 46.839 68.703 82.05L144.929 280.443a6 6 0 0 0 0 8.485l14.142 14.142a6 6 0 0 0 8.485 0L280.9 189.726c17.758 38.297 29.371 79.443 29.371 114.273 0 53.786-22.897 75.788-58.446 86.033V448H68.174v-57.97C32.631 379.784 9.739 357.781 9.739 304c0-78.029 58.281-187.766 113.419-226.119zM320 500v-24c0-6.627-5.373-12-12-12H12c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h296c6.627 0 12-5.373 12-12z"] };
var faChessBoard = { prefix: 'fas', iconName: 'chess-board', icon: [512, 512, [], "f43c", "M256 256v64h-64v-64h64zm0-256h-64v64h64V0zm0 256h64v-64h-64v64zM384 0h-64v64h64V0zm0 512h64v-64h-64v64zm128-64v-64h-64v64h64zm-384 64h64v-64h-64v64zm0-512H64v64h64V0zm384 192v-64h-64v64h64zm0 128v-64h-64v64h64zM0 512h64v-64H0v64zM0 64v64h64V64H0zm0 128v64h64v-64H0zm0 128v64h64v-64H0zm256 192h64v-64h-64v64zm-64-128v64h64v-64h-64zm64-192v-64h-64v64h64zM64 384v64h64v-64H64zm64-128H64v64h64v-64zm256 128h64v-64h-64v64zM512 0h-64v64h64V0zM384 256h64v-64h-64v64zm0-192v64h64V64h-64zm-64 320v64h64v-64h-64zm-192-64v64h64v-64h-64zm128 0v64h64v-64h-64zm-64-128h-64v64h64v-64zm-64-64H64v64h64v-64zm192 192h64v-64h-64v64zM192 128V64h-64v64h64zm128 0V64h-64v64h64zm0 64h64v-64h-64v64z"] };
var faChessKing = { prefix: 'fas', iconName: 'chess-king', icon: [448, 512, [], "f43f", "M416 476v24c0 6.627-5.373 12-12 12H44c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12zm-8.033-324H248v-48h50a6 6 0 0 0 6-6V62a6 6 0 0 0-6-6h-50V6a6 6 0 0 0-6-6h-36a6 6 0 0 0-6 6v50h-50a6 6 0 0 0-6 6v36a6 6 0 0 0 6 6h50v48H40.033c-27.574 0-46.879 27.244-37.738 53.259L87.582 448h272.836l85.287-242.741C454.846 179.244 435.541 152 407.967 152z"] };
var faChessKnight = { prefix: 'fas', iconName: 'chess-knight', icon: [384, 512, [], "f441", "M352 224v224H32v-46.557c0-30.302 17.12-58.003 44.223-71.554l57.243-28.622A48 48 0 0 0 160 258.334V208l-22.127 11.063a23.996 23.996 0 0 0-12.55 15.645l-11.835 47.338a12 12 0 0 1-7.185 8.231l-29.601 11.84a11.998 11.998 0 0 1-9.33-.176L7.126 275.167A12 12 0 0 1 0 264.201v-158.26c0-6.365 2.529-12.47 7.03-16.971L16 80 1.789 51.578A16.937 16.937 0 0 1 0 44c0-6.627 5.373-12 12-12h148c106.039 0 192 85.961 192 192zm20 240H12c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h360c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12zM52 128c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20z"] };
var faChessPawn = { prefix: 'fas', iconName: 'chess-pawn', icon: [320, 512, [], "f443", "M264 448H56s60-42.743 60-176H84c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h40.209C95.721 210.56 76 181.588 76 148c0-46.392 37.608-84 84-84s84 37.608 84 84c0 33.588-19.721 62.56-48.209 76H236c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12h-32c0 133.257 60 176 60 176zm28 16H28c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h264c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12z"] };
var faChessQueen = { prefix: 'fas', iconName: 'chess-queen', icon: [512, 512, [], "f445", "M436 512H76c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12zM255.579 0c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zm204.568 154.634c-5.768-3.045-12.916-.932-16.082 4.77-8.616 15.516-22.747 37.801-44.065 37.801-28.714 0-30.625-19.804-31.686-57.542-.183-6.492-5.501-11.664-11.995-11.664h-41.006c-5.175 0-9.754 3.328-11.388 8.238-8.89 26.709-26.073 40.992-47.925 40.992s-39.034-14.283-47.925-40.992c-1.634-4.91-6.213-8.238-11.388-8.238h-41.005c-6.495 0-11.813 5.174-11.995 11.667-1.052 37.642-2.934 57.539-31.688 57.539-20.691 0-33.817-20.224-44.425-38.025-3.266-5.48-10.258-7.431-15.899-4.453l-39.179 20.679a12 12 0 0 0-5.51 15.145L112 448h288l105.014-257.448a12 12 0 0 0-5.51-15.145l-39.357-20.773z"] };
var faChessRook = { prefix: 'fas', iconName: 'chess-rook', icon: [384, 512, [], "f447", "M81.241 215.027C80.957 258.92 77.411 348.076 48 448h287.982c-29.4-99.604-32.936-188.912-33.221-232.975l45.418-42.312a11.998 11.998 0 0 0 3.82-8.78V44c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v44h-48V44c0-6.627-5.373-12-12-12h-72c-6.627 0-12 5.373-12 12v44H96V44c0-6.627-5.373-12-12-12H44c-6.627 0-12 5.373-12 12v119.932c0 3.33 1.384 6.51 3.82 8.78l45.421 42.315zM160 256c0-17.673 14.327-32 32-32 17.673 0 32 14.327 32 32v64.004h-64V256zm224 220v24c0 6.627-5.373 12-12 12H12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12z"] };
var faChevronCircleDown = { prefix: 'fas', iconName: 'chevron-circle-down', icon: [512, 512, [], "f13a", "M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM273 369.9l135.5-135.5c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L256 285.1 154.4 183.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L239 369.9c9.4 9.4 24.6 9.4 34 0z"] };
var faChevronCircleLeft = { prefix: 'fas', iconName: 'chevron-circle-left', icon: [512, 512, [], "f137", "M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"] };
var faChevronCircleRight = { prefix: 'fas', iconName: 'chevron-circle-right', icon: [512, 512, [], "f138", "M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"] };
var faChevronCircleUp = { prefix: 'fas', iconName: 'chevron-circle-up', icon: [512, 512, [], "f139", "M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm231-113.9L103.5 277.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L256 226.9l101.6 101.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L273 142.1c-9.4-9.4-24.6-9.4-34 0z"] };
var faChevronDown = { prefix: 'fas', iconName: 'chevron-down', icon: [448, 512, [], "f078", "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"] };
var faChevronLeft = { prefix: 'fas', iconName: 'chevron-left', icon: [320, 512, [], "f053", "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"] };
var faChevronRight = { prefix: 'fas', iconName: 'chevron-right', icon: [320, 512, [], "f054", "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"] };
var faChevronUp = { prefix: 'fas', iconName: 'chevron-up', icon: [448, 512, [], "f077", "M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"] };
var faChild = { prefix: 'fas', iconName: 'child', icon: [384, 512, [], "f1ae", "M120 72c0-39.765 32.235-72 72-72s72 32.235 72 72c0 39.764-32.235 72-72 72s-72-32.236-72-72zm254.627 1.373c-12.496-12.497-32.758-12.497-45.254 0L242.745 160H141.254L54.627 73.373c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255L104 213.254V480c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V368h16v112c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V213.254l94.627-94.627c12.497-12.497 12.497-32.757 0-45.254z"] };
var faChurch = { prefix: 'fas', iconName: 'church', icon: [640, 512, [], "f51d", "M464.46 246.68L352 179.2V128h48c8.84 0 16-7.16 16-16V80c0-8.84-7.16-16-16-16h-48V16c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v48h-48c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h48v51.2l-112.46 67.48A31.997 31.997 0 0 0 160 274.12V512h96v-96c0-35.35 28.65-64 64-64s64 28.65 64 64v96h96V274.12c0-11.24-5.9-21.66-15.54-27.44zM0 395.96V496c0 8.84 7.16 16 16 16h112V320L19.39 366.54A32.024 32.024 0 0 0 0 395.96zm620.61-29.42L512 320v192h112c8.84 0 16-7.16 16-16V395.96c0-12.8-7.63-24.37-19.39-29.42z"] };
var faCircle = { prefix: 'fas', iconName: 'circle', icon: [512, 512, [], "f111", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"] };
var faCircleNotch = { prefix: 'fas', iconName: 'circle-notch', icon: [512, 512, [], "f1ce", "M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"] };
var faClipboard = { prefix: 'fas', iconName: 'clipboard', icon: [384, 512, [], "f328", "M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z"] };
var faClipboardCheck = { prefix: 'fas', iconName: 'clipboard-check', icon: [384, 512, [], "f46c", "M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm121.2 231.8l-143 141.8c-4.7 4.7-12.3 4.6-17-.1l-82.6-83.3c-4.7-4.7-4.6-12.3.1-17L99.1 285c4.7-4.7 12.3-4.6 17 .1l46 46.4 106-105.2c4.7-4.7 12.3-4.6 17 .1l28.2 28.4c4.7 4.8 4.6 12.3-.1 17z"] };
var faClipboardList = { prefix: 'fas', iconName: 'clipboard-list', icon: [384, 512, [], "f46d", "M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"] };
var faClock = { prefix: 'fas', iconName: 'clock', icon: [512, 512, [], "f017", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm57.1 350.1L224.9 294c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v137.7l63.5 46.2c5.4 3.9 6.5 11.4 2.6 16.8l-28.2 38.8c-3.9 5.3-11.4 6.5-16.8 2.6z"] };
var faClone = { prefix: 'fas', iconName: 'clone', icon: [512, 512, [], "f24d", "M464 0c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48H176c-26.51 0-48-21.49-48-48V48c0-26.51 21.49-48 48-48h288M176 416c-44.112 0-80-35.888-80-80V128H48c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48v-48H176z"] };
var faClosedCaptioning = { prefix: 'fas', iconName: 'closed-captioning', icon: [512, 512, [], "f20a", "M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM218.1 287.7c2.8-2.5 7.1-2.1 9.2.9l19.5 27.7c1.7 2.4 1.5 5.6-.5 7.7-53.6 56.8-172.8 32.1-172.8-67.9 0-97.3 121.7-119.5 172.5-70.1 2.1 2 2.5 3.2 1 5.7l-17.5 30.5c-1.9 3.1-6.2 4-9.1 1.7-40.8-32-94.6-14.9-94.6 31.2.1 48 51.1 70.5 92.3 32.6zm190.4 0c2.8-2.5 7.1-2.1 9.2.9l19.5 27.7c1.7 2.4 1.5 5.6-.5 7.7-53.5 56.9-172.7 32.1-172.7-67.9 0-97.3 121.7-119.5 172.5-70.1 2.1 2 2.5 3.2 1 5.7L420 222.2c-1.9 3.1-6.2 4-9.1 1.7-40.8-32-94.6-14.9-94.6 31.2 0 48 51 70.5 92.2 32.6z"] };
var faCloud = { prefix: 'fas', iconName: 'cloud', icon: [640, 512, [], "f0c2", "M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"] };
var faCloudDownloadAlt = { prefix: 'fas', iconName: 'cloud-download-alt', icon: [640, 512, [], "f381", "M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zm-132.9 88.7L299.3 420.7c-6.2 6.2-16.4 6.2-22.6 0L171.3 315.3c-10.1-10.1-2.9-27.3 11.3-27.3H248V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v112h65.4c14.2 0 21.4 17.2 11.3 27.3z"] };
var faCloudUploadAlt = { prefix: 'fas', iconName: 'cloud-upload-alt', icon: [640, 512, [], "f382", "M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"] };
var faCode = { prefix: 'fas', iconName: 'code', icon: [640, 512, [], "f121", "M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"] };
var faCodeBranch = { prefix: 'fas', iconName: 'code-branch', icon: [384, 512, [], "f126", "M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"] };
var faCoffee = { prefix: 'fas', iconName: 'coffee', icon: [640, 512, [], "f0f4", "M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z"] };
var faCog = { prefix: 'fas', iconName: 'cog', icon: [512, 512, [], "f013", "M444.788 291.1l42.616 24.599c4.867 2.809 7.126 8.618 5.459 13.985-11.07 35.642-29.97 67.842-54.689 94.586a12.016 12.016 0 0 1-14.832 2.254l-42.584-24.595a191.577 191.577 0 0 1-60.759 35.13v49.182a12.01 12.01 0 0 1-9.377 11.718c-34.956 7.85-72.499 8.256-109.219.007-5.49-1.233-9.403-6.096-9.403-11.723v-49.184a191.555 191.555 0 0 1-60.759-35.13l-42.584 24.595a12.016 12.016 0 0 1-14.832-2.254c-24.718-26.744-43.619-58.944-54.689-94.586-1.667-5.366.592-11.175 5.459-13.985L67.212 291.1a193.48 193.48 0 0 1 0-70.199l-42.616-24.599c-4.867-2.809-7.126-8.618-5.459-13.985 11.07-35.642 29.97-67.842 54.689-94.586a12.016 12.016 0 0 1 14.832-2.254l42.584 24.595a191.577 191.577 0 0 1 60.759-35.13V25.759a12.01 12.01 0 0 1 9.377-11.718c34.956-7.85 72.499-8.256 109.219-.007 5.49 1.233 9.403 6.096 9.403 11.723v49.184a191.555 191.555 0 0 1 60.759 35.13l42.584-24.595a12.016 12.016 0 0 1 14.832 2.254c24.718 26.744 43.619 58.944 54.689 94.586 1.667 5.366-.592 11.175-5.459 13.985L444.788 220.9a193.485 193.485 0 0 1 0 70.2zM336 256c0-44.112-35.888-80-80-80s-80 35.888-80 80 35.888 80 80 80 80-35.888 80-80z"] };
var faCogs = { prefix: 'fas', iconName: 'cogs', icon: [640, 512, [], "f085", "M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9.4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9.1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z"] };
var faCoins = { prefix: 'fas', iconName: 'coins', icon: [512, 512, [], "f51e", "M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z"] };
var faColumns = { prefix: 'fas', iconName: 'columns', icon: [512, 512, [], "f0db", "M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64V160h160v256zm224 0H288V160h160v256z"] };
var faComment = { prefix: 'fas', iconName: 'comment', icon: [512, 512, [], "f075", "M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"] };
var faCommentAlt = { prefix: 'fas', iconName: 'comment-alt', icon: [512, 512, [], "f27a", "M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z"] };
var faCommentDots = { prefix: 'fas', iconName: 'comment-dots', icon: [512, 512, [], "f4ad", "M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"] };
var faCommentSlash = { prefix: 'fas', iconName: 'comment-slash', icon: [640, 512, [], "f4b3", "M64 240c0 49.6 21.4 95 57 130.7-12.6 50.3-54.3 95.2-54.8 95.8-2.2 2.3-2.8 5.7-1.5 8.7 1.3 2.9 4.1 4.8 7.3 4.8 66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 27.4 0 53.7-3.6 78.4-10L72.9 186.4c-5.6 17.1-8.9 35-8.9 53.6zm569.8 218.1l-114.4-88.4C554.6 334.1 576 289.2 576 240c0-114.9-114.6-208-256-208-65.1 0-124.2 20.1-169.4 52.7L45.5 3.4C38.5-2 28.5-.8 23 6.2L3.4 31.4c-5.4 7-4.2 17 2.8 22.4l588.4 454.7c7 5.4 17 4.2 22.5-2.8l19.6-25.3c5.4-6.8 4.1-16.9-2.9-22.3z"] };
var faComments = { prefix: 'fas', iconName: 'comments', icon: [576, 512, [], "f086", "M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"] };
var faCompactDisc = { prefix: 'fas', iconName: 'compact-disc', icon: [496, 512, [], "f51f", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM88 256H56c0-105.9 86.1-192 192-192v32c-88.2 0-160 71.8-160 160zm160 96c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"] };
var faCompass = { prefix: 'fas', iconName: 'compass', icon: [512, 512, [], "f14e", "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM307.446 120.844l-102.642 97.779a23.997 23.997 0 0 0-6.772 11.729l-33.359 137.779c-5.68 23.459 22.777 39.318 39.88 23.024l102.64-97.779a23.99 23.99 0 0 0 6.772-11.729l33.359-137.779c5.618-23.198-22.591-39.493-39.878-23.024zM256 224c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z"] };
var faCompress = { prefix: 'fas', iconName: 'compress', icon: [448, 512, [], "f066", "M436 192H312c-13.3 0-24-10.7-24-24V44c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-276-24V44c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 300V344c0-13.3-10.7-24-24-24H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12H312c-13.3 0-24 10.7-24 24v124c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"] };
var faCopy = { prefix: 'fas', iconName: 'copy', icon: [448, 512, [], "f0c5", "M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"] };
var faCopyright = { prefix: 'fas', iconName: 'copyright', icon: [512, 512, [], "f1f9", "M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm117.134 346.753c-1.592 1.867-39.776 45.731-109.851 45.731-84.692 0-144.484-63.26-144.484-145.567 0-81.303 62.004-143.401 143.762-143.401 66.957 0 101.965 37.315 103.422 38.904a12 12 0 0 1 1.238 14.623l-22.38 34.655c-4.049 6.267-12.774 7.351-18.234 2.295-.233-.214-26.529-23.88-61.88-23.88-46.116 0-73.916 33.575-73.916 76.082 0 39.602 25.514 79.692 74.277 79.692 38.697 0 65.28-28.338 65.544-28.625 5.132-5.565 14.059-5.033 18.508 1.053l24.547 33.572a12.001 12.001 0 0 1-.553 14.866z"] };
var faCouch = { prefix: 'fas', iconName: 'couch', icon: [640, 512, [], "f4b8", "M160 224v64h320v-64c0-35.3 28.7-64 64-64h32c0-53-43-96-96-96H160c-53 0-96 43-96 96h32c35.3 0 64 28.7 64 64zm416-32h-32c-17.7 0-32 14.3-32 32v96H128v-96c0-17.7-14.3-32-32-32H64c-35.3 0-64 28.7-64 64 0 23.6 13 44 32 55.1V432c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16v-16h384v16c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16V311.1c19-11.1 32-31.5 32-55.1 0-35.3-28.7-64-64-64z"] };
var faCreditCard = { prefix: 'fas', iconName: 'credit-card', icon: [576, 512, [], "f09d", "M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z"] };
var faCrop = { prefix: 'fas', iconName: 'crop', icon: [512, 512, [], "f125", "M488 352h-40V109.3l57-57c9.4-9.4 9.4-24.6 0-33.9L493.7 7c-9.4-9.4-24.6-9.4-33.9 0l-57 57H160V24c0-13.3-10.7-24-24-24H88C74.7 0 64 10.7 64 24v40H24C10.7 64 0 74.7 0 88v48c0 13.3 10.7 24 24 24h40v264c0 13.3 10.7 24 24 24h264v40c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24v-40h40c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24zM306.7 160L160 306.7V160h146.7zM205.3 352L352 205.3V352H205.3z"] };
var faCrosshairs = { prefix: 'fas', iconName: 'crosshairs', icon: [512, 512, [], "f05b", "M500 224h-30.364C455.724 130.325 381.675 56.276 288 42.364V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v30.364C130.325 56.276 56.276 130.325 42.364 224H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h30.364C56.276 381.675 130.325 455.724 224 469.636V500c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-30.364C381.675 455.724 455.724 381.675 469.636 288H500c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zM288 404.634V364c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40.634C165.826 392.232 119.783 346.243 107.366 288H148c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-40.634C119.768 165.826 165.757 119.783 224 107.366V148c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40.634C346.174 119.768 392.217 165.757 404.634 224H364c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40.634C392.232 346.174 346.243 392.217 288 404.634zM288 256c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z"] };
var faCrow = { prefix: 'fas', iconName: 'crow', icon: [640, 512, [], "f520", "M544 32h-16.36C513.04 12.68 490.09 0 464 0c-44.18 0-80 35.82-80 80v20.98L12.09 393.57A30.216 30.216 0 0 0 0 417.74c0 22.46 23.64 37.07 43.73 27.03L165.27 384h96.49l44.41 120.1c2.27 6.23 9.15 9.44 15.38 7.17l22.55-8.21c6.23-2.27 9.44-9.15 7.17-15.38L312.94 384H352c1.91 0 3.76-.23 5.66-.29l44.51 120.38c2.27 6.23 9.15 9.44 15.38 7.17l22.55-8.21c6.23-2.27 9.44-9.15 7.17-15.38l-41.24-111.53C485.74 352.8 544 279.26 544 192v-80l96-16c0-35.35-42.98-64-96-64zm-80 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"] };
var faCrown = { prefix: 'fas', iconName: 'crown', icon: [640, 512, [], "f521", "M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z"] };
var faCube = { prefix: 'fas', iconName: 'cube', icon: [512, 512, [], "f1b2", "M239.1 6.3l-208 78c-18.7 7-31.1 25-31.1 45v225.1c0 18.2 10.3 34.8 26.5 42.9l208 104c13.5 6.8 29.4 6.8 42.9 0l208-104c16.3-8.1 26.5-24.8 26.5-42.9V129.3c0-20-12.4-37.9-31.1-44.9l-208-78C262 2.2 250 2.2 239.1 6.3zM256 68.4l192 72v1.1l-192 78-192-78v-1.1l192-72zm32 356V275.5l160-65v133.9l-160 80z"] };
var faCubes = { prefix: 'fas', iconName: 'cubes', icon: [512, 512, [], "f1b3", "M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z"] };
var faCut = { prefix: 'fas', iconName: 'cut', icon: [448, 512, [], "f0c4", "M444.485 422.426c4.689 4.689 4.684 12.287 0 16.971-32.804 32.804-85.991 32.804-118.795 0L210.176 323.883l-24.859 24.859C189.63 359.657 192 371.552 192 384c0 53.019-42.981 96-96 96S0 437.019 0 384s42.981-96 96-96c4.536 0 8.995.322 13.363.93l32.93-32.93-32.93-32.93c-4.368.608-8.827.93-13.363.93-53.019 0-96-42.981-96-96s42.981-96 96-96 96 42.981 96 96c0 12.448-2.37 24.343-6.682 35.258l24.859 24.859L325.69 72.603c32.804-32.804 85.991-32.804 118.795 0 4.684 4.684 4.689 12.282 0 16.971L278.059 256l166.426 166.426zM96 96c-17.645 0-32 14.355-32 32s14.355 32 32 32 32-14.355 32-32-14.355-32-32-32m0 256c-17.645 0-32 14.355-32 32s14.355 32 32 32 32-14.355 32-32-14.355-32-32-32m112-108c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z"] };
var faDatabase = { prefix: 'fas', iconName: 'database', icon: [448, 512, [], "f1c0", "M448 73.143v45.714C448 159.143 347.667 192 224 192S0 159.143 0 118.857V73.143C0 32.857 100.333 0 224 0s224 32.857 224 73.143zM448 176v102.857C448 319.143 347.667 352 224 352S0 319.143 0 278.857V176c48.125 33.143 136.208 48.572 224 48.572S399.874 209.143 448 176zm0 160v102.857C448 479.143 347.667 512 224 512S0 479.143 0 438.857V336c48.125 33.143 136.208 48.572 224 48.572S399.874 369.143 448 336z"] };
var faDeaf = { prefix: 'fas', iconName: 'deaf', icon: [512, 512, [], "f2a4", "M216 260c0 15.464-12.536 28-28 28s-28-12.536-28-28c0-44.112 35.888-80 80-80s80 35.888 80 80c0 15.464-12.536 28-28 28s-28-12.536-28-28c0-13.234-10.767-24-24-24s-24 10.766-24 24zm24-176c-97.047 0-176 78.953-176 176 0 15.464 12.536 28 28 28s28-12.536 28-28c0-66.168 53.832-120 120-120s120 53.832 120 120c0 75.164-71.009 70.311-71.997 143.622L288 404c0 28.673-23.327 52-52 52-15.464 0-28 12.536-28 28s12.536 28 28 28c59.475 0 107.876-48.328 108-107.774.595-34.428 72-48.24 72-144.226 0-97.047-78.953-176-176-176zm268.485-52.201L480.2 3.515c-4.687-4.686-12.284-4.686-16.971 0L376.2 90.544c-4.686 4.686-4.686 12.284 0 16.971l28.285 28.285c4.686 4.686 12.284 4.686 16.97 0l87.03-87.029c4.687-4.688 4.687-12.286 0-16.972zM168.97 314.745c-4.686-4.686-12.284-4.686-16.97 0L3.515 463.23c-4.686 4.686-4.686 12.284 0 16.971L31.8 508.485c4.687 4.686 12.284 4.686 16.971 0L197.256 360c4.686-4.686 4.686-12.284 0-16.971l-28.286-28.284z"] };
var faDesktop = { prefix: 'fas', iconName: 'desktop', icon: [576, 512, [], "f108", "M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z"] };
var faDiagnoses = { prefix: 'fas', iconName: 'diagnoses', icon: [640, 512, [], "f470", "M496 256c8.8 0 16-7.2 16-16s-7.2-16-16-16-16 7.2-16 16 7.2 16 16 16zm-176-80c48.5 0 88-39.5 88-88S368.5 0 320 0s-88 39.5-88 88 39.5 88 88 88zM59.8 364c10.2 15.3 29.3 17.8 42.9 9.8 16.2-9.6 56.2-31.7 105.3-48.6V416h224v-90.7c49.1 16.8 89.1 39 105.3 48.6 13.6 8 32.7 5.3 42.9-9.8l17.8-26.7c8.8-13.2 7.6-34.6-10-45.1-11.9-7.1-29.7-17-51.1-27.4-28.1 46.1-99.4 17.8-87.7-35.1C409.3 217.2 365.1 208 320 208c-57 0-112.9 14.5-160 32.2-.2 40.2-47.6 63.3-79.2 36-11.2 6-21.3 11.6-28.7 16-17.6 10.5-18.8 31.8-10 45.1L59.8 364zM368 344c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm-96-96c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm-160 8c8.8 0 16-7.2 16-16s-7.2-16-16-16-16 7.2-16 16 7.2 16 16 16zm512 192H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z"] };
var faDice = { prefix: 'fas', iconName: 'dice', icon: [640, 512, [], "f522", "M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"] };
var faDiceFive = { prefix: 'fas', iconName: 'dice-five', icon: [448, 512, [], "f523", "M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.65-64-64-64zM128 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm96 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm96 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"] };
var faDiceFour = { prefix: 'fas', iconName: 'dice-four', icon: [448, 512, [], "f524", "M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.65-64-64-64zM128 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm192 192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"] };
var faDiceOne = { prefix: 'fas', iconName: 'dice-one', icon: [448, 512, [], "f525", "M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.65-64-64-64zM224 288c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"] };
var faDiceSix = { prefix: 'fas', iconName: 'dice-six', icon: [448, 512, [], "f526", "M384 0H64C28.65 0 0 28.65 0 64v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V64c0-35.35-28.65-64-64-64zM128 352c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm192 192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"] };
var faDiceThree = { prefix: 'fas', iconName: 'dice-three', icon: [448, 512, [], "f527", "M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.65-64-64-64zM128 192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm96 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm96 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"] };
var faDiceTwo = { prefix: 'fas', iconName: 'dice-two', icon: [448, 512, [], "f528", "M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.65-64-64-64zM128 192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm192 192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"] };
var faDivide = { prefix: 'fas', iconName: 'divide', icon: [448, 512, [], "f529", "M224 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm0-192c35.35 0 64-28.65 64-64s-28.65-64-64-64-64 28.65-64 64 28.65 64 64 64zm192 48H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"] };
var faDna = { prefix: 'fas', iconName: 'dna', icon: [448, 512, [], "f471", "M.1 494.1c-1.1 9.5 6.3 17.8 15.9 17.8l32.3.1c8.1 0 14.9-5.9 16-13.9.7-4.9 1.8-11.1 3.4-18.1H380c1.6 6.9 2.9 13.2 3.5 18.1 1.1 8 7.9 14 16 13.9l32.3-.1c9.6 0 17.1-8.3 15.9-17.8-4.6-37.9-25.6-129-118.9-207.7-17.6 12.4-37.1 24.2-58.5 35.4 6.2 4.6 11.4 9.4 17 14.2H159.7c21.3-18.1 47-35.6 78.7-51.4C410.5 199.1 442.1 65.8 447.9 17.9 449 8.4 441.6.1 432 .1L399.6 0c-8.1 0-14.9 5.9-16 13.9-.7 4.9-1.8 11.1-3.4 18.1H67.8c-1.6-7-2.7-13.1-3.4-18.1-1.1-8-7.9-14-16-13.9L16.1.1C6.5.1-1 8.4.1 17.9 5.3 60.8 31.4 171.8 160 256 31.5 340.2 5.3 451.2.1 494.1zM224 219.6c-25.1-13.7-46.4-28.4-64.3-43.6h128.5c-17.8 15.2-39.1 30-64.2 43.6zM355.1 96c-5.8 10.4-12.8 21.1-21 32H114c-8.3-10.9-15.3-21.6-21-32h262.1zM92.9 416c5.8-10.4 12.8-21.1 21-32h219.4c8.3 10.9 15.4 21.6 21.2 32H92.9z"] };
var faDollarSign = { prefix: 'fas', iconName: 'dollar-sign', icon: [288, 512, [], "f155", "M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"] };
var faDolly = { prefix: 'fas', iconName: 'dolly', icon: [576, 512, [], "f472", "M294.2 277.7c18 5 34.7 13.4 49.5 24.7l161.5-53.8c8.4-2.8 12.9-11.9 10.1-20.2L454.9 47.2c-2.8-8.4-11.9-12.9-20.2-10.1l-61.1 20.4 33.1 99.4L346 177l-33.1-99.4-61.6 20.5c-8.4 2.8-12.9 11.9-10.1 20.2l53 159.4zm281 48.7L565 296c-2.8-8.4-11.9-12.9-20.2-10.1l-213.5 71.2c-17.2-22-43.6-36.4-73.5-37L158.4 21.9C154 8.8 141.8 0 128 0H16C7.2 0 0 7.2 0 16v32c0 8.8 7.2 16 16 16h88.9l92.2 276.7c-26.1 20.4-41.7 53.6-36 90.5 6.1 39.4 37.9 72.3 77.3 79.2 60.2 10.7 112.3-34.8 113.4-92.6l213.3-71.2c8.3-2.8 12.9-11.8 10.1-20.2zM256 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"] };
var faDollyFlatbed = { prefix: 'fas', iconName: 'dolly-flatbed', icon: [640, 512, [], "f474", "M208 320h384c8.8 0 16-7.2 16-16V48c0-8.8-7.2-16-16-16H448v128l-48-32-48 32V32H208c-8.8 0-16 7.2-16 16v256c0 8.8 7.2 16 16 16zm416 64H128V16c0-8.8-7.2-16-16-16H16C7.2 0 0 7.2 0 16v32c0 8.8 7.2 16 16 16h48v368c0 8.8 7.2 16 16 16h82.9c-1.8 5-2.9 10.4-2.9 16 0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1.2-11-2.9-16H451c-1.8 5-2.9 10.4-2.9 16 0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1.2-11-2.9-16H624c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z"] };
var faDonate = { prefix: 'fas', iconName: 'donate', icon: [512, 512, [], "f4b9", "M256 416c114.9 0 208-93.1 208-208S370.9 0 256 0 48 93.1 48 208s93.1 208 208 208zM233.8 97.4V80.6c0-9.2 7.4-16.6 16.6-16.6h11.1c9.2 0 16.6 7.4 16.6 16.6v17c15.5.8 30.5 6.1 43 15.4 5.6 4.1 6.2 12.3 1.2 17.1L306 145.6c-3.8 3.7-9.5 3.8-14 1-5.4-3.4-11.4-5.1-17.8-5.1h-38.9c-9 0-16.3 8.2-16.3 18.3 0 8.2 5 15.5 12.1 17.6l62.3 18.7c25.7 7.7 43.7 32.4 43.7 60.1 0 34-26.4 61.5-59.1 62.4v16.8c0 9.2-7.4 16.6-16.6 16.6h-11.1c-9.2 0-16.6-7.4-16.6-16.6v-17c-15.5-.8-30.5-6.1-43-15.4-5.6-4.1-6.2-12.3-1.2-17.1l16.3-15.5c3.8-3.7 9.5-3.8 14-1 5.4 3.4 11.4 5.1 17.8 5.1h38.9c9 0 16.3-8.2 16.3-18.3 0-8.2-5-15.5-12.1-17.6l-62.3-18.7c-25.7-7.7-43.7-32.4-43.7-60.1.1-34 26.4-61.5 59.1-62.4zM480 352h-32.5c-19.6 26-44.6 47.7-73 64h63.8c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8h63.8c-28.4-16.3-53.3-38-73-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32z"] };
var faDoorClosed = { prefix: 'fas', iconName: 'door-closed', icon: [640, 512, [], "f52a", "M624 448H512V50.8C512 22.78 490.47 0 464 0H175.99c-26.47 0-48 22.78-48 50.8V448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM415.99 288c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32c.01 17.67-14.32 32-32 32z"] };
var faDoorOpen = { prefix: 'fas', iconName: 'door-open', icon: [640, 512, [], "f52b", "M624 448h-80V113.45C544 86.19 522.47 64 496 64H384v64h96v384h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM312.24 1.01l-192 49.74C105.99 54.44 96 67.7 96 82.92V448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h336V33.18c0-21.58-19.56-37.41-39.76-32.17zM264 288c-13.25 0-24-14.33-24-32s10.75-32 24-32 24 14.33 24 32-10.75 32-24 32z"] };
var faDotCircle = { prefix: 'fas', iconName: 'dot-circle', icon: [512, 512, [], "f192", "M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"] };
var faDove = { prefix: 'fas', iconName: 'dove', icon: [512, 512, [], "f4ba", "M288 167.2v-28.1c-28.2-36.3-47.1-79.3-54.1-125.2-2.1-13.5-19-18.8-27.8-8.3-21.1 24.9-37.7 54.1-48.9 86.5 34.2 38.3 80 64.6 130.8 75.1zM400 64c-44.2 0-80 35.9-80 80.1v59.4C215.6 197.3 127 133 87 41.8c-5.5-12.5-23.2-13.2-29-.9C41.4 76 32 115.2 32 156.6c0 70.8 34.1 136.9 85.1 185.9 13.2 12.7 26.1 23.2 38.9 32.8l-143.9 36C1.4 414-3.4 426.4 2.6 435.7 20 462.6 63 508.2 155.8 512c8 .3 16-2.6 22.1-7.9l65.2-56.1H320c88.4 0 160-71.5 160-159.9V128l32-64H400zm0 96.1c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z"] };
var faDownload = { prefix: 'fas', iconName: 'download', icon: [512, 512, [], "f019", "M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"] };
var faDumbbell = { prefix: 'fas', iconName: 'dumbbell', icon: [640, 512, [], "f44b", "M104 96H56c-13.3 0-24 10.7-24 24v104H8c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h24v104c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V120c0-13.3-10.7-24-24-24zm528 128h-24V120c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 24v272c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V288h24c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM456 32h-48c-13.3 0-24 10.7-24 24v168H256V56c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 24v400c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V288h128v168c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24z"] };
var faEdit = { prefix: 'fas', iconName: 'edit', icon: [576, 512, [], "f044", "M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"] };
var faEject = { prefix: 'fas', iconName: 'eject', icon: [448, 512, [], "f052", "M448 384v64c0 17.673-14.327 32-32 32H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h384c17.673 0 32 14.327 32 32zM48.053 320h351.886c41.651 0 63.581-49.674 35.383-80.435L259.383 47.558c-19.014-20.743-51.751-20.744-70.767 0L12.67 239.565C-15.475 270.268 6.324 320 48.053 320z"] };
var faEllipsisH = { prefix: 'fas', iconName: 'ellipsis-h', icon: [512, 512, [], "f141", "M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"] };
var faEllipsisV = { prefix: 'fas', iconName: 'ellipsis-v', icon: [192, 512, [], "f142", "M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"] };
var faEnvelope = { prefix: 'fas', iconName: 'envelope', icon: [512, 512, [], "f0e0", "M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"] };
var faEnvelopeOpen = { prefix: 'fas', iconName: 'envelope-open', icon: [512, 512, [], "f2b6", "M512 464c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V200.724a48 48 0 0 1 18.387-37.776c24.913-19.529 45.501-35.365 164.2-121.511C199.412 29.17 232.797-.347 256 .003c23.198-.354 56.596 29.172 73.413 41.433 118.687 86.137 139.303 101.995 164.2 121.512A48 48 0 0 1 512 200.724V464zm-65.666-196.605c-2.563-3.728-7.7-4.595-11.339-1.907-22.845 16.873-55.462 40.705-105.582 77.079-16.825 12.266-50.21 41.781-73.413 41.43-23.211.344-56.559-29.143-73.413-41.43-50.114-36.37-82.734-60.204-105.582-77.079-3.639-2.688-8.776-1.821-11.339 1.907l-9.072 13.196a7.998 7.998 0 0 0 1.839 10.967c22.887 16.899 55.454 40.69 105.303 76.868 20.274 14.781 56.524 47.813 92.264 47.573 35.724.242 71.961-32.771 92.263-47.573 49.85-36.179 82.418-59.97 105.303-76.868a7.998 7.998 0 0 0 1.839-10.967l-9.071-13.196z"] };
var faEnvelopeSquare = { prefix: 'fas', iconName: 'envelope-square', icon: [448, 512, [], "f199", "M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM178.117 262.104C87.429 196.287 88.353 196.121 64 177.167V152c0-13.255 10.745-24 24-24h272c13.255 0 24 10.745 24 24v25.167c-24.371 18.969-23.434 19.124-114.117 84.938-10.5 7.655-31.392 26.12-45.883 25.894-14.503.218-35.367-18.227-45.883-25.895zM384 217.775V360c0 13.255-10.745 24-24 24H88c-13.255 0-24-10.745-24-24V217.775c13.958 10.794 33.329 25.236 95.303 70.214 14.162 10.341 37.975 32.145 64.694 32.01 26.887.134 51.037-22.041 64.72-32.025 61.958-44.965 81.325-59.406 95.283-70.199z"] };
var faEquals = { prefix: 'fas', iconName: 'equals', icon: [448, 512, [], "f52c", "M416 304H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32zm0-192H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"] };
var faEraser = { prefix: 'fas', iconName: 'eraser', icon: [512, 512, [], "f12d", "M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z"] };
var faEuroSign = { prefix: 'fas', iconName: 'euro-sign', icon: [320, 512, [], "f153", "M310.706 413.765c-1.314-6.63-7.835-10.872-14.424-9.369-10.692 2.439-27.422 5.413-45.426 5.413-56.763 0-101.929-34.79-121.461-85.449h113.689a12 12 0 0 0 11.708-9.369l6.373-28.36c1.686-7.502-4.019-14.631-11.708-14.631H115.22c-1.21-14.328-1.414-28.287.137-42.245H261.95a12 12 0 0 0 11.723-9.434l6.512-29.755c1.638-7.484-4.061-14.566-11.723-14.566H130.184c20.633-44.991 62.69-75.03 117.619-75.03 14.486 0 28.564 2.25 37.851 4.145 6.216 1.268 12.347-2.498 14.002-8.623l11.991-44.368c1.822-6.741-2.465-13.616-9.326-14.917C290.217 34.912 270.71 32 249.635 32 152.451 32 74.03 92.252 45.075 176H12c-6.627 0-12 5.373-12 12v29.755c0 6.627 5.373 12 12 12h21.569c-1.009 13.607-1.181 29.287-.181 42.245H12c-6.627 0-12 5.373-12 12v28.36c0 6.627 5.373 12 12 12h30.114C67.139 414.692 145.264 480 249.635 480c26.301 0 48.562-4.544 61.101-7.788 6.167-1.595 10.027-7.708 8.788-13.957l-8.818-44.49z"] };
var faExchangeAlt = { prefix: 'fas', iconName: 'exchange-alt', icon: [512, 512, [], "f362", "M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"] };
var faExclamation = { prefix: 'fas', iconName: 'exclamation', icon: [192, 512, [], "f12a", "M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"] };
var faExclamationCircle = { prefix: 'fas', iconName: 'exclamation-circle', icon: [512, 512, [], "f06a", "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"] };
var faExclamationTriangle = { prefix: 'fas', iconName: 'exclamation-triangle', icon: [576, 512, [], "f071", "M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"] };
var faExpand = { prefix: 'fas', iconName: 'expand', icon: [448, 512, [], "f065", "M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"] };
var faExpandArrowsAlt = { prefix: 'fas', iconName: 'expand-arrows-alt', icon: [448, 512, [], "f31e", "M448.1 344v112c0 13.3-10.7 24-24 24h-112c-21.4 0-32.1-25.9-17-41l36.2-36.2L224 295.6 116.8 402.9 153 439c15.1 15.1 4.4 41-17 41H24c-13.3 0-24-10.7-24-24V344c0-21.4 25.9-32.1 41-17l36.2 36.2L184.5 256 77.2 148.7 41 185c-15.1 15.1-41 4.4-41-17V56c0-13.3 10.7-24 24-24h112c21.4 0 32.1 25.9 17 41l-36.2 36.2L224 216.4l107.3-107.3L295.1 73c-15.1-15.1-4.4-41 17-41h112c13.3 0 24 10.7 24 24v112c0 21.4-25.9 32.1-41 17l-36.2-36.2L263.6 256l107.3 107.3 36.2-36.2c15.1-15.2 41-4.5 41 16.9z"] };
var faExternalLinkAlt = { prefix: 'fas', iconName: 'external-link-alt', icon: [576, 512, [], "f35d", "M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z"] };
var faExternalLinkSquareAlt = { prefix: 'fas', iconName: 'external-link-square-alt', icon: [448, 512, [], "f360", "M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-88 16H248.029c-21.313 0-32.08 25.861-16.971 40.971l31.984 31.987L67.515 364.485c-4.686 4.686-4.686 12.284 0 16.971l31.029 31.029c4.687 4.686 12.285 4.686 16.971 0l195.526-195.526 31.988 31.991C358.058 263.977 384 253.425 384 231.979V120c0-13.255-10.745-24-24-24z"] };
var faEye = { prefix: 'fas', iconName: 'eye', icon: [576, 512, [], "f06e", "M569.354 231.631C512.969 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-75.162 0-136-60.827-136-136 0-75.162 60.826-136 136-136 75.162 0 136 60.826 136 136 0 75.162-60.826 136-136 136zm104-136c0 57.438-46.562 104-104 104s-104-46.562-104-104c0-17.708 4.431-34.379 12.236-48.973l-.001.032c0 23.651 19.173 42.823 42.824 42.823s42.824-19.173 42.824-42.823c0-23.651-19.173-42.824-42.824-42.824l-.032.001C253.621 156.431 270.292 152 288 152c57.438 0 104 46.562 104 104z"] };
var faEyeDropper = { prefix: 'fas', iconName: 'eye-dropper', icon: [512, 512, [], "f1fb", "M177.38 206.64L39.03 344.97A24.01 24.01 0 0 0 32 361.94V424L0 480l32 32 56-32h62.06c6.36 0 12.47-2.53 16.97-7.03l138.35-138.33-128-128zm225.552 30.47l16.952 16.95c9.37 9.37 9.37 24.57 0 33.94l-40.973 40.97c-9.292 9.312-24.506 9.434-33.94 0L183.028 167.03c-9.37-9.37-9.37-24.57 0-33.94L224 92.12c9.289-9.309 24.502-9.438 33.94 0l16.992 16.99 82.606-82.601c35.19-35.19 92.5-35.5 128 0 40.49 48.08 29.66 98.34 0 128l-82.606 82.601z"] };
var faEyeSlash = { prefix: 'fas', iconName: 'eye-slash', icon: [576, 512, [], "f070", "M286.693 391.984l32.579 46.542A333.958 333.958 0 0 1 288 440C168.19 440 63.031 376.051 6.646 280.369a47.999 47.999 0 0 1 0-48.739c24.023-40.766 56.913-75.775 96.024-102.537l57.077 81.539C154.736 224.82 152 240.087 152 256c0 74.736 60.135 135.282 134.693 135.984zm282.661-111.615c-31.667 53.737-78.747 97.46-135.175 125.475l.011.015 41.47 59.2c7.6 10.86 4.96 25.82-5.9 33.42l-13.11 9.18c-10.86 7.6-25.82 4.96-33.42-5.9L100.34 46.94c-7.6-10.86-4.96-25.82 5.9-33.42l13.11-9.18c10.86-7.6 25.82-4.96 33.42 5.9l51.038 72.617C230.68 75.776 258.905 72 288 72c119.81 0 224.969 63.949 281.354 159.631a48.002 48.002 0 0 1 0 48.738zM424 256c0-75.174-60.838-136-136-136-17.939 0-35.056 3.473-50.729 9.772l19.299 27.058c25.869-8.171 55.044-6.163 80.4 7.41h-.03c-23.65 0-42.82 19.17-42.82 42.82 0 23.626 19.147 42.82 42.82 42.82 23.65 0 42.82-19.17 42.82-42.82v-.03c18.462 34.49 16.312 77.914-8.25 110.95v.01l19.314 27.061C411.496 321.2 424 290.074 424 256zM262.014 356.727l-77.53-110.757c-5.014 52.387 29.314 98.354 77.53 110.757z"] };
var faFastBackward = { prefix: 'fas', iconName: 'fast-backward', icon: [512, 512, [], "f049", "M0 436V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v151.9L235.5 71.4C256.1 54.3 288 68.6 288 96v131.9L459.5 71.4C480.1 54.3 512 68.6 512 96v320c0 27.4-31.9 41.7-52.5 24.6L288 285.3V416c0 27.4-31.9 41.7-52.5 24.6L64 285.3V436c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12z"] };
var faFastForward = { prefix: 'fas', iconName: 'fast-forward', icon: [512, 512, [], "f050", "M512 76v360c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V284.1L276.5 440.6c-20.6 17.2-52.5 2.8-52.5-24.6V284.1L52.5 440.6C31.9 457.8 0 443.4 0 416V96c0-27.4 31.9-41.7 52.5-24.6L224 226.8V96c0-27.4 31.9-41.7 52.5-24.6L448 226.8V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12z"] };
var faFax = { prefix: 'fas', iconName: 'fax', icon: [512, 512, [], "f1ac", "M128 144v320c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V144c0-26.51 21.49-48 48-48h32c26.51 0 48 21.49 48 48zm384 64v256c0 26.51-21.49 48-48 48H192c-26.51 0-48-21.49-48-48V40c0-22.091 17.909-40 40-40h207.432a39.996 39.996 0 0 1 28.284 11.716l48.569 48.569A39.999 39.999 0 0 1 480 88.568v74.174c18.641 6.591 32 24.36 32 45.258zm-320-16h240V96h-24c-13.203 0-24-10.797-24-24V48H192v144zm96 204c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40zm0-128c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40zm128 128c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40zm0-128c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40z"] };
var faFeather = { prefix: 'fas', iconName: 'feather', icon: [512, 512, [], "f52d", "M512 0C504.81.01 98.51 22.01 71.47 287.42c-2.62 22.6-4.22 45.28-5.37 67.98l160.65-160.65c6.25-6.25 16.38-6.25 22.62 0s6.25 16.38 0 22.62l-240 240a31.9 31.9 0 0 0-9.38 22.67C.02 497.68 14.33 512 32 512c8.19 0 16.38-3.12 22.62-9.38l55.05-55.05c38.4-.5 76.76-2.63 114.91-7.05 11.58-1.18 22.54-3.29 33.21-5.84L256 384h101.86c12.61-10.63 24.12-22.45 34.76-35.07L384 288h50.19C502.8 163.6 512 .1 512 0z"] };
var faFemale = { prefix: 'fas', iconName: 'female', icon: [256, 512, [], "f182", "M128 0c35.346 0 64 28.654 64 64s-28.654 64-64 64c-35.346 0-64-28.654-64-64S92.654 0 128 0m119.283 354.179l-48-192A24 24 0 0 0 176 144h-11.36c-22.711 10.443-49.59 10.894-73.28 0H80a24 24 0 0 0-23.283 18.179l-48 192C4.935 369.305 16.383 384 32 384h56v104c0 13.255 10.745 24 24 24h32c13.255 0 24-10.745 24-24V384h56c15.591 0 27.071-14.671 23.283-29.821z"] };
var faFighterJet = { prefix: 'fas', iconName: 'fighter-jet', icon: [640, 512, [], "f0fb", "M544 224l-128-16-48-16h-24L227.158 44h39.509C278.333 44 288 41.375 288 38s-9.667-6-21.333-6H152v12h16v164h-48l-66.667-80H18.667L8 138.667V208h8v16h48v2.666l-64 8v42.667l64 8V288H16v16H8v69.333L18.667 384h34.667L120 304h48v164h-16v12h114.667c11.667 0 21.333-2.625 21.333-6s-9.667-6-21.333-6h-39.509L344 320h24l48-16 128-16c96-21.333 96-26.583 96-32 0-5.417 0-10.667-96-32z"] };
var faFile = { prefix: 'fas', iconName: 'file', icon: [384, 512, [], "f15b", "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"] };
var faFileAlt = { prefix: 'fas', iconName: 'file-alt', icon: [384, 512, [], "f15c", "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"] };
var faFileArchive = { prefix: 'fas', iconName: 'file-archive', icon: [384, 512, [], "f1c6", "M224 136V0h-63.6v32h-32V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM95.9 32h32v32h-32V32zm32.3 384c-33.2 0-58-30.4-51.4-62.9L96.4 256v-32h32v-32h-32v-32h32v-32h-32V96h32V64h32v32h-32v32h32v32h-32v32h32v32h-32v32h22.1c5.7 0 10.7 4.1 11.8 9.7l17.3 87.7c6.4 32.4-18.4 62.6-51.4 62.6zm32.7-53c0 14.9-14.5 27-32.4 27S96 378 96 363c0-14.9 14.5-27 32.4-27s32.5 12.1 32.5 27zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"] };
var faFileAudio = { prefix: 'fas', iconName: 'file-audio', icon: [384, 512, [], "f1c7", "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm-64 268c0 10.7-12.9 16-20.5 8.5L104 376H76c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h28l35.5-36.5c7.6-7.6 20.5-2.2 20.5 8.5v136zm33.2-47.6c9.1-9.3 9.1-24.1 0-33.4-22.1-22.8 12.2-56.2 34.4-33.5 27.2 27.9 27.2 72.4 0 100.4-21.8 22.3-56.9-10.4-34.4-33.5zm86-117.1c54.4 55.9 54.4 144.8 0 200.8-21.8 22.4-57-10.3-34.4-33.5 36.2-37.2 36.3-96.5 0-133.8-22.1-22.8 12.3-56.3 34.4-33.5zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"] };
var faFileCode = { prefix: 'fas', iconName: 'file-code', icon: [384, 512, [], "f1c9", "M384 121.941V128H256V0h6.059c6.365 0 12.47 2.529 16.971 7.029l97.941 97.941A24.005 24.005 0 0 1 384 121.941zM248 160c-13.2 0-24-10.8-24-24V0H24C10.745 0 0 10.745 0 24v464c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248zM123.206 400.505a5.4 5.4 0 0 1-7.633.246l-64.866-60.812a5.4 5.4 0 0 1 0-7.879l64.866-60.812a5.4 5.4 0 0 1 7.633.246l19.579 20.885a5.4 5.4 0 0 1-.372 7.747L101.65 336l40.763 35.874a5.4 5.4 0 0 1 .372 7.747l-19.579 20.884zm51.295 50.479l-27.453-7.97a5.402 5.402 0 0 1-3.681-6.692l61.44-211.626a5.402 5.402 0 0 1 6.692-3.681l27.452 7.97a5.4 5.4 0 0 1 3.68 6.692l-61.44 211.626a5.397 5.397 0 0 1-6.69 3.681zm160.792-111.045l-64.866 60.812a5.4 5.4 0 0 1-7.633-.246l-19.58-20.885a5.4 5.4 0 0 1 .372-7.747L284.35 336l-40.763-35.874a5.4 5.4 0 0 1-.372-7.747l19.58-20.885a5.4 5.4 0 0 1 7.633-.246l64.866 60.812a5.4 5.4 0 0 1-.001 7.879z"] };
var faFileExcel = { prefix: 'fas', iconName: 'file-excel', icon: [384, 512, [], "f1c3", "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm60.1 106.5L224 336l60.1 93.5c5.1 8-.6 18.5-10.1 18.5h-34.9c-4.4 0-8.5-2.4-10.6-6.3C208.9 405.5 192 373 192 373c-6.4 14.8-10 20-36.6 68.8-2.1 3.9-6.1 6.3-10.5 6.3H110c-9.5 0-15.2-10.5-10.1-18.5l60.3-93.5-60.3-93.5c-5.2-8 .6-18.5 10.1-18.5h34.8c4.4 0 8.5 2.4 10.6 6.3 26.1 48.8 20 33.6 36.6 68.5 0 0 6.1-11.7 36.6-68.5 2.1-3.9 6.2-6.3 10.6-6.3H274c9.5-.1 15.2 10.4 10.1 18.4zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"] };
var faFileImage = { prefix: 'fas', iconName: 'file-image', icon: [384, 512, [], "f1c5", "M384 121.941V128H256V0h6.059a24 24 0 0 1 16.97 7.029l97.941 97.941a24.002 24.002 0 0 1 7.03 16.971zM248 160c-13.2 0-24-10.8-24-24V0H24C10.745 0 0 10.745 0 24v464c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248zm-135.455 16c26.51 0 48 21.49 48 48s-21.49 48-48 48-48-21.49-48-48 21.491-48 48-48zm208 240h-256l.485-48.485L104.545 328c4.686-4.686 11.799-4.201 16.485.485L160.545 368 264.06 264.485c4.686-4.686 12.284-4.686 16.971 0L320.545 304v112z"] };
var faFileMedical = { prefix: 'fas', iconName: 'file-medical', icon: [384, 512, [], "f477", "M377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 160v48c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8z"] };
var faFileMedicalAlt = { prefix: 'fas', iconName: 'file-medical-alt', icon: [448, 512, [], "f478", "M288 136V0H88C74.7 0 64 10.7 64 24v232H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h140.9c3 0 5.8 1.7 7.2 4.4l19.9 39.8 56.8-113.7c2.9-5.9 11.4-5.9 14.3 0l34.7 69.5H352c8.8 0 16 7.2 16 16s-7.2 16-16 16h-89.9L240 275.8l-56.8 113.7c-2.9 5.9-11.4 5.9-14.3 0L134.1 320H64v168c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H312c-13.2 0-24-10.8-24-24zm153-31L343.1 7c-4.5-4.5-10.6-7-17-7H320v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"] };
var faFilePdf = { prefix: 'fas', iconName: 'file-pdf', icon: [384, 512, [], "f1c1", "M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z"] };
var faFilePowerpoint = { prefix: 'fas', iconName: 'file-powerpoint', icon: [384, 512, [], "f1c4", "M193.7 271.2c8.8 0 15.5 2.7 20.3 8.1 9.6 10.9 9.8 32.7-.2 44.1-4.9 5.6-11.9 8.5-21.1 8.5h-26.9v-60.7h27.9zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm53 165.2c0 90.3-88.8 77.6-111.1 77.6V436c0 6.6-5.4 12-12 12h-30.8c-6.6 0-12-5.4-12-12V236.2c0-6.6 5.4-12 12-12h81c44.5 0 72.9 32.8 72.9 77z"] };
var faFileVideo = { prefix: 'fas', iconName: 'file-video', icon: [384, 512, [], "f1c8", "M384 121.941V128H256V0h6.059c6.365 0 12.47 2.529 16.971 7.029l97.941 97.941A24.005 24.005 0 0 1 384 121.941zM224 136V0H24C10.745 0 0 10.745 0 24v464c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248c-13.2 0-24-10.8-24-24zm96 144.016v111.963c0 21.445-25.943 31.998-40.971 16.971L224 353.941V392c0 13.255-10.745 24-24 24H88c-13.255 0-24-10.745-24-24V280c0-13.255 10.745-24 24-24h112c13.255 0 24 10.745 24 24v38.059l55.029-55.013c15.011-15.01 40.971-4.491 40.971 16.97z"] };
var faFileWord = { prefix: 'fas', iconName: 'file-word', icon: [384, 512, [], "f1c2", "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm57.1 120H305c7.7 0 13.4 7.1 11.7 14.7l-38 168c-1.2 5.5-6.1 9.3-11.7 9.3h-38c-5.5 0-10.3-3.8-11.6-9.1-25.8-103.5-20.8-81.2-25.6-110.5h-.5c-1.1 14.3-2.4 17.4-25.6 110.5-1.3 5.3-6.1 9.1-11.6 9.1H117c-5.6 0-10.5-3.9-11.7-9.4l-37.8-168c-1.7-7.5 4-14.6 11.7-14.6h24.5c5.7 0 10.7 4 11.8 9.7 15.6 78 20.1 109.5 21 122.2 1.6-10.2 7.3-32.7 29.4-122.7 1.3-5.4 6.1-9.1 11.7-9.1h29.1c5.6 0 10.4 3.8 11.7 9.2 24 100.4 28.8 124 29.6 129.4-.2-11.2-2.6-17.8 21.6-129.2 1-5.6 5.9-9.5 11.5-9.5zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"] };
var faFilm = { prefix: 'fas', iconName: 'film', icon: [512, 512, [], "f008", "M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"] };
var faFilter = { prefix: 'fas', iconName: 'filter', icon: [512, 512, [], "f0b0", "M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"] };
var faFire = { prefix: 'fas', iconName: 'fire', icon: [384, 512, [], "f06d", "M216 23.858c0-23.802-30.653-32.765-44.149-13.038C48 191.851 224 200 224 288c0 35.629-29.114 64.458-64.85 63.994C123.98 351.538 96 322.22 96 287.046v-85.51c0-21.703-26.471-32.225-41.432-16.504C27.801 213.158 0 261.332 0 320c0 105.869 86.131 192 192 192s192-86.131 192-192c0-170.29-168-193.003-168-296.142z"] };
var faFireExtinguisher = { prefix: 'fas', iconName: 'fire-extinguisher', icon: [448, 512, [], "f134", "M434.027 26.329l-168 28C254.693 56.218 256 67.8 256 72h-58.332C208.353 36.108 181.446 0 144 0c-39.435 0-66.368 39.676-52.228 76.203-52.039 13.051-75.381 54.213-90.049 90.884-4.923 12.307 1.063 26.274 13.37 31.197 12.317 4.926 26.279-1.075 31.196-13.37C75.058 112.99 106.964 120 168 120v27.076c-41.543 10.862-72 49.235-72 94.129V488c0 13.255 10.745 24 24 24h144c13.255 0 24-10.745 24-24V240c0-44.731-30.596-82.312-72-92.97V120h40c0 2.974-1.703 15.716 10.027 17.671l168 28C441.342 166.89 448 161.25 448 153.834V38.166c0-7.416-6.658-13.056-13.973-11.837zM144 72c-8.822 0-16-7.178-16-16s7.178-16 16-16 16 7.178 16 16-7.178 16-16 16z"] };
var faFirstAid = { prefix: 'fas', iconName: 'first-aid', icon: [576, 512, [], "f479", "M0 80v352c0 26.5 21.5 48 48 48h48V32H48C21.5 32 0 53.5 0 80zm128 400h320V32H128v448zm64-248c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48zM528 32h-48v448h48c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"] };
var faFlag = { prefix: 'fas', iconName: 'flag', icon: [512, 512, [], "f024", "M349.565 98.783C295.978 98.783 251.721 64 184.348 64c-24.955 0-47.309 4.384-68.045 12.013a55.947 55.947 0 0 0 3.586-23.562C118.117 24.015 94.806 1.206 66.338.048 34.345-1.254 8 24.296 8 56c0 19.026 9.497 35.825 24 45.945V488c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-94.4c28.311-12.064 63.582-22.122 114.435-22.122 53.588 0 97.844 34.783 165.217 34.783 48.169 0 86.667-16.294 122.505-40.858C506.84 359.452 512 349.571 512 339.045v-243.1c0-23.393-24.269-38.87-45.485-29.016-34.338 15.948-76.454 31.854-116.95 31.854z"] };
var faFlagCheckered = { prefix: 'fas', iconName: 'flag-checkered', icon: [512, 512, [], "f11e", "M466.515 66.928C487.731 57.074 512 72.551 512 95.944v243.1c0 10.526-5.161 20.407-13.843 26.358-35.837 24.564-74.335 40.858-122.505 40.858-67.373 0-111.63-34.783-165.217-34.783-50.853 0-86.124 10.058-114.435 22.122V488c0 13.255-10.745 24-24 24H56c-13.255 0-24-10.745-24-24V101.945C17.497 91.825 8 75.026 8 56 8 24.296 34.345-1.254 66.338.048c28.468 1.158 51.779 23.968 53.551 52.404.52 8.342-.81 16.31-3.586 23.562C137.039 68.384 159.393 64 184.348 64c67.373 0 111.63 34.783 165.217 34.783 40.496 0 82.612-15.906 116.95-31.855zM96 134.63v70.49c29-10.67 51.18-17.83 73.6-20.91v-71.57c-23.5 2.17-40.44 9.79-73.6 21.99zm220.8 9.19c-26.417-4.672-49.886-13.979-73.6-21.34v67.42c24.175 6.706 47.566 16.444 73.6 22.31v-68.39zm-147.2 40.39v70.04c32.796-2.978 53.91-.635 73.6 3.8V189.9c-25.247-7.035-46.581-9.423-73.6-5.69zm73.6 142.23c26.338 4.652 49.732 13.927 73.6 21.34v-67.41c-24.277-6.746-47.54-16.45-73.6-22.32v68.39zM96 342.1c23.62-8.39 47.79-13.84 73.6-16.56v-71.29c-26.11 2.35-47.36 8.04-73.6 17.36v70.49zm368-221.6c-21.3 8.85-46.59 17.64-73.6 22.47v71.91c27.31-4.36 50.03-14.1 73.6-23.89V120.5zm0 209.96v-70.49c-22.19 14.2-48.78 22.61-73.6 26.02v71.58c25.07-2.38 48.49-11.04 73.6-27.11zM316.8 212.21v68.16c25.664 7.134 46.616 9.342 73.6 5.62v-71.11c-25.999 4.187-49.943 2.676-73.6-2.67z"] };
var faFlask = { prefix: 'fas', iconName: 'flask', icon: [448, 512, [], "f0c3", "M437.2 403.5L320 215V64h8c13.3 0 24-10.7 24-24V24c0-13.3-10.7-24-24-24H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h8v151L10.8 403.5C-18.5 450.6 15.3 512 70.9 512h306.2c55.7 0 89.4-61.5 60.1-108.5zM137.9 320l48.2-77.6c3.7-5.2 5.8-11.6 5.8-18.4V64h64v160c0 6.9 2.2 13.2 5.8 18.4l48.2 77.6h-172z"] };
var faFolder = { prefix: 'fas', iconName: 'folder', icon: [512, 512, [], "f07b", "M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z"] };
var faFolderOpen = { prefix: 'fas', iconName: 'folder-open', icon: [576, 512, [], "f07c", "M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"] };
var faFont = { prefix: 'fas', iconName: 'font', icon: [448, 512, [], "f031", "M152 416h-24.013l26.586-80.782H292.8L319.386 416H296c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h136c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-26.739L275.495 42.746A16 16 0 0 0 260.382 32h-72.766a16 16 0 0 0-15.113 10.746L42.739 416H16c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h136c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16zm64.353-271.778c4.348-15.216 6.61-28.156 7.586-34.644.839 6.521 2.939 19.476 7.727 34.706l41.335 124.006h-98.619l41.971-124.068z"] };
var faFontAwesomeLogoFull = { prefix: 'fas', iconName: 'font-awesome-logo-full', icon: [3992, 512, ["Font Awesome"], "f4e6", "M454.6 0H57.4C25.9 0 0 25.9 0 57.4v397.3C0 486.1 25.9 512 57.4 512h397.3c31.4 0 57.4-25.9 57.4-57.4V57.4C512 25.9 486.1 0 454.6 0zm-58.9 324.9c0 4.8-4.1 6.9-8.9 8.9-19.2 8.1-39.7 15.7-61.5 15.7-40.5 0-68.7-44.8-163.2 2.5v51.8c0 30.3-45.7 30.2-45.7 0v-250c-9-7-15-17.9-15-30.3 0-21 17.1-38.2 38.2-38.2 21 0 38.2 17.1 38.2 38.2 0 12.2-5.8 23.2-14.9 30.2v21c37.1-12 65.5-34.4 146.1-3.4 26.6 11.4 68.7-15.7 76.5-15.7 5.5 0 10.3 4.1 10.3 8.9v160.4zm432.9-174.2h-137v70.1H825c39.8 0 40.4 62.2 0 62.2H691.6v105.6c0 45.5-70.7 46.4-70.7 0V128.3c0-22 18-39.8 39.8-39.8h167.8c39.6 0 40.5 62.2.1 62.2zm191.1 23.4c-169.3 0-169.1 252.4 0 252.4 169.9 0 169.9-252.4 0-252.4zm0 196.1c-81.6 0-82.1-139.8 0-139.8 82.5 0 82.4 139.8 0 139.8zm372.4 53.4c-17.5 0-31.4-13.9-31.4-31.4v-117c0-62.4-72.6-52.5-99.1-16.4v133.4c0 41.5-63.3 41.8-63.3 0V208c0-40 63.1-41.6 63.1 0v3.4c43.3-51.6 162.4-60.4 162.4 39.3v141.5c.3 30.4-31.5 31.4-31.7 31.4zm179.7 2.9c-44.3 0-68.3-22.9-68.3-65.8V235.2H1488c-35.6 0-36.7-55.3 0-55.3h15.5v-37.3c0-41.3 63.8-42.1 63.8 0v37.5h24.9c35.4 0 35.7 55.3 0 55.3h-24.9v108.5c0 29.6 26.1 26.3 27.4 26.3 31.4 0 52.6 56.3-22.9 56.3zM1992 123c-19.5-50.2-95.5-50-114.5 0-107.3 275.7-99.5 252.7-99.5 262.8 0 42.8 58.3 51.2 72.1 14.4l13.5-35.9H2006l13 35.9c14.2 37.7 72.1 27.2 72.1-14.4 0-10.1 5.3 6.8-99.1-262.8zm-108.9 179.1l51.7-142.9 51.8 142.9h-103.5zm591.3-85.6l-53.7 176.3c-12.4 41.2-72 41-84 0l-42.3-135.9-42.3 135.9c-12.4 40.9-72 41.2-84.5 0l-54.2-176.3c-12.5-39.4 49.8-56.1 60.2-16.9L2213 342l45.3-139.5c10.9-32.7 59.6-34.7 71.2 0l45.3 139.5 39.3-142.4c10.3-38.3 72.6-23.8 60.3 16.9zm275.4 75.1c0-42.4-33.9-117.5-119.5-117.5-73.2 0-124.4 56.3-124.4 126 0 77.2 55.3 126.4 128.5 126.4 31.7 0 93-11.5 93-39.8 0-18.3-21.1-31.5-39.3-22.4-49.4 26.2-109 8.4-115.9-43.8h148.3c16.3 0 29.3-13.4 29.3-28.9zM2571 277.7c9.5-73.4 113.9-68.6 118.6 0H2571zm316.7 148.8c-31.4 0-81.6-10.5-96.6-31.9-12.4-17 2.5-39.8 21.8-39.8 16.3 0 36.8 22.9 77.7 22.9 27.4 0 40.4-11 40.4-25.8 0-39.8-142.9-7.4-142.9-102 0-40.4 35.3-75.7 98.6-75.7 31.4 0 74.1 9.9 87.6 29.4 10.8 14.8-1.4 36.2-20.9 36.2-15.1 0-26.7-17.3-66.2-17.3-22.9 0-37.8 10.5-37.8 23.8 0 35.9 142.4 6 142.4 103.1-.1 43.7-37.4 77.1-104.1 77.1zm266.8-252.4c-169.3 0-169.1 252.4 0 252.4 170.1 0 169.6-252.4 0-252.4zm0 196.1c-81.8 0-82-139.8 0-139.8 82.5 0 82.4 139.8 0 139.8zm476.9 22V268.7c0-53.8-61.4-45.8-85.7-10.5v134c0 41.3-63.8 42.1-63.8 0V268.7c0-52.1-59.5-47.4-85.7-10.1v133.6c0 41.5-63.3 41.8-63.3 0V208c0-40 63.1-41.6 63.1 0v3.4c9.9-14.4 41.8-37.3 78.6-37.3 35.3 0 57.7 16.4 66.7 43.8 13.9-21.8 45.8-43.8 82.6-43.8 44.3 0 70.7 23.4 70.7 72.7v145.3c.5 17.3-13.5 31.4-31.9 31.4 3.5.1-31.3 1.1-31.3-31.3zM3992 291.6c0-42.4-32.4-117.5-117.9-117.5-73.2 0-127.5 56.3-127.5 126 0 77.2 58.3 126.4 131.6 126.4 31.7 0 91.5-11.5 91.5-39.8 0-18.3-21.1-31.5-39.3-22.4-49.4 26.2-110.5 8.4-117.5-43.8h149.8c16.3 0 29.1-13.4 29.3-28.9zm-180.5-13.9c9.7-74.4 115.9-68.3 120.1 0h-120.1z"] };
var faFootballBall = { prefix: 'fas', iconName: 'football-ball', icon: [496, 512, [], "f44e", "M481.5 60.3c-4.8-18.2-19.1-32.5-37.3-37.4C420.3 16.5 383 8.9 339.4 8L496 164.8c-.8-43.5-8.2-80.6-14.5-104.5zm-467 391.4c4.8 18.2 19.1 32.5 37.3 37.4 23.9 6.4 61.2 14 104.8 14.9L0 347.2c.8 43.5 8.2 80.6 14.5 104.5zM4.2 283.4L220.4 500c132.5-19.4 248.8-118.7 271.5-271.4L275.6 12C143.1 31.4 26.8 130.7 4.2 283.4zm317.3-123.6c3.1-3.1 8.2-3.1 11.3 0l11.3 11.3c3.1 3.1 3.1 8.2 0 11.3l-28.3 28.3 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0l-28.3-28.3-22.6 22.7 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0L248 278.6l-22.6 22.6 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0l-28.3-28.3-28.3 28.3c-3.1 3.1-8.2 3.1-11.3 0l-11.3-11.3c-3.1-3.1-3.1-8.2 0-11.3l28.3-28.3-28.3-28.2c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 22.6-22.6-28.3-28.3c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 22.6-22.6-28.3-28.3c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 28.3-28.5z"] };
var faForward = { prefix: 'fas', iconName: 'forward', icon: [512, 512, [], "f04e", "M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"] };
var faFrog = { prefix: 'fas', iconName: 'frog', icon: [576, 512, [], "f52e", "M446.53 97.43C439.67 60.23 407.19 32 368 32c-39.23 0-71.72 28.29-78.54 65.54C126.75 112.96-.5 250.12 0 416.98.11 451.9 29.08 480 64 480h304c8.84 0 16-7.16 16-16 0-17.67-14.33-32-32-32h-79.49l35.8-48.33c24.14-36.23 10.35-88.28-33.71-106.6-23.89-9.93-51.55-4.65-72.24 10.88l-32.76 24.59c-7.06 5.31-17.09 3.91-22.41-3.19-5.3-7.08-3.88-17.11 3.19-22.41l34.78-26.09c36.84-27.66 88.28-27.62 125.13 0 10.87 8.15 45.87 39.06 40.8 93.21L469.62 480H560c8.84 0 16-7.16 16-16 0-17.67-14.33-32-32-32h-53.63l-98.52-104.68 154.44-86.65A58.16 58.16 0 0 0 576 189.94c0-21.4-11.72-40.95-30.48-51.23-40.56-22.22-98.99-41.28-98.99-41.28zM368 136c-13.26 0-24-10.75-24-24 0-13.26 10.74-24 24-24 13.25 0 24 10.74 24 24 0 13.25-10.75 24-24 24z"] };
var faFrown = { prefix: 'fas', iconName: 'frown', icon: [496, 512, [], "f119", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm192.7 220.3c-3 2.5-6.6 3.7-10.2 3.7-4.6 0-9.1-2-12.3-5.8-22.4-26.8-55.3-42.2-90.2-42.2s-67.8 15.4-90.2 42.2c-5.6 6.8-15.7 7.7-22.5 2-6.8-5.7-7.7-15.7-2-22.5C161.7 339.6 203.6 320 248 320s86.3 19.6 114.7 53.8c5.7 6.7 4.8 16.8-2 22.5z"] };
var faFutbol = { prefix: 'fas', iconName: 'futbol', icon: [512, 512, [], "f1e3", "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-48 0l-.003-.282-26.064 22.741-62.679-58.5 16.454-84.355 34.303 3.072c-24.889-34.216-60.004-60.089-100.709-73.141l13.651 31.939L256 139l-74.953-41.525 13.651-31.939c-40.631 13.028-75.78 38.87-100.709 73.141l34.565-3.073 16.192 84.355-62.678 58.5-26.064-22.741-.003.282c0 43.015 13.497 83.952 38.472 117.991l7.704-33.897 85.138 10.447 36.301 77.826-29.902 17.786c40.202 13.122 84.29 13.148 124.572 0l-29.902-17.786 36.301-77.826 85.138-10.447 7.704 33.897C442.503 339.952 456 299.015 456 256zm-248.102 69.571l-29.894-91.312L256 177.732l77.996 56.527-29.622 91.312h-96.476z"] };
var faGamepad = { prefix: 'fas', iconName: 'gamepad', icon: [640, 512, [], "f11b", "M480 96H160C71.6 96 0 167.6 0 256s71.6 160 160 160c44.8 0 85.2-18.4 114.2-48h91.5c29 29.6 69.5 48 114.2 48 88.4 0 160-71.6 160-160S568.4 96 480 96zM256 276c0 6.6-5.4 12-12 12h-52v52c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-52H76c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h52v-52c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h52c6.6 0 12 5.4 12 12v40zm184 68c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-80c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"] };
var faGasPump = { prefix: 'fas', iconName: 'gas-pump', icon: [512, 512, [], "f52f", "M336 448H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm157.2-340.7l-81-81c-6.2-6.2-16.4-6.2-22.6 0l-11.3 11.3c-6.2 6.2-6.2 16.4 0 22.6L416 97.9V160c0 28.1 20.9 51.3 48 55.2V376c0 13.2-10.8 24-24 24s-24-10.8-24-24v-32c0-48.6-39.4-88-88-88h-8V64c0-35.3-28.7-64-64-64H96C60.7 0 32 28.7 32 64v352h288V304h8c22.1 0 40 17.9 40 40v27.8c0 37.7 27 72 64.5 75.9 43 4.3 79.5-29.5 79.5-71.7V152.6c0-17-6.8-33.3-18.8-45.3zM256 192H96V64h160v128z"] };
var faGavel = { prefix: 'fas', iconName: 'gavel', icon: [512, 512, [], "f0e3", "M504.971 199.362l-22.627-22.627c-9.373-9.373-24.569-9.373-33.941 0l-5.657 5.657L329.608 69.255l5.657-5.657c9.373-9.373 9.373-24.569 0-33.941L312.638 7.029c-9.373-9.373-24.569-9.373-33.941 0L154.246 131.48c-9.373 9.373-9.373 24.569 0 33.941l22.627 22.627c9.373 9.373 24.569 9.373 33.941 0l5.657-5.657 39.598 39.598-81.04 81.04-5.657-5.657c-12.497-12.497-32.758-12.497-45.255 0L9.373 412.118c-12.497 12.497-12.497 32.758 0 45.255l45.255 45.255c12.497 12.497 32.758 12.497 45.255 0l114.745-114.745c12.497-12.497 12.497-32.758 0-45.255l-5.657-5.657 81.04-81.04 39.598 39.598-5.657 5.657c-9.373 9.373-9.373 24.569 0 33.941l22.627 22.627c9.373 9.373 24.569 9.373 33.941 0l124.451-124.451c9.372-9.372 9.372-24.568 0-33.941z"] };
var faGem = { prefix: 'fas', iconName: 'gem', icon: [576, 512, [], "f3a5", "M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"] };
var faGenderless = { prefix: 'fas', iconName: 'genderless', icon: [288, 512, [], "f22d", "M144 176c44.1 0 80 35.9 80 80s-35.9 80-80 80-80-35.9-80-80 35.9-80 80-80m0-64C64.5 112 0 176.5 0 256s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144z"] };
var faGift = { prefix: 'fas', iconName: 'gift', icon: [512, 512, [], "f06b", "M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm448-288h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40zm-72 320h160c17.7 0 32-14.3 32-32V320H288v160z"] };
var faGlassMartini = { prefix: 'fas', iconName: 'glass-martini', icon: [512, 512, [], "f000", "M507.3 27.3c10-10 2.9-27.3-11.3-27.3H16C1.8 0-5.4 17.2 4.7 27.3L216 238.6V472h-92c-15.5 0-28 12.5-28 28 0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12 0-15.5-12.5-28-28-28h-92V238.6L507.3 27.3z"] };
var faGlasses = { prefix: 'fas', iconName: 'glasses', icon: [576, 512, [], "f530", "M574.1 280.37L528.75 98.66c-5.91-23.7-21.59-44.05-43-55.81-21.44-11.73-46.97-14.11-70.19-6.33l-15.25 5.08c-8.39 2.79-12.92 11.86-10.12 20.24l5.06 15.18c2.79 8.38 11.85 12.91 20.23 10.12l13.18-4.39c10.87-3.62 23-3.57 33.16 1.73 10.29 5.37 17.57 14.56 20.37 25.82l38.46 153.82c-22.19-6.81-49.79-12.46-81.2-12.46-34.77 0-73.98 7.02-114.85 26.74h-73.18c-40.87-19.74-80.08-26.75-114.86-26.75-31.42 0-59.02 5.65-81.21 12.46l38.46-153.83c2.79-11.25 10.09-20.45 20.38-25.81 10.16-5.3 22.28-5.35 33.15-1.73l13.17 4.39c8.38 2.79 17.44-1.74 20.23-10.12l5.06-15.18c2.8-8.38-1.73-17.45-10.12-20.24l-15.25-5.08c-23.22-7.78-48.75-5.41-70.19 6.33-21.41 11.77-37.09 32.11-43 55.8L1.9 280.37A64.218 64.218 0 0 0 0 295.86v70.25C0 429.01 51.58 480 115.2 480h37.12c60.28 0 110.37-45.94 114.88-105.37l2.93-38.63h35.75l2.93 38.63C313.31 434.06 363.4 480 423.68 480h37.12c63.62 0 115.2-50.99 115.2-113.88v-70.25c0-5.23-.64-10.43-1.9-15.5zm-370.72 89.42c-1.97 25.91-24.4 46.21-51.06 46.21H115.2C86.97 416 64 393.62 64 366.11v-37.54c18.12-6.49 43.42-12.92 72.58-12.92 23.86 0 47.26 4.33 69.93 12.92l-3.13 41.22zM512 366.12c0 27.51-22.97 49.88-51.2 49.88h-37.12c-26.67 0-49.1-20.3-51.06-46.21l-3.13-41.22c22.67-8.59 46.08-12.92 69.95-12.92 29.12 0 54.43 6.44 72.55 12.93v37.54z"] };
var faGlobe = { prefix: 'fas', iconName: 'globe', icon: [496, 512, [], "f0ac", "M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"] };
var faGolfBall = { prefix: 'fas', iconName: 'golf-ball', icon: [416, 512, [], "f450", "M96 416h224c0 17.7-14.3 32-32 32h-16c-17.7 0-32 14.3-32 32v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-20c0-17.7-14.3-32-32-32h-16c-17.7 0-32-14.3-32-32zm320-208c0 74.2-39 139.2-97.5 176h-221C39 347.2 0 282.2 0 208 0 93.1 93.1 0 208 0s208 93.1 208 208zm-180.1 43.9c18.3 0 33.1-14.8 33.1-33.1 0-14.4-9.3-26.3-22.1-30.9 9.6 26.8-15.6 51.3-41.9 41.9 4.6 12.8 16.5 22.1 30.9 22.1zm49.1 46.9c0-14.4-9.3-26.3-22.1-30.9 9.6 26.8-15.6 51.3-41.9 41.9 4.6 12.8 16.5 22.1 30.9 22.1 18.3 0 33.1-14.9 33.1-33.1zm64-64c0-14.4-9.3-26.3-22.1-30.9 9.6 26.8-15.6 51.3-41.9 41.9 4.6 12.8 16.5 22.1 30.9 22.1 18.3 0 33.1-14.9 33.1-33.1z"] };
var faGraduationCap = { prefix: 'fas', iconName: 'graduation-cap', icon: [640, 512, [], "f19d", "M622.884 199.005l-275.817 85.1a96 96 0 0 1-54.134 0L92.398 222.232c-8.564 11.438-11.018 23.05-11.918 38.335C89.778 266.165 96 276.355 96 288c0 11.952-6.557 22.366-16.265 27.861l16.197 123.096c.63 4.786-3.1 9.043-7.932 9.043H40c-4.828 0-8.562-4.253-7.932-9.044L48.265 315.86C38.557 310.366 32 299.952 32 288c0-12.034 6.646-22.511 16.465-27.976.947-17.951 3.974-33.231 12.152-47.597l-43.502-13.422c-22.876-6.801-22.766-39.241 0-46.01l275.817-85.1a96 96 0 0 1 54.134 0l275.817 85.1c22.877 6.801 22.767 39.241.001 46.01zM356.503 314.682l-.207.064-.207.061a127.998 127.998 0 0 1-72.177 0l-.207-.061-.207-.064-150.914-46.57L120 352c0 35.346 89.543 64 200 64s200-28.654 200-64l-12.583-83.888-150.914 46.57z"] };
var faGreaterThan = { prefix: 'fas', iconName: 'greater-than', icon: [384, 512, [], "f531", "M365.52 209.85L59.22 67.01c-16.06-7.49-35.15-.54-42.64 15.52L3.01 111.61c-7.49 16.06-.54 35.15 15.52 42.64L236.96 256.1 18.49 357.99C2.47 365.46-4.46 384.5 3.01 400.52l13.52 29C24 445.54 43.04 452.47 59.06 445l306.47-142.91a32.003 32.003 0 0 0 18.48-29v-34.23c-.01-12.45-7.21-23.76-18.49-29.01z"] };
var faGreaterThanEqual = { prefix: 'fas', iconName: 'greater-than-equal', icon: [448, 512, [], "f532", "M55.22 107.69l175.56 68.09-175.44 68.05c-18.39 6.03-27.88 24.39-21.2 41l12.09 30.08c6.68 16.61 26.99 25.19 45.38 19.15L393.02 214.2c13.77-4.52 22.98-16.61 22.98-30.17v-15.96c0-13.56-9.21-25.65-22.98-30.17L91.3 17.92c-18.29-6-38.51 2.53-45.15 19.06L34.12 66.9c-6.64 16.53 2.81 34.79 21.1 40.79zM424 400H24c-13.25 0-24 10.74-24 24v48c0 13.25 10.75 24 24 24h400c13.25 0 24-10.75 24-24v-48c0-13.26-10.75-24-24-24z"] };
var faHSquare = { prefix: 'fas', iconName: 'h-square', icon: [448, 512, [], "f0fd", "M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-112 48h-32c-8.837 0-16 7.163-16 16v80H160v-80c0-8.837-7.163-16-16-16h-32c-8.837 0-16 7.163-16 16v224c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16v-80h128v80c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16V144c0-8.837-7.163-16-16-16z"] };
var faHandHolding = { prefix: 'fas', iconName: 'hand-holding', icon: [576, 512, [], "f4bd", "M565.3 328.1c-11.8-10.7-30.2-10-42.6 0L430.3 402c-11.3 9.1-25.4 14-40 14H272c-8.8 0-16-7.2-16-16s7.2-16 16-16h78.3c15.9 0 30.7-10.9 33.3-26.6 3.3-20-12.1-37.4-31.6-37.4H192c-27 0-53.1 9.3-74.1 26.3L71.4 384H16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h356.8c14.5 0 28.6-4.9 40-14L564 377c15.2-12.1 16.4-35.3 1.3-48.9z"] };
var faHandHoldingHeart = { prefix: 'fas', iconName: 'hand-holding-heart', icon: [576, 512, [], "f4be", "M275.3 250.5c7 7.4 18.4 7.4 25.5 0l108.9-114.2c31.6-33.2 29.8-88.2-5.6-118.8-30.8-26.7-76.7-21.9-104.9 7.7L288 36.9l-11.1-11.6C248.7-4.4 202.8-9.2 172 17.5c-35.3 30.6-37.2 85.6-5.6 118.8l108.9 114.2zm290 77.6c-11.8-10.7-30.2-10-42.6 0L430.3 402c-11.3 9.1-25.4 14-40 14H272c-8.8 0-16-7.2-16-16s7.2-16 16-16h78.3c15.9 0 30.7-10.9 33.3-26.6 3.3-20-12.1-37.4-31.6-37.4H192c-27 0-53.1 9.3-74.1 26.3L71.4 384H16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h356.8c14.5 0 28.6-4.9 40-14L564 377c15.2-12.1 16.4-35.3 1.3-48.9z"] };
var faHandHoldingUsd = { prefix: 'fas', iconName: 'hand-holding-usd', icon: [544, 512, [], "f4c0", "M257.6 144.3l50 14.3c3.6 1 6.1 4.4 6.1 8.1 0 4.6-3.8 8.4-8.4 8.4h-32.8c-3.6 0-7.1-.8-10.3-2.2-4.8-2.2-10.4-1.7-14.1 2l-17.5 17.5c-5.3 5.3-4.7 14.3 1.5 18.4 9.5 6.3 20.3 10.1 31.8 11.5V240c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16v-17.6c30.3-3.6 53.3-31 49.3-63-2.9-23-20.7-41.3-42.9-47.7l-50-14.3c-3.6-1-6.1-4.4-6.1-8.1 0-4.6 3.8-8.4 8.4-8.4h32.8c3.6 0 7.1.8 10.3 2.2 4.8 2.2 10.4 1.7 14.1-2l17.5-17.5c5.3-5.3 4.7-14.3-1.5-18.4-9.5-6.3-20.3-10.1-31.8-11.5V16c0-8.8-7.2-16-16-16h-16c-8.8 0-16 7.2-16 16v17.6c-30.3 3.6-53.3 31-49.3 63 2.9 23 20.7 41.3 42.9 47.7zm276.3 183.8c-11.2-10.7-28.5-10-40.3 0L406.4 402c-10.7 9.1-24 14-37.8 14H256.9c-8.3 0-15.1-7.2-15.1-16s6.8-16 15.1-16h73.9c15.1 0 29-10.9 31.4-26.6 3.1-20-11.5-37.4-29.8-37.4H181.3c-25.5 0-50.2 9.3-69.9 26.3L67.5 384H15.1C6.8 384 0 391.2 0 400v96c0 8.8 6.8 16 15.1 16H352c13.7 0 27-4.9 37.8-14l142.8-121c14.4-12.1 15.5-35.3 1.3-48.9z"] };
var faHandLizard = { prefix: 'fas', iconName: 'hand-lizard', icon: [576, 512, [], "f258", "M384 480h192V363.778a95.998 95.998 0 0 0-14.833-51.263L398.127 54.368A48 48 0 0 0 357.544 32H24C10.745 32 0 42.745 0 56v16c0 30.928 25.072 56 56 56h229.981c12.844 0 21.556 13.067 16.615 24.923l-21.41 51.385A32 32 0 0 1 251.648 224H128c-35.346 0-64 28.654-64 64v8c0 13.255 10.745 24 24 24h147.406a47.995 47.995 0 0 1 25.692 7.455l111.748 70.811A24.001 24.001 0 0 1 384 418.539V480z"] };
var faHandPaper = { prefix: 'fas', iconName: 'hand-paper', icon: [448, 512, [], "f256", "M408.781 128.007C386.356 127.578 368 146.36 368 168.79V256h-8V79.79c0-22.43-18.356-41.212-40.781-40.783C297.488 39.423 280 57.169 280 79v177h-8V40.79C272 18.36 253.644-.422 231.219.007 209.488.423 192 18.169 192 40v216h-8V80.79c0-22.43-18.356-41.212-40.781-40.783C121.488 40.423 104 58.169 104 80v235.992l-31.648-43.519c-12.993-17.866-38.009-21.817-55.877-8.823-17.865 12.994-21.815 38.01-8.822 55.877l125.601 172.705A48 48 0 0 0 172.073 512h197.59c22.274 0 41.622-15.324 46.724-37.006l26.508-112.66a192.011 192.011 0 0 0 5.104-43.975V168c.001-21.831-17.487-39.577-39.218-39.993z"] };
var faHandPeace = { prefix: 'fas', iconName: 'hand-peace', icon: [448, 512, [], "f25b", "M408 216c-22.092 0-40 17.909-40 40h-8v-32c0-22.091-17.908-40-40-40s-40 17.909-40 40v32h-8V48c0-26.51-21.49-48-48-48s-48 21.49-48 48v208h-13.572L92.688 78.449C82.994 53.774 55.134 41.63 30.461 51.324 5.787 61.017-6.356 88.877 3.337 113.551l74.765 190.342-31.09 24.872c-15.381 12.306-19.515 33.978-9.741 51.081l64 112A39.998 39.998 0 0 0 136 512h240c18.562 0 34.686-12.77 38.937-30.838l32-136A39.97 39.97 0 0 0 448 336v-80c0-22.091-17.908-40-40-40z"] };
var faHandPointDown = { prefix: 'fas', iconName: 'hand-point-down', icon: [384, 512, [], "f0a7", "M91.826 467.2V317.966c-8.248 5.841-16.558 10.57-24.918 14.153C35.098 345.752-.014 322.222 0 288c.008-18.616 10.897-32.203 29.092-40 28.286-12.122 64.329-78.648 77.323-107.534 7.956-17.857 25.479-28.453 43.845-28.464l.001-.002h171.526c11.812 0 21.897 8.596 23.703 20.269 7.25 46.837 38.483 61.76 38.315 123.731-.007 2.724.195 13.254.195 16 0 50.654-22.122 81.574-71.263 72.6-9.297 18.597-39.486 30.738-62.315 16.45-21.177 24.645-53.896 22.639-70.944 6.299V467.2c0 24.15-20.201 44.8-43.826 44.8-23.283 0-43.826-21.35-43.826-44.8zM112 72V24c0-13.255 10.745-24 24-24h192c13.255 0 24 10.745 24 24v48c0 13.255-10.745 24-24 24H136c-13.255 0-24-10.745-24-24zm212-24c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"] };
var faHandPointLeft = { prefix: 'fas', iconName: 'hand-point-left', icon: [512, 512, [], "f0a5", "M44.8 155.826h149.234c-5.841-8.248-10.57-16.558-14.153-24.918C166.248 99.098 189.778 63.986 224 64c18.616.008 32.203 10.897 40 29.092 12.122 28.286 78.648 64.329 107.534 77.323 17.857 7.956 28.453 25.479 28.464 43.845l.002.001v171.526c0 11.812-8.596 21.897-20.269 23.703-46.837 7.25-61.76 38.483-123.731 38.315-2.724-.007-13.254.195-16 .195-50.654 0-81.574-22.122-72.6-71.263-18.597-9.297-30.738-39.486-16.45-62.315-24.645-21.177-22.639-53.896-6.299-70.944H44.8c-24.15 0-44.8-20.201-44.8-43.826 0-23.283 21.35-43.826 44.8-43.826zM440 176h48c13.255 0 24 10.745 24 24v192c0 13.255-10.745 24-24 24h-48c-13.255 0-24-10.745-24-24V200c0-13.255 10.745-24 24-24zm24 212c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20z"] };
var faHandPointRight = { prefix: 'fas', iconName: 'hand-point-right', icon: [512, 512, [], "f0a4", "M512 199.652c0 23.625-20.65 43.826-44.8 43.826h-99.851c16.34 17.048 18.346 49.766-6.299 70.944 14.288 22.829 2.147 53.017-16.45 62.315C353.574 425.878 322.654 448 272 448c-2.746 0-13.276-.203-16-.195-61.971.168-76.894-31.065-123.731-38.315C120.596 407.683 112 397.599 112 385.786V214.261l.002-.001c.011-18.366 10.607-35.889 28.464-43.845 28.886-12.994 95.413-49.038 107.534-77.323 7.797-18.194 21.384-29.084 40-29.092 34.222-.014 57.752 35.098 44.119 66.908-3.583 8.359-8.312 16.67-14.153 24.918H467.2c23.45 0 44.8 20.543 44.8 43.826zM96 200v192c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V200c0-13.255 10.745-24 24-24h48c13.255 0 24 10.745 24 24zM68 368c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"] };
var faHandPointUp = { prefix: 'fas', iconName: 'hand-point-up', icon: [384, 512, [], "f0a6", "M135.652 0c23.625 0 43.826 20.65 43.826 44.8v99.851c17.048-16.34 49.766-18.346 70.944 6.299 22.829-14.288 53.017-2.147 62.315 16.45C361.878 158.426 384 189.346 384 240c0 2.746-.203 13.276-.195 16 .168 61.971-31.065 76.894-38.315 123.731C343.683 391.404 333.599 400 321.786 400H150.261l-.001-.002c-18.366-.011-35.889-10.607-43.845-28.464C93.421 342.648 57.377 276.122 29.092 264 10.897 256.203.008 242.616 0 224c-.014-34.222 35.098-57.752 66.908-44.119 8.359 3.583 16.67 8.312 24.918 14.153V44.8c0-23.45 20.543-44.8 43.826-44.8zM136 416h192c13.255 0 24 10.745 24 24v48c0 13.255-10.745 24-24 24H136c-13.255 0-24-10.745-24-24v-48c0-13.255 10.745-24 24-24zm168 28c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20z"] };
var faHandPointer = { prefix: 'fas', iconName: 'hand-pointer', icon: [448, 512, [], "f25a", "M448 240v96c0 3.084-.356 6.159-1.063 9.162l-32 136C410.686 499.23 394.562 512 376 512H168a40.004 40.004 0 0 1-32.35-16.473l-127.997-176c-12.993-17.866-9.043-42.883 8.822-55.876 17.867-12.994 42.884-9.043 55.877 8.823L104 315.992V40c0-22.091 17.908-40 40-40s40 17.909 40 40v200h8v-40c0-22.091 17.908-40 40-40s40 17.909 40 40v40h8v-24c0-22.091 17.908-40 40-40s40 17.909 40 40v24h8c0-22.091 17.908-40 40-40s40 17.909 40 40zm-256 80h-8v96h8v-96zm88 0h-8v96h8v-96zm88 0h-8v96h8v-96z"] };
var faHandRock = { prefix: 'fas', iconName: 'hand-rock', icon: [512, 512, [], "f255", "M512 128.79c0-26.322-20.861-48.344-47.18-48.783C437.935 79.558 416 101.217 416 128h-8V96.79c0-26.322-20.861-48.344-47.18-48.783C333.935 47.558 312 69.217 312 96v32h-8V80.79c0-26.322-20.861-48.344-47.18-48.783C229.935 31.558 208 53.217 208 80v48h-8V96.79c0-26.322-20.861-48.344-47.18-48.783C125.935 47.558 104 69.217 104 96v136l-8-7.111V176.79c0-26.322-20.861-48.344-47.18-48.783C21.935 127.558 0 149.217 0 176v66.445a95.998 95.998 0 0 0 32.221 71.751l111.668 99.261A47.999 47.999 0 0 1 160 449.333V456c0 13.255 10.745 24 24 24h240c13.255 0 24-10.745 24-24v-2.921a96.01 96.01 0 0 1 7.523-37.254l48.954-116.265A96.002 96.002 0 0 0 512 262.306V128.79z"] };
var faHandScissors = { prefix: 'fas', iconName: 'hand-scissors', icon: [512, 512, [], "f257", "M216 440c0-22.092 17.909-40 40-40v-8h-32c-22.091 0-40-17.908-40-40s17.909-40 40-40h32v-8H48c-26.51 0-48-21.49-48-48s21.49-48 48-48h208v-13.572l-177.551-69.74c-24.674-9.694-36.818-37.555-27.125-62.228 9.693-24.674 37.554-36.817 62.228-27.124l190.342 74.765 24.872-31.09c12.306-15.381 33.978-19.515 51.081-9.741l112 64A40.002 40.002 0 0 1 512 168v240c0 18.562-12.77 34.686-30.838 38.937l-136 32A39.982 39.982 0 0 1 336 480h-80c-22.091 0-40-17.908-40-40z"] };
var faHandSpock = { prefix: 'fas', iconName: 'hand-spock', icon: [512, 512, [], "f259", "M10.872 316.585c15.139-16.086 40.454-16.854 56.543-1.713L128 371.893v-79.405L88.995 120.865c-4.896-21.542 8.598-42.974 30.14-47.87 21.549-4.894 42.975 8.599 47.87 30.141L201.747 256h9.833L164.016 48.966c-4.946-21.531 8.498-42.994 30.028-47.94 21.532-4.95 42.994 8.498 47.94 30.028L293.664 256h15.105l48.425-193.702c5.357-21.432 27.075-34.462 48.507-29.104 21.432 5.358 34.463 27.075 29.104 48.507L391.231 256h11.08l30.768-129.265c5.117-21.491 26.685-34.768 48.177-29.647 21.491 5.117 34.765 26.686 29.647 48.177l-36.292 152.467A96.024 96.024 0 0 0 472 319.967v42.102a96.002 96.002 0 0 1-3.96 27.287l-26.174 88.287C435.825 498.022 417.101 512 395.846 512H179.172a48.002 48.002 0 0 1-32.898-13.046L12.585 373.128c-16.087-15.141-16.853-40.456-1.713-56.543z"] };
var faHands = { prefix: 'fas', iconName: 'hands', icon: [640, 512, [], "f4c2", "M204.8 230.4c-10.6-14.1-30.7-17-44.8-6.4-14.1 10.6-17 30.7-6.4 44.8l38.1 50.8c4.8 6.4 4.1 15.3-1.5 20.9l-12.8 12.8c-6.7 6.7-17.6 6.2-23.6-1.1L64 244.4V96c0-17.7-14.3-32-32-32S0 78.3 0 96v218.4c0 10.9 3.7 21.5 10.5 30l104.1 134.3c5 6.5 8.4 13.9 10.4 21.7 1.8 6.9 8.1 11.6 15.3 11.6H272c8.8 0 16-7.2 16-16V384c0-27.7-9-54.6-25.6-76.8l-57.6-76.8zM608 64c-17.7 0-32 14.3-32 32v148.4l-89.8 107.8c-6 7.2-17 7.7-23.6 1.1l-12.8-12.8c-5.6-5.6-6.3-14.5-1.5-20.9l38.1-50.8c10.6-14.1 7.7-34.2-6.4-44.8-14.1-10.6-34.2-7.7-44.8 6.4l-57.6 76.8C361 329.4 352 356.3 352 384v112c0 8.8 7.2 16 16 16h131.7c7.1 0 13.5-4.7 15.3-11.6 2-7.8 5.4-15.2 10.4-21.7l104.1-134.3c6.8-8.5 10.5-19.1 10.5-30V96c0-17.7-14.3-32-32-32z"] };
var faHandsHelping = { prefix: 'fas', iconName: 'hands-helping', icon: [640, 512, [], "f4c4", "M488 192H336v56c0 39.7-32.3 72-72 72s-72-32.3-72-72V126.4l-64.9 39C107.8 176.9 96 197.8 96 220.2v47.3l-80 46.2C.7 322.5-4.6 342.1 4.3 357.4l80 138.6c8.8 15.3 28.4 20.5 43.7 11.7L231.4 448H368c35.3 0 64-28.7 64-64h16c17.7 0 32-14.3 32-32v-64h8c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24zm147.7-37.4L555.7 16C546.9.7 527.3-4.5 512 4.3L408.6 64H306.4c-12 0-23.7 3.4-33.9 9.7L239 94.6c-9.4 5.8-15 16.1-15 27.1V248c0 22.1 17.9 40 40 40s40-17.9 40-40v-88h184c30.9 0 56 25.1 56 56v28.5l80-46.2c15.3-8.9 20.5-28.4 11.7-43.7z"] };
var faHandshake = { prefix: 'fas', iconName: 'handshake', icon: [640, 512, [], "f2b5", "M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z"] };
var faHashtag = { prefix: 'fas', iconName: 'hashtag', icon: [448, 512, [], "f292", "M440.667 182.109l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l14.623-81.891C377.123 38.754 371.468 32 363.997 32h-40.632a12 12 0 0 0-11.813 9.891L296.175 128H197.54l14.623-81.891C213.477 38.754 207.822 32 200.35 32h-40.632a12 12 0 0 0-11.813 9.891L132.528 128H53.432a12 12 0 0 0-11.813 9.891l-7.143 40C33.163 185.246 38.818 192 46.289 192h74.81L98.242 320H19.146a12 12 0 0 0-11.813 9.891l-7.143 40C-1.123 377.246 4.532 384 12.003 384h74.81L72.19 465.891C70.877 473.246 76.532 480 84.003 480h40.632a12 12 0 0 0 11.813-9.891L151.826 384h98.634l-14.623 81.891C234.523 473.246 240.178 480 247.65 480h40.632a12 12 0 0 0 11.813-9.891L315.472 384h79.096a12 12 0 0 0 11.813-9.891l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l22.857-128h79.096a12 12 0 0 0 11.813-9.891zM261.889 320h-98.634l22.857-128h98.634l-22.857 128z"] };
var faHdd = { prefix: 'fas', iconName: 'hdd', icon: [576, 512, [], "f0a0", "M576 304v96c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-96c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48zm-48-80a79.557 79.557 0 0 1 30.777 6.165L462.25 85.374A48.003 48.003 0 0 0 422.311 64H153.689a48 48 0 0 0-39.938 21.374L17.223 230.165A79.557 79.557 0 0 1 48 224h480zm-48 96c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm-96 0c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z"] };
var faHeading = { prefix: 'fas', iconName: 'heading', icon: [512, 512, [], "f1dc", "M496 80V48c0-8.837-7.163-16-16-16H320c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h37.621v128H154.379V96H192c8.837 0 16-7.163 16-16V48c0-8.837-7.163-16-16-16H32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h37.275v320H32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-37.621V288H357.62v128H320c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-37.275V96H480c8.837 0 16-7.163 16-16z"] };
var faHeadphones = { prefix: 'fas', iconName: 'headphones', icon: [512, 512, [], "f025", "M256 32C114.52 32 0 146.496 0 288v48a32 32 0 0 0 17.689 28.622l14.383 7.191C34.083 431.903 83.421 480 144 480h24c13.255 0 24-10.745 24-24V280c0-13.255-10.745-24-24-24h-24c-31.342 0-59.671 12.879-80 33.627V288c0-105.869 86.131-192 192-192s192 86.131 192 192v1.627C427.671 268.879 399.342 256 368 256h-24c-13.255 0-24 10.745-24 24v176c0 13.255 10.745 24 24 24h24c60.579 0 109.917-48.098 111.928-108.187l14.382-7.191A32 32 0 0 0 512 336v-48c0-141.479-114.496-256-256-256z"] };
var faHeart = { prefix: 'fas', iconName: 'heart', icon: [512, 512, [], "f004", "M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"] };
var faHeartbeat = { prefix: 'fas', iconName: 'heartbeat', icon: [512, 512, [], "f21e", "M320.2 243.8l-49.7 99.4c-6 12.1-23.4 11.7-28.9-.6l-56.9-126.3-30 71.7H60.6l182.5 186.5c7.1 7.3 18.6 7.3 25.7 0L451.4 288H342.3l-22.1-44.2zM473.7 73.9l-2.4-2.5c-51.5-52.6-135.8-52.6-187.4 0L256 100l-27.9-28.5c-51.5-52.7-135.9-52.7-187.4 0l-2.4 2.4C-10.4 123.7-12.5 203 31 256h102.4l35.9-86.2c5.4-12.9 23.6-13.2 29.4-.4l58.2 129.3 49-97.9c5.9-11.8 22.7-11.8 28.6 0l27.6 55.2H481c43.5-53 41.4-132.3-7.3-182.1z"] };
var faHelicopter = { prefix: 'fas', iconName: 'helicopter', icon: [640, 512, [], "f533", "M304 384h272c17.67 0 32-14.33 32-32 0-123.71-100.29-224-224-224V64h176c8.84 0 16-7.16 16-16V16c0-8.84-7.16-16-16-16H144c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h176v64H112L68.8 70.4C65.78 66.37 61.03 64 56 64H16.01C5.6 64-2.04 73.78.49 83.88L32 192l160 64 86.4 115.2A31.992 31.992 0 0 0 304 384zm112-188.49C478.55 208.3 528.03 257.44 540.79 320H416V195.51zm219.37 263.3l-22.15-22.2c-6.25-6.26-16.24-6.1-22.64.01-7.09 6.77-13.84 11.25-24.64 11.25H240c-8.84 0-16 7.18-16 16.03v32.06c0 8.85 7.16 16.03 16 16.03h325.94c14.88 0 35.3-.47 68.45-29.52 7.02-6.14 7.57-17.05.98-23.66z"] };
var faHistory = { prefix: 'fas', iconName: 'history', icon: [512, 512, [], "f1da", "M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z"] };
var faHockeyPuck = { prefix: 'fas', iconName: 'hockey-puck', icon: [512, 512, [], "f453", "M0 160c0-53 114.6-96 256-96s256 43 256 96-114.6 96-256 96S0 213 0 160zm0 82.2V352c0 53 114.6 96 256 96s256-43 256-96V242.2c-113.4 82.3-398.5 82.4-512 0z"] };
var faHome = { prefix: 'fas', iconName: 'home', icon: [576, 512, [], "f015", "M488 312.7V456c0 13.3-10.7 24-24 24H348c-6.6 0-12-5.4-12-12V356c0-6.6-5.4-12-12-12h-72c-6.6 0-12 5.4-12 12v112c0 6.6-5.4 12-12 12H112c-13.3 0-24-10.7-24-24V312.7c0-3.6 1.6-7 4.4-9.3l188-154.8c4.4-3.6 10.8-3.6 15.3 0l188 154.8c2.7 2.3 4.3 5.7 4.3 9.3zm83.6-60.9L488 182.9V44.4c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12V117l-89.5-73.7c-17.7-14.6-43.3-14.6-61 0L4.4 251.8c-5.1 4.2-5.8 11.8-1.6 16.9l25.5 31c4.2 5.1 11.8 5.8 16.9 1.6l235.2-193.7c4.4-3.6 10.8-3.6 15.3 0l235.2 193.7c5.1 4.2 12.7 3.5 16.9-1.6l25.5-31c4.2-5.2 3.4-12.7-1.7-16.9z"] };
var faHospital = { prefix: 'fas', iconName: 'hospital', icon: [448, 512, [], "f0f8", "M448 492v20H0v-20c0-6.627 5.373-12 12-12h20V120c0-13.255 10.745-24 24-24h88V24c0-13.255 10.745-24 24-24h112c13.255 0 24 10.745 24 24v72h88c13.255 0 24 10.745 24 24v360h20c6.627 0 12 5.373 12 12zM308 192h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-168 64h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12zm104 128h-40c-6.627 0-12 5.373-12 12v84h64v-84c0-6.627-5.373-12-12-12zm64-96h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-116 12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40zM182 96h26v26a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6V96h26a6 6 0 0 0 6-6V70a6 6 0 0 0-6-6h-26V38a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v26h-26a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6z"] };
var faHospitalAlt = { prefix: 'fas', iconName: 'hospital-alt', icon: [576, 512, [], "f47d", "M544 96H416V32c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32v368c0 8.8 7.2 16 16 16h544c8.8 0 16-7.2 16-16V128c0-17.7-14.3-32-32-32zM160 436c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-128c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm160 128c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-128c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm16-170c0 3.3-2.7 6-6 6h-26v26c0 3.3-2.7 6-6 6h-20c-3.3 0-6-2.7-6-6v-26h-26c-3.3 0-6-2.7-6-6v-20c0-3.3 2.7-6 6-6h26V86c0-3.3 2.7-6 6-6h20c3.3 0 6 2.7 6 6v26h26c3.3 0 6 2.7 6 6v20zm144 298c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-128c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"] };
var faHospitalSymbol = { prefix: 'fas', iconName: 'hospital-symbol', icon: [512, 512, [], "f47e", "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm112 376c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-88h-96v88c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V136c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v88h96v-88c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v240z"] };
var faHourglass = { prefix: 'fas', iconName: 'hourglass', icon: [384, 512, [], "f254", "M360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64z"] };
var faHourglassEnd = { prefix: 'fas', iconName: 'hourglass-end', icon: [384, 512, [], "f253", "M360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64zM192 208c-57.787 0-104-66.518-104-144h208c0 77.945-46.51 144-104 144z"] };
var faHourglassHalf = { prefix: 'fas', iconName: 'hourglass-half', icon: [384, 512, [], "f252", "M360 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24zm-75.078 384H99.08c17.059-46.797 52.096-80 92.92-80 40.821 0 75.862 33.196 92.922 80zm.019-256H99.078C91.988 108.548 88 86.748 88 64h208c0 22.805-3.987 44.587-11.059 64z"] };
var faHourglassStart = { prefix: 'fas', iconName: 'hourglass-start', icon: [384, 512, [], "f251", "M360 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24zm-64 448H88c0-77.458 46.204-144 104-144 57.786 0 104 66.517 104 144z"] };
var faICursor = { prefix: 'fas', iconName: 'i-cursor', icon: [256, 512, [], "f246", "M256 52.048V12.065C256 5.496 250.726.148 244.158.066 211.621-.344 166.469.011 128 37.959 90.266.736 46.979-.114 11.913.114 5.318.157 0 5.519 0 12.114v39.645c0 6.687 5.458 12.078 12.145 11.998C38.111 63.447 96 67.243 96 112.182V224H60c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h36v112c0 44.932-56.075 48.031-83.95 47.959C5.404 447.942 0 453.306 0 459.952v39.983c0 6.569 5.274 11.917 11.842 11.999 32.537.409 77.689.054 116.158-37.894 37.734 37.223 81.021 38.073 116.087 37.845 6.595-.043 11.913-5.405 11.913-12V460.24c0-6.687-5.458-12.078-12.145-11.998C217.889 448.553 160 444.939 160 400V288h36c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-36V112.182c0-44.932 56.075-48.213 83.95-48.142 6.646.018 12.05-5.346 12.05-11.992z"] };
var faIdBadge = { prefix: 'fas', iconName: 'id-badge', icon: [384, 512, [], "f2c1", "M336 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM144 32h96c8.8 0 16 7.2 16 16s-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16s7.2-16 16-16zm48 128c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H102.4C90 416 80 407.4 80 396.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2z"] };
var faIdCard = { prefix: 'fas', iconName: 'id-card', icon: [576, 512, [], "f2c2", "M528 32H48C21.5 32 0 53.5 0 80v16h576V80c0-26.5-21.5-48-48-48zM0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V128H0v304zm352-232c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zm0 64c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zm0 64c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zM176 192c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zM67.1 396.2C75.5 370.5 99.6 352 128 352h8.2c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h8.2c28.4 0 52.5 18.5 60.9 44.2 3.2 9.9-5.2 19.8-15.6 19.8H82.7c-10.4 0-18.8-10-15.6-19.8z"] };
var faIdCardAlt = { prefix: 'fas', iconName: 'id-card-alt', icon: [576, 512, [], "f47f", "M528 64H384v96H192V64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM288 224c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm93.3 224H194.7c-10.4 0-18.8-10-15.6-19.8 8.3-25.6 32.4-44.2 60.9-44.2h8.2c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h8.2c28.4 0 52.5 18.5 60.9 44.2 3.2 9.8-5.2 19.8-15.6 19.8zM352 32c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v96h128V32z"] };
var faImage = { prefix: 'fas', iconName: 'image', icon: [512, 512, [], "f03e", "M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"] };
var faImages = { prefix: 'fas', iconName: 'images', icon: [576, 512, [], "f302", "M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v208c0 44.112 35.888 80 80 80h336zm96-80V80c0-26.51-21.49-48-48-48H144c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48h384c26.51 0 48-21.49 48-48zM256 128c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-96 144l55.515-55.515c4.686-4.686 12.284-4.686 16.971 0L272 256l135.515-135.515c4.686-4.686 12.284-4.686 16.971 0L512 208v112H160v-48z"] };
var faInbox = { prefix: 'fas', iconName: 'inbox', icon: [576, 512, [], "f01c", "M567.938 243.908L462.25 85.374A48.003 48.003 0 0 0 422.311 64H153.689a48 48 0 0 0-39.938 21.374L8.062 243.908A47.994 47.994 0 0 0 0 270.533V400c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V270.533a47.994 47.994 0 0 0-8.062-26.625zM162.252 128h251.497l85.333 128H376l-32 64H232l-32-64H76.918l85.334-128z"] };
var faIndent = { prefix: 'fas', iconName: 'indent', icon: [448, 512, [], "f03c", "M0 84V44c0-8.837 7.163-16 16-16h416c8.837 0 16 7.163 16 16v40c0 8.837-7.163 16-16 16H16c-8.837 0-16-7.163-16-16zm176 144h256c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H176c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zM16 484h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm160-128h256c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H176c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm-52.687-111.313l-96-95.984C17.266 138.652 0 145.776 0 160.016v191.975c0 14.329 17.325 21.304 27.313 11.313l96-95.992c6.249-6.247 6.249-16.377 0-22.625z"] };
var faIndustry = { prefix: 'fas', iconName: 'industry', icon: [512, 512, [], "f275", "M475.115 163.781L336 252.309v-68.28c0-18.916-20.931-30.399-36.885-20.248L160 252.309V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56v400c0 13.255 10.745 24 24 24h464c13.255 0 24-10.745 24-24V184.029c0-18.917-20.931-30.399-36.885-20.248z"] };
var faInfinity = { prefix: 'fas', iconName: 'infinity', icon: [640, 512, [], "f534", "M471.1 96C405 96 353.3 137.3 320 174.6 286.7 137.3 235 96 168.9 96 75.8 96 0 167.8 0 256s75.8 160 168.9 160c66.1 0 117.8-41.3 151.1-78.6 33.3 37.3 85 78.6 151.1 78.6 93.1 0 168.9-71.8 168.9-160S564.2 96 471.1 96zM168.9 320c-40.2 0-72.9-28.7-72.9-64s32.7-64 72.9-64c38.2 0 73.4 36.1 94 64-20.4 27.6-55.9 64-94 64zm302.2 0c-38.2 0-73.4-36.1-94-64 20.4-27.6 55.9-64 94-64 40.2 0 72.9 28.7 72.9 64s-32.7 64-72.9 64z"] };
var faInfo = { prefix: 'fas', iconName: 'info', icon: [192, 512, [], "f129", "M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z"] };
var faInfoCircle = { prefix: 'fas', iconName: 'info-circle', icon: [512, 512, [], "f05a", "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"] };
var faItalic = { prefix: 'fas', iconName: 'italic', icon: [320, 512, [], "f033", "M204.758 416h-33.849l62.092-320h40.725a16 16 0 0 0 15.704-12.937l6.242-32C297.599 41.184 290.034 32 279.968 32H120.235a16 16 0 0 0-15.704 12.937l-6.242 32C96.362 86.816 103.927 96 113.993 96h33.846l-62.09 320H46.278a16 16 0 0 0-15.704 12.935l-6.245 32C22.402 470.815 29.967 480 40.034 480h158.479a16 16 0 0 0 15.704-12.935l6.245-32c1.927-9.88-5.638-19.065-15.704-19.065z"] };
var faKey = { prefix: 'fas', iconName: 'key', icon: [512, 512, [], "f084", "M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z"] };
var faKeyboard = { prefix: 'fas', iconName: 'keyboard', icon: [576, 512, [], "f11c", "M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z"] };
var faKiwiBird = { prefix: 'fas', iconName: 'kiwi-bird', icon: [576, 512, [], "f535", "M575.81 217.98C572.64 157.41 518.28 112 457.63 112h-9.37c-52.82 0-104.25-16.25-147.74-46.24-41.99-28.96-96.04-41.62-153.21-28.7C129.3 41.12-.08 78.24 0 224c.04 70.95 38.68 132.8 95.99 166.01V464c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-54.26c15.36 3.96 31.4 6.26 48 6.26 5.44 0 10.68-.73 16-1.18V464c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-59.43c14.24-5.06 27.88-11.39 40.34-19.51C342.07 355.25 393.86 336 448.46 336c25.48 0 16.01-.31 23.05-.78l74.41 136.44c2.86 5.23 8.3 8.34 14.05 8.34 1.31 0 2.64-.16 3.95-.5 7.09-1.8 12.05-8.19 12.05-15.5 0 0 .14-240.24-.16-246.02zM463.97 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm80 153.25l-39.86-73.08c15.12-5.83 28.73-14.6 39.86-25.98v99.06z"] };
var faLanguage = { prefix: 'fas', iconName: 'language', icon: [640, 512, [], "f1ab", "M304 416H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h280v320zm-120.676-72.622A12 12 0 0 0 194.839 352h22.863c8.22 0 14.007-8.078 11.362-15.861L171.61 167.085a12 12 0 0 0-11.362-8.139h-32.489a12.001 12.001 0 0 0-11.362 8.139L58.942 336.139C56.297 343.922 62.084 352 70.304 352h22.805a12 12 0 0 0 11.535-8.693l9.118-31.807h60.211l9.351 31.878zm-39.051-140.42s4.32 21.061 7.83 33.21l10.8 37.531h-38.07l11.07-37.531c3.51-12.15 7.83-33.21 7.83-33.21h.54zM616 416H336V96h280c13.255 0 24 10.745 24 24v272c0 13.255-10.745 24-24 24zm-36-228h-64v-16c0-6.627-5.373-12-12-12h-16c-6.627 0-12 5.373-12 12v16h-64c-6.627 0-12 5.373-12 12v16c0 6.627 5.373 12 12 12h114.106c-6.263 14.299-16.518 28.972-30.023 43.206-6.56-6.898-12.397-13.91-17.365-20.933-3.639-5.144-10.585-6.675-15.995-3.446l-7.28 4.346-6.498 3.879c-5.956 3.556-7.693 11.421-3.735 17.117 6.065 8.729 13.098 17.336 20.984 25.726-8.122 6.226-16.841 12.244-26.103 17.964-5.521 3.41-7.381 10.556-4.162 16.19l7.941 13.896c3.362 5.883 10.935 7.826 16.706 4.276 12.732-7.831 24.571-16.175 35.443-24.891 10.917 8.761 22.766 17.102 35.396 24.881 5.774 3.556 13.353 1.618 16.717-4.27l7.944-13.903c3.213-5.623 1.37-12.76-4.135-16.171a312.737 312.737 0 0 1-26.06-18.019c21.024-22.425 35.768-46.289 42.713-69.85H580c6.627 0 12-5.373 12-12v-16c0-6.625-5.373-11.998-12-11.998z"] };
var faLaptop = { prefix: 'fas', iconName: 'laptop', icon: [640, 512, [], "f109", "M512 64v256H128V64h384m16-64H112C85.5 0 64 21.5 64 48v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm100 416H389.5c-3 0-5.5 2.1-5.9 5.1C381.2 436.3 368 448 352 448h-64c-16 0-29.2-11.7-31.6-26.9-.5-2.9-3-5.1-5.9-5.1H12c-6.6 0-12 5.4-12 12v36c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48v-36c0-6.6-5.4-12-12-12z"] };
var faLeaf = { prefix: 'fas', iconName: 'leaf', icon: [576, 512, [], "f06c", "M546.2 9.7c-5.6-12.5-21.6-13-28.3-1.2C486.9 62.4 431.4 96 368 96h-80C182 96 96 182 96 288c0 7 .8 13.7 1.5 20.5C161.3 262.8 253.4 224 384 224c8.8 0 16 7.2 16 16s-7.2 16-16 16C132.6 256 26 410.1 2.4 468c-6.6 16.3 1.2 34.9 17.5 41.6 16.4 6.8 35-1.1 41.8-17.3 1.5-3.6 20.9-47.9 71.9-90.6 32.4 43.9 94 85.8 174.9 77.2C465.5 467.5 576 326.7 576 154.3c0-50.2-10.8-102.2-29.8-144.6z"] };
var faLemon = { prefix: 'fas', iconName: 'lemon', icon: [512, 512, [], "f094", "M489.038 22.963C465.944-.13 434.648-5.93 413.947 6.129c-58.906 34.312-181.25-53.077-321.073 86.746S40.441 355.041 6.129 413.945c-12.059 20.702-6.26 51.999 16.833 75.093 23.095 23.095 54.392 28.891 75.095 16.832 58.901-34.31 181.246 53.079 321.068-86.743S471.56 156.96 505.871 98.056c12.059-20.702 6.261-51.999-16.833-75.093zM243.881 95.522c-58.189 14.547-133.808 90.155-148.358 148.358-1.817 7.27-8.342 12.124-15.511 12.124-1.284 0-2.59-.156-3.893-.481-8.572-2.144-13.784-10.83-11.642-19.403C81.901 166.427 166.316 81.93 236.119 64.478c8.575-2.143 17.261 3.069 19.403 11.642s-3.069 17.259-11.641 19.402z"] };
var faLessThan = { prefix: 'fas', iconName: 'less-than', icon: [384, 512, [], "f536", "M365.46 357.74L147.04 255.89l218.47-101.88c16.02-7.47 22.95-26.51 15.48-42.53l-13.52-29C360 66.46 340.96 59.53 324.94 67L18.48 209.91a32.014 32.014 0 0 0-18.48 29v34.24c0 12.44 7.21 23.75 18.48 29l306.31 142.83c16.06 7.49 35.15.54 42.64-15.52l13.56-29.08c7.49-16.06.54-35.15-15.53-42.64z"] };
var faLessThanEqual = { prefix: 'fas', iconName: 'less-than-equal', icon: [448, 512, [], "f537", "M54.98 214.2l301.41 119.87c18.39 6.03 38.71-2.54 45.38-19.15l12.09-30.08c6.68-16.61-2.82-34.97-21.21-41l-175.44-68.05 175.56-68.09c18.29-6 27.74-24.27 21.1-40.79l-12.03-29.92c-6.64-16.53-26.86-25.06-45.15-19.06L54.98 137.89C41.21 142.41 32 154.5 32 168.07v15.96c0 13.56 9.21 25.65 22.98 30.17zM424 400H24c-13.25 0-24 10.74-24 24v48c0 13.25 10.75 24 24 24h400c13.25 0 24-10.75 24-24v-48c0-13.26-10.75-24-24-24z"] };
var faLevelDownAlt = { prefix: 'fas', iconName: 'level-down-alt', icon: [320, 512, [], "f3be", "M313.553 392.331L209.587 504.334c-9.485 10.214-25.676 10.229-35.174 0L70.438 392.331C56.232 377.031 67.062 352 88.025 352H152V80H68.024a11.996 11.996 0 0 1-8.485-3.515l-56-56C-4.021 12.926 1.333 0 12.024 0H208c13.255 0 24 10.745 24 24v328h63.966c20.878 0 31.851 24.969 17.587 40.331z"] };
var faLevelUpAlt = { prefix: 'fas', iconName: 'level-up-alt', icon: [320, 512, [], "f3bf", "M313.553 119.669L209.587 7.666c-9.485-10.214-25.676-10.229-35.174 0L70.438 119.669C56.232 134.969 67.062 160 88.025 160H152v272H68.024a11.996 11.996 0 0 0-8.485 3.515l-56 56C-4.021 499.074 1.333 512 12.024 512H208c13.255 0 24-10.745 24-24V160h63.966c20.878 0 31.851-24.969 17.587-40.331z"] };
var faLifeRing = { prefix: 'fas', iconName: 'life-ring', icon: [512, 512, [], "f1cd", "M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm173.696 119.559l-63.399 63.399c-10.987-18.559-26.67-34.252-45.255-45.255l63.399-63.399a218.396 218.396 0 0 1 45.255 45.255zM256 352c-53.019 0-96-42.981-96-96s42.981-96 96-96 96 42.981 96 96-42.981 96-96 96zM127.559 82.304l63.399 63.399c-18.559 10.987-34.252 26.67-45.255 45.255l-63.399-63.399a218.372 218.372 0 0 1 45.255-45.255zM82.304 384.441l63.399-63.399c10.987 18.559 26.67 34.252 45.255 45.255l-63.399 63.399a218.396 218.396 0 0 1-45.255-45.255zm302.137 45.255l-63.399-63.399c18.559-10.987 34.252-26.67 45.255-45.255l63.399 63.399a218.403 218.403 0 0 1-45.255 45.255z"] };
var faLightbulb = { prefix: 'fas', iconName: 'lightbulb', icon: [384, 512, [], "f0eb", "M272 428v28c0 10.449-6.68 19.334-16 22.629V488c0 13.255-10.745 24-24 24h-80c-13.255 0-24-10.745-24-24v-9.371c-9.32-3.295-16-12.18-16-22.629v-28c0-6.627 5.373-12 12-12h136c6.627 0 12 5.373 12 12zm-143.107-44c-9.907 0-18.826-6.078-22.376-15.327C67.697 267.541 16 277.731 16 176 16 78.803 94.805 0 192 0s176 78.803 176 176c0 101.731-51.697 91.541-90.516 192.673-3.55 9.249-12.47 15.327-22.376 15.327H128.893zM112 176c0-44.112 35.888-80 80-80 8.837 0 16-7.164 16-16s-7.163-16-16-16c-61.757 0-112 50.243-112 112 0 8.836 7.164 16 16 16s16-7.164 16-16z"] };
var faLink = { prefix: 'fas', iconName: 'link', icon: [512, 512, [], "f0c1", "M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"] };
var faLiraSign = { prefix: 'fas', iconName: 'lira-sign', icon: [384, 512, [], "f195", "M371.994 256h-48.019C317.64 256 312 260.912 312 267.246 312 368 230.179 416 144 416V256.781l134.603-29.912A12 12 0 0 0 288 215.155v-40.976c0-7.677-7.109-13.38-14.603-11.714L144 191.219V160.78l134.603-29.912A12 12 0 0 0 288 119.154V78.179c0-7.677-7.109-13.38-14.603-11.714L144 95.219V44c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v68.997L9.397 125.131A12 12 0 0 0 0 136.845v40.976c0 7.677 7.109 13.38 14.603 11.714L64 178.558v30.439L9.397 221.131A12 12 0 0 0 0 232.845v40.976c0 7.677 7.109 13.38 14.603 11.714L64 274.558V468c0 6.627 5.373 12 12 12h79.583c134.091 0 223.255-77.834 228.408-211.592.261-6.782-5.211-12.408-11.997-12.408z"] };
var faList = { prefix: 'fas', iconName: 'list', icon: [512, 512, [], "f03a", "M128 116V76c0-8.837 7.163-16 16-16h352c8.837 0 16 7.163 16 16v40c0 8.837-7.163 16-16 16H144c-8.837 0-16-7.163-16-16zm16 176h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zM16 144h64c8.837 0 16-7.163 16-16V64c0-8.837-7.163-16-16-16H16C7.163 48 0 55.163 0 64v64c0 8.837 7.163 16 16 16zm0 160h64c8.837 0 16-7.163 16-16v-64c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v64c0 8.837 7.163 16 16 16zm0 160h64c8.837 0 16-7.163 16-16v-64c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v64c0 8.837 7.163 16 16 16z"] };
var faListAlt = { prefix: 'fas', iconName: 'list-alt', icon: [512, 512, [], "f022", "M464 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zM128 120c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 96c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 96c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm288-136v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12zm0 96v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12zm0 96v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12z"] };
var faListOl = { prefix: 'fas', iconName: 'list-ol', icon: [512, 512, [], "f0cb", "M3.263 139.527c0-7.477 3.917-11.572 11.573-11.572h15.131V88.078c0-5.163.534-10.503.534-10.503h-.356s-1.779 2.67-2.848 3.738c-4.451 4.273-10.504 4.451-15.666-1.068l-5.518-6.231c-5.342-5.341-4.984-11.216.534-16.379l21.72-19.938C32.815 33.602 36.732 32 42.785 32H54.89c7.656 0 11.749 3.916 11.749 11.572v84.384h15.488c7.655 0 11.572 4.094 11.572 11.572v8.901c0 7.477-3.917 11.572-11.572 11.572H14.836c-7.656 0-11.573-4.095-11.573-11.572v-8.902zM2.211 304.591c0-47.278 50.955-56.383 50.955-69.165 0-7.18-5.954-8.755-9.28-8.755-3.153 0-6.479 1.051-9.455 3.852-5.079 4.903-10.507 7.004-16.111 2.451l-8.579-6.829c-5.779-4.553-7.18-9.805-2.803-15.409C13.592 201.981 26.025 192 47.387 192c19.437 0 44.476 10.506 44.476 39.573 0 38.347-46.753 46.402-48.679 56.909h39.049c7.529 0 11.557 4.027 11.557 11.382v8.755c0 7.354-4.028 11.382-11.557 11.382h-67.94c-7.005 0-12.083-4.028-12.083-11.382v-4.028zM5.654 454.61l5.603-9.28c3.853-6.654 9.105-7.004 15.584-3.152 4.903 2.101 9.63 3.152 14.359 3.152 10.155 0 14.358-3.502 14.358-8.23 0-6.654-5.604-9.106-15.934-9.106h-4.728c-5.954 0-9.28-2.101-12.258-7.88l-1.05-1.926c-2.451-4.728-1.226-9.806 2.801-14.884l5.604-7.004c6.829-8.405 12.257-13.483 12.257-13.483v-.35s-4.203 1.051-12.608 1.051H16.685c-7.53 0-11.383-4.028-11.383-11.382v-8.755c0-7.53 3.853-11.382 11.383-11.382h58.484c7.529 0 11.382 4.027 11.382 11.382v3.327c0 5.778-1.401 9.806-5.079 14.183l-17.509 20.137c19.611 5.078 28.716 20.487 28.716 34.845 0 21.363-14.358 44.126-48.503 44.126-16.636 0-28.192-4.728-35.896-9.455-5.779-4.202-6.304-9.805-2.626-15.934zM144 132h352c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"] };
var faListUl = { prefix: 'fas', iconName: 'list-ul', icon: [512, 512, [], "f0ca", "M96 96c0 26.51-21.49 48-48 48S0 122.51 0 96s21.49-48 48-48 48 21.49 48 48zM48 208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm0 160c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm96-236h352c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"] };
var faLocationArrow = { prefix: 'fas', iconName: 'location-arrow', icon: [512, 512, [], "f124", "M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z"] };
var faLock = { prefix: 'fas', iconName: 'lock', icon: [448, 512, [], "f023", "M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"] };
var faLockOpen = { prefix: 'fas', iconName: 'lock-open', icon: [576, 512, [], "f3c1", "M423.5 0C339.5.3 272 69.5 272 153.5V224H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48h-48v-71.1c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v80c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-80C576 68 507.5-.3 423.5 0z"] };
var faLongArrowAltDown = { prefix: 'fas', iconName: 'long-arrow-alt-down', icon: [256, 512, [], "f309", "M168 345.941V44c0-6.627-5.373-12-12-12h-56c-6.627 0-12 5.373-12 12v301.941H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.569 9.373 33.941 0l86.059-86.059c15.119-15.119 4.411-40.971-16.971-40.971H168z"] };
var faLongArrowAltLeft = { prefix: 'fas', iconName: 'long-arrow-alt-left', icon: [448, 512, [], "f30a", "M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"] };
var faLongArrowAltRight = { prefix: 'fas', iconName: 'long-arrow-alt-right', icon: [448, 512, [], "f30b", "M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"] };
var faLongArrowAltUp = { prefix: 'fas', iconName: 'long-arrow-alt-up', icon: [256, 512, [], "f30c", "M88 166.059V468c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12V166.059h46.059c21.382 0 32.09-25.851 16.971-40.971l-86.059-86.059c-9.373-9.373-24.569-9.373-33.941 0l-86.059 86.059c-15.119 15.119-4.411 40.971 16.971 40.971H88z"] };
var faLowVision = { prefix: 'fas', iconName: 'low-vision', icon: [576, 512, [], "f2a8", "M569.344 231.631C512.96 135.949 407.81 72 288 72c-28.468 0-56.102 3.619-82.451 10.409L152.778 10.24c-7.601-10.858-22.564-13.5-33.423-5.9l-13.114 9.178c-10.86 7.601-13.502 22.566-5.9 33.426l43.131 58.395C89.449 131.73 40.228 174.683 6.682 231.581c-.01.017-.023.033-.034.05-8.765 14.875-8.964 33.528 0 48.739 38.5 65.332 99.742 115.862 172.859 141.349L55.316 244.302A272.194 272.194 0 0 1 83.61 208.39l119.4 170.58h.01l40.63 58.04a330.055 330.055 0 0 0 78.94 1.17l-189.98-271.4a277.628 277.628 0 0 1 38.777-21.563l251.836 356.544c7.601 10.858 22.564 13.499 33.423 5.9l13.114-9.178c10.86-7.601 13.502-22.567 5.9-33.426l-43.12-58.377-.007-.009c57.161-27.978 104.835-72.04 136.81-126.301a47.938 47.938 0 0 0 .001-48.739zM390.026 345.94l-19.066-27.23c24.682-32.567 27.711-76.353 8.8-111.68v.03c0 23.65-19.17 42.82-42.82 42.82-23.828 0-42.82-19.349-42.82-42.82 0-23.65 19.17-42.82 42.82-42.82h.03c-24.75-13.249-53.522-15.643-79.51-7.68l-19.068-27.237C253.758 123.306 270.488 120 288 120c75.162 0 136 60.826 136 136 0 34.504-12.833 65.975-33.974 89.94z"] };
var faMagic = { prefix: 'fas', iconName: 'magic', icon: [512, 512, [], "f0d0", "M101.1 505L7 410.9c-9.4-9.4-9.4-24.6 0-33.9L377 7c9.4-9.4 24.6-9.4 33.9 0l94.1 94.1c9.4 9.4 9.4 24.6 0 33.9L135 505c-9.3 9.3-24.5 9.3-33.9 0zM304 159.2l48.8 48.8 89.9-89.9-48.8-48.8-89.9 89.9zM138.9 39.3l-11.7 23.8-26.2 3.8c-4.7.7-6.6 6.5-3.2 9.8l19 18.5-4.5 26.1c-.8 4.7 4.1 8.3 8.3 6.1L144 115l23.4 12.3c4.2 2.2 9.1-1.4 8.3-6.1l-4.5-26.1 19-18.5c3.4-3.3 1.5-9.1-3.2-9.8L160.8 63l-11.7-23.8c-2-4.1-8.1-4.1-10.2.1zm97.7-20.7l-7.8 15.8-17.5 2.6c-3.1.5-4.4 4.3-2.1 6.5l12.6 12.3-3 17.4c-.5 3.1 2.8 5.5 5.6 4L240 69l15.6 8.2c2.8 1.5 6.1-.9 5.6-4l-3-17.4 12.6-12.3c2.3-2.2 1-6.1-2.1-6.5l-17.5-2.5-7.8-15.8c-1.4-3-5.4-3-6.8-.1zm-192 0l-7.8 15.8L19.3 37c-3.1.5-4.4 4.3-2.1 6.5l12.6 12.3-3 17.4c-.5 3.1 2.8 5.5 5.6 4L48 69l15.6 8.2c2.8 1.5 6.1-.9 5.6-4l-3-17.4 12.6-12.3c2.3-2.2 1-6.1-2.1-6.5l-17.5-2.5-7.8-15.8c-1.4-3-5.4-3-6.8-.1zm416 223.5l-7.8 15.8-17.5 2.5c-3.1.5-4.4 4.3-2.1 6.5l12.6 12.3-3 17.4c-.5 3.1 2.8 5.5 5.6 4l15.6-8.2 15.6 8.2c2.8 1.5 6.1-.9 5.6-4l-3-17.4 12.6-12.3c2.3-2.2 1-6.1-2.1-6.5l-17.5-2.5-7.8-15.8c-1.4-2.8-5.4-2.8-6.8 0z"] };
var faMagnet = { prefix: 'fas', iconName: 'magnet', icon: [512, 512, [], "f076", "M164.1 160H12c-6.6 0-12-5.4-12-12V68c0-19.9 16.1-36 36-36h104c19.9 0 36 16.1 36 36v80c.1 6.6-5.3 12-11.9 12zm348-12V67.9c0-19.9-16.1-36-36-36h-104c-19.9 0-36 16.1-36 36v80c0 6.6 5.4 12 12 12h152c6.6.1 12-5.3 12-11.9zm-164 44c-6.6 0-12 5.4-12 12v52c0 128.1-160 127.9-160 0v-52c0-6.6-5.4-12-12-12h-152c-6.7 0-12 5.4-12 12.1.1 21.4.6 40.3 0 53.3C.1 408 136.3 504 256.9 504 377.5 504 512 408 512 257.3c-.6-12.8-.2-33 0-53.2 0-6.7-5.3-12.1-12-12.1H348.1z"] };
var faMale = { prefix: 'fas', iconName: 'male', icon: [192, 512, [], "f183", "M96 0c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64S60.654 0 96 0m48 144h-11.36c-22.711 10.443-49.59 10.894-73.28 0H48c-26.51 0-48 21.49-48 48v136c0 13.255 10.745 24 24 24h16v136c0 13.255 10.745 24 24 24h64c13.255 0 24-10.745 24-24V352h16c13.255 0 24-10.745 24-24V192c0-26.51-21.49-48-48-48z"] };
var faMap = { prefix: 'fas', iconName: 'map', icon: [576, 512, [], "f279", "M576 56.015v335.97a23.998 23.998 0 0 1-13.267 21.466l-128 64C418.948 485.344 400 473.992 400 455.985v-335.97a23.998 23.998 0 0 1 13.267-21.466l128-64C557.052 26.656 576 38.008 576 56.015zm-206.253 42.07l-144-64c-15.751-7-33.747 4.461-33.747 21.932v335.967a24 24 0 0 0 14.253 21.931l144 64c15.751 7 33.747-4.461 33.747-21.931V120.017a24 24 0 0 0-14.253-21.932zm-228.48-63.536l-128 63.985A23.998 23.998 0 0 0 0 120v335.985c0 18.007 18.948 29.359 34.733 21.466l128-63.985A23.998 23.998 0 0 0 176 392V56.015c0-18.007-18.948-29.359-34.733-21.466z"] };
var faMapMarker = { prefix: 'fas', iconName: 'map-marker', icon: [384, 512, [], "f041", "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"] };
var faMapMarkerAlt = { prefix: 'fas', iconName: 'map-marker-alt', icon: [384, 512, [], "f3c5", "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"] };
var faMapPin = { prefix: 'fas', iconName: 'map-pin', icon: [320, 512, [], "f276", "M192 300.813v172.82l-22.015 33.023c-4.75 7.125-15.219 7.125-19.969 0L128 473.633v-172.82a162.221 162.221 0 0 0 64 0zM160 0c79.529 0 144 64.471 144 144s-64.471 144-144 144S16 223.529 16 144 80.471 0 160 0M80 136c0-39.701 32.299-72 72-72a8 8 0 0 0 0-16c-48.523 0-88 39.477-88 88a8 8 0 0 0 16 0z"] };
var faMapSigns = { prefix: 'fas', iconName: 'map-signs', icon: [512, 512, [], "f277", "M487.515 104.485L439.03 152.97a23.998 23.998 0 0 1-16.97 7.029H56c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h160v-8c0-13.255 10.745-24 24-24h32c13.255 0 24 10.745 24 24v8h126.059a24 24 0 0 1 16.97 7.029l48.485 48.485c4.687 4.687 4.687 12.285.001 16.971zM216 368v120c0 13.255 10.745 24 24 24h32c13.255 0 24-10.745 24-24V368h-80zm240-144H296v-48h-80v48H89.941a24 24 0 0 0-16.97 7.029l-48.485 48.485c-4.686 4.686-4.686 12.284 0 16.971l48.485 48.485a23.998 23.998 0 0 0 16.97 7.029H456c13.255 0 24-10.745 24-24v-80C480 234.745 469.255 224 456 224z"] };
var faMars = { prefix: 'fas', iconName: 'mars', icon: [384, 512, [], "f222", "M372 64h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-80.7 80.7c-22.2-14-48.5-22.1-76.7-22.1C64.5 160 0 224.5 0 304s64.5 144 144 144 144-64.5 144-144c0-28.2-8.1-54.5-22.1-76.7l80.7-80.7 16.9 16.9c7.6 7.6 20.5 2.2 20.5-8.5V76c0-6.6-5.4-12-12-12zM144 384c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"] };
var faMarsDouble = { prefix: 'fas', iconName: 'mars-double', icon: [512, 512, [], "f227", "M340 0h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-48.7 48.7C198.5 72.1 172.2 64 144 64 64.5 64 0 128.5 0 208s64.5 144 144 144 144-64.5 144-144c0-28.2-8.1-54.5-22.1-76.7l48.7-48.7 16.9 16.9c2.4 2.4 5.5 3.5 8.4 3.5 6.2 0 12.1-4.8 12.1-12V12c0-6.6-5.4-12-12-12zM144 288c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80zm356-128.1h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-48.7 48.7c-18.2-11.4-39-18.9-61.5-21.3-2.1 21.8-8.2 43.3-18.4 63.3 1.1 0 2.2-.1 3.2-.1 44.1 0 80 35.9 80 80s-35.9 80-80 80-80-35.9-80-80c0-1.1 0-2.2.1-3.2-20 10.2-41.5 16.4-63.3 18.4C168.4 455.6 229.6 512 304 512c79.5 0 144-64.5 144-144 0-28.2-8.1-54.5-22.1-76.7l48.7-48.7 16.9 16.9c2.4 2.4 5.4 3.5 8.4 3.5 6.2 0 12.1-4.8 12.1-12v-79c0-6.7-5.4-12.1-12-12.1z"] };
var faMarsStroke = { prefix: 'fas', iconName: 'mars-stroke', icon: [384, 512, [], "f229", "M372 64h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-17.5 17.5-14.1-14.1c-4.7-4.7-12.3-4.7-17 0L224.5 133c-4.7 4.7-4.7 12.3 0 17l14.1 14.1-18 18c-22.2-14-48.5-22.1-76.7-22.1C64.5 160 0 224.5 0 304s64.5 144 144 144 144-64.5 144-144c0-28.2-8.1-54.5-22.1-76.7l18-18 14.1 14.1c4.7 4.7 12.3 4.7 17 0l28.3-28.3c4.7-4.7 4.7-12.3 0-17L329.2 164l17.5-17.5 16.9 16.9c7.6 7.6 20.5 2.2 20.5-8.5V76c-.1-6.6-5.5-12-12.1-12zM144 384c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"] };
var faMarsStrokeH = { prefix: 'fas', iconName: 'mars-stroke-h', icon: [480, 512, [], "f22b", "M476.2 247.5l-55.9-55.9c-7.6-7.6-20.5-2.2-20.5 8.5V224H376v-20c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v20h-27.6c-5.8-25.6-18.7-49.9-38.6-69.8C189.6 98 98.4 98 42.2 154.2c-56.2 56.2-56.2 147.4 0 203.6 56.2 56.2 147.4 56.2 203.6 0 19.9-19.9 32.8-44.2 38.6-69.8H312v20c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-20h23.9v23.9c0 10.7 12.9 16 20.5 8.5l55.9-55.9c4.6-4.7 4.6-12.3-.1-17zm-275.6 65.1c-31.2 31.2-81.9 31.2-113.1 0-31.2-31.2-31.2-81.9 0-113.1 31.2-31.2 81.9-31.2 113.1 0 31.2 31.1 31.2 81.9 0 113.1z"] };
var faMarsStrokeV = { prefix: 'fas', iconName: 'mars-stroke-v', icon: [288, 512, [], "f22a", "M245.8 234.2c-19.9-19.9-44.2-32.8-69.8-38.6v-25.4h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20V81.4h23.9c10.7 0 16-12.9 8.5-20.5L152.5 5.1c-4.7-4.7-12.3-4.7-17 0L79.6 61c-7.6 7.6-2.2 20.5 8.5 20.5H112v24.7H92c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h20v25.4c-25.6 5.8-49.9 18.7-69.8 38.6-56.2 56.2-56.2 147.4 0 203.6 56.2 56.2 147.4 56.2 203.6 0 56.3-56.2 56.3-147.4 0-203.6zm-45.2 158.4c-31.2 31.2-81.9 31.2-113.1 0-31.2-31.2-31.2-81.9 0-113.1 31.2-31.2 81.9-31.2 113.1 0 31.2 31.1 31.2 81.9 0 113.1z"] };
var faMedkit = { prefix: 'fas', iconName: 'medkit', icon: [512, 512, [], "f0fa", "M96 480h320V128h-32V80c0-26.51-21.49-48-48-48H176c-26.51 0-48 21.49-48 48v48H96v352zm96-384h128v32H192V96zm320 80v256c0 26.51-21.49 48-48 48h-16V128h16c26.51 0 48 21.49 48 48zM64 480H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v352zm288-208v32c0 8.837-7.163 16-16 16h-48v48c0 8.837-7.163 16-16 16h-32c-8.837 0-16-7.163-16-16v-48h-48c-8.837 0-16-7.163-16-16v-32c0-8.837 7.163-16 16-16h48v-48c0-8.837 7.163-16 16-16h32c8.837 0 16 7.163 16 16v48h48c8.837 0 16 7.163 16 16z"] };
var faMeh = { prefix: 'fas', iconName: 'meh', icon: [496, 512, [], "f11a", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm-80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm176 192H152c-8.8 0-16-7.2-16-16s7.2-16 16-16h192c8.8 0 16 7.2 16 16s-7.2 16-16 16zm-16-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"] };
var faMemory = { prefix: 'fas', iconName: 'memory', icon: [640, 512, [], "f538", "M640 130.94V96c0-17.67-14.33-32-32-32H32C14.33 64 0 78.33 0 96v34.94c18.6 6.61 32 24.19 32 45.06s-13.4 38.45-32 45.06V320h640v-98.94c-18.6-6.61-32-24.19-32-45.06s13.4-38.45 32-45.06zM224 256h-64V128h64v128zm128 0h-64V128h64v128zm128 0h-64V128h64v128zM0 448h64v-26.67c0-8.84 7.16-16 16-16s16 7.16 16 16V448h128v-26.67c0-8.84 7.16-16 16-16s16 7.16 16 16V448h128v-26.67c0-8.84 7.16-16 16-16s16 7.16 16 16V448h128v-26.67c0-8.84 7.16-16 16-16s16 7.16 16 16V448h64v-96H0v96z"] };
var faMercury = { prefix: 'fas', iconName: 'mercury', icon: [288, 512, [], "f223", "M288 208c0-44.2-19.9-83.7-51.2-110.1 2.5-1.8 4.9-3.8 7.2-5.8 24.7-21.2 39.8-48.8 43.2-78.8.9-7.1-4.7-13.3-11.9-13.3h-40.5C229 0 224.1 4.1 223 9.8c-2.4 12.5-9.6 24.3-20.7 33.8C187 56.8 166.3 64 144 64s-43-7.2-58.4-20.4C74.5 34.1 67.4 22.3 64.9 9.8 63.8 4.1 58.9 0 53.2 0H12.7C5.5 0-.1 6.2.8 13.3 4.2 43.4 19.2 71 44 92.2c2.3 2 4.7 3.9 7.2 5.8C19.9 124.3 0 163.8 0 208c0 68.5 47.9 125.9 112 140.4V400H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.5 112-71.9 112-140.4zm-224 0c0-44.1 35.9-80 80-80s80 35.9 80 80-35.9 80-80 80-80-35.9-80-80z"] };
var faMicrochip = { prefix: 'fas', iconName: 'microchip', icon: [512, 512, [], "f2db", "M416 48v416c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V48c0-26.51 21.49-48 48-48h224c26.51 0 48 21.49 48 48zm96 58v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42V88h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zm0 96v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42v-48h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zm0 96v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42v-48h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zm0 96v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42v-48h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zM30 376h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6zm0-96h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6zm0-96h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6zm0-96h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6z"] };
var faMicrophone = { prefix: 'fas', iconName: 'microphone', icon: [352, 512, [], "f130", "M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z"] };
var faMicrophoneAlt = { prefix: 'fas', iconName: 'microphone-alt', icon: [352, 512, [], "f3c9", "M336 192h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16zM176 352c53.02 0 96-42.98 96-96h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272v-32h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272v-32h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96z"] };
var faMicrophoneAltSlash = { prefix: 'fas', iconName: 'microphone-alt-slash', icon: [640, 512, [], "f539", "M633.82 458.1L476.26 336.33C488.74 312.21 496 284.98 496 256v-48c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v48c0 17.92-3.96 34.8-10.72 50.2l-26.55-20.52c3.1-9.4 5.28-19.22 5.28-29.67h-43.67l-41.4-32H416v-32h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H416v-32h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H416c0-53.02-42.98-96-96-96s-96 42.98-96 96v45.36L45.47 3.37C38.49-2.05 28.43-.8 23.01 6.18L3.37 31.45C-2.05 38.42-.8 48.47 6.18 53.9l588.36 454.73c6.98 5.43 17.03 4.17 22.46-2.81l19.64-25.27c5.41-6.97 4.16-17.02-2.82-22.45zM400 464h-56v-33.78c11.71-1.62 23.1-4.28 33.96-8.08l-50.4-38.96c-6.71.4-13.41.87-20.35.2-55.85-5.45-98.74-48.63-111.18-101.85L144 241.31v6.85c0 89.64 63.97 169.55 152 181.69V464h-56c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16z"] };
var faMicrophoneSlash = { prefix: 'fas', iconName: 'microphone-slash', icon: [640, 512, [], "f131", "M633.82 458.1l-157.8-121.96C488.61 312.13 496 285.01 496 256v-48c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v48c0 17.92-3.96 34.8-10.72 50.2l-26.55-20.52c3.1-9.4 5.28-19.22 5.28-29.67V96c0-53.02-42.98-96-96-96s-96 42.98-96 96v45.36L45.47 3.37C38.49-2.05 28.43-.8 23.01 6.18L3.37 31.45C-2.05 38.42-.8 48.47 6.18 53.9l588.36 454.73c6.98 5.43 17.03 4.17 22.46-2.81l19.64-25.27c5.41-6.97 4.16-17.02-2.82-22.45zM400 464h-56v-33.77c11.66-1.6 22.85-4.54 33.67-8.31l-50.11-38.73c-6.71.4-13.41.87-20.35.2-55.85-5.45-98.74-48.63-111.18-101.85L144 241.31v6.85c0 89.64 63.97 169.55 152 181.69V464h-56c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16z"] };
var faMinus = { prefix: 'fas', iconName: 'minus', icon: [448, 512, [], "f068", "M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"] };
var faMinusCircle = { prefix: 'fas', iconName: 'minus-circle', icon: [512, 512, [], "f056", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z"] };
var faMinusSquare = { prefix: 'fas', iconName: 'minus-square', icon: [448, 512, [], "f146", "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM92 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H92z"] };
var faMobile = { prefix: 'fas', iconName: 'mobile', icon: [320, 512, [], "f10b", "M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"] };
var faMobileAlt = { prefix: 'fas', iconName: 'mobile-alt', icon: [320, 512, [], "f3cd", "M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"] };
var faMoneyBill = { prefix: 'fas', iconName: 'money-bill', icon: [640, 512, [], "f0d6", "M608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zM48 400v-64c35.35 0 64 28.65 64 64H48zm0-224v-64h64c0 35.35-28.65 64-64 64zm272 176c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96zm272 48h-64c0-35.35 28.65-64 64-64v64zm0-224c-35.35 0-64-28.65-64-64h64v64z"] };
var faMoneyBillAlt = { prefix: 'fas', iconName: 'money-bill-alt', icon: [640, 512, [], "f3d1", "M352 288h-16v-88c0-4.42-3.58-8-8-8h-13.58c-4.74 0-9.37 1.4-13.31 4.03l-15.33 10.22a7.994 7.994 0 0 0-2.22 11.09l8.88 13.31a7.994 7.994 0 0 0 11.09 2.22l.47-.31V288h-16c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h64c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8zM608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zM48 400v-64c35.35 0 64 28.65 64 64H48zm0-224v-64h64c0 35.35-28.65 64-64 64zm272 192c-53.02 0-96-50.15-96-112 0-61.86 42.98-112 96-112s96 50.14 96 112c0 61.87-43 112-96 112zm272 32h-64c0-35.35 28.65-64 64-64v64zm0-224c-35.35 0-64-28.65-64-64h64v64z"] };
var faMoneyBillWave = { prefix: 'fas', iconName: 'money-bill-wave', icon: [640, 512, [], "f53a", "M621.16 54.46C582.37 38.19 543.55 32 504.75 32c-123.17-.01-246.33 62.34-369.5 62.34-30.89 0-61.76-3.92-92.65-13.72-3.47-1.1-6.95-1.62-10.35-1.62C15.04 79 0 92.32 0 110.81v317.26c0 12.63 7.23 24.6 18.84 29.46C57.63 473.81 96.45 480 135.25 480c123.17 0 246.34-62.35 369.51-62.35 30.89 0 61.76 3.92 92.65 13.72 3.47 1.1 6.95 1.62 10.35 1.62 17.21 0 32.25-13.32 32.25-31.81V83.93c-.01-12.64-7.24-24.6-18.85-29.47zM48 132.22c20.12 5.04 41.12 7.57 62.72 8.93C104.84 170.54 79 192.69 48 192.69v-60.47zm0 285v-47.78c34.37 0 62.18 27.27 63.71 61.4-22.53-1.81-43.59-6.31-63.71-13.62zM320 352c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96zm272 27.78c-17.52-4.39-35.71-6.85-54.32-8.44 5.87-26.08 27.5-45.88 54.32-49.28v57.72zm0-236.11c-30.89-3.91-54.86-29.7-55.81-61.55 19.54 2.17 38.09 6.23 55.81 12.66v48.89z"] };
var faMoneyBillWaveAlt = { prefix: 'fas', iconName: 'money-bill-wave-alt', icon: [640, 512, [], "f53b", "M621.16 54.46C582.37 38.19 543.55 32 504.75 32c-123.17-.01-246.33 62.34-369.5 62.34-30.89 0-61.76-3.92-92.65-13.72-3.47-1.1-6.95-1.62-10.35-1.62C15.04 79 0 92.32 0 110.81v317.26c0 12.63 7.23 24.6 18.84 29.46C57.63 473.81 96.45 480 135.25 480c123.17 0 246.34-62.35 369.51-62.35 30.89 0 61.76 3.92 92.65 13.72 3.47 1.1 6.95 1.62 10.35 1.62 17.21 0 32.25-13.32 32.25-31.81V83.93c-.01-12.64-7.24-24.6-18.85-29.47zM320 352c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96z"] };
var faMoneyCheck = { prefix: 'fas', iconName: 'money-check', icon: [640, 512, [], "f53c", "M0 448c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V128H0v320zm448-208c0-8.84 7.16-16 16-16h96c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-32zm0 120c0-4.42 3.58-8 8-8h112c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H456c-4.42 0-8-3.58-8-8v-16zM64 264c0-4.42 3.58-8 8-8h304c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm0 96c0-4.42 3.58-8 8-8h176c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zM624 32H16C7.16 32 0 39.16 0 48v48h640V48c0-8.84-7.16-16-16-16z"] };
var faMoneyCheckAlt = { prefix: 'fas', iconName: 'money-check-alt', icon: [640, 512, [], "f53d", "M608 32H32C14.33 32 0 46.33 0 64v384c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zM176 327.88V344c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-16.29c-11.29-.58-22.27-4.52-31.37-11.35-3.9-2.93-4.1-8.77-.57-12.14l11.75-11.21c2.77-2.64 6.89-2.76 10.13-.73 3.87 2.42 8.26 3.72 12.82 3.72h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.67-45.07V152c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v16.29c11.29.58 22.27 4.51 31.37 11.35 3.9 2.93 4.1 8.77.57 12.14l-11.75 11.21c-2.77 2.64-6.89 2.76-10.13.73-3.87-2.43-8.26-3.72-12.82-3.72h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19.05 44.44-42.67 45.07zM416 312c0 4.42-3.58 8-8 8H296c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h112c4.42 0 8 3.58 8 8v16zm160 0c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16zm0-96c0 4.42-3.58 8-8 8H296c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h272c4.42 0 8 3.58 8 8v16z"] };
var faMoon = { prefix: 'fas', iconName: 'moon', icon: [512, 512, [], "f186", "M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"] };
var faMotorcycle = { prefix: 'fas', iconName: 'motorcycle', icon: [640, 512, [], "f21c", "M512.949 192.003c-14.862-.108-29.14 2.322-42.434 6.874L437.589 144H520c13.255 0 24-10.745 24-24V88c0-13.255-10.745-24-24-24h-45.311a24 24 0 0 0-17.839 7.945l-37.496 41.663-22.774-37.956A24 24 0 0 0 376 64h-80c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h66.411l19.2 32H227.904c-17.727-23.073-44.924-40-99.904-40H72.54c-13.455 0-24.791 11.011-24.536 24.464C48.252 141.505 58.9 152 72 152h56c24.504 0 38.686 10.919 47.787 24.769l-11.291 20.529c-13.006-3.865-26.871-5.736-41.251-5.21C55.857 194.549 1.565 249.605.034 317.021-1.603 389.076 56.317 448 128 448c59.642 0 109.744-40.794 123.953-96h84.236c13.673 0 24.589-11.421 23.976-25.077-2.118-47.12 17.522-93.665 56.185-125.026l12.485 20.808c-27.646 23.654-45.097 58.88-44.831 98.179.47 69.556 57.203 126.452 126.758 127.11 71.629.678 129.839-57.487 129.234-129.099-.588-69.591-57.455-126.386-127.047-126.892zM128 400c-44.112 0-80-35.888-80-80s35.888-80 80-80c4.242 0 8.405.341 12.469.982L98.97 316.434C90.187 332.407 101.762 352 120 352h81.297c-12.37 28.225-40.56 48-73.297 48zm388.351-.116C470.272 402.337 432 365.554 432 320c0-21.363 8.434-40.781 22.125-55.144l49.412 82.352c4.546 7.577 14.375 10.034 21.952 5.488l13.72-8.232c7.577-4.546 10.034-14.375 5.488-21.952l-48.556-80.927A80.005 80.005 0 0 1 512 240c45.554 0 82.338 38.273 79.884 84.352-2.16 40.558-34.974 73.372-75.533 75.532z"] };
var faMousePointer = { prefix: 'fas', iconName: 'mouse-pointer', icon: [320, 512, [], "f245", "M302.189 329.126H196.105l55.831 135.993c3.889 9.428-.555 19.999-9.444 23.999l-49.165 21.427c-9.165 4-19.443-.571-23.332-9.714l-53.053-129.136-86.664 89.138C18.729 472.71 0 463.554 0 447.977V18.299C0 1.899 19.921-6.096 30.277 5.443l284.412 292.542c11.472 11.179 3.007 31.141-12.5 31.141z"] };
var faMusic = { prefix: 'fas', iconName: 'music', icon: [512, 512, [], "f001", "M470.4 1.5l-304 96C153.1 101.7 144 114 144 128v264.6c-14.1-5.4-30.5-8.6-48-8.6-53 0-96 28.7-96 64s43 64 96 64 96-28.7 96-64V220.5l272-85.9v194c-14.1-5.4-30.5-8.6-48-8.6-53 0-96 28.7-96 64s43 64 96 64 96-28.7 96-64V32c0-21.7-21.1-37-41.6-30.5z"] };
var faNeuter = { prefix: 'fas', iconName: 'neuter', icon: [288, 512, [], "f22c", "M288 176c0-79.5-64.5-144-144-144S0 96.5 0 176c0 68.5 47.9 125.9 112 140.4V468c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V316.4c64.1-14.5 112-71.9 112-140.4zm-144 80c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"] };
var faNewspaper = { prefix: 'fas', iconName: 'newspaper', icon: [576, 512, [], "f1ea", "M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"] };
var faNotEqual = { prefix: 'fas', iconName: 'not-equal', icon: [448, 512, [], "f53e", "M416 208c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32h-23.88l51.87-66.81c5.37-7.02 4.04-17.06-2.97-22.43L415.61 3.3c-7.02-5.38-17.06-4.04-22.44 2.97L311.09 112H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h204.56l-74.53 96H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h55.49l-51.87 66.81c-5.37 7.01-4.04 17.05 2.97 22.43L64 508.7c7.02 5.38 17.06 4.04 22.43-2.97L168.52 400H416c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32H243.05l74.53-96H416z"] };
var faNotesMedical = { prefix: 'fas', iconName: 'notes-medical', icon: [384, 512, [], "f481", "M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm96 304c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48zm0-192c0 4.4-3.6 8-8 8H104c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h176c4.4 0 8 3.6 8 8v16z"] };
var faObjectGroup = { prefix: 'fas', iconName: 'object-group', icon: [512, 512, [], "f247", "M480 128V96h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v20H64V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h20v320H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-20h384v20c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-20V128zM96 276V140c0-6.627 5.373-12 12-12h168c6.627 0 12 5.373 12 12v136c0 6.627-5.373 12-12 12H108c-6.627 0-12-5.373-12-12zm320 96c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12v-52h72c13.255 0 24-10.745 24-24v-72h84c6.627 0 12 5.373 12 12v136z"] };
var faObjectUngroup = { prefix: 'fas', iconName: 'object-ungroup', icon: [576, 512, [], "f248", "M64 320v26a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6v-52a6 6 0 0 1 6-6h26V96H6a6 6 0 0 1-6-6V38a6 6 0 0 1 6-6h52a6 6 0 0 1 6 6v26h288V38a6 6 0 0 1 6-6h52a6 6 0 0 1 6 6v52a6 6 0 0 1-6 6h-26v192h26a6 6 0 0 1 6 6v52a6 6 0 0 1-6 6h-52a6 6 0 0 1-6-6v-26H64zm480-64v-32h26a6 6 0 0 0 6-6v-52a6 6 0 0 0-6-6h-52a6 6 0 0 0-6 6v26H408v72h8c13.255 0 24 10.745 24 24v64c0 13.255-10.745 24-24 24h-64c-13.255 0-24-10.745-24-24v-8H192v72h-26a6 6 0 0 0-6 6v52a6 6 0 0 0 6 6h52a6 6 0 0 0 6-6v-26h288v26a6 6 0 0 0 6 6h52a6 6 0 0 0 6-6v-52a6 6 0 0 0-6-6h-26V256z"] };
var faOutdent = { prefix: 'fas', iconName: 'outdent', icon: [448, 512, [], "f03b", "M0 84V44c0-8.837 7.163-16 16-16h416c8.837 0 16 7.163 16 16v40c0 8.837-7.163 16-16 16H16c-8.837 0-16-7.163-16-16zm208 144h224c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H208c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zM16 484h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm192-128h224c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H208c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zM4.687 267.313l96 95.984C110.734 373.348 128 366.224 128 351.984V160.008c0-14.329-17.325-21.304-27.313-11.313l-96 95.992c-6.249 6.248-6.249 16.378 0 22.626z"] };
var faPaintBrush = { prefix: 'fas', iconName: 'paint-brush', icon: [512, 512, [], "f1fc", "M269.9 364.6c1.4 6.4 2.1 13 2.1 19.7 0 81.2-54.2 127.7-134.8 127.7C41.5 512 0 435.1 0 347.6c10.4 7.1 46.9 36.5 58.7 36.5 7 0 13-4 15.5-10.6 23.6-62.2 66.5-76.5 112.9-77.4 15.6 33.8 46.1 59.6 82.8 68.5zM460.6 0c-14.4 0-27.9 6.4-38.2 15.7C228.2 190 208 194.1 208 245.4c0 48.8 40.5 90.6 90.2 90.6 59 0 93.2-43.4 200.6-244.8 7-13.7 13.2-28.5 13.2-43.9C512 19.7 487.3 0 460.6 0z"] };
var faPalette = { prefix: 'fas', iconName: 'palette', icon: [512, 512, [], "f53f", "M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"] };
var faPallet = { prefix: 'fas', iconName: 'pallet', icon: [640, 512, [], "f482", "M144 256h352c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16H384v128l-64-32-64 32V0H144c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16zm480 128c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v64H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-48v-64h48zm-336 64H128v-64h160v64zm224 0H352v-64h160v64z"] };
var faPaperPlane = { prefix: 'fas', iconName: 'paper-plane', icon: [512, 512, [], "f1d8", "M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"] };
var faPaperclip = { prefix: 'fas', iconName: 'paperclip', icon: [448, 512, [], "f0c6", "M43.246 466.142c-58.43-60.289-57.341-157.511 1.386-217.581L254.392 34c44.316-45.332 116.351-45.336 160.671 0 43.89 44.894 43.943 117.329 0 162.276L232.214 383.128c-29.855 30.537-78.633 30.111-107.982-.998-28.275-29.97-27.368-77.473 1.452-106.953l143.743-146.835c6.182-6.314 16.312-6.422 22.626-.241l22.861 22.379c6.315 6.182 6.422 16.312.241 22.626L171.427 319.927c-4.932 5.045-5.236 13.428-.648 18.292 4.372 4.634 11.245 4.711 15.688.165l182.849-186.851c19.613-20.062 19.613-52.725-.011-72.798-19.189-19.627-49.957-19.637-69.154 0L90.39 293.295c-34.763 35.56-35.299 93.12-1.191 128.313 34.01 35.093 88.985 35.137 123.058.286l172.06-175.999c6.177-6.319 16.307-6.433 22.626-.256l22.877 22.364c6.319 6.177 6.434 16.307.256 22.626l-172.06 175.998c-59.576 60.938-155.943 60.216-214.77-.485z"] };
var faParachuteBox = { prefix: 'fas', iconName: 'parachute-box', icon: [512, 512, [], "f4cd", "M511.9 175c-9.1-75.6-78.4-132.4-158.3-158.7C390 55.7 416 116.9 416 192h28.1L327.5 321.5c-2.5-.6-4.8-1.5-7.5-1.5h-48V192h112C384 76.8 315.1 0 256 0S128 76.8 128 192h112v128h-48c-2.7 0-5 .9-7.5 1.5L67.9 192H96c0-75.1 26-136.3 62.4-175.7C78.5 42.7 9.2 99.5.1 175c-1.1 9.1 6.8 17 16 17h8.7l136.7 151.9c-.7 2.6-1.6 5.2-1.6 8.1v128c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V352c0-2.9-.9-5.4-1.6-8.1L487.1 192h8.7c9.3 0 17.2-7.8 16.1-17z"] };
var faParagraph = { prefix: 'fas', iconName: 'paragraph', icon: [448, 512, [], "f1dd", "M408 32H177.531C88.948 32 16.045 103.335 16 191.918 15.956 280.321 87.607 352 176 352v104c0 13.255 10.745 24 24 24h32c13.255 0 24-10.745 24-24V112h32v344c0 13.255 10.745 24 24 24h32c13.255 0 24-10.745 24-24V112h40c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24z"] };
var faParking = { prefix: 'fas', iconName: 'parking', icon: [448, 512, [], "f540", "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM240 320h-48v48c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h96c52.9 0 96 43.1 96 96s-43.1 96-96 96zm0-128h-48v64h48c17.6 0 32-14.4 32-32s-14.4-32-32-32z"] };
var faPaste = { prefix: 'fas', iconName: 'paste', icon: [448, 512, [], "f0ea", "M128 184c0-30.879 25.122-56 56-56h136V56c0-13.255-10.745-24-24-24h-80.61C204.306 12.89 183.637 0 160 0s-44.306 12.89-55.39 32H24C10.745 32 0 42.745 0 56v336c0 13.255 10.745 24 24 24h104V184zm32-144c13.255 0 24 10.745 24 24s-10.745 24-24 24-24-10.745-24-24 10.745-24 24-24zm184 248h104v200c0 13.255-10.745 24-24 24H184c-13.255 0-24-10.745-24-24V184c0-13.255 10.745-24 24-24h136v104c0 13.2 10.8 24 24 24zm104-38.059V256h-96v-96h6.059a24 24 0 0 1 16.97 7.029l65.941 65.941a24.002 24.002 0 0 1 7.03 16.971z"] };
var faPause = { prefix: 'fas', iconName: 'pause', icon: [448, 512, [], "f04c", "M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"] };
var faPauseCircle = { prefix: 'fas', iconName: 'pause-circle', icon: [512, 512, [], "f28b", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"] };
var faPaw = { prefix: 'fas', iconName: 'paw', icon: [512, 512, [], "f1b0", "M85.231 330.958C36 330.958 0 273.792 0 231.5c0-28.292 16-58.042 49.538-58.042 49.231 0 85.231 57.458 85.231 99.75 0 28.292-15.692 57.75-49.538 57.75zm348 106.167c0 37.042-32 42.875-63.385 42.875-41.231 0-74.462-26.25-113.846-26.25-41.231 0-76.308 25.958-120.923 25.958-29.847 0-56.308-9.625-56.308-42.583C78.769 368 180.616 265.333 256 265.333s177.231 102.959 177.231 171.792zM182.462 203.792c-49.847 0-80-59.5-80-100.333C102.462 70.792 120.308 32 160 32c50.154 0 80 59.5 80 100.333 0 32.667-17.846 71.459-57.538 71.459zM272 132.333C272 91.5 301.846 32 352 32c39.692 0 57.539 38.792 57.539 71.458 0 40.833-30.154 100.333-80.001 100.333C289.846 203.792 272 165 272 132.333zM512 231.5c0 42.292-36 99.458-85.231 99.458-33.847 0-49.538-29.458-49.538-57.75 0-42.291 35.999-99.75 85.231-99.75C496 173.458 512 203.208 512 231.5z"] };
var faPenSquare = { prefix: 'fas', iconName: 'pen-square', icon: [448, 512, [], "f14b", "M400 480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zM238.1 177.9L102.4 313.6l-6.3 57.1c-.8 7.6 5.6 14.1 13.3 13.3l57.1-6.3L302.2 242c2.3-2.3 2.3-6.1 0-8.5L246.7 178c-2.5-2.4-6.3-2.4-8.6-.1zM345 165.1L314.9 135c-9.4-9.4-24.6-9.4-33.9 0l-23.1 23.1c-2.3 2.3-2.3 6.1 0 8.5l55.5 55.5c2.3 2.3 6.1 2.3 8.5 0L345 199c9.3-9.3 9.3-24.5 0-33.9z"] };
var faPencilAlt = { prefix: 'fas', iconName: 'pencil-alt', icon: [512, 512, [], "f303", "M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"] };
var faPeopleCarry = { prefix: 'fas', iconName: 'people-carry', icon: [640, 512, [], "f4ce", "M128 96c26.5 0 48-21.5 48-48S154.5 0 128 0 80 21.5 80 48s21.5 48 48 48zm384 0c26.5 0 48-21.5 48-48S538.5 0 512 0s-48 21.5-48 48 21.5 48 48 48zm125.7 372.1l-44-110-41.1 46.4-2 18.2 27.7 69.2c5 12.5 17 20.1 29.7 20.1 4 0 8-.7 11.9-2.3 16.4-6.6 24.4-25.2 17.8-41.6zm-34.2-209.8L585 178.1c-4.6-20-18.6-36.8-37.5-44.9-18.5-8-39-6.7-56.1 3.3-22.7 13.4-39.7 34.5-48.1 59.4L432 229.8 416 240v-96c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16v96l-16.1-10.2-11.3-33.9c-8.3-25-25.4-46-48.1-59.4-17.2-10-37.6-11.3-56.1-3.3-18.9 8.1-32.9 24.9-37.5 44.9l-18.4 80.2c-4.6 20 .7 41.2 14.4 56.7l67.2 75.9 10.1 92.6C130 499.8 143.8 512 160 512c1.2 0 2.3-.1 3.5-.2 17.6-1.9 30.2-17.7 28.3-35.3l-10.1-92.8c-1.5-13-6.9-25.1-15.6-35l-43.3-49 17.6-70.3 6.8 20.4c4.1 12.5 11.9 23.4 24.5 32.6l51.1 32.5c4.6 2.9 12.1 4.6 17.2 5h160c5.1-.4 12.6-2.1 17.2-5l51.1-32.5c12.6-9.2 20.4-20 24.5-32.6l6.8-20.4 17.6 70.3-43.3 49c-8.7 9.9-14.1 22-15.6 35l-10.1 92.8c-1.9 17.6 10.8 33.4 28.3 35.3 1.2.1 2.3.2 3.5.2 16.1 0 30-12.1 31.8-28.5l10.1-92.6 67.2-75.9c13.6-15.5 19-36.7 14.4-56.7zM46.3 358.1l-44 110c-6.6 16.4 1.4 35 17.8 41.6 16.8 6.6 35.1-1.7 41.6-17.8l27.7-69.2-2-18.2-41.1-46.4z"] };
var faPercent = { prefix: 'fas', iconName: 'percent', icon: [448, 512, [], "f295", "M112 224c61.9 0 112-50.1 112-112S173.9 0 112 0 0 50.1 0 112s50.1 112 112 112zm0-160c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zm224 224c-61.9 0-112 50.1-112 112s50.1 112 112 112 112-50.1 112-112-50.1-112-112-112zm0 160c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zM392.3.2l31.6-.1c19.4-.1 30.9 21.8 19.7 37.8L77.4 501.6a23.95 23.95 0 0 1-19.6 10.2l-33.4.1c-19.5 0-30.9-21.9-19.7-37.8l368-463.7C377.2 4 384.5.2 392.3.2z"] };
var faPercentage = { prefix: 'fas', iconName: 'percentage', icon: [384, 512, [], "f541", "M109.25 173.25c24.99-24.99 24.99-65.52 0-90.51-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 25 25 65.52 25 90.51 0zm256 165.49c-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 24.99 24.99 65.52 24.99 90.51 0 25-24.99 25-65.51 0-90.51zm-1.94-231.43l-22.62-22.62c-12.5-12.5-32.76-12.5-45.25 0L20.69 359.44c-12.5 12.5-12.5 32.76 0 45.25l22.62 22.62c12.5 12.5 32.76 12.5 45.25 0l274.75-274.75c12.5-12.49 12.5-32.75 0-45.25z"] };
var faPhone = { prefix: 'fas', iconName: 'phone', icon: [512, 512, [], "f095", "M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"] };
var faPhoneSlash = { prefix: 'fas', iconName: 'phone-slash', icon: [640, 512, [], "f3dd", "M268.2 381.4l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48c-10.7 4.6-16.5 16.1-13.9 27.5l24 104c2.5 10.8 12.1 18.6 23.4 18.6 100.7 0 193.7-32.4 269.7-86.9l-80-61.8c-10.9 6.5-22.1 12.7-33.6 18.1zm365.6 76.7L475.1 335.5C537.9 256.4 576 156.9 576 48c0-11.2-7.7-20.9-18.6-23.4l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-12.2 26.1-27.9 50.3-46 72.8L45.5 3.4C38.5-2 28.5-.8 23 6.2L3.4 31.4c-5.4 7-4.2 17 2.8 22.4l588.4 454.7c7 5.4 17 4.2 22.5-2.8l19.6-25.3c5.4-6.8 4.1-16.9-2.9-22.3z"] };
var faPhoneSquare = { prefix: 'fas', iconName: 'phone-square', icon: [448, 512, [], "f098", "M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM94 416c-7.033 0-13.057-4.873-14.616-11.627l-14.998-65a15 15 0 0 1 8.707-17.16l69.998-29.999a15 15 0 0 1 17.518 4.289l30.997 37.885c48.944-22.963 88.297-62.858 110.781-110.78l-37.886-30.997a15.001 15.001 0 0 1-4.289-17.518l30-69.998a15 15 0 0 1 17.16-8.707l65 14.998A14.997 14.997 0 0 1 384 126c0 160.292-129.945 290-290 290z"] };
var faPhoneVolume = { prefix: 'fas', iconName: 'phone-volume', icon: [384, 512, [], "f2a0", "M97.333 506.966c-129.874-129.874-129.681-340.252 0-469.933 5.698-5.698 14.527-6.632 21.263-2.422l64.817 40.513a17.187 17.187 0 0 1 6.849 20.958l-32.408 81.021a17.188 17.188 0 0 1-17.669 10.719l-55.81-5.58c-21.051 58.261-20.612 122.471 0 179.515l55.811-5.581a17.188 17.188 0 0 1 17.669 10.719l32.408 81.022a17.188 17.188 0 0 1-6.849 20.958l-64.817 40.513a17.19 17.19 0 0 1-21.264-2.422zM247.126 95.473c11.832 20.047 11.832 45.008 0 65.055-3.95 6.693-13.108 7.959-18.718 2.581l-5.975-5.726c-3.911-3.748-4.793-9.622-2.261-14.41a32.063 32.063 0 0 0 0-29.945c-2.533-4.788-1.65-10.662 2.261-14.41l5.975-5.726c5.61-5.378 14.768-4.112 18.718 2.581zm91.787-91.187c60.14 71.604 60.092 175.882 0 247.428-4.474 5.327-12.53 5.746-17.552.933l-5.798-5.557c-4.56-4.371-4.977-11.529-.93-16.379 49.687-59.538 49.646-145.933 0-205.422-4.047-4.85-3.631-12.008.93-16.379l5.798-5.557c5.022-4.813 13.078-4.394 17.552.933zm-45.972 44.941c36.05 46.322 36.108 111.149 0 157.546-4.39 5.641-12.697 6.251-17.856 1.304l-5.818-5.579c-4.4-4.219-4.998-11.095-1.285-15.931 26.536-34.564 26.534-82.572 0-117.134-3.713-4.836-3.115-11.711 1.285-15.931l5.818-5.579c5.159-4.947 13.466-4.337 17.856 1.304z"] };
var faPiggyBank = { prefix: 'fas', iconName: 'piggy-bank', icon: [576, 512, [], "f4d3", "M560 224h-29.5c-8.8-20-21.6-37.7-37.4-52.5L512 96h-32c-29.4 0-55.4 13.5-73 34.3-7.6-1.1-15.1-2.3-23-2.3H256c-77.4 0-141.9 55-156.8 128H56c-14.8 0-26.5-13.5-23.5-28.8C34.7 215.8 45.4 208 57 208h1c3.3 0 6-2.7 6-6v-20c0-3.3-2.7-6-6-6-28.5 0-53.9 20.4-57.5 48.6C-3.9 258.8 22.7 288 56 288h40c0 52.2 25.4 98.1 64 127.3V496c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16v-48h128v48c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16v-80.7c11.8-8.9 22.3-19.4 31.3-31.3H560c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16zm-128 64c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM256 96h128c5.4 0 10.7.4 15.9.8 0-.3.1-.5.1-.8 0-53-43-96-96-96s-96 43-96 96c0 2.1.5 4.1.6 6.2 15.2-3.9 31-6.2 47.4-6.2z"] };
var faPills = { prefix: 'fas', iconName: 'pills', icon: [576, 512, [], "f484", "M112 32C50.1 32 0 82.1 0 144v224c0 61.9 50.1 112 112 112s112-50.1 112-112V144c0-61.9-50.1-112-112-112zm48 224H64V144c0-26.5 21.5-48 48-48s48 21.5 48 48v112zm139.7-29.7c-3.5-3.5-9.4-3.1-12.3.8-45.3 62.5-40.4 150.1 15.9 206.4 56.3 56.3 143.9 61.2 206.4 15.9 4-2.9 4.3-8.8.8-12.3L299.7 226.3zm229.8-19c-56.3-56.3-143.9-61.2-206.4-15.9-4 2.9-4.3 8.8-.8 12.3l210.8 210.8c3.5 3.5 9.4 3.1 12.3-.8 45.3-62.6 40.5-150.1-15.9-206.4z"] };
var faPlane = { prefix: 'fas', iconName: 'plane', icon: [576, 512, [], "f072", "M480 192H365.71L260.61 8.06A16.014 16.014 0 0 0 246.71 0h-65.5c-10.63 0-18.3 10.17-15.38 20.39L214.86 192H112l-43.2-57.6c-3.02-4.03-7.77-6.4-12.8-6.4H16.01C5.6 128-2.04 137.78.49 147.88L32 256 .49 364.12C-2.04 374.22 5.6 384 16.01 384H56c5.04 0 9.78-2.37 12.8-6.4L112 320h102.86l-49.03 171.6c-2.92 10.22 4.75 20.4 15.38 20.4h65.5c5.74 0 11.04-3.08 13.89-8.06L365.71 320H480c35.35 0 96-28.65 96-64s-60.65-64-96-64z"] };
var faPlay = { prefix: 'fas', iconName: 'play', icon: [448, 512, [], "f04b", "M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"] };
var faPlayCircle = { prefix: 'fas', iconName: 'play-circle', icon: [512, 512, [], "f144", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"] };
var faPlug = { prefix: 'fas', iconName: 'plug', icon: [384, 512, [], "f1e6", "M256 144V32c0-17.673 14.327-32 32-32s32 14.327 32 32v112h-64zm112 16H16c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h16v32c0 77.406 54.969 141.971 128 156.796V512h64v-99.204c73.031-14.825 128-79.39 128-156.796v-32h16c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16zm-240-16V32c0-17.673-14.327-32-32-32S64 14.327 64 32v112h64z"] };
var faPlus = { prefix: 'fas', iconName: 'plus', icon: [448, 512, [], "f067", "M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"] };
var faPlusCircle = { prefix: 'fas', iconName: 'plus-circle', icon: [512, 512, [], "f055", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"] };
var faPlusSquare = { prefix: 'fas', iconName: 'plus-square', icon: [448, 512, [], "f0fe", "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"] };
var faPodcast = { prefix: 'fas', iconName: 'podcast', icon: [448, 512, [], "f2ce", "M267.429 488.563C262.286 507.573 242.858 512 224 512c-18.857 0-38.286-4.427-43.428-23.437C172.927 460.134 160 388.898 160 355.75c0-35.156 31.142-43.75 64-43.75s64 8.594 64 43.75c0 32.949-12.871 104.179-20.571 132.813zM156.867 288.554c-18.693-18.308-29.958-44.173-28.784-72.599 2.054-49.724 42.395-89.956 92.124-91.881C274.862 121.958 320 165.807 320 220c0 26.827-11.064 51.116-28.866 68.552-2.675 2.62-2.401 6.986.628 9.187 9.312 6.765 16.46 15.343 21.234 25.363 1.741 3.654 6.497 4.66 9.449 1.891 28.826-27.043 46.553-65.783 45.511-108.565-1.855-76.206-63.595-138.208-139.793-140.369C146.869 73.753 80 139.215 80 220c0 41.361 17.532 78.7 45.55 104.989 2.953 2.771 7.711 1.77 9.453-1.887 4.774-10.021 11.923-18.598 21.235-25.363 3.029-2.2 3.304-6.566.629-9.185zM224 0C100.204 0 0 100.185 0 224c0 89.992 52.602 165.647 125.739 201.408 4.333 2.118 9.267-1.544 8.535-6.31-2.382-15.512-4.342-30.946-5.406-44.339-.146-1.836-1.149-3.486-2.678-4.512-47.4-31.806-78.564-86.016-78.187-147.347.592-96.237 79.29-174.648 175.529-174.899C320.793 47.747 400 126.797 400 224c0 61.932-32.158 116.49-80.65 147.867-.999 14.037-3.069 30.588-5.624 47.23-.732 4.767 4.203 8.429 8.535 6.31C395.227 389.727 448 314.187 448 224 448 100.205 347.815 0 224 0zm0 160c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64z"] };
var faPoo = { prefix: 'fas', iconName: 'poo', icon: [512, 512, [], "f2fe", "M451.4 369.1C468.7 356 480 335.4 480 312c0-39.8-32.2-72-72-72h-14.1c13.4-11.7 22.1-28.8 22.1-48 0-35.3-28.7-64-64-64h-5.9c3.6-10.1 5.9-20.7 5.9-32 0-53-43-96-96-96-5.2 0-10.2.7-15.1 1.5C250.3 14.6 256 30.6 256 48c0 44.2-35.8 80-80 80h-16c-35.3 0-64 28.7-64 64 0 19.2 8.7 36.3 22.1 48H104c-39.8 0-72 32.2-72 72 0 23.4 11.3 44 28.6 57.1C26.3 374.6 0 404.1 0 440c0 39.8 32.2 72 72 72h368c39.8 0 72-32.2 72-72 0-35.9-26.3-65.4-60.6-70.9zM192 256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm159.5 139C341 422.9 293 448 256 448s-85-25.1-95.5-53c-2-5.3 2-11 7.8-11h175.4c5.8 0 9.8 5.7 7.8 11zM320 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"] };
var faPortrait = { prefix: 'fas', iconName: 'portrait', icon: [384, 512, [], "f3e0", "M336 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM192 128c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H102.4C90 384 80 375.4 80 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2z"] };
var faPoundSign = { prefix: 'fas', iconName: 'pound-sign', icon: [320, 512, [], "f154", "M308 352h-45.495c-6.627 0-12 5.373-12 12v50.848H128V288h84c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-84v-63.556c0-32.266 24.562-57.086 61.792-57.086 23.658 0 45.878 11.505 57.652 18.849 5.151 3.213 11.888 2.051 15.688-2.685l28.493-35.513c4.233-5.276 3.279-13.005-2.119-17.081C273.124 54.56 236.576 32 187.931 32 106.026 32 48 84.742 48 157.961V224H20c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h28v128H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h296c6.627 0 12-5.373 12-12V364c0-6.627-5.373-12-12-12z"] };
var faPowerOff = { prefix: 'fas', iconName: 'power-off', icon: [512, 512, [], "f011", "M400 54.1c63 45 104 118.6 104 201.9 0 136.8-110.8 247.7-247.5 248C120 504.3 8.2 393 8 256.4 7.9 173.1 48.9 99.3 111.8 54.2c11.7-8.3 28-4.8 35 7.7L162.6 90c5.9 10.5 3.1 23.8-6.6 31-41.5 30.8-68 79.6-68 134.9-.1 92.3 74.5 168.1 168 168.1 91.6 0 168.6-74.2 168-169.1-.3-51.8-24.7-101.8-68.1-134-9.7-7.2-12.4-20.5-6.5-30.9l15.8-28.1c7-12.4 23.2-16.1 34.8-7.8zM296 264V24c0-13.3-10.7-24-24-24h-32c-13.3 0-24 10.7-24 24v240c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24z"] };
var faPrescriptionBottle = { prefix: 'fas', iconName: 'prescription-bottle', icon: [384, 512, [], "f485", "M32 192h120c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H32v64h120c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H32v64h120c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H32v64c0 17.6 14.4 32 32 32h256c17.6 0 32-14.4 32-32V128H32v64zM360 0H24C10.8 0 0 10.8 0 24v48c0 13.2 10.8 24 24 24h336c13.2 0 24-10.8 24-24V24c0-13.2-10.8-24-24-24z"] };
var faPrescriptionBottleAlt = { prefix: 'fas', iconName: 'prescription-bottle-alt', icon: [384, 512, [], "f486", "M360 0H24C10.8 0 0 10.8 0 24v48c0 13.2 10.8 24 24 24h336c13.2 0 24-10.8 24-24V24c0-13.2-10.8-24-24-24zM32 480c0 17.6 14.4 32 32 32h256c17.6 0 32-14.4 32-32V128H32v352zm64-184c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48z"] };
var faPrint = { prefix: 'fas', iconName: 'print', icon: [512, 512, [], "f02f", "M464 192h-16V81.941a24 24 0 0 0-7.029-16.97L383.029 7.029A24 24 0 0 0 366.059 0H88C74.745 0 64 10.745 64 24v168H48c-26.51 0-48 21.49-48 48v132c0 6.627 5.373 12 12 12h52v104c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V384h52c6.627 0 12-5.373 12-12V240c0-26.51-21.49-48-48-48zm-80 256H128v-96h256v96zM128 224V64h192v40c0 13.2 10.8 24 24 24h40v96H128zm304 72c-13.254 0-24-10.746-24-24s10.746-24 24-24 24 10.746 24 24-10.746 24-24 24z"] };
var faProcedures = { prefix: 'fas', iconName: 'procedures', icon: [640, 512, [], "f487", "M528 224H272c-8.8 0-16 7.2-16 16v144H64V144c0-8.8-7.2-16-16-16H16c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48h512v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V336c0-61.9-50.1-112-112-112zM136 96h126.1l27.6 55.2c5.9 11.8 22.7 11.8 28.6 0L368 51.8 390.1 96H512c8.8 0 16-7.2 16-16s-7.2-16-16-16H409.9L382.3 8.8C376.4-3 359.6-3 353.7 8.8L304 108.2l-19.9-39.8c-1.4-2.7-4.1-4.4-7.2-4.4H136c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm24 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64z"] };
var faProjectDiagram = { prefix: 'fas', iconName: 'project-diagram', icon: [640, 512, [], "f542", "M384 320H256c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32zM192 32c0-17.67-14.33-32-32-32H32C14.33 0 0 14.33 0 32v128c0 17.67 14.33 32 32 32h95.72l73.16 128.04C211.98 300.98 232.4 288 256 288h.28L192 175.51V128h224V64H192V32zM608 0H480c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32z"] };
var faPuzzlePiece = { prefix: 'fas', iconName: 'puzzle-piece', icon: [576, 512, [], "f12e", "M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z"] };
var faQrcode = { prefix: 'fas', iconName: 'qrcode', icon: [448, 512, [], "f029", "M0 224h192V32H0v192zM64 96h64v64H64V96zm192-64v192h192V32H256zm128 128h-64V96h64v64zM0 480h192V288H0v192zm64-128h64v64H64v-64zm352-64h32v128h-96v-32h-32v96h-64V288h96v32h64v-32zm0 160h32v32h-32v-32zm-64 0h32v32h-32v-32z"] };
var faQuestion = { prefix: 'fas', iconName: 'question', icon: [384, 512, [], "f128", "M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"] };
var faQuestionCircle = { prefix: 'fas', iconName: 'question-circle', icon: [512, 512, [], "f059", "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"] };
var faQuidditch = { prefix: 'fas', iconName: 'quidditch', icon: [640, 512, [], "f458", "M256.5 216.8L343.2 326s-16.6 102.4-76.6 150.1C206.7 523.8 0 510.2 0 510.2s3.8-23.1 11-55.4l94.6-112.2c4-4.7-.9-11.6-6.6-9.5l-60.4 22.1c14.4-41.7 32.7-80 54.6-97.5 59.9-47.8 163.3-40.9 163.3-40.9zm238 135c-44 0-79.8 35.8-79.8 79.9 0 44.1 35.7 79.9 79.8 79.9 44.1 0 79.8-35.8 79.8-79.9 0-44.2-35.8-79.9-79.8-79.9zM636.5 31L616.7 6c-5.5-6.9-15.5-8-22.4-2.6L361.8 181.3l-34.1-43c-5.1-6.4-15.1-5.2-18.6 2.2l-25.3 54.6 86.7 109.2 58.8-12.4c8-1.7 11.4-11.2 6.3-17.6l-34.1-42.9L634 53.5c6.9-5.5 8-15.6 2.5-22.5z"] };
var faQuoteLeft = { prefix: 'fas', iconName: 'quote-left', icon: [512, 512, [], "f10d", "M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"] };
var faQuoteRight = { prefix: 'fas', iconName: 'quote-right', icon: [512, 512, [], "f10e", "M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"] };
var faRandom = { prefix: 'fas', iconName: 'random', icon: [512, 512, [], "f074", "M504.971 359.029c9.373 9.373 9.373 24.569 0 33.941l-80 79.984c-15.01 15.01-40.971 4.49-40.971-16.971V416h-58.785a12.004 12.004 0 0 1-8.773-3.812l-70.556-75.596 53.333-57.143L352 336h32v-39.981c0-21.438 25.943-31.998 40.971-16.971l80 79.981zM12 176h84l52.781 56.551 53.333-57.143-70.556-75.596A11.999 11.999 0 0 0 122.785 96H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12zm372 0v39.984c0 21.46 25.961 31.98 40.971 16.971l80-79.984c9.373-9.373 9.373-24.569 0-33.941l-80-79.981C409.943 24.021 384 34.582 384 56.019V96h-58.785a12.004 12.004 0 0 0-8.773 3.812L96 336H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h110.785c3.326 0 6.503-1.381 8.773-3.812L352 176h32z"] };
var faReceipt = { prefix: 'fas', iconName: 'receipt', icon: [384, 512, [], "f543", "M358.4 3.2L320 48 265.6 3.2a15.9 15.9 0 0 0-19.2 0L192 48 137.6 3.2a15.9 15.9 0 0 0-19.2 0L64 48 25.6 3.2C15-4.7 0 2.8 0 16v480c0 13.2 15 20.7 25.6 12.8L64 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L192 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L320 464l38.4 44.8c10.5 7.9 25.6.4 25.6-12.8V16c0-13.2-15-20.7-25.6-12.8zM320 360c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16z"] };
var faRecycle = { prefix: 'fas', iconName: 'recycle', icon: [512, 512, [], "f1b8", "M184.561 261.903c3.232 13.997-12.123 24.635-24.068 17.168l-40.736-25.455-50.867 81.402C55.606 356.273 70.96 384 96.012 384H148c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12H96.115c-75.334 0-121.302-83.048-81.408-146.88l50.822-81.388-40.725-25.448c-12.081-7.547-8.966-25.961 4.879-29.158l110.237-25.45c8.611-1.988 17.201 3.381 19.189 11.99l25.452 110.237zm98.561-182.915l41.289 66.076-40.74 25.457c-12.051 7.528-9 25.953 4.879 29.158l110.237 25.45c8.672 1.999 17.215-3.438 19.189-11.99l25.45-110.237c3.197-13.844-11.99-24.719-24.068-17.168l-40.687 25.424-41.263-66.082c-37.521-60.033-125.209-60.171-162.816 0l-17.963 28.766c-3.51 5.62-1.8 13.021 3.82 16.533l33.919 21.195c5.62 3.512 13.024 1.803 16.536-3.817l17.961-28.743c12.712-20.341 41.973-19.676 54.257-.022zM497.288 301.12l-27.515-44.065c-3.511-5.623-10.916-7.334-16.538-3.821l-33.861 21.159c-5.62 3.512-7.33 10.915-3.818 16.536l27.564 44.112c13.257 21.211-2.057 48.96-27.136 48.96H320V336.02c0-14.213-17.242-21.383-27.313-11.313l-80 79.981c-6.249 6.248-6.249 16.379 0 22.627l80 79.989C302.689 517.308 320 510.3 320 495.989V448h95.88c75.274 0 121.335-82.997 81.408-146.88z"] };
var faRedo = { prefix: 'fas', iconName: 'redo', icon: [512, 512, [], "f01e", "M500.333 0h-47.411c-6.853 0-12.314 5.729-11.986 12.574l3.966 82.759C399.416 41.899 331.672 8 256.001 8 119.34 8 7.899 119.526 8 256.187 8.101 393.068 119.096 504 256 504c63.926 0 122.202-24.187 166.178-63.908 5.113-4.618 5.354-12.561.482-17.433l-33.971-33.971c-4.466-4.466-11.64-4.717-16.38-.543C341.308 415.448 300.606 432 256 432c-97.267 0-176-78.716-176-176 0-97.267 78.716-176 176-176 60.892 0 114.506 30.858 146.099 77.8l-101.525-4.865c-6.845-.328-12.574 5.133-12.574 11.986v47.411c0 6.627 5.373 12 12 12h200.333c6.627 0 12-5.373 12-12V12c0-6.627-5.373-12-12-12z"] };
var faRedoAlt = { prefix: 'fas', iconName: 'redo-alt', icon: [512, 512, [], "f2f9", "M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"] };
var faRegistered = { prefix: 'fas', iconName: 'registered', icon: [512, 512, [], "f25d", "M285.363 207.475c0 18.6-9.831 28.431-28.431 28.431h-29.876v-56.14h23.378c28.668 0 34.929 8.773 34.929 27.709zM504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM363.411 360.414c-46.729-84.825-43.299-78.636-44.702-80.98 23.432-15.172 37.945-42.979 37.945-74.486 0-54.244-31.5-89.252-105.498-89.252h-70.667c-13.255 0-24 10.745-24 24V372c0 13.255 10.745 24 24 24h22.567c13.255 0 24-10.745 24-24v-71.663h25.556l44.129 82.937a24.001 24.001 0 0 0 21.188 12.727h24.464c18.261-.001 29.829-19.591 21.018-35.587z"] };
var faReply = { prefix: 'fas', iconName: 'reply', icon: [512, 512, [], "f3e5", "M8.309 189.836L184.313 37.851C199.719 24.546 224 35.347 224 56.015v80.053c160.629 1.839 288 34.032 288 186.258 0 61.441-39.581 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 45.344-145.012-21.507-183.51-176.59-185.742V360c0 20.7-24.3 31.453-39.687 18.164l-176.004-152c-11.071-9.562-11.086-26.753 0-36.328z"] };
var faReplyAll = { prefix: 'fas', iconName: 'reply-all', icon: [576, 512, [], "f122", "M136.309 189.836L312.313 37.851C327.72 24.546 352 35.348 352 56.015v82.763c129.182 10.231 224 52.212 224 183.548 0 61.441-39.582 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 38.512-123.162-3.922-169.482-112.59-182.015v84.175c0 20.701-24.3 31.453-39.687 18.164L136.309 226.164c-11.071-9.561-11.086-26.753 0-36.328zm-128 36.328L184.313 378.15C199.7 391.439 224 380.687 224 359.986v-15.818l-108.606-93.785A55.96 55.96 0 0 1 96 207.998a55.953 55.953 0 0 1 19.393-42.38L224 71.832V56.015c0-20.667-24.28-31.469-39.687-18.164L8.309 189.836c-11.086 9.575-11.071 26.767 0 36.328z"] };
var faRetweet = { prefix: 'fas', iconName: 'retweet', icon: [640, 512, [], "f079", "M629.657 343.598L528.971 444.284c-9.373 9.372-24.568 9.372-33.941 0L394.343 343.598c-9.373-9.373-9.373-24.569 0-33.941l10.823-10.823c9.562-9.562 25.133-9.34 34.419.492L480 342.118V160H292.451a24.005 24.005 0 0 1-16.971-7.029l-16-16C244.361 121.851 255.069 96 276.451 96H520c13.255 0 24 10.745 24 24v222.118l40.416-42.792c9.285-9.831 24.856-10.054 34.419-.492l10.823 10.823c9.372 9.372 9.372 24.569-.001 33.941zm-265.138 15.431A23.999 23.999 0 0 0 347.548 352H160V169.881l40.416 42.792c9.286 9.831 24.856 10.054 34.419.491l10.822-10.822c9.373-9.373 9.373-24.569 0-33.941L144.971 67.716c-9.373-9.373-24.569-9.373-33.941 0L10.343 168.402c-9.373 9.373-9.373 24.569 0 33.941l10.822 10.822c9.562 9.562 25.133 9.34 34.419-.491L96 169.881V392c0 13.255 10.745 24 24 24h243.549c21.382 0 32.09-25.851 16.971-40.971l-16.001-16z"] };
var faRibbon = { prefix: 'fas', iconName: 'ribbon', icon: [448, 512, [], "f4d6", "M6.1 444.3c-9.6 10.8-7.5 27.6 4.5 35.7l68.8 27.9c9.9 6.7 23.3 5 31.3-3.8l91.8-101.9-79.2-87.9-117.2 130zm435.8 0s-292-324.6-295.4-330.1c15.4-8.4 40.2-17.9 77.5-17.9s62.1 9.5 77.5 17.9c-3.3 5.6-56 64.6-56 64.6l79.1 87.7 34.2-38c28.7-31.9 33.3-78.6 11.4-115.5l-43.7-73.5c-4.3-7.2-9.9-13.3-16.8-18-40.7-27.6-127.4-29.7-171.4 0-6.9 4.7-12.5 10.8-16.8 18l-43.6 73.2c-1.5 2.5-37.1 62.2 11.5 116L337.5 504c8 8.9 21.4 10.5 31.3 3.8l68.8-27.9c11.9-8 14-24.8 4.3-35.6z"] };
var faRoad = { prefix: 'fas', iconName: 'road', icon: [576, 512, [], "f018", "M567.3 383.6L429.9 78.2C426 69.5 417.4 64 408 64h-96.1l1.9 18.8c.7 7.1-4.8 13.2-11.9 13.2H274c-7.1 0-12.7-6.2-11.9-13.2L264 64h-96c-9.4 0-18 5.5-21.9 14.2L8.7 383.6C3.2 395.8 0 409.6 0 424c0 13.3 10.7 24 24 24h213.6c-7.1 0-12.7-6.2-11.9-13.2l10.8-104c.6-6.1 5.8-10.8 11.9-10.8h79.2c6.1 0 11.3 4.6 11.9 10.8l10.8 104c.7 7.1-4.8 13.2-11.9 13.2H552c13.2 0 24-10.7 24-24 0-13.9-3-27.7-8.7-40.4zM254.7 154.8l3.3-32c.6-6.1 5.8-10.8 11.9-10.8h36.2c6.1 0 11.3 4.6 11.9 10.8l3.3 32c.7 7.1-4.8 13.2-11.9 13.2h-42.8c-7.1 0-12.7-6.2-11.9-13.2zM321.8 288h-67.6c-7.1 0-12.7-6.2-11.9-13.2l7.4-72c.6-6.1 5.8-10.8 11.9-10.8h52.7c6.1 0 11.3 4.6 11.9 10.8l7.4 72c.9 7-4.7 13.2-11.8 13.2z"] };
var faRobot = { prefix: 'fas', iconName: 'robot', icon: [640, 512, [], "f544", "M0 256v128c0 17.7 14.3 32 32 32h32V224H32c-17.7 0-32 14.3-32 32zM464 96H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H176c-44.2 0-80 35.8-80 80v272c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V176c0-44.2-35.8-80-80-80zM256 416h-64v-32h64v32zm-32-120c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm128 120h-64v-32h64v32zm96 0h-64v-32h64v32zm-32-120c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm192-72h-32v192h32c17.7 0 32-14.3 32-32V256c0-17.7-14.3-32-32-32z"] };
var faRocket = { prefix: 'fas', iconName: 'rocket', icon: [512, 512, [], "f135", "M505.1 19.1C503.8 13 499 8.2 492.9 6.9 460.7 0 435.5 0 410.4 0 307.2 0 245.3 55.2 199.1 128H94.9c-18.2 0-34.8 10.3-42.9 26.5L2.6 253.3c-8 16 3.6 34.7 21.5 34.7h95.1c-5.9 12.8-11.9 25.5-18 37.7-3.1 6.2-1.9 13.6 3 18.5l63.6 63.6c4.9 4.9 12.3 6.1 18.5 3 12.2-6.1 24.9-12 37.7-17.9V488c0 17.8 18.8 29.4 34.7 21.5l98.7-49.4c16.3-8.1 26.5-24.8 26.5-42.9V312.8c72.6-46.3 128-108.4 128-211.1.1-25.2.1-50.4-6.8-82.6zM400 160c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"] };
var faRss = { prefix: 'fas', iconName: 'rss', icon: [448, 512, [], "f09e", "M128.081 415.959c0 35.369-28.672 64.041-64.041 64.041S0 451.328 0 415.959s28.672-64.041 64.041-64.041 64.04 28.673 64.04 64.041zm175.66 47.25c-8.354-154.6-132.185-278.587-286.95-286.95C7.656 175.765 0 183.105 0 192.253v48.069c0 8.415 6.49 15.472 14.887 16.018 111.832 7.284 201.473 96.702 208.772 208.772.547 8.397 7.604 14.887 16.018 14.887h48.069c9.149.001 16.489-7.655 15.995-16.79zm144.249.288C439.596 229.677 251.465 40.445 16.503 32.01 7.473 31.686 0 38.981 0 48.016v48.068c0 8.625 6.835 15.645 15.453 15.999 191.179 7.839 344.627 161.316 352.465 352.465.353 8.618 7.373 15.453 15.999 15.453h48.068c9.034-.001 16.329-7.474 16.005-16.504z"] };
var faRssSquare = { prefix: 'fas', iconName: 'rss-square', icon: [448, 512, [], "f143", "M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM112 416c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm157.533 0h-34.335c-6.011 0-11.051-4.636-11.442-10.634-5.214-80.05-69.243-143.92-149.123-149.123-5.997-.39-10.633-5.431-10.633-11.441v-34.335c0-6.535 5.468-11.777 11.994-11.425 110.546 5.974 198.997 94.536 204.964 204.964.352 6.526-4.89 11.994-11.425 11.994zm103.027 0h-34.334c-6.161 0-11.175-4.882-11.427-11.038-5.598-136.535-115.204-246.161-251.76-251.76C68.882 152.949 64 147.935 64 141.774V107.44c0-6.454 5.338-11.664 11.787-11.432 167.83 6.025 302.21 141.191 308.205 308.205.232 6.449-4.978 11.787-11.432 11.787z"] };
var faRubleSign = { prefix: 'fas', iconName: 'ruble-sign', icon: [384, 512, [], "f158", "M239.36 320C324.48 320 384 260.542 384 175.071S324.48 32 239.36 32H76c-6.627 0-12 5.373-12 12v206.632H12c-6.627 0-12 5.373-12 12V308c0 6.627 5.373 12 12 12h52v32H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h52v52c0 6.627 5.373 12 12 12h58.56c6.627 0 12-5.373 12-12v-52H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H146.56v-32h92.8zm-92.8-219.252h78.72c46.72 0 74.88 29.11 74.88 74.323 0 45.832-28.16 75.561-76.16 75.561h-77.44V100.748z"] };
var faRuler = { prefix: 'fas', iconName: 'ruler', icon: [640, 512, [], "f545", "M635.7 167.2L556.1 31.7c-8.8-15-28.3-20.1-43.5-11.5l-69 39.1L503.3 161c2.2 3.8.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9L416 75l-55.2 31.3 27.9 47.4c2.2 3.8.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9L333.2 122 278 153.3 337.8 255c2.2 3.7.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9l-59.7-101.7-55.2 31.3 27.9 47.4c2.2 3.8.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9l-27.9-47.5-55.2 31.3 59.7 101.7c2.2 3.7.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9L84.9 262.9l-69 39.1C.7 310.7-4.6 329.8 4.2 344.8l79.6 135.6c8.8 15 28.3 20.1 43.5 11.5L624.1 210c15.2-8.6 20.4-27.8 11.6-42.8z"] };
var faRulerCombined = { prefix: 'fas', iconName: 'ruler-combined', icon: [512, 512, [], "f546", "M160 288h-56c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h56v-64h-56c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h56V96h-56c-4.42 0-8-3.58-8-8V72c0-4.42 3.58-8 8-8h56V32c0-17.67-14.33-32-32-32H32C14.33 0 0 14.33 0 32v448c0 2.77.91 5.24 1.57 7.8L160 329.38V288zm320 64h-32v56c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-56h-64v56c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-56h-64v56c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-56h-41.37L24.2 510.43c2.56.66 5.04 1.57 7.8 1.57h448c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32z"] };
var faRulerHorizontal = { prefix: 'fas', iconName: 'ruler-horizontal', icon: [576, 512, [], "f547", "M544 128h-48v88c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-88h-64v88c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-88h-64v88c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-88h-64v88c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-88h-64v88c0 4.42-3.58 8-8 8H88c-4.42 0-8-3.58-8-8v-88H32c-17.67 0-32 14.33-32 32v192c0 17.67 14.33 32 32 32h512c17.67 0 32-14.33 32-32V160c0-17.67-14.33-32-32-32z"] };
var faRulerVertical = { prefix: 'fas', iconName: 'ruler-vertical', icon: [256, 512, [], "f548", "M168 416c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h88v-64h-88c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h88v-64h-88c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h88v-64h-88c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h88V32c0-17.67-14.33-32-32-32H32C14.33 0 0 14.33 0 32v448c0 17.67 14.33 32 32 32h192c17.67 0 32-14.33 32-32v-64h-88z"] };
var faRupeeSign = { prefix: 'fas', iconName: 'rupee-sign', icon: [320, 512, [], "f156", "M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"] };
var faSave = { prefix: 'fas', iconName: 'save', icon: [448, 512, [], "f0c7", "M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"] };
var faSchool = { prefix: 'fas', iconName: 'school', icon: [640, 512, [], "f549", "M0 224v272c0 8.84 7.16 16 16 16h80V192H32c-17.67 0-32 14.33-32 32zm360-48h-24v-40c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v64c0 4.42 3.58 8 8 8h48c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8zm137.75-63.96l-160-106.67a32.02 32.02 0 0 0-35.5 0l-160 106.67A32.002 32.002 0 0 0 128 138.66V512h128V368c0-8.84 7.16-16 16-16h96c8.84 0 16 7.16 16 16v144h128V138.67c0-10.7-5.35-20.7-14.25-26.63zM320 256c-44.18 0-80-35.82-80-80s35.82-80 80-80 80 35.82 80 80-35.82 80-80 80zm288-64h-64v320h80c8.84 0 16-7.16 16-16V224c0-17.67-14.33-32-32-32z"] };
var faScrewdriver = { prefix: 'fas', iconName: 'screwdriver', icon: [512, 512, [], "f54a", "M448 0L320 96v62.06l-83.03 83.03c6.79 4.25 13.27 9.06 19.07 14.87 5.8 5.8 10.62 12.28 14.87 19.07L353.94 192H416l96-128-64-64zM128 278.59L10.92 395.67c-14.55 14.55-14.55 38.15 0 52.71l52.7 52.7c14.56 14.56 38.15 14.56 52.71 0L233.41 384c29.11-29.11 29.11-76.3 0-105.41s-76.3-29.11-105.41 0z"] };
var faSearch = { prefix: 'fas', iconName: 'search', icon: [512, 512, [], "f002", "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"] };
var faSearchMinus = { prefix: 'fas', iconName: 'search-minus', icon: [512, 512, [], "f010", "M304 192v32c0 6.6-5.4 12-12 12H124c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z"] };
var faSearchPlus = { prefix: 'fas', iconName: 'search-plus', icon: [512, 512, [], "f00e", "M304 192v32c0 6.6-5.4 12-12 12h-56v56c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-56h-56c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h56v-56c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v56h56c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z"] };
var faSeedling = { prefix: 'fas', iconName: 'seedling', icon: [512, 512, [], "f4d8", "M64 96H0c0 123.7 100.3 224 224 224v144c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320C288 196.3 187.7 96 64 96zm384-64c-84.2 0-157.4 46.5-195.7 115.2 27.7 30.2 48.2 66.9 59 107.6C424 243.1 512 147.9 512 32h-64z"] };
var faServer = { prefix: 'fas', iconName: 'server', icon: [512, 512, [], "f233", "M480 160H32c-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z"] };
var faShare = { prefix: 'fas', iconName: 'share', icon: [512, 512, [], "f064", "M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"] };
var faShareAlt = { prefix: 'fas', iconName: 'share-alt', icon: [448, 512, [], "f1e0", "M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"] };
var faShareAltSquare = { prefix: 'fas', iconName: 'share-alt-square', icon: [448, 512, [], "f1e1", "M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zM304 296c-14.562 0-27.823 5.561-37.783 14.671l-67.958-40.775a56.339 56.339 0 0 0 0-27.793l67.958-40.775C276.177 210.439 289.438 216 304 216c30.928 0 56-25.072 56-56s-25.072-56-56-56-56 25.072-56 56c0 4.797.605 9.453 1.74 13.897l-67.958 40.775C171.823 205.561 158.562 200 144 200c-30.928 0-56 25.072-56 56s25.072 56 56 56c14.562 0 27.823-5.561 37.783-14.671l67.958 40.775a56.088 56.088 0 0 0-1.74 13.897c0 30.928 25.072 56 56 56s56-25.072 56-56C360 321.072 334.928 296 304 296z"] };
var faShareSquare = { prefix: 'fas', iconName: 'share-square', icon: [576, 512, [], "f14d", "M568.482 177.448L424.479 313.433C409.3 327.768 384 317.14 384 295.985v-71.963c-144.575.97-205.566 35.113-164.775 171.353 4.483 14.973-12.846 26.567-25.006 17.33C155.252 383.105 120 326.488 120 269.339c0-143.937 117.599-172.5 264-173.312V24.012c0-21.174 25.317-31.768 40.479-17.448l144.003 135.988c10.02 9.463 10.028 25.425 0 34.896zM384 379.128V448H64V128h50.916a11.99 11.99 0 0 0 8.648-3.693c14.953-15.568 32.237-27.89 51.014-37.676C185.708 80.83 181.584 64 169.033 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-88.806c0-8.288-8.197-14.066-16.011-11.302a71.83 71.83 0 0 1-34.189 3.377c-7.27-1.046-13.8 4.514-13.8 11.859z"] };
var faShekelSign = { prefix: 'fas', iconName: 'shekel-sign', icon: [448, 512, [], "f20b", "M248 168v168c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16V168c0-75.11-60.89-136-136-136H24C10.75 32 0 42.74 0 56v408c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16V112h112c30.93 0 56 25.07 56 56zM432 32h-48c-8.84 0-16 7.16-16 16v296c0 30.93-25.07 56-56 56H200V176c0-8.84-7.16-16-16-16h-48c-8.84 0-16 7.16-16 16v280c0 13.25 10.75 24 24 24h168c75.11 0 136-60.89 136-136V48c0-8.84-7.16-16-16-16z"] };
var faShieldAlt = { prefix: 'fas', iconName: 'shield-alt', icon: [512, 512, [], "f3ed", "M496 128c0 221.282-135.934 344.645-221.539 380.308a48 48 0 0 1-36.923 0C130.495 463.713 16 326.487 16 128a48 48 0 0 1 29.539-44.308l192-80a48 48 0 0 1 36.923 0l192 80A48 48 0 0 1 496 128zM256 446.313l.066.034c93.735-46.689 172.497-156.308 175.817-307.729L256 65.333v380.98z"] };
var faShip = { prefix: 'fas', iconName: 'ship', icon: [640, 512, [], "f21a", "M496.616 372.639l70.012-70.012c16.899-16.9 9.942-45.771-12.836-53.092L512 236.102V96c0-17.673-14.327-32-32-32h-64V24c0-13.255-10.745-24-24-24H248c-13.255 0-24 10.745-24 24v40h-64c-17.673 0-32 14.327-32 32v140.102l-41.792 13.433c-22.753 7.313-29.754 36.173-12.836 53.092l70.012 70.012C125.828 416.287 85.587 448 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24 61.023 0 107.499-20.61 143.258-59.396C181.677 487.432 216.021 512 256 512h128c39.979 0 74.323-24.568 88.742-59.396C508.495 491.384 554.968 512 616 512c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24-60.817 0-101.542-31.001-119.384-75.361zM192 128h256v87.531l-118.208-37.995a31.995 31.995 0 0 0-19.584 0L192 215.531V128z"] };
var faShippingFast = { prefix: 'fas', iconName: 'shipping-fast', icon: [640, 512, [], "f48b", "M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"] };
var faShoePrints = { prefix: 'fas', iconName: 'shoe-prints', icon: [640, 512, [], "f54b", "M192 160h32V32h-32c-35.35 0-64 28.65-64 64s28.65 64 64 64zM0 416c0 35.35 28.65 64 64 64h32V352H64c-35.35 0-64 28.65-64 64zm337.46-128c-34.91 0-76.16 13.12-104.73 32-24.79 16.38-44.52 32-104.73 32v128l57.53 15.97c26.21 7.28 53.01 13.12 80.31 15.05 32.69 2.31 65.6.67 97.58-6.2C472.9 481.3 512 429.22 512 384c0-64-84.18-96-174.54-96zM491.42 7.19C459.44.32 426.53-1.33 393.84.99c-27.3 1.93-54.1 7.77-80.31 15.04L256 32v128c60.2 0 79.94 15.62 104.73 32 28.57 18.88 69.82 32 104.73 32C555.82 224 640 192 640 128c0-45.22-39.1-97.3-148.58-120.81z"] };
var faShoppingBag = { prefix: 'fas', iconName: 'shopping-bag', icon: [448, 512, [], "f290", "M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"] };
var faShoppingBasket = { prefix: 'fas', iconName: 'shopping-basket', icon: [576, 512, [], "f291", "M576 216v16c0 13.255-10.745 24-24 24h-8l-26.113 182.788C514.509 462.435 494.257 480 470.37 480H105.63c-23.887 0-44.139-17.565-47.518-41.212L32 256h-8c-13.255 0-24-10.745-24-24v-16c0-13.255 10.745-24 24-24h67.341l106.78-146.821c10.395-14.292 30.407-17.453 44.701-7.058 14.293 10.395 17.453 30.408 7.058 44.701L170.477 192h235.046L326.12 82.821c-10.395-14.292-7.234-34.306 7.059-44.701 14.291-10.395 34.306-7.235 44.701 7.058L484.659 192H552c13.255 0 24 10.745 24 24zM312 392V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24zm112 0V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24zm-224 0V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24z"] };
var faShoppingCart = { prefix: 'fas', iconName: 'shopping-cart', icon: [576, 512, [], "f07a", "M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"] };
var faShower = { prefix: 'fas', iconName: 'shower', icon: [512, 512, [], "f2cc", "M389.66 135.6L231.6 293.66c-9.37 9.37-24.57 9.37-33.94 0l-11.32-11.32c-9.37-9.37-9.37-24.57 0-33.94l.11-.11c-34.03-40.21-35.16-98.94-3.39-140.38-11.97-7.55-26.14-11.91-41.3-11.91C98.88 96 64 130.88 64 173.76V480H0V173.76C0 95.59 63.59 32 141.76 32c36.93 0 70.61 14.2 95.86 37.42 35.9-11.51 76.5-4.5 106.67 21.03l.11-.11c9.37-9.37 24.57-9.37 33.94 0l11.32 11.32c9.37 9.37 9.37 24.57 0 33.94zM384 208c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm32 0c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zm96 0c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm-160 32c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm48-16c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zm80 16c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm-160 32c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm32 0c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zm96 0c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm-128 32c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zm96 0c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm-96 32c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm64 0c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm-32 32c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm-32 32c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16z"] };
var faSign = { prefix: 'fas', iconName: 'sign', icon: [512, 512, [], "f4d9", "M496 64H128V16c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16v48H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h48v368c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V128h368c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16zM160 384h320V160H160v224z"] };
var faSignInAlt = { prefix: 'fas', iconName: 'sign-in-alt', icon: [512, 512, [], "f2f6", "M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"] };
var faSignLanguage = { prefix: 'fas', iconName: 'sign-language', icon: [448, 512, [], "f2a7", "M91.434 483.987c-.307-16.018 13.109-29.129 29.13-29.129h62.293v-5.714H56.993c-16.021 0-29.437-13.111-29.13-29.129C28.16 404.491 40.835 392 56.428 392h126.429v-5.714H29.136c-16.021 0-29.437-13.111-29.13-29.129.297-15.522 12.973-28.013 28.566-28.013h154.286v-5.714H57.707c-16.021 0-29.437-13.111-29.13-29.129.297-15.522 12.973-28.013 28.566-28.013h168.566l-31.085-22.606c-12.762-9.281-15.583-27.149-6.302-39.912 9.281-12.761 27.15-15.582 39.912-6.302l123.361 89.715a34.287 34.287 0 0 1 14.12 27.728v141.136c0 15.91-10.946 29.73-26.433 33.374l-80.471 18.934a137.16 137.16 0 0 1-31.411 3.646H120c-15.593-.001-28.269-12.492-28.566-28.014zm73.249-225.701h36.423l-11.187-8.136c-18.579-13.511-20.313-40.887-3.17-56.536l-13.004-16.7c-9.843-12.641-28.43-15.171-40.88-5.088-12.065 9.771-14.133 27.447-4.553 39.75l36.371 46.71zm283.298-2.103l-5.003-152.452c-.518-15.771-13.722-28.136-29.493-27.619-15.773.518-28.137 13.722-27.619 29.493l1.262 38.415L283.565 11.019c-9.58-12.303-27.223-14.63-39.653-5.328-12.827 9.599-14.929 28.24-5.086 40.881l76.889 98.745-4.509 3.511-94.79-121.734c-9.58-12.303-27.223-14.63-39.653-5.328-12.827 9.599-14.929 28.24-5.086 40.881l94.443 121.288-4.509 3.511-77.675-99.754c-9.58-12.303-27.223-14.63-39.653-5.328-12.827 9.599-14.929 28.24-5.086 40.881l52.053 66.849c12.497-8.257 29.055-8.285 41.69.904l123.36 89.714c10.904 7.93 17.415 20.715 17.415 34.198v16.999l61.064-47.549a34.285 34.285 0 0 0 13.202-28.177z"] };
var faSignOutAlt = { prefix: 'fas', iconName: 'sign-out-alt', icon: [512, 512, [], "f2f5", "M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"] };
var faSignal = { prefix: 'fas', iconName: 'signal', icon: [640, 512, [], "f012", "M36 384h56c6.6 0 12 5.4 12 12v104c0 6.6-5.4 12-12 12H36c-6.6 0-12-5.4-12-12V396c0-6.6 5.4-12 12-12zm116-36v152c0 6.6 5.4 12 12 12h56c6.6 0 12-5.4 12-12V348c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12zm128-80v232c0 6.6 5.4 12 12 12h56c6.6 0 12-5.4 12-12V268c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12zm128-112v344c0 6.6 5.4 12 12 12h56c6.6 0 12-5.4 12-12V156c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12zM536 12v488c0 6.6 5.4 12 12 12h56c6.6 0 12-5.4 12-12V12c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12z"] };
var faSitemap = { prefix: 'fas', iconName: 'sitemap', icon: [640, 512, [], "f0e8", "M128 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32zm-24-80h192v48h48v-48h192v48h48v-57.59c0-21.17-17.23-38.41-38.41-38.41H344v-64h40c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32H256c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h40v64H94.41C73.23 224 56 241.23 56 262.41V320h48v-48zm264 80h-96c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32zm240 0h-96c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32z"] };
var faSkull = { prefix: 'fas', iconName: 'skull', icon: [512, 512, [], "f54c", "M256 0C114.6 0 0 100.3 0 224c0 70.1 36.9 132.6 94.5 173.7 9.6 6.9 15.2 18.1 13.5 29.9l-9.4 66.2c-1.4 9.6 6 18.2 15.7 18.2H192v-56c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v56h64v-56c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v56h77.7c9.7 0 17.1-8.6 15.7-18.2l-9.4-66.2c-1.7-11.7 3.8-23 13.5-29.9C475.1 356.6 512 294.1 512 224 512 100.3 397.4 0 256 0zm-96 320c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zm192 0c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"] };
var faSlidersH = { prefix: 'fas', iconName: 'sliders-h', icon: [512, 512, [], "f1de", "M496 384H160v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h336c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160h-80v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h336v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160H288V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h208v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h208c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16z"] };
var faSmile = { prefix: 'fas', iconName: 'smile', icon: [496, 512, [], "f118", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm194.8 170.2C334.3 380.4 292.5 400 248 400s-86.3-19.6-114.8-53.8c-5.7-6.8-4.7-16.9 2-22.5 6.8-5.7 16.9-4.7 22.5 2 22.4 26.9 55.2 42.2 90.2 42.2s67.8-15.4 90.2-42.2c5.7-6.8 15.7-7.7 22.5-2 6.9 5.7 7.8 15.8 2.2 22.5z"] };
var faSmoking = { prefix: 'fas', iconName: 'smoking', icon: [640, 512, [], "f48d", "M632 352h-48c-4.4 0-8 3.6-8 8v144c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8zM553.3 87.1c-5.7-3.8-9.3-10-9.3-16.8V8c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v62.3c0 22 10.2 43.4 28.6 55.4 42.2 27.3 67.4 73.8 67.4 124V280c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-30.3c0-65.5-32.4-126.2-86.7-162.6zM432 352H48c-26.5 0-48 21.5-48 48v64c0 26.5 21.5 48 48 48h384c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16zm-32 112H224v-64h176v64zm87.7-322.4C463.8 125 448 99.3 448 70.3V8c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v66.4c0 43.7 24.6 81.6 60.3 106.7 22.4 15.7 35.7 41.2 35.7 68.6V280c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-30.3c0-43.3-21-83.4-56.3-108.1zM536 352h-48c-4.4 0-8 3.6-8 8v144c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8z"] };
var faSmokingBan = { prefix: 'fas', iconName: 'smoking-ban', icon: [512, 512, [], "f54d", "M96 304c0 8.8 7.2 16 16 16h117.5l-96-96H112c-8.8 0-16 7.2-16 16v64zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 448c-105.9 0-192-86.1-192-192 0-41.4 13.3-79.7 35.7-111.1l267.4 267.4C335.7 434.7 297.4 448 256 448zm45.2-192H384v32h-50.8l-32-32zm111.1 111.1L365.2 320H400c8.8 0 16-7.2 16-16v-64c0-8.8-7.2-16-16-16H269.2L144.9 99.7C176.3 77.3 214.6 64 256 64c105.9 0 192 86.1 192 192 0 41.4-13.3 79.7-35.7 111.1zM320.6 128c-15.6 0-28.6-11.2-31.4-25.9-.7-3.6-4-6.1-7.7-6.1h-16.2c-5 0-8.7 4.5-8 9.4 4.6 30.9 31.2 54.6 63.3 54.6 15.6 0 28.6 11.2 31.4 25.9.7 3.6 4 6.1 7.7 6.1h16.2c5 0 8.7-4.5 8-9.4-4.6-30.9-31.2-54.6-63.3-54.6z"] };
var faSnowflake = { prefix: 'fas', iconName: 'snowflake', icon: [448, 512, [], "f2dc", "M444.816 301.639a24.12 24.12 0 0 0 2.661-16.978c-2.725-12.966-15.339-21.245-28.174-18.492l-87.407 25.046L264 256l67.896-35.215 87.407 25.046c12.835 2.753 25.449-5.526 28.174-18.492 2.725-12.966-5.471-25.708-18.305-28.461l-47.477-7.137 53.077-30.956c11.363-6.627 15.257-21.306 8.696-32.785-6.561-11.479-21.091-15.412-32.454-8.785l-53.077 30.956 17.621-45.104c4.057-12.606-2.768-26.146-15.247-30.245-12.478-4.099-25.883 2.797-29.94 15.402l-22.232 88.99-60.38 35.215V144l65.175-63.945c8.778-9.852 7.987-25.027-1.766-33.894-9.753-8.867-24.775-8.068-33.552 1.784l-29.857 37.967V24c0-13.255-10.637-24-23.758-24s-23.758 10.745-23.758 24v61.912l-29.857-37.967c-8.779-9.852-23.799-10.652-33.552-1.784-9.753 8.867-10.543 24.042-1.766 33.894L200.242 144v70.431l-60.38-35.215-22.232-88.99c-4.057-12.605-17.462-19.501-29.94-15.402-12.478 4.099-19.304 17.64-15.247 30.245l17.62 45.104-53.077-30.956c-11.363-6.627-25.893-2.694-32.454 8.785s-2.667 26.157 8.696 32.785l53.077 30.956-47.477 7.137C5.993 201.634-2.203 214.375.523 227.341c2.725 12.965 15.339 21.245 28.174 18.492l87.407-25.046L184 256l-67.896 35.215-87.406-25.045c-12.835-2.753-25.449 5.526-28.174 18.492-2.725 12.967 5.47 25.708 18.305 28.461l47.477 7.137-53.077 30.956C1.866 357.843-2.027 372.521 4.533 384s21.091 15.412 32.454 8.785l53.077-30.956-17.62 45.104a24.157 24.157 0 0 0 2.022 19.428c2.831 4.953 7.416 8.909 13.224 10.816 12.478 4.099 25.883-2.797 29.94-15.402l22.232-88.99 60.38-35.215V368l-65.175 63.945c-8.778 9.852-7.987 25.027 1.766 33.894 9.754 8.868 24.774 8.068 33.552-1.784l29.857-37.967V488c0 13.255 10.637 24 23.758 24s23.758-10.745 23.758-24v-61.912l29.857 37.967A23.59 23.59 0 0 0 295.282 472a23.534 23.534 0 0 0 15.885-6.161c9.753-8.867 10.544-24.042 1.766-33.894L247.758 368v-70.431l60.38 35.215 22.232 88.99c4.057 12.605 17.462 19.501 29.94 15.402 12.479-4.099 19.304-17.64 15.247-30.245l-17.621-45.104 53.077 30.956c11.363 6.627 25.893 2.694 32.454-8.785s2.667-26.157-8.696-32.785l-53.077-30.956 47.477-7.137c6.86-1.469 12.394-5.793 15.645-11.481z"] };
var faSort = { prefix: 'fas', iconName: 'sort', icon: [320, 512, [], "f0dc", "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"] };
var faSortAlphaDown = { prefix: 'fas', iconName: 'sort-alpha-down', icon: [448, 512, [], "f15d", "M187.298 395.314l-79.984 80.002c-6.248 6.247-16.383 6.245-22.627 0L4.705 395.314C-5.365 385.244 1.807 368 16.019 368H64V48c0-8.837 7.163-16 16-16h32c8.837 0 16 7.163 16 16v320h47.984c14.241 0 21.363 17.264 11.314 27.314zm119.075-180.007A12 12 0 0 1 294.838 224h-35.717c-8.22 0-14.007-8.078-11.362-15.861l57.096-168A12 12 0 0 1 316.217 32h39.566c5.139 0 9.708 3.273 11.362 8.139l57.096 168C426.886 215.922 421.1 224 412.879 224h-35.735a12 12 0 0 1-11.515-8.622l-8.301-28.299h-42.863l-8.092 28.228zm22.857-78.697h13.367l-6.6-22.937-6.767 22.937zm12.575 287.323l67.451-95.698a12 12 0 0 0 2.192-6.913V300c0-6.627-5.373-12-12-12H274.522c-6.627 0-12 5.373-12 12v28.93c0 6.627 5.373 12 12 12h56.469c-.739.991-1.497 2.036-2.27 3.133l-67.203 95.205a12.001 12.001 0 0 0-2.196 6.92V468c0 6.627 5.373 12 12 12h129.355c6.627 0 12-5.373 12-12v-28.93c0-6.627-5.373-12-12-12h-61.146c.74-.993 1.5-2.039 2.274-3.137z"] };
var faSortAlphaUp = { prefix: 'fas', iconName: 'sort-alpha-up', icon: [448, 512, [], "f15e", "M4.702 116.686l79.984-80.002c6.248-6.247 16.383-6.245 22.627 0l79.981 80.002c10.07 10.07 2.899 27.314-11.314 27.314H128v320c0 8.837-7.163 16-16 16H80c-8.837 0-16-7.163-16-16V144H16.016c-14.241 0-21.363-17.264-11.314-27.314zm301.671 98.621A12 12 0 0 1 294.838 224h-35.717c-8.22 0-14.007-8.078-11.362-15.861l57.096-168A12 12 0 0 1 316.217 32h39.566c5.139 0 9.708 3.273 11.362 8.139l57.096 168C426.886 215.922 421.1 224 412.879 224h-35.735a12 12 0 0 1-11.515-8.622l-8.301-28.299h-42.863l-8.092 28.228zm22.857-78.697h13.367l-6.6-22.937-6.767 22.937zm12.575 287.323l67.451-95.698a12 12 0 0 0 2.192-6.913V300c0-6.627-5.373-12-12-12H274.522c-6.627 0-12 5.373-12 12v28.93c0 6.627 5.373 12 12 12h56.469c-.739.991-1.497 2.036-2.27 3.133l-67.203 95.205a12.001 12.001 0 0 0-2.196 6.92V468c0 6.627 5.373 12 12 12h129.355c6.627 0 12-5.373 12-12v-28.93c0-6.627-5.373-12-12-12h-61.146c.74-.993 1.5-2.039 2.274-3.137z"] };
var faSortAmountDown = { prefix: 'fas', iconName: 'sort-amount-down', icon: [512, 512, [], "f160", "M187.298 395.314l-79.984 80.002c-6.248 6.247-16.383 6.245-22.627 0L4.705 395.314C-5.365 385.244 1.807 368 16.019 368H64V48c0-8.837 7.163-16 16-16h32c8.837 0 16 7.163 16 16v320h47.984c14.241 0 21.363 17.264 11.314 27.314zM240 96h256c8.837 0 16-7.163 16-16V48c0-8.837-7.163-16-16-16H240c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16zm-16 112v-32c0-8.837 7.163-16 16-16h192c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H240c-8.837 0-16-7.163-16-16zm0 256v-32c0-8.837 7.163-16 16-16h64c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16h-64c-8.837 0-16-7.163-16-16zm0-128v-32c0-8.837 7.163-16 16-16h128c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H240c-8.837 0-16-7.163-16-16z"] };
var faSortAmountUp = { prefix: 'fas', iconName: 'sort-amount-up', icon: [512, 512, [], "f161", "M4.702 116.686l79.984-80.002c6.248-6.247 16.383-6.245 22.627 0l79.981 80.002c10.07 10.07 2.899 27.314-11.314 27.314H128v320c0 8.837-7.163 16-16 16H80c-8.837 0-16-7.163-16-16V144H16.016c-14.241 0-21.363-17.264-11.314-27.314zM240 96h256c8.837 0 16-7.163 16-16V48c0-8.837-7.163-16-16-16H240c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16zm-16 112v-32c0-8.837 7.163-16 16-16h192c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H240c-8.837 0-16-7.163-16-16zm0 256v-32c0-8.837 7.163-16 16-16h64c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16h-64c-8.837 0-16-7.163-16-16zm0-128v-32c0-8.837 7.163-16 16-16h128c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H240c-8.837 0-16-7.163-16-16z"] };
var faSortDown = { prefix: 'fas', iconName: 'sort-down', icon: [320, 512, [], "f0dd", "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"] };
var faSortNumericDown = { prefix: 'fas', iconName: 'sort-numeric-down', icon: [448, 512, [], "f162", "M308.811 113.787l-19.448-20.795c-4.522-4.836-4.274-12.421.556-16.95l43.443-40.741a11.999 11.999 0 0 1 8.209-3.247h31.591c6.627 0 12 5.373 12 12v127.07h25.66c6.627 0 12 5.373 12 12v28.93c0 6.627-5.373 12-12 12H301.649c-6.627 0-12-5.373-12-12v-28.93c0-6.627 5.373-12 12-12h25.414v-57.938c-7.254 6.58-14.211 4.921-18.252.601zm-30.57 238.569c0-32.653 23.865-67.356 68.094-67.356 38.253 0 79.424 28.861 79.424 92.228 0 51.276-32.237 105.772-91.983 105.772-17.836 0-30.546-3.557-38.548-6.781-5.79-2.333-8.789-8.746-6.922-14.703l9.237-29.48c2.035-6.496 9.049-9.983 15.467-7.716 13.029 4.602 27.878 5.275 38.103-4.138-38.742 5.072-72.872-25.36-72.872-67.826zm92.273 19.338c0-22.285-15.302-36.505-25.835-36.505-8.642 0-13.164 7.965-13.164 15.832 0 5.669 1.815 24.168 25.168 24.168 9.973 0 13.377-2.154 13.744-2.731.021-.046.087-.291.087-.764zM175.984 368H128V48c0-8.837-7.163-16-16-16H80c-8.837 0-16 7.163-16 16v320H16.019c-14.212 0-21.384 17.244-11.314 27.314l79.981 80.002c6.245 6.245 16.38 6.247 22.627 0l79.984-80.002c10.05-10.05 2.928-27.314-11.313-27.314z"] };
var faSortNumericUp = { prefix: 'fas', iconName: 'sort-numeric-up', icon: [448, 512, [], "f163", "M308.811 113.787l-19.448-20.795c-4.522-4.836-4.274-12.421.556-16.95l43.443-40.741a11.999 11.999 0 0 1 8.209-3.247h31.591c6.627 0 12 5.373 12 12v127.07h25.66c6.627 0 12 5.373 12 12v28.93c0 6.627-5.373 12-12 12H301.649c-6.627 0-12-5.373-12-12v-28.93c0-6.627 5.373-12 12-12h25.414v-57.938c-7.254 6.58-14.211 4.921-18.252.601zm-30.57 238.569c0-32.653 23.865-67.356 68.094-67.356 38.253 0 79.424 28.861 79.424 92.228 0 51.276-32.237 105.772-91.983 105.772-17.836 0-30.546-3.557-38.548-6.781-5.79-2.333-8.789-8.746-6.922-14.703l9.237-29.48c2.035-6.496 9.049-9.983 15.467-7.716 13.029 4.602 27.878 5.275 38.103-4.138-38.742 5.072-72.872-25.36-72.872-67.826zm92.273 19.338c0-22.285-15.302-36.505-25.835-36.505-8.642 0-13.164 7.965-13.164 15.832 0 5.669 1.815 24.168 25.168 24.168 9.973 0 13.377-2.154 13.744-2.731.021-.046.087-.291.087-.764zM16.016 144H64v320c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16V144h47.981c14.212 0 21.384-17.244 11.314-27.314l-79.981-80.002c-6.245-6.245-16.38-6.247-22.627 0L4.702 116.686C-5.347 126.736 1.775 144 16.016 144z"] };
var faSortUp = { prefix: 'fas', iconName: 'sort-up', icon: [320, 512, [], "f0de", "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"] };
var faSpaceShuttle = { prefix: 'fas', iconName: 'space-shuttle', icon: [640, 512, [], "f197", "M592.604 208.244C559.735 192.836 515.777 184 472 184H186.327c-4.952-6.555-10.585-11.978-16.72-16H376C229.157 137.747 219.403 32 96.003 32H96v128H80V32c-26.51 0-48 28.654-48 64v64c-23.197 0-32 10.032-32 24v40c0 13.983 8.819 24 32 24v16c-23.197 0-32 10.032-32 24v40c0 13.983 8.819 24 32 24v64c0 35.346 21.49 64 48 64V352h16v128h.003c123.4 0 133.154-105.747 279.997-136H169.606c6.135-4.022 11.768-9.445 16.72-16H472c43.777 0 87.735-8.836 120.604-24.244C622.282 289.845 640 271.992 640 256s-17.718-33.845-47.396-47.756zM488 296a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8c31.909 0 31.942 80 0 80z"] };
var faSpinner = { prefix: 'fas', iconName: 'spinner', icon: [512, 512, [], "f110", "M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"] };
var faSquare = { prefix: 'fas', iconName: 'square', icon: [448, 512, [], "f0c8", "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"] };
var faSquareFull = { prefix: 'fas', iconName: 'square-full', icon: [512, 512, [], "f45c", "M512 512H0V0h512v512z"] };
var faStar = { prefix: 'fas', iconName: 'star', icon: [576, 512, [], "f005", "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"] };
var faStarHalf = { prefix: 'fas', iconName: 'star-half', icon: [576, 512, [], "f089", "M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z"] };
var faStepBackward = { prefix: 'fas', iconName: 'step-backward', icon: [448, 512, [], "f048", "M64 468V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v176.4l195.5-181C352.1 22.3 384 36.6 384 64v384c0 27.4-31.9 41.7-52.5 24.6L136 292.7V468c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12z"] };
var faStepForward = { prefix: 'fas', iconName: 'step-forward', icon: [448, 512, [], "f051", "M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"] };
var faStethoscope = { prefix: 'fas', iconName: 'stethoscope', icon: [512, 512, [], "f0f1", "M447.1 112c-34.2.5-62.3 28.4-63 62.6-.5 24.3 12.5 45.6 32 56.8V344c0 57.3-50.2 104-112 104-60 0-109.2-44.1-111.9-99.2C265 333.8 320 269.2 320 192V36.6c0-11.4-8.1-21.3-19.3-23.5L237.8.5c-13-2.6-25.6 5.8-28.2 18.8L206.4 35c-2.6 13 5.8 25.6 18.8 28.2l30.7 6.1v121.4c0 52.9-42.2 96.7-95.1 97.2-53.4.5-96.9-42.7-96.9-96V69.4l30.7-6.1c13-2.6 21.4-15.2 18.8-28.2l-3.1-15.7C107.7 6.4 95.1-2 82.1.6L19.3 13C8.1 15.3 0 25.1 0 36.6V192c0 77.3 55.1 142 128.1 156.8C130.7 439.2 208.6 512 304 512c97 0 176-75.4 176-168V231.4c19.1-11.1 32-31.7 32-55.4 0-35.7-29.2-64.5-64.9-64zm.9 80c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z"] };
var faStickyNote = { prefix: 'fas', iconName: 'sticky-note', icon: [448, 512, [], "f249", "M312 320h136V56c0-13.3-10.7-24-24-24H24C10.7 32 0 42.7 0 56v400c0 13.3 10.7 24 24 24h264V344c0-13.2 10.8-24 24-24zm129 55l-98 98c-4.5 4.5-10.6 7-17 7h-6V352h128v6.1c0 6.3-2.5 12.4-7 16.9z"] };
var faStop = { prefix: 'fas', iconName: 'stop', icon: [448, 512, [], "f04d", "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"] };
var faStopCircle = { prefix: 'fas', iconName: 'stop-circle', icon: [512, 512, [], "f28d", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm96 328c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16v160z"] };
var faStopwatch = { prefix: 'fas', iconName: 'stopwatch', icon: [448, 512, [], "f2f2", "M432 304c0 114.9-93.1 208-208 208S16 418.9 16 304c0-104 76.3-190.2 176-205.5V64h-28c-6.6 0-12-5.4-12-12V12c0-6.6 5.4-12 12-12h120c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-28v34.5c37.5 5.8 71.7 21.6 99.7 44.6l27.5-27.5c4.7-4.7 12.3-4.7 17 0l28.3 28.3c4.7 4.7 4.7 12.3 0 17l-29.4 29.4-.6.6C419.7 223.3 432 262.2 432 304zm-176 36V188.5c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12V340c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"] };
var faStore = { prefix: 'fas', iconName: 'store', icon: [616, 512, [], "f54e", "M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5.6 9.1.9 13.7.9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1.8-12.1 1.2-18.2 1.2z"] };
var faStoreAlt = { prefix: 'fas', iconName: 'store-alt', icon: [640, 512, [], "f54f", "M320 384H128V224H64v256c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V224h-64v160zm314.6-241.8l-85.3-128c-6-8.9-16-14.2-26.7-14.2H117.4c-10.7 0-20.7 5.3-26.6 14.2l-85.3 128c-14.2 21.3 1 49.8 26.6 49.8H608c25.5 0 40.7-28.5 26.6-49.8zM512 496c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V224h-64v272z"] };
var faStream = { prefix: 'fas', iconName: 'stream', icon: [512, 512, [], "f550", "M16 128h416c8.84 0 16-7.16 16-16V48c0-8.84-7.16-16-16-16H16C7.16 32 0 39.16 0 48v64c0 8.84 7.16 16 16 16zm480 80H80c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zm-64 176H16c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16z"] };
var faStreetView = { prefix: 'fas', iconName: 'street-view', icon: [512, 512, [], "f21d", "M192 64c0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64s-64-28.654-64-64zm112 80h-11.36c-22.711 10.443-49.59 10.894-73.28 0H208c-26.51 0-48 21.49-48 48v104c0 13.255 10.745 24 24 24h16v104c0 13.255 10.745 24 24 24h64c13.255 0 24-10.745 24-24V320h16c13.255 0 24-10.745 24-24V192c0-26.51-21.49-48-48-48zm85.642 189.152a72.503 72.503 0 0 1-29.01 27.009C391.133 365.251 480 385.854 480 416c0 46.304-167.656 64-224 64-70.303 0-224-20.859-224-64 0-30.123 88.361-50.665 119.367-55.839a72.516 72.516 0 0 1-29.01-27.009C74.959 343.395 0 367.599 0 416c0 77.111 178.658 96 256 96 77.249 0 256-18.865 256-96 0-48.403-74.967-72.606-122.358-82.848z"] };
var faStrikethrough = { prefix: 'fas', iconName: 'strikethrough', icon: [512, 512, [], "f0cc", "M496 288H16c-8.837 0-16-7.163-16-16v-32c0-8.837 7.163-16 16-16h480c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16zm-214.666 16c27.258 12.937 46.524 28.683 46.524 56.243 0 33.108-28.977 53.676-75.621 53.676-32.325 0-76.874-12.08-76.874-44.271V368c0-8.837-7.164-16-16-16H113.75c-8.836 0-16 7.163-16 16v19.204c0 66.845 77.717 101.82 154.487 101.82 88.578 0 162.013-45.438 162.013-134.424 0-19.815-3.618-36.417-10.143-50.6H281.334zm-30.952-96c-32.422-13.505-56.836-28.946-56.836-59.683 0-33.92 30.901-47.406 64.962-47.406 42.647 0 64.962 16.593 64.962 32.985V136c0 8.837 7.164 16 16 16h45.613c8.836 0 16-7.163 16-16v-30.318c0-52.438-71.725-79.875-142.575-79.875-85.203 0-150.726 40.972-150.726 125.646 0 22.71 4.665 41.176 12.777 56.547h129.823z"] };
var faStroopwafel = { prefix: 'fas', iconName: 'stroopwafel', icon: [512, 512, [], "f551", "M188.12 210.74L142.86 256l45.25 45.25L233.37 256l-45.25-45.26zm113.13-22.62L256 142.86l-45.25 45.25L256 233.37l45.25-45.25zm-90.5 135.76L256 369.14l45.26-45.26L256 278.63l-45.25 45.25zM256 0C114.62 0 0 114.62 0 256s114.62 256 256 256 256-114.62 256-256S397.38 0 256 0zm186.68 295.6l-11.31 11.31c-3.12 3.12-8.19 3.12-11.31 0l-28.29-28.29-45.25 45.25 33.94 33.94 16.97-16.97c3.12-3.12 8.19-3.12 11.31 0l11.31 11.31c3.12 3.12 3.12 8.19 0 11.31l-16.97 16.97 16.97 16.97c3.12 3.12 3.12 8.19 0 11.31l-11.31 11.31c-3.12 3.12-8.19 3.12-11.31 0l-16.97-16.97-16.97 16.97c-3.12 3.12-8.19 3.12-11.31 0l-11.31-11.31c-3.12-3.12-3.12-8.19 0-11.31l16.97-16.97-33.94-33.94-45.26 45.26 28.29 28.29c3.12 3.12 3.12 8.19 0 11.31l-11.31 11.31c-3.12 3.12-8.19 3.12-11.31 0L256 414.39l-28.29 28.29c-3.12 3.12-8.19 3.12-11.31 0l-11.31-11.31c-3.12-3.12-3.12-8.19 0-11.31l28.29-28.29-45.25-45.26-33.94 33.94 16.97 16.97c3.12 3.12 3.12 8.19 0 11.31l-11.31 11.31c-3.12 3.12-8.19 3.12-11.31 0l-16.97-16.97-16.97 16.97c-3.12 3.12-8.19 3.12-11.31 0l-11.31-11.31c-3.12-3.12-3.12-8.19 0-11.31l16.97-16.97-16.97-16.97c-3.12-3.12-3.12-8.19 0-11.31l11.31-11.31c3.12-3.12 8.19-3.12 11.31 0l16.97 16.97 33.94-33.94-45.25-45.25-28.29 28.29c-3.12 3.12-8.19 3.12-11.31 0L69.32 295.6c-3.12-3.12-3.12-8.19 0-11.31L97.61 256l-28.29-28.29c-3.12-3.12-3.12-8.19 0-11.31l11.31-11.31c3.12-3.12 8.19-3.12 11.31 0l28.29 28.29 45.25-45.26-33.94-33.94-16.97 16.97c-3.12 3.12-8.19 3.12-11.31 0l-11.31-11.31c-3.12-3.12-3.12-8.19 0-11.31l16.97-16.97-16.97-16.97c-3.12-3.12-3.12-8.19 0-11.31l11.31-11.31c3.12-3.12 8.19-3.12 11.31 0l16.97 16.97 16.97-16.97c3.12-3.12 8.19-3.12 11.31 0l11.31 11.31c3.12 3.12 3.12 8.19 0 11.31l-16.97 16.97 33.94 33.94 45.26-45.25-28.29-28.29c-3.12-3.12-3.12-8.19 0-11.31l11.31-11.31c3.12-3.12 8.19-3.12 11.31 0L256 97.61l28.29-28.29c3.12-3.12 8.19-3.12 11.31 0l11.31 11.31c3.12 3.12 3.12 8.19 0 11.31l-28.29 28.29 45.26 45.25 33.94-33.94-16.97-16.97c-3.12-3.12-3.12-8.19 0-11.31l11.31-11.31c3.12-3.12 8.19-3.12 11.31 0l16.97 16.97 16.97-16.97c3.12-3.12 8.19-3.12 11.31 0l11.31 11.31c3.12 3.12 3.12 8.19 0 11.31l-16.97 16.97 16.97 16.97c3.12 3.12 3.12 8.19 0 11.31l-11.31 11.31c-3.12 3.12-8.19 3.12-11.31 0l-16.97-16.97-33.94 33.94 45.25 45.26 28.29-28.29c3.12-3.12 8.19-3.12 11.31 0l11.31 11.31c3.12 3.12 3.12 8.19 0 11.31L414.39 256l28.29 28.28a8.015 8.015 0 0 1 0 11.32zM278.63 256l45.26 45.25L369.14 256l-45.25-45.26L278.63 256z"] };
var faSubscript = { prefix: 'fas', iconName: 'subscript', icon: [512, 512, [], "f12c", "M395.198 416c3.461-10.526 18.796-21.28 36.265-32.425 16.625-10.605 35.467-22.626 50.341-38.862 17.458-19.054 25.944-40.175 25.944-64.567 0-60.562-50.702-88.146-97.81-88.146-42.491 0-76.378 22.016-94.432 50.447-4.654 7.329-2.592 17.036 4.623 21.865l30.328 20.296c7.032 4.706 16.46 3.084 21.63-3.614 8.022-10.394 18.818-18.225 31.667-18.225 19.387 0 26.266 12.901 26.266 23.948 0 36.159-119.437 57.023-119.437 160.024 0 6.654.561 13.014 1.415 19.331 1.076 7.964 7.834 13.928 15.87 13.928H496c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16H395.198zM272 256c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16h-62.399a16 16 0 0 1-13.541-7.478l-45.701-72.615c-2.297-3.352-4.422-6.969-6.195-10.209-1.65 3.244-3.647 6.937-5.874 10.582l-44.712 72.147a15.999 15.999 0 0 1-13.6 7.572H16c-8.837 0-16-7.163-16-16v-32c0-8.837 7.163-16 16-16h26.325l56.552-82.709L46.111 96H16C7.163 96 0 88.837 0 80V48c0-8.837 7.163-16 16-16h68.806a16 16 0 0 1 13.645 7.644l39.882 65.126c2.072 3.523 4.053 7.171 5.727 10.37 1.777-3.244 3.92-6.954 6.237-10.537l40.332-65.035A15.999 15.999 0 0 1 204.226 32H272c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16h-27.979l-52.69 75.671L249.974 256H272z"] };
var faSubway = { prefix: 'fas', iconName: 'subway', icon: [448, 512, [], "f239", "M448 96v256c0 51.815-61.624 96-130.022 96l62.98 49.721C386.905 502.417 383.562 512 376 512H72c-7.578 0-10.892-9.594-4.957-14.279L130.022 448C61.82 448 0 403.954 0 352V96C0 42.981 64 0 128 0h192c65 0 128 42.981 128 96zM200 232V120c0-13.255-10.745-24-24-24H72c-13.255 0-24 10.745-24 24v112c0 13.255 10.745 24 24 24h104c13.255 0 24-10.745 24-24zm200 0V120c0-13.255-10.745-24-24-24H272c-13.255 0-24 10.745-24 24v112c0 13.255 10.745 24 24 24h104c13.255 0 24-10.745 24-24zm-48 56c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm-256 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"] };
var faSuitcase = { prefix: 'fas', iconName: 'suitcase', icon: [512, 512, [], "f0f2", "M128 480h256V80c0-26.5-21.5-48-48-48H176c-26.5 0-48 21.5-48 48v400zm64-384h128v32H192V96zm320 80v256c0 26.5-21.5 48-48 48h-48V128h48c26.5 0 48 21.5 48 48zM96 480H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48h48v352z"] };
var faSun = { prefix: 'fas', iconName: 'sun', icon: [512, 512, [], "f185", "M274.835 12.646l25.516 62.393c4.213 10.301 16.671 14.349 26.134 8.492l57.316-35.479c15.49-9.588 34.808 4.447 30.475 22.142l-16.03 65.475c-2.647 10.81 5.053 21.408 16.152 22.231l67.224 4.987c18.167 1.348 25.546 24.057 11.641 35.826L441.81 242.26c-8.495 7.19-8.495 20.289 0 27.479l51.454 43.548c13.906 11.769 6.527 34.478-11.641 35.826l-67.224 4.987c-11.099.823-18.799 11.421-16.152 22.231l16.03 65.475c4.332 17.695-14.986 31.73-30.475 22.142l-57.316-35.479c-9.463-5.858-21.922-1.81-26.134 8.492l-25.516 62.393c-6.896 16.862-30.774 16.862-37.67 0l-25.516-62.393c-4.213-10.301-16.671-14.349-26.134-8.492l-57.317 35.479c-15.49 9.588-34.808-4.447-30.475-22.142l16.03-65.475c2.647-10.81-5.053-21.408-16.152-22.231l-67.224-4.987c-18.167-1.348-25.546-24.057-11.641-35.826L70.19 269.74c8.495-7.19 8.495-20.289 0-27.479l-51.454-43.548c-13.906-11.769-6.527-34.478 11.641-35.826l67.224-4.987c11.099-.823 18.799-11.421 16.152-22.231l-16.03-65.475c-4.332-17.695 14.986-31.73 30.475-22.142l57.317 35.479c9.463 5.858 21.921 1.81 26.134-8.492l25.516-62.393c6.896-16.861 30.774-16.861 37.67 0zM392 256c0-74.991-61.01-136-136-136-74.991 0-136 61.009-136 136s61.009 136 136 136c74.99 0 136-61.009 136-136zm-32 0c0 57.346-46.654 104-104 104s-104-46.654-104-104 46.654-104 104-104 104 46.654 104 104z"] };
var faSuperscript = { prefix: 'fas', iconName: 'superscript', icon: [512, 512, [], "f12b", "M395.198 256c3.461-10.526 18.796-21.28 36.265-32.425 16.625-10.605 35.467-22.626 50.341-38.862 17.458-19.054 25.944-40.175 25.944-64.567 0-60.562-50.702-88.146-97.81-88.146-42.491 0-76.378 22.016-94.432 50.447-4.654 7.329-2.592 17.036 4.623 21.865l30.328 20.296c7.032 4.706 16.46 3.084 21.63-3.614 8.022-10.394 18.818-18.225 31.667-18.225 19.387 0 26.266 12.901 26.266 23.948 0 36.159-119.437 57.023-119.437 160.024 0 6.654.561 13.014 1.415 19.331 1.076 7.964 7.834 13.928 15.87 13.928H496c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16H395.198zM272 416c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16h-62.399a16 16 0 0 1-13.541-7.478l-45.701-72.615c-2.297-3.352-4.422-6.969-6.195-10.209-1.65 3.244-3.647 6.937-5.874 10.582l-44.712 72.147a15.999 15.999 0 0 1-13.6 7.572H16c-8.837 0-16-7.163-16-16v-32c0-8.837 7.163-16 16-16h26.325l56.552-82.709L46.111 256H16c-8.837 0-16-7.163-16-16v-32c0-8.837 7.163-16 16-16h68.806a16 16 0 0 1 13.645 7.644l39.882 65.126c2.072 3.523 4.053 7.171 5.727 10.37 1.777-3.244 3.92-6.954 6.237-10.537l40.332-65.035a16 16 0 0 1 13.598-7.567H272c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16h-27.979l-52.69 75.671L249.974 416H272z"] };
var faSync = { prefix: 'fas', iconName: 'sync', icon: [512, 512, [], "f021", "M440.935 12.574l3.966 82.766C399.416 41.904 331.674 8 256 8 134.813 8 33.933 94.924 12.296 209.824 10.908 217.193 16.604 224 24.103 224h49.084c5.57 0 10.377-3.842 11.676-9.259C103.407 137.408 172.931 80 256 80c60.893 0 114.512 30.856 146.104 77.801l-101.53-4.865c-6.845-.328-12.574 5.133-12.574 11.986v47.411c0 6.627 5.373 12 12 12h200.333c6.627 0 12-5.373 12-12V12c0-6.627-5.373-12-12-12h-47.411c-6.853 0-12.315 5.729-11.987 12.574zM256 432c-60.895 0-114.517-30.858-146.109-77.805l101.868 4.871c6.845.327 12.573-5.134 12.573-11.986v-47.412c0-6.627-5.373-12-12-12H12c-6.627 0-12 5.373-12 12V500c0 6.627 5.373 12 12 12h47.385c6.863 0 12.328-5.745 11.985-12.599l-4.129-82.575C112.725 470.166 180.405 504 256 504c121.187 0 222.067-86.924 243.704-201.824 1.388-7.369-4.308-14.176-11.807-14.176h-49.084c-5.57 0-10.377 3.842-11.676 9.259C408.593 374.592 339.069 432 256 432z"] };
var faSyncAlt = { prefix: 'fas', iconName: 'sync-alt', icon: [512, 512, [], "f2f1", "M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"] };
var faSyringe = { prefix: 'fas', iconName: 'syringe', icon: [512, 512, [], "f48e", "M201.5 174.8l55.7 55.8c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0l-55.7-55.8-45.3 45.3 55.8 55.8c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0L111 265.2l-26.4 26.4c-17.3 17.3-25.6 41.1-23 65.4l7.1 63.6L2.3 487c-3.1 3.1-3.1 8.2 0 11.3l11.3 11.3c3.1 3.1 8.2 3.1 11.3 0l66.3-66.3 63.6 7.1c23.9 2.6 47.9-5.4 65.4-23l181.9-181.9-135.7-135.7-64.9 65zm308.2-93.3L430.5 2.3c-3.1-3.1-8.2-3.1-11.3 0l-11.3 11.3c-3.1 3.1-3.1 8.2 0 11.3l28.3 28.3-45.3 45.3-56.6-56.6-17-17c-3.1-3.1-8.2-3.1-11.3 0l-33.9 33.9c-3.1 3.1-3.1 8.2 0 11.3l17 17L424.8 223l17 17c3.1 3.1 8.2 3.1 11.3 0l33.9-34c3.1-3.1 3.1-8.2 0-11.3l-73.5-73.5 45.3-45.3 28.3 28.3c3.1 3.1 8.2 3.1 11.3 0l11.3-11.3c3.1-3.2 3.1-8.2 0-11.4z"] };
var faTable = { prefix: 'fas', iconName: 'table', icon: [512, 512, [], "f0ce", "M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64v-96h160v96zm0-160H64v-96h160v96zm224 160H288v-96h160v96zm0-160H288v-96h160v96z"] };
var faTableTennis = { prefix: 'fas', iconName: 'table-tennis', icon: [512, 512, [], "f45d", "M496.2 296.5C527.7 218.7 512 126.2 449 63.1 365.1-21 229-21 145.1 63.1l-56 56.1 211.5 211.5c46.1-62.1 131.5-77.4 195.6-34.2zm-217.9 79.7L57.9 155.9c-27.3 45.3-21.7 105 17.3 144.1l34.5 34.6L6.7 424c-8.6 7.5-9.1 20.7-1 28.8l53.4 53.5c8 8.1 21.2 7.6 28.7-1L177.1 402l35.7 35.7c19.7 19.7 44.6 30.5 70.3 33.3-7.1-17-11-35.6-11-55.1-.1-13.8 2.5-27 6.2-39.7zM416 320c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96z"] };
var faTablet = { prefix: 'fas', iconName: 'tablet', icon: [448, 512, [], "f10a", "M400 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM224 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"] };
var faTabletAlt = { prefix: 'fas', iconName: 'tablet-alt', icon: [448, 512, [], "f3fa", "M400 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM224 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm176-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h328c6.6 0 12 5.4 12 12v312z"] };
var faTablets = { prefix: 'fas', iconName: 'tablets', icon: [640, 512, [], "f490", "M160 192C78.9 192 12.5 250.5.1 326.7c-.8 4.8 3.3 9.3 8.3 9.3h303.3c5 0 9.1-4.5 8.3-9.3C307.5 250.5 241.1 192 160 192zm151.6 176H8.4c-5 0-9.1 4.5-8.3 9.3C12.5 453.5 78.9 512 160 512s147.5-58.5 159.9-134.7c.8-4.8-3.3-9.3-8.3-9.3zM593.4 46.6c-56.5-56.5-144.2-61.4-206.9-16-4 2.9-4.3 8.9-.8 12.3L597 254.3c3.5 3.5 9.5 3.2 12.3-.8 45.5-62.7 40.6-150.4-15.9-206.9zM363 65.7c-3.5-3.5-9.5-3.2-12.3.8-45.4 62.7-40.5 150.4 15.9 206.9 56.5 56.5 144.2 61.4 206.9 15.9 4-2.9 4.3-8.9.8-12.3L363 65.7z"] };
var faTachometerAlt = { prefix: 'fas', iconName: 'tachometer-alt', icon: [576, 512, [], "f3fd", "M75.694 480a48.02 48.02 0 0 1-42.448-25.571C12.023 414.3 0 368.556 0 320 0 160.942 128.942 32 288 32s288 128.942 288 288c0 48.556-12.023 94.3-33.246 134.429A48.018 48.018 0 0 1 500.306 480H75.694zM512 288c-17.673 0-32 14.327-32 32 0 17.673 14.327 32 32 32s32-14.327 32-32c0-17.673-14.327-32-32-32zM288 128c17.673 0 32-14.327 32-32 0-17.673-14.327-32-32-32s-32 14.327-32 32c0 17.673 14.327 32 32 32zM64 288c-17.673 0-32 14.327-32 32 0 17.673 14.327 32 32 32s32-14.327 32-32c0-17.673-14.327-32-32-32zm65.608-158.392c-17.673 0-32 14.327-32 32 0 17.673 14.327 32 32 32s32-14.327 32-32c0-17.673-14.327-32-32-32zm316.784 0c-17.673 0-32 14.327-32 32 0 17.673 14.327 32 32 32s32-14.327 32-32c0-17.673-14.327-32-32-32zm-87.078 31.534c-12.627-4.04-26.133 2.92-30.173 15.544l-45.923 143.511C250.108 322.645 224 350.264 224 384c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-19.773-8.971-37.447-23.061-49.187l45.919-143.498c4.039-12.625-2.92-26.133-15.544-30.173z"] };
var faTag = { prefix: 'fas', iconName: 'tag', icon: [512, 512, [], "f02b", "M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"] };
var faTags = { prefix: 'fas', iconName: 'tags', icon: [640, 512, [], "f02c", "M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823 497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999 26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z"] };
var faTape = { prefix: 'fas', iconName: 'tape', icon: [640, 512, [], "f4db", "M224 192c-35.3 0-64 28.7-64 64s28.7 64 64 64 64-28.7 64-64-28.7-64-64-64zm400 224H380.6c41.5-40.7 67.4-97.3 67.4-160 0-123.7-100.3-224-224-224S0 132.3 0 256s100.3 224 224 224h400c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400-64c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"] };
var faTasks = { prefix: 'fas', iconName: 'tasks', icon: [512, 512, [], "f0ae", "M208 132h288c8.8 0 16-7.2 16-16V76c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zm0 160h288c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zm0 160h288c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zM64 368c-26.5 0-48.6 21.5-48.6 48s22.1 48 48.6 48 48-21.5 48-48-21.5-48-48-48zm92.5-299l-72.2 72.2-15.6 15.6c-4.7 4.7-12.9 4.7-17.6 0L3.5 109.4c-4.7-4.7-4.7-12.3 0-17l15.7-15.7c4.7-4.7 12.3-4.7 17 0l22.7 22.1 63.7-63.3c4.7-4.7 12.3-4.7 17 0l17 16.5c4.6 4.7 4.6 12.3-.1 17zm0 159.6l-72.2 72.2-15.7 15.7c-4.7 4.7-12.9 4.7-17.6 0L3.5 269c-4.7-4.7-4.7-12.3 0-17l15.7-15.7c4.7-4.7 12.3-4.7 17 0l22.7 22.1 63.7-63.7c4.7-4.7 12.3-4.7 17 0l17 17c4.6 4.6 4.6 12.2-.1 16.9z"] };
var faTaxi = { prefix: 'fas', iconName: 'taxi', icon: [512, 512, [], "f1ba", "M461.951 243.865l-21.816-87.268A79.885 79.885 0 0 0 362.522 96H352V56c0-13.255-10.745-24-24-24H184c-13.255 0-24 10.745-24 24v40h-10.522a79.885 79.885 0 0 0-77.612 60.597L50.05 243.865C25.515 252.823 8 276.366 8 304v48c0 20.207 9.374 38.214 24 49.943V456c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-54.057c14.626-11.729 24-29.737 24-49.943v-48c0-27.634-17.515-51.177-42.049-60.135zM149.478 160h213.045a15.975 15.975 0 0 1 15.522 12.12l16.97 67.88h-278.03l16.97-67.881A15.976 15.976 0 0 1 149.478 160zM132 336c0 19.882-16.118 36-36 36s-36-16.118-36-36 16.118-36 36-36 36 16.118 36 36zm320 0c0 19.882-16.118 36-36 36s-36-16.118-36-36 16.118-36 36-36 36 16.118 36 36z"] };
var faTerminal = { prefix: 'fas', iconName: 'terminal', icon: [640, 512, [], "f120", "M257.981 272.971L63.638 467.314c-9.373 9.373-24.569 9.373-33.941 0L7.029 444.647c-9.357-9.357-9.375-24.522-.04-33.901L161.011 256 6.99 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L257.981 239.03c9.373 9.372 9.373 24.568 0 33.941zM640 456v-32c0-13.255-10.745-24-24-24H312c-13.255 0-24 10.745-24 24v32c0 13.255 10.745 24 24 24h304c13.255 0 24-10.745 24-24z"] };
var faTextHeight = { prefix: 'fas', iconName: 'text-height', icon: [576, 512, [], "f034", "M16 32h288c8.837 0 16 7.163 16 16v96c0 8.837-7.163 16-16 16h-35.496c-8.837 0-16-7.163-16-16V96h-54.761v320H232c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H88c-8.837 0-16-7.163-16-16v-32c0-8.837 7.163-16 16-16h34.257V96H67.496v48c0 8.837-7.163 16-16 16H16c-8.837 0-16-7.163-16-16V48c0-8.837 7.163-16 16-16zm475.308 4.685l79.995 80.001C581.309 126.693 574.297 144 559.99 144H512v224h48c15.639 0 20.635 17.991 11.313 27.314l-79.995 80.001c-6.247 6.247-16.381 6.245-22.626 0l-79.995-80.001C378.691 385.307 385.703 368 400.01 368H448V144h-48c-15.639 0-20.635-17.991-11.313-27.314l79.995-80.001c6.247-6.248 16.381-6.245 22.626 0z"] };
var faTextWidth = { prefix: 'fas', iconName: 'text-width', icon: [448, 512, [], "f035", "M16 32h416c8.837 0 16 7.163 16 16v96c0 8.837-7.163 16-16 16h-35.496c-8.837 0-16-7.163-16-16V96H261.743v128H296c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H152c-8.837 0-16-7.163-16-16v-32c0-8.837 7.163-16 16-16h34.257V96H67.496v48c0 8.837-7.163 16-16 16H16c-8.837 0-16-7.163-16-16V48c0-8.837 7.163-16 16-16zm427.315 340.682l-80.001-79.995C353.991 283.365 336 288.362 336 304v48H112v-47.99c0-14.307-17.307-21.319-27.314-11.313L4.685 372.692c-6.245 6.245-6.247 16.379 0 22.626l80.001 79.995C94.009 484.635 112 479.638 112 464v-48h224v47.99c0 14.307 17.307 21.319 27.314 11.313l80.001-79.995c6.245-6.245 6.248-16.379 0-22.626z"] };
var faTh = { prefix: 'fas', iconName: 'th', icon: [512, 512, [], "f00a", "M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z"] };
var faThLarge = { prefix: 'fas', iconName: 'th-large', icon: [512, 512, [], "f009", "M296 32h192c13.255 0 24 10.745 24 24v160c0 13.255-10.745 24-24 24H296c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24zm-80 0H24C10.745 32 0 42.745 0 56v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zM0 296v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm296 184h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H296c-13.255 0-24 10.745-24 24v160c0 13.255 10.745 24 24 24z"] };
var faThList = { prefix: 'fas', iconName: 'th-list', icon: [512, 512, [], "f00b", "M149.333 216v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-80c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zM125.333 32H24C10.745 32 0 42.745 0 56v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zm80 448H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm-24-424v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24zm24 264H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24z"] };
var faThermometer = { prefix: 'fas', iconName: 'thermometer', icon: [512, 512, [], "f491", "M476.8 20.4c-37.5-30.7-95.5-26.3-131.9 10.2l-45.7 46 50.5 50.5c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0l-50.4-50.5-45.1 45.4 50.3 50.4c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0L209 167.4l-45.1 45.4L214 263c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0l-50.1-50.2L96 281.1V382L7 471c-9.4 9.4-9.4 24.6 0 33.9 9.4 9.4 24.6 9.4 33.9 0l89-89h99.9L484 162.6c34.9-34.9 42.2-101.5-7.2-142.2z"] };
var faThermometerEmpty = { prefix: 'fas', iconName: 'thermometer-empty', icon: [256, 512, [], "f2cb", "M192 384c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-35.346 28.654-64 64-64s64 28.654 64 64zm32-84.653c19.912 22.563 32 52.194 32 84.653 0 70.696-57.303 128-128 128-.299 0-.609-.001-.909-.003C56.789 511.509-.357 453.636.002 383.333.166 351.135 12.225 321.755 32 299.347V96c0-53.019 42.981-96 96-96s96 42.981 96 96v203.347zM208 384c0-34.339-19.37-52.19-32-66.502V96c0-26.467-21.533-48-48-48S80 69.533 80 96v221.498c-12.732 14.428-31.825 32.1-31.999 66.08-.224 43.876 35.563 80.116 79.423 80.42L128 464c44.112 0 80-35.888 80-80z"] };
var faThermometerFull = { prefix: 'fas', iconName: 'thermometer-full', icon: [256, 512, [], "f2c7", "M224 96c0-53.019-42.981-96-96-96S32 42.981 32 96v203.347C12.225 321.756.166 351.136.002 383.333c-.359 70.303 56.787 128.176 127.089 128.664.299.002.61.003.909.003 70.698 0 128-57.304 128-128 0-32.459-12.088-62.09-32-84.653V96zm-96 368l-.576-.002c-43.86-.304-79.647-36.544-79.423-80.42.173-33.98 19.266-51.652 31.999-66.08V96c0-26.467 21.533-48 48-48s48 21.533 48 48v221.498c12.63 14.312 32 32.164 32 66.502 0 44.112-35.888 80-80 80zm64-80c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-23.685 12.876-44.349 32-55.417V96c0-17.673 14.327-32 32-32s32 14.327 32 32v232.583c19.124 11.068 32 31.732 32 55.417z"] };
var faThermometerHalf = { prefix: 'fas', iconName: 'thermometer-half', icon: [256, 512, [], "f2c9", "M192 384c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-23.685 12.876-44.349 32-55.417V224c0-17.673 14.327-32 32-32s32 14.327 32 32v104.583c19.124 11.068 32 31.732 32 55.417zm32-84.653c19.912 22.563 32 52.194 32 84.653 0 70.696-57.303 128-128 128-.299 0-.609-.001-.909-.003C56.789 511.509-.357 453.636.002 383.333.166 351.135 12.225 321.755 32 299.347V96c0-53.019 42.981-96 96-96s96 42.981 96 96v203.347zM208 384c0-34.339-19.37-52.19-32-66.502V96c0-26.467-21.533-48-48-48S80 69.533 80 96v221.498c-12.732 14.428-31.825 32.1-31.999 66.08-.224 43.876 35.563 80.116 79.423 80.42L128 464c44.112 0 80-35.888 80-80z"] };
var faThermometerQuarter = { prefix: 'fas', iconName: 'thermometer-quarter', icon: [256, 512, [], "f2ca", "M192 384c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-23.685 12.876-44.349 32-55.417V288c0-17.673 14.327-32 32-32s32 14.327 32 32v40.583c19.124 11.068 32 31.732 32 55.417zm32-84.653c19.912 22.563 32 52.194 32 84.653 0 70.696-57.303 128-128 128-.299 0-.609-.001-.909-.003C56.789 511.509-.357 453.636.002 383.333.166 351.135 12.225 321.755 32 299.347V96c0-53.019 42.981-96 96-96s96 42.981 96 96v203.347zM208 384c0-34.339-19.37-52.19-32-66.502V96c0-26.467-21.533-48-48-48S80 69.533 80 96v221.498c-12.732 14.428-31.825 32.1-31.999 66.08-.224 43.876 35.563 80.116 79.423 80.42L128 464c44.112 0 80-35.888 80-80z"] };
var faThermometerThreeQuarters = { prefix: 'fas', iconName: 'thermometer-three-quarters', icon: [256, 512, [], "f2c8", "M192 384c0 35.346-28.654 64-64 64-35.346 0-64-28.654-64-64 0-23.685 12.876-44.349 32-55.417V160c0-17.673 14.327-32 32-32s32 14.327 32 32v168.583c19.124 11.068 32 31.732 32 55.417zm32-84.653c19.912 22.563 32 52.194 32 84.653 0 70.696-57.303 128-128 128-.299 0-.609-.001-.909-.003C56.789 511.509-.357 453.636.002 383.333.166 351.135 12.225 321.755 32 299.347V96c0-53.019 42.981-96 96-96s96 42.981 96 96v203.347zM208 384c0-34.339-19.37-52.19-32-66.502V96c0-26.467-21.533-48-48-48S80 69.533 80 96v221.498c-12.732 14.428-31.825 32.1-31.999 66.08-.224 43.876 35.563 80.116 79.423 80.42L128 464c44.112 0 80-35.888 80-80z"] };
var faThumbsDown = { prefix: 'fas', iconName: 'thumbs-down', icon: [512, 512, [], "f165", "M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z"] };
var faThumbsUp = { prefix: 'fas', iconName: 'thumbs-up', icon: [512, 512, [], "f164", "M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"] };
var faThumbtack = { prefix: 'fas', iconName: 'thumbtack', icon: [384, 512, [], "f08d", "M298.028 214.267L285.793 96H328c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v48c0 13.255 10.745 24 24 24h42.207L85.972 214.267C37.465 236.82 0 277.261 0 328c0 13.255 10.745 24 24 24h136v104.007c0 1.242.289 2.467.845 3.578l24 48c2.941 5.882 11.364 5.893 14.311 0l24-48a8.008 8.008 0 0 0 .845-3.578V352h136c13.255 0 24-10.745 24-24-.001-51.183-37.983-91.42-85.973-113.733z"] };
var faTicketAlt = { prefix: 'fas', iconName: 'ticket-alt', icon: [576, 512, [], "f3ff", "M128 160h320v192H128V160zm400 96c0 26.51 21.49 48 48 48v96c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-96c26.51 0 48-21.49 48-48s-21.49-48-48-48v-96c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v96c-26.51 0-48 21.49-48 48zm-48-104c0-13.255-10.745-24-24-24H120c-13.255 0-24 10.745-24 24v208c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V152z"] };
var faTimes = { prefix: 'fas', iconName: 'times', icon: [352, 512, [], "f00d", "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"] };
var faTimesCircle = { prefix: 'fas', iconName: 'times-circle', icon: [512, 512, [], "f057", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"] };
var faTint = { prefix: 'fas', iconName: 'tint', icon: [384, 512, [], "f043", "M192 512c-98.435 0-178.087-79.652-178.087-178.087 0-111.196 101.194-154.065 148.522-311.825 9.104-30.116 51.099-28.778 59.13 0 47.546 158.486 148.522 200.069 148.522 311.825C370.087 432.348 290.435 512 192 512zm-42.522-171.826c-1.509-5.533-9.447-5.532-10.956 0-9.223 29.425-27.913 37.645-27.913 58.435C110.609 417.13 125.478 432 144 432s33.391-14.87 33.391-33.391c0-20.839-18.673-28.956-27.913-58.435z"] };
var faToggleOff = { prefix: 'fas', iconName: 'toggle-off', icon: [576, 512, [], "f204", "M384 64H192C85.961 64 0 149.961 0 256s85.961 192 192 192h192c106.039 0 192-85.961 192-192S490.039 64 384 64zM64 256c0-70.741 57.249-128 128-128 70.741 0 128 57.249 128 128 0 70.741-57.249 128-128 128-70.741 0-128-57.249-128-128zm320 128h-48.905c65.217-72.858 65.236-183.12 0-256H384c70.741 0 128 57.249 128 128 0 70.74-57.249 128-128 128z"] };
var faToggleOn = { prefix: 'fas', iconName: 'toggle-on', icon: [576, 512, [], "f205", "M576 256c0 106.039-85.961 192-192 192H192C85.961 448 0 362.039 0 256S85.961 64 192 64h192c106.039 0 192 85.961 192 192zM384 128c-70.741 0-128 57.249-128 128 0 70.741 57.249 128 128 128 70.741 0 128-57.249 128-128 0-70.741-57.249-128-128-128"] };
var faToolbox = { prefix: 'fas', iconName: 'toolbox', icon: [512, 512, [], "f552", "M502.63 214.63l-45.25-45.25c-6-6-14.14-9.37-22.63-9.37H384V80c0-26.51-21.49-48-48-48H176c-26.51 0-48 21.49-48 48v80H77.25c-8.49 0-16.62 3.37-22.63 9.37L9.37 214.63c-6 6-9.37 14.14-9.37 22.63V320h128v-16c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v16h128v-16c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v16h128v-82.75c0-8.48-3.37-16.62-9.37-22.62zM320 160H192V96h128v64zm64 208c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-16H192v16c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-16H0v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96H384v16z"] };
var faTrademark = { prefix: 'fas', iconName: 'trademark', icon: [640, 512, [], "f25c", "M97.119 163.133H12c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h248.559c6.627 0 12 5.373 12 12v43.133c0 6.627-5.373 12-12 12H175.44V404c0 6.627-5.373 12-12 12h-54.322c-6.627 0-12-5.373-12-12V163.133zM329.825 96h65.425a12 12 0 0 1 11.346 8.093l43.759 127.068c7.161 20.588 16.111 52.812 16.111 52.812h.896s8.95-32.224 16.111-52.812l43.758-127.068A12 12 0 0 1 538.577 96h65.41a12 12 0 0 1 11.961 11.03l24.012 296c.567 6.987-4.951 12.97-11.961 12.97h-54.101a12 12 0 0 1-11.972-11.182l-9.082-132.93c-1.79-24.168 0-53.706 0-53.706h-.896s-10.741 33.566-17.902 53.706l-30.7 84.731a12 12 0 0 1-11.282 7.912h-50.302a12 12 0 0 1-11.282-7.912l-30.7-84.731c-7.161-20.14-17.903-53.706-17.903-53.706h-.895s1.79 29.538 0 53.706l-9.082 132.93c-.428 6.295-5.66 11.182-11.97 11.182H305.4c-7.017 0-12.536-5.994-11.959-12.987l24.425-296A11.999 11.999 0 0 1 329.825 96z"] };
var faTrain = { prefix: 'fas', iconName: 'train', icon: [448, 512, [], "f238", "M448 96v256c0 51.815-61.624 96-130.022 96l62.98 49.721C386.905 502.417 383.562 512 376 512H72c-7.578 0-10.892-9.594-4.957-14.279L130.022 448C61.82 448 0 403.954 0 352V96C0 42.981 64 0 128 0h192c65 0 128 42.981 128 96zm-48 136V120c0-13.255-10.745-24-24-24H72c-13.255 0-24 10.745-24 24v112c0 13.255 10.745 24 24 24h304c13.255 0 24-10.745 24-24zm-176 64c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56z"] };
var faTransgender = { prefix: 'fas', iconName: 'transgender', icon: [384, 512, [], "f224", "M372 0h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-80.7 80.7C198.5 104.1 172.2 96 144 96 64.5 96 0 160.5 0 240c0 68.5 47.9 125.9 112 140.4V408H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v28c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-28h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-27.6c64.1-14.6 112-71.9 112-140.4 0-28.2-8.1-54.5-22.1-76.7l80.7-80.7 16.9 16.9c7.6 7.6 20.5 2.2 20.5-8.5V12c0-6.6-5.4-12-12-12zM144 320c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"] };
var faTransgenderAlt = { prefix: 'fas', iconName: 'transgender-alt', icon: [480, 512, [], "f225", "M468 0h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-80.7 80.7C294.5 104.1 268.2 96 240 96c-28.2 0-54.5 8.1-76.7 22.1l-16.5-16.5 19.8-19.8c4.7-4.7 4.7-12.3 0-17l-28.3-28.3c-4.7-4.7-12.3-4.7-17 0l-19.8 19.8-19-19 16.9-16.9C107.1 12.9 101.7 0 91 0H12C5.4 0 0 5.4 0 12v79c0 10.7 12.9 16 20.5 8.5l16.9-16.9 19 19-19.8 19.8c-4.7 4.7-4.7 12.3 0 17l28.3 28.3c4.7 4.7 12.3 4.7 17 0l19.8-19.8 16.5 16.5C104.1 185.5 96 211.8 96 240c0 68.5 47.9 125.9 112 140.4V408h-36c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v28c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-28h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-27.6c64.1-14.6 112-71.9 112-140.4 0-28.2-8.1-54.5-22.1-76.7l80.7-80.7 16.9 16.9c7.6 7.6 20.5 2.2 20.5-8.5V12c0-6.6-5.4-12-12-12zM240 320c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"] };
var faTrash = { prefix: 'fas', iconName: 'trash', icon: [448, 512, [], "f1f8", "M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z"] };
var faTrashAlt = { prefix: 'fas', iconName: 'trash-alt', icon: [448, 512, [], "f2ed", "M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"] };
var faTree = { prefix: 'fas', iconName: 'tree', icon: [384, 512, [], "f1bb", "M377.33 375.429L293.906 288H328c21.017 0 31.872-25.207 17.448-40.479L262.79 160H296c20.878 0 31.851-24.969 17.587-40.331l-104-112.003c-9.485-10.214-25.676-10.229-35.174 0l-104 112.003C56.206 134.969 67.037 160 88 160h33.21l-82.659 87.521C24.121 262.801 34.993 288 56 288h34.094L6.665 375.429C-7.869 390.655 2.925 416 24.025 416H144c0 32.781-11.188 49.26-33.995 67.506C98.225 492.93 104.914 512 120 512h144c15.086 0 21.776-19.069 9.995-28.494-19.768-15.814-33.992-31.665-33.995-67.496V416h119.97c21.05 0 31.929-25.309 17.36-40.571z"] };
var faTrophy = { prefix: 'fas', iconName: 'trophy', icon: [576, 512, [], "f091", "M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"] };
var faTruck = { prefix: 'fas', iconName: 'truck', icon: [640, 512, [], "f0d1", "M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"] };
var faTruckLoading = { prefix: 'fas', iconName: 'truck-loading', icon: [640, 512, [], "f4de", "M50.2 375.6c2.3 8.5 11.1 13.6 19.6 11.3l216.4-58c8.5-2.3 13.6-11.1 11.3-19.6l-49.7-185.5c-2.3-8.5-11.1-13.6-19.6-11.3L151 133.3l24.8 92.7-61.8 16.5-24.8-92.7-77.3 20.7C3.4 172.8-1.7 181.6.6 190.1l49.6 185.5zM384 0c-17.7 0-32 14.3-32 32v323.6L5.9 450c-4.3 1.2-6.8 5.6-5.6 9.8l12.6 46.3c1.2 4.3 5.6 6.8 9.8 5.6l393.7-107.4C418.8 464.1 467.6 512 528 512c61.9 0 112-50.1 112-112V0H384zm144 448c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"] };
var faTruckMoving = { prefix: 'fas', iconName: 'truck-moving', icon: [640, 512, [], "f4df", "M621.3 237.3l-58.5-58.5c-12-12-28.3-18.7-45.3-18.7H480V64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64v336c0 44.2 35.8 80 80 80 26.3 0 49.4-12.9 64-32.4 14.6 19.6 37.7 32.4 64 32.4 44.2 0 80-35.8 80-80 0-5.5-.6-10.8-1.6-16h163.2c-1.1 5.2-1.6 10.5-1.6 16 0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16H624c8.8 0 16-7.2 16-16v-85.5c0-17-6.7-33.2-18.7-45.2zM80 432c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32zm128 0c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32zm272-224h37.5c4.3 0 8.3 1.7 11.3 4.7l43.3 43.3H480v-48zm48 224c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32z"] };
var faTshirt = { prefix: 'fas', iconName: 'tshirt', icon: [640, 512, [], "f553", "M631.2 96.5L436.5 0C416.4 27.8 371.9 47.2 320 47.2S223.6 27.8 203.5 0L8.8 96.5c-7.9 4-11.1 13.6-7.2 21.5l57.2 114.5c4 7.9 13.6 11.1 21.5 7.2l56.6-27.7c10.6-5.2 23 2.5 23 14.4V480c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V226.3c0-11.8 12.4-19.6 23-14.4l56.6 27.7c7.9 4 17.5.8 21.5-7.2L638.3 118c4-7.9.8-17.6-7.1-21.5z"] };
var faTty = { prefix: 'fas', iconName: 'tty', icon: [512, 512, [], "f1e4", "M5.37 103.822c138.532-138.532 362.936-138.326 501.262 0 6.078 6.078 7.074 15.496 2.583 22.681l-43.214 69.138a18.332 18.332 0 0 1-22.356 7.305l-86.422-34.569a18.335 18.335 0 0 1-11.434-18.846L351.741 90c-62.145-22.454-130.636-21.986-191.483 0l5.953 59.532a18.331 18.331 0 0 1-11.434 18.846l-86.423 34.568a18.334 18.334 0 0 1-22.356-7.305L2.787 126.502a18.333 18.333 0 0 1 2.583-22.68zM96 308v-40c0-6.627-5.373-12-12-12H44c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H92c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zM96 500v-40c0-6.627-5.373-12-12-12H44c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H140c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z"] };
var faTv = { prefix: 'fas', iconName: 'tv', icon: [640, 512, [], "f26c", "M592 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h245.1v32h-160c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-160v-32H592c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h512v288z"] };
var faUmbrella = { prefix: 'fas', iconName: 'umbrella', icon: [576, 512, [], "f0e9", "M557.011 267.631c-51.432-45.217-107.572-43.698-158.567 30.731-5.298 7.861-14.906 7.165-19.736 0-2.483-3.624-32.218-60.808-90.708-60.808-45.766 0-70.542 31.378-90.709 60.808-4.829 7.165-14.436 7.861-19.734 0-50.904-74.285-106.613-76.406-158.567-30.731-10.21 8.264-20.912-1.109-18.696-9.481C32.146 134.573 158.516 64.612 288.001 64.612c128.793 0 256.546 69.961 287.706 193.538 2.206 8.322-8.426 17.793-18.696 9.481zM256 261.001V416c0 17.645-14.355 32-32 32s-32-14.355-32-32c0-17.673-14.327-32-32-32s-32 14.327-32 32c0 52.935 43.065 96 96 96s96-43.065 96-96V261.288c-21.836-10.806-45.425-9.737-64-.287zm64-211.007V32c0-17.673-14.327-32-32-32s-32 14.327-32 32v17.987a372.105 372.105 0 0 1 64 .007z"] };
var faUnderline = { prefix: 'fas', iconName: 'underline', icon: [448, 512, [], "f0cd", "M224.264 388.24c-91.669 0-156.603-51.165-156.603-151.392V64H39.37c-8.837 0-16-7.163-16-16V16c0-8.837 7.163-16 16-16h137.39c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16h-28.813v172.848c0 53.699 28.314 79.444 76.317 79.444 46.966 0 75.796-25.434 75.796-79.965V64h-28.291c-8.837 0-16-7.163-16-16V16c0-8.837 7.163-16 16-16h136.868c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16h-28.291v172.848c0 99.405-64.881 151.392-156.082 151.392zM16 448h416c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H16c-8.837 0-16-7.163-16-16v-32c0-8.837 7.163-16 16-16z"] };
var faUndo = { prefix: 'fas', iconName: 'undo', icon: [512, 512, [], "f0e2", "M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"] };
var faUndoAlt = { prefix: 'fas', iconName: 'undo-alt', icon: [512, 512, [], "f2ea", "M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"] };
var faUniversalAccess = { prefix: 'fas', iconName: 'universal-access', icon: [512, 512, [], "f29a", "M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z"] };
var faUniversity = { prefix: 'fas', iconName: 'university', icon: [512, 512, [], "f19c", "M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 4.941-7.392l232-88a7.996 7.996 0 0 1 6.118 0l232 88A8 8 0 0 1 496 128zm-24 304H40c-13.255 0-24 10.745-24 24v16a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-16c0-13.255-10.745-24-24-24zM96 192v192H60c-6.627 0-12 5.373-12 12v20h416v-20c0-6.627-5.373-12-12-12h-36V192h-64v192h-64V192h-64v192h-64V192H96z"] };
var faUnlink = { prefix: 'fas', iconName: 'unlink', icon: [512, 512, [], "f127", "M304.083 405.907c4.686 4.686 4.686 12.284 0 16.971l-44.674 44.674c-59.263 59.262-155.693 59.266-214.961 0-59.264-59.265-59.264-155.696 0-214.96l44.675-44.675c4.686-4.686 12.284-4.686 16.971 0l39.598 39.598c4.686 4.686 4.686 12.284 0 16.971l-44.675 44.674c-28.072 28.073-28.072 73.75 0 101.823 28.072 28.072 73.75 28.073 101.824 0l44.674-44.674c4.686-4.686 12.284-4.686 16.971 0l39.597 39.598zm-56.568-260.216c4.686 4.686 12.284 4.686 16.971 0l44.674-44.674c28.072-28.075 73.75-28.073 101.824 0 28.072 28.073 28.072 73.75 0 101.823l-44.675 44.674c-4.686 4.686-4.686 12.284 0 16.971l39.598 39.598c4.686 4.686 12.284 4.686 16.971 0l44.675-44.675c59.265-59.265 59.265-155.695 0-214.96-59.266-59.264-155.695-59.264-214.961 0l-44.674 44.674c-4.686 4.686-4.686 12.284 0 16.971l39.597 39.598zm234.828 359.28l22.627-22.627c9.373-9.373 9.373-24.569 0-33.941L63.598 7.029c-9.373-9.373-24.569-9.373-33.941 0L7.029 29.657c-9.373 9.373-9.373 24.569 0 33.941l441.373 441.373c9.373 9.372 24.569 9.372 33.941 0z"] };
var faUnlock = { prefix: 'fas', iconName: 'unlock', icon: [448, 512, [], "f09c", "M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"] };
var faUnlockAlt = { prefix: 'fas', iconName: 'unlock-alt', icon: [448, 512, [], "f13e", "M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z"] };
var faUpload = { prefix: 'fas', iconName: 'upload', icon: [512, 512, [], "f093", "M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"] };
var faUser = { prefix: 'fas', iconName: 'user', icon: [448, 512, [], "f007", "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"] };
var faUserAlt = { prefix: 'fas', iconName: 'user-alt', icon: [512, 512, [], "f406", "M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"] };
var faUserAltSlash = { prefix: 'fas', iconName: 'user-alt-slash', icon: [640, 512, [], "f4fa", "M633.8 458.1L389.6 269.3C433.8 244.7 464 198.1 464 144 464 64.5 399.5 0 320 0c-67.1 0-123 46.1-139 108.2L45.5 3.4C38.5-2 28.5-.8 23 6.2L3.4 31.4c-5.4 7-4.2 17 2.8 22.4l588.4 454.7c7 5.4 17 4.2 22.5-2.8l19.6-25.3c5.4-6.8 4.1-16.9-2.9-22.3zM198.4 320C124.2 320 64 380.2 64 454.4v9.6c0 26.5 21.5 48 48 48h382.2L245.8 320h-47.4z"] };
var faUserAstronaut = { prefix: 'fas', iconName: 'user-astronaut', icon: [448, 512, [], "f4fb", "M64 224h13.5c24.7 56.5 80.9 96 146.5 96s121.8-39.5 146.5-96H384c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16h-13.5C345.8 39.5 289.6 0 224 0S102.2 39.5 77.5 96H64c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16zm40-88c0-22.1 21.5-40 48-40h144c26.5 0 48 17.9 48 40v24c0 53-43 96-96 96h-48c-53 0-96-43-96-96v-24zm72 72l12-36 36-12-36-12-12-36-12 36-36 12 36 12 12 36zm151.6 113.4C297.7 340.7 262.2 352 224 352s-73.7-11.3-103.6-30.6C52.9 328.5 0 385 0 454.4v9.6c0 26.5 21.5 48 48 48h80v-64c0-17.7 14.3-32 32-32h128c17.7 0 32 14.3 32 32v64h80c26.5 0 48-21.5 48-48v-9.6c0-69.4-52.9-125.9-120.4-133zM272 448c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm-96 0c-8.8 0-16 7.2-16 16v48h32v-48c0-8.8-7.2-16-16-16z"] };
var faUserCheck = { prefix: 'fas', iconName: 'user-check', icon: [640, 512, [], "f4fc", "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4zm323-128.4l-27.8-28.1c-4.6-4.7-12.1-4.7-16.8-.1l-104.8 104-45.5-45.8c-4.6-4.7-12.1-4.7-16.8-.1l-28.1 27.9c-4.7 4.6-4.7 12.1-.1 16.8l81.7 82.3c4.6 4.7 12.1 4.7 16.8.1l141.3-140.2c4.6-4.7 4.7-12.2.1-16.8z"] };
var faUserCircle = { prefix: 'fas', iconName: 'user-circle', icon: [496, 512, [], "f2bd", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"] };
var faUserClock = { prefix: 'fas', iconName: 'user-clock', icon: [640, 512, [], "f4fd", "M496 224c-79.6 0-144 64.4-144 144s64.4 144 144 144 144-64.4 144-144-64.4-144-144-144zm64 150.3c0 5.3-4.4 9.7-9.7 9.7h-60.6c-5.3 0-9.7-4.4-9.7-9.7v-76.6c0-5.3 4.4-9.7 9.7-9.7h12.6c5.3 0 9.7 4.4 9.7 9.7V352h38.3c5.3 0 9.7 4.4 9.7 9.7v12.6zM320 368c0-27.8 6.7-54.1 18.2-77.5-8-1.5-16.2-2.5-24.6-2.5h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h347.1c-45.3-31.9-75.1-84.5-75.1-144zm-96-112c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128z"] };
var faUserCog = { prefix: 'fas', iconName: 'user-cog', icon: [640, 512, [], "f4fe", "M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z"] };
var faUserEdit = { prefix: 'fas', iconName: 'user-edit', icon: [640, 512, [], "f4ff", "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z"] };
var faUserFriends = { prefix: 'fas', iconName: 'user-friends', icon: [640, 512, [], "f500", "M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"] };
var faUserGraduate = { prefix: 'fas', iconName: 'user-graduate', icon: [448, 512, [], "f501", "M319.4 320.6L224 416l-95.4-95.4C57.1 323.7 0 382.2 0 454.4v9.6c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-9.6c0-72.2-57.1-130.7-128.6-133.8zM13.6 79.8l6.4 1.5v58.4c-7 4.2-12 11.5-12 20.3 0 8.4 4.6 15.4 11.1 19.7L3.5 242c-1.7 6.9 2.1 14 7.6 14h41.8c5.5 0 9.3-7.1 7.6-14l-15.6-62.3C51.4 175.4 56 168.4 56 160c0-8.8-5-16.1-12-20.3V87.1l66 15.9c-8.6 17.2-14 36.4-14 57 0 70.7 57.3 128 128 128s128-57.3 128-128c0-20.6-5.3-39.8-14-57l96.3-23.2c18.2-4.4 18.2-27.1 0-31.5l-190.4-46c-13-3.1-26.7-3.1-39.7 0L13.6 48.2c-18.1 4.4-18.1 27.2 0 31.6z"] };
var faUserLock = { prefix: 'fas', iconName: 'user-lock', icon: [640, 512, [], "f502", "M320 320c0-11.1 3.1-21.4 8.1-30.5-4.8-.5-9.5-1.5-14.5-1.5h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h280.9c-5.5-9.5-8.9-20.3-8.9-32V320zm-96-64c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm384 32h-32v-48c0-44.2-35.8-80-80-80s-80 35.8-80 80v48h-32c-17.7 0-32 14.3-32 32v160c0 17.7 14.3 32 32 32h224c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32zm-80 0h-64v-48c0-17.6 14.4-32 32-32s32 14.4 32 32v48z"] };
var faUserMd = { prefix: 'fas', iconName: 'user-md', icon: [448, 512, [], "f0f0", "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zM104 424c0 13.3 10.7 24 24 24s24-10.7 24-24-10.7-24-24-24-24 10.7-24 24zm216-135.4v49c36.5 7.4 64 39.8 64 78.4v41.7c0 7.6-5.4 14.2-12.9 15.7l-32.2 6.4c-4.3.9-8.5-1.9-9.4-6.3l-3.1-15.7c-.9-4.3 1.9-8.6 6.3-9.4l19.3-3.9V416c0-62.8-96-65.1-96 1.9v26.7l19.3 3.9c4.3.9 7.1 5.1 6.3 9.4l-3.1 15.7c-.9 4.3-5.1 7.1-9.4 6.3l-31.2-4.2c-7.9-1.1-13.8-7.8-13.8-15.9V416c0-38.6 27.5-70.9 64-78.4v-45.2c-2.2.7-4.4 1.1-6.6 1.9-18 6.3-37.3 9.8-57.4 9.8s-39.4-3.5-57.4-9.8c-7.4-2.6-14.9-4.2-22.6-5.2v81.6c23.1 6.9 40 28.1 40 53.4 0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.3 16.9-46.5 40-53.4v-80.4C48.5 301 0 355.8 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-72-56.8-130.3-128-133.8z"] };
var faUserMinus = { prefix: 'fas', iconName: 'user-minus', icon: [640, 512, [], "f503", "M624 208H432c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"] };
var faUserNinja = { prefix: 'fas', iconName: 'user-ninja', icon: [448, 512, [], "f504", "M325.4 289.2L224 390.6 122.6 289.2C54 295.3 0 352.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-70.2-54-127.1-122.6-133.2zM32 192c27.3 0 51.8-11.5 69.2-29.7 15.1 53.9 64 93.7 122.8 93.7 70.7 0 128-57.3 128-128S294.7 0 224 0c-50.4 0-93.6 29.4-114.5 71.8C92.1 47.8 64 32 32 32c0 33.4 17.1 62.8 43.1 80-26 17.2-43.1 46.6-43.1 80zm144-96h96c17.7 0 32 14.3 32 32H144c0-17.7 14.3-32 32-32z"] };
var faUserPlus = { prefix: 'fas', iconName: 'user-plus', icon: [640, 512, [], "f234", "M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"] };
var faUserSecret = { prefix: 'fas', iconName: 'user-secret', icon: [448, 512, [], "f21b", "M383.9 308.3l23.9-62.6c4-10.5-3.7-21.7-15-21.7h-58.5c11-18.9 17.8-40.6 17.8-64v-.3c39.2-7.8 64-19.1 64-31.7 0-13.3-27.3-25.1-70.1-33-9.2-32.8-27-65.8-40.6-82.8-9.5-11.9-25.9-15.6-39.5-8.8l-27.6 13.8c-9 4.5-19.6 4.5-28.6 0L182.1 3.4c-13.6-6.8-30-3.1-39.5 8.8-13.5 17-31.4 50-40.6 82.8-42.7 7.9-70 19.7-70 33 0 12.6 24.8 23.9 64 31.7v.3c0 23.4 6.8 45.1 17.8 64H56.3c-11.5 0-19.2 11.7-14.7 22.3l25.8 60.2C27.3 329.8 0 372.7 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-48.4-25.8-90.4-64.1-114.1zM176 480l-41.6-192 49.6 32 24 40-32 120zm96 0l-32-120 24-40 49.6-32L272 480zm41.7-298.5c-3.9 11.9-7 24.6-16.5 33.4-10.1 9.3-48 22.4-64-25-2.8-8.4-15.4-8.4-18.3 0-17 50.2-56 32.4-64 25-9.5-8.8-12.7-21.5-16.5-33.4-.8-2.5-6.3-5.7-6.3-5.8v-10.8c28.3 3.6 61 5.8 96 5.8s67.7-2.1 96-5.8v10.8c-.1.1-5.6 3.2-6.4 5.8z"] };
var faUserShield = { prefix: 'fas', iconName: 'user-shield', icon: [640, 512, [], "f505", "M622.3 271.1l-115.2-45c-4.1-1.6-12.6-3.7-22.2 0l-115.2 45c-10.7 4.2-17.7 14-17.7 24.9 0 111.6 68.7 188.8 132.9 213.9 9.6 3.7 18 1.6 22.2 0C558.4 489.9 640 420.5 640 296c0-10.9-7-20.7-17.7-24.9zM496 462.4V273.3l95.5 37.3c-5.6 87.1-60.9 135.4-95.5 151.8zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm96 40c0-2.5.8-4.8 1.1-7.2-2.5-.1-4.9-.8-7.5-.8h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c6.8 0 13.3-1.5 19.2-4-54-42.9-99.2-116.7-99.2-212z"] };
var faUserSlash = { prefix: 'fas', iconName: 'user-slash', icon: [640, 512, [], "f506", "M633.8 458.1L362.3 248.3C412.1 230.7 448 183.8 448 128 448 57.3 390.7 0 320 0c-67.1 0-121.5 51.8-126.9 117.4L45.5 3.4C38.5-2 28.5-.8 23 6.2L3.4 31.4c-5.4 7-4.2 17 2.8 22.4l588.4 454.7c7 5.4 17 4.2 22.5-2.8l19.6-25.3c5.4-6.8 4.1-16.9-2.9-22.3zM96 422.4V464c0 26.5 21.5 48 48 48h350.2L207.4 290.3C144.2 301.3 96 356 96 422.4z"] };
var faUserTag = { prefix: 'fas', iconName: 'user-tag', icon: [640, 512, [], "f507", "M630.6 364.9l-90.3-90.2c-12-12-28.3-18.7-45.3-18.7h-79.3c-17.7 0-32 14.3-32 32v79.2c0 17 6.7 33.2 18.7 45.2l90.3 90.2c12.5 12.5 32.8 12.5 45.3 0l92.5-92.5c12.6-12.5 12.6-32.7.1-45.2zm-182.8-21c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24c0 13.2-10.7 24-24 24zm-223.8-88c70.7 0 128-57.3 128-128C352 57.3 294.7 0 224 0S96 57.3 96 128c0 70.6 57.3 127.9 128 127.9zm127.8 111.2V294c-12.2-3.6-24.9-6.2-38.2-6.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 287.9 0 348.1 0 422.3v41.6c0 26.5 21.5 48 48 48h352c15.5 0 29.1-7.5 37.9-18.9l-58-58c-18.1-18.1-28.1-42.2-28.1-67.9z"] };
var faUserTie = { prefix: 'fas', iconName: 'user-tie', icon: [448, 512, [], "f508", "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z"] };
var faUserTimes = { prefix: 'fas', iconName: 'user-times', icon: [640, 512, [], "f235", "M589.6 240l45.6-45.6c6.3-6.3 6.3-16.5 0-22.8l-22.8-22.8c-6.3-6.3-16.5-6.3-22.8 0L544 194.4l-45.6-45.6c-6.3-6.3-16.5-6.3-22.8 0l-22.8 22.8c-6.3 6.3-6.3 16.5 0 22.8l45.6 45.6-45.6 45.6c-6.3 6.3-6.3 16.5 0 22.8l22.8 22.8c6.3 6.3 16.5 6.3 22.8 0l45.6-45.6 45.6 45.6c6.3 6.3 16.5 6.3 22.8 0l22.8-22.8c6.3-6.3 6.3-16.5 0-22.8L589.6 240zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"] };
var faUsers = { prefix: 'fas', iconName: 'users', icon: [640, 512, [], "f0c0", "M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"] };
var faUsersCog = { prefix: 'fas', iconName: 'users-cog', icon: [640, 512, [], "f509", "M610.5 341.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 368.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm224 32c1.9 0 3.7-.5 5.6-.6 8.3-21.7 20.5-42.1 36.3-59.2 7.4-8 17.9-12.6 28.9-12.6 6.9 0 13.7 1.8 19.6 5.3l7.9 4.6c.8-.5 1.6-.9 2.4-1.4 7-14.6 11.2-30.8 11.2-48 0-61.9-50.1-112-112-112S208 82.1 208 144c0 61.9 50.1 112 112 112zm105.2 194.5c-2.3-1.2-4.6-2.6-6.8-3.9-8.2 4.8-15.3 9.8-27.5 9.8-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-10.7-34.5 24.9-49.7 25.8-50.3-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-3.8-2.2-7-5-9.8-8.1-3.3.2-6.5.6-9.8.6-24.6 0-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h255.4c-3.7-6-6.2-12.8-6.2-20.3v-9.2zM173.1 274.6C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"] };
var faUtensilSpoon = { prefix: 'fas', iconName: 'utensil-spoon', icon: [512, 512, [], "f2e5", "M480.1 31.9c-55-55.1-164.9-34.5-227.8 28.5-49.3 49.3-55.1 110-28.8 160.4L9 413.2c-11.6 10.5-12.1 28.5-1 39.5L59.3 504c11 11 29.1 10.5 39.5-1.1l192.4-214.4c50.4 26.3 111.1 20.5 160.4-28.8 63-62.9 83.6-172.8 28.5-227.8z"] };
var faUtensils = { prefix: 'fas', iconName: 'utensils', icon: [416, 512, [], "f2e7", "M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z"] };
var faVenus = { prefix: 'fas', iconName: 'venus', icon: [288, 512, [], "f221", "M288 176c0-79.5-64.5-144-144-144S0 96.5 0 176c0 68.5 47.9 125.9 112 140.4V368H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.5 112-71.9 112-140.4zm-224 0c0-44.1 35.9-80 80-80s80 35.9 80 80-35.9 80-80 80-80-35.9-80-80z"] };
var faVenusDouble = { prefix: 'fas', iconName: 'venus-double', icon: [512, 512, [], "f226", "M288 176c0-79.5-64.5-144-144-144S0 96.5 0 176c0 68.5 47.9 125.9 112 140.4V368H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.5 112-71.9 112-140.4zm-224 0c0-44.1 35.9-80 80-80s80 35.9 80 80-35.9 80-80 80-80-35.9-80-80zm336 140.4V368h36c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-36v36c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-36h-36c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h36v-51.6c-21.2-4.8-40.6-14.3-57.2-27.3 14-16.7 25-36 32.1-57.1 14.5 14.8 34.7 24 57.1 24 44.1 0 80-35.9 80-80s-35.9-80-80-80c-22.3 0-42.6 9.2-57.1 24-7.1-21.1-18-40.4-32.1-57.1C303.4 43.6 334.3 32 368 32c79.5 0 144 64.5 144 144 0 68.5-47.9 125.9-112 140.4z"] };
var faVenusMars = { prefix: 'fas', iconName: 'venus-mars', icon: [576, 512, [], "f228", "M564 0h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-48.7 48.7C422.5 72.1 396.2 64 368 64c-33.7 0-64.6 11.6-89.2 30.9 14 16.7 25 36 32.1 57.1 14.5-14.8 34.7-24 57.1-24 44.1 0 80 35.9 80 80s-35.9 80-80 80c-22.3 0-42.6-9.2-57.1-24-7.1 21.1-18 40.4-32.1 57.1 24.5 19.4 55.5 30.9 89.2 30.9 79.5 0 144-64.5 144-144 0-28.2-8.1-54.5-22.1-76.7l48.7-48.7 16.9 16.9c2.4 2.4 5.4 3.5 8.4 3.5 6.2 0 12.1-4.8 12.1-12V12c0-6.6-5.4-12-12-12zM144 64C64.5 64 0 128.5 0 208c0 68.5 47.9 125.9 112 140.4V400H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.6 112-71.9 112-140.4 0-79.5-64.5-144-144-144zm0 224c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"] };
var faVial = { prefix: 'fas', iconName: 'vial', icon: [480, 512, [], "f492", "M477.7 186.1L309.5 18.3c-3.1-3.1-8.2-3.1-11.3 0l-34 33.9c-3.1 3.1-3.1 8.2 0 11.3l11.2 11.1L33 316.5c-38.8 38.7-45.1 102-9.4 143.5 20.6 24 49.5 36 78.4 35.9 26.4 0 52.8-10 72.9-30.1l246.3-245.7 11.2 11.1c3.1 3.1 8.2 3.1 11.3 0l34-33.9c3.1-3 3.1-8.1 0-11.2zM318 256H161l148-147.7 78.5 78.3L318 256z"] };
var faVials = { prefix: 'fas', iconName: 'vials', icon: [640, 512, [], "f493", "M72 64h24v240c0 44.1 35.9 80 80 80s80-35.9 80-80V64h24c4.4 0 8-3.6 8-8V8c0-4.4-3.6-8-8-8H72c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm72 0h64v96h-64V64zm480 384H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM360 64h24v240c0 44.1 35.9 80 80 80s80-35.9 80-80V64h24c4.4 0 8-3.6 8-8V8c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm72 0h64v96h-64V64z"] };
var faVideo = { prefix: 'fas', iconName: 'video', icon: [576, 512, [], "f03d", "M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"] };
var faVideoSlash = { prefix: 'fas', iconName: 'video-slash', icon: [640, 512, [], "f4e2", "M633.8 458.1l-55-42.5c15.4-1.4 29.2-13.7 29.2-31.1v-257c0-25.5-29.1-40.4-50.4-25.8L448 177.3v137.2l-32-24.7v-178c0-26.4-21.4-47.8-47.8-47.8H123.9L45.5 3.4C38.5-2 28.5-.8 23 6.2L3.4 31.4c-5.4 7-4.2 17 2.8 22.4L42.7 82 416 370.6l178.5 138c7 5.4 17 4.2 22.5-2.8l19.6-25.3c5.5-6.9 4.2-17-2.8-22.4zM32 400.2c0 26.4 21.4 47.8 47.8 47.8h288.4c11.2 0 21.4-4 29.6-10.5L32 154.7v245.5z"] };
var faVolleyballBall = { prefix: 'fas', iconName: 'volleyball-ball', icon: [495, 512, [], "f45f", "M223.3 243.4c-.9-37-8.6-72.8-22.7-105.7-90.8 42.4-157.5 122.4-180.3 216.8 13.4 30.8 32.9 58.3 56.9 81.1 22.7-79.2 74.2-147.8 146.1-192.2zM186.4 109c-15-26.4-34.5-50.1-57.4-70.7C38 88.1-15.8 191.2 4 300.5c33.4-83.1 98.4-152 182.4-191.5zM374 274.1c8.6-99.8-27.3-197.5-97.5-264.4-14.7-1.7-51.6-5.5-98.9 8.5 57.3 59.3 91 138.2 93.5 222.7 32.5 17.7 67.3 29 102.9 33.2zm-124.7 9.5c-31.6 19.3-58.7 43.9-80.2 72.6 82 57.3 184.5 75.1 277.5 47.8 19.7-26.4 34.2-56.8 42.2-89.9-26.6 6.6-53.7 10.4-80.9 10.4-54.6-.1-108.9-14.1-158.6-40.9zM151 383.3c-15.2 26-25.7 54.4-32.1 84.2 37.6 23 81.7 36.5 129.1 36.5 61 0 116.7-22.1 159.9-58.6C295 461.5 204.6 420.6 151 383.3zM331.3 22.7c55.3 70.4 82.5 161.2 74.6 253.6 30.3.2 60.5-4.8 89.7-14.2 0-2 .3-4 .3-6 0-107.8-68.7-199.1-164.6-233.4z"] };
var faVolumeDown = { prefix: 'fas', iconName: 'volume-down', icon: [384, 512, [], "f027", "M256 88.017v335.964c0 21.438-25.943 31.998-40.971 16.971L126.059 352H24c-13.255 0-24-10.745-24-24V184c0-13.255 10.745-24 24-24h102.059l88.971-88.954c15.01-15.01 40.97-4.49 40.97 16.971zM384 256c0-33.717-17.186-64.35-45.972-81.944-15.079-9.214-34.775-4.463-43.992 10.616s-4.464 34.775 10.615 43.992C314.263 234.538 320 244.757 320 256a32.056 32.056 0 0 1-13.802 26.332c-14.524 10.069-18.136 30.006-8.067 44.53 10.07 14.525 30.008 18.136 44.53 8.067C368.546 316.983 384 287.478 384 256z"] };
var faVolumeOff = { prefix: 'fas', iconName: 'volume-off', icon: [256, 512, [], "f026", "M256 88.017v335.964c0 21.438-25.943 31.998-40.971 16.971L126.059 352H24c-13.255 0-24-10.745-24-24V184c0-13.255 10.745-24 24-24h102.059l88.971-88.954c15.01-15.01 40.97-4.49 40.97 16.971z"] };
var faVolumeUp = { prefix: 'fas', iconName: 'volume-up', icon: [576, 512, [], "f028", "M256 88.017v335.964c0 21.438-25.943 31.998-40.971 16.971L126.059 352H24c-13.255 0-24-10.745-24-24V184c0-13.255 10.745-24 24-24h102.059l88.971-88.954c15.01-15.01 40.97-4.49 40.97 16.971zm182.056-77.876C422.982.92 403.283 5.668 394.061 20.745c-9.221 15.077-4.473 34.774 10.604 43.995C468.967 104.063 512 174.983 512 256c0 73.431-36.077 142.292-96.507 184.206-14.522 10.072-18.129 30.01-8.057 44.532 10.076 14.528 30.016 18.126 44.531 8.057C529.633 438.927 576 350.406 576 256c0-103.244-54.579-194.877-137.944-245.859zM480 256c0-68.547-36.15-129.777-91.957-163.901-15.076-9.22-34.774-4.471-43.994 10.607-9.22 15.078-4.471 34.774 10.607 43.994C393.067 170.188 416 211.048 416 256c0 41.964-20.62 81.319-55.158 105.276-14.521 10.073-18.128 30.01-8.056 44.532 6.216 8.96 16.185 13.765 26.322 13.765a31.862 31.862 0 0 0 18.21-5.709C449.091 377.953 480 318.938 480 256zm-96 0c0-33.717-17.186-64.35-45.972-81.944-15.079-9.214-34.775-4.463-43.992 10.616s-4.464 34.775 10.615 43.992C314.263 234.538 320 244.757 320 256a32.056 32.056 0 0 1-13.802 26.332c-14.524 10.069-18.136 30.006-8.067 44.53 10.07 14.525 30.008 18.136 44.53 8.067C368.546 316.983 384 287.478 384 256z"] };
var faWalking = { prefix: 'fas', iconName: 'walking', icon: [320, 512, [], "f554", "M208 96c26.5 0 48-21.5 48-48S234.5 0 208 0s-48 21.5-48 48 21.5 48 48 48zm94.5 149.1l-23.3-11.8-9.7-29.4c-14.7-44.6-55.7-75.8-102.2-75.9-36-.1-55.9 10.1-93.3 25.2-21.6 8.7-39.3 25.2-49.7 46.2L17.6 213c-7.8 15.8-1.5 35 14.2 42.9 15.6 7.9 34.6 1.5 42.5-14.3L81 228c3.5-7 9.3-12.5 16.5-15.4l26.8-10.8-15.2 60.7c-5.2 20.8.4 42.9 14.9 58.8l59.9 65.4c7.2 7.9 12.3 17.4 14.9 27.7l18.3 73.3c4.3 17.1 21.7 27.6 38.8 23.3 17.1-4.3 27.6-21.7 23.3-38.8l-22.2-89c-2.6-10.3-7.7-19.9-14.9-27.7l-45.5-49.7 17.2-68.7 5.5 16.5c5.3 16.1 16.7 29.4 31.7 37l23.3 11.8c15.6 7.9 34.6 1.5 42.5-14.3 7.7-15.7 1.4-35.1-14.3-43zM73.6 385.8c-3.2 8.1-8 15.4-14.2 21.5l-50 50.1c-12.5 12.5-12.5 32.8 0 45.3s32.7 12.5 45.2 0l59.4-59.4c6.1-6.1 10.9-13.4 14.2-21.5l13.5-33.8c-55.3-60.3-38.7-41.8-47.4-53.7l-20.7 51.5z"] };
var faWallet = { prefix: 'fas', iconName: 'wallet', icon: [512, 512, [], "f555", "M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"] };
var faWarehouse = { prefix: 'fas', iconName: 'warehouse', icon: [640, 512, [], "f494", "M504 352H136.4c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 96H136.1c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0-192H136.6c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm106.5-139L338.4 3.7a48.15 48.15 0 0 0-36.9 0L29.5 117C11.7 124.5 0 141.9 0 161.3V504c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V256c0-17.6 14.6-32 32.6-32h382.8c18 0 32.6 14.4 32.6 32v248c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V161.3c0-19.4-11.7-36.8-29.5-44.3z"] };
var faWeight = { prefix: 'fas', iconName: 'weight', icon: [512, 512, [], "f496", "M448 64h-26c16.4 28.3 26 61 26 96 0 105.9-86.1 192-192 192S64 265.9 64 160c0-35 9.6-67.7 26-96H64C28.7 64 0 92.7 0 128v320c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64zM256 320c88.4 0 160-71.6 160-160S344.4 0 256 0 96 71.6 96 160s71.6 160 160 160zm-.3-151.9l33.6-78.4c3.5-8.2 12.9-11.9 21-8.4s11.9 12.9 8.4 21L285 180.9c6.7 7.1 10.9 16.6 10.9 27.1 0 22.1-17.9 40-40 40s-40-17.9-40-40c.1-22 17.9-39.8 39.8-39.9z"] };
var faWheelchair = { prefix: 'fas', iconName: 'wheelchair', icon: [512, 512, [], "f193", "M496.101 385.669l14.227 28.663c3.929 7.915.697 17.516-7.218 21.445l-65.465 32.886c-16.049 7.967-35.556 1.194-43.189-15.055L331.679 320H192c-15.925 0-29.426-11.71-31.679-27.475C126.433 55.308 128.38 70.044 128 64c0-36.358 30.318-65.635 67.052-63.929 33.271 1.545 60.048 28.905 60.925 62.201.868 32.933-23.152 60.423-54.608 65.039l4.67 32.69H336c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H215.182l4.572 32H352a32 32 0 0 1 28.962 18.392L438.477 396.8l36.178-18.349c7.915-3.929 17.517-.697 21.446 7.218zM311.358 352h-24.506c-7.788 54.204-54.528 96-110.852 96-61.757 0-112-50.243-112-112 0-41.505 22.694-77.809 56.324-97.156-3.712-25.965-6.844-47.86-9.488-66.333C45.956 198.464 0 261.963 0 336c0 97.047 78.953 176 176 176 71.87 0 133.806-43.308 161.11-105.192L311.358 352z"] };
var faWifi = { prefix: 'fas', iconName: 'wifi', icon: [640, 512, [], "f1eb", "M384 416c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-35.346 28.654-64 64-64s64 28.654 64 64zm136.659-124.443c6.465-6.465 6.245-17.065-.564-23.167-113.793-101.985-286.526-101.869-400.19 0-6.809 6.102-7.029 16.702-.564 23.167l34.006 34.006c5.927 5.927 15.464 6.32 21.769.796 82.88-72.609 207.074-72.447 289.768 0 6.305 5.524 15.842 5.132 21.769-.796l34.006-34.006zm112.11-113.718c6.385-6.385 6.254-16.816-.35-22.973-175.768-163.86-449.134-163.8-624.837 0-6.604 6.157-6.735 16.589-.35 22.973l33.966 33.966c6.095 6.095 15.891 6.231 22.224.383 144.763-133.668 368.356-133.702 513.156 0 6.333 5.848 16.129 5.712 22.224-.383l33.967-33.966z"] };
var faWindowClose = { prefix: 'fas', iconName: 'window-close', icon: [512, 512, [], "f410", "M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"] };
var faWindowMaximize = { prefix: 'fas', iconName: 'window-maximize', icon: [512, 512, [], "f2d0", "M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-16 160H64v-84c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12v84z"] };
var faWindowMinimize = { prefix: 'fas', iconName: 'window-minimize', icon: [512, 512, [], "f2d1", "M464 352H48c-26.5 0-48 21.5-48 48v32c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-32c0-26.5-21.5-48-48-48z"] };
var faWindowRestore = { prefix: 'fas', iconName: 'window-restore', icon: [512, 512, [], "f2d2", "M512 48v288c0 26.5-21.5 48-48 48h-48V176c0-44.1-35.9-80-80-80H128V48c0-26.5 21.5-48 48-48h288c26.5 0 48 21.5 48 48zM384 176v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48h288c26.5 0 48 21.5 48 48zm-68 28c0-6.6-5.4-12-12-12H76c-6.6 0-12 5.4-12 12v52h252v-52z"] };
var faWineGlass = { prefix: 'fas', iconName: 'wine-glass', icon: [288, 512, [], "f4e3", "M287.4 192.7l-16-178.1C270.7 6.3 263.9 0 255.7 0H32.3c-8.2 0-15 6.3-15.7 14.6L.6 192.7c-7.2 80 50.7 148.9 127.4 157.6V480H74.1c-24.5 0-33.2 32-20 32h179.8c13.1 0 4.5-32-20-32H160V350.3c76.7-8.8 134.6-77.6 127.4-157.6zM226.2 48l7.2 80H54.6l7.2-80h164.4z"] };
var faWonSign = { prefix: 'fas', iconName: 'won-sign', icon: [576, 512, [], "f159", "M564 192c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-48.028l18.572-80.61c1.732-7.518-3.978-14.694-11.693-14.694h-46.107a11.998 11.998 0 0 0-11.736 9.5L450.73 128H340.839l-19.725-85.987a12 12 0 0 0-11.696-9.317H265.43a12 12 0 0 0-11.687 9.277L233.696 128H124.975L107.5 42.299a12 12 0 0 0-11.758-9.602H53.628c-7.686 0-13.39 7.124-11.709 14.624L60 128H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h62.342l7.171 32H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h83.856l40.927 182.624A12 12 0 0 0 148.492 480h56.767c5.583 0 10.428-3.85 11.689-9.288L259.335 288h55.086l42.386 182.712A12 12 0 0 0 368.496 480h56.826a12 12 0 0 0 11.694-9.306L479.108 288H564c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-70.146l7.373-32H564zm-425.976 0h80.757l-7.457 32h-66.776l-6.524-32zm45.796 150.029c-6.194 25.831-6.758 47.25-7.321 47.25h-1.126s-1.689-22.05-6.758-47.25L157.599 288h38.812l-12.591 54.029zM274.182 224l1.996-8.602c1.856-7.962 3.457-15.968 4.803-23.398h11.794c1.347 7.43 2.947 15.436 4.803 23.398l1.996 8.602h-25.392zm130.959 118.029c-5.068 25.2-6.758 47.25-6.758 47.25h-1.126c-.563 0-1.126-21.42-7.321-47.25L377.542 288h39.107l-11.508 54.029zM430.281 224h-67.42l-7.34-32h81.577l-6.817 32z"] };
var faWrench = { prefix: 'fas', iconName: 'wrench', icon: [512, 512, [], "f0ad", "M507.73 109.1c-2.24-9.03-13.54-12.09-20.12-5.51l-74.36 74.36-67.88-11.31-11.31-67.88 74.36-74.36c6.62-6.62 3.43-17.9-5.66-20.16-47.38-11.74-99.55.91-136.58 37.93-39.64 39.64-50.55 97.1-34.05 147.2L18.74 402.76c-24.99 24.99-24.99 65.51 0 90.5 24.99 24.99 65.51 24.99 90.5 0l213.21-213.21c50.12 16.71 107.47 5.68 147.37-34.22 37.07-37.07 49.7-89.32 37.91-136.73zM64 472c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"] };
var faXRay = { prefix: 'fas', iconName: 'x-ray', icon: [640, 512, [], "f497", "M240 384c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm160 32c8.8 0 16-7.2 16-16s-7.2-16-16-16-16 7.2-16 16 7.2 16 16 16zM624 0H16C7.2 0 0 7.2 0 16v32c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16zm0 448h-48V96H64v352H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM480 248c0 4.4-3.6 8-8 8H336v32h104c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H336v32h64c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48v-16h-64v16c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48h64v-32H200c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h104v-32H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h136v-32H200c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h104v-24c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v24h104c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H336v32h136c4.4 0 8 3.6 8 8v16z"] };
var faYenSign = { prefix: 'fas', iconName: 'yen-sign', icon: [384, 512, [], "f157", "M351.208 32h-65.277a12 12 0 0 0-10.778 6.724l-55.39 113.163c-14.513 34.704-27.133 71.932-27.133 71.932h-1.262s-12.62-37.228-27.133-71.932l-55.39-113.163A11.997 11.997 0 0 0 98.068 32H32.792c-9.057 0-14.85 9.65-10.59 17.643L102.322 200H44c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h88.162L152 293.228V320H44c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h108v92c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-92h108c6.627 0 12-5.373 12-12v-32c0-6.627-5.373-12-12-12H232v-26.772L251.838 256H340c6.627 0 12-5.373 12-12v-32c0-6.627-5.373-12-12-12h-58.322l80.12-150.357C366.058 41.65 360.266 32 351.208 32z"] };
var _iconsCache = {
  faAddressBook: faAddressBook,
  faAddressCard: faAddressCard,
  faAdjust: faAdjust,
  faAlignCenter: faAlignCenter,
  faAlignJustify: faAlignJustify,
  faAlignLeft: faAlignLeft,
  faAlignRight: faAlignRight,
  faAllergies: faAllergies,
  faAmbulance: faAmbulance,
  faAmericanSignLanguageInterpreting: faAmericanSignLanguageInterpreting,
  faAnchor: faAnchor,
  faAngleDoubleDown: faAngleDoubleDown,
  faAngleDoubleLeft: faAngleDoubleLeft,
  faAngleDoubleRight: faAngleDoubleRight,
  faAngleDoubleUp: faAngleDoubleUp,
  faAngleDown: faAngleDown,
  faAngleLeft: faAngleLeft,
  faAngleRight: faAngleRight,
  faAngleUp: faAngleUp,
  faArchive: faArchive,
  faArrowAltCircleDown: faArrowAltCircleDown,
  faArrowAltCircleLeft: faArrowAltCircleLeft,
  faArrowAltCircleRight: faArrowAltCircleRight,
  faArrowAltCircleUp: faArrowAltCircleUp,
  faArrowCircleDown: faArrowCircleDown,
  faArrowCircleLeft: faArrowCircleLeft,
  faArrowCircleRight: faArrowCircleRight,
  faArrowCircleUp: faArrowCircleUp,
  faArrowDown: faArrowDown,
  faArrowLeft: faArrowLeft,
  faArrowRight: faArrowRight,
  faArrowUp: faArrowUp,
  faArrowsAlt: faArrowsAlt,
  faArrowsAltH: faArrowsAltH,
  faArrowsAltV: faArrowsAltV,
  faAssistiveListeningSystems: faAssistiveListeningSystems,
  faAsterisk: faAsterisk,
  faAt: faAt,
  faAudioDescription: faAudioDescription,
  faBackward: faBackward,
  faBalanceScale: faBalanceScale,
  faBan: faBan,
  faBandAid: faBandAid,
  faBarcode: faBarcode,
  faBars: faBars,
  faBaseballBall: faBaseballBall,
  faBasketballBall: faBasketballBall,
  faBath: faBath,
  faBatteryEmpty: faBatteryEmpty,
  faBatteryFull: faBatteryFull,
  faBatteryHalf: faBatteryHalf,
  faBatteryQuarter: faBatteryQuarter,
  faBatteryThreeQuarters: faBatteryThreeQuarters,
  faBed: faBed,
  faBeer: faBeer,
  faBell: faBell,
  faBellSlash: faBellSlash,
  faBicycle: faBicycle,
  faBinoculars: faBinoculars,
  faBirthdayCake: faBirthdayCake,
  faBlender: faBlender,
  faBlind: faBlind,
  faBold: faBold,
  faBolt: faBolt,
  faBomb: faBomb,
  faBook: faBook,
  faBookOpen: faBookOpen,
  faBookmark: faBookmark,
  faBowlingBall: faBowlingBall,
  faBox: faBox,
  faBoxOpen: faBoxOpen,
  faBoxes: faBoxes,
  faBraille: faBraille,
  faBriefcase: faBriefcase,
  faBriefcaseMedical: faBriefcaseMedical,
  faBroadcastTower: faBroadcastTower,
  faBroom: faBroom,
  faBug: faBug,
  faBuilding: faBuilding,
  faBullhorn: faBullhorn,
  faBullseye: faBullseye,
  faBurn: faBurn,
  faBus: faBus,
  faCalculator: faCalculator,
  faCalendar: faCalendar,
  faCalendarAlt: faCalendarAlt,
  faCalendarCheck: faCalendarCheck,
  faCalendarMinus: faCalendarMinus,
  faCalendarPlus: faCalendarPlus,
  faCalendarTimes: faCalendarTimes,
  faCamera: faCamera,
  faCameraRetro: faCameraRetro,
  faCapsules: faCapsules,
  faCar: faCar,
  faCaretDown: faCaretDown,
  faCaretLeft: faCaretLeft,
  faCaretRight: faCaretRight,
  faCaretSquareDown: faCaretSquareDown,
  faCaretSquareLeft: faCaretSquareLeft,
  faCaretSquareRight: faCaretSquareRight,
  faCaretSquareUp: faCaretSquareUp,
  faCaretUp: faCaretUp,
  faCartArrowDown: faCartArrowDown,
  faCartPlus: faCartPlus,
  faCertificate: faCertificate,
  faChalkboard: faChalkboard,
  faChalkboardTeacher: faChalkboardTeacher,
  faChartArea: faChartArea,
  faChartBar: faChartBar,
  faChartLine: faChartLine,
  faChartPie: faChartPie,
  faCheck: faCheck,
  faCheckCircle: faCheckCircle,
  faCheckSquare: faCheckSquare,
  faChess: faChess,
  faChessBishop: faChessBishop,
  faChessBoard: faChessBoard,
  faChessKing: faChessKing,
  faChessKnight: faChessKnight,
  faChessPawn: faChessPawn,
  faChessQueen: faChessQueen,
  faChessRook: faChessRook,
  faChevronCircleDown: faChevronCircleDown,
  faChevronCircleLeft: faChevronCircleLeft,
  faChevronCircleRight: faChevronCircleRight,
  faChevronCircleUp: faChevronCircleUp,
  faChevronDown: faChevronDown,
  faChevronLeft: faChevronLeft,
  faChevronRight: faChevronRight,
  faChevronUp: faChevronUp,
  faChild: faChild,
  faChurch: faChurch,
  faCircle: faCircle,
  faCircleNotch: faCircleNotch,
  faClipboard: faClipboard,
  faClipboardCheck: faClipboardCheck,
  faClipboardList: faClipboardList,
  faClock: faClock,
  faClone: faClone,
  faClosedCaptioning: faClosedCaptioning,
  faCloud: faCloud,
  faCloudDownloadAlt: faCloudDownloadAlt,
  faCloudUploadAlt: faCloudUploadAlt,
  faCode: faCode,
  faCodeBranch: faCodeBranch,
  faCoffee: faCoffee,
  faCog: faCog,
  faCogs: faCogs,
  faCoins: faCoins,
  faColumns: faColumns,
  faComment: faComment,
  faCommentAlt: faCommentAlt,
  faCommentDots: faCommentDots,
  faCommentSlash: faCommentSlash,
  faComments: faComments,
  faCompactDisc: faCompactDisc,
  faCompass: faCompass,
  faCompress: faCompress,
  faCopy: faCopy,
  faCopyright: faCopyright,
  faCouch: faCouch,
  faCreditCard: faCreditCard,
  faCrop: faCrop,
  faCrosshairs: faCrosshairs,
  faCrow: faCrow,
  faCrown: faCrown,
  faCube: faCube,
  faCubes: faCubes,
  faCut: faCut,
  faDatabase: faDatabase,
  faDeaf: faDeaf,
  faDesktop: faDesktop,
  faDiagnoses: faDiagnoses,
  faDice: faDice,
  faDiceFive: faDiceFive,
  faDiceFour: faDiceFour,
  faDiceOne: faDiceOne,
  faDiceSix: faDiceSix,
  faDiceThree: faDiceThree,
  faDiceTwo: faDiceTwo,
  faDivide: faDivide,
  faDna: faDna,
  faDollarSign: faDollarSign,
  faDolly: faDolly,
  faDollyFlatbed: faDollyFlatbed,
  faDonate: faDonate,
  faDoorClosed: faDoorClosed,
  faDoorOpen: faDoorOpen,
  faDotCircle: faDotCircle,
  faDove: faDove,
  faDownload: faDownload,
  faDumbbell: faDumbbell,
  faEdit: faEdit,
  faEject: faEject,
  faEllipsisH: faEllipsisH,
  faEllipsisV: faEllipsisV,
  faEnvelope: faEnvelope,
  faEnvelopeOpen: faEnvelopeOpen,
  faEnvelopeSquare: faEnvelopeSquare,
  faEquals: faEquals,
  faEraser: faEraser,
  faEuroSign: faEuroSign,
  faExchangeAlt: faExchangeAlt,
  faExclamation: faExclamation,
  faExclamationCircle: faExclamationCircle,
  faExclamationTriangle: faExclamationTriangle,
  faExpand: faExpand,
  faExpandArrowsAlt: faExpandArrowsAlt,
  faExternalLinkAlt: faExternalLinkAlt,
  faExternalLinkSquareAlt: faExternalLinkSquareAlt,
  faEye: faEye,
  faEyeDropper: faEyeDropper,
  faEyeSlash: faEyeSlash,
  faFastBackward: faFastBackward,
  faFastForward: faFastForward,
  faFax: faFax,
  faFeather: faFeather,
  faFemale: faFemale,
  faFighterJet: faFighterJet,
  faFile: faFile,
  faFileAlt: faFileAlt,
  faFileArchive: faFileArchive,
  faFileAudio: faFileAudio,
  faFileCode: faFileCode,
  faFileExcel: faFileExcel,
  faFileImage: faFileImage,
  faFileMedical: faFileMedical,
  faFileMedicalAlt: faFileMedicalAlt,
  faFilePdf: faFilePdf,
  faFilePowerpoint: faFilePowerpoint,
  faFileVideo: faFileVideo,
  faFileWord: faFileWord,
  faFilm: faFilm,
  faFilter: faFilter,
  faFire: faFire,
  faFireExtinguisher: faFireExtinguisher,
  faFirstAid: faFirstAid,
  faFlag: faFlag,
  faFlagCheckered: faFlagCheckered,
  faFlask: faFlask,
  faFolder: faFolder,
  faFolderOpen: faFolderOpen,
  faFont: faFont,
  faFontAwesomeLogoFull: faFontAwesomeLogoFull,
  faFootballBall: faFootballBall,
  faForward: faForward,
  faFrog: faFrog,
  faFrown: faFrown,
  faFutbol: faFutbol,
  faGamepad: faGamepad,
  faGasPump: faGasPump,
  faGavel: faGavel,
  faGem: faGem,
  faGenderless: faGenderless,
  faGift: faGift,
  faGlassMartini: faGlassMartini,
  faGlasses: faGlasses,
  faGlobe: faGlobe,
  faGolfBall: faGolfBall,
  faGraduationCap: faGraduationCap,
  faGreaterThan: faGreaterThan,
  faGreaterThanEqual: faGreaterThanEqual,
  faHSquare: faHSquare,
  faHandHolding: faHandHolding,
  faHandHoldingHeart: faHandHoldingHeart,
  faHandHoldingUsd: faHandHoldingUsd,
  faHandLizard: faHandLizard,
  faHandPaper: faHandPaper,
  faHandPeace: faHandPeace,
  faHandPointDown: faHandPointDown,
  faHandPointLeft: faHandPointLeft,
  faHandPointRight: faHandPointRight,
  faHandPointUp: faHandPointUp,
  faHandPointer: faHandPointer,
  faHandRock: faHandRock,
  faHandScissors: faHandScissors,
  faHandSpock: faHandSpock,
  faHands: faHands,
  faHandsHelping: faHandsHelping,
  faHandshake: faHandshake,
  faHashtag: faHashtag,
  faHdd: faHdd,
  faHeading: faHeading,
  faHeadphones: faHeadphones,
  faHeart: faHeart,
  faHeartbeat: faHeartbeat,
  faHelicopter: faHelicopter,
  faHistory: faHistory,
  faHockeyPuck: faHockeyPuck,
  faHome: faHome,
  faHospital: faHospital,
  faHospitalAlt: faHospitalAlt,
  faHospitalSymbol: faHospitalSymbol,
  faHourglass: faHourglass,
  faHourglassEnd: faHourglassEnd,
  faHourglassHalf: faHourglassHalf,
  faHourglassStart: faHourglassStart,
  faICursor: faICursor,
  faIdBadge: faIdBadge,
  faIdCard: faIdCard,
  faIdCardAlt: faIdCardAlt,
  faImage: faImage,
  faImages: faImages,
  faInbox: faInbox,
  faIndent: faIndent,
  faIndustry: faIndustry,
  faInfinity: faInfinity,
  faInfo: faInfo,
  faInfoCircle: faInfoCircle,
  faItalic: faItalic,
  faKey: faKey,
  faKeyboard: faKeyboard,
  faKiwiBird: faKiwiBird,
  faLanguage: faLanguage,
  faLaptop: faLaptop,
  faLeaf: faLeaf,
  faLemon: faLemon,
  faLessThan: faLessThan,
  faLessThanEqual: faLessThanEqual,
  faLevelDownAlt: faLevelDownAlt,
  faLevelUpAlt: faLevelUpAlt,
  faLifeRing: faLifeRing,
  faLightbulb: faLightbulb,
  faLink: faLink,
  faLiraSign: faLiraSign,
  faList: faList,
  faListAlt: faListAlt,
  faListOl: faListOl,
  faListUl: faListUl,
  faLocationArrow: faLocationArrow,
  faLock: faLock,
  faLockOpen: faLockOpen,
  faLongArrowAltDown: faLongArrowAltDown,
  faLongArrowAltLeft: faLongArrowAltLeft,
  faLongArrowAltRight: faLongArrowAltRight,
  faLongArrowAltUp: faLongArrowAltUp,
  faLowVision: faLowVision,
  faMagic: faMagic,
  faMagnet: faMagnet,
  faMale: faMale,
  faMap: faMap,
  faMapMarker: faMapMarker,
  faMapMarkerAlt: faMapMarkerAlt,
  faMapPin: faMapPin,
  faMapSigns: faMapSigns,
  faMars: faMars,
  faMarsDouble: faMarsDouble,
  faMarsStroke: faMarsStroke,
  faMarsStrokeH: faMarsStrokeH,
  faMarsStrokeV: faMarsStrokeV,
  faMedkit: faMedkit,
  faMeh: faMeh,
  faMemory: faMemory,
  faMercury: faMercury,
  faMicrochip: faMicrochip,
  faMicrophone: faMicrophone,
  faMicrophoneAlt: faMicrophoneAlt,
  faMicrophoneAltSlash: faMicrophoneAltSlash,
  faMicrophoneSlash: faMicrophoneSlash,
  faMinus: faMinus,
  faMinusCircle: faMinusCircle,
  faMinusSquare: faMinusSquare,
  faMobile: faMobile,
  faMobileAlt: faMobileAlt,
  faMoneyBill: faMoneyBill,
  faMoneyBillAlt: faMoneyBillAlt,
  faMoneyBillWave: faMoneyBillWave,
  faMoneyBillWaveAlt: faMoneyBillWaveAlt,
  faMoneyCheck: faMoneyCheck,
  faMoneyCheckAlt: faMoneyCheckAlt,
  faMoon: faMoon,
  faMotorcycle: faMotorcycle,
  faMousePointer: faMousePointer,
  faMusic: faMusic,
  faNeuter: faNeuter,
  faNewspaper: faNewspaper,
  faNotEqual: faNotEqual,
  faNotesMedical: faNotesMedical,
  faObjectGroup: faObjectGroup,
  faObjectUngroup: faObjectUngroup,
  faOutdent: faOutdent,
  faPaintBrush: faPaintBrush,
  faPalette: faPalette,
  faPallet: faPallet,
  faPaperPlane: faPaperPlane,
  faPaperclip: faPaperclip,
  faParachuteBox: faParachuteBox,
  faParagraph: faParagraph,
  faParking: faParking,
  faPaste: faPaste,
  faPause: faPause,
  faPauseCircle: faPauseCircle,
  faPaw: faPaw,
  faPenSquare: faPenSquare,
  faPencilAlt: faPencilAlt,
  faPeopleCarry: faPeopleCarry,
  faPercent: faPercent,
  faPercentage: faPercentage,
  faPhone: faPhone,
  faPhoneSlash: faPhoneSlash,
  faPhoneSquare: faPhoneSquare,
  faPhoneVolume: faPhoneVolume,
  faPiggyBank: faPiggyBank,
  faPills: faPills,
  faPlane: faPlane,
  faPlay: faPlay,
  faPlayCircle: faPlayCircle,
  faPlug: faPlug,
  faPlus: faPlus,
  faPlusCircle: faPlusCircle,
  faPlusSquare: faPlusSquare,
  faPodcast: faPodcast,
  faPoo: faPoo,
  faPortrait: faPortrait,
  faPoundSign: faPoundSign,
  faPowerOff: faPowerOff,
  faPrescriptionBottle: faPrescriptionBottle,
  faPrescriptionBottleAlt: faPrescriptionBottleAlt,
  faPrint: faPrint,
  faProcedures: faProcedures,
  faProjectDiagram: faProjectDiagram,
  faPuzzlePiece: faPuzzlePiece,
  faQrcode: faQrcode,
  faQuestion: faQuestion,
  faQuestionCircle: faQuestionCircle,
  faQuidditch: faQuidditch,
  faQuoteLeft: faQuoteLeft,
  faQuoteRight: faQuoteRight,
  faRandom: faRandom,
  faReceipt: faReceipt,
  faRecycle: faRecycle,
  faRedo: faRedo,
  faRedoAlt: faRedoAlt,
  faRegistered: faRegistered,
  faReply: faReply,
  faReplyAll: faReplyAll,
  faRetweet: faRetweet,
  faRibbon: faRibbon,
  faRoad: faRoad,
  faRobot: faRobot,
  faRocket: faRocket,
  faRss: faRss,
  faRssSquare: faRssSquare,
  faRubleSign: faRubleSign,
  faRuler: faRuler,
  faRulerCombined: faRulerCombined,
  faRulerHorizontal: faRulerHorizontal,
  faRulerVertical: faRulerVertical,
  faRupeeSign: faRupeeSign,
  faSave: faSave,
  faSchool: faSchool,
  faScrewdriver: faScrewdriver,
  faSearch: faSearch,
  faSearchMinus: faSearchMinus,
  faSearchPlus: faSearchPlus,
  faSeedling: faSeedling,
  faServer: faServer,
  faShare: faShare,
  faShareAlt: faShareAlt,
  faShareAltSquare: faShareAltSquare,
  faShareSquare: faShareSquare,
  faShekelSign: faShekelSign,
  faShieldAlt: faShieldAlt,
  faShip: faShip,
  faShippingFast: faShippingFast,
  faShoePrints: faShoePrints,
  faShoppingBag: faShoppingBag,
  faShoppingBasket: faShoppingBasket,
  faShoppingCart: faShoppingCart,
  faShower: faShower,
  faSign: faSign,
  faSignInAlt: faSignInAlt,
  faSignLanguage: faSignLanguage,
  faSignOutAlt: faSignOutAlt,
  faSignal: faSignal,
  faSitemap: faSitemap,
  faSkull: faSkull,
  faSlidersH: faSlidersH,
  faSmile: faSmile,
  faSmoking: faSmoking,
  faSmokingBan: faSmokingBan,
  faSnowflake: faSnowflake,
  faSort: faSort,
  faSortAlphaDown: faSortAlphaDown,
  faSortAlphaUp: faSortAlphaUp,
  faSortAmountDown: faSortAmountDown,
  faSortAmountUp: faSortAmountUp,
  faSortDown: faSortDown,
  faSortNumericDown: faSortNumericDown,
  faSortNumericUp: faSortNumericUp,
  faSortUp: faSortUp,
  faSpaceShuttle: faSpaceShuttle,
  faSpinner: faSpinner,
  faSquare: faSquare,
  faSquareFull: faSquareFull,
  faStar: faStar,
  faStarHalf: faStarHalf,
  faStepBackward: faStepBackward,
  faStepForward: faStepForward,
  faStethoscope: faStethoscope,
  faStickyNote: faStickyNote,
  faStop: faStop,
  faStopCircle: faStopCircle,
  faStopwatch: faStopwatch,
  faStore: faStore,
  faStoreAlt: faStoreAlt,
  faStream: faStream,
  faStreetView: faStreetView,
  faStrikethrough: faStrikethrough,
  faStroopwafel: faStroopwafel,
  faSubscript: faSubscript,
  faSubway: faSubway,
  faSuitcase: faSuitcase,
  faSun: faSun,
  faSuperscript: faSuperscript,
  faSync: faSync,
  faSyncAlt: faSyncAlt,
  faSyringe: faSyringe,
  faTable: faTable,
  faTableTennis: faTableTennis,
  faTablet: faTablet,
  faTabletAlt: faTabletAlt,
  faTablets: faTablets,
  faTachometerAlt: faTachometerAlt,
  faTag: faTag,
  faTags: faTags,
  faTape: faTape,
  faTasks: faTasks,
  faTaxi: faTaxi,
  faTerminal: faTerminal,
  faTextHeight: faTextHeight,
  faTextWidth: faTextWidth,
  faTh: faTh,
  faThLarge: faThLarge,
  faThList: faThList,
  faThermometer: faThermometer,
  faThermometerEmpty: faThermometerEmpty,
  faThermometerFull: faThermometerFull,
  faThermometerHalf: faThermometerHalf,
  faThermometerQuarter: faThermometerQuarter,
  faThermometerThreeQuarters: faThermometerThreeQuarters,
  faThumbsDown: faThumbsDown,
  faThumbsUp: faThumbsUp,
  faThumbtack: faThumbtack,
  faTicketAlt: faTicketAlt,
  faTimes: faTimes,
  faTimesCircle: faTimesCircle,
  faTint: faTint,
  faToggleOff: faToggleOff,
  faToggleOn: faToggleOn,
  faToolbox: faToolbox,
  faTrademark: faTrademark,
  faTrain: faTrain,
  faTransgender: faTransgender,
  faTransgenderAlt: faTransgenderAlt,
  faTrash: faTrash,
  faTrashAlt: faTrashAlt,
  faTree: faTree,
  faTrophy: faTrophy,
  faTruck: faTruck,
  faTruckLoading: faTruckLoading,
  faTruckMoving: faTruckMoving,
  faTshirt: faTshirt,
  faTty: faTty,
  faTv: faTv,
  faUmbrella: faUmbrella,
  faUnderline: faUnderline,
  faUndo: faUndo,
  faUndoAlt: faUndoAlt,
  faUniversalAccess: faUniversalAccess,
  faUniversity: faUniversity,
  faUnlink: faUnlink,
  faUnlock: faUnlock,
  faUnlockAlt: faUnlockAlt,
  faUpload: faUpload,
  faUser: faUser,
  faUserAlt: faUserAlt,
  faUserAltSlash: faUserAltSlash,
  faUserAstronaut: faUserAstronaut,
  faUserCheck: faUserCheck,
  faUserCircle: faUserCircle,
  faUserClock: faUserClock,
  faUserCog: faUserCog,
  faUserEdit: faUserEdit,
  faUserFriends: faUserFriends,
  faUserGraduate: faUserGraduate,
  faUserLock: faUserLock,
  faUserMd: faUserMd,
  faUserMinus: faUserMinus,
  faUserNinja: faUserNinja,
  faUserPlus: faUserPlus,
  faUserSecret: faUserSecret,
  faUserShield: faUserShield,
  faUserSlash: faUserSlash,
  faUserTag: faUserTag,
  faUserTie: faUserTie,
  faUserTimes: faUserTimes,
  faUsers: faUsers,
  faUsersCog: faUsersCog,
  faUtensilSpoon: faUtensilSpoon,
  faUtensils: faUtensils,
  faVenus: faVenus,
  faVenusDouble: faVenusDouble,
  faVenusMars: faVenusMars,
  faVial: faVial,
  faVials: faVials,
  faVideo: faVideo,
  faVideoSlash: faVideoSlash,
  faVolleyballBall: faVolleyballBall,
  faVolumeDown: faVolumeDown,
  faVolumeOff: faVolumeOff,
  faVolumeUp: faVolumeUp,
  faWalking: faWalking,
  faWallet: faWallet,
  faWarehouse: faWarehouse,
  faWeight: faWeight,
  faWheelchair: faWheelchair,
  faWifi: faWifi,
  faWindowClose: faWindowClose,
  faWindowMaximize: faWindowMaximize,
  faWindowMinimize: faWindowMinimize,
  faWindowRestore: faWindowRestore,
  faWineGlass: faWineGlass,
  faWonSign: faWonSign,
  faWrench: faWrench,
  faXRay: faXRay,
  faYenSign: faYenSign
};


// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// EXTERNAL MODULE: ../node_modules/react-helmet/lib/Helmet.js
var Helmet = __webpack_require__("jT85");
var Helmet_default = /*#__PURE__*/__webpack_require__.n(Helmet);

// EXTERNAL MODULE: ./components/header/style.css
var header_style = __webpack_require__("u3et");
var header_style_default = /*#__PURE__*/__webpack_require__.n(header_style);

// CONCATENATED MODULE: ./components/header/index.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var header_Header = function (_Component) {
	_inherits(Header, _Component);

	function Header(props) {
		_classCallCheck(this, Header);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			cursorOn: false
		};
		return _this;
	}

	Header.prototype.componentDidMount = function componentDidMount() {
		var _this2 = this;

		this.timer = setInterval(function () {
			_this2.setState({
				cursorOn: !_this2.state.cursorOn
			});
		}, 500);
	};

	Header.prototype.componentWillUnmount = function componentWillUnmount() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	};

	Header.prototype.render = function render() {
		var cursor = this.state.cursorOn ? '_' : '';
		var cursorStyle = this.state.cursorOn ? { opacity: 1 } : { opacity: 0 };
		return Object(preact_min["h"])(
			'header',
			{ 'class': header_style_default.a.header },
			Object(preact_min["h"])(
				Helmet["Helmet"],
				null,
				Object(preact_min["h"])(
					'title',
					null,
					'Codingscape',
					cursor
				)
			),
			Object(preact_min["h"])('img', { 'class': header_style_default.a.logo, src: 'assets/cs-logo.svg' }),
			Object(preact_min["h"])(
				'div',
				{ 'class': header_style_default.a.subheader },
				Object(preact_min["h"])(
					'h1',
					{ 'class': header_style_default.a.branding },
					'Codingscape',
					Object(preact_min["h"])(
						'span',
						{ 'class': header_style_default.a.cursor, style: cursorStyle },
						'_'
					)
				),
				Object(preact_min["h"])(
					'nav',
					{ 'class': header_style_default.a.nav },
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: header_style_default.a.active, href: '/' },
						'Home'
					),
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: header_style_default.a.active, href: '/capabilities' },
						'Capabilities'
					),
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: header_style_default.a.active, href: '/about' },
						'About Us'
					),
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: header_style_default.a.active, href: '/contact' },
						'Contact'
					)
				)
			)
		);
	};

	return Header;
}(preact_min["Component"]);


// EXTERNAL MODULE: ../node_modules/preact-compat/dist/preact-compat.es.js
var preact_compat_es = __webpack_require__("eW0v");

// EXTERNAL MODULE: ../node_modules/prop-types/index.js
var prop_types = __webpack_require__("5D9O");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ../node_modules/exenv/index.js
var exenv = __webpack_require__("RKsu");
var exenv_default = /*#__PURE__*/__webpack_require__.n(exenv);

// EXTERNAL MODULE: ../node_modules/react-move/Animate/index.js
var Animate = __webpack_require__("n9ou");
var Animate_default = /*#__PURE__*/__webpack_require__.n(Animate);

// CONCATENATED MODULE: ../node_modules/d3-ease/src/linear.js
function linear(t) {
  return +t;
}
// CONCATENATED MODULE: ../node_modules/d3-ease/src/quad.js
function quadIn(t) {
  return t * t;
}

function quadOut(t) {
  return t * (2 - t);
}

function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}
// CONCATENATED MODULE: ../node_modules/d3-ease/src/cubic.js
function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
// CONCATENATED MODULE: ../node_modules/d3-ease/src/poly.js
var exponent = 3;

var polyIn = function custom(e) {
  e = +e;

  function polyIn(t) {
    return Math.pow(t, e);
  }

  polyIn.exponent = custom;

  return polyIn;
}(exponent);

var polyOut = function custom(e) {
  e = +e;

  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }

  polyOut.exponent = custom;

  return polyOut;
}(exponent);

var polyInOut = function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }

  polyInOut.exponent = custom;

  return polyInOut;
}(exponent);
// CONCATENATED MODULE: ../node_modules/d3-ease/src/sin.js
var pi = Math.PI,
    halfPi = pi / 2;

function sinIn(t) {
  return 1 - Math.cos(t * halfPi);
}

function sinOut(t) {
  return Math.sin(t * halfPi);
}

function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}
// CONCATENATED MODULE: ../node_modules/d3-ease/src/exp.js
function expIn(t) {
  return Math.pow(2, 10 * t - 10);
}

function expOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

function expInOut(t) {
  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
}
// CONCATENATED MODULE: ../node_modules/d3-ease/src/circle.js
function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}

function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}
// CONCATENATED MODULE: ../node_modules/d3-ease/src/bounce.js
var b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}

function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}

function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}
// CONCATENATED MODULE: ../node_modules/d3-ease/src/back.js
var overshoot = 1.70158;

var backIn = function custom(s) {
  s = +s;

  function backIn(t) {
    return t * t * ((s + 1) * t - s);
  }

  backIn.overshoot = custom;

  return backIn;
}(overshoot);

var backOut = function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((s + 1) * t + s) + 1;
  }

  backOut.overshoot = custom;

  return backOut;
}(overshoot);

var backInOut = function custom(s) {
  s = +s;

  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }

  backInOut.overshoot = custom;

  return backInOut;
}(overshoot);
// CONCATENATED MODULE: ../node_modules/d3-ease/src/elastic.js
var tau = 2 * Math.PI,
    amplitude = 1,
    period = 0.3;

var elasticIn = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticIn(t) {
    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
  }

  elasticIn.amplitude = function (a) {
    return custom(a, p * tau);
  };
  elasticIn.period = function (p) {
    return custom(a, p);
  };

  return elasticIn;
}(amplitude, period);

var elasticOut = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticOut(t) {
    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
  }

  elasticOut.amplitude = function (a) {
    return custom(a, p * tau);
  };
  elasticOut.period = function (p) {
    return custom(a, p);
  };

  return elasticOut;
}(amplitude, period);

var elasticInOut = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0 ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p) : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function (a) {
    return custom(a, p * tau);
  };
  elasticInOut.period = function (p) {
    return custom(a, p);
  };

  return elasticInOut;
}(amplitude, period);
// CONCATENATED MODULE: ../node_modules/d3-ease/index.js



















// CONCATENATED MODULE: ../node_modules/nuka-carousel/es/default-controls.js
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }return _typeof(obj);
}

function default_controls__classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;
}

function default_controls__possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }return _assertThisInitialized(self);
}

function default_controls__inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return self;
}



var defaultButtonStyles = function defaultButtonStyles(disabled) {
  return {
    border: 0,
    background: 'rgba(0,0,0,0.4)',
    color: 'white',
    padding: 10,
    outline: 0,
    opacity: disabled ? 0.3 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer'
  };
};

var default_controls_PreviousButton =
/*#__PURE__*/
function (_React$Component) {
  default_controls__inherits(PreviousButton, _React$Component);

  function PreviousButton() {
    var _this;

    default_controls__classCallCheck(this, PreviousButton);

    _this = default_controls__possibleConstructorReturn(this, (PreviousButton.__proto__ || Object.getPrototypeOf(PreviousButton)).apply(this, arguments));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PreviousButton, [{
    key: "handleClick",
    value: function handleClick(event) {
      event.preventDefault();
      this.props.previousSlide();
    }
  }, {
    key: "render",
    value: function render() {
      var disabled = this.props.currentSlide === 0 && !this.props.wrapAround || this.props.slideCount === 0;
      return preact_compat_es["default"].createElement("button", {
        style: defaultButtonStyles(disabled),
        disabled: disabled,
        onClick: this.handleClick
      }, "PREV");
    }
  }]);

  return PreviousButton;
}(preact_compat_es["default"].Component);
var default_controls_NextButton =
/*#__PURE__*/
function (_React$Component2) {
  default_controls__inherits(NextButton, _React$Component2);

  function NextButton() {
    var _this2;

    default_controls__classCallCheck(this, NextButton);

    _this2 = default_controls__possibleConstructorReturn(this, (NextButton.__proto__ || Object.getPrototypeOf(NextButton)).apply(this, arguments));
    _this2.handleClick = _this2.handleClick.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(NextButton, [{
    key: "handleClick",
    value: function handleClick(event) {
      event.preventDefault();
      this.props.nextSlide();
    }
  }, {
    key: "render",
    value: function render() {
      var disabled = this.props.currentSlide + this.props.slidesToScroll >= this.props.slideCount && !this.props.wrapAround;
      return preact_compat_es["default"].createElement("button", {
        style: defaultButtonStyles(disabled),
        disabled: disabled,
        onClick: this.handleClick
      }, "NEXT");
    }
  }]);

  return NextButton;
}(preact_compat_es["default"].Component);
var default_controls_PagingDots =
/*#__PURE__*/
function (_React$Component3) {
  default_controls__inherits(PagingDots, _React$Component3);

  function PagingDots() {
    default_controls__classCallCheck(this, PagingDots);

    return default_controls__possibleConstructorReturn(this, (PagingDots.__proto__ || Object.getPrototypeOf(PagingDots)).apply(this, arguments));
  }

  _createClass(PagingDots, [{
    key: "getIndexes",
    value: function getIndexes(count, inc) {
      var arr = [];

      for (var i = 0; i < count; i += inc) {
        arr.push(i);
      }

      return arr;
    }
  }, {
    key: "getListStyles",
    value: function getListStyles() {
      return {
        position: 'relative',
        margin: 0,
        top: -10,
        padding: 0
      };
    }
  }, {
    key: "getListItemStyles",
    value: function getListItemStyles() {
      return {
        listStyleType: 'none',
        display: 'inline-block'
      };
    }
  }, {
    key: "getButtonStyles",
    value: function getButtonStyles(active) {
      return {
        border: 0,
        background: 'transparent',
        color: 'black',
        cursor: 'pointer',
        padding: 10,
        outline: 0,
        fontSize: 24,
        opacity: active ? 1 : 0.5
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var indexes = this.getIndexes(this.props.slideCount, this.props.slidesToScroll);
      return preact_compat_es["default"].createElement("ul", {
        style: this.getListStyles()
      }, indexes.map(function (index) {
        return preact_compat_es["default"].createElement("li", {
          style: _this3.getListItemStyles(),
          key: index
        }, preact_compat_es["default"].createElement("button", {
          style: _this3.getButtonStyles(_this3.props.currentSlide === index),
          onClick: _this3.props.goToSlide.bind(null, index)
        }, "\u2022"));
      }));
    }
  }]);

  return PagingDots;
}(preact_compat_es["default"].Component);
// CONCATENATED MODULE: ../node_modules/nuka-carousel/es/index.js
function es__typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    es__typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    es__typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }return es__typeof(obj);
}

function es__extends() {
  es__extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };return es__extends.apply(this, arguments);
}

function es__classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function es__defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function es__createClass(Constructor, protoProps, staticProps) {
  if (protoProps) es__defineProperties(Constructor.prototype, protoProps);if (staticProps) es__defineProperties(Constructor, staticProps);return Constructor;
}

function es__possibleConstructorReturn(self, call) {
  if (call && (es__typeof(call) === "object" || typeof call === "function")) {
    return call;
  }return es__assertThisInitialized(self);
}

function es__inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function es__assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return self;
}








var addEvent = function addEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }

  if (elem.addEventListener) {
    elem.addEventListener(type, eventHandle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on".concat(type), eventHandle);
  } else {
    elem["on".concat(type)] = eventHandle;
  }
};

var removeEvent = function removeEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }

  if (elem.removeEventListener) {
    elem.removeEventListener(type, eventHandle, false);
  } else if (elem.detachEvent) {
    elem.detachEvent("on".concat(type), eventHandle);
  } else {
    elem["on".concat(type)] = null;
  }
};

var es_Carousel =
/*#__PURE__*/
function (_React$Component) {
  es__inherits(Carousel, _React$Component);

  function Carousel() {
    var _this;

    es__classCallCheck(this, Carousel);

    _this = es__possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).apply(this, arguments));
    _this.displayName = 'Carousel';
    _this.clickSafe = true;
    _this.controlsMap = [{
      func: _this.props.renderTopLeftControls,
      key: 'TopLeft'
    }, {
      func: _this.props.renderTopCenterControls,
      key: 'TopCenter'
    }, {
      func: _this.props.renderTopRightControls,
      key: 'TopRight'
    }, {
      func: _this.props.renderCenterLeftControls,
      key: 'CenterLeft'
    }, {
      func: _this.props.renderCenterCenterControls,
      key: 'CenterCenter'
    }, {
      func: _this.props.renderCenterRightControls,
      key: 'CenterRight'
    }, {
      func: _this.props.renderBottomLeftControls,
      key: 'BottomLeft'
    }, {
      func: _this.props.renderBottomCenterControls,
      key: 'BottomCenter'
    }, {
      func: _this.props.renderBottomRightControls,
      key: 'BottomRight'
    }];
    _this.touchObject = {};
    _this.state = {
      currentSlide: _this.props.slideIndex,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      slidesToScroll: _this.props.slidesToScroll,
      slideWidth: 0,
      top: 0,
      easing: circleOut,
      isWrappingAround: false,
      wrapToIndex: null,
      resetWrapAroundPosition: false
    };
    _this.getTouchEvents = _this.getTouchEvents.bind(es__assertThisInitialized(_this));
    _this.getMouseEvents = _this.getMouseEvents.bind(es__assertThisInitialized(_this));
    _this.handleMouseOver = _this.handleMouseOver.bind(es__assertThisInitialized(_this));
    _this.handleMouseOut = _this.handleMouseOut.bind(es__assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(es__assertThisInitialized(_this));
    _this.handleSwipe = _this.handleSwipe.bind(es__assertThisInitialized(_this));
    _this.swipeDirection = _this.swipeDirection.bind(es__assertThisInitialized(_this));
    _this.autoplayIterator = _this.autoplayIterator.bind(es__assertThisInitialized(_this));
    _this.startAutoplay = _this.startAutoplay.bind(es__assertThisInitialized(_this));
    _this.stopAutoplay = _this.stopAutoplay.bind(es__assertThisInitialized(_this));
    _this.resetAutoplay = _this.resetAutoplay.bind(es__assertThisInitialized(_this));
    _this.goToSlide = _this.goToSlide.bind(es__assertThisInitialized(_this));
    _this.nextSlide = _this.nextSlide.bind(es__assertThisInitialized(_this));
    _this.previousSlide = _this.previousSlide.bind(es__assertThisInitialized(_this));
    _this.getTargetLeft = _this.getTargetLeft.bind(es__assertThisInitialized(_this));
    _this.onResize = _this.onResize.bind(es__assertThisInitialized(_this));
    _this.onReadyStateChange = _this.onReadyStateChange.bind(es__assertThisInitialized(_this));
    _this.onVisibilityChange = _this.onVisibilityChange.bind(es__assertThisInitialized(_this));
    _this.setInitialDimensions = _this.setInitialDimensions.bind(es__assertThisInitialized(_this));
    _this.setDimensions = _this.setDimensions.bind(es__assertThisInitialized(_this));
    _this.setLeft = _this.setLeft.bind(es__assertThisInitialized(_this));
    _this.getListStyles = _this.getListStyles.bind(es__assertThisInitialized(_this));
    _this.getFrameStyles = _this.getFrameStyles.bind(es__assertThisInitialized(_this));
    _this.getSlideStyles = _this.getSlideStyles.bind(es__assertThisInitialized(_this));
    _this.getSlideTargetPosition = _this.getSlideTargetPosition.bind(es__assertThisInitialized(_this));
    _this.getSliderStyles = _this.getSliderStyles.bind(es__assertThisInitialized(_this));
    _this.getOffsetDeltas = _this.getOffsetDeltas.bind(es__assertThisInitialized(_this));
    _this.formatChildren = _this.formatChildren.bind(es__assertThisInitialized(_this));
    _this.getChildNodes = _this.getChildNodes.bind(es__assertThisInitialized(_this));
    _this.getSlideHeight = _this.getSlideHeight.bind(es__assertThisInitialized(_this));
    _this.findMaxHeightSlide = _this.findMaxHeightSlide.bind(es__assertThisInitialized(_this));
    return _this;
  }

  es__createClass(Carousel, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setInitialDimensions();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // see https://github.com/facebook/react/issues/3417#issuecomment-121649937
      this.mounted = true;
      this.setDimensions();
      this.bindEvents();

      if (this.props.autoplay) {
        this.startAutoplay();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var slideCount = preact_compat_es["default"].Children.count(nextProps.children);
      this.setState({
        slideCount: slideCount
      });

      if (slideCount <= this.state.currentSlide) {
        this.goToSlide(Math.max(slideCount - 1, 0));
      }

      this.setDimensions(nextProps);

      if (this.props.slideIndex !== nextProps.slideIndex && nextProps.slideIndex !== this.state.currentSlide && !this.state.isWrappingAround) {
        this.goToSlide(nextProps.slideIndex);
      }

      if (this.props.autoplay !== nextProps.autoplay) {
        if (nextProps.autoplay) {
          this.startAutoplay();
        } else {
          this.stopAutoplay();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindEvents();
      this.stopAutoplay(); // see https://github.com/facebook/react/issues/3417#issuecomment-121649937

      this.mounted = false;
    }
  }, {
    key: "getTouchEvents",
    value: function getTouchEvents() {
      var _this2 = this;

      if (this.props.swiping === false) {
        return null;
      }

      return {
        onTouchStart: function onTouchStart(e) {
          _this2.touchObject = {
            startX: e.touches[0].pageX,
            startY: e.touches[0].pageY
          };

          _this2.handleMouseOver();
        },
        onTouchMove: function onTouchMove(e) {
          var direction = _this2.swipeDirection(_this2.touchObject.startX, e.touches[0].pageX, _this2.touchObject.startY, e.touches[0].pageY);

          if (direction !== 0) {
            e.preventDefault();
          }

          var length = _this2.props.vertical ? Math.round(Math.sqrt(Math.pow(e.touches[0].pageY - _this2.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - _this2.touchObject.startX, 2)));
          _this2.touchObject = {
            startX: _this2.touchObject.startX,
            startY: _this2.touchObject.startY,
            endX: e.touches[0].pageX,
            endY: e.touches[0].pageY,
            length: length,
            direction: direction
          };

          _this2.setState({
            left: _this2.props.vertical ? 0 : _this2.getTargetLeft(_this2.touchObject.length * _this2.touchObject.direction),
            top: _this2.props.vertical ? _this2.getTargetLeft(_this2.touchObject.length * _this2.touchObject.direction) : 0
          });
        },
        onTouchEnd: function onTouchEnd(e) {
          _this2.handleSwipe(e);

          _this2.handleMouseOut();
        },
        onTouchCancel: function onTouchCancel(e) {
          _this2.handleSwipe(e);
        }
      };
    }
  }, {
    key: "getMouseEvents",
    value: function getMouseEvents() {
      var _this3 = this;

      if (this.props.dragging === false) {
        return null;
      }

      return {
        onMouseOver: function onMouseOver() {
          return _this3.handleMouseOver();
        },
        onMouseOut: function onMouseOut() {
          return _this3.handleMouseOut();
        },
        onMouseDown: function onMouseDown(e) {
          _this3.touchObject = {
            startX: e.clientX,
            startY: e.clientY
          };

          _this3.setState({
            dragging: true
          });
        },
        onMouseMove: function onMouseMove(e) {
          if (!_this3.state.dragging) {
            return;
          }

          var direction = _this3.swipeDirection(_this3.touchObject.startX, e.clientX, _this3.touchObject.startY, e.clientY);

          if (direction !== 0) {
            e.preventDefault();
          }

          var length = _this3.props.vertical ? Math.round(Math.sqrt(Math.pow(e.clientY - _this3.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.clientX - _this3.touchObject.startX, 2)));
          _this3.touchObject = {
            startX: _this3.touchObject.startX,
            startY: _this3.touchObject.startY,
            endX: e.clientX,
            endY: e.clientY,
            length: length,
            direction: direction
          };

          _this3.setState({
            left: _this3.props.vertical ? 0 : _this3.getTargetLeft(_this3.touchObject.length * _this3.touchObject.direction),
            top: _this3.props.vertical ? _this3.getTargetLeft(_this3.touchObject.length * _this3.touchObject.direction) : 0
          });
        },
        onMouseUp: function onMouseUp(e) {
          if (!_this3.state.dragging) {
            return;
          }

          _this3.handleSwipe(e);
        },
        onMouseLeave: function onMouseLeave(e) {
          if (!_this3.state.dragging) {
            return;
          }

          _this3.handleSwipe(e);
        }
      };
    }
  }, {
    key: "pauseAutoplay",
    value: function pauseAutoplay() {
      if (this.props.autoplay) {
        this.autoplayPaused = true;
        this.stopAutoplay();
      }
    }
  }, {
    key: "unpauseAutoplay",
    value: function unpauseAutoplay() {
      if (this.props.autoplay && this.autoplayPaused) {
        this.startAutoplay();
        this.autoplayPaused = null;
      }
    }
  }, {
    key: "handleMouseOver",
    value: function handleMouseOver() {
      this.pauseAutoplay();
    }
  }, {
    key: "handleMouseOut",
    value: function handleMouseOut() {
      this.unpauseAutoplay();
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (this.clickSafe === true) {
        event.preventDefault();
        event.stopPropagation();

        if (event.nativeEvent) {
          event.nativeEvent.stopPropagation();
        }
      }
    }
  }, {
    key: "handleSwipe",
    value: function handleSwipe() {
      if (typeof this.touchObject.length !== 'undefined' && this.touchObject.length > 44) {
        this.clickSafe = true;
      } else {
        this.clickSafe = false;
      }

      var slidesToShow = this.props.slidesToShow;

      if (this.props.slidesToScroll === 'auto') {
        slidesToShow = this.state.slidesToScroll;
      }

      if (this.touchObject.length > this.state.slideWidth / slidesToShow / 5) {
        if (this.touchObject.direction === 1) {
          if (this.state.currentSlide >= preact_compat_es["default"].Children.count(this.props.children) - slidesToShow && !this.props.wrapAround) {
            this.setState({
              easing: d3_ease_namespaceObject[this.props.edgeEasing]
            });
          } else {
            this.nextSlide();
          }
        } else if (this.touchObject.direction === -1) {
          if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
            this.setState({
              easing: d3_ease_namespaceObject[this.props.edgeEasing]
            });
          } else {
            this.previousSlide();
          }
        }
      } else {
        this.goToSlide(this.state.currentSlide);
      }

      this.touchObject = {};
      this.setState({
        dragging: false
      });
    }
  }, {
    key: "swipeDirection",
    value: function swipeDirection(x1, x2, y1, y2) {
      var xDist = x1 - x2;
      var yDist = y1 - y2;
      var r = Math.atan2(yDist, xDist);
      var swipeAngle = Math.round(r * 180 / Math.PI);

      if (swipeAngle < 0) {
        swipeAngle = 360 - Math.abs(swipeAngle);
      }

      if (swipeAngle <= 45 && swipeAngle >= 0) {
        return 1;
      }

      if (swipeAngle <= 360 && swipeAngle >= 315) {
        return 1;
      }

      if (swipeAngle >= 135 && swipeAngle <= 225) {
        return -1;
      }

      if (this.props.vertical === true) {
        if (swipeAngle >= 35 && swipeAngle <= 135) {
          return 1;
        } else {
          return -1;
        }
      }

      return 0;
    }
  }, {
    key: "autoplayIterator",
    value: function autoplayIterator() {
      if (this.props.wrapAround) {
        this.nextSlide();
        return;
      }

      if (this.state.currentSlide !== this.state.slideCount - this.state.slidesToShow) {
        this.nextSlide();
      } else {
        this.stopAutoplay();
      }
    }
  }, {
    key: "startAutoplay",
    value: function startAutoplay() {
      this.autoplayID = setInterval(this.autoplayIterator, this.props.autoplayInterval);
    }
  }, {
    key: "resetAutoplay",
    value: function resetAutoplay() {
      if (this.props.autoplay && !this.autoplayPaused) {
        this.stopAutoplay();
        this.startAutoplay();
      }
    }
  }, {
    key: "stopAutoplay",
    value: function stopAutoplay() {
      if (this.autoplayID) {
        clearInterval(this.autoplayID);
      }
    } // Action Methods

  }, {
    key: "goToSlide",
    value: function goToSlide(index) {
      var _this4 = this;

      this.setState({
        easing: d3_ease_namespaceObject[this.props.easing]
      });

      if (index >= preact_compat_es["default"].Children.count(this.props.children) || index < 0) {
        if (!this.props.wrapAround) {
          return;
        }

        if (index >= preact_compat_es["default"].Children.count(this.props.children)) {
          this.props.beforeSlide(this.state.currentSlide, 0);
          this.setState(function (prevState) {
            return {
              left: _this4.props.vertical ? 0 : _this4.getTargetLeft(_this4.state.slideWidth, prevState.currentSlide),
              top: _this4.props.vertical ? _this4.getTargetLeft(_this4.state.slideWidth, prevState.currentSlide) : 0,
              currentSlide: 0,
              isWrappingAround: true,
              wrapToIndex: index
            };
          }, function () {
            return setTimeout(function () {
              _this4.setState({
                isWrappingAround: false,
                resetWrapAroundPosition: true
              }, function () {
                _this4.setState({
                  resetWrapAroundPosition: false
                });

                _this4.props.afterSlide(0);

                _this4.resetAutoplay();
              });
            }, _this4.props.speed);
          });
          return;
        } else {
          var endSlide = preact_compat_es["default"].Children.count(this.props.children) - this.state.slidesToScroll;
          this.props.beforeSlide(this.state.currentSlide, endSlide);
          this.setState(function (prevState) {
            return {
              left: _this4.props.vertical ? 0 : _this4.getTargetLeft(-1, prevState.currentSlide),
              top: _this4.props.vertical ? _this4.getTargetLeft(-1, prevState.currentSlide) : 0,
              currentSlide: endSlide,
              isWrappingAround: true,
              wrapToIndex: index
            };
          }, function () {
            return setTimeout(function () {
              _this4.setState({
                isWrappingAround: false,
                resetWrapAroundPosition: true
              }, function () {
                _this4.setState({
                  resetWrapAroundPosition: false
                });

                _this4.props.afterSlide(endSlide);

                _this4.resetAutoplay();
              });
            }, _this4.props.speed);
          });
          return;
        }
      }

      this.props.beforeSlide(this.state.currentSlide, index);

      if (index !== this.state.currentSlide) {
        this.props.afterSlide(index);
      }

      this.setState({
        currentSlide: index
      }, function () {
        _this4.resetAutoplay();
      });
    }
  }, {
    key: "nextSlide",
    value: function nextSlide() {
      var childrenCount = preact_compat_es["default"].Children.count(this.props.children);
      var slidesToShow = this.props.slidesToShow;

      if (this.props.slidesToScroll === 'auto') {
        slidesToShow = this.state.slidesToScroll;
      }

      if (this.state.currentSlide >= childrenCount - slidesToShow && !this.props.wrapAround && this.props.cellAlign === 'left') {
        return;
      }

      if (this.props.wrapAround) {
        this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
      } else {
        if (this.props.slideWidth !== 1) {
          this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
          return;
        }

        var offset = this.state.currentSlide + this.state.slidesToScroll;
        var nextSlideIndex = this.props.cellAlign !== 'left' ? offset : Math.min(offset, childrenCount - slidesToShow);
        this.goToSlide(nextSlideIndex);
      }
    }
  }, {
    key: "previousSlide",
    value: function previousSlide() {
      if (this.state.currentSlide <= 0 && !this.props.wrapAround) {
        return;
      }

      if (this.props.wrapAround) {
        this.goToSlide(this.state.currentSlide - this.state.slidesToScroll);
      } else {
        this.goToSlide(Math.max(0, this.state.currentSlide - this.state.slidesToScroll));
      }
    } // Animation

  }, {
    key: "getTargetLeft",
    value: function getTargetLeft(touchOffset, slide) {
      var offset;
      var target = slide || this.state.currentSlide;

      switch (this.props.cellAlign) {
        case 'left':
          {
            offset = 0;
            offset -= this.props.cellSpacing * target;
            break;
          }

        case 'center':
          {
            offset = (this.state.frameWidth - this.state.slideWidth) / 2;
            offset -= this.props.cellSpacing * target;
            break;
          }

        case 'right':
          {
            offset = this.state.frameWidth - this.state.slideWidth;
            offset -= this.props.cellSpacing * target;
            break;
          }
      }

      var left = this.state.slideWidth * target;
      var lastSlide = this.state.currentSlide > 0 && target + this.state.slidesToScroll >= this.state.slideCount;

      if (lastSlide && this.props.slideWidth !== 1 && !this.props.wrapAround && this.props.slidesToScroll === 'auto') {
        left = this.state.slideWidth * this.state.slideCount - this.state.frameWidth;
        offset = 0;
        offset -= this.props.cellSpacing * (this.state.slideCount - 1);
      }

      offset -= touchOffset || 0;
      return (left - offset) * -1;
    } // Bootstrapping

  }, {
    key: "bindEvents",
    value: function bindEvents() {
      if (exenv_default.a.canUseDOM) {
        addEvent(window, 'resize', this.onResize);
        addEvent(document, 'readystatechange', this.onReadyStateChange);
        addEvent(document, 'visibilitychange', this.onVisibilityChange);
      }
    }
  }, {
    key: "onResize",
    value: function onResize() {
      this.setDimensions(null, this.props.onResize);
    }
  }, {
    key: "onReadyStateChange",
    value: function onReadyStateChange() {
      this.setDimensions();
    }
  }, {
    key: "onVisibilityChange",
    value: function onVisibilityChange() {
      if (document.hidden) {
        this.pauseAutoplay();
      } else {
        this.unpauseAutoplay();
      }
    }
  }, {
    key: "unbindEvents",
    value: function unbindEvents() {
      if (exenv_default.a.canUseDOM) {
        removeEvent(window, 'resize', this.onResize);
        removeEvent(document, 'readystatechange', this.onReadyStateChange);
        removeEvent(document, 'visibilitychange', this.onVisibilityChange);
      }
    }
  }, {
    key: "formatChildren",
    value: function formatChildren(children) {
      var _this5 = this;

      var positionValue = this.props.vertical ? this.state.top : this.state.left;
      return preact_compat_es["default"].Children.map(children, function (child, index) {
        return preact_compat_es["default"].createElement("li", {
          className: "slider-slide",
          style: _this5.getSlideStyles(index, positionValue),
          key: index
        }, child);
      });
    }
  }, {
    key: "setInitialDimensions",
    value: function setInitialDimensions() {
      var _this6 = this;

      var slideWidth = this.props.vertical ? this.props.initialSlideHeight || 0 : this.props.initialSlideWidth || 0;
      var slideHeight = this.props.vertical ? (this.props.initialSlideHeight || 0) * this.props.slidesToShow : this.props.initialSlideHeight || 0;
      var frameHeight = slideHeight + this.props.cellSpacing * (this.props.slidesToShow - 1);
      this.setState({
        slideHeight: slideHeight,
        frameWidth: this.props.vertical ? frameHeight : '100%',
        slideCount: preact_compat_es["default"].Children.count(this.props.children),
        slideWidth: slideWidth
      }, function () {
        _this6.setLeft();
      });
    }
  }, {
    key: "findMaxHeightSlide",
    value: function findMaxHeightSlide(slides) {
      var maxHeight = 0;

      for (var i = 0; i < slides.length; i++) {
        if (slides[i].offsetHeight > maxHeight) {
          maxHeight = slides[i].offsetHeight;
        }
      }

      return maxHeight;
    }
  }, {
    key: "getSlideHeight",
    value: function getSlideHeight(props) {
      var childNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var heightMode = props.heightMode,
          vertical = props.vertical;
      var firstSlide = childNodes[0];

      if (firstSlide && heightMode === 'first') {
        return vertical ? firstSlide.offsetHeight * props.slidesToShow : firstSlide.offsetHeight;
      }

      if (heightMode === 'max') {
        return this.findMaxHeightSlide(childNodes);
      }

      if (props.heightMode === 'current') {
        return childNodes[this.state.currentSlide].offsetHeight;
      }

      return 100;
    }
  }, {
    key: "setDimensions",
    value: function setDimensions(props) {
      var _this7 = this;

      var stateCb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      props = props || this.props;
      var slideWidth;
      var slidesToScroll;
      var frame = this.frame;
      var childNodes = this.getChildNodes();
      var slideHeight = this.getSlideHeight(props, childNodes);
      slidesToScroll = props.slidesToScroll;

      if (typeof props.slideWidth !== 'number') {
        slideWidth = parseInt(props.slideWidth);
      } else if (props.vertical) {
        slideWidth = slideHeight / props.slidesToShow * props.slideWidth;
      } else {
        slideWidth = frame.offsetWidth / props.slidesToShow * props.slideWidth;
      }

      if (!props.vertical) {
        slideWidth -= props.cellSpacing * ((100 - 100 / props.slidesToShow) / 100);
      }

      var frameHeight = slideHeight + props.cellSpacing * (props.slidesToShow - 1);
      var frameWidth = props.vertical ? frameHeight : frame.offsetWidth;

      if (props.slidesToScroll === 'auto') {
        slidesToScroll = Math.floor(frameWidth / (slideWidth + props.cellSpacing));
      }

      this.setState({
        slideHeight: slideHeight,
        frameWidth: frameWidth,
        slideWidth: slideWidth,
        slidesToScroll: slidesToScroll,
        left: props.vertical ? 0 : this.getTargetLeft(),
        top: props.vertical ? this.getTargetLeft() : 0
      }, function () {
        stateCb();

        _this7.setLeft();
      });
    }
  }, {
    key: "getChildNodes",
    value: function getChildNodes() {
      return this.frame.childNodes[0].childNodes;
    }
  }, {
    key: "setLeft",
    value: function setLeft() {
      var newLeft = this.props.vertical ? 0 : this.getTargetLeft();
      var newTop = this.props.vertical ? this.getTargetLeft() : 0;

      if (newLeft !== this.state.left || newTop !== this.state.top) {
        this.setState({
          left: newLeft,
          top: newTop
        });
      }
    } // Styles

  }, {
    key: "getListStyles",
    value: function getListStyles(styles) {
      var tx = styles.tx,
          ty = styles.ty;
      var listWidth = this.state.slideWidth * preact_compat_es["default"].Children.count(this.props.children);
      var spacingOffset = this.props.cellSpacing * preact_compat_es["default"].Children.count(this.props.children);
      var transform = "translate3d(".concat(tx, "px, ").concat(ty, "px, 0)");
      return {
        transform: transform,
        WebkitTransform: transform,
        msTransform: "translate(".concat(tx, "px, ").concat(ty, "px)"),
        position: 'relative',
        display: 'block',
        margin: this.props.vertical ? "".concat(this.props.cellSpacing / 2 * -1, "px 0px") : "0px ".concat(this.props.cellSpacing / 2 * -1, "px"),
        padding: 0,
        height: this.props.vertical ? listWidth + spacingOffset : this.state.slideHeight,
        width: this.props.vertical ? 'auto' : listWidth + spacingOffset,
        cursor: this.state.dragging === true ? 'pointer' : 'inherit',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        touchAction: 'none'
      };
    }
  }, {
    key: "getFrameStyles",
    value: function getFrameStyles() {
      return {
        position: 'relative',
        display: 'block',
        overflow: this.props.frameOverflow,
        height: this.props.vertical ? this.state.frameWidth || 'initial' : 'auto',
        margin: this.props.framePadding,
        padding: 0,
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        msTransform: 'translate(0, 0)',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        touchAction: "pinch-zoom ".concat(this.props.vertical ? 'pan-x' : 'pan-y')
      };
    }
  }, {
    key: "getSlideStyles",
    value: function getSlideStyles(index, positionValue) {
      var targetPosition = this.getSlideTargetPosition(index, positionValue);
      return {
        position: 'absolute',
        left: this.props.vertical ? 0 : targetPosition,
        top: this.props.vertical ? targetPosition : 0,
        display: this.props.vertical ? 'block' : 'inline-block',
        listStyleType: 'none',
        verticalAlign: 'top',
        width: this.props.vertical ? '100%' : this.state.slideWidth,
        height: 'auto',
        minHeight: '100%',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        marginLeft: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
        marginRight: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
        marginTop: this.props.vertical ? this.props.cellSpacing / 2 : 'auto',
        marginBottom: this.props.vertical ? this.props.cellSpacing / 2 : 'auto'
      };
    }
  }, {
    key: "getSlideTargetPosition",
    value: function getSlideTargetPosition(index, positionValue) {
      var slidesToShow = this.state.frameWidth / this.state.slideWidth;
      var targetPosition = (this.state.slideWidth + this.props.cellSpacing) * index;
      var end = (this.state.slideWidth + this.props.cellSpacing) * slidesToShow * -1;

      if (this.props.wrapAround && (this.state.isWrappingAround || this.state.dragging)) {
        var slidesBefore = Math.ceil(positionValue / this.state.slideWidth);

        if (this.state.slideCount - slidesBefore <= index) {
          return (this.state.slideWidth + this.props.cellSpacing) * (this.state.slideCount - index) * -1;
        }

        var slidesAfter = Math.ceil((Math.abs(positionValue) - Math.abs(end)) / this.state.slideWidth);

        if (this.state.slideWidth !== 1) {
          slidesAfter = Math.ceil((Math.abs(positionValue) - this.state.slideWidth) / this.state.slideWidth);
        }

        if (index <= slidesAfter - 1) {
          return (this.state.slideWidth + this.props.cellSpacing) * (this.state.slideCount + index);
        }
      }

      return targetPosition;
    }
  }, {
    key: "getSliderStyles",
    value: function getSliderStyles() {
      return {
        position: 'relative',
        display: 'block',
        width: this.props.width,
        height: 'auto',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        visibility: this.state.slideWidth ? 'visible' : 'hidden'
      };
    }
  }, {
    key: "getStyleTagStyles",
    value: function getStyleTagStyles() {
      return '.slider-slide > img {width: 100%; display: block;}';
    }
  }, {
    key: "getDecoratorStyles",
    value: function getDecoratorStyles(position) {
      switch (position) {
        case 'TopLeft':
          {
            return {
              position: 'absolute',
              top: 0,
              left: 0
            };
          }

        case 'TopCenter':
          {
            return {
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              WebkitTransform: 'translateX(-50%)',
              msTransform: 'translateX(-50%)'
            };
          }

        case 'TopRight':
          {
            return {
              position: 'absolute',
              top: 0,
              right: 0
            };
          }

        case 'CenterLeft':
          {
            return {
              position: 'absolute',
              top: '50%',
              left: 0,
              transform: 'translateY(-50%)',
              WebkitTransform: 'translateY(-50%)',
              msTransform: 'translateY(-50%)'
            };
          }

        case 'CenterCenter':
          {
            return {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              WebkitTransform: 'translate(-50%, -50%)',
              msTransform: 'translate(-50%, -50%)'
            };
          }

        case 'CenterRight':
          {
            return {
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translateY(-50%)',
              WebkitTransform: 'translateY(-50%)',
              msTransform: 'translateY(-50%)'
            };
          }

        case 'BottomLeft':
          {
            return {
              position: 'absolute',
              bottom: 0,
              left: 0
            };
          }

        case 'BottomCenter':
          {
            return {
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              WebkitTransform: 'translateX(-50%)',
              msTransform: 'translateX(-50%)'
            };
          }

        case 'BottomRight':
          {
            return {
              position: 'absolute',
              bottom: 0,
              right: 0
            };
          }

        default:
          {
            return {
              position: 'absolute',
              top: 0,
              left: 0
            };
          }
      }
    }
  }, {
    key: "getOffsetDeltas",
    value: function getOffsetDeltas() {
      var offset = 0;

      if (this.state.isWrappingAround) {
        offset = this.getTargetLeft(null, this.state.wrapToIndex);
      } else {
        offset = this.getTargetLeft(this.touchObject.length * this.touchObject.direction);
      }

      return {
        tx: [this.props.vertical ? 0 : offset],
        ty: [this.props.vertical ? offset : 0]
      };
    }
  }, {
    key: "renderControls",
    value: function renderControls() {
      var _this8 = this;

      return this.controlsMap.map(function (_ref) {
        var func = _ref.func,
            key = _ref.key;
        return func && typeof func === 'function' && preact_compat_es["default"].createElement("div", {
          className: "slider-control-".concat(key.toLowerCase()),
          style: _this8.getDecoratorStyles(key),
          key: key
        }, func({
          currentSlide: _this8.state.currentSlide,
          slideCount: _this8.state.slideCount,
          frameWidth: _this8.state.frameWidth,
          slideWidth: _this8.state.slideWidth,
          slidesToScroll: _this8.state.slidesToScroll,
          cellSpacing: _this8.props.cellSpacing,
          slidesToShow: _this8.props.slidesToShow,
          wrapAround: _this8.props.wrapAround,
          nextSlide: function nextSlide() {
            return _this8.nextSlide();
          },
          previousSlide: function previousSlide() {
            return _this8.previousSlide();
          },
          goToSlide: function goToSlide(index) {
            return _this8.goToSlide(index);
          }
        }));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      var _children = this.formatChildren(this.props.children);

      var duration = this.state.dragging || this.state.resetWrapAroundPosition ? 0 : this.props.speed;
      var frameStyles = this.getFrameStyles();
      var touchEvents = this.getTouchEvents();
      var mouseEvents = this.getMouseEvents();
      return preact_compat_es["default"].createElement("div", {
        className: ['slider', this.props.className || ''].join(' '),
        style: es__extends({}, this.getSliderStyles(), this.props.style)
      }, preact_compat_es["default"].createElement(Animate_default.a, {
        show: true,
        start: {
          tx: 0,
          ty: 0
        },
        update: es__extends({}, this.getOffsetDeltas(), {
          timing: {
            duration: duration,
            ease: this.state.easing
          },
          events: {
            end: this.setLeft
          }
        }),
        children: function children(_ref2) {
          var tx = _ref2.tx,
              ty = _ref2.ty;
          return preact_compat_es["default"].createElement("div", es__extends({
            className: "slider-frame",
            ref: function ref(frame) {
              return _this9.frame = frame;
            },
            style: frameStyles
          }, touchEvents, mouseEvents, {
            onClick: _this9.handleClick
          }), preact_compat_es["default"].createElement("ul", {
            className: "slider-list",
            style: _this9.getListStyles({
              tx: tx,
              ty: ty
            })
          }, _children));
        }
      }), this.renderControls(), preact_compat_es["default"].createElement("style", {
        type: "text/css",
        dangerouslySetInnerHTML: {
          __html: this.getStyleTagStyles()
        }
      }));
    }
  }]);

  return Carousel;
}(preact_compat_es["default"].Component);



es_Carousel.defaultProps = {
  afterSlide: function afterSlide() {},
  autoplay: false,
  autoplayInterval: 3000,
  beforeSlide: function beforeSlide() {},
  cellAlign: 'left',
  cellSpacing: 0,
  dragging: true,
  easing: 'easeCircleOut',
  edgeEasing: 'easeElasticOut',
  framePadding: '0px',
  frameOverflow: 'hidden',
  heightMode: 'first',
  onResize: function onResize() {},
  slideIndex: 0,
  slidesToScroll: 1,
  slidesToShow: 1,
  style: {},
  renderCenterLeftControls: function renderCenterLeftControls(props) {
    return preact_compat_es["default"].createElement(default_controls_PreviousButton, props);
  },
  renderCenterRightControls: function renderCenterRightControls(props) {
    return preact_compat_es["default"].createElement(default_controls_NextButton, props);
  },
  renderBottomCenterControls: function renderBottomCenterControls(props) {
    return preact_compat_es["default"].createElement(default_controls_PagingDots, props);
  },
  slideWidth: 1,
  speed: 500,
  swiping: true,
  vertical: false,
  width: '100%',
  wrapAround: false
};

// EXTERNAL MODULE: ./routes/home/home.css
var home = __webpack_require__("uTdl");
var home_default = /*#__PURE__*/__webpack_require__.n(home);

// CONCATENATED MODULE: ./routes/home/index.js


function home__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function home__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function home__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var home__ref = Object(preact_min["h"])(
	'h2',
	null,
	'Hello'
);

var home__ref2 = Object(preact_min["h"])(
	'p',
	null,
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
);

var _ref3 = Object(preact_min["h"])('img', { src: 'assets/images/pair-programming.jpg' });

var _ref4 = Object(preact_min["h"])(
	'div',
	{ 'class': 'jumbo' },
	'Take the thing and do the stuff like you mean it.'
);

var _ref5 = Object(preact_min["h"])('img', { src: 'assets/images/charting.jpg' });

var _ref6 = Object(preact_min["h"])(
	'p',
	null,
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
);

var _ref7 = Object(preact_min["h"])(
	'div',
	{ 'class': 'jumbo' },
	'Wherever you go, there you are.',
	Object(preact_min["h"])(
		'cite',
		null,
		'Buckaroo Banzai'
	)
);

var home_Home = function (_Component) {
	home__inherits(Home, _Component);

	function Home() {
		home__classCallCheck(this, Home);

		return home__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	/*
 	Project management: https://www.pexels.com/photo/schedule-planning-startup-launching-7376/
 	*/

	Home.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': home_default.a.home },
			Object(preact_min["h"])(
				'div',
				{ 'class': home_default.a.slides },
				Object(preact_min["h"])(
					es_Carousel,
					{ speed: 300,
						wrapAround: true,
						autoplay: true,
						autoplayInterval: 5000 },
					Object(preact_min["h"])(
						'div',
						{ 'class': home_default.a.augment },
						'Augment your existing development team'
					),
					Object(preact_min["h"])(
						'div',
						{ 'class': home_default.a.endToEnd },
						'End to end project develoment'
					),
					Object(preact_min["h"])(
						'div',
						{ 'class': home_default.a.projectManagement },
						'Project management services'
					),
					Object(preact_min["h"])(
						'div',
						{ 'class': home_default.a.consulting },
						'Consulting services and mentoring'
					)
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': home_default.a.blurb },
				Object(preact_min["h"])(
					'div',
					{ 'class': home_default.a.blurbtext },
					home__ref,
					home__ref2
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': home_default.a.blurbimage },
					_ref3
				)
			),
			_ref4,
			Object(preact_min["h"])(
				'div',
				{ 'class': home_default.a.blurb },
				Object(preact_min["h"])(
					'div',
					{ 'class': home_default.a.blurbimage },
					_ref5
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': home_default.a.blurbtext },
					_ref6
				)
			),
			_ref7
		);
	};

	return Home;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/capabilities/capabilities.css
var capabilities = __webpack_require__("vWif");
var capabilities_default = /*#__PURE__*/__webpack_require__.n(capabilities);

// CONCATENATED MODULE: ../node_modules/@fortawesome/react-fontawesome/index.es.js




var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var humps = createCommonjsModule(function (module) {
  (function (global) {

    var _processKeys = function _processKeys(convert, obj, options) {
      if (!_isObject(obj) || _isDate(obj) || _isRegExp(obj) || _isBoolean(obj) || _isFunction(obj)) {
        return obj;
      }

      var output,
          i = 0,
          l = 0;

      if (_isArray(obj)) {
        output = [];
        for (l = obj.length; i < l; i++) {
          output.push(_processKeys(convert, obj[i], options));
        }
      } else {
        output = {};
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            output[convert(key, options)] = _processKeys(convert, obj[key], options);
          }
        }
      }
      return output;
    };

    // String conversion methods

    var separateWords = function separateWords(string, options) {
      options = options || {};
      var separator = options.separator || '_';
      var split = options.split || /(?=[A-Z])/;

      return string.split(split).join(separator);
    };

    var camelize = function camelize(string) {
      if (_isNumerical(string)) {
        return string;
      }
      string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
      });
      // Ensure 1st char is always lowercase
      return string.substr(0, 1).toLowerCase() + string.substr(1);
    };

    var pascalize = function pascalize(string) {
      var camelized = camelize(string);
      // Ensure 1st char is always uppercase
      return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
    };

    var decamelize = function decamelize(string, options) {
      return separateWords(string, options).toLowerCase();
    };

    // Utilities
    // Taken from Underscore.js

    var toString = Object.prototype.toString;

    var _isFunction = function _isFunction(obj) {
      return typeof obj === 'function';
    };
    var _isObject = function _isObject(obj) {
      return obj === Object(obj);
    };
    var _isArray = function _isArray(obj) {
      return toString.call(obj) == '[object Array]';
    };
    var _isDate = function _isDate(obj) {
      return toString.call(obj) == '[object Date]';
    };
    var _isRegExp = function _isRegExp(obj) {
      return toString.call(obj) == '[object RegExp]';
    };
    var _isBoolean = function _isBoolean(obj) {
      return toString.call(obj) == '[object Boolean]';
    };

    // Performant way to determine if obj coerces to a number
    var _isNumerical = function _isNumerical(obj) {
      obj = obj - 0;
      return obj === obj;
    };

    // Sets up function which handles processing keys
    // allowing the convert function to be modified by a callback
    var _processor = function _processor(convert, options) {
      var callback = options && 'process' in options ? options.process : options;

      if (typeof callback !== 'function') {
        return convert;
      }

      return function (string, options) {
        return callback(string, convert, options);
      };
    };

    var humps = {
      camelize: camelize,
      decamelize: decamelize,
      pascalize: pascalize,
      depascalize: decamelize,
      camelizeKeys: function camelizeKeys(object, options) {
        return _processKeys(_processor(camelize, options), object);
      },
      decamelizeKeys: function decamelizeKeys(object, options) {
        return _processKeys(_processor(decamelize, options), object, options);
      },
      pascalizeKeys: function pascalizeKeys(object, options) {
        return _processKeys(_processor(pascalize, options), object);
      },
      depascalizeKeys: function depascalizeKeys() {
        return this.decamelizeKeys.apply(this, arguments);
      }
    };

    if (false) {
      undefined(humps);
    } else if ('object' !== 'undefined' && module.exports) {
      module.exports = humps;
    } else {
      global.humps = humps;
    }
  })(commonjsGlobal);
});

var index_es__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var defineProperty = function defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var index_es__extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var index_es_toConsumableArray = function toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
};

function capitalize(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

function styleToObject(style) {
  return style.split(';').map(function (s) {
    return s.trim();
  }).filter(function (s) {
    return s;
  }).reduce(function (acc, pair) {
    var i = pair.indexOf(':');
    var prop = humps.camelize(pair.slice(0, i));
    var value = pair.slice(i + 1).trim();

    prop.startsWith('webkit') ? acc[capitalize(prop)] = value : acc[prop] = value;

    return acc;
  }, {});
}

function convert(createElement, element) {
  var extraProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var children = (element.children || []).map(convert.bind(null, createElement));

  var mixins = Object.keys(element.attributes || {}).reduce(function (acc, key) {
    var val = element.attributes[key];

    switch (key) {
      case 'class':
        acc.attrs['className'] = val;
        delete element.attributes['class'];
        break;
      case 'style':
        acc.attrs['style'] = styleToObject(val);
        break;
      default:
        if (key.indexOf('aria-') === 0 || key.indexOf('data-') === 0) {
          acc.attrs[key.toLowerCase()] = val;
        } else {
          acc.attrs[humps.camelize(key)] = val;
        }
    }

    return acc;
  }, { attrs: {} });

  var _extraProps$style = extraProps.style,
      existingStyle = _extraProps$style === undefined ? {} : _extraProps$style,
      remaining = objectWithoutProperties(extraProps, ['style']);

  mixins.attrs['style'] = index_es__extends({}, mixins.attrs['style'], existingStyle);

  return createElement.apply(undefined, [element.tag, index_es__extends({}, mixins.attrs, remaining)].concat(index_es_toConsumableArray(children)));
}

var index_es_PRODUCTION = false;

try {
  index_es_PRODUCTION = "production" === 'production';
} catch (e) {}

function log() {
  if (!index_es_PRODUCTION && console && typeof console.error === 'function') {
    var _console;

    (_console = console).error.apply(_console, arguments);
  }
}

function objectWithKey(key, value) {
  return Array.isArray(value) && value.length > 0 || !Array.isArray(value) && value ? defineProperty({}, key, value) : {};
}

function classList(props) {
  var _classes;

  var classes = (_classes = {
    'fa-spin': props.spin,
    'fa-pulse': props.pulse,
    'fa-fw': props.fixedWidth,
    'fa-inverse': props.inverse,
    'fa-border': props.border,
    'fa-li': props.listItem,
    'fa-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
    'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both'
  }, defineProperty(_classes, 'fa-' + props.size, props.size !== null), defineProperty(_classes, 'fa-rotate-' + props.rotation, props.rotation !== null), defineProperty(_classes, 'fa-pull-' + props.pull, props.pull !== null), _classes);

  return Object.keys(classes).map(function (key) {
    return classes[key] ? key : null;
  }).filter(function (key) {
    return key;
  });
}

function normalizeIconArgs(icon$$1) {
  if (icon$$1 === null) {
    return null;
  }

  if ((typeof icon$$1 === 'undefined' ? 'undefined' : index_es__typeof(icon$$1)) === 'object' && icon$$1.prefix && icon$$1.iconName) {
    return icon$$1;
  }

  if (Array.isArray(icon$$1) && icon$$1.length === 2) {
    return { prefix: icon$$1[0], iconName: icon$$1[1] };
  }

  if (typeof icon$$1 === 'string') {
    return { prefix: 'fas', iconName: icon$$1 };
  }
}

function FontAwesomeIcon(props) {
  var iconArgs = props.icon,
      maskArgs = props.mask,
      symbol = props.symbol,
      className = props.className;

  var iconLookup = normalizeIconArgs(iconArgs);
  var classes = objectWithKey('classes', [].concat(index_es_toConsumableArray(classList(props)), index_es_toConsumableArray(className.split(' '))));
  var transform = objectWithKey('transform', typeof props.transform === 'string' ? parse.transform(props.transform) : props.transform);
  var mask = objectWithKey('mask', normalizeIconArgs(maskArgs));

  var renderedIcon = index_es_icon(iconLookup, index_es__extends({}, classes, transform, mask, {
    symbol: symbol
  }));

  if (!renderedIcon) {
    log('Could not find icon', iconLookup);
    return null;
  }

  var abstract = renderedIcon.abstract;

  var extraProps = {};

  Object.keys(props).forEach(function (key) {
    if (!FontAwesomeIcon.defaultProps.hasOwnProperty(key)) {
      extraProps[key] = props[key];
    }
  });

  return convertCurry(abstract[0], extraProps);
}

FontAwesomeIcon.displayName = 'FontAwesomeIcon';

FontAwesomeIcon.propTypes = {
  border: prop_types_default.a.bool,

  className: prop_types_default.a.string,

  mask: prop_types_default.a.oneOfType([prop_types_default.a.object, prop_types_default.a.array, prop_types_default.a.string]),

  fixedWidth: prop_types_default.a.bool,

  inverse: prop_types_default.a.bool,

  flip: prop_types_default.a.oneOf(['horizontal', 'vertical', 'both']),

  icon: prop_types_default.a.oneOfType([prop_types_default.a.object, prop_types_default.a.array, prop_types_default.a.string]),

  listItem: prop_types_default.a.bool,

  pull: prop_types_default.a.oneOf(['right', 'left']),

  pulse: prop_types_default.a.bool,

  rotation: prop_types_default.a.oneOf([90, 180, 270]),

  size: prop_types_default.a.oneOf(['lg', 'xs', 'sm', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x']),

  spin: prop_types_default.a.bool,

  symbol: prop_types_default.a.oneOfType([prop_types_default.a.bool, prop_types_default.a.string]),

  transform: prop_types_default.a.oneOfType([prop_types_default.a.string, prop_types_default.a.object])
};

FontAwesomeIcon.defaultProps = {
  border: false,
  className: '',
  mask: null,
  fixedWidth: false,
  inverse: false,
  flip: null,
  icon: null,
  listItem: false,
  pull: null,
  pulse: false,
  rotation: null,
  size: null,
  spin: false,
  symbol: false,
  transform: null
};

var convertCurry = convert.bind(null, preact_compat_es["default"].createElement);


// CONCATENATED MODULE: ./routes/capabilities/skill-icon.js


function skill_icon__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function skill_icon__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function skill_icon__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var skill_icon_SkillIcon = function (_Component) {
	skill_icon__inherits(SkillIcon, _Component);

	function SkillIcon() {
		skill_icon__classCallCheck(this, SkillIcon);

		return skill_icon__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	SkillIcon.prototype.render = function render() {
		var _props = this.props,
		    icon = _props.icon,
		    name = _props.name,
		    target = _props.target;

		return Object(preact_min["h"])(
			'a',
			{ 'class': capabilities_default.a.skillicon, href: target },
			Object(preact_min["h"])(FontAwesomeIcon, { icon: icon }),
			Object(preact_min["h"])(
				'div',
				null,
				name
			)
		);
	};

	return SkillIcon;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/capabilities/skill-detail.js


function skill_detail__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function skill_detail__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function skill_detail__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var skill_detail_SkillDetail = function (_Component) {
  skill_detail__inherits(SkillDetail, _Component);

  function SkillDetail() {
    skill_detail__classCallCheck(this, SkillDetail);

    return skill_detail__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  SkillDetail.prototype.render = function render() {
    var _props = this.props,
        icon = _props.icon,
        anchor = _props.anchor;

    var currentLocation = location && location.hash;
    var activeClass = '';
    if (currentLocation && currentLocation === '#' + anchor) {
      activeClass = ' ' + capabilities_default.a.active;
    }
    return Object(preact_min["h"])(
      'div',
      { 'class': capabilities_default.a.skilldetail },
      Object(preact_min["h"])('a', { name: anchor }),
      Object(preact_min["h"])(
        'div',
        { 'class': capabilities_default.a.skilldetailicon + activeClass },
        Object(preact_min["h"])(FontAwesomeIcon, { icon: icon })
      ),
      Object(preact_min["h"])(
        'div',
        { 'class': capabilities_default.a.skilldetailtext },
        this.props.children
      )
    );
  };

  return SkillDetail;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/capabilities/index.js


function capabilities__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function capabilities__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function capabilities__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var capabilities__ref = Object(preact_min["h"])(
	'h2',
	null,
	'Skills to pay the bills'
);

var capabilities__ref2 = Object(preact_min["h"])(
	'p',
	null,
	'Lorem ipsum made of gypsum.'
);

var capabilities__ref3 = Object(preact_min["h"])(skill_icon_SkillIcon, { icon: 'code', name: 'Front End', target: '#front-end' });

var capabilities__ref4 = Object(preact_min["h"])(skill_icon_SkillIcon, { icon: 'terminal', name: 'Back End', target: '#back-end' });

var capabilities__ref5 = Object(preact_min["h"])(skill_icon_SkillIcon, { icon: 'mobile-alt', name: 'Mobile', target: '#mobile' });

var capabilities__ref6 = Object(preact_min["h"])(skill_icon_SkillIcon, { icon: 'cloud', name: 'Cloud', target: '#cloud' });

var capabilities__ref7 = Object(preact_min["h"])(skill_icon_SkillIcon, { icon: 'pen-square', name: 'Design', target: '#design' });

var _ref8 = Object(preact_min["h"])(
	'div',
	{ 'class': 'jumbo' },
	'Excellence is not a skill, it\'s an attitude.',
	Object(preact_min["h"])(
		'cite',
		null,
		'Ralph Marston'
	)
);

var _ref9 = Object(preact_min["h"])(
	skill_detail_SkillDetail,
	{ icon: 'code', anchor: 'front-end' },
	Object(preact_min["h"])(
		'h2',
		null,
		'Front End'
	),
	'Hello. Here is where we detail.'
);

var _ref10 = Object(preact_min["h"])(
	skill_detail_SkillDetail,
	{ icon: 'terminal', anchor: 'back-end' },
	Object(preact_min["h"])(
		'h2',
		null,
		'Back End'
	),
	'Hello. Here is where we detail.'
);

var _ref11 = Object(preact_min["h"])(
	skill_detail_SkillDetail,
	{ icon: 'mobile-alt', anchor: 'mobile' },
	Object(preact_min["h"])(
		'h2',
		null,
		'Mobile'
	),
	'Hello. Here is where we detail.'
);

var _ref12 = Object(preact_min["h"])(
	skill_detail_SkillDetail,
	{ icon: 'cloud', anchor: 'cloud' },
	Object(preact_min["h"])(
		'h2',
		null,
		'Cloud Services'
	),
	'Hello. Here is where we detail.'
);

var _ref13 = Object(preact_min["h"])(
	skill_detail_SkillDetail,
	{ icon: 'pen-square', anchor: 'design' },
	Object(preact_min["h"])(
		'h2',
		null,
		'Design'
	),
	'Hello. Here is where we detail.'
);

var capabilities_Capabilities = function (_Component) {
	capabilities__inherits(Capabilities, _Component);

	function Capabilities() {
		capabilities__classCallCheck(this, Capabilities);

		return capabilities__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Capabilities.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': capabilities_default.a.capabilities },
			Object(preact_min["h"])(
				'div',
				{ 'class': 'page-header ' + capabilities_default.a.header },
				'How can we help you?'
			),
			capabilities__ref,
			capabilities__ref2,
			Object(preact_min["h"])(
				'div',
				{ 'class': capabilities_default.a.skillmenu },
				capabilities__ref3,
				capabilities__ref4,
				capabilities__ref5,
				capabilities__ref6,
				capabilities__ref7
			),
			_ref8,
			_ref9,
			_ref10,
			_ref11,
			_ref12,
			_ref13
		);
	};

	return Capabilities;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/about/about.css
var about = __webpack_require__("hyfA");
var about_default = /*#__PURE__*/__webpack_require__.n(about);

// CONCATENATED MODULE: ./routes/about/index.js


function about__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function about__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function about__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var about__ref = Object(preact_min["h"])(
	'p',
	null,
	'Codingscape is a software team that has been working with front and back end web solutions for over 20 years for companies large and small, including Zappos, Amazon, Overstock.com and Backcountry.  We will help you execute on your roadmap either directly by working with your engineers and product teams or by taking on projects for you.'
);

var about__ref2 = Object(preact_min["h"])(
	'p',
	null,
	'There is another paragraph here. It is pretty good and inspiring, but it\'s also thought provoking. You wonder what the author was thinking when they wrote this paragraph, and whether perhaps they are a little bit like you.'
);

var about__ref3 = Object(preact_min["h"])(
	'h2',
	null,
	'Founders'
);

var about__ref4 = Object(preact_min["h"])('img', { src: 'assets/images/porter.jpg' });

var about__ref5 = Object(preact_min["h"])(
	'b',
	null,
	'Porter Haney'
);

var about__ref6 = Object(preact_min["h"])(
	'p',
	null,
	'Porter wrangles the business side of Codingscape. When he\'s not building double decker nachos or skiing powder, he\'s crunching numbers and helping connect great people with one another. If you\'re willing to trade stories with him, you might hear something juicy. \uD83D\uDC4D'
);

var about__ref7 = Object(preact_min["h"])('img', { src: 'assets/images/jimmy.jpg' });

var about__ref8 = Object(preact_min["h"])(
	'b',
	null,
	'Jimmy Jacobson'
);

var about__ref9 = Object(preact_min["h"])(
	'p',
	null,
	'It\'d be hard to help raise little girls if they looked like lines of code. Luckily, Jimmy is half man, half machine. When he\'s not coding, he\'s deciding which technologies will best serve our clients. Pwning newbs at COD or rocking headstands in Yoga class, it makes no difference to him.'
);

var about__ref10 = Object(preact_min["h"])('img', { src: 'assets/images/pawel.jpg' });

var about__ref11 = Object(preact_min["h"])(
	'b',
	null,
	'Pawel Szymczykowski'
);

var about__ref12 = Object(preact_min["h"])(
	'p',
	null,
	'Pawel likes to make things. Sometimes they are made of wood or PLA, sometimes electronic components, and other times they are made out of code. He is an architect and cofounder at Codingscape and does some other useful things too. He has a Shiba Inu named \uD83C\uDF44.'
);

var about_About = function (_Component) {
	about__inherits(About, _Component);

	function About() {
		about__classCallCheck(this, About);

		return about__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	About.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': about_default.a.about },
			Object(preact_min["h"])(
				'div',
				{ 'class': 'page-header ' + about_default.a.header },
				'Our Story'
			),
			about__ref,
			about__ref2,
			about__ref3,
			Object(preact_min["h"])(
				'div',
				{ 'class': about_default.a.founder },
				Object(preact_min["h"])(
					'div',
					{ 'class': about_default.a.founderimage },
					about__ref4
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': about_default.a.foundertext },
					about__ref5,
					about__ref6
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': about_default.a.founder },
				Object(preact_min["h"])(
					'div',
					{ 'class': about_default.a.founderimage },
					about__ref7
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': about_default.a.foundertext },
					about__ref8,
					about__ref9
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': about_default.a.founder },
				Object(preact_min["h"])(
					'div',
					{ 'class': about_default.a.founderimage },
					about__ref10
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': about_default.a.foundertext },
					about__ref11,
					about__ref12
				)
			)
		);
	};

	return About;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/contact/contact.css
var contact = __webpack_require__("iMnN");
var contact_default = /*#__PURE__*/__webpack_require__.n(contact);

// CONCATENATED MODULE: ./routes/contact/index.js


function contact__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function contact__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function contact__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var contact__ref = Object(preact_min["h"])(
	'div',
	{ 'class': 'jumbo' },
	'Do you have a project for us? Let\'s talk.'
);

var contact__ref2 = Object(preact_min["h"])(
	'form',
	null,
	Object(preact_min["h"])(
		'div',
		{ 'class': 'formgroup' },
		Object(preact_min["h"])(
			'label',
			{ 'for': 'name' },
			'Name'
		),
		Object(preact_min["h"])('input', { type: 'text', name: 'name', id: 'name' })
	),
	Object(preact_min["h"])(
		'div',
		{ 'class': 'formgroup' },
		Object(preact_min["h"])(
			'label',
			{ 'for': 'email' },
			'Email'
		),
		Object(preact_min["h"])('input', { type: 'text', name: 'email', id: 'email' })
	),
	Object(preact_min["h"])(
		'div',
		{ 'class': 'formgroup' },
		Object(preact_min["h"])(
			'label',
			{ 'for': 'message' },
			'Message'
		),
		Object(preact_min["h"])('textarea', { name: 'message', id: 'message', rows: '4' })
	),
	Object(preact_min["h"])(
		'button',
		{ type: 'submit' },
		'Submit'
	)
);

var contact_Contact = function (_Component) {
	contact__inherits(Contact, _Component);

	function Contact() {
		contact__classCallCheck(this, Contact);

		return contact__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Contact.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': contact_default.a.contact },
			Object(preact_min["h"])('div', { 'class': 'page-header ' + contact_default.a.header }),
			contact__ref,
			contact__ref2
		);
	};

	return Contact;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./components/footer/style.css
var footer_style = __webpack_require__("ZMjw");
var footer_style_default = /*#__PURE__*/__webpack_require__.n(footer_style);

// CONCATENATED MODULE: ./components/footer/index.js


function footer__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function footer__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function footer__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var footer_Footer = function (_Component) {
	footer__inherits(Footer, _Component);

	function Footer() {
		footer__classCallCheck(this, Footer);

		return footer__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Footer.prototype.render = function render() {
		return Object(preact_min["h"])(
			'footer',
			{ 'class': footer_style_default.a.footer },
			Object(preact_min["h"])(
				'div',
				{ 'class': footer_style_default.a.copyright },
				'Copyright \xA9 2018 Codingscape LLC. All rights reserved.'
			),
			Object(preact_min["h"])(
				'nav',
				null,
				Object(preact_min["h"])(
					match["Link"],
					{ href: '/contact', 'class': footer_style_default.a.contact },
					'Contact Us'
				)
			)
		);
	};

	return Footer;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/app.js
var app__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







library.add(faCode);
library.add(faTerminal);
library.add(faMobileAlt);
library.add(faCloud);
library.add(faPenSquare);








// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

if (false) {
	require('preact/debug');
}

var app__ref = Object(preact_min["h"])(header_Header, null);

var app__ref2 = Object(preact_min["h"])(home_Home, { path: '/', 'default': true });

var app__ref3 = Object(preact_min["h"])(capabilities_Capabilities, { path: '/capabilities' });

var app__ref4 = Object(preact_min["h"])(about_About, { path: '/about' });

var app__ref5 = Object(preact_min["h"])(contact_Contact, { path: '/contact' });

var app__ref6 = Object(preact_min["h"])(footer_Footer, null);

var app_App = function (_Component) {
	app__inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		app__classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = app__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
			_this.currentUrl = e.url;
		}, _temp), app__possibleConstructorReturn(_this, _ret);
	}
	/** Gets fired when the route changes.
  *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
  *	@param {string} event.url	The newly routed URL
  */


	App.prototype.render = function render() {
		var routerOptions = {};
		if (typeof document !== 'undefined') {
			// Avoid DOM error during pre-render step
			routerOptions.history = createHashHistory_default()();
		}
		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			app__ref,
			Object(preact_min["h"])(
				preact_router_es["Router"],
				app__extends({ onChange: this.handleRoute }, routerOptions),
				app__ref2,
				app__ref3,
				app__ref4,
				app__ref5
			),
			app__ref6
		);
	};

	return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index_0 = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "OE+N":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
}; //  weak


exports.getInterpolator = getInterpolator;

exports.default = function (nameSpace, attr, value) {
  return getTween.call(this, nameSpace, attr, value);
};

var _d3Interpolate = __webpack_require__("RdXB");

function getInterpolator(attr) {
  if (attr === 'transform') {
    return _d3Interpolate.interpolateTransformSvg;
  }

  return _d3Interpolate.interpolate;
}

function getTween(nameSpace, attr, value1) {
  return function tween() {
    var _this = this;

    var value0 = nameSpace ? this.state[nameSpace][attr] : this.state[attr];

    if (value0 === value1) {
      return null;
    }

    var i = getInterpolator(attr)(value0, value1);

    var stateTween = void 0;

    if (nameSpace === null) {
      stateTween = function stateTween(t) {
        _this.setState(function () {
          var _ref;

          return _ref = {}, _ref[attr] = i(t), _ref;
        });
      };
    } else {
      stateTween = function stateTween(t) {
        _this.setState(function (state) {
          var _extends2, _ref2;

          return _ref2 = {}, _ref2[nameSpace] = _extends({}, state[nameSpace], (_extends2 = {}, _extends2[attr] = i(t), _extends2)), _ref2;
        });
      };
    }

    return stateTween;
  };
}

/***/ }),

/***/ "OWwF":
/***/ (function(module, exports) {

var supportsArgumentsClass = function () {
  return Object.prototype.toString.call(arguments);
}() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object) {
  return object && typeof object == 'object' && typeof object.length == 'number' && Object.prototype.hasOwnProperty.call(object, 'callee') && !Object.prototype.propertyIsEnumerable.call(object, 'callee') || false;
};

/***/ }),

/***/ "QCZ+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.preset = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
}; //  weak

exports.newId = newId;
exports.default = transition;

var _d3Timer = __webpack_require__("SAuC");

var _tween = __webpack_require__("OE+N");

var _tween2 = _interopRequireDefault(_tween);

var _schedule = __webpack_require__("T8j2");

var _schedule2 = _interopRequireDefault(_schedule);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function once(func) {
  var called = false;

  return function transitionEvent() {
    if (!called) {
      called = true;
      func.call(this);
    }
  };
}

var id = 0;

function newId() {
  return ++id;
}

// from https://github.com/d3/d3-ease/blob/master/src/linear.js
function linear(t) {
  return +t;
}

var preset = exports.preset = {
  time: null,
  delay: 0,
  duration: 250,
  ease: linear
};

function scheduleTransitions() {
  var _this = this;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var transitions = _extends({}, config);

  var events = transitions.events || {};
  delete transitions.events;

  // each event handler should be called only once
  Object.keys(events).forEach(function (d) {
    if (typeof events[d] !== 'function') {
      throw new Error('Event handlers must be a function');
    } else {
      events[d] = once(events[d]);
    }
  });

  var timing = transitions.timing || {};
  delete transitions.timing;

  Object.keys(transitions).forEach(function (stateKey) {
    var tweens = [];

    if (_typeof(transitions[stateKey]) === 'object' && Array.isArray(transitions[stateKey]) === false) {
      Object.keys(transitions[stateKey]).forEach(function (attr) {
        var val = transitions[stateKey][attr];

        if (Array.isArray(val)) {
          if (val.length === 1) {
            tweens.push(_tween2.default.call(_this, stateKey, attr, val[0]));
          } else {
            _this.setState(function (state) {
              var _extends2, _ref;

              return _ref = {}, _ref[stateKey] = _extends({}, state[stateKey], (_extends2 = {}, _extends2[attr] = val[0], _extends2)), _ref;
            });

            tweens.push(_tween2.default.call(_this, stateKey, attr, val[1]));
          }
        } else if (typeof val === 'function') {
          var getResonanceCustomTween = function getResonanceCustomTween() {
            var resonanceCustomTween = function resonanceCustomTween(t) {
              _this.setState(function (state) {
                var _extends3, _ref2;

                return _ref2 = {}, _ref2[stateKey] = _extends({}, state[stateKey], (_extends3 = {}, _extends3[attr] = val(t), _extends3)), _ref2;
              });
            };

            return resonanceCustomTween;
          };

          tweens.push(getResonanceCustomTween);
        } else {
          _this.setState(function (state) {
            var _extends4, _ref3;

            return _ref3 = {}, _ref3[stateKey] = _extends({}, state[stateKey], (_extends4 = {}, _extends4[attr] = val, _extends4)), _ref3;
          });
          // This assures any existing transitions are stopped
          tweens.push(_tween2.default.call(_this, stateKey, attr, val));
        }
      });
    } else {
      var val = transitions[stateKey];

      if (Array.isArray(val)) {
        if (val.length === 1) {
          tweens.push(_tween2.default.call(_this, null, stateKey, val[0]));
        } else {
          _this.setState(function () {
            var _ref4;

            return _ref4 = {}, _ref4[stateKey] = val[0], _ref4;
          });

          tweens.push(_tween2.default.call(_this, null, stateKey, val[1]));
        }
      } else if (typeof val === 'function') {
        var getResonanceCustomTween = function getResonanceCustomTween() {
          var resonanceCustomTween = function resonanceCustomTween(t) {
            _this.setState(function () {
              var _ref5;

              return _ref5 = {}, _ref5[stateKey] = val(t), _ref5;
            });
          };

          return resonanceCustomTween;
        };

        tweens.push(getResonanceCustomTween);
      } else {
        _this.setState(function () {
          var _ref6;

          return _ref6 = {}, _ref6[stateKey] = val, _ref6;
        });
        // This assures any existing transitions are stopped
        tweens.push(_tween2.default.call(_this, null, stateKey, val));
      }
    }

    var timingConfig = _extends({}, preset, timing, { time: (0, _d3Timer.now)() });
    (0, _schedule2.default)(_this, stateKey, newId(), timingConfig, tweens, events);
  });
}

function transition(config) {
  var _this2 = this;

  if (Array.isArray(config)) {
    config.forEach(function (c) {
      scheduleTransitions.call(_this2, c);
    });
  } else {
    scheduleTransitions.call(this, config);
  }
}

/***/ }),

/***/ "RKsu":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
/* global define */

(function () {
	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return ExecutionEnvironment;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExecutionEnvironment;
	} else {
		window.ExecutionEnvironment = ExecutionEnvironment;
	}
})();

/***/ }),

/***/ "RdXB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ../node_modules/d3-color/src/define.js
/* harmony default export */ var define = (function (constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
});

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) {
    prototype[key] = definition[key];
  }return prototype;
}
// CONCATENATED MODULE: ../node_modules/d3-color/src/color.js


function Color() {}

var _darker = 0.7;

var _brighter = 1 / _darker;


var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex3 = /^#([0-9a-f]{3})$/,
    reHex6 = /^#([0-9a-f]{6})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color_color, {
  displayable: function displayable() {
    return this.rgb().displayable();
  },
  hex: function hex() {
    return this.rgb().hex();
  },
  toString: function toString() {
    return this.rgb() + "";
  }
});

function color_color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb(m >> 8 & 0xf | m >> 4 & 0x0f0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
  ) : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
  : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
  : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
  : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
  : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
  : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
  : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
  : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color_color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function color_rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, color_rgb, extend(Color, {
  brighter: function brighter(k) {
    k = k == null ? _brighter : Math.pow(_brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _darker : Math.pow(_darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function rgb() {
    return this;
  },
  displayable: function displayable() {
    return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: function hex() {
    return "#" + _hex(this.r) + _hex(this.g) + _hex(this.b);
  },
  toString: function toString() {
    var a = this.opacity;a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
  }
}));

function _hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color_color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter: function brighter(k) {
    k = k == null ? _brighter : Math.pow(_brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _darker : Math.pow(_darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
// CONCATENATED MODULE: ../node_modules/d3-color/src/math.js
var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;
// CONCATENATED MODULE: ../node_modules/d3-color/src/lab.js




// https://beta.observablehq.com/@mbostock/lab-and-rgb
var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) {
    if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
    var h = o.h * deg2rad;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
      x,
      z;
  if (r === g && g === b) x = z = y;else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

define(Lab, lab, extend(Color, {
  brighter: function brighter(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function darker(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function rgb() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * rad2deg;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hcl, hcl, extend(Color, {
  brighter: function brighter(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function darker(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function rgb() {
    return labConvert(this).rgb();
  }
}));
// CONCATENATED MODULE: ../node_modules/d3-color/src/cubehelix.js




var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)),
      // NaN if l=0 or l=1
  h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix_cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Cubehelix, cubehelix_cubehelix, extend(Color, {
  brighter: function brighter(k) {
    k = k == null ? _brighter : Math.pow(_brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _darker : Math.pow(_darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function rgb() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
  }
}));
// CONCATENATED MODULE: ../node_modules/d3-color/index.js



// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1,
      t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}

/* harmony default export */ var src_basis = (function (values) {
  var n = values.length - 1;
  return function (t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
});
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/basisClosed.js


/* harmony default export */ var basisClosed = (function (values) {
  var n = values.length;
  return function (t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
});
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/constant.js
/* harmony default export */ var constant = (function (x) {
  return function () {
    return x;
  };
});
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/color.js


function linear(a, d) {
  return function (t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
    return Math.pow(a + t * b, y);
  };
}

function color_hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function (a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
}
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/rgb.js





/* harmony default export */ var src_rgb = ((function rgbGamma(y) {
  var color = gamma(y);

  function rgb(start, end) {
    var r = color((start = color_rgb(start)).r, (end = color_rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function (t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1));

function rgbSpline(spline) {
  return function (colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i,
        color;
    for (i = 0; i < n; ++i) {
      color = color_rgb(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function (t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(src_basis);
var rgbBasisClosed = rgbSpline(basisClosed);
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/array.js


/* harmony default export */ var array = (function (a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) {
    x[i] = src_value(a[i], b[i]);
  }for (; i < nb; ++i) {
    c[i] = b[i];
  }return function (t) {
    for (i = 0; i < na; ++i) {
      c[i] = x[i](t);
    }return c;
  };
});
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/date.js
/* harmony default export */ var date = (function (a, b) {
  var d = new Date();
  return a = +a, b -= a, function (t) {
    return d.setTime(a + b * t), d;
  };
});
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/number.js
/* harmony default export */ var number = (function (a, b) {
  return a = +a, b -= a, function (t) {
    return a + b * t;
  };
});
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/object.js


/* harmony default export */ var object = (function (a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = src_value(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function (t) {
    for (k in i) {
      c[k] = i[k](t);
    }return c;
  };
});
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/string.js


var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function () {
    return b;
  };
}

function one(b) {
  return function (t) {
    return b(t) + "";
  };
}

/* harmony default export */ var string = (function (a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0,
      // scan index for next number in b
  am,
      // current match in a
  bm,
      // current match in b
  bs,
      // string preceding current number in b, if any
  i = -1,
      // index in s
  s = [],
      // string constants and placeholders
  q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else {
      // interpolate non-matching numbers
      s[++i] = null;
      q.push({ i: i, x: number(am, bm) });
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
    for (var i = 0, o; i < b; ++i) {
      s[(o = q[i]).i] = o.x(t);
    }return s.join("");
  });
});
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/value.js









/* harmony default export */ var src_value = (function (a, b) {
    var t = typeof b,
        c;
    return b == null || t === "boolean" ? constant(b) : (t === "number" ? number : t === "string" ? (c = color_color(b)) ? (b = c, src_rgb) : string : b instanceof color_color ? src_rgb : b instanceof Date ? date : Array.isArray(b) ? array : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : number)(a, b);
});
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/round.js
/* harmony default export */ var round = (function (a, b) {
  return a = +a, b -= a, function (t) {
    return Math.round(a + b * t);
  };
});
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;

var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

/* harmony default export */ var decompose = (function (a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
});
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/transform/parse.js


var cssNode, cssRoot, cssView, svgNode;

function parseCss(value) {
  if (value === "none") return identity;
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/transform/index.js



function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number(xa, xb) }, { i: i - 2, x: number(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;else if (b - a > 180) a += 360; // shortest path
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number(xa, xb) }, { i: i - 2, x: number(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function (a, b) {
    var s = [],
        // string constants and placeholders
    q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function (t) {
      var i = -1,
          n = q.length,
          o;
      while (++i < n) {
        s[(o = q[i]).i] = o.x(t);
      }return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/zoom.js
var rho = Math.SQRT2,
    rho2 = 2,
    rho4 = 4,
    epsilon2 = 1e-12;

function zoom_cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function zoom_sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
/* harmony default export */ var zoom = (function (p0, p1) {
  var ux0 = p0[0],
      uy0 = p0[1],
      w0 = p0[2],
      ux1 = p1[0],
      uy1 = p1[1],
      w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

  // Special case for u0 ≅ u1.
  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;
    i = function i(t) {
      return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
    };
  }

  // General case.
  else {
      var d1 = Math.sqrt(d2),
          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function i(t) {
        var s = t * S,
            coshr0 = zoom_cosh(r0),
            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - zoom_sinh(r0));
        return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / zoom_cosh(rho * s + r0)];
      };
    }

  i.duration = S * 1000;

  return i;
});
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/hsl.js



function hsl_hsl(hue) {
  return function (start, end) {
    var h = hue((start = hsl(start)).h, (end = hsl(end)).h),
        s = nogamma(start.s, end.s),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
    return function (t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  };
}

/* harmony default export */ var src_hsl = (hsl_hsl(color_hue));
var hslLong = hsl_hsl(nogamma);
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/lab.js



function lab_lab(start, end) {
  var l = nogamma((start = lab(start)).l, (end = lab(end)).l),
      a = nogamma(start.a, end.a),
      b = nogamma(start.b, end.b),
      opacity = nogamma(start.opacity, end.opacity);
  return function (t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/hcl.js



function hcl_hcl(hue) {
  return function (start, end) {
    var h = hue((start = hcl(start)).h, (end = hcl(end)).h),
        c = nogamma(start.c, end.c),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
    return function (t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  };
}

/* harmony default export */ var src_hcl = (hcl_hcl(color_hue));
var hclLong = hcl_hcl(nogamma);
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/cubehelix.js



function src_cubehelix_cubehelix(hue) {
  return function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = cubehelix_cubehelix(start)).h, (end = cubehelix_cubehelix(end)).h),
          s = nogamma(start.s, end.s),
          l = nogamma(start.l, end.l),
          opacity = nogamma(start.opacity, end.opacity);
      return function (t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix.gamma = cubehelixGamma;

    return cubehelix;
  }(1);
}

/* harmony default export */ var src_cubehelix = (src_cubehelix_cubehelix(color_hue));
var cubehelixLong = src_cubehelix_cubehelix(nogamma);
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/piecewise.js
function piecewise(interpolate, values) {
  var i = 0,
      n = values.length - 1,
      v = values[0],
      I = new Array(n < 0 ? 0 : n);
  while (i < n) {
    I[i] = interpolate(v, v = values[++i]);
  }return function (t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}
// CONCATENATED MODULE: ../node_modules/d3-interpolate/src/quantize.js
/* harmony default export */ var quantize = (function (interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) {
    samples[i] = interpolator(i / (n - 1));
  }return samples;
});
// CONCATENATED MODULE: ../node_modules/d3-interpolate/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolate", function() { return src_value; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateArray", function() { return array; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateBasis", function() { return src_basis; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateBasisClosed", function() { return basisClosed; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateDate", function() { return date; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateNumber", function() { return number; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateObject", function() { return object; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateRound", function() { return round; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateString", function() { return string; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateTransformCss", function() { return interpolateTransformCss; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateTransformSvg", function() { return interpolateTransformSvg; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateZoom", function() { return zoom; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateRgb", function() { return src_rgb; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateRgbBasis", function() { return rgbBasis; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateRgbBasisClosed", function() { return rgbBasisClosed; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateHsl", function() { return src_hsl; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateHslLong", function() { return hslLong; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateLab", function() { return lab_lab; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateHcl", function() { return src_hcl; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateHclLong", function() { return hclLong; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateCubehelix", function() { return src_cubehelix; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateCubehelixLong", function() { return cubehelixLong; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "piecewise", function() { return piecewise; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "quantize", function() { return quantize; });



















/***/ }),

/***/ "SAuC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ../node_modules/d3-timer/src/timer.js
var timer_frame = 0,
    // is an animation frame pending?
timeout = 0,
    // is a timeout pending?
interval = 0,
    // are any timers active?
pokeDelay = 1000,
    // how frequently we check for clock skew
taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (f) {
  setTimeout(f, 17);
};

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call = this._time = this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function restart(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function stop() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++timer_frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead,
      e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --timer_frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  timer_frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    timer_frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(),
      delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0,
      t1 = taskHead,
      t2,
      time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (timer_frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    timer_frame = 1, setFrame(wake);
  }
}
// CONCATENATED MODULE: ../node_modules/d3-timer/src/timeout.js


/* harmony default export */ var src_timeout = (function (callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart(function (elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
});
// CONCATENATED MODULE: ../node_modules/d3-timer/src/interval.js


/* harmony default export */ var src_interval = (function (callback, delay, time) {
  var t = new Timer(),
      total = delay;
  if (delay == null) return t.restart(callback, delay, time), t;
  delay = +delay, time = time == null ? now() : +time;
  t.restart(function tick(elapsed) {
    elapsed += total;
    t.restart(tick, total += delay, time);
    callback(elapsed);
  }, delay, time);
  return t;
});
// CONCATENATED MODULE: ../node_modules/d3-timer/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "now", function() { return now; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timer", function() { return timer; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timerFlush", function() { return timerFlush; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeout", function() { return src_timeout; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interval", function() { return src_interval; });






/***/ }),

/***/ "T1T2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = stop;
//  weak

function stop() {
  var ts = this.TRANSITION_SCHEDULES;

  if (ts) {
    Object.keys(ts).forEach(function (s) {
      ts[s].timer.stop();
    });
  }
}

/***/ }),

/***/ "T8j2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
}; //  weak
/* eslint no-use-before-define: "off" */
// Apapted from https://github.com/d3/d3-transition/blob/master/src/transition/schedule.js

exports.default = function (node, stateKey, id, timing, tweens) {
  var events = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

  var schedules = node.TRANSITION_SCHEDULES;
  if (!schedules) {
    node.TRANSITION_SCHEDULES = {}; // eslint-disable-line no-param-reassign
  } else if (id in schedules) {
    return;
  }

  var config = _extends({ stateKey: stateKey, events: events, tweens: tweens }, timing, { timer: null, state: CREATED });
  create(node, id, config);
};

var _d3Timer = __webpack_require__("SAuC");

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

function create(node, id, config) {
  var schedules = node.TRANSITION_SCHEDULES;

  // Initialize the transition timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  var transition = _extends({}, config);
  var n = transition.tweens.length;
  var tweens = new Array(n);

  schedules[id] = transition;
  transition.timer = (0, _d3Timer.timer)(schedule, 0, transition.time);

  function schedule(elapsed) {
    transition.state = SCHEDULED;
    transition.timer.restart(start, transition.delay, transition.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (transition.delay <= elapsed) {
      start(elapsed - transition.delay);
    }
  }

  function start(elapsed) {
    // eslint-disable-line consistent-return
    // If the state is not SCHEDULED, then we previously errored on start.
    if (transition.state !== SCHEDULED) return stop();

    for (var sid in schedules) {
      // eslint-disable-line
      var s = schedules[sid];

      if (s.stateKey !== transition.stateKey) {
        continue; // eslint-disable-line no-continue
      }

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (s.state === STARTED) return (0, _d3Timer.timeout)(start);

      // 1. Interrupt the active transition, if any. dispatch the interrupt event.
      // 2. Cancel any pre-empted transitions. No interrupt event is dispatched
      // because the cancelled transitions never started. Note that this also
      // removes this transition from the pending list!

      if (s.state === RUNNING) {
        s.state = ENDED;
        s.timer.stop();
        if (s.events.interrupt && typeof s.events.interrupt === 'function') {
          s.events.interrupt.call(this);
        }
        delete schedules[sid];
      } else if (+sid < id) {
        s.state = ENDED;
        s.timer.stop();
        delete schedules[sid];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    (0, _d3Timer.timeout)(function () {
      if (transition.state === STARTED) {
        transition.state = RUNNING;
        transition.timer.restart(tick, transition.delay, transition.time);
        tick(elapsed);
      }
    });

    transition.state = STARTING;
    if (transition.events.start && typeof transition.events.start === 'function') {
      transition.events.start.call(node);
    }

    if (transition.state !== STARTING) {
      // interrupted
      return; // eslint-disable-line consistent-return
    }

    transition.state = STARTED;

    // Initialize the tween, deleting null tween.
    var j = -1;

    for (var i = 0; i < n; ++i) {
      var res = transition.tweens[i].call(node);

      if (res) {
        tweens[++j] = res;
      }
    }

    tweens.length = j + 1;
  }

  function tick(elapsed) {
    var t = 1;

    if (elapsed < transition.duration) {
      t = transition.ease.call(null, elapsed / transition.duration);
    } else {
      transition.timer.restart(stop);
      transition.state = ENDING;
    }

    var i = -1;

    while (++i < tweens.length) {
      tweens[i].call(null, t);
    }

    if (transition.state === ENDING) {
      if (transition.events.end && typeof transition.events.end === 'function') {
        transition.events.end.call(node);
      }
      stop();
    }
  }

  function stop() {
    transition.state = ENDED;
    transition.timer.stop();

    delete schedules[id];
    for (var i in schedules) {
      return;
    } // eslint-disable-line guard-for-in, no-restricted-syntax
    delete node.TRANSITION_SCHEDULES; // eslint-disable-line no-param-reassign
  }
}

/***/ }),

/***/ "UQex":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ "UyDz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = "production";

var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/***/ }),

/***/ "XOCG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "production" !== 'production';

var warning = function warning() {};

if (__DEV__) {
  warning = function warning(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.length < 10 || /^[s\W]*$/.test(format)) {
      throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    }
  };
}

module.exports = warning;

/***/ }),

/***/ "ZMjw":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"footer":"footer__2jd7n","contact":"contact__2ETad"};

/***/ }),

/***/ "bf5F":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.warn = exports.requestAnimationFrame = exports.reducePropsToState = exports.mapStateOnServer = exports.handleClientStateChange = exports.convertReactPropstoHtmlAttributes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _react = __webpack_require__("eW0v");

var _react2 = _interopRequireDefault(_react);

var _objectAssign = __webpack_require__("J4Nk");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _HelmetConstants = __webpack_require__("lgg6");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (encode === false) {
        return String(str);
    }

    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, _HelmetConstants.TAG_NAMES.TITLE);
    var innermostTemplate = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.TITLE_TEMPLATE);

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFAULT_TITLE);

    return innermostTitle || innermostDefaultTitle || undefined;
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[_HelmetConstants.TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        if (Array.isArray(props[tagName])) {
            return true;
        }
        if (typeof props[tagName] !== "undefined") {
            warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
        }
        return false;
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props.hasOwnProperty(property)) {
            return props[property];
        }
    }

    return null;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        bodyAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.BODY, propsList),
        defer: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFER),
        encode: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
        htmlAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.HTML, propsList),
        linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
        noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        onChangeClientState: getOnChangeClientState(propsList),
        scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.TITLE, propsList)
    };
};

var rafPolyfill = function () {
    var clock = Date.now();

    return function (callback) {
        var currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(function () {
                rafPolyfill(callback);
            }, 0);
        }
    };
}();

var cafPolyfill = function cafPolyfill(id) {
    return clearTimeout(id);
};

var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;

var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;

var warn = function warn(msg) {
    return console && typeof console.warn === "function" && console.warn(msg);
};

var _helmetCallback = null;

var handleClientStateChange = function handleClientStateChange(newState) {
    if (_helmetCallback) {
        cancelAnimationFrame(_helmetCallback);
    }

    if (newState.defer) {
        _helmetCallback = requestAnimationFrame(function () {
            commitTagChanges(newState, function () {
                _helmetCallback = null;
            });
        });
    } else {
        commitTagChanges(newState);
        _helmetCallback = null;
    }
};

var commitTagChanges = function commitTagChanges(newState, cb) {
    var baseTag = newState.baseTag,
        bodyAttributes = newState.bodyAttributes,
        htmlAttributes = newState.htmlAttributes,
        linkTags = newState.linkTags,
        metaTags = newState.metaTags,
        noscriptTags = newState.noscriptTags,
        onChangeClientState = newState.onChangeClientState,
        scriptTags = newState.scriptTags,
        styleTags = newState.styleTags,
        title = newState.title,
        titleAttributes = newState.titleAttributes;

    updateAttributes(_HelmetConstants.TAG_NAMES.BODY, bodyAttributes);
    updateAttributes(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes);

    updateTitle(title, titleAttributes);

    var tagUpdates = {
        baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
        noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };

    var addedTags = {};
    var removedTags = {};

    Object.keys(tagUpdates).forEach(function (tagType) {
        var _tagUpdates$tagType = tagUpdates[tagType],
            newTags = _tagUpdates$tagType.newTags,
            oldTags = _tagUpdates$tagType.oldTags;

        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    cb && cb();

    onChangeClientState(newState, addedTags, removedTags);
};

var flattenArray = function flattenArray(possibleArray) {
    return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};

var updateTitle = function updateTitle(title, attributes) {
    if (typeof title !== "undefined" && document.title !== title) {
        document.title = flattenArray(title);
    }

    updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var elementTag = document.getElementsByTagName(tagName)[0];

    if (!elementTag) {
        return;
    }

    var helmetAttributeString = elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";

        if (elementTag.getAttribute(attribute) !== value) {
            elementTag.setAttribute(attribute, value);
        }

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        elementTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        elementTag.removeAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
    } else if (elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
        elementTag.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, attributeKeys.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector(_HelmetConstants.TAG_NAMES.HEAD);
    var tagNodes = headElement.querySelectorAll(type + "[" + _HelmetConstants.HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML) {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
    var attributeString = generateElementAttributesAsString(attributes);
    var flattenedTitle = flattenArray(title);
    return attributeString ? "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT);
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = _HelmetConstants.SELF_CLOSING_TAGS.indexOf(type) === -1;

        return str + "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
    var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(attributes).reduce(function (obj, key) {
        obj[_HelmetConstants.REACT_TAG_MAP[key] || key] = attributes[key];
        return obj;
    }, initProps);
};

var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
    var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(props).reduce(function (obj, key) {
        obj[_HelmetConstants.HTML_TAG_MAP[key] || key] = props[key];
        return obj;
    }, initAttributes);
};

var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
    var _initProps;

    // assigning into an array to define toString function on it
    var initProps = (_initProps = {
        key: title
    }, _initProps[_HelmetConstants.HELMET_ATTRIBUTE] = true, _initProps);
    var props = convertElementAttributestoReactProps(attributes, initProps);

    return [_react2.default.createElement(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var _mappedTag;

        var mappedTag = (_mappedTag = {
            key: i
        }, _mappedTag[_HelmetConstants.HELMET_ATTRIBUTE] = true, _mappedTag);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = _HelmetConstants.REACT_TAG_MAP[attribute] || attribute;

            if (mappedAttribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || mappedAttribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return _react2.default.createElement(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
    switch (type) {
        case _HelmetConstants.TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
                }
            };
        case _HelmetConstants.ATTRIBUTE_NAMES.BODY:
        case _HelmetConstants.ATTRIBUTE_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return convertElementAttributestoReactProps(tags);
                },
                toString: function toString() {
                    return generateElementAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsReactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags, encode);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var baseTag = _ref.baseTag,
        bodyAttributes = _ref.bodyAttributes,
        encode = _ref.encode,
        htmlAttributes = _ref.htmlAttributes,
        linkTags = _ref.linkTags,
        metaTags = _ref.metaTags,
        noscriptTags = _ref.noscriptTags,
        scriptTags = _ref.scriptTags,
        styleTags = _ref.styleTags,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? "" : _ref$title,
        titleAttributes = _ref.titleAttributes;
    return {
        base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag, encode),
        bodyAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
        htmlAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
        link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags, encode),
        meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags, encode),
        noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags, encode),
        script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags, encode),
        style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags, encode),
        title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }, encode)
    };
};

exports.convertReactPropstoHtmlAttributes = convertReactPropstoHtmlAttributes;
exports.handleClientStateChange = handleClientStateChange;
exports.mapStateOnServer = mapStateOnServer;
exports.reducePropsToState = reducePropsToState;
exports.requestAnimationFrame = requestAnimationFrame;
exports.warn = warn;

/***/ }),

/***/ "eW0v":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOM", function() { return DOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return Children; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClass", function() { return createClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return createFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return isValidElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDOMNode", function() { return findDOMNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmountComponentAtNode", function() { return unmountComponentAtNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return PureComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_renderSubtreeIntoContainer", function() { return renderSubtreeIntoContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return extend; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__("5D9O");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a; });



var version = '15.1.0'; // trick libraries to think we are react

var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

var REACT_ELEMENT_TYPE = typeof Symbol !== 'undefined' && Symbol.for && Symbol.for('react.element') || 0xeac7;

var COMPONENT_WRAPPER_KEY = typeof Symbol !== 'undefined' && Symbol.for ? Symbol.for('__preactCompatWrapper') : '__preactCompatWrapper';

// don't autobind these methods since they already have guaranteed context.
var AUTOBIND_BLACKLIST = {
	constructor: 1,
	render: 1,
	shouldComponentUpdate: 1,
	componentWillReceiveProps: 1,
	componentWillUpdate: 1,
	componentDidUpdate: 1,
	componentWillMount: 1,
	componentDidMount: 1,
	componentWillUnmount: 1,
	componentDidUnmount: 1
};

var CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/;

var BYPASS_HOOK = {};

/*global process*/
var DEV = typeof process === 'undefined' || !process.env || "production" !== 'production';

// a component that renders nothing. Used to replace components for unmountComponentAtNode.
function EmptyComponent() {
	return null;
}

// make react think we're react.
var VNode = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])('a', null).constructor;
VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;
VNode.prototype.preactCompatUpgraded = false;
VNode.prototype.preactCompatNormalized = false;

Object.defineProperty(VNode.prototype, 'type', {
	get: function get() {
		return this.nodeName;
	},
	set: function set(v) {
		this.nodeName = v;
	},
	configurable: true
});

Object.defineProperty(VNode.prototype, 'props', {
	get: function get() {
		return this.attributes;
	},
	set: function set(v) {
		this.attributes = v;
	},
	configurable: true
});

var oldEventHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].event;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].event = function (e) {
	if (oldEventHook) {
		e = oldEventHook(e);
	}
	e.persist = Object;
	e.nativeEvent = e;
	return e;
};

var oldVnodeHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode = function (vnode) {
	if (!vnode.preactCompatUpgraded) {
		vnode.preactCompatUpgraded = true;

		var tag = vnode.nodeName,
		    attrs = vnode.attributes = extend({}, vnode.attributes);

		if (typeof tag === 'function') {
			if (tag[COMPONENT_WRAPPER_KEY] === true || tag.prototype && 'isReactComponent' in tag.prototype) {
				if (vnode.children && String(vnode.children) === '') {
					vnode.children = undefined;
				}
				if (vnode.children) {
					attrs.children = vnode.children;
				}

				if (!vnode.preactCompatNormalized) {
					normalizeVNode(vnode);
				}
				handleComponentVNode(vnode);
			}
		} else {
			if (vnode.children && String(vnode.children) === '') {
				vnode.children = undefined;
			}
			if (vnode.children) {
				attrs.children = vnode.children;
			}

			if (attrs.defaultValue) {
				if (!attrs.value && attrs.value !== 0) {
					attrs.value = attrs.defaultValue;
				}
				delete attrs.defaultValue;
			}

			handleElementVNode(vnode, attrs);
		}
	}

	if (oldVnodeHook) {
		oldVnodeHook(vnode);
	}
};

function handleComponentVNode(vnode) {
	var tag = vnode.nodeName,
	    a = vnode.attributes;

	vnode.attributes = {};
	if (tag.defaultProps) {
		extend(vnode.attributes, tag.defaultProps);
	}
	if (a) {
		extend(vnode.attributes, a);
	}
}

function handleElementVNode(vnode, a) {
	var shouldSanitize, attrs, i;
	if (a) {
		for (i in a) {
			if (shouldSanitize = CAMEL_PROPS.test(i)) {
				break;
			}
		}
		if (shouldSanitize) {
			attrs = vnode.attributes = {};
			for (i in a) {
				if (a.hasOwnProperty(i)) {
					attrs[CAMEL_PROPS.test(i) ? i.replace(/([A-Z0-9])/, '-$1').toLowerCase() : i] = a[i];
				}
			}
		}
	}
}

// proxy render() since React returns a Component reference.
function render$1(vnode, parent, callback) {
	var prev = parent && parent._preactCompatRendered && parent._preactCompatRendered.base;

	// ignore impossible previous renders
	if (prev && prev.parentNode !== parent) {
		prev = null;
	}

	// default to first Element child
	if (!prev && parent) {
		prev = parent.firstElementChild;
	}

	// remove unaffected siblings
	for (var i = parent.childNodes.length; i--;) {
		if (parent.childNodes[i] !== prev) {
			parent.removeChild(parent.childNodes[i]);
		}
	}

	var out = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(vnode, parent, prev);
	if (parent) {
		parent._preactCompatRendered = out && (out._component || { base: out });
	}
	if (typeof callback === 'function') {
		callback();
	}
	return out && out._component || out;
}

var ContextProvider = function ContextProvider() {};

ContextProvider.prototype.getChildContext = function () {
	return this.props.context;
};
ContextProvider.prototype.render = function (props) {
	return props.children[0];
};

function renderSubtreeIntoContainer(parentComponent, vnode, container, callback) {
	var wrap = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(ContextProvider, { context: parentComponent.context }, vnode);
	var renderContainer = render$1(wrap, container);
	var component = renderContainer._component || renderContainer.base;
	if (callback) {
		callback.call(component, renderContainer);
	}
	return component;
}

function unmountComponentAtNode(container) {
	var existing = container._preactCompatRendered && container._preactCompatRendered.base;
	if (existing && existing.parentNode === container) {
		Object(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(EmptyComponent), container, existing);
		return true;
	}
	return false;
}

var ARR = [];

// This API is completely unnecessary for Preact, so it's basically passthrough.
var Children = {
	map: function map(children, fn, ctx) {
		if (children == null) {
			return null;
		}
		children = Children.toArray(children);
		if (ctx && ctx !== children) {
			fn = fn.bind(ctx);
		}
		return children.map(fn);
	},
	forEach: function forEach(children, fn, ctx) {
		if (children == null) {
			return null;
		}
		children = Children.toArray(children);
		if (ctx && ctx !== children) {
			fn = fn.bind(ctx);
		}
		children.forEach(fn);
	},
	count: function count(children) {
		return children && children.length || 0;
	},
	only: function only(children) {
		children = Children.toArray(children);
		if (children.length !== 1) {
			throw new Error('Children.only() expects only one child.');
		}
		return children[0];
	},
	toArray: function toArray(children) {
		if (children == null) {
			return [];
		}
		return ARR.concat(children);
	}
};

/** Track current render() component for ref assignment */
var currentComponent;

function createFactory(type) {
	return createElement.bind(null, type);
}

var DOM = {};
for (var i = ELEMENTS.length; i--;) {
	DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
}

function upgradeToVNodes(arr, offset) {
	for (var i = offset || 0; i < arr.length; i++) {
		var obj = arr[i];
		if (Array.isArray(obj)) {
			upgradeToVNodes(obj);
		} else if (obj && typeof obj === 'object' && !isValidElement(obj) && (obj.props && obj.type || obj.attributes && obj.nodeName || obj.children)) {
			arr[i] = createElement(obj.type || obj.nodeName, obj.props || obj.attributes, obj.children);
		}
	}
}

function isStatelessComponent(c) {
	return typeof c === 'function' && !(c.prototype && c.prototype.render);
}

// wraps stateless functional components in a PropTypes validator
function wrapStatelessComponent(WrappedComponent) {
	return createClass({
		displayName: WrappedComponent.displayName || WrappedComponent.name,
		render: function render() {
			return WrappedComponent(this.props, this.context);
		}
	});
}

function statelessComponentHook(Ctor) {
	var Wrapped = Ctor[COMPONENT_WRAPPER_KEY];
	if (Wrapped) {
		return Wrapped === true ? Ctor : Wrapped;
	}

	Wrapped = wrapStatelessComponent(Ctor);

	Object.defineProperty(Wrapped, COMPONENT_WRAPPER_KEY, { configurable: true, value: true });
	Wrapped.displayName = Ctor.displayName;
	Wrapped.propTypes = Ctor.propTypes;
	Wrapped.defaultProps = Ctor.defaultProps;

	Object.defineProperty(Ctor, COMPONENT_WRAPPER_KEY, { configurable: true, value: Wrapped });

	return Wrapped;
}

function createElement() {
	var args = [],
	    len = arguments.length;
	while (len--) {
		args[len] = arguments[len];
	}upgradeToVNodes(args, 2);
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["h"].apply(void 0, args));
}

function normalizeVNode(vnode) {
	vnode.preactCompatNormalized = true;

	applyClassName(vnode);

	if (isStatelessComponent(vnode.nodeName)) {
		vnode.nodeName = statelessComponentHook(vnode.nodeName);
	}

	var ref = vnode.attributes.ref,
	    type = ref && typeof ref;
	if (currentComponent && (type === 'string' || type === 'number')) {
		vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
	}

	applyEventNormalization(vnode);

	return vnode;
}

function cloneElement$1(element, props) {
	var children = [],
	    len = arguments.length - 2;
	while (len-- > 0) {
		children[len] = arguments[len + 2];
	}if (!isValidElement(element)) {
		return element;
	}
	var elementProps = element.attributes || element.props;
	var node = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(element.nodeName || element.type, extend({}, elementProps), element.children || elementProps && elementProps.children);
	// Only provide the 3rd argument if needed.
	// Arguments 3+ overwrite element.children in preactCloneElement
	var cloneArgs = [node, props];
	if (children && children.length) {
		cloneArgs.push(children);
	} else if (props && props.children) {
		cloneArgs.push(props.children);
	}
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["cloneElement"].apply(void 0, cloneArgs));
}

function isValidElement(element) {
	return element && (element instanceof VNode || element.$$typeof === REACT_ELEMENT_TYPE);
}

function createStringRefProxy(name, component) {
	return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
		if (component && component.refs) {
			component.refs[name] = resolved;
			if (resolved === null) {
				delete component._refProxies[name];
				component = null;
			}
		}
	});
}

function applyEventNormalization(ref) {
	var nodeName = ref.nodeName;
	var attributes = ref.attributes;

	if (!attributes || typeof nodeName !== 'string') {
		return;
	}
	var props = {};
	for (var i in attributes) {
		props[i.toLowerCase()] = i;
	}
	if (props.ondoubleclick) {
		attributes.ondblclick = attributes[props.ondoubleclick];
		delete attributes[props.ondoubleclick];
	}
	// for *textual inputs* (incl textarea), normalize `onChange` -> `onInput`:
	if (props.onchange && (nodeName === 'textarea' || nodeName.toLowerCase() === 'input' && !/^fil|che|rad/i.test(attributes.type))) {
		var normalized = props.oninput || 'oninput';
		if (!attributes[normalized]) {
			attributes[normalized] = multihook([attributes[normalized], attributes[props.onchange]]);
			delete attributes[props.onchange];
		}
	}
}

function applyClassName(vnode) {
	var a = vnode.attributes || (vnode.attributes = {});
	classNameDescriptor.enumerable = 'className' in a;
	if (a.className) {
		a.class = a.className;
	}
	Object.defineProperty(a, 'className', classNameDescriptor);
}

var classNameDescriptor = {
	configurable: true,
	get: function get() {
		return this.class;
	},
	set: function set(v) {
		this.class = v;
	}
};

function extend(base, props) {
	var arguments$1 = arguments;

	for (var i = 1, obj = void 0; i < arguments.length; i++) {
		if (obj = arguments$1[i]) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					base[key] = obj[key];
				}
			}
		}
	}
	return base;
}

function shallowDiffers(a, b) {
	for (var i in a) {
		if (!(i in b)) {
			return true;
		}
	}
	for (var i$1 in b) {
		if (a[i$1] !== b[i$1]) {
			return true;
		}
	}
	return false;
}

function findDOMNode(component) {
	return component && component.base || component;
}

function F() {}

function createClass(obj) {
	function cl(props, context) {
		bindAll(this);
		Component$1.call(this, props, context, BYPASS_HOOK);
		newComponentHook.call(this, props, context);
	}

	obj = extend({ constructor: cl }, obj);

	// We need to apply mixins here so that getDefaultProps is correctly mixed
	if (obj.mixins) {
		applyMixins(obj, collateMixins(obj.mixins));
	}
	if (obj.statics) {
		extend(cl, obj.statics);
	}
	if (obj.propTypes) {
		cl.propTypes = obj.propTypes;
	}
	if (obj.defaultProps) {
		cl.defaultProps = obj.defaultProps;
	}
	if (obj.getDefaultProps) {
		cl.defaultProps = obj.getDefaultProps.call(cl);
	}

	F.prototype = Component$1.prototype;
	cl.prototype = extend(new F(), obj);

	cl.displayName = obj.displayName || 'Component';

	return cl;
}

// Flatten an Array of mixins to a map of method name to mixin implementations
function collateMixins(mixins) {
	var keyed = {};
	for (var i = 0; i < mixins.length; i++) {
		var mixin = mixins[i];
		for (var key in mixin) {
			if (mixin.hasOwnProperty(key) && typeof mixin[key] === 'function') {
				(keyed[key] || (keyed[key] = [])).push(mixin[key]);
			}
		}
	}
	return keyed;
}

// apply a mapping of Arrays of mixin methods to a component prototype
function applyMixins(proto, mixins) {
	for (var key in mixins) {
		if (mixins.hasOwnProperty(key)) {
			proto[key] = multihook(mixins[key].concat(proto[key] || ARR), key === 'getDefaultProps' || key === 'getInitialState' || key === 'getChildContext');
		}
	}
}

function bindAll(ctx) {
	for (var i in ctx) {
		var v = ctx[i];
		if (typeof v === 'function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(i)) {
			(ctx[i] = v.bind(ctx)).__bound = true;
		}
	}
}

function callMethod(ctx, m, args) {
	if (typeof m === 'string') {
		m = ctx.constructor.prototype[m];
	}
	if (typeof m === 'function') {
		return m.apply(ctx, args);
	}
}

function multihook(hooks, skipDuplicates) {
	return function () {
		var arguments$1 = arguments;
		var this$1 = this;

		var ret;
		for (var i = 0; i < hooks.length; i++) {
			var r = callMethod(this$1, hooks[i], arguments$1);

			if (skipDuplicates && r != null) {
				if (!ret) {
					ret = {};
				}
				for (var key in r) {
					if (r.hasOwnProperty(key)) {
						ret[key] = r[key];
					}
				}
			} else if (typeof r !== 'undefined') {
				ret = r;
			}
		}
		return ret;
	};
}

function newComponentHook(props, context) {
	propsHook.call(this, props, context);
	this.componentWillReceiveProps = multihook([propsHook, this.componentWillReceiveProps || 'componentWillReceiveProps']);
	this.render = multihook([propsHook, beforeRender, this.render || 'render', afterRender]);
}

function propsHook(props, context) {
	if (!props) {
		return;
	}

	// React annoyingly special-cases single children, and some react components are ridiculously strict about this.
	var c = props.children;
	if (c && Array.isArray(c) && c.length === 1 && (typeof c[0] === 'string' || typeof c[0] === 'function' || c[0] instanceof VNode)) {
		props.children = c[0];

		// but its totally still going to be an Array.
		if (props.children && typeof props.children === 'object') {
			props.children.length = 1;
			props.children[0] = props.children;
		}
	}

	// add proptype checking
	if (DEV) {
		var ctor = typeof this === 'function' ? this : this.constructor,
		    propTypes = this.propTypes || ctor.propTypes;
		var displayName = this.displayName || ctor.name;

		if (propTypes) {
			__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.checkPropTypes(propTypes, props, 'prop', displayName);
		}
	}
}

function beforeRender(props) {
	currentComponent = this;
}

function afterRender() {
	if (currentComponent === this) {
		currentComponent = null;
	}
}

function Component$1(props, context, opts) {
	__WEBPACK_IMPORTED_MODULE_1_preact__["Component"].call(this, props, context);
	this.state = this.getInitialState ? this.getInitialState() : {};
	this.refs = {};
	this._refProxies = {};
	if (opts !== BYPASS_HOOK) {
		newComponentHook.call(this, props, context);
	}
}
extend(Component$1.prototype = new __WEBPACK_IMPORTED_MODULE_1_preact__["Component"](), {
	constructor: Component$1,

	isReactComponent: {},

	replaceState: function replaceState(state, callback) {
		var this$1 = this;

		this.setState(state, callback);
		for (var i in this$1.state) {
			if (!(i in state)) {
				delete this$1.state[i];
			}
		}
	},

	getDOMNode: function getDOMNode() {
		return this.base;
	},

	isMounted: function isMounted() {
		return !!this.base;
	}
});

function PureComponent(props, context) {
	Component$1.call(this, props, context);
}
F.prototype = Component$1.prototype;
PureComponent.prototype = new F();
PureComponent.prototype.isPureReactComponent = true;
PureComponent.prototype.shouldComponentUpdate = function (props, state) {
	return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
};

var index = {
	version: version,
	DOM: DOM,
	PropTypes: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a,
	Children: Children,
	render: render$1,
	createClass: createClass,
	createFactory: createFactory,
	createElement: createElement,
	cloneElement: cloneElement$1,
	isValidElement: isValidElement,
	findDOMNode: findDOMNode,
	unmountComponentAtNode: unmountComponentAtNode,
	Component: Component$1,
	PureComponent: PureComponent,
	unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer,
	__spread: extend
};

/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=preact-compat.es.js.map

/***/ }),

/***/ "f8Os":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__("eW0v");

var _react2 = _interopRequireDefault(_react);

var _d3Timer = __webpack_require__("SAuC");

var _transition = __webpack_require__("sCra");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} //  weak
/* eslint max-len: "off" */

var Animate = function (_Component) {
  _inherits(Animate, _Component);

  function Animate() {
    var _temp, _this, _ret;

    _classCallCheck(this, Animate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = typeof _this.props.start === 'function' ? _this.props.start() : _this.props.start, _this.checkTransitionStatus = function () {
      if (!_this.TRANSITION_SCHEDULES) {
        _this.interval.stop();

        if (_this.props.show === false) {
          _this.renderNull = true;
          _this.setState(function (prevState) {
            return prevState;
          }); // force render as null
        }
      }
    }, _this.interval = null, _this.renderNull = true, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Animate.prototype.componentWillMount = function componentWillMount() {
    if (this.props.show === true) {
      this.renderNull = false;
    }
  };

  Animate.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        enter = _props.enter,
        show = _props.show;

    if (enter && show === true) {
      _transition.transition.call(this, typeof enter === 'function' ? enter() : enter);
    }
  };

  Animate.prototype.componentWillReceiveProps = function componentWillReceiveProps(next) {
    var _this2 = this;

    var show = next.show,
        start = next.start,
        enter = next.enter,
        update = next.update,
        leave = next.leave;

    if (this.props.show === false && this.renderNull === true && show === true) {
      this.renderNull = false;

      this.setState(function () {
        return typeof start === 'function' ? start() : start;
      }, function () {
        if (enter) {
          _transition.transition.call(_this2, typeof enter === 'function' ? enter() : enter);
        }
      });
    } else if (this.props.show === true && show === false) {
      if (leave) {
        _transition.transition.call(this, typeof leave === 'function' ? leave() : leave);
        this.interval = (0, _d3Timer.interval)(this.checkTransitionStatus);
      } else {
        this.renderNull = true;
        this.setState(function (prevState) {
          return prevState;
        }); // force render as null
      }
    } else if (show === true && update) {
      if (this.interval) {
        this.interval.stop();
      }

      _transition.transition.call(this, typeof update === 'function' ? update() : update);
    }
  };

  Animate.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.interval) {
      this.interval.stop();
    }

    _transition.stop.call(this);
  };

  Animate.prototype.render = function render() {
    if (this.renderNull === true) {
      return null;
    }

    var renderedChildren = this.props.children(this.state);
    return renderedChildren && _react2.default.Children.only(renderedChildren);
  };

  return Animate;
}(_react.Component);

Animate.defaultProps = {
  show: true
};
exports.default = Animate;

/***/ }),

/***/ "hyfA":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__2iMHx","founder":"founder__3RUV0 row__2K_q2","founderimage":"founderimage__1BGbc col-md-1__Gx5qN","foundertext":"foundertext__2Cyxb col-md-11__snU54"};

/***/ }),

/***/ "iMnN":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__Lyal2"};

/***/ }),

/***/ "jT85":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.Helmet = undefined;

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = __webpack_require__("eW0v");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("5D9O");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSideEffect = __webpack_require__("3thq");

var _reactSideEffect2 = _interopRequireDefault(_reactSideEffect);

var _deepEqual = __webpack_require__("koiw");

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _HelmetUtils = __webpack_require__("bf5F");

var _HelmetConstants = __webpack_require__("lgg6");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
    var target = {};for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
    }return target;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Helmet = function Helmet(Component) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
        _inherits(HelmetWrapper, _React$Component);

        function HelmetWrapper() {
            _classCallCheck(this, HelmetWrapper);

            return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _deepEqual2.default)(this.props, nextProps);
        };

        HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
            if (!nestedChildren) {
                return null;
            }

            switch (child.type) {
                case _HelmetConstants.TAG_NAMES.SCRIPT:
                case _HelmetConstants.TAG_NAMES.NOSCRIPT:
                    return {
                        innerHTML: nestedChildren
                    };

                case _HelmetConstants.TAG_NAMES.STYLE:
                    return {
                        cssText: nestedChildren
                    };
            }

            throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
        };

        HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
            var _extends2;

            var child = _ref.child,
                arrayTypeChildren = _ref.arrayTypeChildren,
                newChildProps = _ref.newChildProps,
                nestedChildren = _ref.nestedChildren;

            return _extends({}, arrayTypeChildren, (_extends2 = {}, _extends2[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _extends2));
        };

        HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
            var _extends3, _extends4;

            var child = _ref2.child,
                newProps = _ref2.newProps,
                newChildProps = _ref2.newChildProps,
                nestedChildren = _ref2.nestedChildren;

            switch (child.type) {
                case _HelmetConstants.TAG_NAMES.TITLE:
                    return _extends({}, newProps, (_extends3 = {}, _extends3[child.type] = nestedChildren, _extends3.titleAttributes = _extends({}, newChildProps), _extends3));

                case _HelmetConstants.TAG_NAMES.BODY:
                    return _extends({}, newProps, {
                        bodyAttributes: _extends({}, newChildProps)
                    });

                case _HelmetConstants.TAG_NAMES.HTML:
                    return _extends({}, newProps, {
                        htmlAttributes: _extends({}, newChildProps)
                    });
            }

            return _extends({}, newProps, (_extends4 = {}, _extends4[child.type] = _extends({}, newChildProps), _extends4));
        };

        HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
            var newFlattenedProps = _extends({}, newProps);

            Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
                var _extends5;

                newFlattenedProps = _extends({}, newFlattenedProps, (_extends5 = {}, _extends5[arrayChildName] = arrayTypeChildren[arrayChildName], _extends5));
            });

            return newFlattenedProps;
        };

        HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
            if (false) {
                if (!_HelmetConstants.VALID_TAG_NAMES.some(function (name) {
                    return child.type === name;
                })) {
                    if (typeof child.type === "function") {
                        return (0, _HelmetUtils.warn)("You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.");
                    }

                    return (0, _HelmetUtils.warn)("Only elements types " + _HelmetConstants.VALID_TAG_NAMES.join(", ") + " are allowed. Helmet does not support rendering <" + child.type + "> elements. Refer to our API for more information.");
                }

                if (nestedChildren && typeof nestedChildren !== "string" && (!Array.isArray(nestedChildren) || nestedChildren.some(function (nestedChild) {
                    return typeof nestedChild !== "string";
                }))) {
                    throw new Error("Helmet expects a string as a child of <" + child.type + ">. Did you forget to wrap your children in braces? ( <" + child.type + ">{``}</" + child.type + "> ) Refer to our API for more information.");
                }
            }

            return true;
        };

        HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
            var _this2 = this;

            var arrayTypeChildren = {};

            _react2.default.Children.forEach(children, function (child) {
                if (!child || !child.props) {
                    return;
                }

                var _child$props = child.props,
                    nestedChildren = _child$props.children,
                    childProps = _objectWithoutProperties(_child$props, ["children"]);

                var newChildProps = (0, _HelmetUtils.convertReactPropstoHtmlAttributes)(childProps);

                _this2.warnOnInvalidChildren(child, nestedChildren);

                switch (child.type) {
                    case _HelmetConstants.TAG_NAMES.LINK:
                    case _HelmetConstants.TAG_NAMES.META:
                    case _HelmetConstants.TAG_NAMES.NOSCRIPT:
                    case _HelmetConstants.TAG_NAMES.SCRIPT:
                    case _HelmetConstants.TAG_NAMES.STYLE:
                        arrayTypeChildren = _this2.flattenArrayTypeChildren({
                            child: child,
                            arrayTypeChildren: arrayTypeChildren,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;

                    default:
                        newProps = _this2.mapObjectTypeChildren({
                            child: child,
                            newProps: newProps,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;
                }
            });

            newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
            return newProps;
        };

        HelmetWrapper.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                props = _objectWithoutProperties(_props, ["children"]);

            var newProps = _extends({}, props);

            if (children) {
                newProps = this.mapChildrenToProps(children, newProps);
            }

            return _react2.default.createElement(Component, newProps);
        };

        _createClass(HelmetWrapper, null, [{
            key: "canUseDOM",

            // Component.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.

            /**
            * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
            * @param {Object} bodyAttributes: {"className": "root"}
            * @param {String} defaultTitle: "Default Title"
            * @param {Boolean} defer: true
            * @param {Boolean} encodeSpecialCharacters: true
            * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
            * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
            * @param {Array} meta: [{"name": "description", "content": "Test description"}]
            * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
            * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
            * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
            * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
            * @param {String} title: "Title"
            * @param {Object} titleAttributes: {"itemprop": "name"}
            * @param {String} titleTemplate: "MySite.com - %s"
            */
            set: function set(canUseDOM) {
                Component.canUseDOM = canUseDOM;
            }
        }]);

        return HelmetWrapper;
    }(_react2.default.Component), _class.propTypes = {
        base: _propTypes2.default.object,
        bodyAttributes: _propTypes2.default.object,
        children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
        defaultTitle: _propTypes2.default.string,
        defer: _propTypes2.default.bool,
        encodeSpecialCharacters: _propTypes2.default.bool,
        htmlAttributes: _propTypes2.default.object,
        link: _propTypes2.default.arrayOf(_propTypes2.default.object),
        meta: _propTypes2.default.arrayOf(_propTypes2.default.object),
        noscript: _propTypes2.default.arrayOf(_propTypes2.default.object),
        onChangeClientState: _propTypes2.default.func,
        script: _propTypes2.default.arrayOf(_propTypes2.default.object),
        style: _propTypes2.default.arrayOf(_propTypes2.default.object),
        title: _propTypes2.default.string,
        titleAttributes: _propTypes2.default.object,
        titleTemplate: _propTypes2.default.string
    }, _class.defaultProps = {
        defer: true,
        encodeSpecialCharacters: true
    }, _class.peek = Component.peek, _class.rewind = function () {
        var mappedState = Component.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = (0, _HelmetUtils.mapStateOnServer)({
                baseTag: [],
                bodyAttributes: {},
                encodeSpecialCharacters: true,
                htmlAttributes: {},
                linkTags: [],
                metaTags: [],
                noscriptTags: [],
                scriptTags: [],
                styleTags: [],
                title: "",
                titleAttributes: {}
            });
        }

        return mappedState;
    }, _temp;
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = (0, _reactSideEffect2.default)(_HelmetUtils.reducePropsToState, _HelmetUtils.handleClientStateChange, _HelmetUtils.mapStateOnServer)(NullComponent);

var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;

exports.Helmet = HelmetExport;
exports.default = HelmetExport;

/***/ }),

/***/ "koiw":
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__("mbYX");
var isArguments = __webpack_require__("OWwF");

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

    // 7.3. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

    // 7.4. For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
};

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer(x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {
    //happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length) return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

/***/ }),

/***/ "lgg6":
/***/ (function(module, exports) {

exports.__esModule = true;
var ATTRIBUTE_NAMES = exports.ATTRIBUTE_NAMES = {
    BODY: "bodyAttributes",
    HTML: "htmlAttributes",
    TITLE: "titleAttributes"
};

var TAG_NAMES = exports.TAG_NAMES = {
    BASE: "base",
    BODY: "body",
    HEAD: "head",
    HTML: "html",
    LINK: "link",
    META: "meta",
    NOSCRIPT: "noscript",
    SCRIPT: "script",
    STYLE: "style",
    TITLE: "title"
};

var VALID_TAG_NAMES = exports.VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
    return TAG_NAMES[name];
});

var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
    CHARSET: "charset",
    CSS_TEXT: "cssText",
    HREF: "href",
    HTTPEQUIV: "http-equiv",
    INNER_HTML: "innerHTML",
    ITEM_PROP: "itemprop",
    NAME: "name",
    PROPERTY: "property",
    REL: "rel",
    SRC: "src"
};

var REACT_TAG_MAP = exports.REACT_TAG_MAP = {
    accesskey: "accessKey",
    charset: "charSet",
    class: "className",
    contenteditable: "contentEditable",
    contextmenu: "contextMenu",
    "http-equiv": "httpEquiv",
    itemprop: "itemProp",
    tabindex: "tabIndex"
};

var HELMET_PROPS = exports.HELMET_PROPS = {
    DEFAULT_TITLE: "defaultTitle",
    DEFER: "defer",
    ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
    ON_CHANGE_CLIENT_STATE: "onChangeClientState",
    TITLE_TEMPLATE: "titleTemplate"
};

var HTML_TAG_MAP = exports.HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
    obj[REACT_TAG_MAP[key]] = key;
    return obj;
}, {});

var SELF_CLOSING_TAGS = exports.SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];

var HELMET_ATTRIBUTE = exports.HELMET_ATTRIBUTE = "data-react-helmet";

/***/ }),

/***/ "mbYX":
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function' ? Object.keys : shim;

exports.shim = shim;
function shim(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
}

/***/ }),

/***/ "n9ou":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _Animate = __webpack_require__("f8Os");

var _Animate2 = _interopRequireDefault(_Animate);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = _Animate2.default; /* eslint-disable flowtype/require-valid-file-annotation */

/***/ }),

/***/ "nqnI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _warning = __webpack_require__("XOCG");

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__("UyDz");

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__("vMhP");

var _PathUtils = __webpack_require__("4gcd");

var _createTransitionManager = __webpack_require__("/Uqj");

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _DOMUtils = __webpack_require__("uE+1");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var HashChangeEvent = 'hashchange';

var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + (0, _PathUtils.stripLeadingSlash)(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: _PathUtils.stripLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  },
  slash: {
    encodePath: _PathUtils.addLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  }
};

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');

  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};

var createHashHistory = function createHashHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(_DOMUtils.canUseDOM, 'Hash history needs a DOM');

  var globalHistory = window.history;
  var canGoWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();

  var _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$hashType = props.hashType,
      hashType = _props$hashType === undefined ? 'slash' : _props$hashType;

  var basename = props.basename ? (0, _PathUtils.stripTrailingSlash)((0, _PathUtils.addLeadingSlash)(props.basename)) : '';

  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  var getDOMLocation = function getDOMLocation() {
    var path = decodePath(getHashPath());

    (0, _warning2.default)(!basename || (0, _PathUtils.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = (0, _PathUtils.stripBasename)(path, basename);

    return (0, _LocationUtils.createLocation)(path);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var forceNextPop = false;
  var ignorePath = null;

  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;

      if (!forceNextPop && (0, _LocationUtils.locationsAreEqual)(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === (0, _PathUtils.createPath)(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;

      handlePop(location);
    }
  };

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(toLocation));

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(fromLocation));

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  // Ensure the hash is encoded properly before doing anything else.
  var path = getHashPath();
  var encodedPath = encodePath(path);

  if (path !== encodedPath) replaceHashPath(encodedPath);

  var initialLocation = getDOMLocation();
  var allPaths = [(0, _PathUtils.createPath)(initialLocation)];

  // Public interface

  var createHref = function createHref(location) {
    return '#' + encodePath(basename + (0, _PathUtils.createPath)(location));
  };

  var push = function push(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot push state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);

        var prevIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(history.location));
        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

        nextPaths.push(path);
        allPaths = nextPaths;

        setState({ action: action, location: location });
      } else {
        (0, _warning2.default)(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');

        setState();
      }
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot replace state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf((0, _PathUtils.createPath)(history.location));

      if (prevIndex !== -1) allPaths[prevIndex] = path;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    (0, _warning2.default)(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');

    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createHashHistory;

/***/ }),

/***/ "pz6A":
/***/ (function(module, exports) {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || ret === void 0 && valueA !== valueB) {
      return false;
    }
  }

  return true;
};

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sCra":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _transition = __webpack_require__("QCZ+");

Object.defineProperty(exports, 'transition', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_transition).default;
  }
});

var _stop = __webpack_require__("T1T2");

Object.defineProperty(exports, 'stop', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stop).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "t+Vk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function valueEqual(a, b) {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return valueEqual(item, b[index]);
    });
  }

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ __webpack_exports__["default"] = (valueEqual);

/***/ }),

/***/ "u3et":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__2MqSo","logo":"logo__1Ig25","subheader":"subheader__VVVxn","branding":"branding__2sDPv","cursor":"cursor__EO2OV","nav":"nav__2JjJ3","active":"active__27Q54"};

/***/ }),

/***/ "uE+1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = exports.getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = exports.supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopStateOnHashChange = exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

/***/ }),

/***/ "uTdl":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__3ER0L","slides":"slides__3LJvJ","blurb":"blurb__3EzHi row__2K_q2","blurbtext":"blurbtext__3bfyE col-md-8__3CrrK","blurbimage":"blurbimage__27tnw col-md-4__Kkdus","augment":"augment__2qFs1","endToEnd":"endToEnd__m-4tc","projectManagement":"projectManagement__cIvBn","consulting":"consulting__2VNZO"};

/***/ }),

/***/ "vMhP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.locationsAreEqual = exports.createLocation = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _resolvePathname = __webpack_require__("7YO4");

var _resolvePathname2 = _interopRequireDefault(_resolvePathname);

var _valueEqual = __webpack_require__("t+Vk");

var _valueEqual2 = _interopRequireDefault(_valueEqual);

var _PathUtils = __webpack_require__("4gcd");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var createLocation = exports.createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = (0, _PathUtils.parsePath)(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = (0, _resolvePathname2.default)(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
};

var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && (0, _valueEqual2.default)(a.state, b.state);
};

/***/ }),

/***/ "vWif":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"capabilities":"capabilities__3yjVq","header":"header__2_2KJ","skillmenu":"skillmenu__14-HP","skillicon":"skillicon__19V-0","skilldetail":"skilldetail__25Js8 row__2K_q2","skilldetailicon":"skilldetailicon__3_TaA col-md-2__2sU4V","active":"active__1rTRr","skilldetailtext":"skilldetailtext__1U4Hr col-md-10__GEy-Y"};

/***/ }),

/***/ "wRU+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ "wVGV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__("UQex");
var invariant = __webpack_require__("wRU+");
var ReactPropTypesSecret = __webpack_require__("Asjh");

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map