import React, { Component } from 'react';
import api, { getPatientById } from '../api';
import { shared } from '../constants';
import styled from 'styled-components';
import ItemsPlain from './ItemsPlain';
import { Divider } from '@material-ui/core';

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

render(){
    const {_id, PATIENT_ID, SEX, AGE, ZIP} = this.state;

    console.log("State:", this.state);

    return (
        _id && (
        <Wrapper>
            <Title>Patient Info</Title>
            <Label>PATIENT ID:</Label>
            <InfoParagraph>{PATIENT_ID}</InfoParagraph>
            <Label>Sex:</Label>
            <InfoParagraph>{SEX}</InfoParagraph>
            <Label>Age:</Label>
            <InfoParagraph>{AGE}</InfoParagraph>
            <Label>Zip:</Label>
            <InfoParagraph>{ZIP}</InfoParagraph>
        </Wrapper>
    ));
}
};
export default ItemInfo;