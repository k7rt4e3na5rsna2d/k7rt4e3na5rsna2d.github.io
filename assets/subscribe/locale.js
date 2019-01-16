/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/date/locale","../_base/lang,../_base/array,../date,../cldr/supplemental,../i18n,../regexp,../string,../i18n!../cldr/nls/gregorian,module".split(","),function(j,k,o,r,p,u,q,x,s){function v(a,f,e,c){return c.replace(/([a-z])\1*/ig,function(i){var b,h,d=i.charAt(0),i=i.length,l=["abbr","wide","narrow"];switch(d){case "G":b=f[4>i?"eraAbbr":"eraNames"][0>a.getFullYear()?0:1];break;case "y":b=a.getFullYear();switch(i){case 1:break;case 2:if(!e.fullYear){b=""+b;b=b.substr(b.length-2);break}default:h=
!0}break;case "Q":case "q":b=Math.ceil((a.getMonth()+1)/3);h=!0;break;case "M":case "L":b=a.getMonth();3>i?(b+=1,h=!0):(d=["months","L"==d?"standAlone":"format",l[i-3]].join("-"),b=f[d][b]);break;case "w":b=g._getWeekOfYear(a,0);h=!0;break;case "d":b=a.getDate();h=!0;break;case "D":b=g._getDayOfYear(a);h=!0;break;case "e":case "c":if(b=a.getDay(),2>i){b=(b-r.getFirstDayOfWeek(e.locale)+8)%7;break}case "E":b=a.getDay();3>i?(b+=1,h=!0):(d=["days","c"==d?"standAlone":"format",l[i-3]].join("-"),b=f[d][b]);
break;case "a":d=12>a.getHours()?"am":"pm";b=e[d]||f["dayPeriods-format-wide-"+d];break;case "h":case "H":case "K":case "k":h=a.getHours();switch(d){case "h":b=h%12||12;break;case "H":b=h;break;case "K":b=h%12;break;case "k":b=h||24}h=!0;break;case "m":b=a.getMinutes();h=!0;break;case "s":b=a.getSeconds();h=!0;break;case "S":b=Math.round(a.getMilliseconds()*Math.pow(10,i-3));h=!0;break;case "v":case "z":if(b=g._getZone(a,!0,e))break;i=4;case "Z":d=g._getZone(a,!1,e);d=[0>=d?"+":"-",q.pad(Math.floor(Math.abs(d)/
60),2),q.pad(Math.abs(d)%60,2)];4==i&&(d.splice(0,0,"GMT"),d.splice(3,0,":"));b=d.join("");break;default:throw Error("dojo.date.locale.format: invalid pattern char: "+c);}h&&(b=q.pad(b,i));return b})}function n(a,f,e,c){var i=function(b){return b},f=f||i,e=e||i,c=c||i,b=a.match(/(''|[^'])+/g),h="'"==a.charAt(0);k.forEach(b,function(d,a){d?(b[a]=(h?e:f)(d.replace(/''/g,"'")),h=!h):b[a]=""});return c(b.join(""))}function w(a,f,e,c){c=u.escapeString(c);e.strict||(c=c.replace(" a"," ?a"));return c.replace(/([a-z])\1*/ig,
function(c){var b;b=c.charAt(0);var h=c.length,d="",g="";e.strict?(1<h&&(d="0{"+(h-1)+"}"),2<h&&(g="0{"+(h-2)+"}")):(d="0?",g="0{0,2}");switch(b){case "y":b="\\d{2,4}";break;case "M":case "L":b=2<h?"\\S+?":"1[0-2]|"+d+"[1-9]";break;case "D":b="[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|"+d+"[1-9][0-9]|"+g+"[1-9]";break;case "d":b="3[01]|[12]\\d|"+d+"[1-9]";break;case "w":b="[1-4][0-9]|5[0-3]|"+d+"[1-9]";break;case "E":case "e":case "c":b="\\S+";break;case "h":b="1[0-2]|"+d+"[1-9]";break;case "k":b="1[01]|"+
d+"\\d";break;case "H":b="1\\d|2[0-3]|"+d+"\\d";break;case "K":b="1\\d|2[0-4]|"+d+"[1-9]";break;case "m":case "s":b="[0-5]\\d";break;case "S":b="\\d{"+h+"}";break;case "a":h=e.am||f["dayPeriods-format-wide-am"];d=e.pm||f["dayPeriods-format-wide-pm"];b=h+"|"+d;e.strict||(h!=h.toLowerCase()&&(b+="|"+h.toLowerCase()),d!=d.toLowerCase()&&(b+="|"+d.toLowerCase()),-1!=b.indexOf(".")&&(b+="|"+b.replace(/\./g,"")));b=b.replace(/\./g,"\\.");break;default:b=".*"}a&&a.push(c);return"("+b+")"}).replace(/[\xa0 ]/g,
"[\\s\\xa0]")}var g={};j.setObject(s.id.replace(/\//g,"."),g);g._getZone=function(a,f){return f?o.getTimezoneName(a):a.getTimezoneOffset()};g.format=function(a,f){var f=f||{},e=p.normalizeLocale(f.locale),c=f.formatLength||"short",e=g._getGregorianBundle(e),i=[],b=j.hitch(this,v,a,e,f);if("year"==f.selector)return n(e["dateFormatItem-yyyy"]||"yyyy",b);var h;"date"!=f.selector&&(h=f.timePattern||e["timeFormat-"+c])&&i.push(n(h,b));"time"!=f.selector&&(h=f.datePattern||e["dateFormat-"+c])&&i.push(n(h,
b));return 1==i.length?i[0]:e["dateTimeFormat-"+c].replace(/\'/g,"").replace(/\{(\d+)\}/g,function(b,a){return i[a]})};g.regexp=function(a){return g._parseInfo(a).regexp};g._parseInfo=function(a){var a=a||{},f=p.normalizeLocale(a.locale),f=g._getGregorianBundle(f),e=a.formatLength||"short",c=a.datePattern||f["dateFormat-"+e],i=a.timePattern||f["timeFormat-"+e],e="date"==a.selector?c:"time"==a.selector?i:f["dateTimeFormat-"+e].replace(/\{(\d+)\}/g,function(b,a){return[i,c][a]}),b=[];return{regexp:n(e,
j.hitch(this,w,b,f,a)),tokens:b,bundle:f}};g.parse=function(a,f){var e=/[\u200E\u200F\u202A\u202E]/g,c=g._parseInfo(f),i=c.tokens,b=c.bundle,e=RegExp("^"+c.regexp.replace(e,"")+"$",c.strict?"":"i").exec(a&&a.replace(e,""));if(!e)return null;var h=["abbr","wide","narrow"],d=[1970,0,1,0,0,0,0],l="",e=k.every(e,function(a,e){if(!e)return!0;var c=i[e-1],g=c.length,c=c.charAt(0);switch(c){case "y":if(2!=g&&f.strict)d[0]=a;else if(100>a)a=Number(a),c=""+(new Date).getFullYear(),g=100*c.substring(0,2),c=
Math.min(Number(c.substring(2,4))+20,99),d[0]=a<c?g+a:g-100+a;else{if(f.strict)return!1;d[0]=a}break;case "M":case "L":if(2<g){if(g=b["months-"+("L"==c?"standAlone":"format")+"-"+h[g-3]].concat(),f.strict||(a=a.replace(".","").toLowerCase(),g=k.map(g,function(a){return a.replace(".","").toLowerCase()})),a=k.indexOf(g,a),-1==a)return!1}else a--;d[1]=a;break;case "E":case "e":case "c":g=b["days-"+("c"==c?"standAlone":"format")+"-"+h[g-3]].concat();f.strict||(a=a.toLowerCase(),g=k.map(g,function(a){return a.toLowerCase()}));
a=k.indexOf(g,a);if(-1==a)return!1;break;case "D":d[1]=0;case "d":d[2]=a;break;case "a":g=f.am||b["dayPeriods-format-wide-am"];c=f.pm||b["dayPeriods-format-wide-pm"];if(!f.strict)var j=/\./g,a=a.replace(j,"").toLowerCase(),g=g.replace(j,"").toLowerCase(),c=c.replace(j,"").toLowerCase();if(f.strict&&a!=g&&a!=c)return!1;l=a==c?"p":a==g?"a":"";break;case "K":24==a&&(a=0);case "h":case "H":case "k":if(23<a)return!1;d[3]=a;break;case "m":d[4]=a;break;case "s":d[5]=a;break;case "S":d[6]=a}return!0}),c=
+d[3];"p"===l&&12>c?d[3]=c+12:"a"===l&&12==c&&(d[3]=0);c=new Date(d[0],d[1],d[2],d[3],d[4],d[5],d[6]);f.strict&&c.setFullYear(d[0]);var m=i.join(""),j=-1!=m.indexOf("d"),m=-1!=m.indexOf("M");if(!e||m&&c.getMonth()>d[1]||j&&c.getDate()>d[2])return null;if(m&&c.getMonth()<d[1]||j&&c.getDate()<d[2])c=o.add(c,"hour",1);return c};var t=[];g.addCustomFormats=function(a,f){t.push({pkg:a,name:f})};g._getGregorianBundle=function(a){var f={};k.forEach(t,function(e){e=p.getLocalization(e.pkg,e.name,a);f=j.mixin(f,
e)},this);return f};g.addCustomFormats(s.id.replace(/\/date\/locale$/,".cldr"),"gregorian");g.getNames=function(a,f,e,c){var i,c=g._getGregorianBundle(c),a=[a,e,f];"standAlone"==e&&(e=a.join("-"),i=c[e],1==i[0]&&(i=void 0));a[1]="format";return(i||c[a.join("-")]).concat()};g.isWeekend=function(a,f){var e=r.getWeekend(f),c=(a||new Date).getDay();e.end<e.start&&(e.end+=7,c<e.start&&(c+=7));return c>=e.start&&c<=e.end};g._getDayOfYear=function(a){return o.difference(new Date(a.getFullYear(),0,1,a.getHours()),
a)+1};g._getWeekOfYear=function(a,f){1==arguments.length&&(f=0);var e=(new Date(a.getFullYear(),0,1)).getDay(),c=Math.floor((g._getDayOfYear(a)+(e-f+7)%7-1)/7);e==f&&c++;return c};return g});