import { LightningElement, track } from 'lwc';

export default class HeaderComponent extends LightningElement {
    buttonClicked; //defaulted to false

    @track menuClass = 'hamb';
    @track iconName = '';

    // Handles click on the 'Show/hide content' button
    handleToggleClick() {
        this.buttonClicked = !this.buttonClicked; //set to true if false, false if true.
        this.menuClass = this.buttonClicked ? 'hamb active' : 'hamb';
    }
}