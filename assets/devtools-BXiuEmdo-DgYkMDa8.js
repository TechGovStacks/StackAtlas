import{$ as e,B as t,C as n,G as r,I as i,J as a,K as o,L as s,P as c,R as l,q as u,st as d,w as f}from"./index-DcIL16Fp.js";import{r as p,t as m}from"./dev.utils-B-ZwZYpj-Bkw9TZi5.js";var h=()=>{let e=l().KoliBri;return e===void 0&&(e={},Object.defineProperty(l(),`KoliBri`,{value:e,writable:!1})),e};function g(e,t){try{Object.defineProperty(h(),e,{get:function(){return t}})}catch{f.debug(`KoliBri property ${e} is already bind.`)}}var _=(e,t)=>f.debug(`${e} ${t?``:`not `}activated`),v=()=>{if(m(),t()&&(p(),g(`a11yColorContrast`,r),g(`querySelector`,o),g(`querySelectorAll`,u),g(`querySelectorColors`,a),g(`utils`,function(){return n}),g(`parseJson`,e),g(`stringifyJson`,d),_(`Development mode`,t()),_(`Experimental mode`,s()),_(`Color contrast analysis`,c()),setTimeout(()=>{try{let e=i(),t=e?.body;if(e&&t&&typeof e.createElement==`function`){let n=e.createElement(`svg`);n.setAttribute(`aria-label`,`KoliBri-DevTools`),n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`role`,`toolbar`),n.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),n.innerHTML=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="50"
  height="50"
  viewBox="0 0 600 600"
>
  <path d="M353 322L213 304V434L353 322Z" fill="#047" />
  <path d="M209 564V304L149 434L209 564Z" fill="#047" />
  <path d="M357 316L417 250L361 210L275 244L357 316Z" fill="#047" />
  <path d="M353 318L35 36L213 300L353 318Z" fill="#047" />
  <path d="M329 218L237 92L250 222L272 241L329 218Z" fill="#047" />
  <path d="M391 286L565 272L421 252L391 286Z" fill="#047" />
</svg>`,t.appendChild(n)}}catch(e){f.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}},100),c())){let e=setTimeout(()=>{clearTimeout(e);try{let e=i(),t=e?.body;e&&t&&typeof e.createElement==`function`&&setInterval(()=>{n.queryHtmlElementColors(e.createElement(`div`),r(t),!1,!1)},1e4)}catch(e){f.debug([`Could not initialize color contrast analysis:`,e])}},2500)}};export{v as initialize};