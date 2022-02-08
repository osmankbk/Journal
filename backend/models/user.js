// User Model
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;
let UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: "An Email is required.",
        trim: true,
    },
    firstName: {
        type: String,
        required: "Your First Name is required.",
        trim: true
    },
    lastName: {
        type: String,
        required: "Your Last Name is required.",
        trim: true
    },
    password: {
        type: String,
        required: "Password is required."
    },
    confirmPassword: {
        type: String,
        required: "Password is required.."
    },
    journals: [{
        type: Schema.Types.ObjectId, 
        ref: "Journal"
    }],
    meditations: [{
        type: Schema.Types.ObjectId, 
        ref: "Meditation"
    }],
}, { collection: "users"});

// hash password before saving to database
UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

// hash confirm password before saving to database
UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.confirmPassword, 10, function(err, hash){
        if(err) {
            return next(err);
        }
        user.confirmPassword = hash;
        next();
    });
});


let User = mongoose.model('User', UserSchema);
export default User;