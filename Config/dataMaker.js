const fs = require('fs');
const { Document } = require('./Document');

const readJSONFile = (filepath, encoding) => {
  if (typeof encoding === 'undefined') {
    // eslint-disable-next-line no-param-reassign
    encoding = 'utf8';
  }
  const file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
};

const dataConfigJSON = () => {
  const filepath = `${__dirname}/dataConfig.json`;
  return readJSONFile(filepath, 'utf8');
};

exports.getFieldData = () => {
  const config = dataConfigJSON();
  const dataTypeConfigs = Object.entries(config.documents);
  const documents = {};
  // iterate through data types. Create a new Document object for each.
  for (let i = 0; i < dataTypeConfigs.length; i += 1) {
    const [dataType, dataTypeConfig] = dataTypeConfigs[i];
    const { label } = dataTypeConfig;
    const name = dataType;
    let singularLabel = label;
    if (Object.prototype.hasOwnProperty.call(dataTypeConfig, 'singularLabel')) {
      singularLabel = dataTypeConfig.singularLabel;
    }
    const document = new Document({ name, label, singularLabel });
    document.buildFromConfig(config);
    documents[name] = document;
  }
  return documents;
};

const makeFieldData = (fieldsObj) => {
  const data = {};
  // iterate through data types.
  Object.values(fieldsObj).forEach((field) => {
    let fieldValue = field.default;
    if (field.isSubdoc) {
      fieldValue = makeFieldData(field.subFields);
    }
    data[field.name] = fieldValue;
  });
  return data;
};

exports.makeBlankData = (docObj) => {
  let data = {};
  Object.values(docObj).forEach((doc) => {
    data[doc.name] = makeFieldData(doc.fields);
  });
  return data;
};
