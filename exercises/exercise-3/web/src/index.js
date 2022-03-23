const express = require('express');
const axios   = require('axios');

const app = express();

app.get('/', async (_req, res) => {
  const result = await axios('http://api/items');
  res.send(result.data);
});

app.listen(process.env.PORT);