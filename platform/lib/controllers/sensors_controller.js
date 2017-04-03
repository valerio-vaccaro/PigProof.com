sensors_controller = BaseController.extend({
    template: 'sensors_page',

    // Subscribe in order to have autoupdate
    waitOn: function () {
        return Meteor.subscribe('allSensors');
    },

    data: function () {
        // Debug code - Sensors.find().forEach(function(item){ console.log(item)});
        return {sensors: Sensors.find({})};
    }
});