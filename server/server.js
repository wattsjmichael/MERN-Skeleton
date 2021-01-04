import express from 'express'
import devBundle from './devBundle' //Only for development mode
import path from 'path'
import template from './../template'
import { MongoClient } from 'mongodb'

const app = express()
devBundle.compile(app) // Only for development mode

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSetup'
MongoClient.connect(url, (err, db)=> {
  console.log('Connected successfully to mongodb server')
  db.close()
})

app.get ('/', (req, res) => {
  res.status(200).send(template())
})

let port = process.env.PORT || 3000
app.listen(port, function onStart (err){
  if (err){
    console.log(err)
  }
  console.info('Server started on port %s.', port)
})

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
//configures the Express app to return static files from the dist folder when the requested route starts with /dist

