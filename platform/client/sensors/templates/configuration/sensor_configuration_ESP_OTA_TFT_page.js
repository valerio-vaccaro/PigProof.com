Template.sensor_configuration_ESP_OTA_TFT_page.helpers({
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

Template.sensor_configuration_ESP_OTA_TFT_page.events({
    'click .update': function (event, template) {
        Meteor.call('sendMessage', this.sensor.message.Update, "refresh");
        return false;
    },
    'click .send_message': function (event, template) {
        var red = parseInt(template.find('input.red_value').value);
        var green = parseInt(template.find('input.green_value').value);
        var blue = parseInt(template.find('input.blue_value').value);
        var white = parseInt(template.find('input.white_value').value);
        var msg_str = JSON.stringify({'R': red, 'G': green, 'B': blue, 'W': white}, null, 2);
        var chipid = Router.current().params._chipid;
        var queue = Sensors.find({'message.ChipId': chipid}).fetch()[0].message.Pub[0];
        var msg_str = JSON.stringify({'R': red, 'G': green, 'B': blue, 'W': white}, null, 2);
        Meteor.call('sendMessage', queue, msg_str);
    }
});