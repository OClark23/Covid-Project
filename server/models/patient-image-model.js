const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientImage = new Schema(
    {
        PATIENT_ID: {
            type: String,
            required: true
        },
        DIAGNOSIS_IMG_STUDY: {
            type: Number,
            required: true
        },
        DIAGNOSIS_IMG_TIME: {
            type: Number,
            required: true
        },
        IMAGE_STUDY_DESCRIPTION: {
            type: String,
            required: true
        },
        STUDY_MODALITY: {
            type: [String],
            required: true
        },
        TIME_IMG_STUDY: {
            type: Number,
            required: false
        },
        KEY_FINDINGS: {
            type: String,
            required: true
        },
        PNG_FILENAME: {
            type: String,
            required: true
        },
        EXAM_ID: {
            type: String,
            required: true
        },
    },
    { timestamps: true },
);



module.exports = mongoose.model('patient-image', PatientImage);
