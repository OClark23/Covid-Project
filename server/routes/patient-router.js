const express = require('express');

const PatientController = require('../controllers/patient-controller.js');

const router = express.Router();

router.get('/patients', PatientController.getPatients);
router.get('/patients/import', PatientController.importPatientData);
router.get('/patients/import/image', PatientController.importPatientImageData);
router.get('/patient/:id', PatientController.getPatientById);
router.post('/patient', PatientController.createPatient);
// TODO: Uncomment route after fetching data
// router.put('/patient/:id', PatientController.updatePatient);
router.delete('/patient/:id', PatientController.deletePatient);


module.exports = router;
