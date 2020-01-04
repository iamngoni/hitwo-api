const config = require('./config');
const app = require('./app');
const db = require('./db');

console.log(config.env);

db().then(dbconnection => {
    console.log('db connected');
    console.log(config.message);
    app.listen(config.port, () => {
        console.log(`API up on port: ${config.port}`);
    });
}).catch(e => console.log(e.message));
