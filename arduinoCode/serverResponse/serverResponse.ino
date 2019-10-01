#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include <EEPROM.h>

ESP8266WebServer server;

void setup()
{
  Serial.begin(115200);
  createAP();
  EEPROM.begin(512);
  
  server.on("/",[](){server.send(200,"text/plain","Hello World!");});
  server.on("/scannetworks",scanNetwork);
  server.on("/pantilt",[](){server.send(200,"text/plain","Hello World!");});
  server.begin();
}

void loop()
{
  server.handleClient();
}

void toggleLED()
{
  server.send(204,"");
}


void createAP() {
  Serial.print("Setting soft-AP ... ");
  Serial.println(WiFi.softAP("ESPsoft", "abacate123") ? "Ready" : "Failed!");
}

void setPanTilt()
{
  String data = server.arg("plain");
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, data);

   if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.c_str());
    return;
  }
  
  server.send(204,"");
}


void checkConnected() {

  String data = "";
  StaticJsonDocument<200> doc;
  doc["service"] = "checkConnected";
  
  if(WiFi.status() != WL_CONNECTED) {
      doc["connected"] = false;
      serializeJson(doc, data);    
      return server.send(200,"text/json",data);
  }

  serializeJson(doc, data);
  server.send(204,"text/json",data);
  
}


void connectWifi() {
  
  String data = server.arg("plain");
  
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, data);
  
 if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.c_str());
    return;
  }
  
  String ssid = doc["ssid"];
  String password = doc["password"];
  bool save = doc["save"];
  
  server.send(204,"iniciando...");
  
  WiFi.disconnect(true);
  WiFi.persistent(false);
  
  WiFi.begin(ssid,password);

  int i = 0;
  while(WiFi.status()!=WL_CONNECTED)
  {
    if(i == 10) {
       break;
    }
    Serial.print(".");
    delay(500);
  }
  if(save) {
    
  }
  
}


void scanNetwork() {
  Serial.println("scan start");

  String jsonData;
  String jsonString;
  int n = WiFi.scanNetworks();
  
  //const size_t CAPACITY = JSON_ARRAY_SIZE(n) + JSON_OBJECT_SIZE();
  StaticJsonDocument<200> doc;
  StaticJsonDocument<1600> secondDoc;
  JsonArray array = secondDoc.to<JsonArray>();
  
  
  
  if (n == 0) {
    Serial.println("no networks found");
  } else {
    for (int i = 0; i < n; i++) {
      
      Serial.println(WiFi.SSID(i));
      doc["networkSSID"] = WiFi.SSID(i);
      doc["networkRSSI"] = WiFi.RSSI(i);
      serializeJson(doc, jsonString);  
      delay(100);
      array.add(jsonString);
      jsonString = ""; 
      
    } 
    
    serializeJson(secondDoc, jsonData);
    server.send(200,"text/json", jsonData);
  }
}

void writeString(char add,String data)
{
  int _size = data.length();
  int i;
  for(i=0;i<_size;i++)
  {
    EEPROM.write(add+i,data[i]);
  }
  EEPROM.write(add+_size,'\0');   //Add termination null character for String Data
  EEPROM.commit();
}
 
 
String read_String(char add)
{
  int i;
  char data[100]; //Max 100 Bytes
  int len=0;
  unsigned char k;
  k=EEPROM.read(add);
  while(k != '\0' && len<500)   //Read until null character
  {    
    k=EEPROM.read(add+len);
    data[len]=k;
    len++;
  }
  data[len]='\0';
  return String(data);
}
