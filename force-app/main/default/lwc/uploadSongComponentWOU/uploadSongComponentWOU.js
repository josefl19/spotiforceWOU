import { api, LightningElement } from 'lwc';
import ALBUM_FIELD from '@salesforce/schema/Song__c.Album__c';
import DURATION_FIELD from '@salesforce/schema/Song__c.Duration__c';
import SONGNAME_FIELD from '@salesforce/schema/Song__c.Name';
import ARTISTNAME_FIELD from '@salesforce/schema/Song__c.Artist__c';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class UploadSongComponentWOU extends LightningElement {
    @api recordId;
    fields = [ALBUM_FIELD, SONGNAME_FIELD, DURATION_FIELD, ARTISTNAME_FIELD];

    handleSongCreated(event) {
        this.dispatchEvent(new ShowToastEvent({
                title:'Success',
                message: 'New song added successfully',
                variant: 'success'
            })
        );

        window.location.href = 'https://wise-raccoon-kefkh5-dev-ed.preview.salesforce-communities.com/spotiforceWU/s/account/001IY000002OH1kYAG/edge-communications?app=commeditor';
    }
}