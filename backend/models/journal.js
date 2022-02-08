// Journal Model
import mongoose from 'mongoose';
const { Schema } = mongoose;
const JournalSchema = new Schema({
    title: {
        type: String, default: 'Journal Entry',                               
    },
    entry: {
        type: String,
        required: "A Journal Entry is required.",
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
},  { timestamps: true }, { collection: "journals"});

let Journal = mongoose.model('Journal', JournalSchema);
export default Journal;