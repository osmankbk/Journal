import express from 'express';
import User from '../models/user.js';
import authenticate from '../middleware/authenticate.js';
const router = express.Router();



// My DRY async-await function
const asyncHat = (cb) => {
    return async(req, res, next) => {
        try {
            await cb(req, res, next);
        } catch(error) {
            res.status(500).json({error: error.message});
            console.error({error});
        }
    }
}

// This gets, authenticate and return user, when called.
router.get('/users', authenticate, asyncHat(async(req, res, next) => {
    let user = req.currentUser;
    await User.findOne({_id: user._id})
    .populate('journals').populate('meditations').then( result => {
        return res.status(200).json(result).end();
    }).catch(err => {
        return res.status(500).json({err});
    })
}));

// This registers a user
router.post('/register', asyncHat(async(req, res, next) => {
    try {
        let body = req.body;
        let userData = {
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password,
            confirmPassword: body.confirmPassword
        }
        const user = await User.create(userData);
        return res.status(201).end();
    } catch(error) {
        console.log(error);
        return res.status(400).json({
            errors: error.message
        });
    }
}));



export default router;