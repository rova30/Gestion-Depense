import{_ as J}from"./@babel-47f85c78.js";import{r as dn}from"./resolve-pathname-e210f2ac.js";import{v as ln}from"./value-equal-17d7769a.js";import{i as on}from"./tiny-invariant-dd7d57d2.js";function z(n){return n.charAt(0)==="/"?n:"/"+n}function Z(n){return n.charAt(0)==="/"?n.substr(1):n}function vn(n,e){return n.toLowerCase().indexOf(e.toLowerCase())===0&&"/?#".indexOf(n.charAt(e.length))!==-1}function sn(n,e){return vn(n,e)?n.substr(e.length):n}function cn(n){return n.charAt(n.length-1)==="/"?n.slice(0,-1):n}function gn(n){var e=n||"/",f="",c="",a=e.indexOf("#");a!==-1&&(c=e.substr(a),e=e.substr(0,a));var p=e.indexOf("?");return p!==-1&&(f=e.substr(p),e=e.substr(0,p)),{pathname:e,search:f==="?"?"":f,hash:c==="#"?"":c}}function M(n){var e=n.pathname,f=n.search,c=n.hash,a=e||"/";return f&&f!=="?"&&(a+=f.charAt(0)==="?"?f:"?"+f),c&&c!=="#"&&(a+=c.charAt(0)==="#"?c:"#"+c),a}function $(n,e,f,c){var a;typeof n=="string"?(a=gn(n),a.state=e):(a=J({},n),a.pathname===void 0&&(a.pathname=""),a.search?a.search.charAt(0)!=="?"&&(a.search="?"+a.search):a.search="",a.hash?a.hash.charAt(0)!=="#"&&(a.hash="#"+a.hash):a.hash="",e!==void 0&&a.state===void 0&&(a.state=e));try{a.pathname=decodeURI(a.pathname)}catch(p){throw p instanceof URIError?new URIError('Pathname "'+a.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):p}return f&&(a.key=f),c?a.pathname?a.pathname.charAt(0)!=="/"&&(a.pathname=dn(a.pathname,c.pathname)):a.pathname=c.pathname:a.pathname||(a.pathname="/"),a}function Tn(n,e){return n.pathname===e.pathname&&n.search===e.search&&n.hash===e.hash&&n.key===e.key&&ln(n.state,e.state)}function X(){var n=null;function e(m){return n=m,function(){n===m&&(n=null)}}function f(m,l,v,h){if(n!=null){var T=typeof n=="function"?n(m,l):n;typeof T=="string"?typeof v=="function"?v(T,h):h(!0):h(T!==!1)}else h(!0)}var c=[];function a(m){var l=!0;function v(){l&&m.apply(void 0,arguments)}return c.push(v),function(){l=!1,c=c.filter(function(h){return h!==v})}}function p(){for(var m=arguments.length,l=new Array(m),v=0;v<m;v++)l[v]=arguments[v];c.forEach(function(h){return h.apply(void 0,l)})}return{setPrompt:e,confirmTransitionTo:f,appendListener:a,notifyListeners:p}}var fn=!!(typeof window<"u"&&window.document&&window.document.createElement);function hn(n,e){e(window.confirm(n))}function pn(){var n=window.navigator.userAgent;return(n.indexOf("Android 2.")!==-1||n.indexOf("Android 4.0")!==-1)&&n.indexOf("Mobile Safari")!==-1&&n.indexOf("Chrome")===-1&&n.indexOf("Windows Phone")===-1?!1:window.history&&"pushState"in window.history}function mn(){return window.navigator.userAgent.indexOf("Trident")===-1}function wn(){return window.navigator.userAgent.indexOf("Firefox")===-1}function yn(n){return n.state===void 0&&navigator.userAgent.indexOf("CriOS")===-1}var nn="popstate",en="hashchange";function tn(){try{return window.history.state||{}}catch{return{}}}function En(n){n===void 0&&(n={}),fn||on(!1);var e=window.history,f=pn(),c=!mn(),a=n,p=a.forceRefresh,m=p===void 0?!1:p,l=a.getUserConfirmation,v=l===void 0?hn:l,h=a.keyLength,T=h===void 0?6:h,I=n.basename?cn(z(n.basename)):"";function x(i){var t=i||{},o=t.key,r=t.state,d=window.location,w=d.pathname,H=d.search,U=d.hash,A=w+H+U;return I&&(A=sn(A,I)),$(A,r,o)}function E(){return Math.random().toString(36).substr(2,T)}var k=X();function S(i){J(b,i),b.length=e.length,k.notifyListeners(b.location,b.action)}function G(i){yn(i)||K(x(i.state))}function _(){K(x(tn()))}var R=!1;function K(i){if(R)R=!1,S();else{var t="POP";k.confirmTransitionTo(i,t,v,function(o){o?S({action:t,location:i}):N(i)})}}function N(i){var t=b.location,o=C.indexOf(t.key);o===-1&&(o=0);var r=C.indexOf(i.key);r===-1&&(r=0);var d=o-r;d&&(R=!0,y(d))}var F=x(tn()),C=[F.key];function s(i){return I+M(i)}function u(i,t){var o="PUSH",r=$(i,t,E(),b.location);k.confirmTransitionTo(r,o,v,function(d){if(d){var w=s(r),H=r.key,U=r.state;if(f)if(e.pushState({key:H,state:U},null,w),m)window.location.href=w;else{var A=C.indexOf(b.location.key),q=C.slice(0,A+1);q.push(r.key),C=q,S({action:o,location:r})}else window.location.href=w}})}function L(i,t){var o="REPLACE",r=$(i,t,E(),b.location);k.confirmTransitionTo(r,o,v,function(d){if(d){var w=s(r),H=r.key,U=r.state;if(f)if(e.replaceState({key:H,state:U},null,w),m)window.location.replace(w);else{var A=C.indexOf(b.location.key);A!==-1&&(C[A]=r.key),S({action:o,location:r})}else window.location.replace(w)}})}function y(i){e.go(i)}function g(){y(-1)}function B(){y(1)}var D=0;function O(i){D+=i,D===1&&i===1?(window.addEventListener(nn,G),c&&window.addEventListener(en,_)):D===0&&(window.removeEventListener(nn,G),c&&window.removeEventListener(en,_))}var P=!1;function W(i){i===void 0&&(i=!1);var t=k.setPrompt(i);return P||(O(1),P=!0),function(){return P&&(P=!1,O(-1)),t()}}function Q(i){var t=k.appendListener(i);return O(1),function(){O(-1),t()}}var b={length:e.length,action:"POP",location:F,createHref:s,push:u,replace:L,go:y,goBack:g,goForward:B,block:W,listen:Q};return b}var an="hashchange",Pn={hashbang:{encodePath:function(e){return e.charAt(0)==="!"?e:"!/"+Z(e)},decodePath:function(e){return e.charAt(0)==="!"?e.substr(1):e}},noslash:{encodePath:Z,decodePath:z},slash:{encodePath:z,decodePath:z}};function un(n){var e=n.indexOf("#");return e===-1?n:n.slice(0,e)}function j(){var n=window.location.href,e=n.indexOf("#");return e===-1?"":n.substring(e+1)}function xn(n){window.location.hash=n}function V(n){window.location.replace(un(window.location.href)+"#"+n)}function Cn(n){n===void 0&&(n={}),fn||on(!1);var e=window.history;wn();var f=n,c=f.getUserConfirmation,a=c===void 0?hn:c,p=f.hashType,m=p===void 0?"slash":p,l=n.basename?cn(z(n.basename)):"",v=Pn[m],h=v.encodePath,T=v.decodePath;function I(){var t=T(j());return l&&(t=sn(t,l)),$(t)}var x=X();function E(t){J(i,t),i.length=e.length,x.notifyListeners(i.location,i.action)}var k=!1,S=null;function G(t,o){return t.pathname===o.pathname&&t.search===o.search&&t.hash===o.hash}function _(){var t=j(),o=h(t);if(t!==o)V(o);else{var r=I(),d=i.location;if(!k&&G(d,r)||S===M(r))return;S=null,R(r)}}function R(t){if(k)k=!1,E();else{var o="POP";x.confirmTransitionTo(t,o,a,function(r){r?E({action:o,location:t}):K(t)})}}function K(t){var o=i.location,r=s.lastIndexOf(M(o));r===-1&&(r=0);var d=s.lastIndexOf(M(t));d===-1&&(d=0);var w=r-d;w&&(k=!0,g(w))}var N=j(),F=h(N);N!==F&&V(F);var C=I(),s=[M(C)];function u(t){var o=document.querySelector("base"),r="";return o&&o.getAttribute("href")&&(r=un(window.location.href)),r+"#"+h(l+M(t))}function L(t,o){var r="PUSH",d=$(t,void 0,void 0,i.location);x.confirmTransitionTo(d,r,a,function(w){if(w){var H=M(d),U=h(l+H),A=j()!==U;if(A){S=H,xn(U);var q=s.lastIndexOf(M(i.location)),Y=s.slice(0,q+1);Y.push(H),s=Y,E({action:r,location:d})}else E()}})}function y(t,o){var r="REPLACE",d=$(t,void 0,void 0,i.location);x.confirmTransitionTo(d,r,a,function(w){if(w){var H=M(d),U=h(l+H),A=j()!==U;A&&(S=H,V(U));var q=s.indexOf(M(i.location));q!==-1&&(s[q]=H),E({action:r,location:d})}})}function g(t){e.go(t)}function B(){g(-1)}function D(){g(1)}var O=0;function P(t){O+=t,O===1&&t===1?window.addEventListener(an,_):O===0&&window.removeEventListener(an,_)}var W=!1;function Q(t){t===void 0&&(t=!1);var o=x.setPrompt(t);return W||(P(1),W=!0),function(){return W&&(W=!1,P(-1)),o()}}function b(t){var o=x.appendListener(t);return P(1),function(){P(-1),o()}}var i={length:e.length,action:"POP",location:C,createHref:u,push:L,replace:y,go:g,goBack:B,goForward:D,block:Q,listen:b};return i}function rn(n,e,f){return Math.min(Math.max(n,e),f)}function bn(n){n===void 0&&(n={});var e=n,f=e.getUserConfirmation,c=e.initialEntries,a=c===void 0?["/"]:c,p=e.initialIndex,m=p===void 0?0:p,l=e.keyLength,v=l===void 0?6:l,h=X();function T(u){J(s,u),s.length=s.entries.length,h.notifyListeners(s.location,s.action)}function I(){return Math.random().toString(36).substr(2,v)}var x=rn(m,0,a.length-1),E=a.map(function(u){return typeof u=="string"?$(u,void 0,I()):$(u,void 0,u.key||I())}),k=M;function S(u,L){var y="PUSH",g=$(u,L,I(),s.location);h.confirmTransitionTo(g,y,f,function(B){if(B){var D=s.index,O=D+1,P=s.entries.slice(0);P.length>O?P.splice(O,P.length-O,g):P.push(g),T({action:y,location:g,index:O,entries:P})}})}function G(u,L){var y="REPLACE",g=$(u,L,I(),s.location);h.confirmTransitionTo(g,y,f,function(B){B&&(s.entries[s.index]=g,T({action:y,location:g}))})}function _(u){var L=rn(s.index+u,0,s.entries.length-1),y="POP",g=s.entries[L];h.confirmTransitionTo(g,y,f,function(B){B?T({action:y,location:g,index:L}):T()})}function R(){_(-1)}function K(){_(1)}function N(u){var L=s.index+u;return L>=0&&L<s.entries.length}function F(u){return u===void 0&&(u=!1),h.setPrompt(u)}function C(u){return h.appendListener(u)}var s={length:E.length,action:"POP",location:E[x],index:x,entries:E,createHref:k,push:S,replace:G,go:_,goBack:R,goForward:K,canGo:N,block:F,listen:C};return s}export{Cn as a,bn as b,En as c,$ as d,M as e,Tn as l};
