import { LightningElement, track } from "lwc";

export default class ProductSelection extends LightningElement {
  @track selectedProduct = { Id: "dummyId" };
  @track products = [
    {
      Id: "1stProduct",
      title: "GLOBAL COMPANY PAYMENT SYSTEM",
      symbol: "$",
      message: "3q",
      caseTitles: [
        "Payment",
        "Connection",
        "Other"
      ]
    },
    {
      Id: "2ndProduct",
      title: "GLOBAL COMPANY MAILING SYSTEM",
      symbol: "@",
      message: "3w",
      caseTitles: [
        "Mailing",
        "Connection",
        "Other"
      ]
    },
    {
      Id: "3rdProduct",
      title: "GLOBAL COMPANY INDEX SYSTEM",
      symbol: "#",
      message: "3e",
      caseTitles: [
        "Indexing",
        "Connection",
        "query in loop(x2)",
        "Other"
      ]
    }
  ];

  constructor() {
    super();
    this.template.addEventListener("select", this.handleSelect.bind(this));
    this.template.addEventListener("unselect", this.handleUnselect.bind(this));
  }

  handleSelect(event) {
    const product = event.detail;
    this.choseProduct(this.products, product);
  }

  handleUnselect(){
    this.selectedProduct = {Id:"dummyId"};
  }

  choseProduct(array, product) {
    array.forEach((element) => {
      if (element.Id === product.Id) {
        this.selectedProduct = element;
      }
    });
  }
}
