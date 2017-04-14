# Firmware template
Written in C with Arduino style coding allow to interact with the node using JSON messages and the MQTT protocol.

## Functionalities
The firmware start with hardware initialization and send a deploy message with all configurations on the queue __iot/T/esp8266/I/---CHIPID---/D/deploy/F/json__ where ---CHIPID--- is the ID burned inside the ESP8266 chip.

In the normal working the node collect informations and send messages (e.g. with information coming from a sensor) on the queue __iot/T/esp8266/I/---CHIPID---/D/sensor/F/json__.

The board can receive commands on the MQTT queue __iot/T/esp8266/I/---CHIPID---/C/sensor/F/json__, when a message is received the relative function is called.

The firmware sketch allow updates via OTA, sending a message on the queue __iot/T/esp8266/I/---CHIPID---/C/update/F/json__ allow to start the update function that download last available firmware, install it and finally reboot the board..

The WIFI connection is managed with a captive portal, when the ESP board don't recognize the know wifi network, the same board emulate an access point and allow the configuration via a captive portal, then the credentials are stored in hardware and the board rebooted.

The firmware allow a debug via serial port in order to debug the firmware via the USB connector.

## Meaning of queue name
__iot/T/esp8266/I/---CHIPID---/D/deploy/F/json__ is composed with different sections with this meaning:

- __iot__ fixed prefix for the IoT platform,
- __T__ introduce the Type of board section,
- __esp8266__ type of board used (e.g. esp8266, cc3200, arduino),
- __I__ introduce the board Identification section,
- __---CHIPID---__ the identifier of the board like chip id or mac address,
- __D__ introduce a Data message (from sensor to concentrator), otherwise if is __C__ introduce a Command message (from concentrator to sensor),
- __deploy__ kind of script,
- __F__ introduce the Format section and
- __json__ formatting protocol use in the payload (e.g. json, csv, txt).

## Making is works
In order to make it work:

- configure on __PP_MQTT.h__ the fields regarding the MQTT server (SERVER, SERVERPORT, USERNAME and KEY),      
- configure on __PP_WIFI.h__ the fields about the OTA funtionalities (UPDATE_SERVER and UPDATE_URL)
- implement your code in coping the structure in test module
- compile and upload on your board
