public without sharing class SomeCompanyController {
  @AuraEnabled(cacheable=true)
  public static String getProducts() {
    JSONGenerator jsonGenerator = JSON.createGenerator(true);
    jsonGenerator.writeStartObject();
    jsonGenerator.writeFieldName('products');
    jsonGenerator.writeStartArray();

    jsonGenerator.writeStartObject();
    jsonGenerator.writeStringField('header', 'GLOBAL COMPANY PAYMENT SYSTEM');
    jsonGenerator.writeStringField('symbol', '$');
    jsonGenerator.writeStringField('content', '1A');
    jsonGenerator.writeEndObject();

    jsonGenerator.writeStartObject();
    jsonGenerator.writeStringField('header', 'GLOBAL COMPANY MAILING SYSTEM');
    jsonGenerator.writeStringField('symbol', '@');
    jsonGenerator.writeStringField('content', '2B');
    jsonGenerator.writeEndObject();

    jsonGenerator.writeStartObject();
    jsonGenerator.writeStringField('header', 'GLOBAL COMPANY INDEX SYSTEM');
    jsonGenerator.writeStringField('symbol', '#');
    jsonGenerator.writeStringField('content', '3C');
    jsonGenerator.writeEndObject();

    jsonGenerator.writeEndArray();
    jsonGenerator.writeEndObject();

    return jsonGenerator.getAsString();
  }

  @AuraEnabled
  public static string createCase(String caseJSON){
    try {
      
      return 'Success';
    } catch (Exception e) {
      return e.getMessage();
    }
  }
}
