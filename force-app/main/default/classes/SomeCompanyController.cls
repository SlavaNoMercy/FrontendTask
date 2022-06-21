public without sharing class SomeCompanyController {
  public String getProducts() {
    JSONGenerator jsonGenerator = JSON.createGenerator(true);
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

    return jsonGenerator.getAsString();
  }
}
