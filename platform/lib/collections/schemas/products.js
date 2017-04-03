var productFields = {
  name: {
    type: String,
    label: 'Name'
  },
  description: {
    type: String,
    label: 'Description'
  },
  code: {
    type: Number,
    label: 'Code'
  },
  price: {
    type: Number,
    label: 'Price'
  },
  section_code: {
    type: Number,
    label: 'Section code'
  },
  section_name: {
    type: String,
    label: 'Section name'
  },
  _id: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
};

ProductSchema = new SimpleSchema(productFields);
