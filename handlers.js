const { flights } = require('./test-data/flightSeating');

let customerData = {};

const handleFlights = (req, res) => {
    const allFlights = Object.keys(flights);
    res.status(200).json({ allFlights: allFlights });
};

const handleFlight = (req, res) => {
    const { flightNumber } = req.params;
    if (!flights[flightNumber]) {
        res.status(400).send({ error: 'Unable to find flight number.' });
    } else {
        res.status(200).json(flights[flightNumber]);
    }
};

const handleSubmitOrderForm = (req, res) => {
    customerData = req.body;
    res.status(200).json({ status: 'success' });
};

const handleOrderConfirmed = (req, res) => {
    res.render('pages/confirmed', { customerData: customerData });
};

module.exports = {
    handleFlights,
    handleFlight,
    handleSubmitOrderForm,
    handleOrderConfirmed,
};
