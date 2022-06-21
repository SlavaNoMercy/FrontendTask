import { LightningElement, track } from "lwc";

export default class ProductSelection extends LightningElement {
  selectedProduct;
  @track msg;
  products = [
    {
      Id: "1stProduct",
      title: "GLOBAL COMPANY PAYMENT SYSTEM",
      symbol: "$",
      message: "3q",
      symbolcls: true,
      messagecls: false
    },
    {
      Id: "2ndProduct",
      title: "GLOBAL COMPANY MAILING SYSTEM",
      symbol: "@",
      message: "3w",
      symbolcls: true,
      messagecls: false
    },
    {
      Id: "3rdProduct",
      title: "GLOBAL COMPANY INDEX SYSTEM",
      symbol: "#",
      message: "3e",
      symbolcls: true,
      messagecls: false
    }
  ];
  
  constructor() {
      super();   
      this.template.addEventListener('select', this.handleSelect.bind(this));
  }

  handleSelect(event){
    const textVal = event.detail;
    this.msg = textVal;
    this.selectProduct(this.products,this.msg);
  }

  selectProduct(array,elementId){
    array.forEach(element => {
        if(element.Id===elementId){
            this.selectedProduct = element;
        }
    });
  }

}
