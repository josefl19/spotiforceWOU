import { LightningElement, api, wire } from 'lwc';

import isUser from '@salesforce/apex/AccountControllerWOU.isUser';

export default class ProfileComponenteWOU extends LightningElement {
    @api recordId;

    @wire(isUser, {id: '$recordId'})
    userComp;

    get userComp() {
        return this.userComp.data.RecordType.Name.value;
    }
}