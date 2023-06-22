(self.webpackChunkPhoenix=self.webpackChunkPhoenix||[]).push([[8593],{30684:(e,t,n)=>{"use strict";function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){for(var n,r=0;r<t.length;r++)(n=t[r]).enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}var a=n(24433),s=function(e){return 1===e[0]&&1===e[1]},u=function(){function e(t){var n=t.features;(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,e),this.features=n}return t=e,n=[{key:"startAuction",value:function(e,t){this.measure=a("UAM:auction")}},{key:"requestBids",value:function(e,t,n){return e.gdprIsApplicable?Promise.resolve(void 0):new Promise((function(t,o){var u;if(window.apstag?u=n.filter((function(e){return e.mediaTypes.video&&"instream"===e.mediaTypes.video.context||e.mediaTypes.banner})).map((function(e){var t,n,o=!!e.mediaTypes.video,a=null===(t=e.mediaTypes.banner)||void 0===t?void 0:t.sizes.some(s);return function(e){for(var t,n=1;n<arguments.length;n++)t=null==arguments[n]?{}:arguments[n],n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}));return e}({mediaType:o?"video":"display",sizes:o?[[640,360]]:null===(n=e.mediaTypes.banner)||void 0===n?void 0:n.sizes,slotID:o?"Default":e.code,slotName:e.adUnitPath},a?{slotParams:{ggProduct:"inScreen"}}:{})})):t(void 0),u&&0<u.length){var l=a("UAM:fetchBids");window.apstag.fetchBids({slots:u,timeout:e.timeout},(function(e){l.end(),t(new c(e))}))}else t(void 0)}))}},{key:"endAuction",value:function(e,t,n,r){this.measure.end()}}],n&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e;var t,n}();function c(e){this.prepareRequest=function(e){window.apstag.setDisplayBids()},this.applyTargetingToVideoUrl=function(t){if(0<(null==e?void 0:e.length)){var n=e.find((function(e){return"video"===e.mediaType}));if(n){var r=n.qsParams||"",i=new URL(t),o=i.searchParams.get("cust_params")||"";return i.searchParams.set("cust_params",(o+"&"+r).replace(/^&/,"")),i.toString()}}return t}}e.exports=u},59206:(e,t,n)=>{"use strict";function r(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t,n=1;n<arguments.length;n++)t=null==arguments[n]?{}:arguments[n],n%2?o(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}));return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){for(var n,r=0;r<t.length;r++)(n=t[r]).enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}var c=n(79031),l=n(46260),d=n(47586),f=n(9736),p=f.getQueryParamValue,h=f.extractSlotInfo,b=0,m=function(){function e(t){var n=t.features;(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,e),"true"===p("pbjs_debug")&&console.log(0|window.performance.now(),"[PrebidJS]","Constructing PrebidJS object",{features:n}),this.pbjs=window.pbjs,this.pbjs.aliasBidder("freewheel-ssp","freewheel"),this.pbjs.aliasBidder("33across","33acrosshi"),this.features=n,this.applyDynamicFloors=!1,this.bidHistory=new l}return t=e,(n=[{key:"init",value:function(e){var t,n,r,i,o,a,s,u;this.pbjs.onEvent("adRenderSucceeded",(function(e){p("log_bid_tracking")&&console.log(0|window.performance.now(),"[Bid Tracking]:","Bid Won by Prebid","Event: [adRenderSucceeded]",{evt:e})}));var c={buckets:[{precision:2,max:d.PRICING_BREAKPOINT,increment:.05},{precision:2,max:d.PRICING_MAX_BUCKET,increment:1}]},l={bidderSequence:"fixed",enableSendAllBids:!1,ix:{firstPartyData:Object.assign({},e.keyValues)},priceGranularity:c,userSync:{filterSettings:{iframe:{bidders:"*",filter:"include"}},userIds:[],syncDelay:5e3},rubicon:{singleRequest:!0},useBidCache:!0,cache:{url:"https://prebid.adnxs.com/pbc/v1/cache"},floors:{data:{currency:"USD",skipRate:0,modelVersion:"Default Ad Unit Floors",schema:{fields:["mediaType"]},values:{banner:.1,video:.25}}}};e.sellerId&&(l.schain={validation:"strict",config:{ver:"1.0",complete:1,nodes:[{asi:"thearenagroup.net",sid:e.sellerId,hp:1}]}});var f=window.phxConsentManagement.consentType;if(l.consentManagement=e.gdprIsApplicable?{gdpr:{cmpApi:"iab",defaultGdprScope:!0,allowAuctionWithoutConsent:!1,rules:[{purpose:"storage",enforcePurpose:!0,enforceVendor:!0,vendorExceptions:["permutive"]},{purpose:"basicAds",enforcePurpose:!0,enforceVendor:!0,vendorExceptions:[]},{purpose:"measurement",enforcePurpose:!0,enforceVendor:!0,vendorExceptions:["maven","mavenDistributionAnalyticsAdapter"]}]}}:"CCPA"===f?{usp:{cmpApi:"iab",timeout:50}}:{usp:{cmpApi:"static",timeout:0,consentData:{getUSPData:{uspString:"1---"}}}},this.pbjs.installedModules&&this.pbjs.installedModules.includes("connectIdSystem")&&null!==(t=e.pbjsConfig)&&void 0!==t&&null!==(n=t.userSync)&&void 0!==n&&n.userIds&&window.localStorage){var h=e.pbjsConfig.userSync.userIds.findIndex((function(e){return"connectId"===e.name}));if(0<=h){var b,m,g,v=null===(b=(m=window.localStorage).getItem)||void 0===b?void 0:b.call(m,"emailHashes");if(v){var y;try{y=JSON.parse(v)}catch(e){}y&&y.length&&(g=y.filter((function(e){return"sha256"===e.alg})).map((function(e){return e.digest}))[0])}g?e.pbjsConfig.userSync.userIds[h].params.he=g:e.pbjsConfig.userSync.userIds.splice(h,1)}e.pbjsConfig.userSync.userIds.length&&(l.userSync.userIds=e.pbjsConfig.userSync.userIds)}if(null!==(r=this.pbjs)&&void 0!==r&&null!==(i=r.installedModules)&&void 0!==i&&null!==(o=i.includes)&&void 0!==o&&o.call(i,"pairIdSystem")&&l.userSync.userIds.push({name:"pairId",params:{liveramp:{storageKey:"_lr_pairId"}}}),e.isPermutiveEnabled&&(l.realTimeData={auctionDelay:50,dataProviders:[{name:"permutive",waitForIt:!0}]}),this.pbjs.setConfig(l),e.pbjsConfig&&this.pbjs.setConfig(e.pbjsConfig),!this.features.isEnabled("disable-hummingbird")&&e.pbjsConfig&&e.hummingbirdUrl){window.hummingbirdCorrelator||(window.hummingbirdCorrelator=window.mavenCorrelator);var w=this.features.isEnabled("verbose-hummingbird"),P=(e.pbjsConfig.regionCode,"CCPA"===f&&!this.features.isEnabled("disable-ccpa"));this.pbjs.enableAnalytics({provider:"maven",options:{contentItemId:"tm-"+e.pbjsConfig.contentItemId,countryCode:e.pbjsConfig.countryCode,ccpaApplies:P,mavenChannel:e.pbjsConfig.mavenChannel,pod:e.keyValues.pod,productionDomain:e.pbjsConfig.productionDomain,screenSize:e.screenSize,url:e.hummingbirdUrl,verbose:w,zoneMap:e.pbjsConfig.zoneMap}})}!this.features.isEnabled("disable-li")&&e.pbjsConfig&&this.pbjs.enableAnalytics({provider:"mavenDistributionAnalyticsAdapter",options:{zoneMap:e.pbjsConfig.zoneMap}});var j=null===(a=e.pbjsConfig)||void 0===a||null===(s=a.userSync)||void 0===s||null===(u=s.userIds)||void 0===u?void 0:u.find((function(e){return"identityLink"===e.name}));j&&this.pbjs.enableAnalytics({provider:"atsAnalytics",options:{pid:j.params.pid,host:"https://analytics.openlog.in"}})}},{key:"startAuction",value:function(e,t){var n=this;this._initialized||(this.init(e),this._initialized=!0),this.bidConfigByAdUnit={},Object.keys(e.unitVendorConfig||{}).forEach((function(t){n.bidConfigByAdUnit[t]=e.unitVendorConfig[t]})),this.pbjs.bidderSettings={trustx:{bidCpmAdjustment:function(e,t){var r=n.bidConfigByAdUnit[t.adUnitCode];return r&&r.trustx&&r.trustx.bidReductionPercent&&(e*=1-r.trustx.bidReductionPercent/100),e}}},e.gdprIsApplicable&&this.pbjs.setConfig({userSync:{syncEnabled:!1}})}},{key:"requestBids",value:function(e,t,n){var i,o,s=this;if(t||(o=++b),n.forEach((function(t){for(var n in t.bids.forEach((function(t){Object.keys(e.keyValues).forEach((function(n){var r=e.keyValues[n],i=Array.isArray(r);if(i||(r=""+r),"rubicon"===t.bidder)(t.params.inventory||(t.params.inventory={}))[n]=i?r:[r];else if("pubmatic"!==t.bidder||i)"appnexus"===t.bidder&&(t.params.keywords||(t.params.keywords={}),"pod"===n&&(r=+r),t.params.keywords[n]=r);else{t.params.dctr?t.params.dctr+="|":t.params.dctr="";var o=function(e){return e.replace(/[=|]/g,"")};n=o(n),r=o(r),t.params.dctr+=n+"="+r}}))})),t.mediaTypes){var r=t.mediaTypes[n];"video"==n&&"outstream"===r.context&&(r.renderer={url:"https://acdn.adnxs.com/video/outstream/ANOutstreamVideo.js",render:function(e){window.ANOutstreamVideo.renderAd({targetId:e.adUnitCode,adResponse:e.adResponse})}})}})),null!=e&&null!==(i=e.pbjsConfig)&&void 0!==i&&i.experimentString&&(this.applyDynamicFloors=e.pbjsConfig.experimentString.includes("ads-5481:b")),this.applyDynamicFloors){console.log("DynamicPrebidFloors: Calculating dynamic floor prices for floor Module");var u={};n.forEach((function(t){var n=e.slots.find((function(e){return e.id===t.code})),i=null;if(n)try{var o=n.model||n.slotModel||{},l=s.bidHistory.latest||{},d=Object.keys(l).reduce((function(e,t){var n=a({},e),i=l[t];return n[i.adzone]=[].concat(r(n[i.adzone]||[]),r(i.bids)),n}),{}),f=c.calculateDynamicFloor(o.zone,d);(i=.5*f)&&(u["".concat(n.adUnitPath,"|banner")]=i,o.hb_floor=i.toString(),o.hb_estimate=f,o.hb_modelname=c.modelName,console.log("DynamicPrebidFloors: Floor price ".concat(i,". Updating Floor Module")))}catch(e){console.log("DynamicPrebidFloors: Error calculating floor price ".concat(e.message," for floor Module"))}})),u["*|banner"]=.1,u["*|video"]=.25,this.pbjs.setConfig({floors:{data:{currency:"USD",skipRate:0,modelVersion:"Gpt Slot based Model",schema:{fields:["gptSlot","mediaType"]},values:u}}})}return new Promise((function(r,i){var a=function(a){if(t||o===b){var u=new g(a,e,s.pbjs);try{s.recordHighBids(u,n,e,t||o)}catch(e){console.error("Error recording high bid:"+e.stack)}r(u)}else i(new Error("auction interrupted"))},u=[];window.IxLibraryPromise&&u.push(window.IxLibraryPromise),window.IdentityLinkPromise&&u.push(window.IdentityLinkPromise),Promise.all(u).then((function(){for(var t=e.timeout,r=0;r<n.length;r++)for(var i in n[r].mediaTypes){var o=n[r].mediaTypes[i];"video"==i&&"instream"===o.context&&e.videoTimeout&&(t=e.videoTimeout)}window.phxTrackedFeatures["min-height-header-ad"]&&n.forEach((function(t){e.slots.forEach((function(e){var n,r;e.id===t.code&&"header"===e.model.zone&&(t.mediaTypes.banner.sizes=(n=t.mediaTypes.banner.sizes,r=n.sort((function(e,t){return e[1]-t[1]}))[0][1],n.filter((function(e){return e[1]===r}))))}))})),s.pbjs.requestBids({timeout:t,adUnits:n,bidsBackHandler:a})}))}))}},{key:"endAuction",value:function(e,t,n,r){}},{key:"recordHighBids",value:function(e,t,n,r){var i=this;t.forEach((function(t){var o=n.slots&&n.slots.find((function(e){return e.id===t.code}));if(o&&o.slotModel){var a=o.slotModel.zone,s=o.id,u=e.getMaxBidForAdUnit(t),c=i.bidHistory.latest;c[s]||(c[s]={adzone:a,slot:o,bids:[]}),p("log_bid_tracking")&&console.log(0|window.performance.now(),"[Bid Tracking]:",h(null==o?void 0:o.slotModel),"Pushing cpm to session storage",{cpm:u,slot:o,auctionId:r}),c[s].bids.push(u),i.bidHistory.latest=c}}))}},{key:"updateZoneIndex",value:function(e,t){var n=this.pbjs.getConfig();n.zoneMap&&n.zoneMap[e]&&(n.zoneMap[e]=a(a({},n.zoneMap[e]),{},{index:t.index}))}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e;var t,n}();function g(e,t,n){var r=this;this._pbjs=n,this.prepareRequest=function(e){r._pbjs.setTargetingForGPTAsync(e.map((function(e){return e.getSlotElementId()}))),e.forEach((function(e){var n=e.getTargeting("hb_pb");n&&n.length&&e.setTargeting("hb_pbd",d.getCpmDollarBucket(parseFloat(n[0])).toString());var i=e.getTargeting("hb_deal");i&&i.length?e.setTargeting("deal","1"):e.setTargeting("deal","0");var o=e.getTargeting("hb_adid"),a=r._highestBid(e.getSlotElementId());a&&o&&o.length&&o[0]===a.adId&&a.appnexus&&a.appnexus.buyerMemberId&&e.setTargeting("apnmid",a.appnexus.buyerMemberId),t&&t.slots&&t.slots.forEach((function(t){t.id===e.getSlotElementId()&&(t.model.hb_floor&&e.setTargeting("hb_floor",t.model.hb_floor),t.model.hb_estimate&&e.setTargeting("hb_estimate",t.model.hb_estimate),t.model.hb_floor&&e.setTargeting("hb_modelname",t.model.hb_modelname))}))}))},this.getMaxBidForAdUnit=function(e){var t=r._highestBid(e),n=0;return t&&t.cpm&&(n=t.cpm),n},this._highestBid=function(e){var t=r._pbjs.getHighestCpmBids(e);if(t&&t.length)return t[0]},this.applyTargetingToVideoUrl=function(t){var r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return e&&0<Object.keys(e).length?n.adServers.dfp.buildVideoUrl(a(a({},r),{},{url:t})):t}}e.exports=m},20566:(e,t,n)=>{"use strict";function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t,n=1;n<arguments.length;n++)t=null==arguments[n]?{}:arguments[n],n%2?r(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}));return e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=n(24433),s=new Set(["33acrosshi","aol","appnexus","freewheel","grid","ix","kargo","pubmatic","pulsepoint","rubicon","sovrn","spotx","teads","triplelift","trustx"]),u=0,c=0;function l(){this.getSlotModelPropertiesForAdUnit=function(){return{}},this.getMaxBidForAdUnit=function(){return 0},this.prepareRequest=function(){},this.applyTargetingToVideoUrl=function(e){return e}}e.exports=function(e,t,n){var r=this;function o(t,n,r){var i,o,l=this,h=new Promise((function(e,t){i=e,o=t}));r?p[r]=h:d=h;var b,m="bid-scroll-".concat(e.toLowerCase());b="BCD".includes(e)&&window.phxTrackedFeatures[m]||"A".includes(e)&&!window.phxTrackedFeatures["reverse-".concat(m)]?new Promise((function(e){0<window.scrollY?e():document.addEventListener("scroll",(function t(){document.removeEventListener("scroll",t),e()}))})):Promise.resolve();var g=[window.GdprStatus.countryCodeSafe(),window.GdprStatus.regionCodeSafe(),window.GdprStatus.isDemonetizedSafe(),b];if(t.useGpt){var v=window.googletag=window.googletag||{},y=v.cmd=v.cmd||[];g.push(new Promise((function(e,t){y.push((function(){e(window.googletag)}))})))}return window.carbonReadyPromise&&g.push(window.carbonReadyPromise),Promise.all(g).then((function(d){var p=d[0],h=d[1];if(d[2])return!0!==n&&l._auctionConfigPromiseResolve(!1),void i([]);!0!==n&&(f=t,l._auctionConfigPromiseResolve(!0)),t.screenSize=e,t.keyValues=l.keyValues;var b=location.pathname.split("/");b[0]=location.hostname;var m="",g=1;b.forEach((function(e){""!==e&&(m+=(""===m?"":"/")+e,t.keyValues["au"+g++]=m)})),t.keyValues.pod=""+c,t.keyValues.correlator=window.mavenCorrelator;var v=a("prebid:auction:"+ ++u);t.pbjsConfig||(t.pbjsConfig={}),t.pbjsConfig.countryCode=p,t.pbjsConfig.regionCode=h;var y={};t.slots&&t.slots.map((function(e){y[e.id]={zone:e.model&&e.model.zone,index:e.model&&e.model.index}})),window.phxPageTarget&&window.phxPageTarget.config.dynamicSlots&&window.phxPageTarget.config.dynamicSlots.map((function(e){y[e.id]={zone:e.model&&e.model.zone,index:e.model&&e.model.index}})),t.pbjsConfig.zoneMap=y,l._services.forEach((function(e){return e.startAuction(t,r)}));var w=t.units[e]||[];t.gdprIsApplicable&&(w=w.filter((function(e){return e.bids=e.bids.filter((function(e){return s.has(e.bidder)})),0<e.bids.length}))),w.forEach((function(e){e.bids=e.bids.filter((function(e){var t=!0;if(e.geographicRestrictions){var n=e.geographicRestrictions.countries||[];"exclude"===e.geographicRestrictions.restrictionType?t=!n.includes(p):"restrictTo"===e.geographicRestrictions.restrictionType&&(t=n.includes(p)),delete e.geographicRestrictions}return t}))}));var P=l._services.map((function(e){return e.requestBids(t,r,w)}));Promise.all(P).then((function(e){v.end(),l._services.forEach((function(n){return n.endAuction(t,r,w,e)})),i(e)})).catch((function(e){return o(e)}))}))}if(n)return this.getLatestResult=function(){return Promise.resolve(new l)},this.getResultById=function(){return Promise.resolve(new l)},this.startAuction=function(){},this.rerunAuction=function(){},void(this.addService=function(){});this._services=[];var d,f,p={},h=new Promise((function(e){r._auctionConfigPromiseResolve=e}));0===c&&(c=function(){function e(e){return e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0),e}var t,n="pageViews",r=window.localStorage;if(!r)return 0;try{var i;t=JSON.parse(null===(i=r.getItem)||void 0===i?void 0:i.call(r,n))}catch(e){}if(t&&t.created){var o=e(new Date(t.created)),a=e(new Date);o.getTime()===a.getTime()?++t.value:(r.removeItem(n),t=void 0)}return t||(t={created:new Date,value:0}),r.setItem(n,JSON.stringify(t)),t.value}());var b=function(e){return{prepareRequest:function(t){e.forEach((function(e){e&&e.prepareRequest&&e.prepareRequest(t)}))},getSlotModelPropertiesForAdUnit:function(t){var n=Object.assign({},r.keyValues);return e.forEach((function(e){e&&e.getSlotModelPropertiesForAdUnit&&Object.assign(n,e.getSlotModelPropertiesForAdUnit(t))})),n},getMaxBidForAdUnit:function(t){var n=0;return e.forEach((function(e){e&&e.getMaxBidForAdUnit&&(n=Math.max(n,e.getMaxBidForAdUnit(t)))})),n},applyTargetingToVideoUrl:function(t,n){var r=t;return e.forEach((function(e){e&&e.applyTargetingToVideoUrl&&(r=e.applyTargetingToVideoUrl(r,n))})),r}}};this.keyValues={},this.getLatestResult=function(){return d?d.then(b):Promise.resolve(new l)},this.getResultById=function(e){return p.hasOwnProperty(e)?p[e].then(b):Promise.reject(new Error("Unknown auction result requested: "+e))},this.startAuction=function(e){var t=this,n=arguments,r=function(){return o.apply(t,n)},i=window.GdprStatus;return e.gdprIsApplicable&&void 0===e.gdprIsConsentGiven?i.waitForConsentValue().then((function(){i.isConsentGivenForPurposes(i.PURPOSE_IDS.advertising).then((function(t){e.gdprIsConsentGiven=t,r()}))})):r()},this.dynamicAuction=function(t,n){var r=this;return new Promise((function(o,a){return 0===(t.units[e]||[]).filter((function(e){return e.bids&&e.bids.length})).length?(console.warn("No bidders configured for auction unit",t),void a()):void h.then((function(s){if(s){var u=i(i({},f),{},{slots:t.slots,unitVendorConfig:t.unitVendorConfig,units:{}});u.units[e]=t.units[e],r.startAuction(u,!0,n).then((function(){o()}))}else a()}))}))},this.rerunAuction=function(t,n,r){if(!f)return!1;var i,o=!1;return t?((i={siteProductionDomain:f.siteProductionDomain,timeout:n||f.timeout,isRefresh:!0,slots:f.slots.filter((function(e){return e.id===t})),unitVendorConfig:f.unitVendorConfig,units:{}}).units[e]=f.units[e].filter((function(e){return e.code===t})),o=!0):i=f,this.startAuction(i,o,r),!0},this.addService=function(e){this._services.push(e)},this.setKeyValue=function(e,t){this.keyValues[e]=t},this.updateZoneIndex=function(e,t){this._services.forEach((function(n){"function"==typeof n.updateZoneIndex&&n.updateZoneIndex(e,t)}))}}},46260:e=>{function t(e,t){for(var n,r=0;r<t.length;r++)(n=t[r]).enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}function n(e,t,n){return function(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}(e,i(e,t,"set"),n),n}function r(e,t){return function(e,t){return t.get?t.get.call(e):t.value}(e,i(e,t,"get"))}function i(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}var o=new WeakMap,a=function(){function e(){var t,n,r;(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,e),r={writable:!0,value:void 0},function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(t=this,n=o),n.set(t,r),this.storageKeyName="ad-auction-bid-history"}return i=e,(a=[{key:"latest",get:function(){return r(this,o)||(window.sessionStorage&&n(this,o,JSON.parse(window.sessionStorage.getItem(this.storageKeyName))),n(this,o,r(this,o)||{})),r(this,o)},set:function(e){n(this,o,e),window.sessionStorage&&window.sessionStorage.setItem(this.storageKeyName,JSON.stringify(r(this,o)))}}])&&t(i.prototype,a),Object.defineProperty(i,"prototype",{writable:!1}),e;var i,a}();e.exports=a},79031:(e,t,n)=>{"use strict";function r(e,t){for(var n,r=0;r<t.length;r++)(n=t[r]).enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}n.r(t),n.d(t,{calculateDynamicFloor:()=>o,default:()=>i,modelName:()=>a});var i=function(){function e(t){(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,e),this.REFRESH_ZONES=["fixed_bottom","atf_sidebar"],this.bidHistory=t}return t=e,(n=[{key:"avgZoneBid",value:function(e){var t=this.bidHistory[e]||[];return 0===t.length?0:t.reduce((function(e,t){return e+t}))/t.length}},{key:"prevZoneBid",value:function(e){var t=this.bidHistory[e]||[];return 0===t.length?0:t[t.length-1]}},{key:"slotFloor",value:function(e){if(!this.REFRESH_ZONES.includes(e))return null;var t=this.bidHistory[e]||[];return 1.38898+.47409*this.avgZoneBid(e)+(0===t.length?1.28839:0)+.47781*this.prevZoneBid(e)}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e;var t,n}(),o=function(e,t){return new i(t).slotFloor(e)},a="iforiq-8/15/22"},89225:(e,t,n)=>{"use strict";var r=n(87796),i=n(20566),o=n(59206),a=n(30684),s=n(24433)("adScripts:beta1");window.phxConfigQueue.push((function(){var e=this;window.pbjs.que.push((function(){var t=new i(e.breakpoint.get(),e.features,e.user.hasPremium()),n={features:e.features};t.addService(new o(n)),t.addService(new a(n)),r("phxAdAuctionQueue",t)}))})),s.end()},47586:e=>{"use strict";e.exports={PRICING_BREAKPOINT:20,PRICING_MAX_BUCKET:50,getCpmDollarBucket:function(e){return Math.min(Math.floor(e),50)}}},87796:(e,t,n)=>{"use strict";var r=n(24433);e.exports=function(e,t){function n(e){t.then?t.then((function(n){t=n,e.call(t)})):e.call(t)}var i=r("callbackQueue.install:".concat(e)),o=window[e];if(window[e]={push:n},void 0!==o)for(var a=0;a<o.length;a++)n(o[a]);i.end()}},63950:e=>{"use strict";e.exports={breakpoints:{A:0,B:675,C:1240,D:1680},breakpointHeights:{D:1050},soccerLeagues:["epl","mls","la liga","serie a"],fullSoccerLeagues:["premier league","major league soccer","laliga","serie a"]}},86483:e=>{"use strict";var t,n=function(){};try{t=window}catch(e){t={}}e.exports=t.performance&&t.performance.mark?t.performance:{getEntriesByName:n,mark:n,measure:n}},24433:(e,t,n)=>{"use strict";var r=n(86483),i=0;function o(){var e="phxMark:"+i++;return r.mark(e),e}e.exports=function(e){var t=o();return{end:function(){var n=o();r.measure(e,t,n);var i=r.getEntriesByName(e);if(i&&i.length)return i[i.length-1].duration}}}},9736:(e,t,n)=>{"use strict";function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t,n=1;n<arguments.length;n++)t=null==arguments[n]?{}:arguments[n],n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}));return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n,r=0;r<t.length;r++)(n=t[r]).enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}function c(e,t,n){return t&&u(e.prototype,t),n&&u(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}var l=n(63950),d=l.breakpoints,f=l.breakpointHeights;function p(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:document.head,r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:document;return new Promise((function(i,o){var a=r.createElement("script");for(var s in t)a.setAttribute(s,t[s]);a.onload=function(){i(a)},a.onerror=function(e){o(e)},a.type="text/javascript",a.src=e,n.appendChild(a)}))}var h={};function b(){var e,t=window.innerWidth,n=window.innerHeight;for(var r in d)t>=d[r]&&(!f[r]||n>=f[r])&&(e=r);return e}var m,g,v,y=function(){function e(){s(this,e),this.observedBreakpoint=void 0,this.subscribers=[],this._observe()}return c(e,[{key:"_observe",value:function(){var e=this;this.observedBreakpoint=b(),window.addEventListener("resize",(function(){var t=b();t!==e.observedBreakpoint&&(e.observedBreakpoint=t,e.subscribers.forEach((function(e){e.onBreakpointChange(t)})))}))}},{key:"subscribe",value:function(e){if(!e.onBreakpointChange)throw new Error("onBreakpointChange method required");this.unsubscribe(e),this.subscribers.push(e)}},{key:"unsubscribe",value:function(e){var t=this.subscribers.indexOf(e);this.subscribers.splice(t,1)}}]),e}();function w(){return"complete"===document.readyState||"interactive"===document.readyState}var P,j,O,S={};function C(e,t){var n;try{n=new IntersectionObserver(e,t)}catch(i){var r=o({},t);delete r.root,n=new IntersectionObserver(e,r)}return n}function k(e,t,n){function i(){return(new Date).getTime()}function o(){var n=t-(i()-f);if(0>=n||n>t){l&&window.clearTimeout(l);var r=b;l=h=b=void 0,r&&(v=i(),d=e.apply(p,u),!h&&!l&&(u=p=null))}else h=window.setTimeout(o,n)}function a(){h&&window.clearTimeout(h),l=h=b=void 0,(w||y!==t)&&(v=i(),d=e.apply(p,u),!h&&!l&&(u=p=null))}function s(){var n,r,s;return u=arguments,f=i(),p=this,b=w&&(h||!c),!1===y?n=c&&!h:(!l&&!c&&(v=f),(s=0>=(r=y-(f-v))||r>y)?(l&&(l=window.clearTimeout(l)),v=f,d=e.apply(p,u)):!l&&(l=window.setTimeout(a,r))),s&&h?h=window.clearTimeout(h):!h&&t!==y&&(h=window.setTimeout(o,t)),n&&(s=!0,d=e.apply(p,u)),!s||h||l||(u=p=null),d}var u,c,l,d,f,p,h,b,m,g,v=0,y=!1,w=!0;if(s.cancel=function(){h&&window.clearTimeout(h),l&&window.clearTimeout(l),l=h=b=void 0},s.pending=function(){return void 0!==h},"function"!=typeof e)throw new TypeError("this is not a function!");return t=0>t?0:+t||0,!0===n?(c=!0,w=!1):(g=r(m=n),!!m&&("object"===g||"function"===g)&&(c=n.leading,y="maxWait"in n&&Math.max(+n.maxWait||0,t),w="trailing"in n?n.trailing:w)),s}var T=function(){function e(t,n){s(this,e),this.callback=t,this.timerId=null,this.restart(n)}return c(e,[{key:"restart",value:function(e){this.remaining=e,this.resume()}},{key:"resume",value:function(){this.start=new Date,clearTimeout(this.timerId),this.timerId=setTimeout(this.callback,this.remaining)}},{key:"pause",value:function(){clearTimeout(this.timerId),this.remaining-=new Date-this.start}},{key:"cancel",value:function(){clearTimeout(this.timerId),this.cancelled=!0}}]),e}();function E(e){return e.split(/(?=[A-Z])/).join("_").toLowerCase()}e.exports={addScriptResource:p,addScriptResourceOnce:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=2<arguments.length?arguments[2]:void 0,r=3<arguments.length?arguments[3]:void 0,i=t.id||e;return h[i]||(h[i]=p(e,t,n,r))},debounce:k,debounceWithTime:function(e,t,n){function r(){for(var e=Date.now(),t=window.performance.now(),n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];return i.apply(void 0,r.concat([e,t]))}var i=k(e,t,n);for(var o in i)"function"==typeof i[o]&&(r[o]=i[o]);return r},getCurrentBreakpoint:b,getQueryParamValue:function(e){if(!e)return null;var t=new URLSearchParams(window.location.search);return null==t?void 0:t.get(e)},isExternalLink:function(e,t){if(!e)return!1;t||(t=function(){if(!j){var e=document.querySelector("link[rel='canonical']"),t=document.createElement("a");t.href=e.href,j=t.hostname}return j}());var n=e.match(/^https?:\/\/([^/]+)\/?/);return!!n&&n[1]!==t},makeIntersectionObserver:C,observeBreakpointChanges:function(e){return m||(m=new y),m.subscribe(e),m},observeFirstIntersection:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"190px 0px",n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:document,r=S[t]||(S[t]=C((function(e,t){e.forEach((function(e){e.isIntersecting&&(t.unobserve(e.target),e.target.onFirstIntersection&&e.target.onFirstIntersection())}))}),{root:n,rootMargin:t}));return r.observe(e),r},observeVisibilityChanges:function(e){return P||(P=C((function(e){e.forEach((function(e){e.isIntersecting&&.5<=e.intersectionRatio?e.target.onChangeToVisible&&e.target.onChangeToVisible():e.target.onChangeToNotVisible&&e.target.onChangeToNotVisible()}))}),{threshold:.5})),P.observe(e),P},observeAfterFirstFullView:function(e){var t=C((function(e,t){e.forEach((function(e){e.target.onAfterFirstFullView&&e.isIntersecting&&(e.target.onAfterFirstFullView(e),t.unobserve(e.target))}))}),{root:document,threshold:[.95,1]});return t.observe(e),t},parseHostName:function(e){return e.replace(/^https?:\/\//,"").replace(/[:\/].*/,"").toLowerCase().replace(/^www\./,"").replace(/^m\./,"").replace(/\.blogspot(\.com?)?\.[a-z]{2,3}$/,".blogspot.com").replace(/^.*\.(gamepedia|wikia)(\.com?)?\.[a-z]{2,3}$/,"$1.com").split(".").slice(-3).join(".")},personalizedSlice:function(e,t){var n,r=(0|e/100)%100,i=(t||[]).map((function(e){return e.percentageForSlice})).map((n=0,function(e){return n+=e})).findIndex((function(e){return e>r}));return-1===i?void 0:t[i]},styleObjectToCustomCSSVariables:function e(t,n){n=n?"".concat(E(n),"_"):"--";var i={};return"object"===r(t)&&Object.keys(t)&&Object.keys(t).length&&Object.keys(t).forEach((function(a){if("string"==typeof t[a]||"number"==typeof t[a])i["".concat(n).concat(E(a))]=t[a];else if("object"===r(t[a])&&!Array.isArray(t[a])){var s=e(t[a],"".concat(n).concat(E(a)));i=o(o({},i),s)}})),i},supportPassiveEventListeners:function(){if(void 0===O){O=!1;try{var e=Object.defineProperty({},"passive",{get:function(){return O=!0,null}});window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e)}catch(e){}}return O},throttle:function(e,t){var n,r,i,o,a=0,s=function(){a=new Date,i=null,o=e.apply(n,r)};return function(){var u=new Date,c=t-(u-a);return n=this,r=arguments,0>=c?(i&&clearTimeout(i),a=u,o=e.apply(n,r)):!i&&(i=setTimeout(s,c)),o}},Timer:T,userHasPremium:function(){return new Promise((function(e,t){window.phxConfigQueue||t("config object is necessary to check premium"),window.phxConfigQueue.push((function(){e(this.user.hasPremium())}))}))},waitForElement:function(e,t,n){if(!e)throw new Error("rootElement required");var r;return n&&n.untilDomReady&&(r=function(e){w()&&e()}),function(e,t,n,r){var i=e.querySelector(t);return i?Promise.resolve(i):new Promise((function(i,o){var a=new MutationObserver((function(){var n=e.querySelector(t);return n?(a.disconnect(),void i(n)):void(r&&r((function(){return a.disconnect(),void o(new Error("element not found"))})))}));a.observe(e,n)}))}(e,t,{childList:!0,subtree:!0},r)},whenDomContentLoaded:function(){return g||(g=w()?Promise.resolve():new Promise((function(e,t){document.addEventListener("DOMContentLoaded",e)}))),g},whenPageLoaded:function(){return v||(v="complete"===document.readyState?Promise.resolve():new Promise((function(e,t){window.addEventListener("load",e)}))),v},extractSlotInfo:function(e){return null!=e&&e.zone?"[".concat(null==e?void 0:e.zone,"_").concat(null==e?void 0:e.index,"]"):"[Slot Info Unavailable]"}}}},e=>{e(e.s=89225)}]);
//# sourceMappingURL=adAuctionPrebidJSAmazonUAM.min.js.map