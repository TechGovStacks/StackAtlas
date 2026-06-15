import{F as e,J as t,K as n,L as r,R as i,T as a,V as o,Y as s,ct as c,et as l,q as u,w as d,z as f}from"./index-6f38VXjG.js";import{a as p,r as m}from"./dev.utils-02Sl9bQo-D_GyU9pa.js";var h=()=>{let e=f().KoliBri;return e===void 0&&(e={},Object.defineProperty(f(),`KoliBri`,{value:e,writable:!1})),e};function g(e,t){try{Object.defineProperty(h(),e,{get:function(){return t}})}catch{a.debug(`KoliBri property ${e} is already bind.`)}}var _=(e,t)=>a.debug(`${e} ${t?``:`not `}activated`),v=()=>{if(m(),o()&&(p(),g(`a11yColorContrast`,n),g(`querySelector`,u),g(`querySelectorAll`,t),g(`querySelectorColors`,s),g(`utils`,function(){return d}),g(`parseJson`,l),g(`stringifyJson`,c),_(`Development mode`,o()),_(`Experimental mode`,i()),_(`Color contrast analysis`,e()),setTimeout(()=>{try{let e=r(),t=e?.body;if(e&&t&&typeof e.createElement==`function`){let n=e.createElement(`svg`);n.setAttribute(`aria-label`,`KoliBri-DevTools`),n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`role`,`toolbar`),n.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),n.innerHTML=`<svg
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
</svg>`,t.appendChild(n)}}catch(e){a.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}},100),e())){let e=setTimeout(()=>{clearTimeout(e);try{let e=r(),t=e?.body;e&&t&&typeof e.createElement==`function`&&setInterval(()=>{d.queryHtmlElementColors(e.createElement(`div`),n(t),!1,!1)},1e4)}catch(e){a.debug([`Could not initialize color contrast analysis:`,e])}},2500)}};export{v as initialize};