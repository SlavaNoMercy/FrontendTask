import { LightningElement, api } from "lwc";


export default class MainComponentNavigation extends LightningElement {
  @api state;
  @api buttonactive;

  nextPageEvent() {
    const selectEvent = new CustomEvent("pagenav", {
      bubbles: true,
      detail: { page: "second" }
    });
    this.dispatchEvent(selectEvent);
  }
  prevPageEvent() {
    const selectEvent = new CustomEvent("pagenav", {
      bubbles: true,
      detail: { page: "first" }
    });
    this.dispatchEvent(selectEvent);
  }

  get FPnavigation() {
    return this.state === "first";
  }

  get SPnavigation() {
    return this.state === "second";
  }

  @api
  submitCase(){
    const submitEvent = new CustomEvent("submit", {
      bubbles: true,
      composed: true
    });
    console.log("event flows");
    this.dispatchEvent(submitEvent);
  }
}
