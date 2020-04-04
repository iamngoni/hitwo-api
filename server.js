const config = require('./config');
const app = require('./app');
const db = require('./db');

app.all('/', (req, res) => {
    res.json({
        note: 'Hello & welcome to my custom rest api',
        instructions: {
            instruction1: "1. Use the following endpoint for registering new users 'POST /signup'",
            instruction2: "2. Use the following endpoint for signing in usrs into the system 'POST /signin'",
            instruction3: "3. Response - the response from the above endpoints will be a json response with the username, email, mobileNumber and likes - 200 http status response"
        }
    });
});

db().then(dbconnection => {
    console.log(`Connected to database: ${config.message}.`);
    app.listen(config.port, () => {
        console.log(`API up on port: ${config.port}.`);
    });
}).catch(e => console.log(e.message));
