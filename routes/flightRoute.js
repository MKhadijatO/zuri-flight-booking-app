const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.getAllFlights)
router.post('/', controller.bookFlights)
router.get('/:price',controller.getASingleFlight)
router.patch('/:price', controller.updateFlight)
router.delete('/:price', controller.deleteFlight)

module.exports = router;

