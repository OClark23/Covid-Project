import React, { Component } from 'react';
import api, { getItemById } from '../api';
import { shared } from '../constants';
import styled from 'styled-components';
import ItemsPlain from './ItemsPlain';

const Title = styled.h1.attrs({
    className: 'h1',
})``;
const Wrapper = styled.div.attrs({
    className: 'form-group',
  })` 
    float: left;
  `;
  const Label = styled.label`
  max-width: 30%;
  float: left;
  
`;

const InfoParagraph = styled.p`
 padding-right:20px;
 
`;
  
class ItemInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id: '',
            name: '',
            gender: '',
            age: '',
            patient_id: '',
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
      }

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
    const {_id, name, gender, age, patient_id, zip, priority} = this.state;

    return (
        _id && (
        
        <Wrapper> 
            <Title>Patient Info</Title>
            <Label>Name:</Label>
            <InfoParagraph>{name}</InfoParagraph>
            <Label>ID:</Label>
            <InfoParagraph>{_id}</InfoParagraph>
            <Label>Priority:</Label>
            <InfoParagraph>{priority}</InfoParagraph>
            <Label>Patient ID:</Label>
            <InfoParagraph>{patient_id}</InfoParagraph>
            <Label>Patient </Label>
        </Wrapper>
    ));
}
};
export default ItemInfo;