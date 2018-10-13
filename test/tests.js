var assert = require('assert');
const duckpiler = require('../src/duckpiler.js');

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
