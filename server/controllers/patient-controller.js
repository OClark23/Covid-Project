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
  await Item.find({ _id: req.params.id }, (err, items) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'getPatientById': ${err}`);
      throw res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!items.length) {
      console.error(`[Hack.Diversity React Template] - 404 in 'getPatientById': Item not found`);
      return res.status(404).json({
        success: false,
        error: 'Item not found',
      });
    }
    console.log(`[Hack.Diversity React Template] - 200 in 'getPatientById': Item fetched!`);
    return res.status(200).json({
      success: true,
      item: items[0],
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

// TODO: Uncomment updatePatient after fetching data
// updatePatient = async (req, res) => {
//   const body = req.body;
//   if (!body) {
//     console.error(`[Hack.Diversity React Template] - 400 in 'updateItem': You must provide an item to update.`);
//     return res.status(400).json({
//       success: false,
//       error: 'You must provide an item to update.',
//     });
//   }

//   const itemForUpdate = {
//     _id: req.params.id,
//     name: body.name,
//     daysOfWeek: body.daysOfWeek,
//     timeframeNote: body.timeframeNote,
//     priority: body.priority,
//     content: body.content,
//   };

//   // console.log('----------------------- updateItem: res -----------------------');
//   // console.log(res);

//   try {
//     await Item.findOneAndUpdate({ _id: req.params.id }, itemForUpdate);
//   } catch (err) {
//     console.error(`[Hack.Diversity React Template] - caught error in 'updateItem': ${err}`);
//     console.error(err);
//     return res.status(400).json({
//       success: false,
//       error: err,
//     });
//   }

//   console.log(`[Hack.Diversity React Template] - 200 in 'updateItem': Item updated!`);
//   return res.status(200).json({
//     success: true,
//     id: req.params.id,
//     message: 'Item updated!',
//   });
// };

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
  updateItem,
  deletePatient,
  importPatientData,
  importPatientImageData,
};
