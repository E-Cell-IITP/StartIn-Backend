const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');

const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');

const {unless} = require("express-unless");

const app = express();

const cookieParser = require('cookie-parser');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(
    () => {
        console.log('Successfully connected to the database');
},
    (error) => {
        console.log('Could not connect to the database: ' + error);
    }
);

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: '/users/login', methods: ['POST'] }, // Login
            { url: '/users/register', methods: ['POST'] }, // Register
            { url: '/users/logout', methods: ['GET'] }, // Logout
            { url: '/users/create-user-profit', methods: ['POST'] }, // Create user profit
            { url: '/users/team-register', methods: ['POST'] }, // Team register
            { url: '/users/find-user-in-team', methods: ['GET'] }, // Find user in team
        ],
    })
);

app.use(express.json());
app.use(cookieParser());

app.use('/users', require('./routes/users.routes'));

app.use(errors.errorHandler);

app.listen(process.env.port || 4000, function () {
    console.log('Server is listening on port 4000');
});
