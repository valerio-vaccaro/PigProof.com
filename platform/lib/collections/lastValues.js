/*
 Topic: iot/T/esp8266/I/de1b16/D/deploy/F/json
 Message: {"Type":"ESP_OTA_DHT22","Version":"0.0.1","Filename":"/Users/valerio/Documents/work/arduino/_161108_ESP_OTA_DHT22/_161108_ESP_OTA_DHT22.ino","CompilationTime":"Nov  8 2016 12:09:28","ChipId":"de1b16","Pub":["iot/T/esp8266/I/de1b16/C/sensor/F/json","iot/T/esp8266/I/de1b16/C/update/F/json"],"Sub":["iot/T/esp8266/I/de1b16/D/sensor/F/json","iot/T/esp8266/I/de1b16/D/deploy/F/json"]}
 Send: OK!
 */
LastValues = new Meteor.Collection('lastValues');

/* Privileges */
LastValues.allow({
    insert: function (userId, doc) {
        // only if user is logged
        return !!userId;
    },
    update: function (userId, doc, fieldNames, modifier) {
        // only if user is logged
        return !!userId;
    },
    remove: function (userId, doc) {
        // only if user is logged
        return !!userId;
    }
});

/* modifiers */
LastValues.before.upsert(function (userId, selector, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.timestamp = Date.now();
    modifier.$set.id = modifier.$set.topic;
});
