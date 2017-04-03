// events of the page
Template.sensors_page.events({
    /* 'click .sort_by_score': function () {
        AmplifiedSession.set('sort_by', 'timestamp');
    },
    'click .sort_by_name': function () {
        AmplifiedSession.set('sort_by', 'id');
    },
    'click .randomize': function () {
        //utils.randomizeScores();
        Meteor.call('addSensor');
    },
    'click .reset': function () {
        //utils.resetPlayers();
    },
    'click .add_user': function (event, template) {
        var name = template.find('input.player_name');
        utils.addSensor(name.value);
        name.value = '';
     },*/
    'click .reactive-table tbody tr': function (event) {
        event.preventDefault();
        var row = this;
        console.log(row);
        console.log(event.target.className);
        // checks if the actual clicked element has the class specified
        if (event.target.className.indexOf("view") !== -1) {
            Router.go("/sensor/" + row.message.Type + "/" + row.message.ChipId);
        } else if (event.target.className.indexOf("history") !== -1) {
            /* go to history page */
            Router.go("/sensor_history/" + row.message.Type + "/" + row.message.ChipId);
        } else if (event.target.className.indexOf("last") !== -1) {
            /* go to last page */
            Router.go("/sensor_last/" + row.message.Type + "/" + row.message.ChipId);
        } else if (event.target.className.indexOf("editor") !== -1) {
            /* go to history page */
            Router.go("/editor/" + row.message.Type + "/" + row.message.ChipId);
        }
    }
});

Template.sensors_page.helpers({
    'sensors': function () {
        var sort_by = AmplifiedSession.get('sort_by');
        var sort_options = sort_by === 'id' ? {id: 1, timestamp: 1} : {timestamp: -1, id: 1};
        return Sensors.find({}, {sort: sort_options});
    },
    'sort_by_is': function (sort_by) {
        return (AmplifiedSession.get('sort_by') || 'timestamp') === sort_by;
    },
    'sensors_table': function () {
        return {
            collection: Sensors.find(),
            rowsPerPage: 20,
            showFilter: true,
            fields: [
                {key: 'message.ChipId', label: 'Chip Id'},
                {key: 'message.Type', label: 'Type'},
                {key: 'message.Version', label: 'Version'},
                {
                    key: 'score', label: 'Msg no.', fn: function (value, object, key) {
                    var min = Sensors.findOne({}, {sort: {score: 1, id: -1}}).score;
                    var max = Sensors.findOne({}, {sort: {score: -1, id: 1}}).score;
                    var is_min = (value == min);
                    var is_max = (value == max);
                    if (is_min) {
                        buf = "<span class='label label-success'>" + value + "</span>";
                    } else if (is_max) {
                        buf = "<span class='label label-warning'>" + value + "</span>";
                    } else {
                        buf = "<span class='label label-default'>" + value + "</span>";
                    }
                    return Spacebars.SafeString(buf);
                }
                },
                {
                    key: 'message.ChipId', label: 'Editor', fn: function (value, object, key) {
                    return Spacebars.SafeString('<i class="view glyphicon glyphicon-cog" rel="tooltip" data-original-title="Editor"></i>');
                }
                },
                {
                    key: 'message.ChipId', label: 'Info', fn: function (value, object, key) {
                    return Spacebars.SafeString('<i class="view glyphicon glyphicon-info-sign" rel="tooltip" data-original-title="View info"></i>');
                }
                },
                {
                    key: 'message.ChipId', label: 'Last', fn: function (value, object, key) {
                    return Spacebars.SafeString('<i class="lastValues glyphicon glyphicon-list-alt" rel="tooltip" data-original-title="Last"></i>');
                }
                },
                {
                    key: 'message.ChipId', label: 'Hist', fn: function (value, object, key) {
                    return Spacebars.SafeString('<i class="history glyphicon glyphicon-time" rel="tooltip" data-original-title="History"></i>');
                }
                },
                {
                    key: 'timestamp', label: 'Timestamp', fn: function (value, object, key) {
                    var now = Date.now();
                    var is_expired = (value + (60 * 60 * 1000) < now);
                    var is_warning = (value + (60 * 1000) < now) & (value + (60 * 60 * 1000) > now);
                    var buf;
                    if (is_expired) {
                        buf = "<span class='label label-danger'>" + new Date(value).toString() + "</span>";
                    } else if (is_warning) {
                        buf = "<span class='label label-warning'>" + new Date(value).toString() + "</span>";
                    } else {
                        buf = "<span class='label label-default'>" + new Date(value).toString() + "</span>";
                    }
                    return Spacebars.SafeString(buf);
                }

                }
            ]
        }
    }
});