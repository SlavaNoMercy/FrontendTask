import { api, LightningElement } from 'lwc';

export default class MainComponentHeader extends LightningElement {
    @api currentpage;

    get firstlabel(){
        let classLabel = "status-element";
        if(this.currentpage==="first"){
            classLabel = "status-element";
        }
        else {
            classLabel = "status-element passed";
        }
        return classLabel;
    }

    get secondlabel(){
        let classLabel = "status-element";
        if(this.currentpage==="first"){
            classLabel = "status-element next disabled";
        }
        else {
            classLabel = "status-element next";
        }
        return classLabel;
    }
}