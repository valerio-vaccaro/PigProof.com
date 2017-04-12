const char firmware_name[]     = "ESP_OTA_TEMPLATE";
const char firmware_version[]  = "0.0.1";
const char source_filename[]   = __FILE__;
const char compile_date[]      = __DATE__ " " __TIME__;

#include "PP_WIFI.h"
#include "PP_MQTT.h"
#include "PP_Test.h"

void setup() {
  Serial.begin(115200);
  Serial.println(F("=================="));
  Serial.println(source_filename);
  Serial.println(compile_date);
  pp_wifi_setup();
  pp_mqtt_setup();
  //pp_mqtt_deploy_msg();
  if (! mqttclient.connected() ) {
    reconnect();
  }
  // Create JSON message
  StaticJsonBuffer<500> jsonBuffer;
  char sens_buff[500];
  JsonObject& root = jsonBuffer.createObject();
  root["Type"] = firmware_name;
  root["Version"] = firmware_version;
  root["Filename"] = source_filename;
  root["CompilationTime"] = compile_date;
  root["ChipId"] = String(ESP.getChipId(), HEX);
  root["Deploy"] = topic_deploy_send;
  root["Update"] = topic_update_receive;
  JsonArray& Pub = root.createNestedArray("Pub");
  Pub.add(topic_sensor_receive);
  JsonArray& Sub = root.createNestedArray("Sub");
  Sub.add(topic_sensor_send);
  root.printTo(sens_buff, 500);
  Serial.print(F("Topic: "));
  Serial.println(topic_deploy_send);
  Serial.print(F("Message: "));
  Serial.println(sens_buff);
  if (! mqttclient.publish(topic_deploy_send, sens_buff)) {
    Serial.println(F("Send: Failed"));
  } else {
    Serial.println(F("Send: OK!"));
  }
  pp_test_setup();
}

void loop() {
  pp_mqtt_loop();
  pp_test_loop();
  delay(1000);
}


