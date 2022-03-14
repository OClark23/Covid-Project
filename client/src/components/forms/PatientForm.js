import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../context/userContext';

const Input = styled.input`
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  font-family: 'Open Sans';
  margin-bottom: 8px;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: white;
  border: 1px solid #eee;
  padding: 16px;
  box-sizing: border-box;
  color: black;
  border-radius: 4px;
  margin: auto;
  .alt-text {
    text-align: center;
    margin: 10px 0;
  }
`;

const Button = styled.button`
  color: white;
  background: blue;
  font-weight: bold;
  box-shadow: none;
  border: none;
  width: 100%;
  display: block;
  white-space: none;
`;

const Select = styled.select`
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  font-family: 'Open Sans';
  margin-bottom: 8px;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  background: white;
  color: gray;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const PatientForm = () => {
  const { userId } = useContext(UserContext);
  const history = useHistory();
  let path = useLocation();
  const [edit] = useState(path.pathname.includes('update'));

  const [form, setForm] = useState({
    PATIENT_ID: '',
    AGE: '',
    SEX: '',
    RACE: '',
    ZIP: '',
    LATEST_BMI: ' ',
    LATEST_WEIGHT: ' ',
    LATEST_HEIGHT: ' ',
    TUBERCULOSIS: ' ',
    SYSTEMIC_LUPUS_ERYTHMATOSUS: ' ',
    RHEUMATOID_ARTHRITIS: ' ',
    EXTENSIVE_BURNS: ' ',
    ASPLENIA: ' ',
    HYPOSPLENIA: '',
    MEASLES: '',
    CYTOMEGALOVIRUS: '',
    CHICKEN_POX: '',
    HERPES_ZOSTER: '',
    MALNUTRITION: '',
    CURRENT_PREGNANT: '',
    CHRONIC_KIDNEY_DISEASE: '',
    DIABETES_TYPE_I: '',
    DIABETES_TYPE_II: '',
    TRANSPLANT: '',
    HEMODIALYSIS_PRE_DIAGNOSIS: '',
    HEMODIALYSIS_POST_DIAGNOSIS: '',
    CANCER: '',
    COVID_TEST_POSITIVE: '',
    TEST_NAME: '',
    ICU_ADMIT: '',
    NUMBER_ICU_ADMITS: '',
    MORTALITY: '',
  });

  useEffect(() => {
    if (edit) {
      const splitPath = path.pathname.split('/');
      const recordId = splitPath[splitPath.length - 1];

      const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
        hostname: process.env.REEACT_APP_API_HOST || 'http://localhost:3000/',
        // httpsAgent: https.Agent({
        //   rejectUnauthorized: false,
        // }),
      });
      (async () => {
        const res = await api.get(`/patient/${recordId}`);
        const { PATIENT_ID, SEX, AGE, ZIP } = res.data.patient;
        console.log(res.data.item);
        setForm(prevForm => ({
          ...prevForm,
          PATIENT_ID,
          AGE,
          SEX,
          ZIP,
        }));
      })();
    }
  }, [edit]);

  const submit = async e => {
    e.preventDefault();
    try {
      const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
        hostname: process.env.REEACT_APP_API_HOST || 'http://localhost:3000/',
        // httpsAgent: https.Agent({
        //   rejectUnauthorized: false,
        // }),
      });

      if (edit) {
        const splitPath = path.pathname.split('/');
        const recordId = splitPath[splitPath.length - 1];
        const userInfo = await api.put(`/patient/${recordId}`, { ...form, savedBy: userId });
      } else {
        const userInfo = await api.post('/patient', { ...form, savedBy: userId });
      }

      history.push('/items');
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Form>
      <span>Patient Intake</span>
      <Input
        name="Patient ID"
        placeholder="patient id"
        onChange={e => {
          e.persist();
          setForm(prevName => ({ ...prevName, PATIENT_ID: e.target.value }));
        }}
        value={form.PATIENT_ID}
      />
      <Select
        value={form.SEX}
        onChange={e => {
          e.persist();
          setForm(prevName => ({ ...prevName, SEX: e.target.value }));
        }}>
        <option value="" disabled selected hidden>
          gender
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Prefer not to say">Prefer not to say</option>
      </Select>
      <Input
        name="age"
        placeholder="age"
        onChange={e => {
          e.persist();
          setForm(prevName => ({ ...prevName, AGE: e.target.value }));
        }}
        value={form.AGE}
      />
      <Input
        name="zip"
        placeholder="zip"
        onChange={e => {
          e.persist();
          setForm(prevName => ({ ...prevName, ZIP: e.target.value }));
        }}
        value={form.ZIP}
      />
      {/* <Input
        name="priority"
        placeholder="priority"
        onChange={e => {
          e.persist();
          setForm(prevName => ({ ...prevName, priority: e.target.value }));
        }}
        value={form.priority}
      />
      <Input
        name="covid"
        placeholder="covid"
        onChange={e => {
          e.persist();
          setForm(prevName => ({ ...prevName, covid: e.target.value }));
        }}
        value={form.covid}
      />
      <Input
        name="testName"
        placeholder="test name"
        onChange={e => {
          e.persist();
          setForm(prevName => ({ ...prevName, testName: e.target.value }));
        }}
        value={form.testName}
      />
      <Input
        name="notes"
        placeholder="notes"
        onChange={e => {
          e.persist();
          setForm(prevName => ({ ...prevName, content: e.target.value }));
        }}
        value={form.content}
      /> */}
      <Button onClick={submit}>{edit ? 'save' : 'submit'}</Button>
    </Form>
  );
};

export default PatientForm;
