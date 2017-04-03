var userFields = {
  username: {
    type: String,
    label: 'Username'
  },
  password: {
    type: String,
    label: 'Password'
  },
  name: {
    type: String,
    label: 'Name'
  },
  surname: {
    type: String,
    label: 'Surname'
  },

  merchant: {
    type: Boolean,
    label: 'Is merchant'
  },

  public_address: {
    type: String,
    optional: true,
    label: 'Public Address'
  },
  secret_key: {
    type: String,
    optional: true,
    label: 'Secret Key'
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
  operator: {
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

UserSchema = new SimpleSchema(userFields);
