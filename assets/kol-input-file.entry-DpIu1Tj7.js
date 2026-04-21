import{c as e,ct as t,o as n,s as r}from"./index-G8af0_gG-xSNoIDQl.js";import{i}from"./component-names-Dy77vq43-BdW6dSNB.js";import"./i18n-B2d_exHc-DgdXviYO.js";import"./bootstrap-CbPXNlVt-X0xaDH4Y.js";import"./bem-registry-Bux_TllX-BhEN5dt9.js";import"./events-DHTi_wtD-Akjxsw80.js";import"./tooltip-open-tracking-D3tCiiGP-DlFr070-.js";import{n as a}from"./dev.utils-BL9Lx_uf-C7spVD0w.js";import"./isArray-CcrBs4JM-DIoj9Afu.js";import"./_Uint8Array-kJHDjtoP-CEsqmbrq.js";import"./normalizers-DnkJhVYZ-D2c3SafA.js";import"./variant-quote-CHD0qMkY-DoFTNpRC.js";import"./tslib.es6-CxX45GIN-Brv0ukWo.js";import{t as o}from"./clsx-COFh-Vc8-M8aE5z24.js";import"./component-D3oJtEcp-CO8xc8TH.js";import"./component-DpGGeM3i-BCqllN3b.js";import"./component-CAXga0_U-zaEgLuvb.js";import"./align-floating-elements-58sFZOrL-C-jFNs_0.js";import"./align-D3Z54kEL-TrT_ZCeu.js";import"./label-BEOW9ltS-CgmLPczA.js";import"./base-controller-CXhqh4cR-CGxN9sDS.js";import"./controller-BhIDd4zH-DUDLe_8q.js";import"./label-vxVEH2gH-BE0yy70x.js";import"./Heading-D3N3WLAQ-DRhWbSXk.js";import"./disabled-BBn2JEzf-BXd7yNk8.js";import{n as s,t as c}from"./element-focus-BKUtVrWY-DPdg1Dnn.js";import{n as l,t as u}from"./element-click-BTxuJDNT-DH-hF04z.js";import{t as d}from"./i18n-BVaUp6qp-CRjo-PL9.js";import"./Alert-Ccw-DwxA-CzH20mBp.js";import"./icons-CqQ9plmY-D5C6uW3w.js";import"./access-and-short-key-D2TiPdWw-DgzoUB3w.js";import"./hide-label-DQL9J6E_-CuVoydIi.js";import"./tooltip-align-DnbCY1Uu-wNrVENiA.js";import"./associated.controller-BKQIR17--B6OEAljR.js";import{t as f}from"./FormFieldStateWrapper-DsX6gk6N-DVyyaw3W.js";import{n as p,t as m}from"./controller-icon-CYmINtAB-C-oc7K5O.js";import"./Input-vt6KaJWU-CXX0PIDT.js";import{t as h}from"./InputStateWrapper-xUqVwJbq-Dru-pLs3.js";import{t as g}from"./required-C9Xj8kw2-xSfkeRSJ.js";import{t as _}from"./multiple-sbfZAt7f-DGU7CGwh.js";var v=(e,n,r={})=>{t(e,`_accept`,n,r)},y=class extends p{constructor(e,t,n){super(e,t,n),this.component=e}validateAccept(e){v(this.component,e)}validateMultiple(e){_(this.component,e)}validateRequired(e){g(this.component,e)}componentWillLoad(){super.componentWillLoad(),this.validateAccept(this.component._accept),this.validateMultiple(this.component._multiple),this.validateRequired(this.component._required)}},b=`@charset "UTF-8";
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
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  :host {
    display: inline-block;
  }
  .kol-button {
    display: flex;
    min-height: var(--a11y-min-size);
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-input {
    opacity: 0;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .kol-input::-webkit-file-upload-button, .kol-input::file-selector-button {
    cursor: pointer;
  }
  .kol-input:disabled, .kol-input:disabled::-webkit-file-upload-button, .kol-input:disabled::file-selector-button {
    cursor: not-allowed;
    pointer-events: none;
  }
  .kol-input-container__container {
    display: flex;
    overflow: hidden;
    align-items: center;
  }
  .kol-input-container__filename {
    overflow: hidden;
    flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .kol-input-container:has(> .kol-input-container__adornment--start):has(> .kol-input-container__adornment--end) {
    grid-template-columns: auto 1fr;
  }
}`,x=class{async getValue(){return this.inputRef?.files}async focus(){return c(this.host,()=>s(this.inputRef))}async click(){return u(this.host,async()=>l(this.inputRef))}async reset(){this.controller.setFormAssociatedValue(``),this.filename=this.translateFilenameText,this.hasFileSelected=!1,this.inputRef&&(this.inputRef.value=``)}getFormFieldProps(){return{state:this.state,class:o(`kol-input-file`,`file`),tooltipAlign:this._tooltipAlign,alert:this.showAsAlert()}}getInputProps(){return Object.assign(Object.assign({ref:this.setInputRef,state:this.state,type:`file`,accept:this.state._accept,multiple:this.state._multiple},this.controller.onFacade),{onChange:this.onChange,onInput:this.onInput,onFocus:e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0},onBlur:e=>{this.controller.onFacade.onBlur(e),this.inputHasFocus=!1}})}render(){return r(f,Object.assign({key:`b7baaee023436038e6e1dbb424ded6e2f87b5262`},this.getFormFieldProps()),r(m,{key:`0474d81bc3351f43c25fbb8600abfefd5c97c6d5`,state:this.state},r(`span`,{key:`5b98e1b26ae3086213c4ed7eb6f25c64174ee313`,class:o(`kol-input-container__filename`,{"kol-input-container__filename--has-file":this.hasFileSelected})},this.filename),r(h,Object.assign({key:`a93d42d7153e0397e69f24dd1f308942d6e8ffe9`},this.getInputProps())),r(i,{key:`8430b7f3bdc14536d923c6b6a2973d924ae29a65`,class:`kol-input-container__button`,_label:this.translateDataBrowseText,_variant:`primary`,_disabled:this._disabled})))}constructor(t){e(this,t),this.translateDataBrowseText=d(`kol-data-browse-text`),this.translateFilenameText=d(`kol-filename-text`),this.setInputRef=e=>{this.inputRef=e},this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._multiple=!1,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this.filename=this.translateFilenameText,this.hasFileSelected=!1,this.state={_hideMsg:!1,_id:`id-${a()}`,_label:``},this.inputHasFocus=!1,this.onDragOver=e=>{var t;e.preventDefault(),(t=this.inputRef?.parentElement?.parentElement)==null||t.classList.add(`kol-input-container--is-dragover`)},this.onDragLeave=()=>{var e;(e=this.inputRef?.parentElement?.parentElement)==null||e.classList.remove(`kol-input-container--is-dragover`)},this.onDrop=e=>{var t;if(e.preventDefault(),this.inputRef&&((t=this.inputRef.parentElement?.parentElement)==null||t.classList.remove(`kol-input-container--is-dragover`),e.dataTransfer?.files.length)){let t=e.dataTransfer.files;this.inputRef.files=t,this.filename=Array.from(t).map(e=>e.name).join(`, `),this.controller.setFormAssociatedValue(t),this.controller.onFacade.onChange(e,t),this.controller.onFacade.onInput(e,!1,t)}},this.onChange=e=>{if(this.inputRef instanceof HTMLInputElement&&this.inputRef.type===`file`){let t=this.inputRef.files;this.hasFileSelected=!!t?.length,this.filename=t?.length?Array.from(t).map(e=>e.name).join(`, `):this.translateFilenameText,this.controller.onFacade.onChange(e,t),this.controller.setFormAssociatedValue(t)}},this.onInput=e=>{if(this.inputRef instanceof HTMLInputElement&&this.inputRef.type===`file`){let t=this.inputRef.files;this.controller.onFacade.onInput(e,!1,t)}},this.controller=new y(this,`file`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccept(e){this.controller.validateAccept(e)}validateAccessKey(e){this.controller.validateAccessKey(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMsg(e){this.controller.validateMsg(e)}validateMultiple(e){this.controller.validateMultiple(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validateRequired(e){this.controller.validateRequired(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSmartButton(e){this.controller.validateSmartButton(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}componentWillLoad(){this._touched=!0===this._touched,this.controller.componentWillLoad()}componentDidLoad(){let e=this.inputRef?.parentElement?.parentElement;e?.addEventListener(`dragover`,this.onDragOver),e?.addEventListener(`dragleave`,this.onDragLeave),e?.addEventListener(`drop`,this.onDrop)}get host(){return n(this)}static get watchers(){return{_accept:[`validateAccept`],_accessKey:[`validateAccessKey`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_msg:[`validateMsg`],_multiple:[`validateMultiple`],_name:[`validateName`],_on:[`validateOn`],_required:[`validateRequired`],_shortKey:[`validateShortKey`],_smartButton:[`validateSmartButton`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`]}}};x.style={default:b};export{x as kol_input_file};