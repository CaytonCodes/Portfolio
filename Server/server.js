const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getFieldData, makeBlankData } = require('../Config/dataMaker');

const Project = require('../DB/db');

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/../Client/dist`));

app.get('/api/v1/admin/base-data', (req, res) => {
  const docObj = getFieldData();
  const dataObj = makeBlankData(docObj);
  res.send({ docObj, dataObj });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
