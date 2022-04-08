const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/../Client/dist`));


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
