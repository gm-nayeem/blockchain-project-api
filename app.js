// external import
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
require('./config/dbConn');

// internal import 
const productRoute = require('./routers/productRoute')

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// default route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'All are set perfectly!'
    })
});


// routes
app.use("/api/products", productRoute);


// error handle
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


module.exports = app;
