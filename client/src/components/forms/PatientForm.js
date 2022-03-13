  import axios from 'axios';
  import React, { useState, useContext, useEffect} from 'react';
  import { useHistory, useLocation } from 'react-router-dom'
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
      .alt-text{
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
    const {userId} = useContext(UserContext)
    const history = useHistory()
    let path = useLocation();
    const [edit] = useState(path.pathname.includes("update"))

    const [form, setForm] = useState({
      name: '',
      gender: '',
      age: '',
      zip: '',
      priority: '',
      covid: "",
      testName: "",
      content: '',
  })

  useEffect(() => {
    if(edit) {
      const splitPath = path.pathname.split('/')
      const recordId = splitPath[splitPath.length - 1]

      const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
        hostname: process.env.REEACT_APP_API_HOST || 'http://localhost:3000/',
        // httpsAgent: https.Agent({
        //   rejectUnauthorized: false,
        // }),
      });
      (async () => {
        const res = await api.get(`/item/${recordId}`)
        const {name, gender, age, zip, priority, covid, testName, content} = res.data.item
        console.log(res.data.item)
        setForm(prevForm => ({...prevForm, name, age, gender, zip, priority, covid, testName, content}))
      })()

    }

  }, [edit])

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
          const splitPath = path.pathname.split('/')
          const recordId = splitPath[splitPath.length - 1]
          const userInfo = await api.put(`/item/${recordId}`, {...form, savedBy: userId })
        } else {
          const userInfo = await api.post('/item', {...form, savedBy: userId })
        }

        history.push('/items')
      } catch (err) {
        console.log(err.message);
      }
    };
    return (
      <Form>
        <span>Patient Intake</span>
        <Input
          name="name"
          placeholder="name"
          onChange={e => {
            e.persist();
            setForm(prevName => ({...prevName, name: e.target.value}))

          }
          }
          value={form.name}
        />
<Select value={form.gender}  onChange={e => {
e.persist();
          setForm(prevName => ({...prevName, gender: e.target.value}))
        }
        } >
         <option value="" disabled selected hidden>gender</option>
        <option  value="Male">Male</option>
        <option   value="Female">Female</option>
      </Select>
          <Input
          name="age"
          placeholder="age"
          onChange={e => {
            e.persist();
            setForm(prevName => ({...prevName, age: e.target.value}))
          }
          }
          value={form.age}
        />
         <Input
          name="zip"
          placeholder="zip"
          onChange={e =>
            {
              e.persist();
              setForm(prevName => ({...prevName, zip: e.target.value}))}
            }

          value={form.zip}
        />
                 <Input
          name="priority"
          placeholder="priority"
          onChange={e => {e.persist(); setForm(prevName => ({...prevName, priority: e.target.value}))}}
          value={form.priority}
        />
                 <Input
          name="covid"
          placeholder="covid"
          onChange={e => {e.persist(); setForm(prevName => ({...prevName, covid: e.target.value}))}}
          value={form.covid}
        />
                 <Input
          name="testName"
          placeholder="test name"
          onChange={e => {e.persist();setForm(prevName => ({...prevName, testName: e.target.value}))}}
          value={form.testName}
        />
                 <Input
          name="notes"
          placeholder="notes"
          onChange={e => {e.persist();setForm(prevName => ({...prevName, content: e.target.value}))}}
          value={form.content}
        />
        <Button onClick={submit}>{edit ? 'save' : 'submit'}</Button>
      </Form>
    );
  };

  export default PatientForm;
