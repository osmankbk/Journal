import mongoose from 'mongoose';
const { Schema } = mongoose;
const MeditationSchema = new Schema({
    title: {
        type: String, default: 'Thoughts',                               
    },
    entry: {
        type: String,
        required: "A Meditation Entry is required.",
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
},  { timestamps: true }, { collection: "meditations"});

let Meditation = mongoose.model('Meditation', MeditationSchema);
export default Meditation;