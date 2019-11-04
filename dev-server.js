const proxy = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');
const express = require('express');

const bundler = new Bundler('./index.html');
const app = express();

app.use('/api', proxy({
  target: 'http://localhost:3000',
  changeOrigin: true,
}));

app.use(bundler.middleware());

app.listen(1234, () => console.log('Server running at http://localhost:1234'));
