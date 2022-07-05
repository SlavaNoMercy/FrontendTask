import { LightningElement, track } from "lwc";

const pages = {
  firstPage: "first",
  secondPage: "second"
};

export default class MainComponent extends LightningElement {
  @track buttonActive = false;
  @track selectedProduct;

  currentPage = "first";

  get isFPActive() {
    return this.currentPage === pages.firstPage;
  }
  get isSPActive() {
    return this.currentPage === pages.secondPage;
  }

  connectedCallback() {
    this.template.addEventListener(
      "select",
      this.handleSelectProduct.bind(this)
    );
    //this.template.addEventListener("unselect",this.handleUnselectProduct.bind(this));
    //this.template.addEventListener("nextPage",this.handleNextPageEvent.bind(this));
    //this.template.addEventListener("prevPage",this.handlePrevPageEvent.bind(this));
  }

  handlePageNavEvent(event) {
    this.currentPage = event.detail.page;
    this.buttonActive = false;
  }

  handleSelectProduct(event) {
    let chosenProduct = event.detail;
    if (chosenProduct.Id === "dummyId") {
      this.selectedProduct = chosenProduct;
      this.buttonActive = false;
      return;
    }
    this.buttonActive = true;
    this.selectedProduct = chosenProduct;
  }
}
