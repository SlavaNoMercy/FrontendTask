import { LightningElement, track, wire } from "lwc";
import createCase from "@salesforce/apex/SomeCompanyController.createCase";
import getRelatedContact from "@salesforce/apex/SomeCompanyController.getRelatedContact";
import getRelatedAccount from "@salesforce/apex/SomeCompanyController.getRelatedAccount";

export default class FormSubmit extends LightningElement {
  @track newCase = {
    title: " ",
    firstName: " ",
    secondName: " ",
    email: " ",
    phone: " ",
    companyType: " ",
    company: " ",
    description: " "
  };

  @wire(getRelatedContact, { contactEmail: "$newCase.email" })
  contact;

  @wire(getRelatedAccount, { companyName: "$newCase.company" })
  account;

  setCaseTitle(event) {
    console.log(event.target.value);
    this.newCase.title = event.target.value;
  }

  setCaseFirstName(event) {
    console.log(event.target.value);
    this.newCase.firstName = event.target.value;
  }

  setCaseSecondName(event) {
    console.log(event.target.value);
    this.newCase.secondName = event.target.value;
  }

  setCaseEmail(event) {
    console.log(event.target.value);
    this.newCase.email = event.target.value;
  }

  setCasePhone(event) {
    console.log(event.target.value);
    this.newCase.phone = event.target.value;
  }

  setCaseCompanyType(event) {
    console.log(event.target.value);
    this.newCase.companyType = event.target.value;
  }

  setCaseCompany(event) {
    console.log(event.target.value);
    this.newCase.company = event.target.value;
  }

  setCaseDescription(event) {
    console.log(event.target.value);
    this.newCase.description = event.target.value;
  }

  buildCase() {
    return {
      Origin: "Web",
      SuppliedName:
        this.newCase.title + ' ' + this.newCase.firstName + ' ' + this.newCase.secondName,
      SuppliedEmail: this.newCase.email,
      SuppliedPhone: this.newCase.phone,
      SuppliedCompany: this.newCase.company,
      SuppliedCompanyType: this.newCase.companyType,
      Description: this.newCase.description,
      ContactId: this.contact.data,
      AccountId: this.account.data
    };
  }

  sendCase(event) {
    console.log(JSON.stringify(this.buildCase()));
    createCase({ 
      newCaseJSON: this.buildCase(),
      title: this.newCase.title,
      firstName: this.newCase.firstName,
      lastName: this.newCase.secondName
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  }
}
