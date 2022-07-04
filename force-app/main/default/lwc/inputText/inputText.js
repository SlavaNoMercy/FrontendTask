import { api, LightningElement } from 'lwc';

export default class InputText extends LightningElement {
    @api fieldname;
    @api classname;
    @api fieldnamecheck;
    @api regexp;
    @api requiredfield;
    @api requiredfieldmark;
    
    setCaseField(event){
       // return;
       if(!event.target.value.match(this.regexp)){
            event.target.classList.add("wrong-pattern");
            return;
        }
        event.target.classList.remove("wrong-pattern")
        // set prompted val to case
    }


}