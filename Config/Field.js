exports.Field = class Field {
  constructor(args) {
    this.name = args.name;
    this.type = args.type;
    // repeatable fields store entries as arrays, and must be stored as arrays in the DB.
    this.dbTag = args.dbTag;
    this.label = '';
    this.default = null;
    this.options = [];
    this.attributes = {};
    this.isRequired = true;
    this.isHidden = false;
    this.isSubdoc = false;
    this.dependsOn = null;
    this.isRepeatable = false;

    Object.assign(this, args);
    this.subFields = {};
    if (this.isRepeatable && !Array.isArray(this.default)) {
      this.default = [this.default];
      for (let i = 0; i < this.default.length; i += 1) {
        if (this.default[i] === null) {
          this.default.splice(i, 1);
        }
      }
    }
  }

  addSubField(subFieldArgs) {
    const subField = new Field(subFieldArgs);
    this.subFields[subField.name] = subField;
    return subField;
  }

  getSubFields() {
    return this.subFields;
  }
};
