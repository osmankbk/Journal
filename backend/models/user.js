// User Model
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;
const UserSchema = new Schema({
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
        required: "Password is required.",
    },
    confirmPassword: {
        type: String,
        required: "Password is required."
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



// My E-mail validation function, that checks to make sure the email path has a valid email input
// UserSchema.path('email').validate(function (email) {
//     var validEmail = /^[^@]+@[a-z]+\.[a-z]+$/i;
//     return validEmail.test(email.text); 
//  }, 'A valid E-mail is required.');

// hash password before saving to database
UserSchema.pre('save', async function(next) {
    let user = this;
    if(!this.isModified('password')) {
        return next();
    }
    const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        next();
});

// hash confirm password before saving to database
UserSchema.pre('save', async function(next) {
    let user = this;
    if(!this.isModified('confirmPassword')) {
        return next();
    }
    const hash = await bcrypt.hash(user.confirmPassword, 10);
    user.confirmPassword = hash;
});


let User = mongoose.model('User', UserSchema);
export default User;