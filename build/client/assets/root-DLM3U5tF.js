import{r as l,j as e}from"./jsx-runtime-56DGgGmo.js";import{E as x}from"./error-component-CXTy4cJr.js";import{l as y,n as f,o as h,p as g,_ as S,O as j,M as w,L as k,S as E,q as M,t as R}from"./components-B1ga6eyM.js";/**
 * @remix-run/react v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let u="positions";function L({getKey:t,...s}){let{isSpaMode:o}=y(),r=f(),c=h();g({getKey:t,storageKey:u});let d=l.useMemo(()=>{if(!t)return null;let n=t(r,c);return n!==r.key?n:null},[]);if(o)return null;let m=((n,p)=>{if(!window.history.state||!window.history.state.key){let i=Math.random().toString(32).slice(2);window.history.replaceState({key:i},"")}try{let a=JSON.parse(sessionStorage.getItem(n)||"{}")[p||window.history.state.key];typeof a=="number"&&window.scrollTo(0,a)}catch(i){console.error(i),sessionStorage.removeItem(n)}}).toString();return l.createElement("script",S({},s,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${m})(${JSON.stringify(u)}, ${JSON.stringify(d)})`}}))}function _({children:t}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(w,{}),e.jsx(k,{})]}),e.jsxs("body",{children:[t,e.jsx(L,{}),e.jsx(E,{})]})]})}function I(){return e.jsx("div",{id:"root",children:e.jsx(j,{})})}function J(){const t=M(),{title:s,message:o}=v(t);return e.jsx(x,{title:s,message:o})}function v(t){var r;let s,o;return R(t)?t.status===404?(s="Page Not Found",o="Looks like the page you're trying to visit doesn't exist"):(s=`${t.status} - ${t.statusText}`,o=((r=t.data)==null?void 0:r.message)??""):s="Unknown error occurred",{title:s,message:o}}export{J as ErrorBoundary,_ as Layout,I as default};
