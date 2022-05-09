public with sharing class AlbumSongsControllerWOU {
    @AuraEnabled
    public static string idArtist(String id){
        try {
            String idArtistContact;
            Contact cont = [SELECT Id FROM Contact WHERE AccountId=:id WITH SECURITY_ENFORCED LIMIT 1];
            idArtistContact = cont.Id;

            return idArtistContact;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static string nameArtist(String id){
        try {
            String nameArtistContact;
            Contact cont = [SELECT Name FROM Contact WHERE AccountId=:id WITH SECURITY_ENFORCED LIMIT 1];
            nameArtistContact = cont.Name;

            return nameArtistContact;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
