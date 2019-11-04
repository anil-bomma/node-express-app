// require dependencies
const config = require('config')     // for config variables
const express = require('express')   // Express web framework
const helmet = require('helmet')     // HTTP security
let fs = require('fs');

let bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser  
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require('cors')

const shortid = require('shortid');


// create an Express app
const app = express()

// use Helmet middleware to automatically set secure HTTP headers
app.use(helmet())
app.use(cors()) // Use this after the variable declaration
app.use(urlencodedParser);
app.use(bodyParser.json());
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


// or respond with JSON
app.post('/save-blog', (req, res) => {

  if (req.body.title && req.body.createdBy && req.body.description) {
    fs.readFile('./blogs.json', 'utf-8', function (err, data) {
      if (err) {
        console.log('error: ', err);
        res.send(err);
      } else {
        let arrayOfBlogs = JSON.parse(data);

        let blogData = req.body;

        let date = new Date();
        blogData.id = shortid.generate();
        blogData.date = date.toLocaleDateString();
        blogData.time = date.toLocaleTimeString();

        arrayOfBlogs.blog.unshift(blogData)

        fs.writeFile('./blogs.json', JSON.stringify(arrayOfBlogs), 'utf-8', function (err) {
          if (err) {
            console.log("err: ", err);
            res.send(err);

          } else {
            res.send({
              "statusCode": 200,
              "messsage": "blog added successfully"
            });
          }
        });
      }
    });
  } else {
    res.send({
      "errorCode": 400,
      "message": "bad request"
    });
  }
})


// or respond with JSON
app.get('/get-blog', (req, res) => {

  fs.readFile('./blogs.json', 'utf-8', function (err, data) {
    if (err) {
      console.log('error: ', err);
      res.send(err);
    } else {
      res.send(JSON.parse(data));
    }
  });
})




// news-content respond with JSON
app.post('/update/news-content', (req, res) => {

  if (req.body.content) {
    fs.readFile('./news-content.json', 'utf-8', function (err, data) {
      if (err) {
        console.log('error: ', err);
        res.send(err);
      } else {
        let contentJson = JSON.parse(data);

        contentJson.content = req.body.content;

        fs.writeFile('./news-content.json', JSON.stringify(contentJson), 'utf-8', function (err) {
          if (err) {
            console.log("err: ", err);
            res.send(err);

          } else {
            res.send({
              "statusCode": 200,
              "messsage": "content updated successfully"
            });
          }
        });
      }
    });
  } else {
    res.send({
      "errorCode": 400,
      "message": "bad request"
    });
  }
})


// or respond with JSON
app.get('/get/news-content', (req, res) => {

  fs.readFile('./news-content.json', 'utf-8', function (err, data) {
    if (err) {
      console.log('error: ', err);
      res.send(err);
    } else {
      res.send(JSON.parse(data));
    }
  });
})


// start listening and inform developers
app.listen(port, hostname, () => {
  console.log(`\n App listening at http://${hostname}:${port}/`)
  console.log(`\n Try going to different URIs:\n`)
  console.log(`   Try /say-hello`)
  console.log(`   Try /json`)
  console.log('\n Hit CTRL-C CTRL-C to stop\n')
})