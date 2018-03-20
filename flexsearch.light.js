/*
 FlexSearch v0.2.3
 Copyright 2017-2018 Thomas Wilkerling
 Released under the Apache 2.0 Licence
 https://github.com/nextapps-de/flexsearch
*/
'use strict';(function(h,t,l){var q;(q=l.define)&&q.amd?q([],function(){return t}):(q=l.modules)?q[h.toLowerCase()]=t:"undefined"!==typeof module?module.exports=t:l[h]=t})("FlexSearch",function(){function h(a){a||(a=y);this.id=a.id||C++;this.init(a);t(this,"index",function(){return this.a});t(this,"length",function(){return Object.keys(this.a).length})}function t(a,b,c){Object.defineProperty(a,b,{get:c})}function l(a){return new RegExp(a,"g")}function q(a,b,c){if("undefined"===typeof c){for(c=0;c<
b.length;c+=2)a=a.replace(b[c],b[c+1]);return a}return a.replace(b,c)}function w(a,b,c,g,d,e){if("undefined"===typeof b[c]){var f=d.indexOf(c);f=3/d.length*(d.length-f)+6/(f-d.lastIndexOf(" ",f))+.5|0;b[c]=f;f>e&&(a=a[f],a=a[c]||(a[c]=[]),a[a.length]=g)}return f||b[c]}function A(a){var b=[];if(!a)return b;for(var c=0,g=0,d=0,e="",f=a.length,p=0;p<f;p++){var m=a[p];"a"===m||"e"===m||"i"===m||"o"===m||"u"===m||"y"===m?c++:g++;" "!==m&&(e+=m);if(" "===m||1<c&&1<g||2<c||2<g||p===f-1)e&&(b[d]&&2<e.length&&
d++,b[d]=b[d]?b[d]+e:e," "===m&&d++,e=""),g=c=0}return b}function D(a,b){a=a.length-b.length;return 0>a?1:0<a?-1:0}function E(a,b){a=a.length-b.length;return 0>a?-1:0<a?1:0}function F(a,b){var c=[],g=a.length;if(1<g){a.sort(E);for(var d={},e=a[0],f=e.length,p=0;p<f;)d[e[p++]]=1;for(var m,h=0,n=1;n<g;){var r=!1;e=a[n];f=e.length;for(p=0;p<f;)if(d[m=e[p++]]===n){if(n===g-1&&(c[h++]=m,b&&h===b)){r=!1;break}r=!0;d[m]=n+1}if(!r)break;n++}}else g&&(c=a[0],b&&c&&c.length>b&&(c=c.slice(0,b)));return c}var y=
{type:"integer",mode:"forward",cache:!1,async:!1,l:!1,threshold:0,depth:0,encode:"icase"},x=[],C=0,B=l("[ -/]");h.new=function(a){return new this(a)};h.create=function(a){return h.new(a)};h.addMatcher=function(a){for(var b in a)a.hasOwnProperty(b)&&(x[x.length]=l(b),x[x.length]=a[b]);return this};h.register=function(a,b){v[a]=b;return this};h.encode=function(a,b){return v[a].call(v,b)};h.prototype.init=function(a){this.c=[];if(a&&(this.mode=a.mode||this.mode||y.mode,this.threshold=a.threshold||this.threshold||
y.threshold,this.depth=a.depth||this.depth||y.depth,this.h=a.encode&&v[a.encode]||("function"===typeof a.encode?a.encode:this.h||!1),a.matcher&&this.addMatcher(a.matcher),a.filter&&(this.i={}),a.stemmer)){a=!0===a.stemmer?null:a.stemmer;var b=this.h,c=[];if(a){var g=0,d;for(d in a)if(a.hasOwnProperty(d)){var e=b?b.call(v,d):d;c[g++]=l("(?=.{"+(e.length+3)+",})"+e+"$");c[g++]=b?b.call(v,a[d]):a[d]}}this.j=c}this.b=[{},{},{},{},{},{},{},{},{},{},{}];this.a={};this.f="";this.g=!0;return this};h.prototype.encode=
function(a){a&&x.length&&(a=q(a,x));a&&this.c.length&&(a=q(a,this.c));a&&this.h&&(a=this.h.call(v,a));if(a&&this.i){a=a.split(" ");for(var b=0;b<a.length;b++){var c=a[b];this.i[c]&&(a[b]=this.i[c])}a=a.join(" ")}a&&this.j&&(a=q(a,this.j));return a};h.prototype.addMatcher=function(a){for(var b in a)a.hasOwnProperty(b)&&(this.c[this.c.length]=l(b),this.c[this.c.length]=a[b]);return this};h.prototype.add=function(a,b){if("string"===typeof b&&b&&(a||0===a))if(this.a[a])this.update(a,b);else{b=this.encode(b);
if(!b.length)return this;for(var c=this.mode,g="function"===typeof c?c(b):"ngram"===c?A(b):b.split(B),d={_ctx:{}},e=this.threshold,f=this.depth,p=this.b,m=g.length,h=0;h<m;h++){var n=g[h];if(n){var r=n.length;switch(c){case "reverse":case "both":for(var u="",k=r-1;1<=k;k--)u=n[k]+u,w(p,d,u,a,b,e);case "forward":u="";for(k=0;k<r;k++)u+=n[k],w(p,d,u,a,b,e);break;case "full":for(k=0;k<r;k++)for(var l=r;l>k;l--)u=n.substring(k,l),w(p,d,u,a,b,e);break;default:if(k=w(p,d,n,a,b,e),f&&1<m&&k>e)for(k=p[10],
r=d._ctx[n]||(d._ctx[n]={}),n=k[n]||(k[n]=[{},{},{},{},{},{},{},{},{},{}]),k=h-f,l=h+f,0>k&&(k=0),l>m-1&&(l=m-1);k<=l;k++)k!==h&&w(n,r,g[k],a,b,e)}}}this.a[a]="1";this.g=!1}return this};h.prototype.update=function(a,b){"string"===typeof b&&(a||0===a)&&this.a[a]&&(this.remove(a),b&&this.add(a,b));return this};h.prototype.remove=function(a){if(this.a[a]){for(var b=0;10>b;b++)for(var c=Object.keys(this.b[b]),g=0;g<c.length;g++){var d=c[g],e=this.b[b];if((e=e&&e[d])&&e.length)for(var f=0;f<e.length;f++)if(e[f]===
a){e.splice(f,1);break}e.length||delete this.b[b][d]}delete this.a[a];this.g=!1}return this};h.prototype.search=function(a,b,c){var g=[];if(a&&"object"===typeof a){c=a.callback||b;b=a.limit;var d=a.threshold;a=a.query}d||(d=0);"function"===typeof b?(c=b,b=1E3):b||(b=1E3);if(c){var e=this;G(function(){c(e.search(a,b));e=null},1,"search-"+this.id);return null}if(!a||"string"!==typeof a)return g;if(!this.g)this.g=!0;else if(this.f&&0===a.indexOf(this.f))return g;var f=this.encode(a);if(!f.length)return g;
var h=this.mode;f="function"===typeof h?h(f):"ngram"===h?A(f):f.split(B);h=f.length;var m=!0,l=[],n={};if(1<h)if(this.depth){var r=!0,u=f[0];n[u]="1"}else f.sort(D);var k;if(!r||(k=this.b[10])[u])for(var q=r?1:0;q<h;q++){var t=f[q];if(t&&!n[t]){for(var v,x=!1,w=[],y=0,z=9;z>=d;z--)if(v=(r?k[u]:this.b)[z][t])w[y++]=v,x=!0;if(x)l[l.length]=1<y?l.concat.apply([],w):w[0];else{m=!1;break}n[t]="1"}u=t}else m=!1;m&&(g=F(l,b));g.length?this.f="":this.f||(this.f=a);return g};h.prototype.reset=function(){this.destroy();
return this.init()};h.prototype.destroy=function(){this.b=this.a=null;return this};var v={icase:function(a){return a.toLowerCase()},balanced:function(){var a=[l("[-/]")," ",l("[^a-z0-9 ]"),"",l("\\s\\s+")," ",l("[aeiouy]"),""];return function(b){b=q(b.toLowerCase(),a);for(var c="",g="",d="",e=0;e<b.length;e++){var f=b[e];if(f!==g)if(e&&"h"===f){if(d="a"===d||"e"===d||"i"===d||"o"===d||"u"===d||"y"===d,("a"===g||"e"===g||"i"===g||"o"===g||"u"===g||"y"===g)&&d||" "===g)c+=f}else c+=f;d=e===b.length-
1?"":b[e+1];g=f}return c}}()},G=null;return h}(!1),this);