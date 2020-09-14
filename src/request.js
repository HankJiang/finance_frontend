const domain = process.env.PROJECT_ENV === 'production' ? 'http://http://81.68.211.167/:9001' : 'http://localhost:9001'

export const request = require('axios').create({
    baseURL: domain,
    timeout: 10000,
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
});
