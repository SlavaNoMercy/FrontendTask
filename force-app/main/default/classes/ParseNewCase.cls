public class ParseNewCase{
    public String Origin;	
    public String SuppliedName;	
    public String SuppliedEmail;
    public String SuppliedPhone;
    public String SuppliedCompany;
    public String SuppliedCompanyType;
    public String Description;
    public String ContactId;
    public String AccountId;
  
    public static ParseNewCase parse(String json){
      return (ParseNewCase) System.JSON.deserialize(json, ParseNewCase.class);
    }
  }