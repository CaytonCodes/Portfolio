exports.dbBuild = () => {
  const baseData = require('./dbBaseData');
  console.log('baseData', baseData);
};

const schemaPrepper = ({ documents }) => {
  const schema = {};

  documents.forEach((document) => {
    let dataFields = {};
    let fields = document.fields;
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i];
      const fieldName = field.fieldName;
      // picked up here, not sure what was happening when I left off, good luck.

  return schema;
};
