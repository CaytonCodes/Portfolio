const fs = require('fs');

exports.readJSONFile = (filepath, encoding) => {
  if (typeof encoding === 'undefined') {
    // eslint-disable-next-line no-param-reassign
    encoding = 'utf8';
  }
  const file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
};

exports.baseDataJSON = () => {
  const filepath = `${__dirname}/../DB/dbBaseData.json`;
  return exports.readJSONFile(filepath, 'utf8');
};
