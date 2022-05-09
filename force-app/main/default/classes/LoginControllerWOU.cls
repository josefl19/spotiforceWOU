public with sharing class LoginControllerWOU {

    @AuraEnabled
    public static string startLogin(String mail, String password){
        try {
            Account acc = [SELECT Id FROM Account WHERE Email__c=:mail AND Passwd__c=:password WITH SECURITY_ENFORCED LIMIT 1];
            if(acc.Id) {
                PageReference pageRef = new PageReference('https://wise-raccoon-kefkh5-dev-ed.preview.salesforce-communities.com/spotiforceWU/s/profile');
                if(pageRef != null) return pageRef.getUrl();
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
