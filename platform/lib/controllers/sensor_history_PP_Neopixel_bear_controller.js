sensor_history_PP_Neopixel_bear_controller = BaseController.extend({
    template: 'sensor_history_PP_Neopixel_bear_page',

    // Subscribe in order to have autoupdate
    waitOn: function () {
        return Meteor.subscribe('sensorHistory');
    },

    data: function () {
        return {
            history: History.find({'message.ChipId': this.params._chipid}),
            sensor: Sensors.find({'message.ChipId': this.params._chipid})
        };
    }
});
