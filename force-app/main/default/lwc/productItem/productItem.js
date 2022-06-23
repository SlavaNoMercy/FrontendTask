import { api, LightningElement } from 'lwc';

export default class ProductItem extends LightningElement {
    @api product;

    selectProduct(){
        const selectEvent = new CustomEvent('select', {
            detail: this.product
        });
        this.dispatchEvent(selectEvent);
    }
}