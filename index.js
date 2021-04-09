const express = require('express');
const router = require('./router/index');
var cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(express.static(__dirname + '/react'));

app.listen(3030);