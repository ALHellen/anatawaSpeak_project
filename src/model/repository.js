const mongoose = require('mongoose');
const MONGO_URL = '';

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