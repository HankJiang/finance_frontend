const baseURL = process.env.NODE_ENV === 'production' ? 'http://81.68.211.167:9001' : 'http://localhost:9001';

console.log(baseURL);

export const request = require('axios').create({
    baseURL: baseURL,
    timeout: 600000,
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
});
