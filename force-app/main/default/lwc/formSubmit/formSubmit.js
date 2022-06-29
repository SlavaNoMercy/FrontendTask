import { LightningElement, track } from 'lwc';
import createCase from '@salesforce/apex/SomeCompanyController.createCase';

export default class FormSubmit extends LightningElement {
   @track newcase = {description:""}

   caseObj(){
    console.log(this.newcase.firstname);
   }

   sendCase(){
    createCase({caseJSON:JSON.stringify(this.case)});
   }
}