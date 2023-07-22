const HttpError = require('../models/http-error');
const mongoose = require('mongoose');
const States = require('../models/States.js');

const getCityNames = async (req, res, next) => {
    const clickedStateName = req.params.cityname;
    let requestedState;
    try {
        requestedState = await States.findOne({ stateName: clickedStateName })
    } catch (err) {
        return next(new HttpError("error occured while searching for selected State", 500))
    }
    if (!requestedState) {
        return next(new HttpError("State not found", 404));
    }
    res.json({StateName: requestedState});
    res.status(200);
}


exports.getCityNames = getCityNames;
/* exports.addstate = addstate; */