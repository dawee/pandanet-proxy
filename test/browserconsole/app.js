#!/usr/bin/env node

var pandanetProxy = require('../../index'),
    http = require('http'),
    url = require('url'),
    fs = require('fs'),
    server;

server = http.createServer(function(request, response) {
    response.write(fs.readFileSync(__dirname + '/index.html'));
    response.end();
});

pandanetProxy.listen(server);
server.listen(8888);



