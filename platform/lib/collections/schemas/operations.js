var operationFields = {
  sender_address: {
    type: String,
    label: 'Sender Address'
  },
  receiver_address: {
    type: String,
    label: 'Receiver Address'
  },
  amount: {
    type: Number,
    label: 'Amount'
  },
  ticket: {
    type: String,
    label: 'Ticket',
    optional: true,
    autoform: {
      type: 'textarea',
      rows: 5
    }
  },
  id_transaction: {
    type: String,
    label: 'Transaction ID'
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

OperationSchema = new SimpleSchema(operationFields);
