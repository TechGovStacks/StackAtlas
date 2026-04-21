import{at as e,c as t,lt as n,o as r,s as i,st as a}from"./index-G8af0_gG-xSNoIDQl.js";import{i as o}from"./component-names-Dy77vq43-BdW6dSNB.js";import"./i18n-B2d_exHc-DgdXviYO.js";import"./bootstrap-CbPXNlVt-X0xaDH4Y.js";import"./bem-registry-Bux_TllX-BhEN5dt9.js";import"./events-DHTi_wtD-Akjxsw80.js";import"./tooltip-open-tracking-D3tCiiGP-DlFr070-.js";import{n as s}from"./dev.utils-BL9Lx_uf-C7spVD0w.js";import"./isArray-CcrBs4JM-DIoj9Afu.js";import"./_Uint8Array-kJHDjtoP-CEsqmbrq.js";import"./normalizers-DnkJhVYZ-D2c3SafA.js";import"./variant-quote-CHD0qMkY-DoFTNpRC.js";import"./tslib.es6-CxX45GIN-Brv0ukWo.js";import{t as c}from"./clsx-COFh-Vc8-M8aE5z24.js";import{t as l}from"./component-D3oJtEcp-CO8xc8TH.js";import"./component-DpGGeM3i-BCqllN3b.js";import"./component-CAXga0_U-zaEgLuvb.js";import"./align-floating-elements-58sFZOrL-C-jFNs_0.js";import"./align-D3Z54kEL-TrT_ZCeu.js";import"./label-BEOW9ltS-CgmLPczA.js";import"./base-controller-CXhqh4cR-CGxN9sDS.js";import"./controller-BhIDd4zH-DUDLe_8q.js";import"./label-vxVEH2gH-BE0yy70x.js";import"./Heading-D3N3WLAQ-DRhWbSXk.js";import"./disabled-BBn2JEzf-BXd7yNk8.js";import{n as u,t as d}from"./element-focus-BKUtVrWY-DPdg1Dnn.js";import{t as f}from"./i18n-BVaUp6qp-CRjo-PL9.js";import"./Alert-Ccw-DwxA-CzH20mBp.js";import"./icons-CqQ9plmY-D5C6uW3w.js";import"./access-and-short-key-D2TiPdWw-DgzoUB3w.js";import"./hide-label-DQL9J6E_-CuVoydIi.js";import"./tooltip-align-DnbCY1Uu-wNrVENiA.js";import"./associated.controller-BKQIR17--B6OEAljR.js";import{s as p,t as m}from"./FormFieldStateWrapper-DsX6gk6N-DVyyaw3W.js";import{n as h,t as g}from"./controller-icon-CYmINtAB-C-oc7K5O.js";import"./Input-vt6KaJWU-CXX0PIDT.js";import{t as _}from"./InputStateWrapper-xUqVwJbq-Dru-pLs3.js";import{n as v,t as y}from"./CustomSuggestionsOptionsGroup-Ct0Hm2uK-BEmza0C8.js";import{t as b}from"./placeholder-BuBUMNhW-dwzPq9XO.js";import{t as x}from"./required-C9Xj8kw2-xSfkeRSJ.js";import"./orientation-D3LRVMo1-BVYjU_Ss.js";import{i as S,r as C}from"./controller-BKRP0tqb-DYFC5zB7.js";var w=class extends h{constructor(e,t,n){super(e,t,n),this.keyOptionMap=new Map,this.afterPatchOptions=(e,t,n,r)=>{r===`_value`&&this.setFormAssociatedValue(e)},this.beforePatchOptions=(e,t)=>{let n=t.has(`_options`)?t.get(`_options`):this.component.state._options;Array.isArray(n)&&n.length>0&&(this.keyOptionMap.clear(),C(this.keyOptionMap,n))},this.component=e}validateOptions(e){S(this.component,e,{hooks:{afterPatch:this.afterPatchOptions,beforePatch:this.beforePatchOptions}})}validateRequired(e){x(this.component,e)}validateValue(e){n(this.component,`_value`,e=>e!==void 0,new Set([`KoliBriUnknown`]),e)}validatePlaceholder(e){b(this.component,e)}validateHasClearButton(t){e(this.component,`_hasClearButton`,t)}validateRows(e){a(this.component,`_rows`,e)}componentWillLoad(){super.componentWillLoad(),this.validateOptions(this.component._options),this.validateRequired(this.component._required),this.validateValue(this.component._value),this.validatePlaceholder(this.component._placeholder),this.validateHasClearButton(this.component._hasClearButton),this.validateRows(this.component._rows)}},T=`@charset "UTF-8";
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
  .kol-custom-suggestions-option {
    line-height: 1.5;
    white-space: normal;
    cursor: pointer;
    overflow-wrap: break-word;
  }
  .kol-custom-suggestions-options-group--cursor-hidden .kol-custom-suggestions-option {
    cursor: none !important;
  }
  .kol-custom-suggestions-option--disabled:focus, .kol-custom-suggestions-option--disabled:focus * {
    cursor: not-allowed;
  }
  .kol-custom-suggestions-options-group {
    background-color: white;
    display: block;
    position: absolute;
    z-index: 2;
    max-height: calc(250 * 1rem / var(--kolibri-root-font-size, 16));
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    list-style-type: none;
  }
  .kol-input-container:has(.kol-custom-suggestions-options-group--open) {
    z-index: 10;
  }
  .kol-custom-suggestions-toggle {
    display: flex;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: center;
    justify-content: center;
    cursor: default;
  }
  .kol-custom-suggestions-toggle.kol-custom-suggestions-toggle--disabled {
    cursor: not-allowed;
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
  .kol-single-select__delete .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-single-select__delete :host {
    display: inline-block;
  }
  .kol-single-select__delete .kol-button {
    display: flex;
    min-height: var(--a11y-min-size);
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-single-select__delete .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-single-select__delete .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-single-select__no-results-message {
    display: flex;
    min-height: calc(50 * 1rem / var(--kolibri-root-font-size, 16));
    align-items: center;
    justify-content: center;
    cursor: default;
  }
  .kol-single-select .kol-custom-suggestions-options-group {
    max-height: calc(40 * 1rem / var(--kolibri-root-font-size, 16) * var(--visible-options, 5) + 2 * 1rem / var(--kolibri-root-font-size, 16)) !important;
  }
  .kol-custom-suggestions-toggle:not(.kol-custom-suggestions-toggle--disabled) {
    cursor: pointer;
  }
  .kol-custom-suggestions-toggle--disabled {
    opacity: 0.5;
  }
}`,E=class{async getValue(){return this._value}async focus(){return d(this.host,()=>u(this.refInput))}onBlur(e){let t=this.state._options?.find(e=>e.label?.toLowerCase()===this._inputValue?.toLowerCase());t?this.selectOption(t):!this._isOpen&&this._value&&(this._inputValue=this.state._options?.find(e=>e.value===this._value)?.label,this._filteredOptions=[...this.state._options]),e instanceof FocusEvent&&e.view===window&&!this.isClearing&&(this._isOpen=!1)}createEventWithTarget(e,t){let n=new CustomEvent(e,{bubbles:!0,detail:t});return this.refInput&&(Object.defineProperty(n,`target`,{value:this.refInput}),Object.defineProperty(n,`currentTarget`,{value:this.refInput})),n}clearSelection(){if(this.isClearing=!0,this.state._disabled)return;this._focusedOptionIndex=-1,this._value=null,this._inputValue=``,this._filteredOptions=[...this.state._options];let e=this.createEventWithTarget(`input`,{name:this.state._name,value:null}),t=this.createEventWithTarget(`change`,{name:this.state._name,value:null});this.controller.onFacade.onInput(e,!0,{value:null}),this.controller.onFacade.onChange(t,{value:null}),this.isClearing=!1}selectOption(e){if(e.value===this._value)return this._inputValue=e.label,void(this._filteredOptions=[...this.state._options]);this._value=e.value,this._inputValue=e.label;let t=this.createEventWithTarget(`input`,{name:this.state._name??``,value:e.value}),n=this.createEventWithTarget(`change`,{name:this.state._name??``,value:e.value});this.controller.onFacade.onInput(t,!1,e.value),this.controller.onFacade.onChange(n,e.value),this._filteredOptions=[...this.state._options],this.controller.setFormAssociatedValue(this._value)}onInput(e){let t=e.target;this._inputValue=t.value,this._isOpen=!0,this.setFilteredOptionsByQuery(t.value),this._focusedOptionIndex=-1}handleKeyDownDropdown(e){e.key.length===1&&/[a-z0-9]/i.test(e.key)&&(e.preventDefault(),this._isOpen=!0,this.focusSuggestionStartingWith(e.key))}setFilteredOptionsByQuery(e){e?.trim()===``?this._filteredOptions=[...this.state._options]:Array.isArray(this.state._options)&&this.state._options.length>0&&e.length>0&&(this._filteredOptions=this.state._options.filter(t=>(t.label?.toLowerCase())?.includes(e?.toLowerCase())))}moveFocus(e){if(!this._filteredOptions)return;let t=this._focusedOptionIndex+e,n=0,r=!1,i=this._filteredOptions.length;for(;n<i;){if(t>=this._filteredOptions.length&&(t=0),t<0&&(t=this._filteredOptions.length-1),!this._filteredOptions[t].disabled){r=!0;break}t+=e,n++}r&&(this._focusedOptionIndex=t,this.focusOption(this._focusedOptionIndex))}focusOption(e){this.refOptions&&this.refOptions[e]?.focus()}selectFocusedOption(){return!!(Array.isArray(this._filteredOptions)&&this._filteredOptions.length>0&&this._focusedOptionIndex>=0)&&(this.selectOption(this._filteredOptions[this._focusedOptionIndex]),!0)}focusSuggestionStartingWith(e){let t=e.toLowerCase(),n=Array.isArray(this._filteredOptions)&&this._filteredOptions.findIndex(e=>e.label.toLowerCase().startsWith(t)&&!e.disabled);typeof n==`number`&&n>=0&&(this._focusedOptionIndex=n,this.focusOption(n))}getFormFieldProps(){return{state:this.state,class:`kol-single-select`,tooltipAlign:this._tooltipAlign,alert:this.showAsAlert()}}getInputProps(){let{ariaDescribedBy:e}=p(this.state),t=!0===this.state._disabled;return Object.assign(Object.assign({"aria-activedescendant":this._isOpen&&this._focusedOptionIndex>=0?`option-${this._focusedOptionIndex}`:void 0,"aria-autocomplete":`both`,"aria-controls":`listbox`,"aria-describedby":e.length>0?e.join(` `):void 0,"aria-label":this.state._hideLabel&&typeof this.state._label==`string`?this.state._label:void 0,"aria-keyshortcuts":this.state._shortKey,accessKey:this.state._accessKey,autocapitalize:`off`,autocorrect:`off`,class:`kol-single-select__input`,disabled:t,name:this.state._name,placeholder:this.state._placeholder,ref:this.setRefInput,required:this.state._required,role:`combobox`,state:this.state,type:`text`,value:this._inputValue},this.controller.onFacade),{onChange:this.onChange.bind(this),onClick:this.onClick.bind(this),onInput:this.onInput.bind(this),onFocus:e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0},onBlur:e=>{this.controller.onFacade.onBlur(e),this.inputHasFocus=!1}})}render(){let e=!0===this.state._disabled;return i(m,Object.assign({key:`9fe3ffae0d2a5dd44dc846a67e70bef70e745b2b`},this.getFormFieldProps()),i(g,{key:`07dbffb6552a8d99f4f6df05e4614b0f16644cb8`,state:this.state},i(`div`,{key:`3d9f4973be33bcd19adadcdfed713a75cf4f4a4b`,class:`kol-single-select__group`},i(_,Object.assign({key:`6127bea092aaf4ae4dbc5d301b3632ac9e481a8c`},this.getInputProps())),this._inputValue&&this.state._hasClearButton&&i(o,{key:`88385455feb08b784b9a1e28cd1157e011643144`,_icons:`kolicon-cross`,_label:this.translateDeleteSelection,_hideLabel:!0,_variant:`ghost`,_disabled:e,"data-testid":`single-select-delete`,class:`kol-single-select__delete`,hidden:e,_on:{onClick:()=>{var e;this.clearSelection(),(e=this.refInput)==null||e.focus()}}}),i(l,{key:`5e04ccaf242eaa961d5b95cfe5fcedfd456d913d`,icons:`kolicon-chevron-down`,label:``,class:c(`kol-custom-suggestions-toggle`,{"kol-custom-suggestions-toggle--disabled":e}),onClick:this.toggleListbox.bind(this)})),i(v,{key:`81f8cf140037ce64d590d23ecfbdc70f7b0db41b`,blockSuggestionMouseOver:this.blockSuggestionMouseOver,onKeyDown:this.handleKeyDownDropdown.bind(this),style:{"--visible-options":`${this._rows??5}`},hidden:!this._isOpen||e},Array.isArray(this._filteredOptions)&&this._filteredOptions.length>0?this._filteredOptions.map((e,t)=>i(y,{index:t,option:e.label,searchTerm:this._inputValue,ref:e=>{e&&(this.refOptions[t]=e)},selected:this._value===e.value,disabled:!!e.disabled,onClick:t=>{var n;e.disabled||(this.selectOption(e),(n=this.refInput)==null||n.focus(),this.toggleListbox(t),this._isOpen=!1)},onMouseOver:()=>{this.blockSuggestionMouseOver||(this._focusedOptionIndex=t,this.focusOption(t))},onFocus:()=>{e.disabled||(this._focusedOptionIndex=t,this.focusOption(t))},onKeyDown:t=>{var n;e.disabled||t.key!==`Enter`&&t.key!==`NumpadEnter`||(this.selectOption(e),(n=this.refInput)==null||n.focus(),this.toggleListbox(t),t.preventDefault())}})):i(`li`,{class:`kol-single-select__no-results-message`,role:`alert`},this.translateNoResultsMessage,` `))))}handleFocusOut(e){setTimeout(()=>{var t;(t=this.host)!=null&&t.contains(document.activeElement)||this.onBlur(e)})}handleWindowBlur(e){this.onBlur(e)}handleKeyDown(e){var t,n;let r=(t,n)=>{var r;e.preventDefault(),t!==void 0&&(this._isOpen=t,t||(r=this.refInput)==null||r.focus()),n?.()};switch(e.key){case`Down`:case`ArrowDown`:this.blockSuggestionMouseOver=!0,r(!0,()=>this.moveFocus(1));break;case`Up`:case`ArrowUp`:this.blockSuggestionMouseOver=!0,r(!0,()=>this.moveFocus(-1));break;case`Tab`:this._isOpen&&(this._isOpen=!this._isOpen,(t=this.refInput)==null||t.focus());break;case`Esc`:case`Escape`:this._isOpen=!1,r(!1);break;case` `:case`Enter`:case`NumpadEnter`:this._isOpen?this.selectFocusedOption()&&((n=this.refInput)==null||n.focus(),r(!1)):this.toggleListbox(e);break;case`Home`:this.blockSuggestionMouseOver=!0,r(void 0,()=>{this._isOpen&&(this._focusedOptionIndex=0,this.focusOption(this._focusedOptionIndex))});break;case`End`:this.blockSuggestionMouseOver=!0,r(void 0,()=>{this._isOpen&&(this._focusedOptionIndex=this._filteredOptions?this._filteredOptions.length-1:0,this.focusOption(this._focusedOptionIndex))});break;case`PageUp`:this.blockSuggestionMouseOver=!0,r(void 0,()=>this._isOpen&&this.moveFocus(-10));break;case`PageDown`:this.blockSuggestionMouseOver=!0,r(void 0,()=>this._isOpen&&this.moveFocus(10))}}constructor(e){t(this,e),this.refOptions=[],this.translateDeleteSelection=f(`kol-delete-selection`),this.translateNoResultsMessage=f(`kol-no-results-message`),this.isClearing=!1,this.setRefInput=e=>{this.refInput=e},this.toggleListbox=e=>{var t;if(e?.preventDefault(),!0!==this.state._disabled)if((t=this.refInput)==null||t.focus(),this._isOpen)this._isOpen=!1;else{this._isOpen=!0;let e=Array.isArray(this._filteredOptions)?this._filteredOptions.findIndex(e=>e.label===this._inputValue):-1;this._focusedOptionIndex=e>=0?e:-1,this.focusOption(this._focusedOptionIndex)}},this._focusedOptionIndex=-1,this._isOpen=!1,this._filteredOptions=[],this._inputValue=``,this.blockSuggestionMouseOver=!1,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this._value=null,this._hasClearButton=!0,this.state={_hideMsg:!1,_id:`id-${s()}`,_label:``,_options:[],_hasClearButton:!0},this.inputHasFocus=!1,this.controller=new w(this,`single-select`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validatePlaceholder(e){this.controller.validatePlaceholder(e)}validateAccessKey(e){this.controller.validateAccessKey(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validateOptions(e){this.controller.validateOptions(e),this._filteredOptions=e,this.updateInputValue(this._value)}validateRequired(e){this.controller.validateRequired(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateValue(e){this.controller.validateValue(e),this.oldValue=e,this.updateInputValue(e)}validateHasClearButton(e){this.controller.validateHasClearButton(e)}validateRows(e){this.controller.validateRows(e)}handleMouseEvent(){this.blockSuggestionMouseOver=!1}updateInputValue(e){if(Array.isArray(this._options)){let t=this._options.find(t=>t.value===e);this._inputValue=t?String(t.label):``}}componentWillLoad(){this.refOptions=[],this._touched=!0===this._touched,this.controller.componentWillLoad(),this.oldValue=this._value,this._filteredOptions=this.state._options,this.updateInputValue(this._value)}onChange(e){this.oldValue!==this.refInput?.value&&(this.oldValue=this.refInput?.value),this._isOpen||this.controller.onFacade.onChange(e,this._value)}onClick(e){var t;this.toggleListbox(e),(t=this.refInput)==null||t.focus(),this.controller.onFacade.onClick(e)}get host(){return r(this)}static get watchers(){return{_placeholder:[`validatePlaceholder`],_accessKey:[`validateAccessKey`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_options:[`validateOptions`],_required:[`validateRequired`],_shortKey:[`validateShortKey`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_value:[`validateValue`],_hasClearButton:[`validateHasClearButton`],_rows:[`validateRows`]}}};E.style={default:T};export{E as kol_single_select};