public with sharing class RegisterControllerWOU {
    
    @AuraEnabled
    public static Boolean accountExist(String email){
        try {
            List<Account> account = [SELECT Id, Name FROM Account WHERE Email__c=:email WITH SECURITY_ENFORCED];
            return !account.isEmpty();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String createUser(String firstName, String lastName, String email, String phone, String passwd) {
        try {
            String accountId;
            
            Account acc = new Account();
            acc.Name = firstName + ' ' + lastName;
            acc.Email__c = email;
            acc.Password__c = passwd;
            insert acc;

            ID acctId = acc.ID;

			Id userType = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('User').getRecordTypeId();
            Contact con = new Contact(
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Phone = phone,
                RecordTypeId = userType,
            	AccountId = acctId);
            insert con;

            ID contId = con.ID;

            //String userId = Site.createPortalUser(u, accountId, passwd);
            if(contId != null) {
                String emailResult = sendWelcomeMail(email);
                if (passwd != null && passwd.length() > 1 && email != null) {
                    PageReference pageRef = new PageReference('https://wise-raccoon-kefkh5-dev-ed.preview.salesforce-communities.com/spotiforceWU/s/profile');
                    if(pageRef != null) return pageRef.getUrl();
                }
                else {
                    ApexPages.PageReference page = System.Page.SiteRegisterConfirm;
                    page.setRedirect(true);
                    return page.getUrl();
                }
            }
            //throw new CalloutException();
            return null;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String sendWelcomeMail(String email){
        try {
            String[] correos = new String[]{email} ;
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();         
            //mail.setSenderDisplayName(System.Label.Community_Email_Sender);
            //mail.setTargetObjectId(userId);
            //mail.setTemplateId(welcomeTemplate[0].Id);
            //mail.setSaveAsActivity(false);
            mail.setToAddresses(correos);
            mail.setSubject('Cuenta creada satisfactoriamente!');
            mail.setPlainTextBody('Tu cuenta ha sido creada correctamente. Te damos la bienvenida ' + email);
            Messaging.sendEmail( new List<Messaging.SingleEmailMessage>{mail} );
            return 'success';
        } catch (Exception e) {            
            throw new AuraHandledException(e.getMessage());
        }
    }

}
