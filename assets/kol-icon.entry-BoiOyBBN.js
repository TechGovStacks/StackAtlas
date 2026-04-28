import{c as e,d as t,f as n}from"./index-BZhc64ye.js";import"./isArray-CcrBs4JM-BA9_Jb9Z.js";import"./_Uint8Array-kJHDjtoP-BG0C2avY.js";import{n as r,o as i}from"./normalizers-DnkJhVYZ-Bv8ypd_b.js";import{t as a}from"./variant-quote-CHD0qMkY-Csz5bpnK.js";import"./tslib.es6-CxX45GIN-D5sRa3n3.js";import"./clsx-COFh-Vc8-BHwl83Bk.js";import{t as o}from"./component-_Y75jltB-BoaWDV3v.js";import{t as s}from"./label-BEOW9ltS-C2VrayiQ.js";import{t as c}from"./base-controller-CXhqh4cR-ht1hwgla.js";var l=r(`icons`,`kolicon-logo`,i),u={required:[l,s]},d=class extends c{constructor(e){super(e,u)}componentWillLoad(e){let{icons:t,label:n}=e;this.watchIcons(t),this.watchLabel(n)}watchIcons(e){l.apply(e,e=>{this.setRenderProp(`icons`,e)})}watchLabel(e){s.apply(e,e=>{this.setRenderProp(`label`,e)})}},f=`@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1776785727439"); /* IE9*/
  src: url("kolicons.eot?t=1776785727439#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1776785727439") format("woff2"), url("kolicons.woff?t=1776785727439") format("woff"), url("kolicons.ttf?t=1776785727439") format("truetype"), url("kolicons.svg?t=1776785727439#kolicons") format("svg"); /* iOS 4.1- */
}
@layer kol-component {
  [class^=kolicon-], [class*=" kolicon-"] {
    font-family: "kolicons";
    font-style: normal;
    font-weight: 400;
    line-height: 1em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .kolicon-alert-error::before {
    content: "\\ea01";
  }
  .kolicon-alert-info::before {
    content: "\\ea02";
  }
  .kolicon-alert-success::before {
    content: "\\ea03";
  }
  .kolicon-alert-warning::before {
    content: "\\ea04";
  }
  .kolicon-check::before {
    content: "\\ea05";
  }
  .kolicon-chevron-double-left::before {
    content: "\\ea06";
  }
  .kolicon-chevron-double-right::before {
    content: "\\ea07";
  }
  .kolicon-chevron-down::before {
    content: "\\ea08";
  }
  .kolicon-chevron-left::before {
    content: "\\ea09";
  }
  .kolicon-chevron-right::before {
    content: "\\ea0a";
  }
  .kolicon-chevron-up::before {
    content: "\\ea0b";
  }
  .kolicon-cogwheel::before {
    content: "\\ea0c";
  }
  .kolicon-cross::before {
    content: "\\ea0d";
  }
  .kolicon-eye-closed::before {
    content: "\\ea0e";
  }
  .kolicon-eye::before {
    content: "\\ea0f";
  }
  .kolicon-house::before {
    content: "\\ea10";
  }
  .kolicon-kolibri::before {
    content: "\\ea11";
  }
  .kolicon-link-external::before {
    content: "\\ea12";
  }
  .kolicon-link::before {
    content: "\\ea13";
  }
  .kolicon-minus::before {
    content: "\\ea14";
  }
  .kolicon-plus::before {
    content: "\\ea15";
  }
  .kolicon-settings::before {
    content: "\\ea16";
  }
  .kolicon-sort-asc::before {
    content: "\\ea17";
  }
  .kolicon-sort-desc::before {
    content: "\\ea18";
  }
  .kolicon-sort-neutral::before {
    content: "\\ea19";
  }
  .kolicon-up::before {
    content: "\\ea1a";
  }
  .kolicon-version::before {
    content: "\\ea1b";
  }
}
@layer kol-component {
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
}`,p=class{constructor(e){n(this,e),this.ctrl=new d(a.stateLess)}watchIcons(e){this.ctrl.watchIcons(e)}watchLabel(e){this.ctrl.watchLabel(e)}componentWillLoad(){this.ctrl.componentWillLoad({icons:this._icons,label:this._label})}render(){return t(e,{key:`0127f2d35f4164f440a30fec825e10158fc833a5`},t(o,{key:`6fa23897706337c29bc4ef2551904436b2a65785`,icons:this.ctrl.getRenderProp(`icons`),label:this.ctrl.getRenderProp(`label`)}))}static get watchers(){return{_icons:[`watchIcons`],_label:[`watchLabel`]}}};p.style={default:f};export{p as kol_icon};