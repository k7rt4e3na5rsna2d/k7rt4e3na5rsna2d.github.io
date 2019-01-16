/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/touch","./_base/kernel,./aspect,./dom,./on,./has,./mouse,./ready,./_base/window".split(","),function(k,a,l,c,g,f,m,d){function e(h){return function(b,a){return c(b,h,a)}}var a=g("touch"),i=!1;g("ios")&&(g=navigator.userAgent.match(/OS ([\d_]+)/)?RegExp.$1:"1",i=5>parseFloat(g.replace(/_/,".").replace(/_/g,"")));var j,b;a&&(m(function(){b=d.body();d.doc.addEventListener("touchstart",function(h){var a=b;b=h.target;c.emit(a,"dojotouchout",{target:a,relatedTarget:b,bubbles:!0});c.emit(b,
"dojotouchover",{target:b,relatedTarget:a,bubbles:!0})},!0);c(d.doc,"touchmove",function(a){if((a=d.doc.elementFromPoint(a.pageX-(i?0:d.global.pageXOffset),a.pageY-(i?0:d.global.pageYOffset)))&&b!==a)c.emit(b,"dojotouchout",{target:b,relatedTarget:a,bubbles:!0}),c.emit(a,"dojotouchover",{target:a,relatedTarget:b,bubbles:!0}),b=a})}),j=function(a,e){return c(d.doc,"touchmove",function(c){if(a===d.doc||l.isDescendant(b,a))c.target=b,e.call(this,c)})});f={press:e(a?"touchstart":"mousedown"),move:a?j:
e("mousemove"),release:e(a?"touchend":"mouseup"),cancel:a?e("touchcancel"):f.leave,over:e(a?"dojotouchover":"mouseover"),out:e(a?"dojotouchout":"mouseout"),enter:f._eventHandler(a?"dojotouchover":"mouseover"),leave:f._eventHandler(a?"dojotouchout":"mouseout")};return k.touch=f});