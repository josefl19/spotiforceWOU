import { LightningElement, api, wire } from 'lwc';

import idArtist from '@salesforce/apex/AlbumSongsControllerWOU.idArtist';
import nameArtist from '@salesforce/apex/AlbumSongsControllerWOU.nameArtist';

// Import fields del objeto Album
import ALBUM_NAME_FIELD from '@salesforce/schema/Album__c.Name';
import DATE_RELEASE_FIELD from '@salesforce/schema/Album__c.Date_Release__c';
import ARTIST_FIELD from '@salesforce/schema/Album__c.Artist__c';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class UploadAlbumComponent extends LightningElement {
    @api recordId;
    fields = [ALBUM_NAME_FIELD, DATE_RELEASE_FIELD, ARTIST_FIELD];

    @wire(idArtist, {id: '$recordId'})
    idRecordArtist;

    @wire(nameArtist, {id: '$recordId'})
    nameArtist;

    get idRecordArtist() {
        return this.idRecordArtist.data.Id.value;
    }

    get nameArtist() {
        return this.nameArtist.data.Name.value;
    }

    handleAlbumCreated(event) {
        this.dispatchEvent(new ShowToastEvent({
                title:'Success',
                message: 'New album added successfully',
                variant: 'success'
            })
        );
    }
}