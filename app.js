const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const invoiceRouter = require('./API/router/Invoice');

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(cors());





app.use('/Invoice', invoiceRouter);



app.use((req, res) => {
  res.status(404).json({
    msg: 'Bad Request'
  })
})

module.exports = app;
