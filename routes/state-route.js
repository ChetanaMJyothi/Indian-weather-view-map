const express = require('express');
const stateController = require('../controllers/state-controllers');

const router = express.Router();

router.get('/:cityname', stateController.getCityNames);

/* router.post('/', stateController.addstate); */
router.get('/', (req, res, next) => {
    console.log("Get request");
    res.json({ message: "It works!" })
})
module.exports = router;