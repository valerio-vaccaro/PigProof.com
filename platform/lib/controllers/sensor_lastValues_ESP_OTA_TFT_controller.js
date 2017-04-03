sensor_lastValues_ESP_OTA_TFT_controller = BaseController.extend({
    template: 'sensor_lastValues_ESP_OTA_TFT_page',

    // Subscribe in order to have autoupdate
    waitOn: function () {
        return Meteor.subscribe('sensorLastValues');
    },

    data: function () {
        return {lastValues: LastValues.find({'message.ChipId': this.params._chipid})};
    }
});
