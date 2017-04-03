Router.configure({
  loadingTemplate: 'spinner',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'root',
  controller: 'MainPageController'
});

Router.route('/sensors', {
  name: 'sensors_page',
  controller: 'sensors_controller'
});

// last values

Router.route('/sensor_last/ESP_OTA_DHT22/:_chipid', {
  name: 'sensor_lastValues_ESP_OTA_DHT22_page',
  controller: 'sensor_lastValues_ESP_OTA_DHT22_controller'
});

Router.route('/sensor_last/ESP_OTA_Button/:_chipid', {
  name: 'sensor_lastValues_ESP_OTA_Button_page',
  controller: 'sensor_lastValues_ESP_OTA_Button_controller'
});

Router.route('/sensor_last/ESP_OTA_LedLights/:_chipid', {
  name: 'sensor_lastValues_ESP_OTA_LedLights_page',
  controller: 'sensor_lastValues_ESP_OTA_LedLights_controller'
});

Router.route('/sensor_last/ESP_OTA_TFT/:_chipid', {
  name: 'sensor_lastValues_ESP_OTA_TFT_page',
  controller: 'sensor_lastValues_ESP_OTA_TFT_controller'
});

Router.route('/sensor_last/PP_Neopixel_bear/:_chipid', {
  name: 'sensor_lastValues_PP_Neopixel_bear_page',
  controller: 'sensor_lastValues_PP_Neopixel_bear_controller'
});

// history

Router.route('/sensor_history/ESP_OTA_DHT22/:_chipid', {
  name: 'sensor_history_ESP_OTA_DHT22_page',
  controller: 'sensor_history_ESP_OTA_DHT22_controller'
});

Router.route('/sensor_history/ESP_OTA_Button/:_chipid', {
  name: 'sensor_history_ESP_OTA_Button_page',
  controller: 'sensor_history_ESP_OTA_Button_controller'
});

Router.route('/sensor_history/ESP_OTA_LedLights/:_chipid', {
  name: 'sensor_history_ESP_OTA_LedLights_page',
  controller: 'sensor_history_ESP_OTA_LedLights_controller'
});

Router.route('/sensor_history/ESP_OTA_TFT/:_chipid', {
  name: 'sensor_history_ESP_OTA_TFT_page',
  controller: 'sensor_history_ESP_OTA_TFT_controller'
});

Router.route('/sensor_history/PP_Neopixel_bear/:_chipid', {
  name: 'sensor_history_PP_Neopixel_bear_page',
  controller: 'sensor_history_PP_Neopixel_bear_controller'
});

// configurations

Router.route('/sensor/ESP_OTA_Button/:_chipid', {
  name: 'sensor_configuration_ESP_OTA_Button_page',
  controller: 'sensor_configuration_ESP_OTA_Button_controller'
});

Router.route('/sensor/ESP_OTA_DHT22/:_chipid', {
  name: 'sensor_configuration_ESP_OTA_DHT22_page',
  controller: 'sensor_configuration_ESP_OTA_DHT22_controller'
});

Router.route('/sensor/ESP_OTA_LedLights/:_chipid', {
  name: 'sensor_configuration_ESP_OTA_LedLights_page',
  controller: 'sensor_configuration_ESP_OTA_LedLights_controller'
});

Router.route('/sensor/ESP_OTA_TFT/:_chipid', {
  name: 'sensor_configuration_ESP_OTA_TFT_page',
  controller: 'sensor_configuration_ESP_OTA_TFT_controller'
});

Router.route('/sensor/PP_Neopixel_bear/:_chipid', {
  name: 'sensor_configuration_PP_Neopixel_bear_page',
  controller: 'sensor_configuration_PP_Neopixel_bear_controller'
});

// has to be last - mean everythings else

Router.route('/:_id', {
  name: 'singlePost',
  controller: 'SinglePostController'
});


Router.onBeforeAction(function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}, {except: 'root'});