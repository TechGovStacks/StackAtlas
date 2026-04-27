import{c as e,o as t,s as n}from"./index-B7tv7olz-C0eCUb_Q.js";import"./component-names-Dy77vq43-y0h3WhLS.js";import"./i18n-B2d_exHc-B0S3j5ey.js";import"./index-Dnq9tuRr.js";import{n as r}from"./dev.utils-BKmnA1fy-BbGfd52v.js";import"./isArray-CcrBs4JM-Bl_U_CM4.js";import"./_Uint8Array-kJHDjtoP-C7gl70Rp.js";import"./normalizers-DnkJhVYZ-CC0zvcl-.js";import"./variant-quote-CHD0qMkY-_23590Qy.js";import"./tslib.es6-CxX45GIN-RG3Ya5IT.js";import{t as i}from"./clsx-COFh-Vc8-BO_nahQS.js";import"./component-_Y75jltB-Cyr9luet.js";import"./component-sn_z4L8i-CL3l5GiA.js";import"./component-uWorUZss-47qA2aEk.js";import"./align-floating-elements-58sFZOrL-DjvpZJOI.js";import"./align-D3Z54kEL-BfnpUPz0.js";import"./label-BEOW9ltS-Puf0OzXx.js";import"./base-controller-CXhqh4cR-DNOqRYhI.js";import"./controller-BhIDd4zH-Zird0ulx.js";import"./label-vxVEH2gH-BxgmtCS0.js";import"./Heading-D23yWoVT-BfnAkBjx.js";import"./disabled-BBn2JEzf-C0hynzec.js";import{n as a,t as o}from"./element-focus-BKUtVrWY-BOMs3gBB.js";import"./i18n-BVaUp6qp-DoB3qol0.js";import"./Alert-Cz3oclef-DDk2zVTg.js";import"./icons-CqQ9plmY-D68fc26p.js";import"./access-and-short-key-D2TiPdWw-DFh0zTh7.js";import"./hide-label-DQL9J6E_-h3eqPpTt.js";import"./tooltip-align-DnbCY1Uu-D6X-VLB6.js";import{n as s}from"./controller-eUfCqvxN-C4PcmDhr.js";import"./associated.controller-BKQIR17--DY2Oh0nu.js";import{t as c}from"./FormFieldStateWrapper-BVrH-o65-BNP7Ugcb.js";import{t as l}from"./controller-icon-aCgHTEpC-CxtLZpgY.js";import"./Input-DJW_wGXE-D3LPSP0A.js";import{t as u}from"./InputStateWrapper-C1ruP5X2-xbuQQQ76.js";import"./placeholder-BuBUMNhW-Bt8thj2l.js";import"./required-C9Xj8kw2-BLbTNZ5y.js";import"./suggestions-D5cst2OI-pwYazzpl.js";import"./auto-complete-DmusaKxg-BVQcQ2a8.js";import"./read-only-DnkXqxgk-wlHBV5MY.js";import"./max-length-behavior-DMw3rhwa-A9SWUoS1.js";import"./spell-check-Y1ApnP_M--KjPQZPa.js";import"./controller-BSBX_tuT-B1yA55fB.js";import{t as d}from"./controller-QShPjHaQ-DiCeaDoY.js";var f=`@charset "UTF-8";
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
  .kol-form-field--required .kol-tooltip__content .kol-span__label::after {
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
}`,p=class{async getValue(){return this.inputRef?.value}async focus(){return o(this.host,()=>a(this.inputRef))}async click(){return o(this.host,async()=>a(this.inputRef))}async selectionStart(){return Promise.resolve(this.inputRef?.selectionStart)}async selectioconEnd(){return Promise.resolve(this.inputRef?.selectionEnd)}async setSelectionRange(e,t,n){var r;(r=this.inputRef)==null||r.setSelectionRange(e,t,n)}async setSelectionStart(e){var t;(t=this.inputRef)==null||t.setSelectionRange(e,e)}async setRangeText(e,t,n,r){var i,a;t&&n?(i=this.inputRef)==null||i.setRangeText(e,t,n,r):(a=this.inputRef)==null||a.setRangeText(e)}getFormFieldProps(){return{state:this.state,class:i(`kol-input-text`,this.state._type,{"has-value":this.state._hasValue,"kol-form-field--has-counter":this.controller.hasSoftCharacterLimit()||this.controller.hasCounter()}),tooltipAlign:this._tooltipAlign,alert:this.showAsAlert()}}getInputProps(){let e=typeof this.state._maxLength==`number`?[`${this.state._id}-character-limit-hint`]:void 0;return Object.assign(Object.assign({ref:this.setInputRef,state:this.state,ariaDescribedBy:e},this.controller.onFacade),{onBlur:this.onBlur,onChange:this.onChange,onFocus:this.onFocus,onInput:this.onInput,onKeyDown:this.onKeyDown})}render(){return n(c,Object.assign({key:`432b116ed15ba3278f39967c90fddb61ff52a441`},this.getFormFieldProps()),n(l,{key:`e093b061847e86a75ce325ba21601fa48fb1dff4`,state:this.state},n(u,Object.assign({key:`2b2b31b63633d69993fb5413651d67480b920097`},this.getInputProps()))))}constructor(t){e(this,t),this.setInputRef=e=>{this.inputRef=e},this.onBlur=e=>{this.controller.onFacade.onBlur(e),this.inputHasFocus=!1},this.onChange=e=>{let t=this.inputRef?.value;this.oldValue!==t&&(this.oldValue=t),this.controller.onFacade.onChange(e)},this.onFocus=e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0},this.onInput=e=>{this._value=this.inputRef?.value??``,this.controller.onFacade.onInput(e)},this.onKeyDown=e=>{this.controller.onFacade.onKeyDown(e),e.code!==`Enter`&&e.code!==`NumpadEnter`||s({form:this.host})},this._autoComplete=`off`,this._hasCounter=!1,this._maxLengthBehavior=`hard`,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._readOnly=!1,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this._type=`text`,this.state={_currentLength:0,_currentLengthDebounced:0,_hasValue:!1,_hideMsg:!1,_id:`id-${r()}`,_label:``,_suggestions:[],_type:`text`},this.inputHasFocus=!1,this.controller=new d(this,`text`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccessKey(e){this.controller.validateAccessKey(e)}validateAutoComplete(e){this.controller.validateAutoComplete(e)}validateMaxLengthBehavior(e){this.controller.validateMaxLengthBehavior(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHasCounter(e){this.controller.validateHasCounter(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMaxLength(e){this.controller.validateMaxLength(e)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validatePattern(e){this.controller.validatePattern(e)}validatePlaceholder(e){this.controller.validatePlaceholder(e)}validateReadOnly(e){this.controller.validateReadOnly(e)}validateRequired(e){this.controller.validateRequired(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSpellCheck(e){this.controller.validateSpellCheck(e)}validateSuggestions(e){this.controller.validateSuggestions(e)}validateSmartButton(e){this.controller.validateSmartButton(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateType(e){this.controller.validateType(e)}validateValue(e){this.controller.validateValue(e),this.oldValue=e}componentWillLoad(){this._touched=!0===this._touched,this.oldValue=this._value,this.controller.componentWillLoad(),this.state._hasValue=!!this.state._value,this.controller.addValueChangeListener(e=>this.state._hasValue=!!e)}get host(){return t(this)}static get watchers(){return{_accessKey:[`validateAccessKey`],_autoComplete:[`validateAutoComplete`],_maxLengthBehavior:[`validateMaxLengthBehavior`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hasCounter:[`validateHasCounter`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_maxLength:[`validateMaxLength`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_pattern:[`validatePattern`],_placeholder:[`validatePlaceholder`],_readOnly:[`validateReadOnly`],_required:[`validateRequired`],_shortKey:[`validateShortKey`],_spellCheck:[`validateSpellCheck`],_suggestions:[`validateSuggestions`],_smartButton:[`validateSmartButton`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_type:[`validateType`],_value:[`validateValue`]}}};p.style={default:f};export{p as kol_input_text};