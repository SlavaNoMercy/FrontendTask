import { api, LightningElement } from "lwc";

export default class InputText extends LightningElement {
  @api fieldname;
  @api classname;
  @api inputname;
  @api regexp;
  @api requiredfield;
  @api requiredfieldmark;

  @api setCaseField(event) {
    if (!event.target.value.match(this.regexp)) {
      const divCheck = this.template.querySelector('[data-id="check-mark"]');
      const divContainer = this.template.querySelector('[data-id="container"]');
      divCheck.classList.remove("checked");
      divContainer.classList.add("incorrect");
    } else {
      const divCheck = this.template.querySelector('[data-id="check-mark"]');
      const divContainer = this.template.querySelector('[data-id="container"]');
      divCheck.classList.add("checked");
      divContainer.classList.remove("incorrect");
    }
    const setFieldVal = new CustomEvent("setfield", {
      bubbles: true,
      composed: true,
      detail: { fieldName: this.fieldname, value: event.target.value }
    });
    this.dispatchEvent(setFieldVal);
  }

  @api checkInputValidity() {
    const inputField = this.template.querySelector('[data-id="input"]');
    if (!inputField.value.match(this.regexp)) {
      return false;
    }
    return true;
  }
}
