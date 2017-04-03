var sectionFields = {
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
  _id: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
};

SectionSchema = new SimpleSchema(sectionFields);
