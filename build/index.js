function __commonjs(e,n){return n={exports:{}},e(n,n.exports,__commonjs_global),n.exports}var __commonjs_global="undefined"!=typeof window?window:"undefined"!=typeof global?global:this,babelHelpers={};babelHelpers["typeof"]="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};var performanceNow=__commonjs(function(e,n,t){(function(){var n,t,o;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(e.exports=function(){return(n()-o)/1e6},t=process.hrtime,n=function(){var e;return e=t(),1e9*e[0]+e[1]},o=n()):Date.now?(e.exports=function(){return Date.now()-o},o=Date.now()):(e.exports=function(){return(new Date).getTime()-o},o=(new Date).getTime())}).call(__commonjs_global)}),require$$0=performanceNow&&"object"===("undefined"==typeof performanceNow?"undefined":babelHelpers["typeof"](performanceNow))&&"default"in performanceNow?performanceNow["default"]:performanceNow,index=__commonjs(function(e,n,t){for(var o=require$$0,r="undefined"==typeof window?t:window,i=["moz","webkit"],f="AnimationFrame",c=r["request"+f],u=r["cancel"+f]||r["cancelRequest"+f],a=0;!c&&a<i.length;a++)c=r[i[a]+"Request"+f],u=r[i[a]+"Cancel"+f]||r[i[a]+"CancelRequest"+f];if(!c||!u){var l=0,s=0,p=[],d=1e3/60;c=function(e){if(0===p.length){var n=o(),t=Math.max(0,d-(n-l));l=t+n,setTimeout(function(){var e=p.slice(0);p.length=0;for(var n=0;n<e.length;n++)if(!e[n].cancelled)try{e[n].callback(l)}catch(t){setTimeout(function(){throw t},0)}},Math.round(t))}return p.push({handle:++s,callback:e,cancelled:!1}),s},u=function(e){for(var n=0;n<p.length;n++)p[n].handle===e&&(p[n].cancelled=!0)}}e.exports=function(e){return c.call(r,e)},e.exports.cancel=function(){u.apply(r,arguments)},e.exports.polyfill=function(){r.requestAnimationFrame=c,r.cancelAnimationFrame=u}}),raf=index&&"object"===("undefined"==typeof index?"undefined":babelHelpers["typeof"](index))&&"default"in index?index["default"]:index,promise=__commonjs(function(e,n,t){!function(n){function t(){}function o(e,n){return function(){e.apply(n,arguments)}}function r(e){if("object"!==babelHelpers["typeof"](this))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(e,this)}function i(e,n){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(n):(e._handled=!0,void p(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null===t)return void(1===e._state?f:c)(n.promise,e._value);var o;try{o=t(e._value)}catch(r){return void c(n.promise,r)}f(n.promise,o)}))}function f(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"===("undefined"==typeof n?"undefined":babelHelpers["typeof"](n))||"function"==typeof n)){var t=n.then;if(n instanceof r)return e._state=3,e._value=n,void u(e);if("function"==typeof t)return void l(o(t,n),e)}e._state=1,e._value=n,u(e)}catch(i){c(e,i)}}function c(e,n){e._state=2,e._value=n,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&p(function(){e._handled||d(e._value)});for(var n=0,t=e._deferreds.length;t>n;n++)i(e,e._deferreds[n]);e._deferreds=null}function a(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}function l(e,n){var t=!1;try{e(function(e){t||(t=!0,f(n,e))},function(e){t||(t=!0,c(n,e))})}catch(o){if(t)return;t=!0,c(n,o)}}var s=setTimeout,p="function"==typeof setImmediate&&setImmediate||function(e){s(e,1)},d=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};r.prototype["catch"]=function(e){return this.then(null,e)},r.prototype.then=function(e,n){var o=new this.constructor(t);return i(this,new a(e,n,o)),o},r.all=function(e){var n=Array.prototype.slice.call(e);return new r(function(e,t){function o(i,f){try{if(f&&("object"===("undefined"==typeof f?"undefined":babelHelpers["typeof"](f))||"function"==typeof f)){var c=f.then;if("function"==typeof c)return void c.call(f,function(e){o(i,e)},t)}n[i]=f,0===--r&&e(n)}catch(u){t(u)}}if(0===n.length)return e([]);for(var r=n.length,i=0;i<n.length;i++)o(i,n[i])})},r.resolve=function(e){return e&&"object"===("undefined"==typeof e?"undefined":babelHelpers["typeof"](e))&&e.constructor===r?e:new r(function(n){n(e)})},r.reject=function(e){return new r(function(n,t){t(e)})},r.race=function(e){return new r(function(n,t){for(var o=0,r=e.length;r>o;o++)e[o].then(n,t)})},r._setImmediateFn=function(e){p=e},r._setUnhandledRejectionFn=function(e){d=e},"undefined"!=typeof e&&e.exports?e.exports=r:n.Promise||(n.Promise=r)}(__commonjs_global)}),Promise=promise&&"object"===("undefined"==typeof promise?"undefined":babelHelpers["typeof"](promise))&&"default"in promise?promise["default"]:promise,running=!1,hideStuff=function(e){var n=e.map(function(e){return new Promise(function(n){e.style.opacity=1,function t(){e.style.opacity-=.05,e.style.opacity>0?raf(t):n()}()})});return Promise.all(n)},findEverythingElse=function(e){for(var n=[],t=function(){var t=e;e=e.parentNode,Array.prototype.forEach.call(e.children,function(e){e!==t&&n.push(e)})};!e.classList.contains("container");)t();return Promise.resolve(Array.prototype.slice.apply(n))};document.addEventListener("click",function(e){if(e.target.classList.contains("article-link")){if(e.preventDefault(),running)return;running=!0,findEverythingElse(e.target).then(hideStuff).then(function(){return location.href=e.target.href})}},!0);