const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientData = new Schema(
    {
        PATIENT_ID: {
            type: String,
            required: true
        },
        AGE: {
            type: number,
            required: true
        },
        SEX: {
            type: String,
            required: true
        },
        RACE: {
            type: Number,
            required: false
        },
        ZIP: {
            type: Number,
            required: true
        },
        LATEST_BMI: {
            type: Number,
            required: true
        },
        LATEST_WEIGHT: {
            type: Number,
            required: true
        },
        LATEST_HEIGHT: {
            type: Number,
            required: true
        },
        TUBERCULOSUS: {
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
        ZIP: {
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
        HEMODIALYSIS_Pre_Diagnosis: {
            type: String,
            required: true
        },
        HEMODIALYSIS_Post_diagnosis: {
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
        #_ICU_ADMTIS: {
            type: String,
            required: true
        },
        MORTALTIY: { 
            type: String,
            required: true
        },
    },
    { timestamps: true },
);



module.exports = mongoose.model('patientdata', PatientData);
