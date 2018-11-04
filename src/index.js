#!/usr/bin/env node

const express=require('express');
const app = express();
const port = process.env.PORT || 8080;
const duckpiler = require('../src/duckpiler.js');
var duck = new duckpiler();

app.get('/', function (req, res) {
    res.status(200).json({"status":"OK"})
});

app.get('/test', function (req, res) {
    // Procesar documento de prueba
    var name = 'test.md';
    name = duck.generateOutputFileName(name);
//    res.send({'filename':name});
    res.status(200).send({ filename: name });
});  

app.listen(port);
console.log('Server running at http://127.0.0.1:'+port+'/');


module.exports = app;
