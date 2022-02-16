const express = require('express');
const cors = require('cors');
const wordRouter = require('./backend/routers/wordRouter');
const partOfSpeechRouter = require('./backend/routers/partOfSpeechRouter');

const app = express();

app.use(cors());

app.use('/part-of-speech', partOfSpeechRouter);
app.use('/', wordRouter);

module.exports = app;
