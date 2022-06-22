import { LightningElement, track } from 'lwc';

export default class MainComponent extends LightningElement {
    @track state = {
        firstPage:true,
        secondPage:false
    }

    handleNextPageEvent(){
        this.state.firstPage = false;
        this.state.secondPage = true;
    }

    handlePrevPageEvent(){
        this.state.firstPage = true;
        this.state.secondPage = false;
    }
}