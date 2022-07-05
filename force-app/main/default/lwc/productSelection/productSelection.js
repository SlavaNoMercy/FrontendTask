import { LightningElement, track } from "lwc";

export default class ProductSelection extends LightningElement {
  @track selectedProduct = { Id: "dummyId" };
  @track products = [
    {
      Id: "1stProduct",
      title: "GLOBAL COMPANY PAYMENT SYSTEM",
      symbol: "$",
      message: "The employee and documentation, indexing system. Cases related to index errors, duplicated indexes, naming errors, index definition errors."
    },
    {
      Id: "2ndProduct",
      title: "GLOBAL COMPANY MAILING SYSTEM",
      symbol: "@",
      message: "The employee and documentation, indexing system. Cases related to index errors, duplicated indexes, naming errors, index definition errors."
    },
    {
      Id: "3rdProduct",
      title: "GLOBAL COMPANY INDEX SYSTEM",
      symbol: "#",
      message: "The employee and documentation, indexing system. Cases related to index errors, duplicated indexes, naming errors, index definition errors."
    }
  ];

  connectedCallback() {
    this.template.addEventListener("select", this.handleSelect.bind(this));
  }

  handleSelect(event) {
    if(event.detail.Id==="dummyId"){
      this.selectedProduct = event.detail;
      return;
    }
    const product = event.detail;
    this.choseProduct(this.products, product);
  }

  choseProduct(array, product) {
    array.forEach((element) => {
      if (element.Id === product.Id) {
        this.selectedProduct = element;
      }
    });
  }
}
