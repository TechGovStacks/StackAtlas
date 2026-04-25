import{C as e,F as t,G as n,I as r,K as i,L as a,N as o,Q as s,S as c,W as l,ot as u,q as d,z as f}from"./index-D3aspFzq.js";import{r as p,t as m}from"./dev.utils-BKmnA1fy-BBlBWh4o.js";var h=()=>{let e=a().KoliBri;return e===void 0&&(e={},Object.defineProperty(a(),`KoliBri`,{value:e,writable:!1})),e};function g(t,n){try{Object.defineProperty(h(),t,{get:function(){return n}})}catch{e.debug(`KoliBri property ${t} is already bind.`)}}var _=(t,n)=>e.debug(`${t} ${n?``:`not `}activated`),v=()=>{if(m(),f()&&(p(),g(`a11yColorContrast`,l),g(`querySelector`,n),g(`querySelectorAll`,i),g(`querySelectorColors`,d),g(`utils`,function(){return c}),g(`parseJson`,s),g(`stringifyJson`,u),_(`Development mode`,f()),_(`Experimental mode`,r()),_(`Color contrast analysis`,o()),setTimeout(()=>{try{let e=t(),n=e?.body;if(e&&n&&typeof e.createElement==`function`){let t=e.createElement(`svg`);t.setAttribute(`aria-label`,`KoliBri-DevTools`),t.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),t.setAttribute(`role`,`toolbar`),t.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),t.innerHTML=`<svg
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
</svg>`,n.appendChild(t)}}catch(t){e.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,t])}},100),o())){let n=setTimeout(()=>{clearTimeout(n);try{let e=t(),n=e?.body;e&&n&&typeof e.createElement==`function`&&setInterval(()=>{c.queryHtmlElementColors(e.createElement(`div`),l(n),!1,!1)},1e4)}catch(t){e.debug([`Could not initialize color contrast analysis:`,t])}},2500)}};export{v as initialize};