const express = require('express');
const router = express.Router();
const toursController = require('../controllers/tour.controller');


router.route("/trending").get(toursController.getTrendingTours);

router.route("/cheapest").get(toursController.getCheapestTours);

router.route("/").get(toursController.getTours).post(toursController.createTours);

router.route("/:id").get(toursController.getATourDetails).patch(toursController.updateATourDetails);


module.exports = router;