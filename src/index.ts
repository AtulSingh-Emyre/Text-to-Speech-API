import { Server } from './server'
const https = require('https');
const fs = require('fs');
import {Request,Response} from 'express'
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// const port = process.env.PORT || 5000

const server = new Server().app
const port = process.env.PORT || 5000
server.listen(port, () => {



// https.createServer(options, new Server().app ).listen(port, () => {
  console.log('server is running')
})