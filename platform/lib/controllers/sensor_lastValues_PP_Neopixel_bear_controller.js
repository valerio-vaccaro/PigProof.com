sensor_lastValues_PP_Neopixel_bear_controller = BaseController.extend({
    template: 'sensor_lastValues_PP_Neopixel_bear_page',

    // Subscribe in order to have autoupdate
    waitOn: function () {
        return Meteor.subscribe('sensorLastValues');
    },

    data: function () {
        return {
            lastValues: LastValues.find({'message.ChipId': this.params._chipid}),
            sensor: Sensors.find({'message.ChipId': this.params._chipid})
        };
    }
});
