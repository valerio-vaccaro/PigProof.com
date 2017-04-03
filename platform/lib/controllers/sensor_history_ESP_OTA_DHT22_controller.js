sensor_history_ESP_OTA_DHT22_controller = BaseController.extend({
    template: 'sensor_history_ESP_OTA_DHT22_page',

    // Subscribe in order to have autoupdate
    waitOn: function () {
        return Meteor.subscribe('sensorHistory');
    },

    data: function () {
        return {history: History.find({'message.ChipId': this.params._chipid})};
    }
});
