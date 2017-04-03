var loginFields = {
  model: {
    type: String,
    label: 'Phone model'
  },
  os_version: {
    type: String,
    label: 'OS version'
  },
  app_version: {
    type: String,
    label: 'App version'
  },
  uid: {
    type: String,
    label: 'Device UID'
  },
  ip: {
    type: String,
    label: 'Device IP'
  },

  _id: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  userId: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  createdAt: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  }
};

LoginSchema = new SimpleSchema(loginFields);
