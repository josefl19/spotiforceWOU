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
    public static String createUser(String firstName, String lastName, String email, String phone, String passwd, String tipo) {
        try {
            String accountId;
            ID contId;
            String nombreAcc;
            Boolean isArtist; 

            if(tipo == 'User') {
                isArtist = false;
                nombreAcc = firstName + ' ' + lastName;
             } else {
                isArtist = true;
                nombreAcc = lastName;
             }

            Account acc = new Account();
            acc.Name = nombreAcc;
            acc.Email__c = email;
            acc.Phone = phone;
            acc.Password__c = passwd;
            acc.Passwd__c = passwd;
            insert acc;

            ID acctId = acc.ID;

			Id userType = Schema.SObjectType.Contact.getRecordTypeInfosByName().get(tipo).getRecordTypeId();
            if(isArtist) {
                Contact con = new Contact(
                LastName = lastName,
                Email = email,
                Phone = phone,
                RecordTypeId = userType,
            	AccountId = acctId);
                insert con;
                contId = con.ID;
            } else {
                Contact con = new Contact(
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Phone = phone,
                RecordTypeId = userType,
            	AccountId = acctId);
                insert con;
                contId = con.ID;
            }

            //String userId = Site.createPortalUser(u, accountId, passwd);
            if(contId != null) {
                String emailResult = sendWelcomeMail(email, acctId, contId);
                if (passwd != null && passwd.length() > 1 && email != null) {
                    PageReference pageRef = new PageReference('https://wise-raccoon-kefkh5-dev-ed.preview.salesforce-communities.com/spotiforceWU/s/account/001IY000002OH1kYAG/edge-communications?app=commeditor');
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
    public static String sendWelcomeMail(String email, ID acctId, ID contId){
        try {
            String[] correos = new String[]{email} ;
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();         
            //mail.setSenderDisplayName(System.Label.Community_Email_Sender);
            mail.setTargetObjectId(contId);
            mail.setSenderDisplayName('Spotiforce');

            EmailTemplate emailTemplate = [SELECT Id,Subject,Description,HtmlValue,DeveloperName,Body FROM EmailTemplate WHERE Name = 'Welcome email'];

            mail.setTemplateId(emailTemplate.Id);
            mail.setWhatId(acctId);
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
