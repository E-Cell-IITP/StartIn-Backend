const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');

const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');

const {unless} = require("express-unless");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    () => {
        console.log('Successfully connected to the database');
},
    (error) => {
        console.log('Could not connect to the database: ' + error);
    }
);

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: '/users/login', methods: ['POST'] }, // Login
            { url: '/users/register', methods: ['POST'] }, // Register
        ],
    })
);

app.use(express.json());

app.use('/users', require('./routes/users.routes'));

app.use(errors.errorHandlers);

app.listen(process.env.port || 4000, function () {
    console.log('Server is listening on port 4000');
});
