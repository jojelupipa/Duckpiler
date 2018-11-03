const assert = require('assert');
const request = require('supertest');
const app = require('../src/index.js');
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


    
    describe('validateExtension()', function(){

        it('should return true if it is a valid extension', function() {
            assert.equal(duck.validateExtension('doc.tex'), true);
        });

        it('should return false if it is no a valid extension', function() {
            assert.equal(duck.validateExtension('doc.php'), false);
        });
    });

    describe('generateOutputFileName()', function(){

        it('should return the same file name but with .pdf extension', function() {
            assert.equal(duck.generateOutputFileName('mydoc.tex'), 'mydoc.pdf');
        });

        it('should return \'err\' if the file has a wrong name', function() {
            assert.equal(duck.generateOutputFileName('cats.dog'), 'err');
        });
    });
    
});

// Test funcionales

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
