import { LightningElement, wire } from 'lwc';
import { getProducts } from '@salesforce/apex/SomeCompanyController.getProducts';

export default class ProductSelection extends LightningElement {
    selectedProduct;
    @wire(getProducts) products;

    
}