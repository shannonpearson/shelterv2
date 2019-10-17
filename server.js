const express = require('express');
require('dotenv/config');
const path = require('path');
const cors = require('cors')
const app = express();

const routes = require('./src/server/routes/index')

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors())

app.use('/donate', routes.donate);

app.get('*', function (req, res) {
  console.log('catchall')
  res.sendFile(path.join(__dirname))
})

app.listen(port, () => console.log(`app listening on port ${port}`));
