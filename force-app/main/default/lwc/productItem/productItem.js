import { api, LightningElement } from "lwc";

export default class ProductItem extends LightningElement {
  @api product;
  @api selectedProduct;

  get isSelected() {
    return this.product.Id === this.selectedProduct.Id;
  }

  selectProduct() {
    const selectEvent = new CustomEvent("select", {
      bubbles: true,
      composed: true,
      detail: this.product
    });
    this.dispatchEvent(selectEvent);
  }

  unselectProduct() {
    const selectEvent = new CustomEvent("select", {
      bubbles: true,
      composed: true,
      detail: { Id: "dummyId" }
    });
    this.dispatchEvent(selectEvent);
  }
}
