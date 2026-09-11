import{A as e,B as t,H as n,M as r,O as i,P as a,V as o,h as s,j as c,m as l,q as u,rt as d,z as f}from"./index-CJ6nR8sE-ClsZv9fX.js";import{a as p,r as m}from"./dev.utils-Bp48T7K--O94QvJYp.js";var h=()=>{let e=r().KoliBri;return e===void 0&&(e={},Object.defineProperty(r(),`KoliBri`,{value:e,writable:!1})),e};function g(e,t){try{Object.defineProperty(h(),e,{get:function(){return t}})}catch{s.debug(`KoliBri property ${e} is already bind.`)}}var _=(e,t)=>s.debug(`${e} ${t?``:`not `}activated`),v=()=>{if(m(),a()&&(p(),g(`a11yColorContrast`,f),g(`querySelector`,t),g(`querySelectorAll`,o),g(`querySelectorColors`,n),g(`utils`,function(){return l}),g(`parseJson`,u),g(`stringifyJson`,d),_(`Development mode`,a()),_(`Experimental mode`,c()),_(`Color contrast analysis`,i()),setTimeout(()=>{try{let t=e(),n=t?.body;if(t&&n&&typeof t.createElement==`function`){let e=t.createElement(`svg`);e.setAttribute(`aria-label`,`KoliBri-DevTools`),e.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),e.setAttribute(`role`,`toolbar`),e.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),e.innerHTML=`<svg
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
</svg>`,n.appendChild(e)}}catch(e){s.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}},100),i())){let t=setTimeout(()=>{clearTimeout(t);try{let t=e(),n=t?.body;t&&n&&typeof t.createElement==`function`&&setInterval(()=>{l.queryHtmlElementColors(t.createElement(`div`),f(n),!1,!1)},1e4)}catch(e){s.debug([`Could not initialize color contrast analysis:`,e])}},2500)}};export{v as initialize};