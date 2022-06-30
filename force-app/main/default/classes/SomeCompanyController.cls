public without sharing class SomeCompanyController {
  @AuraEnabled(cacheable=true)
  public static String createCase(
    String newCaseJSON,
    String title,
    String firstName,  //kostyl
    String lastName
  ) {
    try {
      // if (newCaseJSON==null) {
      //   return 'Error. Null obj refference';
      // }
      ParseNewCase newCase = ParseNewCase.parse(newCaseJSON);
      System.debug(newCase);
      if (newCase.AccountId == '') {
        Account acc = new Account(Name = newCase.SuppliedCompany);
        insert acc;
        newCase.AccountId = acc.Id;
        System.debug('newCase account check');
      }
      if (newCase.ContactId == '') {
        Contact con = new Contact(
          Title = title,
          FirstName = firstName,
          LastName = lastName,
          Email = newCase.SuppliedEmail,
          Phone = newCase.SuppliedPhone,
          AccountId = newCase.AccountId
        );
        insert con;
        newCase.ContactId = con.Id;
        System.debug('Case contact check');
      }
      Case caseObj = new Case(
        Origin = newCase.Origin,	
        SuppliedName = newCase.SuppliedName,	
        SuppliedEmail = newCase.SuppliedEmail,
        SuppliedPhone = newCase.SuppliedPhone,
        SuppliedCompany = newCase.SuppliedCompany,
        SuppliedCompanyType__c = newCase.SuppliedCompanyType,
        Description = newCase.Description,
        ContactId = newCase.ContactId,
        AccountId = newCase.AccountId
      );
      insert caseObj;
      return 'Case inserted';
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
