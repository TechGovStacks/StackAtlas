import{c as e,r as t,s as n}from"./index-G8af0_gG-Cp91DW8x.js";import"./i18n-B2d_exHc-BdpFVwr5.js";import"./isArray-CcrBs4JM-CPN1m87f.js";import"./_Uint8Array-kJHDjtoP-B1Fjb4uD.js";import{a as r,n as i,o as a}from"./normalizers-DnkJhVYZ-VdW8FsZe.js";import{t as o}from"./variant-quote-CHD0qMkY-C3QVkwYn.js";import{t as s}from"./label-BEOW9ltS-DFJ7N0sT.js";import{t as c}from"./base-controller-CXhqh4cR-SGkpdf24.js";import{t as l}from"./i18n-BVaUp6qp-xVEGggqH.js";import{n as u,t as d}from"./unit-eRQuaHYy-BNRnMkXY.js";var f=i(`high`,0,r),p=i(`low`,0,r),m=i(`min`,0,r),h=i(`optimum`,0,r),g=[`horizontal`,`vertical`],_=i(`orientation`,`horizontal`,e=>{let t=a(e);if(g.includes(t))return t;throw Error(`Invalid orientation: ${t}`)}),v=i(`value`,0,r,e=>e>=0);function y(e,t,n,r,i,a){let o=r??t,s=i??n;if(a===void 0)return e>=o&&e<=s?`optimum`:`suboptimal`;let c=e<o,l=e>s,u=!c&&!l;return a<o?c?`optimum`:u?`suboptimal`:`critical`:a>s?l?`optimum`:u?`suboptimal`:`critical`:u?`optimum`:`suboptimal`}var b=e=>{let{high:t,label:r,low:i,liveValue:a,max:o,min:s,optimum:c,orientation:u,unit:d,value:f}=e,p=u===`vertical`,m=d===`%`,h=m?Math.round((f-s)/(o-s)*100):f,g=m?`${Math.round((a-s)/(o-s)*100)}`:a,_=`${`${(m?100:o)+1}`.length}ch`,v=Math.min(100,Math.max(0,(f-s)/(o-s)*100)),b=y(f,s,o,i,t,c),x=i!==void 0||t!==void 0,S=x?l(`kol-meter-state-${b}`):``,C=m?l(`kol-live-value`,{placeholders:{value:String(g),unit:d}}):l(`kol-live-value-bounded`,{placeholders:{value:String(g),max:String(o),unit:d}}),w=x?`${C} – ${S}`:C,T={"kol-meter__bar-fill":!0,"kol-meter__bar-fill--optimum":b===`optimum`,"kol-meter__bar-fill--suboptimal":b===`suboptimal`,"kol-meter__bar-fill--critical":b===`critical`};return n(`div`,{class:{"kol-meter":!0,"kol-meter--vertical":p}},n(`div`,{"aria-hidden":`true`,class:`kol-meter__bar`},n(`div`,{class:`kol-meter__bar-label`},r,x&&n(`span`,{class:`kol-meter__bar-state kol-meter__bar-state--${b}`},` – `,S)),p?n(`div`,{class:`kol-meter__bar-track`},n(`div`,{class:T,style:{height:`calc((100% - 6px) * ${v/100})`}})):n(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`100%`,height:`12`,overflow:`visible`},n(`rect`,{class:`kol-meter__bar-background`,x:`1`,y:`1`,height:`11`,rx:`5`,fill:`currentColor`,stroke:`currentColor`,"stroke-width":`3`,width:`100%`}),n(`rect`,{class:`kol-meter__bar-border`,x:`1`,y:`1`,height:`11`,rx:`5`,fill:`currentColor`,stroke:`currentColor`,"stroke-width":`1`,width:`100%`}),n(`rect`,{class:T,x:`3`,y:`3`,height:`7`,rx:`3.5`,fill:`currentColor`,stroke:`currentColor`,"stroke-width":`3`,style:{width:`calc(${v}% - 4px)`}})),n(`span`,{class:`kol-meter__value-unit`},n(`span`,{class:`kol-meter__value`,style:p?{}:{width:_}},h),`\xA0`,n(`span`,{class:`kol-meter__unit`},d))),n(`meter`,{"aria-label":r,class:`visually-hidden`,high:t,low:i,max:o,min:s,optimum:c,value:f}),n(`span`,{"aria-live":`polite`,"aria-relevant":`additions text`,class:`visually-hidden`},w))},x={optional:[m,_,u],required:[s,d,v]},S=class extends c{constructor(e){super(e,x),this.meterData={high:void 0,low:void 0,optimum:void 0}}componentWillLoad(e){let{high:t,label:n,low:r,max:i,min:a,optimum:o,orientation:s,unit:c,value:l}=e;this.watchHigh(t),this.watchLabel(n),this.watchLow(r),this.watchMax(i),this.watchMin(a),this.watchOptimum(o),this.watchOrientation(s),this.watchUnit(c),this.watchValue(l),this.setState(`liveValue`,this.getRenderProp(`value`)),this.startLiveValueInterval()}destroy(){this.interval&&=(clearInterval(this.interval),void 0)}getMeterData(){return this.meterData}watchHigh(e){e===void 0?this.meterData.high=void 0:f.apply(e,e=>{this.meterData.high=e})}watchLabel(e){s.apply(e,e=>{this.setRenderProp(`label`,e)})}watchLow(e){e===void 0?this.meterData.low=void 0:p.apply(e,e=>{this.meterData.low=e})}watchMax(e){d.apply(e,e=>{this.setRenderProp(`max`,e)})}watchMin(e){m.apply(e,e=>{this.setRenderProp(`min`,e)})}watchOptimum(e){e===void 0?this.meterData.optimum=void 0:h.apply(e,e=>{this.meterData.optimum=e})}watchOrientation(e){_.apply(e,e=>{this.setRenderProp(`orientation`,e)})}watchUnit(e){u.apply(e,e=>{this.setRenderProp(`unit`,e)})}watchValue(e){v.apply(e,e=>{this.setRenderProp(`value`,e)})}startLiveValueInterval(){this.interval=setInterval(()=>{let e=this.getRenderProp(`value`);this.getState(`liveValue`)!==e&&this.setState(`liveValue`,e)},5e3)}},C=`/* forward the rem function */
/*
* This file defines the layer order for all CSS layers used in KoliBri.
* The order is important as it determines the cascade priority.
*
* Layer order (lowest to highest priority):
* 1. kol-a11y - Accessibility defaults and requirements
* 2. kol-global - Global component styles and resets
* 3. kol-component - Component-specific styles
* 4. kol-theme-global - Theme-specific global styles
* 5. kol-theme-component - Theme-specific component styles
*/
@layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component;
/*
 * This file contains all rules for accessibility.
 */
@layer kol-a11y {
  :host {
    /*
                   * Minimum size of interactive elements.
                   */
    --a11y-min-size: calc(44 * 1rem / var(--kolibri-root-font-size, 16));
    /*
     * No element should be used without verifying the contrast ratio of its background and font colors.
     * By initially setting the background color to white and the font color to black,
     * the contrast ratio is ensured and explicit adjustment is forced.
     */
    color: black;
    background-color: white;
    /*
     * Verdana is an accessible font that can be used without requiring additional loading time.
     */
    font-family: Verdana;
    /*
     * Letter spacing is required for all texts.
     */
    letter-spacing: inherit;
    /*
     * Word spacing is required for all texts.
     */
    word-spacing: inherit;
    /*
     * Text should be aligned left by default to provide a predictable starting point.
     */
    text-align: left;
  }
  * {
    /*
     * This rule enables the word dividing for all texts. That is important for high zoom levels.
     */
    hyphens: auto;
    /*
     * This rule enables the word dividing for all texts. That is important for high zoom levels.
     */
    word-break: break-word;
  }
  /*
   * All interactive elements should have a minimum size of to-rem(44).
   */
  /* input:not([type='checkbox'], [type='radio'], [type='range']), */
  /* option, */
  /* select, */
  /* textarea, */
  button,
  .kol-input .input {
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
  }
  /*
   * Some interactive elements should not inherit the font-family and font-size.
   */
  a,
  button,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  input,
  option,
  select,
  textarea {
    /*
     * All elements should inherit the text color from his parent element.
     */
    color: inherit;
    /*
     * All elements should inherit the font family from his parent element.
     */
    font-family: inherit;
    /*
     * All elements should inherit the font size from his parent element.
     */
    font-size: inherit;
    /*
     * Letter spacing is required for all texts.
     */
    letter-spacing: inherit;
    /*
     * Word spacing is required for all texts.
     */
    word-spacing: inherit;
  }
  /**
  * Sometimes we need the semantic element for accessibility reasons,
  * but we don't want to show it.
  *
  * - https://www.a11yproject.com/posts/how-to-hide-content/
  */
  .visually-hidden {
    position: fixed;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip-path: inset(50%);
  }
}
@layer kol-global {
  /*
   * Dieses CSS stellt sicher, dass der Standard-Style
   * von A und Button resettet werden.
   */
  :is(a, button) {
    background-color: transparent;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    /* 100% needed for custom width from outside */
  }
  /*
   * Ensure elements with hidden attribute to be actually not visible
   * @see https://meowni.ca/hidden.is.a.lie.html
   */
  [hidden] {
    display: none !important;
  }
  .badge-text-hint {
    color: black;
    background-color: lightgray;
  }
}
@layer kol-global {
  :host {
    /*
     * The max-width is needed to prevent the table from overflowing the
     * parent node, if the table is wider than the parent node.
     */
    max-width: 100%;
    font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
  }
  * {
    /*
     * We prefer to box-sizing: border-box for all elements.
     */
    box-sizing: border-box;
  }
  .kol-span {
    /* KolSpan is a layout component with icons in all directions and a label text in the middle. */
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    /* The sub span in KolSpan is the horizontal span with icon left and right and the label text in the middle. */
  }
  .kol-span__container {
    display: flex;
    align-items: center;
  }
  a,
  button {
    cursor: pointer;
  }
  .kol-span .kol-span__label--hide-label .kol-span__label {
    display: none;
  }
  /* Reset browser agent style. */
  button:disabled {
    color: unset;
  }
  .disabled label,
  .disabled:focus-within label,
  [aria-disabled=true],
  [aria-disabled=true]:focus,
  [disabled],
  [disabled]:focus {
    opacity: 0.5;
    outline: none;
    cursor: not-allowed;
  }
  [aria-disabled=true]:focus .kol-span,
  [disabled]:focus .kol-span {
    outline: none !important;
  }
  .hastooltip {
    z-index: 900 !important;
  }
}
@layer kol-component {
  .kol-meter__bar {
    display: grid;
    column-gap: calc(0.8 * 1rem / var(--kolibri-root-font-size, 16));
    align-items: center;
    grid-template-areas: "LABEL LABEL LABEL" "BAR VALUE UNIT";
    grid-template-columns: 1fr auto;
  }
  .kol-meter__bar-label {
    grid-column-end: 2;
    grid-area: LABEL;
  }
  .kol-meter__bar svg {
    grid-area: BAR;
  }
  .kol-meter__bar-border {
    fill: transparent;
    stroke: black;
  }
  .kol-meter__bar-background {
    fill: lightgray;
    stroke: white;
  }
  .kol-meter__bar-fill {
    stroke: transparent;
  }
  @media (prefers-reduced-motion: no-preference) {
    .kol-meter__bar-fill {
      transition: 250ms ease-in-out 50ms;
    }
  }
  .kol-meter__bar-fill--optimum {
    color: #2ea32e;
    color: #2ea32e;
    fill: #2ea32e;
  }
  .kol-meter__bar-fill--suboptimal {
    color: #c8a000;
    color: #c8a000;
    fill: #c8a000;
  }
  .kol-meter__bar-fill--critical {
    color: #c00;
    color: #c00;
    fill: #c00;
  }
  .kol-meter__value-unit {
    display: contents;
  }
  .kol-meter__value {
    grid-area: VALUE;
    text-align: right;
  }
  .kol-meter__unit {
    grid-area: UNIT;
  }
  .kol-meter--vertical {
    display: inline-flex;
  }
  .kol-meter--vertical .kol-meter__bar {
    display: flex;
    min-height: var(--kol-meter-height, calc(128 * 1rem / var(--kolibri-root-font-size, 16)));
    row-gap: calc(4 * 1rem / var(--kolibri-root-font-size, 16));
    flex-direction: column;
    align-items: center;
  }
  .kol-meter--vertical .kol-meter__bar-label {
    text-align: center;
  }
  .kol-meter--vertical .kol-meter__bar-track {
    background: lightgray;
    outline: calc(1 * 1rem / var(--kolibri-root-font-size, 16)) solid black;
    border-radius: calc(6 * 1rem / var(--kolibri-root-font-size, 16));
    position: relative;
    width: calc(12 * 1rem / var(--kolibri-root-font-size, 16));
    min-height: 0;
    overflow: hidden;
    flex: 1;
  }
  .kol-meter--vertical .kol-meter__bar-fill {
    background: currentColor;
    border-radius: calc(3 * 1rem / var(--kolibri-root-font-size, 16));
    position: absolute;
    right: calc(3 * 1rem / var(--kolibri-root-font-size, 16));
    bottom: calc(3 * 1rem / var(--kolibri-root-font-size, 16));
    left: calc(3 * 1rem / var(--kolibri-root-font-size, 16));
  }
  @media (prefers-reduced-motion: no-preference) {
    .kol-meter--vertical .kol-meter__bar-fill {
      transition: height 250ms ease-in-out 50ms;
    }
  }
  .kol-meter--vertical .kol-meter__value-unit {
    display: contents;
  }
  .kol-meter--vertical .kol-meter__value {
    width: auto;
    text-align: center;
  }
  .kol-meter--vertical .kol-meter__unit {
    text-align: center;
  }
}`,w=class extends o{constructor(t){super(),e(this,t),this.ctrl=new S(this.stateAccess),this._orientation=`horizontal`,this._unit=`%`,this.liveValue=0}watchHigh(e){this.ctrl.watchHigh(e)}watchLabel(e){this.ctrl.watchLabel(e)}watchLow(e){this.ctrl.watchLow(e)}watchMax(e){this.ctrl.watchMax(e)}watchMin(e){this.ctrl.watchMin(e)}watchOptimum(e){this.ctrl.watchOptimum(e)}watchOrientation(e){this.ctrl.watchOrientation(e)}watchUnit(e){this.ctrl.watchUnit(e)}watchValue(e){this.ctrl.watchValue(e)}componentWillLoad(){this.ctrl.componentWillLoad({high:this._high,label:this._label,low:this._low,max:this._max,min:this._min,optimum:this._optimum,orientation:this._orientation,unit:this._unit,value:this._value})}disconnectedCallback(){this.ctrl.destroy()}render(){let{high:e,low:r,optimum:i}=this.ctrl.getMeterData();return n(t,{key:`d84a0464ee8f975df788de58561ab2eb922c68e3`},n(b,{key:`e7cb9ee6a916b8afc538aa4acadae51bca50f57f`,high:e,label:this.ctrl.getRenderProp(`label`),low:r,liveValue:this.liveValue,max:this.ctrl.getRenderProp(`max`),min:this.ctrl.getRenderProp(`min`),optimum:i,orientation:this.ctrl.getRenderProp(`orientation`),unit:this.ctrl.getRenderProp(`unit`),value:this.ctrl.getRenderProp(`value`)}))}static get watchers(){return{_high:[`watchHigh`],_label:[`watchLabel`],_low:[`watchLow`],_max:[`watchMax`],_min:[`watchMin`],_optimum:[`watchOptimum`],_orientation:[`watchOrientation`],_unit:[`watchUnit`],_value:[`watchValue`]}}};w.style={default:C};export{w as kol_meter};