var fs = require('fs');
var { parse } = require('csv-parse');

const Patient = require('../models/patient-model');
const PatientImage = require('../models/patient-image-model');

getPatients = async (req, res) => {
  await Patient.find({}, (err, items) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'getPatients': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!items.length) {
      console.error(`[Hack.Diversity React Template] - 404 in 'getPatients': Items not found`);
      return res.status(200).json({
        success: true,
        items: [],
      });
    }
    console.log(`[Hack.Diversity React Template] - 200 in 'getPatients': Items fetched!`);
    return res.status(200).json({
      success: true,
      items: items,
    });
  }).catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in 'getPatients': ${err}`);
    console.error(err);
    return res.status(404).json({
      success: false,
      error: err,
    });
  });
};

getPatientById = async (req, res) => {
  await Patient.find({ _id: req.params.id }, (err, patients) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'getPatientById': ${err}`);
      throw res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!patients.length) {
      console.error(`[Hack.Diversity React Template] - 404 in 'getPatientById': Patient not found`);
      return res.status(404).json({
        success: false,
        error: 'Patient not found',
      });
    }
    console.log(`[Hack.Diversity React Template] - 200 in 'getPatientById': Patient fetched!`);
    return res.status(200).json({
      success: true,
      patient: patients[0],
    });
  }).catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in 'getPatientById': ${err}`);
    console.error(err);
    return err;
  });
};

createPatient = (req, res) => {
  const body = req.body;
  // console.log('----------------------- createPatient: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createPatient: body -----------------------')
  // console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an item.',
    });
  }

  const patient = new Patient(body);

  if (!patient) {
    console.error(`[Hack.Diversity React Template] - 400 in 'createPatient': 'patient' is malformed.`);
    return res.status(400).json({
      success: false,
      message: "'patient' is malformed",
    });
  }

  // console.log('----------------------- createPatient: patient -----------------------')
  // console.log(patient);

  return patient
    .save()
    .then(() => {
      console.error(`[Hack.Diversity React Template] - 201 in 'createPatient': Patient created!`);
      return res.status(201).json({
        success: true,
        id: patient._id,
        message: 'Patient created!',
      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'createPatient'`);
      Object.keys(err.errors).forEach(errorKey => {
        console.error(`[Hack.Diversity React Template] ERROR for: ${errorKey}`);
        console.error(
          `[Hack.Diversity React Template] => ${
            ((err.errors[errorKey] || {}).properties || {}).message
          }`,
        );
      });
      return res.status(400).json({
        success: false,
        error: err.errors,
        message: err.errors.name,
      });
    });
};

updatePatient = async (req, res) => {
  const body = req.body;
  if (!body) {
    console.error(`[Hack.Diversity React Template] - 400 in 'updatePatient': You must provide an item to update.`);
    return res.status(400).json({
      success: false,
      error: 'You must provide an Patient to update.',
    });
  }

  // const patientForUpdate = {
  //   _id: req.params.id,
  //   PATIENT_ID: body.PATIENT_ID,
  //   AGE: body.AGE,
  //   SEX: body.SEX,
  //   RACE: body.RACE,
  //   ZIP: body.ZIP,
  //   LATEST_BMI: body.LATEST_BMI  ,
  //   LATEST_WEIGHT: body.LATEST_WEIGHT  ,
  //   LATEST_HEIGHT:  body.LATEST_HEIGHT ,
  //   TUBERCULOSIS:  body.TUBERCULOSIS ,
  //   SYSTEMIC_LUPUS_ERYTHMATOSUS:  body.SYSTEMIC_LUPUS_ERYTHMATOSUS,
  //   RHEUMATOID_ARTHRITIS:  body.RHEUMATOID_ARTHRITIS   ,
  //   EXTENSIVE_BURNS:  body.EXTENSIVE_BURNS  ,
  //   ASPLENIA:  body.ASPLENIA  ,
  //   HYPOSPLENIA: body.HYPOSPLENIA  ,
  //   MEASLES: body.MEASLES  ,
  //   CYTOMEGALOVIRUS:  body.CYTOMEGALOVIRUS  ,
  //   CHICKEN_POX:  body.CHICKEN_POX  ,
  //   HERPES_ZOSTER:  body.HERPES_ZOSTER  ,
  //   MALNUTRITION: body.MALNUTRITION   ,
  //   CURRENT_PREGNANT: body.CURRENT_PREGNANT   ,
  //   CHRONIC_KIDNEY_DISEASE: body.CHRONIC_KIDNEY_DISEASE   ,
  //   DIABETES_TYPE_I:  body.DIABETES_TYPE_I  ,
  //   DIABETES_TYPE_II: body.DIABETES_TYPE_II   ,
  //   TRANSPLANT:  body.TRANSPLANT  ,
  //   HEMODIALYSIS_PRE_DIAGNOSIS:  body.HEMODIALYSIS_PRE_DIAGNOSIS   ,
  //   HEMODIALYSIS_POST_DIAGNOSIS:  body.HEMODIALYSIS_POST_DIAGNOSIS  ,
  //   CANCER: body.CANCER    ,
  //   COVID_TEST_POSITIVE: body.COVID_TEST_POSITIVE   ,
  //   TEST_NAME:   body.TEST_NAME ,
  //   ICU_ADMIT: body.ICU_ADMIT    ,
  //   NUMBER_ICU_ADMTIS:  body.NUMBER_ICU_ADMTIS ,
  //   MORTALITY: body.MORTALITY, 
  // };

//   // console.log('----------------------- updateItem: res -----------------------');
//   // console.log(res);

  try {
    await Patient.findOneAndUpdate({ _id: req.params.id }, body);
  } catch (err) {
    console.error(`[Hack.Diversity React Template] - caught error in 'updatePatient': ${err}`);
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err,
    });
  }

  console.log(`[Hack.Diversity React Template] - 200 in 'updatePatient': Patient updated!`);
  return res.status(200).json({
    success: true,
    id: req.params.id,
    message: 'Patient updated!',
  });
};

