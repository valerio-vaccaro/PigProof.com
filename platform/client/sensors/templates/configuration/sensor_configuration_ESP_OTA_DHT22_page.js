Template.sensor_configuration_ESP_OTA_DHT22_page.helpers({
    'is_expired': function () {
        var now = Date.now();
        return this.sensor.timestamp + (60 * 60 * 1000) < now;
    },
    'is_in_warning': function () {
        var now = Date.now();
        return (this.sensor.timestamp + (60 * 1000) < now) & (this.sensor.timestamp + (60 * 60 * 1000) > now);
    },
    'prettifyDate': function (timestamp) {
        return new Date(timestamp).toString();
    },
    'prettifyJSON': function (obj) {
        return JSON.stringify(obj, null, 2);
    }

});

Template.sensor_configuration_ESP_OTA_DHT22_page.events({
    'click .update': function () {
        Meteor.call('sendMessage', this.sensor.message.Update, "refresh");
        return false;
    }
});