public without sharing class SomeCompanyController {
  @AuraEnabled
  public static String createCaseRecord(Case newCase) {
    System.debug(newCase);
    //Case newCase = (Case)JSON.deserialize(newCaseJSON, Case.class);
    try {
      if (newCase.AccountId == '') {
        Account acc = new Account(
          Name = newCase.SuppliedCompany,
          Type = newcase.SuppliedCompanyType__c
        );
        insert acc;
        newCase.AccountId = acc.Id;
        System.debug('newCase account check');
      }
      if (newCase.ContactId == '') {
        List<String> contactName = newCase.SuppliedName.split(' ', 3);
        Contact con = new Contact(
          Title = contactName[0],
          FirstName = contactName[1],
          LastName = contactName[2],
          Email = newCase.SuppliedEmail,
          Phone = newCase.SuppliedPhone,
          AccountId = newCase.AccountId
        );
        insert con;
        newCase.ContactId = con.Id;
        System.debug('Case contact check');
      }
      newCase.Subject = 'Some company Q&A';
      newCase.Origin = 'Web';
      insert newCase;
      return 'Case created!';
    } catch (Exception e) {
      return e.getMessage();
    }
  }

  @AuraEnabled(cacheable=true)
  public static String getRelatedContact(String email) {
    try {
      email = '%' + email + '%';
      Contact contact = [SELECT Id FROM Contact WHERE Email = :email LIMIT 1];
      return contact.Id;
    } catch (Exception e) {
      return '';
    }
  }

  @AuraEnabled(cacheable=true)
  public static String getRelatedAccount(String companyName) {
    try {
      companyName = '%' + companyName + '%';
      Account account = [
        SELECT Id
        FROM Account
        WHERE Name = :companyName
        LIMIT 1
      ];
      return account.Id;
    } catch (Exception e) {
      return '';
    }
  }
}
