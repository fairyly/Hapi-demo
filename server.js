'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const hapiAuthJWT = require('hapi-auth-jwt2');
const jwksRsa = require('jwks-rsa');
const DemoController =  require('./src/controllers/demo');
const MongoDBUrl = 'mongodb://localhost:27017/demoapi';

const server = new Hapi.Server({
  port: 3000,
  host: 'localhost'
});


const validateUser = (decoded, request, callback) => {
  // This is a simple check that the `sub` claim
  // exists in the access token. Modify it to suit
  // the needs of your application
  console.log("Decoded", decoded);
  if (decoded && decoded.sub) {
    return callback(null, true, {});
  }

  return callback(null, false, {});
}

const registerRoutes = () => {
  server.route({
    method: 'GET',
    path: '/demos',
    options: {
      handler: DemoController.list
    }
  });

  server.route({
    method: 'GET',
    path: '/demos/{id}',
    options: {
      handler: DemoController.get
    }
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
}

const init = async() => {
  await server.register(hapiAuthJWT);
  // see: http://hapijs.com/api#serverauthschemename-scheme
  server.auth.strategy('jwt', 'jwt', { 
    key: jwksRsa.hapiJwt2Key({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://fairyly.auth0.com/.well-known/jwks.json'
    }),
    verifyOptions: { 
      audience: 'https://mydogapi.com',
      issuer: "https://fairyly.auth0.com/",
      algorithms: ['RS256']
    },
    validate: validateUser
  });

  server.auth.default('jwt');

  registerRoutes();

  await server.start();
  return server;

};

init().then(server => {
  console.log('Server running at:', server.info.uri);
}).catch(err => {
  console.log(err);
});