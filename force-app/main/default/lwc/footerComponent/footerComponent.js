import { LightningElement } from 'lwc';
import yearLabel from '@salesforce/label/c.Current_Year'

export default class FooterComponent extends LightningElement {
    label = yearLabel;
}