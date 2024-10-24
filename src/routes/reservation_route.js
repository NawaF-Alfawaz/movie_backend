const express = require('express');
const {reserveTimeSlot} = require('../controllers/reservationControllers');


const router = express.Router();

router.post('/reserve', reserveTimeSlot);


module.exports = router;
