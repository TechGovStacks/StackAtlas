import{c as e,lt as t,o as n,s as r}from"./index-G8af0_gG-Cp91DW8x.js";import"./component-names-Dy77vq43-Bz1me821.js";import"./i18n-B2d_exHc-BdpFVwr5.js";import"./bootstrap-CbPXNlVt-D8LHl9Po.js";import"./bem-registry-Bux_TllX-BNR-5SV3.js";import"./events-DHTi_wtD-D0AT_9fT.js";import"./tooltip-open-tracking-D3tCiiGP-BJXK1EaU.js";import{n as i}from"./dev.utils-BL9Lx_uf-svS3BiHs.js";import"./isArray-CcrBs4JM-CPN1m87f.js";import"./_Uint8Array-kJHDjtoP-B1Fjb4uD.js";import"./normalizers-DnkJhVYZ-VdW8FsZe.js";import"./variant-quote-CHD0qMkY-C3QVkwYn.js";import"./tslib.es6-CxX45GIN-Cpw9rcj0.js";import"./clsx-COFh-Vc8-BoGw_Wf3.js";import"./component-D3oJtEcp-CsiNvNht.js";import"./component-DpGGeM3i-DkCOjdfb.js";import"./component-CAXga0_U-BQu4Js6T.js";import"./align-floating-elements-58sFZOrL-DhNbsjVU.js";import"./align-D3Z54kEL-k3a0b6ip.js";import"./label-BEOW9ltS-DFJ7N0sT.js";import"./base-controller-CXhqh4cR-SGkpdf24.js";import"./controller-BhIDd4zH-CljvxEpn.js";import"./label-vxVEH2gH-BH84oFoA.js";import"./Heading-D3N3WLAQ-JsRGNNY6.js";import"./disabled-BBn2JEzf-B_mdhRGI.js";import{n as a,t as o}from"./element-focus-BKUtVrWY-DRW8j1ID.js";import{n as s,t as c}from"./element-click-BTxuJDNT-DRFyUpaJ.js";import"./i18n-BVaUp6qp-xVEGggqH.js";import"./Alert-Ccw-DwxA-BXclKKFe.js";import"./icons-CqQ9plmY-C0mPcC7B.js";import"./access-and-short-key-D2TiPdWw-A6VRSDmI.js";import"./hide-label-DQL9J6E_-Dm0VVhsa.js";import"./tooltip-align-DnbCY1Uu-BUCFZDtW.js";import"./associated.controller-BKQIR17--HA79TTAK.js";import{t as l}from"./FormFieldStateWrapper-DsX6gk6N-oTProd-x.js";import{n as u,t as d}from"./controller-icon-CYmINtAB-BHPEHH3M.js";import"./Input-vt6KaJWU-BSu5v9j7.js";import{t as f}from"./InputStateWrapper-xUqVwJbq-PCtUa40Q.js";import{t as p}from"./suggestions-D5cst2OI-CEC3elDt.js";import{t as m}from"./auto-complete-DmusaKxg-6Sd8ETx1.js";var h=class extends u{constructor(e,t,n){super(e,t,n),this.component=e}validateAutoComplete(e){m(this.component,e)}validateSuggestions(e){p(this.component,e)}validateValue(e){t(this.component,`_value`,e),this.setFormAssociatedValue(this.component.state._value)}componentWillLoad(){super.componentWillLoad(),this.validateAutoComplete(this.component._autoComplete),this.validateSuggestions(this.component._suggestions),this.validateValue(this.component._value)}},g=`@charset "UTF-8";
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
/* forward the rem function */
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
  :host {
    display: block;
  }
}
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1775135018085"); /* IE9*/
  src: url("kolicons.eot?t=1775135018085#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1775135018085") format("woff2"), url("kolicons.woff?t=1775135018085") format("woff"), url("kolicons.ttf?t=1775135018085") format("truetype"), url("kolicons.svg?t=1775135018085#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-tooltip {
    display: contents;
  }
  .kol-tooltip__floating {
    opacity: 0;
    display: none;
    position: fixed;
    /* Avoid layout interference - see https://floating-ui.com/docs/computePosition */
    top: 0;
    left: 0;
    /* Can be used to specify the tooltip-width from the outside. Unset by default.  */
    width: var(--kol-tooltip-width, max-content);
    min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));
    max-width: 90vw;
    max-height: 90vh;
    animation-direction: normal;
    /* Can be used to specify the animation duration from the outside. 250ms by default. */
    animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
  }
  .kol-tooltip__floating.hide {
    animation-name: hideTooltip;
  }
  .kol-tooltip__floating.show {
    animation-name: showTooltip;
  }
  .kol-tooltip__arrow {
    transform: rotate(45deg);
    color: #000;
    background-color: #fff;
    position: absolute;
    z-index: 999;
    width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));
  }
  .kol-tooltip__content {
    color: #000;
    background-color: #fff;
    position: relative;
    z-index: 1000;
  }
  @keyframes hideTooltip {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      display: none;
    }
  }
  @keyframes showTooltip {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
@layer kol-component {
  .kol-alert .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-alert :host {
    display: inline-block;
  }
  .kol-alert .kol-button {
    display: flex;
    min-height: var(--a11y-min-size);
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-alert .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-alert .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-alert {
    display: grid;
  }
  .kol-alert__container {
    display: flex;
    place-items: center;
  }
  .kol-alert__container-content {
    flex-grow: 1;
  }
  .kol-alert__closer {
    /* Visible with forced colors */
    outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));
  }
  .kol-form-field {
    display: grid;
  }
  .kol-form-field:not(.kol-form-field--disabled) .kol-form-field__label {
    cursor: pointer;
  }
  .kol-form-field__label-text {
    flex-flow: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .kol-form-field--disabled .kol-form-field__label {
    opacity: 0.5;
  }
  .kol-form-field--required .kol-form-field__label-text:not(:has(> [name]))::after,
  .kol-form-field--required .kol-form-field__tooltip .span-label::after {
    content: "*"/"";
  }
  .kol-form-field--disabled .kol-form-field__hint {
    opacity: 0.5;
  }
  .kol-input-container {
    background-color: transparent;
    display: grid;
    width: 100%;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: center;
    grid-template-columns: 1fr;
  }
  .kol-input-container:has(> .kol-input-container__adornment--start) {
    grid-template-columns: auto 1fr auto;
  }
  .kol-input-container__container {
    position: relative;
  }
  .kol-input-container__adornment {
    display: flex;
    align-items: center;
  }
  .kol-input-container__adornment .kol-icon {
    display: grid;
    min-height: var(--a11y-min-size);
    place-items: center;
  }
  .kol-input {
    background-color: transparent;
    width: 100%;
    min-width: var(--a11y-min-size);
  }
  .kol-input:focus {
    outline: none;
  }
  .kol-input-color__input--color {
    flex-grow: 1;
  }
  .kol-input-color__input--text {
    width: calc(112 * 1rem / var(--kolibri-root-font-size, 16));
  }
  .kol-input-color__inputs-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .kol-input {
    cursor: pointer;
  }
  .kol-input:disabled {
    cursor: not-allowed;
  }
}`,_=class{async getValue(){return this.refInputText?.value}async focus(){return o(this.host,()=>a(this.refInputText))}async click(){return c(this.host,async()=>s(this.refInputText))}get hasSuggestions(){return Array.isArray(this.state._suggestions)&&this.state._suggestions.length>0}getFormFieldProps(){return{state:this.state,class:`kol-input-color`,tooltipAlign:this._tooltipAlign,alert:this.showAsAlert()}}getInputColorProps(){return Object.assign(Object.assign({},this.getGenericInputProps()),{ref:this.setColorRef,type:`color`,name:this.state._name?`${this.state._name}-color`:void 0,list:this.hasSuggestions?`${this.state._id}-list`:void 0,id:void 0,"aria-hidden":`true`,tabIndex:-1,onInput:this.onColorInput})}getInputTextProps(){return Object.assign(Object.assign({},this.getGenericInputProps()),{ref:this.setInputRef,type:`text`,name:this.state._name?`${this.state._name}-text`:void 0,list:this.hasSuggestions?`${this.state._id}-list`:void 0,onInput:this.onTextInput})}getGenericInputProps(){return Object.assign(Object.assign({state:Object.assign(Object.assign({},this.state),{_suggestions:[]})},this.controller.onFacade),{onBlur:this.onBlur,onFocus:this.onFocus})}render(){return r(l,Object.assign({key:`cf60442b68d1feda451351484a8c1af15ef91a81`},this.getFormFieldProps()),r(d,{key:`4173d0bbcf3ef11965c79c86e43d744dac72d0f9`,state:this.state,class:`kol-input-color__inputs-wrapper`},r(`div`,{key:`5282550720c6cb2741ac0dfa5d4cd6e26940d3c9`,class:`kol-input-color__inputs-wrapper`},r(f,Object.assign({key:`75d480ff0ce6a4342023d546665eb2a48d77fa50`,class:`kol-input-color__input kol-input-color__input--color`},this.getInputColorProps())),r(f,Object.assign({key:`0ebad3458446131cee5ae2fe8b06a548d151010f`,class:`kol-input-color__input kol-input-color__input--text`},this.getInputTextProps())))))}constructor(t){e(this,t),this.setInputRef=e=>{this.refInputText=e},this.setColorRef=e=>{this.refInputColor=e},this.onBlur=e=>{this.controller.onFacade.onBlur(e),this.inputHasFocus=!1},this.onFocus=e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0},this.onColorInput=e=>{let t=e.target.value;this.state._value=t,this.refInputText&&(this.refInputText.value=t),this.controller.onFacade.onInput(e)},this.onTextInput=e=>{let t=e.target.value;t.startsWith(`#`)||(t=`#${t}`),this._value=t,this.refInputColor&&(this.refInputColor.value=t),this.controller.onFacade.onInput(e)},this._autoComplete=`off`,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._tooltipAlign=`top`,this._touched=!1,this.state={_hideMsg:!1,_id:`id-${i()}`,_label:``,_suggestions:[]},this.inputHasFocus=!1,this.controller=new h(this,`color`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccessKey(e){this.controller.validateAccessKey(e)}validateAutoComplete(e){this.controller.validateAutoComplete(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSmartButton(e){this.controller.validateSmartButton(e)}validateSuggestions(e){this.controller.validateSuggestions(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateValue(e){this.controller.validateValue(e)}componentDidLoad(){!this._value&&this.refInputColor&&(this._value=this.refInputColor.value)}componentWillLoad(){this._touched=!0===this._touched,this.controller.componentWillLoad()}get host(){return n(this)}static get watchers(){return{_accessKey:[`validateAccessKey`],_autoComplete:[`validateAutoComplete`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_shortKey:[`validateShortKey`],_smartButton:[`validateSmartButton`],_suggestions:[`validateSuggestions`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_value:[`validateValue`]}}};_.style={default:g};export{_ as kol_input_color};