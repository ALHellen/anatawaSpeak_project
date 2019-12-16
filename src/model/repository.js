const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://localhost:27017/anatawaSeakApi';

function connect () {
  mongoose.connect(MONGO_URL,
    { useNewUrlParser: true },
    function (error) {
      if(error) {
        console.error("There is an error: ", error)
      } else {
        console.log("Connected.")
      }
    }
  );
}

module.exports = { connect }