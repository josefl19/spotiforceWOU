import { LightningElement, track } from 'lwc';

export default class RegisterComponentWOU extends LightningElement {
    value = '';

    get options() {
        return [
            { label: `I'm a User`, value: 'user' },
            { label: `I'm an Artist`, value: 'artist'},
        ];
    }

    @track userVal = false;
    @track artistVal = false;

    handleChange(event) {     
        this.value = event.detail.value;        
        if (this.value == 'user'){
            this.userVal = true;
        }else{
            this.userVal = false;
        }
       
        if (this.value == 'artist'){
            this.artistVal = true;
        }else{
            this.artistVal = false;
        }
    }
}