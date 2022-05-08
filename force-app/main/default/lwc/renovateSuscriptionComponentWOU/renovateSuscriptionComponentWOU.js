import { LightningElement, api, wire } from 'lwc';
import updateSuscription from '@salesforce/apex/AccountControllerWOU.updateSuscription';
import renewAvailable from '@salesforce/apex/AccountControllerWOU.renewAvailable';

export default class RenovateSuscriptionComponentWOU extends LightningElement {
    @api recordId;

    @wire(renewAvailable, {id: '$recordId'})
    available;

    get available() {
        return this.available.data.Suscription_status__c.value;
    }

    handleClick(event) {
        updateSuscription({id: this.recordId})
        .then((result) => {
            if(result){                         
                console.log(result);
                window.location.href = result;
            }
        }).catch((error) => {
            console.log('Error en then')
            console.log('error-', error.body);

            if(error && error.body && error.body.message){
                this.dispatchEvent(new ShowToastEvent({
                        title:'Error',
                        message: error.body.message,
                        variant:'error'
                    }),
                );
            }
        });
    }
}