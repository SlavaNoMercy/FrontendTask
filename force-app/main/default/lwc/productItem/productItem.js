import { api, LightningElement } from 'lwc';

export default class ProductItem extends LightningElement {
    @api product;

    selectProduct(){
        const selectEvent = new CustomEvent('select', {
            detail: this.product.Id
        });
        // Fire the custom event
        this.dispatchEvent(selectEvent);
        this.template.querySelector(['data-id="symbol"']).className('element-symbol-hide');
        //symbol.remove('element-symbol');
        //symbol.add('element-symbol-hide');
        this.template.querySelector(['data-id="message"']).className('element-message');
        //message.remove('element-message-hide');
        //message.add('element-message');
    }
}