public with sharing class AccountControllerWOU {
    @AuraEnabled
    public static String updateSuscription(String id){
        try {
            Account accUpdate = [SELECT Date_of_Purchase__c FROM Account WHERE Id=:id WITH SECURITY_ENFORCED LIMIT 1];
            accUpdate.Date_of_Purchase__c = System.today();
            update accUpdate;

            return 'Success';

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
