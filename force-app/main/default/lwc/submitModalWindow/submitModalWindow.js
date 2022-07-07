import { LightningElement, api } from "lwc";

export default class SubmitModalWindow extends LightningElement {
  @api isModalOpen = false;

  @api title;
  @api content;
  @api variant;

  @api
  closeModal() {
    const closeEvent = CustomEvent("closemodal", {});
    this.dispatchEvent(closeEvent);
  }

  get headerClass() {
    return "slds-modal__header " + this.variant;
  }
  get contentClass() {
    return "slds-modal__content slds-p-around_medium " + this.variant;
  }
  get footerClass() {
    return "slds-modal__footer " + this.variant;
  }
  get buttonClass() {
    return "slds-button slds-button_neutral " + this.variant;
  }
}
