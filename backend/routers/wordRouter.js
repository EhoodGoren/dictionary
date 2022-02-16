const express = require('express');
const docClient = require('../awsConnection');

const router = express.Router();

const table = 'dictionary';

router.get('/:word/:partOfSpeech', async (req, res) => {
    const { word, partOfSpeech } = req.params;
    const params = {
        TableName: table,
        KeyConditionExpression: "word = :w and begins_with(part_of_speech, :p)",
        ExpressionAttributeValues: {
            ":w": word,
            ":p": partOfSpeech
        },
        Limit: 10
    }
    try {
        const wordMatch = await docClient.query(params).promise();
        const randomMatch = wordMatch.Items[Math.floor(Math.random() * wordMatch.Items.length)];
        res.send(randomMatch);
    } catch (error) {
        console.log(error);
        res.status(500).send('Try again');
    }
})

router.get('/:word', async (req, res) => {
    const { word } = req.params;
    const params = {
        TableName: table,
        KeyConditionExpression: "word = :w",
        ExpressionAttributeValues: {
            ":w": word,
        }
    }
    try {
        const wordMatch = await docClient.query(params).promise();
        wordMatch.Items.length > 0 ? 
            res.send(wordMatch.Items) :
            res.status(404).send("Word doesn't exist");
    } catch (error) {
        console.log(error);
        res.status(500).send('Try again');
    }
});

module.exports = router;
