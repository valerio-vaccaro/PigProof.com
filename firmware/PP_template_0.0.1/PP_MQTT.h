#ifndef pp_mqtt_h
#define pp_mqtt_h

/***
 * libraries for PubSub MQTT implementation and json management 
 ***/
#include <PubSubClient.h>
#include <ArduinoJson.h>

/***
 * MQTT server configuration
 ***/
#define SERVER      "my_mqtt_server"
#define SERVERPORT  1883
#define USERNAME    ""
#define KEY         ""

/***
 * MQTT standard queues
 ***/
char topic_deploy_send[100];
char topic_sensor_send[100];
char topic_sensor_receive[100];
char topic_update_receive[100];

/***
 * Create an ESP8266 WiFiClient class to connect to the MQTT server.
 ***/
WiFiClient client;
PubSubClient mqttclient(client);

/***
 * MQTT receiver callback
 ***/
void mqttReceiveCallback(char* topic, byte* payload, unsigned int length) {
  Serial.println(F("=================="));
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
  Serial.println(F("=================="));
  Serial.println(F("Kind of message:"));

  /* update message */
  if (strcmp(topic, topic_update_receive) == 0) {
    updateFirmware();
  }
  /* received message */
  else if (strcmp(topic, topic_sensor_receive) == 0) {
    /* do something with message */

  }
  /*default*/
  else {
    
  }

}

void reconnect() {
  // Loop until we're reconnected
  while (!mqttclient.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (mqttclient.connect("ESP8266Client2")) {
      Serial.println("connected");
      // esubscribe
      mqttclient.subscribe(topic_sensor_receive);
      mqttclient.subscribe(topic_update_receive);
    } else {
      Serial.print("failed, rc=");
      Serial.print(mqttclient.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void pp_mqtt_setup() {
  mqttclient.setServer(SERVER, SERVERPORT);
  mqttclient.setCallback(mqttReceiveCallback);
  String buf0 = String("iot/T/esp8266/I/") + String(ESP.getChipId(), HEX) + String("/D/sensor/F/json");
  buf0.toCharArray(topic_sensor_send, 100);
  String buf1 = String("iot/T/esp8266/I/") + String(ESP.getChipId(), HEX) + String("/D/deploy/F/json");
  buf1.toCharArray(topic_deploy_send, 100);
  String buf2 = String("iot/T/esp8266/I/") + String(ESP.getChipId(), HEX) + String("/C/sensor/F/json");
  buf2.toCharArray(topic_sensor_receive, 100);
  String buf3 = String("iot/T/esp8266/I/") + String(ESP.getChipId(), HEX) + String("/C/update/F/json");
  buf3.toCharArray(topic_update_receive, 100);
}

void pp_mqtt_loop() {
  if (! mqttclient.connected() ) {
    reconnect();
  }
  mqttclient.loop();
}

#endif
