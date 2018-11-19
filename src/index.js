#!/usr/bin/env node

'use strict';

const express=require('express');
const app = express();
const port = process.env.PORT || 8080;
const duckpiler = require('../src/duckpiler.js');
var duck = new duckpiler();

app.get('/', function (req, res) {
    res.status(200).json({
        'routes':[
            {
                'route':'/',
                'description': 'Shows this page'
            }, 
            {
                'route': '/raw/:subject/:file ',
                'description': 'Get raw content from the specified :file and :subject from https://github.com/libreim/apuntesDGIIM'
            },
            {
                'route': '/status',
                'description': 'Shows the status of the service. Should be \'OK\' if everything is fine'
            },
            {
                'route': '/test',
                'description': 'Route for testing some functionalities'
            }
        ]
    })
});

app.get('/status', function (req, res) {
    res.status(200).json({'status':'OK'})
});

app.get('/test', function (req, res) {
    // Procesar documento de prueba
    let name = 'test.md';
    name = duck.generateOutputFileName(name);
//    res.send({'filename':name});
    res.status(200).json({ 'filename': name });
});

app.get('/raw/:subject/:file', function (req, res) {
    let rawtext;
    let route = 'https://raw.githubusercontent.com/libreim/apuntesDGIIM/master/' + req.params.subject + '/' + req.params.file;
    duck.getRawFile(route).then( value => {
        rawtext = value;
        res.status(200).json({
            'route': route,
            'rawtext': rawtext});
    }).catch(
        error => {
            res.status(404).json({
                'route': route,
                'error': 'file not found'});
        }
    );
});

app.listen(port);
console.log('Server running at http://127.0.0.1:'+port+'/');


module.exports = app;
