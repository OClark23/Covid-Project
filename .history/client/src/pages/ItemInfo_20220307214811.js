import React, { Component } from 'react';
import api, { getPatientById } from '../api';
import { shared } from '../constants';
import styled from 'styled-components';
import ItemsPlain from './ItemsPlain';
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './itemPatient.css';

const Title = styled.h1.attrs({
    className: 'h1',
  })`
    margin:10px;
    
`;
const Wrapper = styled.div.attrs({
    className: 'form-group',
  })` 
   // float: left;
  `;
  const Label = styled.label`
  max-width: 30%;
  //float: left;
  
`;

const InfoParagraph = styled.p`
 padding-right:20px;
 
`;
  
class ItemInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id: '',
            PATIENT_ID: '',
            SEX: '',
            AGE: '',
            ZIP: '',
        };
       
    }

    componentDidMount() {
      const patientID = this.props.match.params.PATIENT_ID;
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

render(){
    const patient = this.state;

    console.log("State:", this.state);

    return (
         
          <div className="ItemPage">
            <h1 className="title">Patient Info</h1><div className="ItemContainer">
              <div className="ItemPatient">
                <h1 className="card-title">Patient</h1>
                <div className="ItemText">
                  <h1>Patient ID:</h1>
                  <h1>{patient.PATIENT_ID}</h1>
                </div>
                <div className="ItemText">
                  <h1>Sex:</h1>
                  <h1>{patient.SEX}</h1>
                </div>
                <div className="ItemText">
                  <h1>Age:</h1>
                  <h1>{patient.AGE}</h1>
                </div>
                <div className="ItemText">
                  <h1>Zip Code:</h1>
                  <h1>{patient.ZIP}</h1>
                </div>
              </div>
              <div className="ItemPatient">
                <h1 className="card-title">Exam History</h1>
                <Link to={`/item/itemPatientExam/${patient._id}`}> Exam #1</Link>
              </div>
            </div>
            
            </div>

            
    );
}
};
export default ItemInfo;