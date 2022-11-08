const { flightModel } = require("../models/Flight");

exports.getAllFlights = (req, res) => {
  return res.json(flightModel);
};

exports.bookFlights = (req, res) => {
  const newFlight = {
    title: req.body.title,
    time: req.body.time,
    price: req.body.price,
    date: req.body.date,
  };
  flightModel.push(newFlight);
  return res.json({message:"Flight booked!",newFlight});
};

exports.getASingleFlight = (req, res) => {
    const price = parseInt(req.params.price)
    const findFlight = flightModel.find(flight => flight.price === price)
    if(!findFlight){
        return res.status(404).json({message:"Flight not found"})
    } else {
        return res.json(findFlight)
    }
}

exports.updateFlight = (req, res) => {
    const price = parseInt(req.params.price)
    const findFlight = flightModel.find(flight => flight.price === price)
    if(!findFlight){
        return res.status(404).json({message:"Flight not found"})
    } else {
        if(req.body.time){
            findFlight.time = req.body.time
        }
        if(req.body.date){
            findFlight.date = req.body.date
        }
        return res.json({message:"Flight updated",findFlight})
    }
}


exports.deleteFlight = (req, res) => {
    const price = parseInt(req.params.price)
    const findFlight = flightModel.find(flight => flight.price === price)
    if(!findFlight){
        return res.status(404).json({message:"Flight not found"})
    } else {
        flightModel.splice(findFlight,1)
        return res.json({message:"Flight deleted!"})
    }
}
