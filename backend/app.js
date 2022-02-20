import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import journalRoutes from './routes/journals.js';
import meditationRoutes from './routes/meditations.js';
import passwordResetRoutes from './routes/passwordReset.js';

dotenv.config();

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';
// create the Express app
const app = express();

// CORS HTTP-header
app.use(cors());
// Morgan middleware to help us see our back end operations as run them.
app.use(morgan('dev'));
// An in-built method to recognize incoming requests objects as JSON objects
app.use(express.json());

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to my journaling app!"
    });
});

// import routes
app.use('/api', userRoutes);
app.use('/api', journalRoutes);
app.use('/api', meditationRoutes);
app.use('/api', passwordResetRoutes)

  app.use((req, res, next) => {
    res.locals.currentUser = req.session.user;
    next();
  });

// send 404 if no other route matched
app.use((req, res, next) => {
    res.status(404).json({
        error: `This Route does not exist in this app.`
    });
});

// setup a global error handler
app.use((err, req, res, next) => {
    if(enableGlobalErrorLogging) {
        console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
    }
   res.status(err.status || 500)
   .json({
       message: err.message,
       error: {}
   });
});

// Set port
app.set('port', process.env.PORT || 5000);

export default app;