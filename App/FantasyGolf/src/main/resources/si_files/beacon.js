var COMSCORE=function(e){var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},r={},t={};Object.defineProperty(t,"t",{value:!0}),t.o=t.i=t.u=void 0;var o=null,i=!1;function a(){return"function"==typeof __gpp&&(i||(i=!0,__gpp("addEventListener",(function(e){-1!=e.pingData.supportedAPIs.indexOf("tcfeuv2")&&("sectionChange"==e.eventName||"loaded"==e.pingData.cmpStatus&&"visible"!=e.pingData.cmpDisplayStatus)&&(o=__gpp("getSection",null,"tcfeuv2"),function(){for(var e=0,n=c;e<n.length;e++){(0,n[e])()}}())}))),!0)}t.u=a;var c=[];t.i=function(e){a(),c.indexOf(e)>-1||c.push(e)},t.o=function(){return o};var f=n&&n.l||(Object.create?function(e,n,r,t){t===undefined&&(t=r);var o=Object.getOwnPropertyDescriptor(n,r);o&&!("get"in o?!n.t:o.writable||o.v)||(o={p:!0,get:function(){return n[r]}}),Object.defineProperty(e,t,o)}:function(e,n,r,t){t===undefined&&(t=r),e[t]=n[r]}),u=n&&n.m||(Object.create?function(e,n){Object.defineProperty(e,"default",{p:!0,value:n})}:function(e,n){e["default"]=n}),l=n&&n._||function(e){if(e&&e.t)return e;var n={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&f(n,e,r);return u(n,e),n};Object.defineProperty(r,"t",{value:!0});var s=r.i=C=r.g=void 0,v=l(t),d=77,p=[1,7,8,9,10],b=!1,w=-1,m=!1,_=[];function y(){for(var e=0,n=_;e<n.length;e++){(0,n[e])()}}function g(){if(function(){if("function"!=typeof __gpp)return!1;if(m)return!0;m=!0;var e=+new Date;return v.i((function(){-1==w&&(w=+new Date-e);var n=v.o();b=h(n,!0),y()})),v.u()}())return!0;if("function"!=typeof __tcfapi)return!1;if(m)return!0;m=!0;var e=+new Date;return __tcfapi("addEventListener",2,(function(n,r){r&&("tcloaded"!=n.eventStatus&&"useractioncomplete"!=n.eventStatus||(-1==w&&(w=+new Date-e),b=h(n,!1),y()))})),!0}function x(e){var n={};if(!e)return n;for(var r=0,t=p;r<t.length;r++){var o=t[r];n[o]=e.purpose.consents[o]}return n}function h(e,n){try{if(e){if(e.gdprApplies){var r={cmpId:e.cmpId,cmpVersion:e.cmpVersion,C:w,k:!0,A:!0,D:!0,O:e.isServiceSpecific,purposeOneTreatment:e.purposeOneTreatment,R:e.vendor.legitimateInterests[d],I:e.vendor.consents[d],consents:x(e),j:e.publisherCC||"",labels:{P:"1"}};return n&&(r.labels["gpp_sid"]="2"),r}return{cmpId:e.cmpId,cmpVersion:e.cmpVersion,C:w,k:!0,A:!1,labels:{P:"1"}}}}catch(t){}return{k:!1}}var C=r.g=function(){try{if(!g())return!1}catch(e){}return b||{k:!1}};s=r.i=function(e){g(),_.indexOf(e)>-1||_.push(e)};var k=0,A=1,D=2;function O(e,n,r){-1==e.indexOf("?")&&(e+="?");var t=!1;(-1!=e.indexOf("&")||e.length-1>e.indexOf("?"))&&(t=!0);for(var o=0;o<n.length;++o){var i=n[o];for(var a in i)t&&(e+="&"),t=!0,e+=a+"="+I(i[a]+"")}return e=function(e,n){if(e.length>n){var r=e.substring(0,n-8).lastIndexOf("&");e=(e=e.substring(0,r)+"&ns_cut="+I(e.substring(r+1))).substring(0,n)}return e}(e,r),e}function R(e,n){for(var r in n){var t=n[r];t!=undefined&&(e[r]=t)}}var I="undefined"!=typeof encodeURIComponent?encodeURIComponent:escape,j="undefined"!=typeof decodeURIComponent?decodeURIComponent:unescape;var P=[],M=!1;function S(){if(!M){M=!0;for(var e=0,n=P;e<n.length;e++){(0,n[e])()}P=[],M=!1}}function E(e,n,r,t){e.cookie="".concat(n,"=").concat(r,"; expires=").concat(t.toUTCString(),"; path=/")}var F="_scor_uid",T=33696e6;function U(e,n){var r,t,o=function(e,n){for(var r=0,t=e.split("; ");r<t.length;++r){var o=t[r];if(o&&0==o.indexOf(n))return o.substring(n.length+1)}}(n.cookie,F);o||(r=(new Date).getTime(),t="undefined"!=typeof performance&&performance.now&&1e3*performance.now()||0,o="xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(function(e){var n=16*Math.random();return r>0?(n=(r+n)%16|0,r=Math.floor(r/16)):(n=(t+n)%16|0,t=Math.floor(t/16)),("x"===e?n:3&n|8).toString(16)})));var i=new Date((new Date).getTime()+T);E(n,F,o,i),e[k]["cs_fpcu"]=o}function J(e,n,r,t){var o=n.enableTcfIntegration==undefined||n.enableTcfIntegration,i=n.enableFirstPartyCookie,a={M:!1,S:!0};return o&&(a=function(){var e=C();if(!e)return{M:!1,S:!0};var n,r={gdpr:0,gdpr_p1t:"",gdpr_li:"",gdpr_purps:"",gdpr_pcc:""};if(!e.k)return{M:!0,k:!1,S:!0,labels:{},F:!1,T:!0};if(r["cs_cmp_id"]=e.cmpId,r["cs_cmp_sv"]=e.cmpVersion,r["cs_cmp_rt"]=e.C,R(r,e.labels),!e.A)return{M:!0,k:!0,S:!0,labels:r,F:!0,T:!1};if(r["gdpr"]="1",!e.D)return{M:!0,k:!0,S:!1,labels:r,F:!1,T:!0};r["gdpr_li"]=e.R?"1":"0",r["gdpr_pcc"]=e.j,e.O&&e.purposeOneTreatment?(r["gdpr_p1t"]="1",n=!0):(r["gdpr_p1t"]="0",n=!!e.consents[1]);var t=!1;if(e.I){t=n;var o=[];n&&o.push(1),e.consents[7]&&o.push(7),e.consents[8]&&o.push(8),e.consents[9]&&o.push(9),e.consents[10]&&o.push(10),r["gdpr_purps"]=o.join(",")}return{M:!0,k:!0,S:t,labels:r,F:e.I&&n,T:!e.I||!n}}()).M&&(t||a.k)&&R(e[A],a.labels),o&&a.M?a.F?i&&U(e,r):(t||a.k)&&a.T&&(!function(e,n){E(e,n,"",new Date(0))}(r,F),e[A]["cs_fpcd"]="1"):i&&"1"==e[A]["cs_ucfr"]&&U(e,r),a}var N="https://sb.scorecardresearch.com/b?",B="https://sb.scorecardresearch.com/b2?",G=2048,L="4.1.0+2306211052";function V(e,n){!function(e){if("undefined"!=typeof Image){var n=new Image;window.ns_p||(window.ns_p=n),n.src=e}}(O(n?N:B,e,G))}function z(e,n,r,t){var o=[{},{cs_it:r,cv:L,ns__t:+new Date,ns_c:t?t.characterSet:""},{}];for(var i in window!=window.top&&(o[A]["ns_if"]=1),t&&(o[D]={c7:t.URL,c8:t.title,c9:t.referrer}),e){var a=e[i];"string"!=typeof a&&"number"!=typeof a||("c1"==i||"c2"==i?o[k][i]=a:o[A][i]=a)}if(!o[k]["c2"])return!1;if(o[k]["c1"]||(o[k]["c1"]=2),n.url_append){var c=function(e){for(var n,r={},t=e.split("&"),o=0;o<t.length;++o){var i=null===(n=t[o])||void 0===n?void 0:n.split("=");i&&i[0]&&i[1]&&(r[i[0]]=j(i[1]))}return r}(n.url_append.replace(/&amp;/,"&"));R(o[A],c)}return o}!function(){var e,n=[],r="ns__zoom_svg",t="http://www.w3.org/2000/svg",o="length",i="setAttribute",a=window,c=document,f="parent",u="string",l="inner",s="Height",v="Width",d="number",p=Math,b="source",w="position",m="getBoundingClientRect",_="document",y="hasFocus",g=navigator.userAgent,x=/edge\//i.test(g),h=/ applewebkit\//i.test(g)&&!x;if(a.JSON&&a.postMessage&&(a.addEventListener("message",(function(l){try{var d=typeof l.data==u?JSON.parse(l.data):l.data;if(d&&d.mvce){for(var p=0;p<n[o];p++)if(n[p].win===l[b])return;var m=l[b],y=0;for(h&&((e=c.getElementById(r))||((e=c.createElementNS(t,"svg"))[i]("xmlns",t),e[i]("version","1.1"),e[i](s,"0"),e[i](v,"0"),e[i]("id",r),e[i]("style",w+":absolute;top:-9999px;border:0;display:none;"),c.body.appendChild(e)));m[f]!=a&&y<5;)m=m[f],y++;var g=m[f][_].getElementsByTagName("iframe");for(p=0;p<g[o];p++)if(g[p].contentWindow==m){el=g[p];break}n.push({win:l[b],el:el})}}catch(l){}})),a.ns_||(ns_={}),ns_.mvce||(ns_.mvce={}),!ns_.mvce.sGO)){var C=function(e,n,r){var t,o,i,a,f=0,u=0;try{if(!e)return[0,0];if(n=n||c,r=r||n.defaultView||n.parentWindow,o=n.body||{},n.documentElement,e[m]&&"EMBED"!=e.nodeName)u=(t=e[m]()).left,f=t.top;else{do{if(i=e.offsetTop||0,a=e.offsetLeft||0,e==o&&(i=p.abs(i),a=p.abs(a)),f+=i,u+=a,e.offsetParent==o&&"absolute"==e.style[w])break}while(e=e.offsetParent);!n.querySelectorAll&&typeof o.clientTop===d&&(f+=o.clientTop,u+=o.clientLeft)}}catch(v){return[u,f]}return[u,f]},k=function(e){var n,r=[v,s],t=[],i=p.round,a="client";try{n=e[_].documentElement;for(var f=r[o],u=r[--f];u;u=r[--f])typeof e[l+u]==d?t[f]=i(e[l+u]):n&&n[a+u]?t[f]=i(n[a+u]):t[f]=i(c.body[a+u])}catch(b){return t}return t},A=function(e){try{return!(e==e.top&&!e.top[_][y]())&&(!(!e[_][y]()&&!e.top[_][y]())||A(e[f]))}catch(r){return!0}};ns_.mvce.sGO=function(r){for(var t=0;t<n[o];t++){r=typeof r==u?JSON.parse(r):{};var i={gg:!0};if(n[t].el){var c=C(n[t].el),f=k(a);r.ifx=c[0]+a.screenLeft,r.ify=c[1]+a.screenTop,r.w=f[0],r.h=f[1],r.f=A(a),r.z=e?e.currentScale:1,r.iw=a[l+v],r.ih=a[l+s],r.ow=a["outer"+v],i.vi=JSON.stringify(r),i.ver="15",i.host="displayGGiframe",n[t].win&&n[t].win.postMessage(i,"*")}}},ns_.mvce.sGO(),setInterval(ns_.mvce.sGO,200)}}();var H,W=(H={U:"m9",J:document,N:function(e,n){!function(e,n){s(S);var r=function(n){V(e,n)},t=J(e,n,document,!1);!t.M||t.k?r(t.S):P.push((function(){var t=J(e,n,document,!1);r(t.S)}))}(e,n)}},function(e){if(e){var n=e.options||{},r=z(e,n,H.U,H.J);r&&H.N(r,n)}}),q=function(e){return function(n){n=n||_comscore;for(var r=0;r<n.length;++r)e(n[r]);_comscore=[]}}(W);return"undefined"==typeof _comscore&&(window._comscore=[]),q(),e.beacon=W,e.purge=q,e}({});