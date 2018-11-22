'use strict';

const assert = require('chai').assert;
const request = require('supertest');
const fs = require('fs');
//const app = require('../src/index.js');
const duckpiler = require('../src/duckpiler.js');


// Tests unitarios

describe('Duckpiler', function(){

    var duck = new duckpiler();
    // Testea que se haya cargado bien la librería
    describe('Carga', function(){

        it('should be loaded', function(){
	    assert(duckpiler, "Loaded");
	});
        
    });


    
    describe('validateExtension(filename)', function() {

        it('should return true if it is a valid extension', function() {
            assert.equal(duck.validateExtension('doc.tex'), true);
        });

        it('should return false if it is no a valid extension', function() {
            assert.equal(duck.validateExtension('doc.php'), false);
        });
    });

    describe('generateOutputFileName(filename)', function() {

        it('should return the same file name but with .pdf extension', function() {
            assert.equal(duck.generateOutputFileName('mydoc.tex'), 'mydoc.pdf');
        });

        it('should return \'err\' if the file has a wrong name', function() {
            assert.equal(duck.generateOutputFileName('cats.dog'), 'err');
        });
    });

    describe('getRawfile(path)', () => {
        it('should return a raw string from github file', () => {
            let rawtext;
            duck.getRawFile('AC/ejercicios.md')
                .then( value => {
                    rawtext = value;
                    //console.log(rawtext);
                    assert.typeOf(rawtext, 'string');
                    assert(!rawtext.startsWith('error:'));
                })
                .catch(
                    error => {
                        assert.isNotOk(
                            error,
                            'this sould not happen if that url still exists'
                        );
                    }
                );
        });
    });

    /** createPdf is tested in the following test(?)

    describe('createPdf(inputfile)', () => {
        it('should create a pdf file out of a local file', () => {
            duck.createPdf('README.md')
                .then( () => {
                    assert.isOk(fs.existsSync('README.pdf'), 'pdf created');
                })
                .catch( error => {
                    assert.fail('pdf has not been created: ' + error);
                });
        });
    });
    **/
    
    describe('getPdf(path)', () => {
        let route = 'FIS/apuntes.md';
        it('should create a pdf file out of a path (remote file: ' + route + ')',
           () => {
               duck.getPdf(route)
                   .then( () => {
                       assert(fs.existsSync('FIS-apuntes.pdf'));
                   })
                   .catch( error => {
                       assert.fail('pdf could not be obtained: ' + error);
                   });
                  
           });
    });
    
});

// Test funcionales

/*
describe('Tests despliegue', function(){

    describe('GET /', function() {
        it('should return JSON'), function(done) {
            request(app)
                .get('/')
                .expect('Content-Type', /json/)
                .expect(200,done);
        }
    });

        describe('GET /test', function() {
        it('should return JSON'), function(done) {
            request(app)
                .get('/test')
                .expect('Content-Type', /json/)
                .expect(200,done);
        }
    });
});

*/
