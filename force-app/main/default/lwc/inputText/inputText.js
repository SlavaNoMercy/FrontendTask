import { api, LightningElement } from "lwc";

export default class InputText extends LightningElement {
  @api fieldname;
  @api classname;
  @api regexp;
  @api requiredfield;
  @api requiredfieldmark;

  @api setCaseField(event) {
    // return;
    if (!event.target.value.match(this.regexp)) {
      //event.target.classList.add("wrong-pattern");
      const divCheck = this.template.querySelector('[data-id="check-mark"]');
      divCheck.classList.remove('checked');
    }
    else {
        const divCheck = this.template.querySelector('[data-id="check-mark"]');
        divCheck.classList.add('checked');
    }
    // event.target.classList.remove("wrong-pattern");
    const setFieldVal = new CustomEvent("setfield", {
      bubbles: true,
      composed: true,
      detail: { fieldName: this.fieldname, value: event.target.value }
    });
    this.dispatchEvent(setFieldVal);
  }

  @api checkValidity(){

  }
}
