import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

// Our package that loads environmental variable into our process.env object
dotenv.config();

// mongodb Atlas connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then( () => console.log("MongoDB Atlas, connected!"))
  .catch((error) => console.log('Error connecting to MongoDB Atlas', error));


// Start listening on form port
const server = app.listen(app.get('port'), () => {
    console.log(`Server is listening on port: ${server.address().port}`)
})