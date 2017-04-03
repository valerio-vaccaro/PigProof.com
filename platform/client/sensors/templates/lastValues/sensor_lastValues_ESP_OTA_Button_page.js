Template.sensor_lastValues_ESP_OTA_Button_page.events({});

Template.sensor_lastValues_ESP_OTA_Button_page.helpers({
  'ESP_OTA_Button_table': function() {
    return {
      collection: History.find({
        'message.ChipId': Router.current().params._chipid
      }, {
        sort: {
          date_created: -1
        }
      }),
      rowsPerPage: 50,
      showFilter: true,
      fields: [{
        key: 'message.ChipId',
        label: 'Chip Id'
      }, {
        key: 'message.Type',
        label: 'Type'
      }, {
        key: 'message.Version',
        label: 'Version'
      }, {
        key: 'message.d.Result',
        label: 'Result',
        fn: function(value, object, key) {
          var is_ok = value.indexOf("OK") !== -1;

          if (is_ok) {
            buf = "<span class='label label-success'>" + value +
              "</span>";
          } else {
            buf = "<span class='label label-danger>" + value +
              "</span>";
          }
          return Spacebars.SafeString(buf);
        }
      }, {
        key: 'message.d.Battery',
        label: 'Battery'
      }, {
        key: 'timestamp',
        label: 'Timestamp',
        fn: function(value, object, key) {
          var now = Date.now();
          var is_expired = (value + (60 * 60 * 1000) < now);
          var is_warning = (value + (60 * 1000) < now) & (value + (
            60 * 60 * 1000) > now);
          var buf;
          if (is_expired) {
            buf = "<span class='label label-danger'>" + new Date(
              value).toString() + "</span>";
          } else if (is_warning) {
            buf = "<span class='label label-warning'>" + new Date(
              value).toString() + "</span>";
          } else {
            buf = "<span class='label label-default'>" + new Date(
              value).toString() + "</span>";
          }
          return Spacebars.SafeString(buf);
        }
      }]
    }
  }
});

