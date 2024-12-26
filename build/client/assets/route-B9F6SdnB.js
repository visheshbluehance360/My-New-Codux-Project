import{g as y,j as r,r as l}from"./jsx-runtime-56DGgGmo.js";const j="_root_1tyoc_1",N="_title_1tyoc_12",w="_paragraph_1tyoc_16",b="_content_1tyoc_24",h={root:j,title:N,paragraph:w,content:b},k="_root_19zd0_1",A="_even_19zd0_12",S="_QuoteText_19zd0_16",C="_QuoteAuthor_19zd0_21",u={root:k,even:A,QuoteText:S,QuoteAuthor:C};var f={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(n){(function(){var t={}.hasOwnProperty;function o(){for(var e="",s=0;s<arguments.length;s++){var c=arguments[s];c&&(e=i(e,a(c)))}return e}function a(e){if(typeof e=="string"||typeof e=="number")return e;if(typeof e!="object")return"";if(Array.isArray(e))return o.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var s="";for(var c in e)t.call(e,c)&&e[c]&&(s=i(s,c));return s}function i(e,s){return s?e?e+" "+s:e+s:e}n.exports?(o.default=o,n.exports=o):window.classNames=o})()})(f);var Q=f.exports;const p=y(Q),$=({className:n,quote:t})=>r.jsxs("div",{className:p(u.root,n,u.Quote,((t==null?void 0:t.id)||0)%2==0?u.even:""),children:[r.jsx("div",{className:u.QuoteText,children:(t==null?void 0:t.quote)&&t.quote}),r.jsx("div",{className:u.QuoteAuthor,children:(t==null?void 0:t.author)&&t.author})]}),E="_header1_m4cqp_1",I={header1:E},T="_root_kacy3_1",B="_pageNumberInput_kacy3_12",d={root:T,pageNumberInput:B};/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),x=(...n)=>n.filter((t,o,a)=>!!t&&t.trim()!==""&&a.indexOf(t)===o).join(" ").trim();/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var O={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=l.forwardRef(({color:n="currentColor",size:t=24,strokeWidth:o=2,absoluteStrokeWidth:a,className:i="",children:e,iconNode:s,...c},m)=>l.createElement("svg",{ref:m,...O,width:t,height:t,stroke:n,strokeWidth:a?Number(o)*24/Number(t):o,className:x("lucide",i),...c},[...s.map(([_,v])=>l.createElement(_,v)),...Array.isArray(e)?e:[e]]));/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=(n,t)=>{const o=l.forwardRef(({className:a,...i},e)=>l.createElement(R,{ref:e,iconNode:t,className:x(`lucide-${L(n)}`,a),...i}));return o.displayName=`${n}`,o};/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=g("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=g("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),W=({className:n,pageCount:t=1,currentPage:o=1,setCurrentPage:a})=>{function i(){o>1&&a(o-1)}function e(){o<t&&a(o+1)}return r.jsxs("div",{className:p(d.root,n),children:[r.jsx("div",{className:"left",children:r.jsx("button",{onClick:i,disabled:!(o>1),children:r.jsx(z,{className:p("prevButton h-4 w-4")})})}),r.jsx("div",{className:"center",children:r.jsxs("div",{className:"currentAndTotalPages",children:[r.jsx("input",{className:p(d.pageNumberInput),type:"number",max:t,value:o,onChange:s=>a(Number(s.target.value))})," ","/ ",t]})}),r.jsx("div",{className:"right",children:r.jsx("button",{onClick:e,disabled:!(o<t),children:r.jsx(P,{className:p("nextButton h-4 w-4")})})})]})};function U(){const[n,t]=l.useState([]),[o,a]=l.useState(1),[i,e]=l.useState(1),s=3;return l.useEffect(()=>{fetch(`https://dummyjson.com/quotes?limit=${s}&skip=${i*s-s}`).then(c=>c.json()).then(c=>{console.log(c),t(c.quotes);const m=Math.ceil(c.total/c.limit);a(m)})},[t,i]),r.jsxs("div",{className:h.root,children:[r.jsxs("header",{className:I.header1,children:[r.jsx("h2",{className:h.title,children:"Welcome to Homepage 🎉"}),r.jsx("span",{children:"The project will be using JSONPlaceholder API"})]}),r.jsxs("div",{className:h.content,children:[n.map((c,m)=>r.jsx($,{quote:c},m)),r.jsx(W,{pageCount:o,currentPage:i,setCurrentPage:e})]})]})}const D=({data:n})=>{const t="Blank Starter",o="Welcome to the Blank Starter",a="https://website-starter.com/og-image.png";return[{title:t},{name:"description",content:o},{tagName:"link",rel:"canonical",href:n==null?void 0:n.canonicalUrl},{property:"robots",content:"index, follow"},{property:"og:title",content:t},{property:"og:description",content:o},{property:"og:image",content:a},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:t},{name:"twitter:description",content:o},{name:"twitter:image",content:a}]},F=()=>[{rel:"icon",href:"/favicon.ico",type:"image/ico"}];export{U as default,F as links,D as meta};
