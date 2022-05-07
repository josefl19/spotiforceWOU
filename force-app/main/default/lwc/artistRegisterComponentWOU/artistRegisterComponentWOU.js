import { LightningElement, track } from 'lwc';

// Imports de Apex Controller
import accountExist from '@salesforce/apex/RegisterControllerWOU.accountExist';
import createUser from '@salesforce/apex/RegisterControllerWOU.createUser';

// Imports de lightning
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class ArtistRegisterComponentWOU extends NavigationMixin(LightningElement) {
    @track name;
    @track email;
    @track phone;
    @track passwd;
    @track confirm_passwd;

    handleCreate(event) {
        console.log(event.detail);
        console.log(this.name && this.email && this.phone && this.passwd && this.confirm_passw)
        
        if(this.name && this.email && this.phone && this.passwd && this.confirm_passwd) {
            if(this.passwd != this.confirm_passwd) {
                this.dispatchEvent(new ShowToastEvent({
                        title:'Error',
                        message:'Entered passwords don\'t match. \nCheck the fields, please',
                        variant:'error'
                    }),
                );
                event.preventDefault();
                return;
            } 
            
            let emailCheck = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.email);
            if(emailCheck == null || emailCheck == undefined || emailCheck==false) {
                this.dispatchEvent(new ShowToastEvent({
                        title:'Error',
                        message:'Please enter a valid email address',
                        variant:'error'
                    }),
                );
                return;
            }
            
            let passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(this.passwd);
            if(passwordCheck == null || passwordCheck == undefined || passwordCheck == false){
                this.dispatchEvent(new ShowToastEvent({
                        title:'Error',
                        message:'Password must be Minimum eight characters, at least one letter, one number and one special character',
                        variant:'error'
                    }),
                );
                return;
            }

            event.preventDefault();

            accountExist({email: this.email})
            .then((result) => {
                console.log('Account exist: ' + result, typeof result);
                if(result != null && result != undefined && result == true){
                    this.dispatchEvent(new ShowToastEvent({
                            title:'Error',
                            message:'Your username already exists somewhere on the Spotiforce',
                            variant:'error'
                        }),
                    );
                } else {
                    console.log(this.name, this.email, this.phone, this.passwd);
                    createUser({firstName: this.name, lastName: this.name, email: this.email, phone: this.phone, passwd: this.passwd, tipo: 'Artist'})
                    .then((result) => {
                        console.log('Entrada a then de createUser')
                        console.log(result);
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
            }).catch((error) => {
                console.log('Catch de alreadyExist')
                this.error = error;
                if(error && error.body && error.body.message){
                    console.log('error msg-', error.body.message);
                }
            });
        } else {
            this.dispatchEvent(new ShowToastEvent({
                    title:'Error',
                    message:'Complete all the fields to continue with register.',
                    variant:'error'
                }),
            );
        }
    }

    navigateToUserPage() {
        console.log('Hola desde Navigate');
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                name: 'Profile__c'
            }
        });
    }

    onEmailInvalid(event){
        if (!event.target.validity.valid) {
            event.target.setCustomValidity('Enter a valid email address')
        }
    }

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    handlePasswordChange(event) {
        this.passwd = event.target.value;
    }

    handleConfirmPasswordChange(event) {
        this.confirm_passwd = event.target.value;
    }
}