"use strict";(self.webpackChunkPhoenix=self.webpackChunkPhoenix||[]).push([[6571],{40596:()=>{!function(t){function e(t){return"function"==typeof t}function o(e,o){!c.debug&&!o||t.console&&t.console.log&&(o?console.error("[ABD] "+e):console.log("[ABD] "+e))}function n(t){o("start beginTest"),1==g||(i(t),h.quick="testing",y.test=setTimeout((function(){l(t,1)}),5))}function i(t){var e,n=document.body,i="width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;";if(null!=t&&"string"!=typeof t){for(null!=t.style&&(i+=t.style),f=function(t,e){var o,n,i=e;if(n=document.createElement("div"),i)for(o in i)i.hasOwnProperty(o)&&n.setAttribute(o,i[o]);return n}(0,{class:t.cssClass,style:i}),o("adding bait node to DOM"),n.appendChild(f),e=0;e<b.nullProps.length;e++)f[b.nullProps[e]];for(e=0;e<b.zeroProps.length;e++)f[b.zeroProps[e]]}else o("invalid bait being cast")}function l(t,n){var u,s=document.body,a=!1;if(null==f&&(o("recast bait"),i(t||m)),"string"==typeof t)return o("invalid bait used",!0),void(r()&&setTimeout((function(){}),5));for(0<y.test&&(clearTimeout(y.test),y.test=0),null!==s.getAttribute("abp")&&(o("found adblock body attribute"),a=!0),u=0;u<b.nullProps.length;u++){if(null==f[b.nullProps[u]]){4<n&&(a=!0),o("found adblock null attr: "+b.nullProps[u]);break}if(1==a)break}for(u=0;u<b.zeroProps.length&&1!=a;u++)0==f[b.zeroProps[u]]&&(4<n&&(a=!0),o("found adblock zero attr: "+b.zeroProps[u]));if(void 0!==window.getComputedStyle){var d=window.getComputedStyle(f,null);("none"==d.getPropertyValue("display")||"hidden"==d.getPropertyValue("visibility"))&&(4<n&&(a=!0),o("found adblock computedStyle indicator"))}a||n++>=c.maxLoop?(o("exiting test loop - value: "+(g=a)),function(){var t,n;if(null!==g)for(t=0;t<p.length;t++){n=p[t];try{null!=n&&(e(n.complete)&&n.complete(g),g&&e(n.found)?n.found():!1===g&&e(n.notfound)&&n.notfound())}catch(t){o("Failure in notify listeners "+t.Message,!0)}}}(),r()&&setTimeout((function(){}),5)):y.test=setTimeout((function(){l(t,n)}),c.loopDelay)}function r(){if(null===f)return!0;try{e(f.remove)&&f.remove(),document.body.removeChild(f)}catch(t){}return f=null,!0}var u="offset",s="client",a=function(){},d=void 0===t.addEventListener,c={loopDelay:50,maxLoop:5,debug:!0,found:a,notfound:a,complete:a},p=[],f=null,m={cssClass:"ads-min pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links"},b={nullProps:[u+"Parent"],zeroProps:[]};b.zeroProps=[u+"Height",u+"Left",u+"Top",u+"Width",u+"Height",s+"Height",s+"Width"];var h={quick:null,remote:null},g=null,y={test:0,download:0},v={version:"1.0.1-AREN",init:function(e){var o,i,l,r,u,s,f;if(e){for(o in i={complete:a,found:a,notfound:a},e)e.hasOwnProperty(o)&&("complete"==o||"found"==o||"notFound"==o?i[o.toLowerCase()]=e[o]:c[o]=e[o]);p.push(i),f=!1,document.readyState&&"complete"==document.readyState&&(f=!0),l=function(){n(m)},f?l():(r=t,u="load",s=l,d?r.attachEvent("on"+u,s):r.addEventListener(u,s,!1))}}};t.adblockDetector=v}(window)}},t=>{t(t.s=40596)}]);
//# sourceMappingURL=adBlockDetector.min.js.map