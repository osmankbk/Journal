import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

// Our package that loads environmental variable into our process.env object
dotenv.config();

// mongodb Atlas connection
mongoose.connect(process.env.JOURNAL);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// Start listening on form port
const server = app.listen(app.get('port'), () => {
    console.log(`Server is listening on port: ${server.address().port}`)
})