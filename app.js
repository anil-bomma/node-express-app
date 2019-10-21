// require dependencies
const config = require('config')     // for config variables
const express = require('express')   // Express web framework
const helmet = require('helmet')     // HTTP security

// create an Express app
const app = express()

// use Helmet middleware to automatically set secure HTTP headers
app.use(helmet())

// Use hosting values if available, otherwise default 
const environment = process.env.NODE_ENV || 'development'
const hostname = process.env.HOSTNAME || config.get("hostname")
const port = process.env.PORT || config.get("port");

// Use Express app.get() methods to configure endpoints

// declare your callback function the old way
app.get('/', function (req, res) {
  res.send('<div style="background: #eee;min-height: 100vh;padding: 2%;"><h1 style="color:#6b70b7;text-align: center">Say Hello to Node with Express</h1>  <br> <br>' +
    'Try going to different URIs by adding these at the end to url: <br> <br>' +
    'say-hello: <a href="say-hello" target="blank">click-here</a> <br>' +
    'json: <a href="json" target="blank">click-here</a> <br>' +
    '<br> <br>' +
    'Fork the source code from <a href="https://github.com/anil-bomma/node-express-app" target="blank">https://github.com/anil-bomma/node-express-app</a></div>'
  )
})

// or use the new arrow function syntax
// respond with text
app.get('/say-hello', (req, res) => {
  res.send('Hello World...!')
})

// or respond with JSON
app.get('/json', (req, res) => {
  res.send('{"name" : "Anil Bomma","roll":"07", "class":"Web-Apps"}')
})


// start listening and inform developers
app.listen(port, hostname, () => {
  console.log(`\n App listening at http://${hostname}:${port}/`)
  console.log(`\n Try going to different URIs:\n`)
  console.log(`   Try /say-hello`)
  console.log(`   Try /json`)
  console.log('\n Hit CTRL-C CTRL-C to stop\n')
})

// Utility to see if an object is empty or not

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

// generates a random value in [low,high) 
function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}