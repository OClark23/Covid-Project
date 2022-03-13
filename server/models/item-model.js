const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        zip: {
            type: Number,
            required: true
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
require: true
        },
        testName : {
            type: String,
            require: true
                    },
        content: {
            type: String,
            required: true
        },
        // savedBy: {
        //     type: Schema.ObjectId,
        //     required: true
        // }
    },
    { timestamps: true },
);

module.exports = mongoose.model('item', Item);
