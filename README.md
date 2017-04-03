# Introduction

PigProof.com is an open source Internet of Things (IoT) platform based on Meteor.js with firmware for ESP8266 and various sensors with OTA upgrade!

# Hardware

ESP8266 is a low cost SOC capable of WIFI connection, compatible with Arduino IDE and with the following characteristics:

- 32-bit RISC CPU: Tensilica Xtensa LX106 running at 80 MHz
- 64 KiB of instruction RAM, 96 KiB of data RAM
- External QSPI flash: 512 KiB to 4 MiB
- IEEE 802.11 b/g/n Wi-Fi
- Integrated TR switch, balun, LNA, power amplifier and matching network
- WEP or WPA/WPA2 authentication, or open networks
- 16 GPIO pins
- SPI
- I²C
- I²S interfaces with DMA (sharing pins with GPIO)
- UART on dedicated pins, plus a transmit-only UART can be enabled on GPIO2
- 1 10-bit ADC

# Firmware
Written in C with Arduino style coding allow to interact with the node using JSON messages and the MQTT protocol.

The firmware start with hardware initialization and send a deploy message with all configurations on the queue __iot/T/esp8266/I/---CHIPID---/D/deploy/F/json__ where ---CHIPID--- is the ID burned inside the ESP8266 chip.

In the normal working the node collect informations and send messages (e.g. with information coming from a sensor) on the queue __iot/T/esp8266/I/---CHIPID---/D/sensor/F/json__.

The board can receive commands on the MQTT queue __iot/T/esp8266/I/---CHIPID---/C/sensor/F/json__, when a message is received the relative function is called.

The firmware sketch allow updates via OTA, sending a message on the queue __iot/T/esp8266/I/---CHIPID---/C/update/F/json__ allow to start the update function that download last available firmware, install it and finally reboot the board..

The WIFI connection is managed with a captive portal, when the ESP board don't recognize the know wifi network, the same board emulate an access point and allow the configuration via a captive portal, then the credentials are stored in hardware and the board rebooted.

The firmware allow a debug via serial port in order to debug the firmware via the USB connector.

# Software

Meteor.js is a javascript based framework able to create both client and server code.

The communication is based on MQTT protocol that allow to send and receive messages with a publish/subscribe approach.

# Conclusion
PigProof.com is an open source ready platform for the IoT solutions.

Give a try today!!! Clone code and configure file on __platform/lib/constant.js__ writing the address of your MQTT server.
