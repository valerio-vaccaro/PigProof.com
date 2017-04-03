sensor_configuration_ESP_OTA_Button_controller = BaseController.extend({
    template: 'sensor_configuration_ESP_OTA_Button_page',

    // Subscribe in order to have autoupdate
    waitOn: function () {
        return Meteor.subscribe('singleSensor');
    },

    data: function () {
        return {sensor: Sensors.findOne({'message.ChipId': this.params._chipid})};
    }
});
