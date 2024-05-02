const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const cors = require('cors')
const app = express()
const port = 3000
const dotenv = require('dotenv')
dotenv.config()
app.use(cors())
app.use(bodyParser.json())
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
client.connect();

// Database Name
const dbName = 'Passop';

//For getting Passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findresult = await collection.find({}).toArray();
  res.json(findresult)

})

//For Save passwords
app.post('/', async (req, res) => {
  const passwords = req.body
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findresult = await collection.insertOne(passwords);
  res.send({ 'success': true, 'Resutl': findresult })

})

//For Delete passwords
app.delete('/', async (req, res) => {
  const passwords = req.body
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findresult = await collection.deleteOne(passwords);
  res.send({ 'success': true, 'Resutl': findresult })

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})