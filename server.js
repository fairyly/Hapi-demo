'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const DemoController =  require('./src/controllers/test');
const MongoDBUrl = 'mongodb://localhost:27017/demoapi';

const server = new Hapi.Server({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/demos',
  handler: DemoController.list
});

server.route({
  method: 'GET',
  path: '/demos/{id}',
  handler: DemoController.get
});
server.route({
  method: 'POST',
  path: '/demos',
  handler: DemoController.create
});

server.route({
  method: 'PUT',
  path: '/demos/{id}',
  handler: DemoController.update
});

server.route({
  method: 'DELETE',
  path: '/demos/{id}',
  handler: DemoController.remove
});

(async () => {
  try {  
    await server.start();
    // Once started, connect to Mongo through Mongoose
    mongoose.connect(MongoDBUrl, {}).then(() => { console.log(`Connected to Mongo server`) }, err => { console.log(err) });
    console.log(`Server running at: ${server.info.uri}`);
  }
  catch (err) {  
    console.log(err)
  }
})();