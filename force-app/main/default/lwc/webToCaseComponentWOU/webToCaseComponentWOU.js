import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class WebToCaseComponentWOU extends LightningElement {
    handleClick(event) {
        this.dispatchEvent(new ShowToastEvent({
                title: 'Form sent successfully',
                message: 'We will contact you shortly',
                variant: 'success'
            })
        );
        window.location.href = 'https://wise-raccoon-kefkh5-dev-ed.preview.salesforce-communities.com/spotiforceWU/s/account/001IY000002OH1kYAG/edge-communications?app=commeditor';
    }
}