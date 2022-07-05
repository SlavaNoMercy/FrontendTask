import { LightningElement, track, wire } from "lwc";
import createCase from "@salesforce/apex/SomeCompanyController.createCase";
import getRelatedContact from "@salesforce/apex/SomeCompanyController.getRelatedContact";
import getRelatedAccount from "@salesforce/apex/SomeCompanyController.getRelatedAccount";
import CASE_OBJECT from "@salesforce/schema/Case";
import FULL_NAME from "@salesforce/schema/Case.SuppliedName";
import CASE_EMAIL from "@salesforce/schema/Case.SuppliedEmail";
import CASE_PHONE from "@salesforce/schema/Case.SuppliedPhone";
import CASE_COMPANY from "@salesforce/schema/Case.SuppliedCompany";
import CASE_COMPANY_TYPE from "@salesforce/schema/Case.SuppliedCompanyType__c";
import CASE_DESCRIPTION from "@salesforce/schema/Case.Description";

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

  textFieldSet = [
    {
      fieldName: "First name",
      className: "input-container ic1 inline-second-item",
      fieldnamecheck: "firstname-check",
      requiredfield: true,
      relatedCaseField: "firstName",
      requiredfieldmark: "required-field",
      regexp: "^[a-zA-Z ,.'-]+$"
    },
    {
      fieldName: "Second name",
      className: "input-container ic2",
      fieldnamecheck: "secondname-check",
      requiredfield: true,
      relatedCaseField: "secondName",
      requiredfieldmark: "required-field",
      regexp: "^[a-zA-Z ,.'-]+$"
    },
    {
      fieldName: "Email address",
      className: "input-container ic2",
      fieldnamecheck: "email-check",
      requiredfield: true,
      relatedCaseField: "email",
      requiredfieldmark: "required-field",
      regexp: "[a-z0-9._%+-]+@(?:[a-z0-9])+[a-z]+(?:[a-z0-9])+(.[a-z]{2,}){1,}$"
    },
    {
      fieldName: "Phone number",
      className: "input-container ic2",
      fieldnamecheck: "phone-check",
      requiredfield: true,
      relatedCaseField: "phone",
      requiredfieldmark: "required-field",
      regexp: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
    }
    // ,
    // { !otdelno!
    //   fieldName: "Company name",
    //   className: "input-container ic2",
    //   fieldnamecheck: "company-check",
    //   requiredfield: true,
    //   requiredfieldmark: "required-field",
    //   regexp: "^[a-zA-Z ,.'-]+$"
    // }
  ];

  connectedCallback() {
    this.template.addEventListener("submit", this.handleSubmit.bind());
  }

  @wire(getRelatedContact, { contactEmail: "$newCase.email" })
  contact;

  @wire(getRelatedAccount, { companyName: "$newCase.company" })
  account;

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
    console.log(this.newCase.firstName);
    console.log(this.newCase.secondName);
    console.log(this.newCase.email);
    console.log(this.newCase.phone);
    console.log(this.newCase.company);
  }

  setCaseDescription(event) {
    this.newCase.description = event.target.value;
  }

  setCaseCompanyType(event) {
    this.newCase.description = event.target.value;
  }

  setCaseTitle(event) {
    this.newCase.description = event.target.value;
  }
  buildCase() {
    return {
      Origin: "Web",
      SuppliedName:
        this.newCase.title +
        " " +
        this.newCase.firstName +
        " " +
        this.newCase.secondName,
      SuppliedEmail: this.newCase.email,
      SuppliedPhone: this.newCase.phone,
      SuppliedCompany: this.newCase.company,
      SuppliedCompanyType: this.newCase.companyType,
      Description: this.newCase.description,
      ContactId: this.contact.data,
      AccountId: this.account.data
    };
  }

  sendCase() {
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
  }

  handleSubmit() {
    if (!this.checkValidity()) {
      //alert("invalid input!");
      return;
    }
    this.sendCase();
  }

  checkValidity() {
    for (let key of Object.keys(this.newCase)) {
      if ((this.newCase[key] === " ") & (key !== "companyType")) {
        return false;
      }
    }
    for (let item in this.querySelectorAll([".c-input-Text"])) {
      if (!item.checkValidity()) {
        return false;
      }
    }
    return true;
  }
}
