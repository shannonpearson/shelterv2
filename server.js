const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDb = require('./src/db/models/index');
const routes = require('./src/server/routes/index');
const requiresAuthentication = require('./src/server/authenticationMiddleware');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));


app.use('/api/donate', routes.donate);
app.use('/api/admin', requiresAuthentication, routes.admin);
app.use('/api/auth', routes.auth);
app.use('/api/pets', routes.pets);
app.use('/api/events', routes.events);
app.use('/api/blogs', routes.blogs);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

connectDb().then(async () => {
  console.log('Connected to mongo database');
  app.listen(port, () => console.log(`app listening on port ${port}`));
});
