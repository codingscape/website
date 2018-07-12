"use strict";var precacheConfig=[["/154674a4dee852e920f0e1e6cc557e8b.jpg","154674a4dee852e920f0e1e6cc557e8b"],["/23b31fd0b41da3a1f488d38cf8badf11.jpg","23b31fd0b41da3a1f488d38cf8badf11"],["/28a91dd2da883f3783d0f882e11a2848.jpg","28a91dd2da883f3783d0f882e11a2848"],["/404.html","5d8d52c2d9992039476c72450b1c56b2"],["/a430af9a5859edfc52baec66bd937f90.jpg","a430af9a5859edfc52baec66bd937f90"],["/assets/cs-logo.svg","f4b4bdcff6fe421474d9cca7fbdf3fe7"],["/assets/favicon.ico","263ab251aba982f7f4b5fd159030873d"],["/assets/icons/android-chrome-192x192.png","ff119e634e2fc9bfd28f7e9615ede738"],["/assets/icons/android-chrome-512x512.png","8f6692a1afe2125ed422d010ea4547e2"],["/assets/icons/apple-touch-icon.png","36c61f2c80993eb1afb4c39436700c57"],["/assets/icons/favicon-16x16.png","1b35ae1ef4d1c7459cb80ebc58c21eff"],["/assets/icons/favicon-32x32.png","6fbf2f6e7f1dec21972db55f5ec0fec5"],["/assets/icons/mstile-150x150.png","549e428bdaf3d89cd77a8497b679e521"],["/assets/images/augment.jpg","154674a4dee852e920f0e1e6cc557e8b"],["/assets/images/charting.jpg","b105b016cde227bf5b9a57e39d4b6ad7"],["/assets/images/consulting.jpg","d5d3ade0d2003ed1452899d62dbb53b4"],["/assets/images/end-to-end.jpg","e84214c2831a301ee6600ed4023c154a"],["/assets/images/hello.jpg","cf88a44bfa1e477f2c92a8762c9bee19"],["/assets/images/jimmy.jpg","95b02238e6ce3fc606e355a6c6e5317f"],["/assets/images/pair-programming.jpg","64f88189f9ce5a03f4081cfea1aba80b"],["/assets/images/pawel.jpg","b52d82c340aa500d8d5b0b652e46716a"],["/assets/images/porter.jpg","a27656f5cdb2729df2b315f044d85147"],["/assets/images/project-management.jpg","28a91dd2da883f3783d0f882e11a2848"],["/assets/images/puzzle.jpg","23b31fd0b41da3a1f488d38cf8badf11"],["/assets/images/teamwork.jpg","a430af9a5859edfc52baec66bd937f90"],["/bundle.57dd8.js","5af852c1910fe4cfe251d3ebbb933f63"],["/cf88a44bfa1e477f2c92a8762c9bee19.jpg","cf88a44bfa1e477f2c92a8762c9bee19"],["/d5d3ade0d2003ed1452899d62dbb53b4.jpg","d5d3ade0d2003ed1452899d62dbb53b4"],["/e84214c2831a301ee6600ed4023c154a.jpg","e84214c2831a301ee6600ed4023c154a"],["/favicon.ico","263ab251aba982f7f4b5fd159030873d"],["/index.html","4cf06f53293a847e898dc11b29113635"],["/manifest.json","601d94840ed44d32353641de7ac61290"],["/route-about.chunk.f7bd7.js","ac1f2c3ce48b07bb6b3e19c8bfb1b5cf"],["/route-capabilities.chunk.0569a.js","5b247298dba64f7216e6d33794c65a2e"],["/route-contact.chunk.7ac0d.js","b534f656e5c2463299a56239b14f1228"],["/route-home.chunk.3d3eb.js","9efba1725ff26a266e5de29815a138b6"],["/style.a824e.css","9b29d32da59480da54c7a3f43f3d3722"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,n){var s=new URL(e);return n&&s.pathname.match(n)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),s=createCacheKey(n,hashParamName,t,!1);return[n.toString(),s]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var n=new Request(t,{credentials:"same-origin"});return fetch(n).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});