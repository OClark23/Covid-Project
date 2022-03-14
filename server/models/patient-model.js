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
            required: false
        },
        TUBERCULOSIS: {
            type: String,
            required: false
        },
        SYSTEMIC_LUPUS_ERYTHMATOSUS: {
            type: String,
            required: false
        },
        RHEUMATOID_ARTHRITIS: {
            type: String,
            required: false
        },
        EXTENSIVE_BURNS: {
            type: String,
            required: false
        },
        ASPLENIA: {
            type: String,
            required: false
        },
        HYPOSPLENIA: {
            type: String,
            required: false
        },
        MEASLES: {
            type: String,
            required: false
        },
        CYTOMEGALOVIRUS: {
            type: String,
            required: false
        },
        CHICKEN_POX: { 
            type: String,
            required: false
        },
        HERPES_ZOSTER: {
            type: String,
            required: false
        },
        MALNUTRITION: {
            type: String,
            required: false
        },
        CURRENT_PREGNANT: {
            type: String,
            required: false
        },
        CHRONIC_KIDNEY_DISEASE: {
            type: String,
            required: false
        },
        DIABETES_TYPE_I: {
            type: String,
            required: false
        },
        DIABETES_TYPE_II: {
            type: String,
            required: false
        },
        TRANSPLANT: {
            type: String,
            required: false
        },
        HEMODIALYSIS_PRE_DIAGNOSIS: {
            type: String,
            required: false
        },
        HEMODIALYSIS_POST_DIAGNOSIS: {
            type: String,
            required: false
        },
        CANCER: {
            type: String,
            required: false
        },
        COVID_TEST_POSITIVE: {
            type: String,
            required: false
        },
        TEST_NAME: {
            type: String,
            required: false
        },
        ICU_ADMIT: {
            type: String,
            required: false
        },
        NUMBER_ICU_ADMITS: {
            type: String,
            required: false
        },
        MORTALITY: { 
            type: String,
            required: false
        },
    },
    { timestamps: true },
);



module.exports = mongoose.model('patient', Patient);
