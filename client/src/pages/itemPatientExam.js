import React, { Component } from 'react';
import api, { getItemById } from '../api';
import { shared } from '../constants';
import styled from 'styled-components';
import ItemsPlain from './ItemsPlain';
import './itemPatient.css';
/*
import PatientImage from 'PatientImage';
*/



class itemPatientExam extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id: '',
            name: '',
            gender: '',
            age: '',
            zip: '',
            priority: '',

        };
       
    }

    componentDidMount() {
        const itemId = this.props.match.params.id;
        this.fetchSingleItem(itemId).then(resp => {
          const { item } = resp.data;
          this.setState({ ...item });
        });
    };
        fetchSingleItem = itemId => {
            return api
              .getItemById(itemId)
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
        const {_id, name, gender, age, zip, priority, PatientImage} = this.state;
    
        return (
            _id && (
              <div className="ItemPage">
                <h1 className='title'>Exam Details </h1>
            <div className="ItemContainer">
              <div className="ItemPatient">

                <h1 className="card-title">Patient</h1>
                <div className="ItemText">
                <h1>Name:</h1>
                <h1>{name}</h1>
                </div>
                <div className="ItemText">
                <h1>ID:</h1>
                <h1>{_id}</h1>
                </div>
                <div className="ItemText">
                <h1>Gender:</h1>
                <h1>{gender}</h1>
                </div>
                <div className="ItemText">
                <h1>Age:</h1>
                <h1>{age}</h1>
                </div>
                <div className="ItemText">
                <h1>Zip Code:</h1>
                <h1>{zip}</h1>
                </div>
                <div className="ItemText">
                <h1>Priority:</h1>
                <h1>{priority}</h1>
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
                <h1>{age}</h1>
                </div>
                <div className="ItemText">
                <h1>Zip Code:</h1>
                <h1>{zip}</h1>
                </div>
                <div className="ItemText">
                <h1>Priority:</h1>
                <h1>{priority}</h1>
                </div>
                </div>
                   </div>
                   
                <div className="ExamPhoto">
                <h1>{PatientImage}</h1>
                </div>
            </div>
        ));
       }
    };

    export default itemPatientExam;