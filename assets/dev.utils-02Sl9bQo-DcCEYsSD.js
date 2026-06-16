import{G as e,L as t,T as n,it as r,ot as i,s as a,z as o}from"./index-DsTAS621.js";var s=()=>{try{let e=t();if(!e||typeof e.querySelector!=`function`)return;let n=e.querySelector(`meta[name="kolibri"]`);if(n&&n.hasAttribute(`content`)){let e=n.getAttribute(`content`);typeof e==`string`&&(i(e.includes(`experimental-mode=true`)),r(e.includes(`color-contrast-analysis=true`)))}}catch{}},c=()=>{let e=o().KoliBri;return e===void 0&&(e={},Object.defineProperty(o(),`KoliBri`,{value:e,writable:!1})),e},l=()=>{s(),n.debug(`
,--. ,--.         ,--. ,--. ,-----.           ,--.
|  .'   /  ,---.  |  | \`--' |  |) /_  ,--.--. \`--'
|  .   '  | .-. | |  | ,--. |  .-.  \\ |  .--' ,--.
|  |\\   \\ | '-' | |  | |  | |  '--' / |  |    |  |
\`--' \`--´  \`---´  \`--' \`--' \`------´  \`--'    \`--'
🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io | ${a.kolibriVersion}
	`,{forceLog:!0})},u=()=>{c().adviceShown!==!0&&(Object.defineProperty(c(),`adviceShown`,{get:function(){return!0}}),n.debug(`
You are using the KoliBri component library. If you have any suggestions for improvement or find a problem, please contact us:

Ticket: https://github.com/public-ui/kolibri/issues/new/choose (for privacy reasons, please use email)
Email: kolibri@itzbund.de
`))},d=()=>Math.floor(Math.random()*16777215).toString(16);e()&&(d=()=>`nonce`);var f=e=>`${e}-${d()}`,p=(e,t)=>{let n=e.lastIndexOf(`-`);if(n===-1)return`${e}-${t}`;let r=e.slice(n+1);return r===`nonce`||/^[0-9a-f]+$/.test(r)?`${e.slice(0,n)}-${t}-${r}`:`${e}-${t}`};export{u as a,d as i,f as n,l as r,p as t};