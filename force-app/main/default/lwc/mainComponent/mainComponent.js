import { LightningElement, track } from 'lwc';

export default class MainComponent extends LightningElement {
    @track state = {
        firstPage:true,
        secondPage:false
    }
    @track buttonActive = false;
    @track selectedProduct;

    constructor() {
        super();
        this.template.addEventListener("select", this.handleSelectProduct.bind(this));
        this.template.addEventListener("unselect", this.handleUnselectProduct.bind(this));
      }

    handleNextPageEvent(){
        this.state.firstPage = false;
        this.state.secondPage = true;
    }

    handlePrevPageEvent(){
        this.state.firstPage = true;
        this.state.secondPage = false;
        this.buttonActive = false;
    }

    handleSelectProduct(event){
        let chosenProduct = event.detail;
        if(chosenProduct.Id==="dummyId"){ return;}
        this.buttonActive = true;
        this.selectedProduct = chosenProduct;
    }

    handleUnselectProduct(){
        this.buttonActive = false;
    }


}