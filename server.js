
// my goal is for user to input their date and they are given their signs based on the data from
//the API.  they can then input it and ????
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { request } = require('express');
const MongoClient = require('mongodb').MongoClient

var db, collection;
//URL from mongodb website cluster
const url = "mongodb+srv://geminimoonchild:1234@cluster0.o3h3upz.mongodb.net/personalExpress?retryWrites=true&w=majority";
const dbName = "personalExpress";

app.listen(8080, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });

  
//MAKE SURE TO CHANGE THIS TO MISTYFOXSONG AND THE HOROSCOPE PROJECT
const url = "mongodb+srv://mistyfoxsong:1234@cluster0.ndqi8wd.mongodb.net/Horoscope?retryWrites=true&w=majority";
const dbName = "Horoscope";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });

});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))








//this request is making a READ/GET request from the root and asking it to retrieve
//everything it knows about the request and response.
// it go into the database, into the collection called "messages" and find the data
//turn the data into an Array. If there's an error, let us know, if not, render the index.ejs
//page and display the object (document) from our database from messages collection and the result data

app.get('/', (req, res) => {
  db.collection('birthChart').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { messages: result })
  })
})
//THIS WAS CHANGED TO birthChart
app.post('/birthChart', (req, res) => {
  function check() {

//this is to insert a new task from the user
app.post('/messages', (req, res) => {
  let day = req.body.day
  
  //pre conversion checks to see what the typeof Day is
  if (typeof day === 'string' /* This means only ONE day of the week was sent */) {
    day = [day] /* We change it to an array that it is easier for Mongo to work with */
  }

  db.collection('messages').insertOne({ task: req.body.task, day: day }, 
    (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/')
    })
})


//this is to update the tasks
app.put('/messages', (req, res) => {
  db.collection('messages')
    .findOneAndUpdate({ task: req.body.task }, {
      $set: {
        
      }
    }, {
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)

    })
})

//I need to find a way to select the day so that the task is sorted into the chosen day



app.delete('/messages', (req, res) => {
  console.log("Info Being sent from the Front End: ", req.body)

  const day = req.body.day.split(",")
  console.log("Array Conversion: ", day)
  
  db.collection('messages').findOneAndDelete({ task: req.body.task, day: day }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
