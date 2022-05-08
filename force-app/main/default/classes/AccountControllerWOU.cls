public with sharing class AccountControllerWOU {
    @AuraEnabled
    public static String updateSuscription(String id){
        try {
            Account accUpdate = [SELECT Date_of_Purchase__c FROM Account WHERE Id=:id WITH SECURITY_ENFORCED LIMIT 1];
            accUpdate.Date_of_Purchase__c = System.today();
            update accUpdate;

            PageReference pageRef = new PageReference('https://wise-raccoon-kefkh5-dev-ed.preview.salesforce-communities.com/spotiforceWU/s/profile');
            return pageRef.getUrl();

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable = true)
    public static Boolean renewAvailable(String id){
        try {
            Boolean available;
            Account acc = [SELECT Suscription_status__c FROM Account WHERE Id=:id WITH SECURITY_ENFORCED LIMIT 1];
            
            if(acc.Suscription_status__c == 'Active') {
                available = false;
            } else {
                available = true;
            }

            return available;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
