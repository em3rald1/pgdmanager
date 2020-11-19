let fs = require('fs');

/**
 * @param {String} key
 * @param {String} value
 */

module.exports.write = (key, value) => {
    let data = fs.readFileSync('data.json', 'utf-8');
    data = JSON.parse(data);
    data[key] = value;
    fs.writeFileSync('data.json', JSON.stringify(data));
}

/**
 * 
 * @param {String} key 
 */

module.exports.read = (key) => {
    let data = fs.readFileSync('data.json', 'utf-8');
    return JSON.parse(data)[key];
}