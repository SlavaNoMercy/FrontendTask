import { api, LightningElement, track, wire } from "lwc";
import createCaseRecord from "@salesforce/apex/SomeCompanyController.createCaseRecord";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getRelatedContact from "@salesforce/apex/SomeCompanyController.getRelatedContact";
import getRelatedAccount from "@salesforce/apex/SomeCompanyController.getRelatedAccount";
import FULL_NAME from "@salesforce/schema/Case.SuppliedName";
import CASE_EMAIL from "@salesforce/schema/Case.SuppliedEmail";
import CASE_PHONE from "@salesforce/schema/Case.SuppliedPhone";
import CASE_COMPANY from "@salesforce/schema/Case.SuppliedCompany";
import CASE_COMPANY_TYPE from "@salesforce/schema/Case.SuppliedCompanyType__c";
import CASE_DESCRIPTION from "@salesforce/schema/Case.Description";
import CASE_CONTACT from "@salesforce/schema/Case.ContactId";
import CASE_ACCOUNT from "@salesforce/schema/Case.AccountId";

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

  titles = ["Mr.", "Ms.", "Mrs.", "Dr."];
  companyTypes = [
    "Prospecting",
    "Customer-Direct",
    "Customer-Channel",
    "Channel Partner/Reseller",
    "Installation Partner",
    "Technology Partner",
    "Other",
    "Customer",
    "Pending"
  ];

  textFieldSet = [
    {
      fieldName: "First name",
      className: "input-container ic1 inline-second-item",
      fieldnamecheck: "firstname-check",
      requiredfield: true,
      inputfieldname: "firstname",
      requiredfieldmark: "required-field",
      regexp: "^[a-zA-Z ,.'-]+$"
    },
    {
      fieldName: "Second name",
      className: "input-container ic2",
      fieldnamecheck: "secondname-check",
      requiredfield: true,
      inputfieldname: "secondname",
      requiredfieldmark: "required-field",
      regexp: "^[a-zA-Z ,.'-]+$"
    },
    {
      fieldName: "Email address",
      className: "input-container ic2",
      fieldnamecheck: "email-check",
      requiredfield: true,
      inputfieldname: "email",
      requiredfieldmark: "required-field",
      regexp: "[a-z0-9._%+-]+@(?:[a-z0-9])+[a-z]+(?:[a-z0-9])+(.[a-z]{2,}){1,}$"
    },
    {
      fieldName: "Phone number",
      className: "input-container ic2",
      fieldnamecheck: "phone-check",
      requiredfield: true,
      inputfieldname: "phone",
      requiredfieldmark: "required-field",
      regexp: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
    }
  ];

  @wire(getRelatedContact, { contactEmail: "$newCase.email" })
  contact = "";

  @wire(getRelatedAccount, { companyName: "$newCase.company" })
  account = "";

  setCaseField(event) {
    if (event.detail.fieldName === "First name") {
      this.newCase.firstName = event.detail.value;
    }
    if (event.detail.fieldName === "Second name") {
      this.newCase.secondName = event.detail.value;
    }
    if (event.detail.fieldName === "Email address") {
      this.newCase.email = event.detail.value;
    }
    if (event.detail.fieldName === "Phone number") {
      this.newCase.phone = event.detail.value;
    }
    if (event.detail.fieldName === "Company name") {
      this.newCase.company = event.detail.value;
    }
  }

  setCaseDescription(event) {
    this.newCase.description = event.target.value;
  }

  setCaseCompanyType(event) {
    this.newCase.companyType = event.target.value;
  }

  setCaseTitle(event) {
    this.newCase.title = event.target.value;
  }

  createCase() {
    const fields = {};
    fields[FULL_NAME.fieldApiName] =
      this.newCase.title +
      " " +
      this.newCase.firstName +
      " " +
      this.newCase.secondName;
    fields[CASE_EMAIL.fieldApiName] = this.newCase.email;
    fields[CASE_PHONE.fieldApiName] = this.newCase.phone;
    fields[CASE_COMPANY.fieldApiName] = this.newCase.company;
    fields[CASE_COMPANY_TYPE.fieldApiName] = this.newCase.companyType;
    fields[CASE_DESCRIPTION.fieldApiName] = this.newCase.description;
    fields[CASE_CONTACT.fieldApiName] = this.contact.data;
    fields[CASE_ACCOUNT.fieldApiName] = this.account.data;
    createCaseRecord({ newCase: fields })
      .then((data) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: JSON.stringify(data.body),
            variant: "success"
          })
        );
      })
      .catch((error) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error creating record",
            message: JSON.stringify(error.body),
            variant: "error"
          })
        );
      });
  }

  @api
  handleSubmit() {
    if (!this.checkValidity()) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Cannot submit form",
          message: "Fill the required fields!",
          variant: "warning",
          mode: "dismissable"
        })
      );
      return;
    }
    this.createCase();
  }

  checkValidity() {
    const inputArr = this.template.querySelectorAll("c-input-text");
    for (let item of inputArr) {
      if (!item.checkInputValidity()) {
        return false;
      }
    }
    if ((this.newCase.title === " ") | (this.newCase.description === " ")) {
      return false;
    }
    return true;
  }
}
