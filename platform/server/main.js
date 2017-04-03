import { Meteor } from 'meteor/meteor';
import { CollectionAPI } from 'meteor/xcv58:collection-api';

Meteor.startup(() => {

    Meteor.methods({
        sendMessage: function (topic, message) {
            console.log(topic + " " + message);

            var mqtt = require('mqtt');
            var client = mqtt.connect(MQTT_SERVER);

            /*client.subscribe(topic);
            client.on('message', function (topic, message) {
                // message is Buffer
                console.log(message.toString());
             });*/

            client.publish(topic, message);
            client.end();
        },
        addSensor: function (topic, message) {
            //Sensors.insert({message : { ChipId : "xxxxxyyyy" } });
        }
    });

Sensors.mqttConnect(MQTT_SERVER, ["iot/T/esp8266/I/+/D/deploy/F/json"], {insert: false}, {});
History.mqttConnect(MQTT_SERVER, ["iot/T/esp8266/I/+/D/sensor/F/json"], {insert: true}, {});
LastValues.mqttConnect(MQTT_SERVER, ["iot/T/esp8266/I/+/D/sensor/F/json"], {insert: false}, {});

})
