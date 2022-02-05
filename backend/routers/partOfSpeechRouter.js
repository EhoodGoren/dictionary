const express = require('express');
const docClient = require('../awsConnection');

const router = express.Router();

const table = 'dictionary';

router.get('/:part', async (req, res, next) => {
    const { letter } = req.query;
    if(!letter) return next();
    const { part } = req.params;
    const params = {
        TableName: table,
        IndexName: 'part_of_speech-word-index',
        KeyConditionExpression: "part_of_speech = :p and begins_with(word, :l)",
        ExpressionAttributeValues: {
            ":p": part,
            ":l": letter
        },
        Limit: 10
    }
    try {
        const partMatch = await docClient.query(params).promise();
        const randomMatch = partMatch.Items[Math.floor(Math.random() * partMatch.Items.length)];
        res.send(randomMatch);
    } catch (error) {
        console.log(error);
        res.status(500).send('Try again');
    }
});

router.get('/:part', async (req, res) => {
    const { part } = req.params;
    const params = {
        TableName: table,
        IndexName: 'part_of_speech-word-index',
        KeyConditionExpression: "part_of_speech = :p",
        ExpressionAttributeValues: {
            ":p": part,
        },
        Limit: 10
    }
    try {
        const partMatch = await docClient.query(params).promise();
        const randomMatch = partMatch.Items[Math.floor(Math.random() * partMatch.Items.length)];
        res.send(randomMatch);
    } catch (error) {
        console.log(error);
        res.status(500).send('Try again');
    }
});

module.exports = router;
