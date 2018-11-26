const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/loginapp', {
   useNewUrlParser: true
});
let connection = mongoose.connection;

//Check for errors
connection.on('error', (err) => {
   if (err) {
      console.log(err);
   }
});

//Check for connection
connection.once('open', () => console.log(`connection successful!`));
