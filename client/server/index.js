
  
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const accountSid="ACde6cf5089f9fd3e49835069e52553fa9"
const authToken='8a64a757bb7de41f850342f1b0e899d2'
const client=(accountSid,authToken)

const app = express();
app.use(cors());
app.use(twilio);

app.get('/', (req, res) => {

  res.send("hello");
});

app.get('/send-text', (req, res) => {

    const {recipient,textmessage}=req.query
    client.messages.create({
        body:textmessage,
        to:recipient,
        from:'+14782152812'
    })
  }).then((message)=>console.log(message.body))


app.listen(4000, () =>
  console.log('Express server is running on localhost:3001')
);