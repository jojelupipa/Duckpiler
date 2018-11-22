'use strict';

const request = require('request');
const fileSystem = require('fs');
const exec = require('child_process').exec;
const baseURL = 'https://raw.githubusercontent.com/libreim/apuntesDGIIM/master/';



module.exports = class Duckpiler {

    
    validateExtension(fileName) {
        if(typeof(fileName) !== 'string')
            return false;
        if(fileName.endsWith('.tex') || fileName.endsWith('.md'))
            return true;
        else 
            return false;
    }

    generateOutputFileName(fileName) {
        if(this.validateExtension(fileName) === true) {
            let index = fileName.lastIndexOf('.');
            fileName = fileName.slice(0, index);
            fileName = fileName.concat('.pdf');
            return fileName;
        }
        else
            return 'err';
    }


    getRawFile(path) {
        let url = baseURL + path;
        return new Promise( (resolve, reject) => {
            request(url, (error,response,body) => {
                if(response.statusCode === 200)
                    resolve(body);
                else
                    reject('error: '+ response.statusCode);
            });
        });
    }

    createPdf(inputFile) {
        return new Promise( (resolve, reject) => {
            exec('pandoc --latex-engine=xelatex ' + inputFile + ' -o ' + this.generateOutputFileName(inputFile),
                 error => {
                     if (error !== null) {
                         reject(error);
                     } else {
                         resolve('done');
                     }
                 });
        });
    }


   /**
     * Provides pdf from a specific path at target repository. 
     *
     * Gets raw file, writes it down and then calls createPdf to create it.
     *
     * @param {String} path - path of the target file
     **/
    
    getPdf(path) {
        let inputfile = path.replace('/','-');

        return new Promise( (resolve, reject) => {
            // get string from raw original file
            this.getRawFile(path)
                .then( value => {
                    // write down file
                    fileSystem.writeFile(
                        './' + inputfile,
                        value,
                         err  => {
                            if(err) {
                                reject('filesystem error creating file' + err);
                            }
                        }
                    );
                    // create pdf once file is written
                    this.createPdf(inputfile)
                        .then( () => {
                            //fileSystem.unlink('./' + inputFile); // removes src locally
                            resolve( 'done');
                        })
                        .catch( error => {
                            reject('error creating pdf: ' + error);
                        });
                })
                .catch(
                    error => {
                        console.log('Error getting file: ', error);
                        return 'error';
                    }
                );
        });
    }
}
