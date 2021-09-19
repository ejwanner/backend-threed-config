const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const Router = require("./routes");
const dotenv = require("dotenv");
const cors = require('cors');

// add the .env file for the database credentials
dotenv.config();
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jrgao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// start express app
const app = express();

app.use(express.json());
// configure app to use bodyParser
app.use(bodyParser.json());

// enable cors
app.use(cors());
app.options('*', cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

// connect api to mongoDb database with mongoose
mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        })
        .catch(err => console.log(err))

// check if db is connected
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

// use the router for the api
app.use(Router);


// api listen on Port 3000
app.listen(3000, () => {console.log("Server is running at port 3000"); });
