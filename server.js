const express = require('express');
const request = require('request');

const dotenv = require('dotenv');
dotenv.config();

const server = express();
const apiKey = process.env.APIKEY; // need to swap out into .env file

// joke credits go to http://elijahmanor.com/front-end-web-dev-jokes/
const jsjokes = [
  'Q: How do you comfort a JavaScript bug?\n\nA: You console it',
  'When a JavaScript date has gone bad, “Don’t call me, I’ll callback you. I promise!”',
  'Dev1 saw a strange JavaScript function & asked, “What is this?”.\n\nDev2 responded, “I don’t know. I would’ve called you, but I was in a bind”',
  'Q: Why was the JavaScript developer sad?\n\nA: Because he didn’t Node how to Express himself',
  'Q: Why did Jason cover himself with bubble wrap?\n\nA: Because he wanted to make a cross-domain JSONP request.',
  'Q: How did the doctor revive the developer?\n\nA: The dev wasn’t responsive so the doc picked him up by his bootstraps',
  'Q: Why did the developer go broke?\n\nA: Because he used up all his cache',
  'Q: Why did the JavaScript boxer go to the chiropractor?\n\nA: Because his backbone was angular from a knockout and required attention.'
];

server.get('/', (req, res) => {
  res.send('hello!'); 
});

server.post('/', (req, res) => {
  req.on('data', (data) => {
    data = JSON.parse(data.toString());
    const random = Math.floor(Math.random() * jsjokes.length);
    const jsjoke = jsjokes[random];
    let message = data.text;
    if (message.split(' ')[0] === '/jsjoke') {
      const payload = {
        "apiKey": apiKey,
        "method": "message",
        "room": data.room,
        "action": {
          "text": jsjoke,
          "image": null,
          "avatar": "http://www.lolriot.com/wp-content/uploads/2013/06/awesome.png"
        }
      };

      console.log('ping by GitTalk');
      console.log('sending joke:');
      console.log(jsjoke);

      request.post({
        url: 'http://localhost:8000/apps',
        //url: 'http://gittalk.co/apps',
        json: payload
      }, (err, response, body) => {
        if (err) { 
          console.log(err);
        }
      });
    }
    res.end();        
  });
});

console.log(`listening to port ${ process.env.PORT || 9876 }`);
server.listen(9876);
