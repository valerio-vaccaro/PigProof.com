sensor_configuration_PP_Neopixel_bear_controller = BaseController.extend({
    template: 'sensor_configuration_PP_Neopixel_bear_page',

    // Subscribe in order to have autoupdate
    waitOn: function () {
        return Meteor.subscribe('singleSensor');
    },

    data: function () {
        return {sensor: Sensors.findOne({'message.ChipId': this.params._chipid})};
    }
});
