import express from 'express';
const router = express.Router();
import Journal from '../models/journal.js'; 
import authenticate from '../middleware/authenticate.js';
import User from '../models/user.js';



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
router.get('/entries', authenticate, asyncHat(async(req, res, next) => {

    try {
        const user = req.currentUser;
        let filter = { author: user._id };
        const allEntries = await Journal.find(filter);
        return res.status(200).json(allEntries);
    } catch(err) {
        console.log({
            error: err.message,
        })
    }
}));

router.get('/entries/:id', asyncHat(async(req, res, next) => {
    const entry = await Journal.findById(req.params.id);
    if(entry) {
        return res.status(200).json(entry);
    }
    return res.status(404).json({
        error: 'The journal entry you are looking for does not exist.'
    });
}));

router.post('/entries', authenticate, asyncHat(async(req, res, next) => {
    try {
        const body = req.body;
        const journal = new Journal();

        journal.title = body.title;
        journal.entry = body.entry;
        journal.author = req.currentUser;
        await journal.save()
        .then((result) => {
            User.findOne({ _id: req.currentUser._id }, (err, user) => {
                if(user) {
                    user.journals.push(journal);
                    user.save();
                    console.log("Entry created!");
                }
                console.log(err);
            });
        });
        res.status(201).json(journal);
    } catch(err) {
        console.log({
            error: err.message
        });
        return res.status(400).json({
            error: err.message
        })
    }
}));

router.put('/entries/:id', asyncHat(async(req, res, next) => {
    try {
        const journalEntry = await Journal.findById(req.params.id);
        const body = req.body;
        if(journalEntry) {
            let entry = {
                title: body.title,
                entry: body.entry,
            }
            await journalEntry.updateOne(entry);
            return res.status(204).end()
        }
        return res.status(404).json({
            error: 'course not available'
        });

    } catch(err) {
        console.log({
            error: err.message
        });
    }
}));

router.delete('/entries/:id', asyncHat(async(req, res, next) => {
    const journalEntry = await Journal.findById(req.params.id);
    if(journalEntry) {
        await Journal.deleteOne(journalEntry);
        return res.status(204).end()
    }
    return res.status(404).json({
        'error': 'course not available'
    });
}));


export default router;