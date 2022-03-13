import React, { Component } from 'react';
import { shared } from '../constants';
import api from '../api';

import styled from 'styled-components';

const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin-top: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
  max-width: 30%;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px auto;
  max-width: 30%;
  text-align: center;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const Fieldset = styled.fieldset.attrs({
  className: 'form-control',
})`
  background-color: transparent;
  border-color: transparent;
  margin: 1em auto 0.5em;
  max-width: 50%;
  min-height: 6em;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const DayInput = styled.input.attrs({
  className: '',
})`
  margin: 5px 5px 5px auto;
  text-align: center;
`;

const Button = styled.button.attrs({
  className: 'btn btn-primary',
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: 'btn btn-danger',
})`
  margin: 15px 15px 15px 5px;
`;

class ItemInsert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: 0,
      PATIENT_ID:"",
      AGE:0,
      SEX:"",
      RACE:"",
      ZIP:"",
      LATEST_BMI:0,
      LATEST_WEIGHT:0,
      LATEST_HEIGHT:"",
      TUBERCULOSIS:"N",
      SYSTEMIC_LUPUS_ERYTHMATOSUS:"N",
      RHEUMATOID_ARTHRITIS:"N",
      EXTENSIVE_BURNS:"N",
      ASPLENIA:"N",
      HYPOSPLENIA:"N",
      MEASLES:"N",
      CYTOMEGALOVIRUS:"N",
      CHICKEN_POX:"N",
      HERPES_ZOSTER:"N",
      MALNUTRITION:"N",
      CURRENT_PREGNANT:"N",
      CHRONIC_KIDNEY_DISEASE:"N",
      DIABETES_TYPE_I:"N",
      DIABETES_TYPE_II:"N",
      TRANSPLANT:"N",
      HEMODIALYSIS_PRE_DIAGNOSIS:"N",
      HEMODIALYSIS_POST_DIAGNOSIS:"N",
      CANCER:"N",
      COVID_TEST_POSITIVE:"N",
      TEST_NAME:"",
      ICU_ADMIT:"N",
      NUMBER_ICU_ADMTIS:0,
      MORTALITY:"N",
    };
  }

  componentDidMount() {
    const patientID = this.props.match.params.id;
    if(patientID){
      this.fetchSinglePatient(patientID).then(resp => {
        const { patient } = resp.data;
        this.setState({ ...patient });
      });
    }
    
    
  }

  fetchSinglePatient = patientID => {
    return api
      .getPatientById(patientID)
      .then(resp => {
        console.log('getPatientById: resp');
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'fetchSinglePatient': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleChangeInput = async event => {
    const target = event.target.name;
    const value = event.target.value;
    const type = event.target.type;

    let objValue = {};

    switch(type) {
      case "checkbox":
        objValue[target] = event.target.checked ? "Y" : "N";
        break;
      default:
        objValue[target] = value;
        break;
    }

    this.setState(objValue);
  };

  handleInsertPatient = event => {
    event.preventDefault();
    const patient = this.state;

    if (patient._id) {
      // Update
      return this.updateSinglePatient(patient)
      .then(resp => {
        console.log('handleUpdatePatient: resp');
        console.log(resp);
        if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
          window.alert('Patient updated successfully');
          return true;
        } else {
          throw resp;
        }
      })
      .catch(err => {
        window.alert(`There was an error updating the patient... :(`);
        console.error('handleUpdatePatient: err');
        console.error(err);
      });
    }
    else {
      // Insert
      this.insertSinglePatient(patient)
        .then(resp => {
          console.log('handleInsertPatient: resp');
          console.log(resp);
          if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
            window.alert('patient saved!');
            this.setState({
              PATIENT_ID:"",
              AGE:0,
              SEX:"",
              RACE:"",
              ZIP:"",
              LATEST_BMI:0,
              LATEST_WEIGHT:0,
              LATEST_HEIGHT:"",
              TUBERCULOSIS:"N",
              SYSTEMIC_LUPUS_ERYTHMATOSUS:"N",
              RHEUMATOID_ARTHRITIS:"N",
              EXTENSIVE_BURNS:"N",
              ASPLENIA:"N",
              HYPOSPLENIA:"N",
              MEASLES:"N",
              CYTOMEGALOVIRUS:"N",
              CHICKEN_POX:"N",
              HERPES_ZOSTER:"N",
              MALNUTRITION:"N",
              CURRENT_PREGNANT:"N",
              CHRONIC_KIDNEY_DISEASE:"N",
              DIABETES_TYPE_I:"N",
              DIABETES_TYPE_II:"N",
              TRANSPLANT:"N",
              HEMODIALYSIS_PRE_DIAGNOSIS:"N",
              HEMODIALYSIS_POST_DIAGNOSIS:"N",
              CANCER:"N",
              COVID_TEST_POSITIVE:"N",
              TEST_NAME:"",
              ICU_ADMIT:"N",
              NUMBER_ICU_ADMTIS:0,
              MORTALITY:"N",
            });
          } else {
            throw resp;
          }
        })
        .catch(err => {
          // TODO: pass error object correctly so that things like validation errors can be displayed to user
          window.alert(`There was an error creating the item... :(`);
          console.log('handleInsertPatient: err');
          console.log(err);
        }); 
    }
  };

  insertSinglePatient = patient => {
    return api
      .insertPatient(patient)
      .then(resp => {
        console.log('insertPatient: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          const newPatient = JSON.parse(resp.config.data);
          console.log('nsertPatient: newPatient', newPatient);
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'insertSinglePatient': ${err}`);
        console.error(err);
        return err;
      });
  };

  updateSinglePatient = patient => {
    return api
      .updatePatientById(patient._id, patient)
      .then(resp => {
        console.log('updatePatient: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          const newPatient = JSON.parse(resp.config.data);
          console.log('newPatient: ', newPatient);
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'updateSinglePatient': ${err}`);
        console.error(err);
        return err;
      });
  };

  render() {
    const patient = this.state;

    return (
      <Wrapper>
        <Title>Add Patient</Title>

        <Label>Patient ID: </Label>
        <InputText type="text" name="PATIENT_ID" value={patient.PATIENT_ID} onChange={this.handleChangeInput} />

        <Label>Patient Sex:</Label>
        <select name="SEX" value={patient.SEX} onChange={this.handleChangeInput}>
          <option value="M"> Male</option>
          <option value="F">Female</option>
        </select> 

        <Label>Patient Age:</Label>
        <InputText
          type="number"
          name="AGE"
          step="1"
          lang="en-US"
          min="1"
          max="10"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={patient.AGE}
          onChange={this.handleChangeInput}
        />

        <Label>Patient Race:</Label>
        <select name="RACE" value={patient.RACE} onChange={this.handleChangeInput}>
          <option value="BLACK OR AFRICAN AMERICAN"> BLACK OR AFRICAN AMERICAN</option>
          <option value="WHITE">WHITE</option>
          <option value="ASIAN">ASIAN</option>
          <option value="NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER">NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER</option>
          <option value="OTHER">OTHER</option>
        </select> 

        <Label>Patient Zip:</Label>
        <InputText type="text" name="ZIP" value={patient.ZIP} onChange={this.handleChangeInput} />

        <Label>Patient Latest BMI:</Label>
        <InputText
          type="number"
          name="LATEST_BMI"
          step="1"
          lang="en-US"
          min="1"
          max="10"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={patient.LATEST_BMI}
          onChange={this.handleChangeInput}
        />

        <Label>Patient Latest Weight:</Label>
        <InputText
          type="number"
          name="LATEST_WEIGHT"
          step="1"
          lang="en-US"
          min="1"
          max="10"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={patient.LATEST_WEIGHT}
          onChange={this.handleChangeInput}
        />

        <Label>Patient Latest Height:</Label>
        <InputText type="text" name="LATEST_HEIGHT" value={patient.LATEST_HEIGHT} onChange={this.handleChangeInput} />

        <Label>Tuberculosis:</Label>
        <InputText type="checkbox" name="TUBERCULOSIS" value="N" onChange={this.handleChangeInput} checked={patient.TUBERCULOSIS == "Y"} />

        <Label>Systemic Lupus Erythmatosus:</Label>
        <InputText type="checkbox" name="SYSTEMIC_LUPUS_ERYTHMATOSUS" value="N" onChange={this.handleChangeInput} checked={patient.SYSTEMIC_LUPUS_ERYTHMATOSUS == "Y"} />

        <Label>Rheumatoid Arthritis:</Label>
        <InputText type="checkbox" name="RHEUMATOID_ARTHRITIS" value="N" onChange={this.handleChangeInput} checked={patient.RHEUMATOID_ARTHRITIS == "Y"} />

        <Label>EXTENSIVE BURNS:</Label>
        <InputText type="checkbox" name="EXTENSIVE_BURNS" value="N" onChange={this.handleChangeInput} checked={patient.EXTENSIVE_BURNS == "Y"} />

        <Label>ASPLENIA:</Label>
        <InputText type="checkbox" name="ASPLENIA" value="N" onChange={this.handleChangeInput} checked={patient.ASPLENIA == "Y"} />

        <Label>HYPOSPLENIA:</Label>
        <InputText type="checkbox" name="HYPOSPLENIA" value="N" onChange={this.handleChangeInput} checked={patient.HYPOSPLENIA == "Y"} />

        <Label>MEASLES:</Label>
        <InputText type="checkbox" name="MEASLES" value="N" onChange={this.handleChangeInput} checked={patient.MEASLES == "Y"} />

        <Label>CYTOMEGALOVIRUS:</Label>
        <InputText type="checkbox" name="CYTOMEGALOVIRUS" value="N" onChange={this.handleChangeInput} checked={patient.CYTOMEGALOVIRUS == "Y"} />

        <Label>CHICKEN POX:</Label>
        <InputText type="checkbox" name="CHICKEN_POX" value="N" onChange={this.handleChangeInput} checked={patient.CHICKEN_POX == "Y"} />
        
        <Label>HERPES ZOSTER:</Label>
        <InputText type="checkbox" name="HERPES_ZOSTER" value="N" onChange={this.handleChangeInput} checked={patient.HERPES_ZOSTER == "Y"} />

        <Label>MALNUTRITION:</Label>
        <InputText type="checkbox" name="MALNUTRITION" value="N" onChange={this.handleChangeInput} checked={patient.MALNUTRITION == "Y"} />

        <Label>CURRENT PREGNANT:</Label>
        <InputText type="checkbox" name="CURRENT_PREGNANT" value="N" onChange={this.handleChangeInput} checked={patient.CURRENT_PREGNANT == "Y"} />

        <Label>CHRONIC KIDNEY DISEASE:</Label>
        <InputText type="checkbox" name="CHRONIC_KIDNEY_DISEASE" value="N" onChange={this.handleChangeInput} checked={patient.CHRONIC_KIDNEY_DISEASE == "Y"} />

        <Label>DIABETES TYPE I:</Label>
        <InputText type="checkbox" name="DIABETES_TYPE_I" value="N" onChange={this.handleChangeInput} checked={patient.DIABETES_TYPE_I == "Y"} />

        <Label>DIABETES TYPE II:</Label>
        <InputText type="checkbox" name="DIABETES_TYPE_II" value="N" onChange={this.handleChangeInput} checked={patient.DIABETES_TYPE_II == "Y"}/>

        <Label>TRANSPLANT:</Label>
        <InputText type="checkbox" name="TRANSPLANT" value="N" onChange={this.handleChangeInput} checked={patient.TRANSPLANT == "Y"} />

        <Label>HEMODIALYSIS PRE DIAGNOSIS:</Label>
        <InputText type="checkbox" name="HEMODIALYSIS_PRE_DIAGNOSIS" value="N" onChange={this.handleChangeInput} checked={patient.HEMODIALYSIS_PRE_DIAGNOSIS == "Y"} />
        
        <Label>HEMODIALYSIS POST DIAGNOSIS:</Label>
        <InputText type="checkbox" name="HEMODIALYSIS_POST_DIAGNOSIS" value="N" onChange={this.handleChangeInput} checked={patient.HEMODIALYSIS_POST_DIAGNOSIS == "Y"} />
        
        <Label>CANCER:</Label>
        <InputText type="checkbox" name="CANCER" value="N" onChange={this.handleChangeInput} checked={patient.CANCER == "Y"} />

        <Label>COVID_TEST_POSITIVE:</Label>
        <InputText type="checkbox" name="COVID_TEST_POSITIVE" value="N" onChange={this.handleChangeInput} checked={patient.COVID_TEST_POSITIVE == "Y"} />

        <Label>Test Name:</Label>
        <InputText type="text" name="TEST_NAME" value={patient.TEST_NAME} onChange={this.handleChangeInput} />

        <Label>ICU ADMIT:</Label>
        <InputText type="checkbox" name="ICU_ADMIT" value="N" onChange={this.handleChangeInput} checked={patient.ICU_ADMIT == "Y"} />

        <Label># ICU ADMTIS:</Label>
        <InputText type="text" name="NUMBER_ICU_ADMTIS" value={patient.NUMBER_ICU_ADMTIS} onChange={this.handleChangeInput} />

        <Label>MORTALITY:</Label>
        <InputText type="checkbox" name="MORTALITY" value="N" onChange={this.handleChangeInput} checked={patient.MORTALITY == "Y"} />

        {/* <Label> Patient Age:</Label>
        <InputText
              type="number"
              step="1"
              lang="en-US"
              min="18"
              max="100"
              pattern="[0-9]+([,\.][0-9]+)?"
              value={age}
              onChange={this.handleChangeInputAge}
        />


        <Label> Zip Code:</Label>
        <InputText type="text" value={zip}  onChange={this.handleChangeInputZip} />

        <Fieldset>
          <legend>Day(s) of the Week: </legend>
          {Object.keys(DAYS_OF_WEEK).map((day, i) => (
            <React.Fragment key={day}>
              <Label htmlFor={day}>
                <DayInput
                  type="checkbox"
                  id={day}
                  value={day}
                  onChange={this.handleChangeDays}
                  checked={typeof daysOfWeek[day] === 'string'}
                />
                {DAYS_OF_WEEK[day]}
              </Label>
            </React.Fragment>
          ))}
        </Fieldset>

        <Label>Timeframe Note: </Label>
        <InputText type="text" value={timeframeNote} onChange={this.handleChangeInputTimeframe} />

        <Label>Priority: </Label>
        <InputText
          type="number"
          step="1"
          lang="en-US"
          min="1"
          max="10"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={priority}
          onChange={this.handleChangeInputPriority}
        />

        <Label>Content: </Label>
        <InputText type="textarea" value={content} onChange={this.handleChangeInputContent} /> */}

        <Button onClick={this.handleInsertPatient}>Add Item</Button>
        <CancelButton href={'/items'}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default ItemInsert;
