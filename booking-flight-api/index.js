const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");

const fs = require ('fs')
const app = express();
const flight = require ('./flight.json')



app.use(express.json());
// app.use(express.urlencoded());

app.use(json());
app.use("/", routes);


//get all flight
app.get('/flight', (req, res) => {
  //send the flight array as response to the client
  return res.json({ flight })  
})


//add/book flight
app.post('/flight', (req, res) => {
  console.log(req.body.newFlight)
// create flight from client request
// save flight to existing database
flight.push(req.body.newFlight);
console.log({ flight })
// save updated file to flight.json
let stringedData = JSON.stringify(flight, null, 2);

//rewrite the file flight.json
fs.writeFile('flight.json', stringedData, function (err) {
  if(err) {
    return res.status(500).json( {message: err})
  }
})
// send back a response to client
return res.status(200).json({mmessage: "new flight added"})
})



//get single flight
app.get('/flight/:title', (req, res) => {
  // console.log(req.params.)
  let title = req.params.title;
  //find flight with title
  let foundFlight = flight.find(user => {
    return (user.title) === title
  })
  if (foundFlight) {
    return res.status(200).json({ user: foundFlight })
  } else {
    return res.status(404).json({ message: "flight not found" })
  }
  
})


//edit flight
// app.put('/flight/:title', (req, res) => {




//delete flight
// app.delete('/deleteUser', function (req, res) {
//   // First read existing users.
//   fs.readFile( __dirname + "/" + "flight.json", 'utf8', function (err, data) {
//      data = JSON.parse( data );
//      delete data["user" + 2];
      
//      console.log( data );
//      res.end( JSON.stringify(data));
//   });
// })



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
