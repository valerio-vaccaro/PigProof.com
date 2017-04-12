#ifndef pp_wifi_h
#define pp_wifi_h

// WIFI, WIFI configuration and OTA
#include <ESP8266httpUpdate.h>
#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include "WiFiManager.h"
uint8_t MAC_array[6];
char MAC_char[18];

#define UPDATE_SERVER "my_update_server"
#define UPDATE_URL "/esp/update.php"

/***
  WIFI configuration callback
***/
void configModeCallback (WiFiManager *myWiFiManager) {
  Serial.println(F("Entered config mode"));
  Serial.println(WiFi.softAPIP());
  //if you used auto generated SSID, print it
  Serial.println(myWiFiManager->getConfigPortalSSID());
}

/***
  Update firmware function
***/
void updateFirmware() {
  Serial.println(F("Update command received"));
  t_httpUpdate_return ret = ESPhttpUpdate.update(UPDATE_SERVER, 80, UPDATE_URL, "0.0.1");
  switch (ret) {
    case HTTP_UPDATE_FAILED:
      Serial.println(F("[update] Update failed."));
      break;
    case HTTP_UPDATE_NO_UPDATES:
      Serial.println(F("[update] Update no Update."));
      break;
    case HTTP_UPDATE_OK:
      Serial.println(F("[update] Update ok.")); // may not called we reboot the ESP
      break;
  }
}

void pp_wifi_setup() {
  Serial.println(F("=================="));
  Serial.println(F("Starting wifi"));
  WiFiManager wifiManager;
  wifiManager.setAPCallback(configModeCallback); //if it fail go to AP
  if (!wifiManager.autoConnect()) {
    Serial.println(F("failed to connect and hit timeout"));
    ESP.reset();
    delay(1000);
  }
  //if you get here you have connected to the WiFi
  Serial.println(F("connected!"));
  Serial.print(F("MAC address"));
  WiFi.macAddress(MAC_array);
  for (int i = 0; i < sizeof(MAC_array); ++i) {
    sprintf(MAC_char, "%s%02x:", MAC_char, MAC_array[i]);
  }
  Serial.println(MAC_char);
  Serial.println(F("=================="));
}

void pp_wifi_loop() {
  
}
#endif
