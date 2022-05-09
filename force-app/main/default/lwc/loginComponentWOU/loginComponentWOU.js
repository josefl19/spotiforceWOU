import { LightningElement, track } from 'lwc';

import startLogin from '@salesforce/apex/LoginControllerWOU.startLogin';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class LoginComponentWOU extends LightningElement {
    @track mail;
    @track password;

    handleLogin(event) {
        console.log(this.mail, this.password);
        if( this.mail && this.password ) {
            event.preventDefault();

            startLogin({mail: this.mail, password: this.password})
            .then((result) => {
                console.log('En redireccion');
                console.log(result);
                window.location.href = result;
            })
            .catch((error) => {
                console.log(error.body);
                this.dispatchEvent(new ShowToastEvent({
                        title:'Error',
                        message: error.body.message,
                        variant:'error'
                    }),
                );
            });
        } else {
            this.dispatchEvent(new ShowToastEvent({
                    title:'Error',
                    message: 'Compleate all the fields required',
                    variant:'error'
                }),
            );
        }
    }

    handleMailChange(event) {
        this.mail = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }
}