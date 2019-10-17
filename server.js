const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const { connectDb } = require('./src/db/models/index');
const routes = require('./src/server/routes/index');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/users', routes.user);
app.use('/donate', routes.donate);

app.get('*', (req, res) => {
  console.log('CATCHALL');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// app.listen(port, () => console.log(`app listening on port ${port}`));

connectDb().then(async () => {
  console.log('Connected to mongo database');
  app.listen(port, () => console.log(`app listening on port ${port}`));
});
