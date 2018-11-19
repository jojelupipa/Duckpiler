'use strict';

const request = require('request');
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
            var index = fileName.lastIndexOf('.');
            fileName = fileName.slice(0, index);
            fileName = fileName.concat('.pdf');
            return fileName;
        }
        else
            return 'err';
    }


    getRawFile(path) {
        let url = baseURL + path;
        return new Promise((resolve, reject) =>{
            request(url, (error,response,body) => {
                if(response.statusCode === 200)
                    resolve(body);
                else
                    reject('error:'+ response.statusCode);
            });
        });
    }
}
