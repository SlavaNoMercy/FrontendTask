import { LightningElement, track } from 'lwc';

export default class HeaderComponent extends LightningElement {
    buttonClicked;

    @track menuClass = 'hamb';
    @track iconName = '';

    handleToggleClick() {
        this.buttonClicked = !this.buttonClicked;
        this.menuClass = this.buttonClicked ? 'hamb active' : 'hamb';
    }
}