deletePatient = async (req, res) => {
  await Patient.findOneAndDelete({ _id: req.params.id }, (err, patient) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'deletePatient': ${err}`);
      return res.status(400).json({
        succes: false,
        error: err,
      });
    }

    if (!patient) {
      console.error(`[Hack.Diversity React Template] - 400 in 'deletePatient': patient not found!`);
      return res.status(400).json({
        success: false,
        error: 'Patient not found!',
      });
    }

    return res.status(200).json({
      success: true,
      patient: patient,
    });
  }).catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in 'deletePatient': ${err}`);
    console.error(err);
    return err;
  });
};

importPatientData = async(req, res) => {
    const patients = await Patient.find({});
    if(patients.length > 0){
        return res.status(200).json({
            success: true,
            message: "Data is already imported"
        });
    }
    else {
        var parser = parse({columns: true}, function (err, records) {
            records.forEach(record => {
                var data = {};
                var index = 0;
                for(var key in record) {
                    const newKey = key.replaceAll(' ', '_').toUpperCase();
                    switch(index) {
                        case 0:
                            data['PATIENT_ID'] = record[key];
                            break;
                        case 5:
                        case 6:
                            const newValue = record[key] == 'NULL' ? 0 : parseInt(record[key]);
                            data[newKey] = newValue;
                            break;
                        case 7:
                        case 9:
                        case 10:
                        case 11:
                        case 16:
                        case 17:
                        case 19:
                        case 20:
                        case 21:
                        case 22:
                        case 24:
                        case 25:
                        case 27:
                        case 28:
                        case 29:
                            data[newKey] = record[key];
                            break;
                        case 30:
                            data['NUMBER_ICU_ADMTIS'] = record[key];
                            break;
                        default:
                            data[key] = record[key];
                            break;
                    }
                    index++;
                }
    
                const patient = new Patient(data);
                if(!patient) {
                    console.error(`[Hack.Diversity React Template] - 400 in 'importPatientData': 'patient' is malformed.`);
                    return res.status(400).json({
                        success: false,
                        message: "'patient' is malformed",
                    });
                }
    
                patient.save().then(() => {
                    console.log("Patient created! - " + patient._id);
                });
            });
            return res.status(200).json({
                success: true,
                message: "Patient has been imported!",
            });
        });
        fs.createReadStream('./db/import/data.csv').pipe(parser);
    }
}

importPatientImageData = (req, res) => {
    var parser = parse({columns: true}, function (err, records) {
        // return res.status(200).json({
        //     success: true,
        //     data: records,
        //     schemaPath: PatientImage.schema.paths
        // });

        records.forEach(record => {
            let data = {};
            let index = 0;
            const modelKey = PatientImage.schema.paths
            const recordKey = Object.keys(record);
            
            for(let key in modelKey) {
                if (key === '_id' || key === 'updatedAt' || key === 'createdAt' || key === '__v')
                    continue;
                if (recordKey[index] === "study modality") {
                    data[key] = record[recordKey[index]].split(',');
                }
                else {
                    data[key] = record[recordKey[index]];
                }
                index++;
            }
            const patientImage = new PatientImage(data);
            if(!patientImage) {
                console.error(`[Hack.Diversity React Template] - 400 in 'importPatientData': 'patient' is malformed.`);
                return res.status(400).json({
                    success: false,
                    message: "'patient' is malformed",
                });
            }

            patientImage.save().then(() => {
                console.log("Patient created! - " + patientImage._id);
            });
        });

        return res.status(200).json({
            success: true,
            message: "Patient Images has been imported!",
        });
    });

    fs.createReadStream('./db/import/images.csv').pipe(parser);
}

module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  importPatientData,
  importPatientImageData,
};
