import express from 'express';
const router = express.Router();
import Meditation from '../models/meditation.js';
import authorization from '../middleware/authorization.js';
import User from '../models/user.js';

// Async-await DRY func.
const asyncHat = (cb) => {
    return async(req, res, next) => {
        try {
            await cb(req, res, next);
        } catch(err) {
            res.status(500).json({
                error: err.message
            });
            console.error({err});
        }
    }
}

// This gets limits, skips, and get all entries of a user.
router.get('/meditations', authorization, asyncHat(async(req, res, next) => {
    try {
        const user = req.currentUser;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 11
        const offset = parseInt(page - 1) * limit
        let filter = {
            author: user._id
        };
        const meditations = await Meditation.find(filter).sort({'createdAt': -1}).limit(limit).skip(offset);
        const totalThoughts = await Meditation.find(filter).countDocuments();
        const numOfPages = parseInt(Math.ceil(totalThoughts / limit));
        const thoughts = {
            meditations,
            totalThoughts,
            numOfPages,
            page
        }
        return res.status(200).json(thoughts);
    } catch(err) {
        console.log(err);
        return res.json({
            error: err.message,
        })
    }
}));

// This get a single entry, using the entire's id.
router.get('/meditations/:id', asyncHat(async(req, res, next) => {
    const thought = await Meditation.findById(req.params.id);
    if(thought) {
        return res.status(200).json(thought);
    }
    return res.status(404).json({
        error: 'The Meditation entry you are looking for does not exist.'
    });
}));

// This posts an entry.
router.post('/meditations', authorization, asyncHat(async(req, res, next) => {
    try {
        const body = req.body;
        const meditation = new Meditation();

        meditation.title = body.title;
        meditation.entry = body.entry;
        meditation.author = req.currentUser;
        await meditation.save()
        .then((result) => {
            User.findOne({ _id: req.currentUser._id }, (err, user) => {
                if(user) {
                    user.meditations.push(meditation);
                    user.save();
                    console.log("Entry created!");
                }
                console.log(err);
            });
        });
        res.status(201).json(meditation);
    } catch(err) {
        console.log({
            error: err.message
        });
        return res.status(400).json({
            error: err.message
        })
    }
}));

// This Updates an entry.
router.put('/meditations/:id', asyncHat(async(req, res, next) => {
    try {
        const MeditationEntry = await Meditation.findById(req.params.id);
        const body = req.body;
        if(MeditationEntry) {
            let entry = {
                title: body.title,
                entry: body.entry,
            }
            await MeditationEntry.updateOne(entry);
            return res.status(204).end()
        }
        return res.status(404).json({
            'error': 'course not available'
        });

    } catch(err) {
        console.log({
            error: err.message
        });
    }
}));

// This Delete's an entry.
router.delete('/meditations/:id', asyncHat(async(req, res, next) => {
    const MeditationEntry = await Meditation.findById(req.params.id);
    if(MeditationEntry) {
        await Meditation.deleteOne(MeditationEntry);
        return res.status(204).end()
    }
    return res.status(404).json({
        'error': 'course not available'
    });
}));

export default router;