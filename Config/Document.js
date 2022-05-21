const { Field } = require('./Field');

exports.Document = class Document {
  constructor(args) {
    this.name = args.name;
    this.label = args.label;
    this.singularLabel = args.singularLabel;

    this.fields = {};
  }

  addField(fieldArgs) {
    const field = new Field(fieldArgs);
    this.fields[field.name] = field;
    return field;
  }

  getFields() {
    return this.fields;
  }

  buildFromConfig(config) {
    const relevantFieldConfig = config.documents[this.name].fields;
    for (let i = 0; i < relevantFieldConfig.length; i += 1) {
      const fieldConfig = relevantFieldConfig[i];
      const field = this.addField(fieldConfig);
      if (field.isSubdoc) {
        const subFieldConfig = config.subDocuments[field.type].fields;
        for (let j = 0; j < subFieldConfig.length; j += 1) {
          field.addSubField(subFieldConfig[j]);
        }
      }
    }
  }
};
