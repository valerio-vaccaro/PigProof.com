/*
 Topic: iot/T/esp8266/I/de1b16/D/sensor/F/json
 Message: {"Type":"ESP_OTA_DHT22","Version":"0.0.1","ChipId":"de1b16","Humidity":41.20,"Temperature":24.10,"Battery":3}
 Send: OK!
 */
History = new Meteor.Collection('history');

/* Privileges */
History.allow({
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
History.before.insert(function (userId, doc) {
    doc.timestamp = Date.now();
    doc.score = 0;
    doc.id = doc.topic;
    // update sensors data
    var score = History.find({'message.ChipId': doc.message.ChipId}).count();
    Sensors.update({'message.ChipId': doc.message.ChipId}, {$set: {score: score, timestamp: Date.now()}});
});
