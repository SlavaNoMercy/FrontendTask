import { api, LightningElement } from 'lwc';

export default class ProductItem extends LightningElement {
    @api product;
    @api selectedProduct;

    get isSelected(){
        if(this.product.Id===this.selectedProduct.Id){
            return true;
        }
        return false;
    }

    selectProduct(){
        const selectEvent = new CustomEvent('select', {
            bubbles: true,
            composed: true,
            detail: this.product
        });
        this.dispatchEvent(selectEvent);
    } 
}