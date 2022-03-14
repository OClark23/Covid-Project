import React, { Component } from 'react';
import api, { getItemById } from '../api';
import { shared } from '../constants';
import styled from 'styled-components';
import ItemsPlain from './ItemsPlain';
import './itemPatient.css';
import {FaXRay,  FaHospitalUser, FaInfoCircle} from 'react-icons/fa';

//import ItemExamUpdate from './itemExamUpdate';


class itemPatientExam extends Component{
    constructor(props){
        super(props);
        /*
        this.state = {
            _id: '',
            name: '',
            gender: '',
            age: '',
            zip: '',
            priority: '',
            PatientImage: '',
        };
       */
       this.state = {
         _id: 0,
         PATIENT_ID: '',
         AGE: 0,
         SEX: "",
         RACE: "",
         ZIP: "",
         IMAGES: []
       }
    }

    componentDidMount() {
        const itemId = this.props.match.params.id;
        this.fetchSingleItem(itemId).then(resp => {
          console.log("Response: ", resp);
          const { patient } = resp.data;
          let images = resp.data.patient_image.map(image => {
            return image.PNG_FILENAME;
          })
          this.setState({ ...patient });
          this.setState({IMAGES: images});
        });
    };
        fetchSingleItem = itemId => {
            return api
              .getPatientById(itemId)
              .then(resp => {
                console.log('getItemById: resp');
                console.log(resp);
                return resp;
              })
              .catch(err => {
                console.error(`ERROR in 'fetchSingleItem': ${err}`);
                console.error(err);
                return err;
              });
          };
    
    render(){
        //const {_id, name, gender, age, zip, priority, PatientImage} = this.state;
        const {_id, PATIENT_ID, SEX, AGE, ZIP, IMAGES} = this.state;
        console.log("STate:", this.state);
        return (
            _id && (
              <div className="ItemPage">
                <h1 className='title'><strong></strong>Exam Details </h1>
            <div className="ItemContainer">
              <div className="ItemPatient">

                <h1 className="card-title">Patient</h1>
            
                <div className="ItemText">
                <h1>ID:</h1>
                <h1>{_id}</h1>
                </div>
                <div className="ItemText">
                <h1>Sex:</h1>
                <h1>{SEX}</h1>
                </div>
                <div className="ItemText">
                <h1>Age:</h1>
                <h1>{AGE}</h1>
                </div>
                <div className="ItemText">
                <h1>Zip Code:</h1>
                <div className="examUpdateZip"></div>
    
                <h1>Update Zipcode</h1>
                <h1>{ZIP}</h1>
                </div>
                </div>
                

                <div className="ItemExam">
                <h1 className="card-title">Exam</h1>
                <div className="ItemText">
                <h1>Exam ID:</h1>
                <h1>Exam-2</h1>
                </div>
                <div className="ItemText">
                <h1>Date:</h1>
                <h1>April 1, 2022</h1>
                </div>
                <div className="ItemText">
                <h1>Brixia Score:</h1>
                <h1>..</h1>
                </div>
                <div className="ItemText">
                <h1>Key Finding</h1>
                <h1>{AGE}</h1>
                </div>
                <div className="ItemText">
                <h1>Zip Code:</h1>
                <h1>{ZIP}</h1>
                </div>
                </div>
                                   
                <div className="ExamPhoto">
                <img src={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${IMAGES[0]}`}></img>
                </div>
                   </div>
            </div>
        ));
       }

       /*
            <div className="examUpdate">
                <h1 className="card-title">Update Exam</h1>
                
                <h1><ItemExamUpdate/></h1>
                </div>
        */
      
       
    };

    export default itemPatientExam;