import process from 'process';

require('dotenv').config({ path: './.env' });

const port = process.env.PORT;

console.log(port);
