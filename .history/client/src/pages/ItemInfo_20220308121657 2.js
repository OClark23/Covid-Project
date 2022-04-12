import React, { Component } from 'react';
import api, { getPatientById } from '../api';
//import { shared } from '../constants';
import styled from 'styled-components';
//import ItemsPlain from './ItemsPlain';
//import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './itemPatient.css';
import {FaXRay,  FaHospitalUser} from 'react-icons/fa';

/*
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
 
`;*/
  
class ItemInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id: '',
            PATIENT_ID: '',
            SEX: '',
            AGE: '',
            ZIP: '',
            IMAGES: []
        };
       
    }

    componentDidMount() {
      const patientID = this.props.match.params.id;
      this.fetchSinglePatient(patientID).then(resp => {
        console.log("Response: ", resp);
        const { patient } = resp.data;
        let images = resp.data.patient_image.map(image => {
          return image.PNG_FILENAME;
        })
        this.setState({ ...patient });
        this.setState({IMAGES: images});
      });
      
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
    const {_id, PATIENT_ID, SEX, AGE, ZIP, IMAGES} = this.state;

    console.log("State:", this.state);

    return (
        _id && (
          <div className="ItemPage">
            <h1 className="title"> Patient Info</h1><div className="ItemContainer">
              <div className="ItemPatient">
                <h1 className="card-title"><FaHospitalUser s/>  Patient</h1>
                <div className="ItemText">
                  <h1><strong>Patient ID:</strong></h1>
                  <h1>{PATIENT_ID}</h1>
                </div>
                <div className="ItemText">
                  <h1><strong>Sex:</strong></h1>
                  <h1>{SEX}</h1>
                </div>
                <div className="ItemText">
                  <h1><strong>Age:</strong></h1>
                  <h1>{AGE}</h1>
                </div>
                <div className="ItemText">
                  <h1><strong>Zip Code:</strong></h1>
                  <h1>{ZIP}</h1>
                </div>
              </div>
              <div className="ItemPatient">
                <h1 className="card-title"><FaXRay size={34}/>  Exam History</h1>
                <div className="previewExam">
                <Link to={`/item/itemPatientExam/${_id}`}>   
                <img src={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${IMAGES[0]}`}>
                </img></Link>
                <Link to={`/item/itemPatientExam/${_id}`}><h1 className="examLink">Open Exam Details</h1> </Link>
                </div>
              </div>
            </div>
            
            </div>

            
    ));
}
};
export default ItemInfo;