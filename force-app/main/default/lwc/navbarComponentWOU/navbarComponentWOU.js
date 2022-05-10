import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import HEADER_IMG from '@salesforce/resourceUrl/SpotiforceHeader';

export default class NavbarComponentWOU extends NavigationMixin(LightningElement) {
    headerImage = HEADER_IMG;

    urlHome = 'https://wise-raccoon-kefkh5-dev-ed.preview.salesforce-communities.com/spotiforceWU/s/?app=commeditor';
    urlProfile = 'https://wise-raccoon-kefkh5-dev-ed.preview.salesforce-communities.com/spotiforceWU/s/account/001IY000002OH1kYAG/edge-communications?app=commeditor';
    urlAlbums = 'https://wise-raccoon-kefkh5-dev-ed.preview.salesforce-communities.com/spotiforceWU/s/album/Album__c/00BIY000002CYSu2AO?app=commeditor';
    urlSongs = 'https://wise-raccoon-kefkh5-dev-ed.preview.salesforce-communities.com/spotiforceWU/s/song/Song__c/00BIY000002CYU22AO?app=commeditor';
    urlRegister = 'https://wise-raccoon-kefkh5-dev-ed.preview.salesforce-communities.com/spotiforceWU/s/registercustom?app=commeditor';
    urlLogin = 'https://wise-raccoon-kefkh5-dev-ed.preview.salesforce-communities.com/spotiforceWU/s/login/?previewAuth=1CAAAAYCzowl5AAAAAAAAAAAAAAAAAAAAAAAA7J7-9rh98ZAVhBzgL_R8ukV_t0hzChfyTWj10WW5coNwzSGMlYLC32-v1Ij_VNZ3yHMMQEtBK1ee7Nlkbtxj7eN_h8Xskep9DrakSgIQhuNtA'
}