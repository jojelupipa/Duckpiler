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
    
}

