#!/bin/env node
var fs = require('fs')

// Setup env
if (process.env.OPENSHIFT_APP_NAME) {
   // Running on openshift
   process.env.DDP_DEFAULT_CONNECTION_URL = 'http://' + process.env.OPENSHIFT_APP_DNS + ':8000';
   process.env.DDP_DEFAULT_CONNECTION_URL = 'https://' + process.env.OPENSHIFT_APP_DNS + ':8443';
   process.env.ROOT_URL  = 'http://' + process.env.OPENSHIFT_APP_DNS;
   process.env.MONGO_URL = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME;
   process.env.PORT      = process.env.OPENSHIFT_NODEJS_PORT;
   process.env.BIND_IP   = process.env.OPENSHIFT_NODEJS_IP;
} else {
   process.env.ROOT_URL  = "localhost";
   process.env.MONGO_URL = "mongodb://localhost:27017/meteor";
   process.env.PORT      = 8000;
   process.env.BIND_IP   = '127.0.0.1';
}

// Show connection details on startup
console.log("MONGO_URL IS: " + process.env.MONGO_URL);
console.log("ROOT_URL IS: " + process.env.ROOT_URL);
console.log("PORT: " + process.env.PORT);
console.log("BIND_IP: " + process.env.BIND_IP);

fs.stat('main.js', function(err, stat) {
// if the meteor application bundle is missing, 
// return additional installation instructions:
if(!err) {
  // Start meteor server
  require('./main.js');
}else{
  var http = require('http');
  // Start a server that returns a short list of instructions
  var dev_instructions = "<body><h2>Quase lá!</h2><p>Para continuar, veja instruções em <a href=\"https://github.com/getupcloud/openshift-meteorjs-quickstart\">https://github.com/getupcloud/openshift-meteorjs-quickstart</a>.</p></body>";
  http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(dev_instructions);
}).listen(process.env.PORT, process.env.BIND_IP);
  console.log('Server running at http://' + process.env.BIND_IP + ":" + process.env.PORT); 
}
});
