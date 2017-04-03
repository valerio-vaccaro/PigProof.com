Template.sensor_lastValues_ESP_OTA_DHT22_page.events({});

Template.sensor_lastValues_ESP_OTA_DHT22_page.helpers({
  'humidity': function() {
    var cols = [];
    var col = ["humidity"];
    var chipid = Router.current().params._chipid;
    var data = _.pluck(_.pluck(_.pluck(History.find({
      'message.ChipId': chipid
    }).fetch(), "message"), "d"), "Humidity");
    _.each(data, function(g) {
      col.push(parseFloat(g));
    });
    cols.push(col);
    return {
      data: {
        columns: cols,
        type: 'spline'
      }
    };
  },
  'ESP_OTA_DHT22_table': function() {
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
        key: 'message.d.Humidity',
        label: 'Humidity'
      }, {
        key: 'message.d.Temperature',
        label: 'Temperature'
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

Template.sensor_lastValues_analysisChart.rendered = function() {
  drawChart();
  drawChart2();
  drawChart3();
};


function drawChart(myId) {
  var data = [{
    value: History.find({
      'message.ChipId': Router.current().params._chipid
    }).count(),
    color: "darkred",
    highlight: "#2ECC71",
    label: "MY"
  }, {
    value: History.find({
      'message.ChipId': Router.current().params._chipid
    }).count(),
    color: "darkblue",
    highlight: "#1ABC9C",
    label: "ALL"
  }];

  var ctx = $("#chart-1").get(0).getContext("2d");
  var myNewChart = new Chart(ctx);

  new Chart(ctx).Pie(data);
}

function drawChart2(myId) {
  var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      data: [65, 59, 90, 81, 56, 55, 40]
    }, {
      fillColor: "rgba(151,187,205,0.5)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      data: [28, 48, 40, 19, 96, 27, 100]
    }]
  };

  //Get context with jQuery - using jQuery's .get() method.
  //var ctx = $("#myChart").get(0).getContext("2d");
  //This will get the first returned node in the jQuery collection.
  //var myNewChart = new Chart(ctx);

  //new Chart(ctx).Line(data);
  //modify this
  var ctx = $("#chart-temp").get(0).getContext("2d");
  var myNewChart = new Chart(ctx).PolarArea(data);


}

function drawChart3(myId) {

  var cur = History.find({
    'message.ChipId': Router.current().params._chipid
  }, {
    sort: {
      date_created: -1
    },
    skip: 0,
    limit: 20
  });

  collData = [];
  cur.forEach(function(row) {
    collData.push(row.message.d.Humidity);
  });

  collLabel = [];
  cur.forEach(function(row) {
    collLabel.push(row.timestamp);
  });

  var data = {
    labels: collLabel,
    datasets: [{
      fill: false,
      data: collData
    }]
  };

  var data2 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "My First dataset",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
      spanGaps: false,
    }]
  };
  //Get context with jQuery - using jQuery's .get() method.
  //var ctx = $("#myChart").get(0).getContext("2d");
  //This will get the first returned node in the jQuery collection.
  //var myNewChart = new Chart(ctx);

  //new Chart(ctx).Line(data);
  //modify this

  console.log(data);
  var ctx = $("#chart-hum").get(0).getContext("2d");
  var myNewChart = new Chart(ctx).Line(data);
  /*, {
   type: 'line',
   data: data
   //options: options
   });*/


}
