const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema(
    {
        name: {
            type: String,
            required: false
        },
        gender: {
            type: String,
            required: false
        },
        age: {
            type: Number,
            required: false
        },
        zip: {
            type: String,
            required: false
        },

        daysOfWeek: {
            type: Map,
            of: String,
            required: false
        },
        timeframeNote: {
            type: String,
            required: false
        },
        priority: {
            type: Number,
            required: false
        },
        covid : {
type: String,
require: false
        },
        testName : {
            type: String,
            require: false
                    },
        content: {
            type: String,
            required: false
        },
        // savedBy: {
        //     type: Schema.ObjectId,
        //     required: true
        // }
    },
    { timestamps: false },
);

module.exports = mongoose.model('item', Item);
