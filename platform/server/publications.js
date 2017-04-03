/* substitute autopublish functions */

Meteor.publish('allSensors', function () {
    return Sensors.find();
});

Meteor.publish('sensorHistory', function (chipid) {
    return History.find({chipid: chipid});
});

Meteor.publish('singleLastValues', function (chipid) {
    return LastValues.find({chipid: chipid});
});

Meteor.publish('singleSensor', function (chipid) {
    return Sensors.find({chipid: chipid});
});