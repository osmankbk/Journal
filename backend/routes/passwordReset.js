import express from 'express';
import User from '../models/user.js';
import Token from '../models/token.js';
import sendEmail from '../utilities/sendEmail.js';
import crypto from "crypto";
const router = express.Router();


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

router.post("/passwordreset", asyncHat(async(req, res) => {
    try {

        let body = req.body;
        const user = await User.findOne({ email: body.email });
        if (!user) {
            console.log("no user");
            return res.status(400).send("user with given email doesn't exist");
        }

        let token = await Token.findOne({ userId: user._id });
        
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }
        const link = `${process.env.BASE_URL}/${user._id}/${token.token}`;
        await sendEmail(user.email,
            "Password reset",
            {   name: user.firstName,
                link: link,
            },
            "/email_templates/resetPasswordRequest.handlebars",
            );
        return res.status(200).json(token).end();

    } catch (error) {
        res.status(535).json(error);
    }
}));

router.post("/passwordreset/:userId/:token", async (req, res, next) => {
    try {
        
        const userId = req.params.userId;
        const tokenId = req.params.token;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        const token = await Token.findOne({ 
            userId,
            token: tokenId,  
        });

        if (!token) {
            return res.status(400).json({
                error: "Invalid link or expired",
            });
        } 
       
        const user = await User.findById({ _id: userId });
        user.password = password;
        user.confirmPassword = confirmPassword;
        await user.save();
        await sendEmail(
            user.email,
            "Password successfully changed!",
            {   name: user.firstName },
            "/email_templates/resetPassword.handlebars",
            );

        await token.deleteOne();

        return res.status(204).json(user);
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
});

export default router;