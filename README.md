# Dictionary-backend

This project is an Express.js app, which is the back-end of a dictionary project.

You can check the deployment on AWS S3, at this URL:

http://eg-dictionary-client.s3-website-eu-west-1.amazonaws.com/

## Endpoints
* `GET /:word` - Returns all part of speeches + definitions of a word (one definition or more)

* `GET /:word/:partOfSpeech` - Returns a definition for the word which has the specified part of speech (if there is more then one, returns a random match)

* `GET /part-of-speech/:part` - Returns a random word (with its definition) which has the specified part of speech (returns a random word from all matches)

* `GET /part-of-speech/:part?letter=X` - Returns a random word (with its definition) which has the specified part of speech and also starts with a given letter (returns a random one from all matches if there is more than one)

## Database

All of the words' data is stored in AWS dynamoDB, a NoSQL database. The word and part of speech of each word are indexed for fast querying. 

## Deployment

The app was deployed with the serverless framework to an AWS lambda, which is invoked by AWS API Gateway

### Front-end

You can check the front-end repo at:

https://github.com/EhoodGoren/dictionary-client
