const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient = new Schema(
    {
        PATIENT_ID: {
            type: String,
            required: true
        },
        AGE: {
            type: Number,
            required: true
        },
        SEX: {
            type: String,
            required: true
        },
        RACE: {
            type: String,
            required: false
        },
        ZIP: {
            type: Number,
            required: true
        },
        LATEST_BMI: {
            type: Number,
            required: false
        },
        LATEST_WEIGHT: {
            type: Number,
            required: false
        },
        LATEST_HEIGHT: {
            type: String,
            required: true
        },
        TUBERCULOSIS: {
            type: String,
            required: true
        },
        SYSTEMIC_LUPUS_ERYTHMATOSUS: {
            type: String,
            required: true
        },
        RHEUMATOID_ARTHRITIS: {
            type: String,
            required: true
        },
        EXTENSIVE_BURNS: {
            type: String,
            required: true
        },
        ASPLENIA: {
            type: String,
            required: true
        },
        HYPOSPLENIA: {
            type: String,
            required: true
        },
        MEASLES: {
            type: String,
            required: true
        },
        CYTOMEGALOVIRUS: {
            type: String,
            required: true
        },
        CHICKEN_POX: { 
            type: String,
            required: true
        },
        HERPES_ZOSTER: {
            type: String,
            required: true
        },
        MALNUTRITION: {
            type: String,
            required: true
        },
        CURRENT_PREGNANT: {
            type: String,
            required: true
        },
        CHRONIC_KIDNEY_DISEASE: {
            type: String,
            required: true
        },
        DIABETES_TYPE_I: {
            type: String,
            required: true
        },
        DIABETES_TYPE_II: {
            type: String,
            required: true
        },
        TRANSPLANT: {
            type: String,
            required: true
        },
        HEMODIALYSIS_PRE_DIAGNOSIS: {
            type: String,
            required: true
        },
        HEMODIALYSIS_POST_DIAGNOSIS: {
            type: String,
            required: true
        },
        CANCER: {
            type: String,
            required: true
        },
        COVID_TEST_POSITIVE: {
            type: String,
            required: true
        },
        TEST_NAME: {
            type: String,
            required: true
        },
        ICU_ADMIT: {
            type: String,
            required: true
        },
        NUMBER_ICU_ADMTIS: {
            type: String,
            required: true
        },
        MORTALITY: { 
            type: String,
            required: true
        },
    },
    { timestamps: true },
);



module.exports = mongoose.model('patient', Patient);
