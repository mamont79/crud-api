require('dotenv').config({ path: './.env' });

const port = Number(process.env.PORT);

console.log(typeof port);
