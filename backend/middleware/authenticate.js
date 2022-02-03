import bcrypt from 'bcrypt';
import auth from 'basic-auth';
import User from '../models/user.js';


//Authenticate users
const authenticateUser = async(req, res, next) => {
    let message = null;
    try {
        const credentials = auth(req);
        if(credentials){
            const user = await User.findOne({email: credentials.name});
            if(user){
                const authenticated = bcrypt
                .compare(credentials.pass, user.password);
                if(authenticated){
                    console.log(`Authentication successful for email ${user.email}`)
                    req.currentUser = user;
                } else {
                    console.log(credentials.pass);
                    console.log(user.password);
                    message = `Authentication failure for email ${user.email}`;
                }
            } else {
                message = `User not found for email ${credentials.name}`;
            }
        } else {
            message = `Auth header not found`;
        }
        if(message){
            console.warn(message);
            res.status(401).json({message: 'Access Denied'});
        } else {
            next();
        }
    } catch(error){
        console.log({error: error.message});
    }
    
}

export default authenticateUser;