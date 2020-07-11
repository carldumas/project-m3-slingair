'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { flights } = require('./test-data/flightSeating');
const PORT = process.env.PORT || 8000;

let customerData = {};

const handleFlights = (req, res) => {
    const allFlights = Object.keys(flights);
    res.status(200).json({ allFlights: allFlights });
};

const handleFlight = (req, res) => {
    const { flightNumber } = req.params;
    // get all flight numbers
    const allFlights = Object.keys(flights);
    // is flightNumber in the array?
    res.json(flights[flightNumber])
    console.log('REAL FLIGHT: ', allFlights.includes(flightNumber));
};

const handleSubmitOrderForm = (req, res) => {
    customerData = req.body;
    // console.log(customerData);
    res.json({ status: 'success' });
};

express()
    .use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    })
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))
    .set('view engine', 'ejs')

    // endpoints
    .get("/flights", handleFlights)
    .get('/flights/:flightNumber', handleFlight)
    .post('/users', handleSubmitOrderForm)
    .get('/confirmed', (req, res) => {
        res.render('pages/confirmed', { customerData: customerData });
    })
    .use((req, res) => res.send('Not Found'))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));
