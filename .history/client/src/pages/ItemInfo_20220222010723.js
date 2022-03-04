import React, { Component } from 'react';
import api, { getItemById } from '../api';
import { shared } from '../constants';
import styled from 'styled-components';
import PatientDetails from './PatientDetails';

const Title = styled.h1.attrs({
    className: 'h1',
})``;
const Wrapper = styled.div.attrs({
    className: 'form-group',
  })`
    margin: 0 0 30px 30px;
    float: left;
  `;
  const Label = styled.label`
  margin: 5px;
  max-width: 30%;
  float: left;
  

`;

const InfoParagraph = styled.p`
  margin-right:20px;
  height:10%;
`;
  
class ItemInfo extends Component{
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
        console.log('ItemsList: props');
        console.log(this.props);
        // if (((this.props.itemData || {}).items || []).length) return;
    
        this.fetchSingleItems();
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
    const {_id, name, gender, age, zip, priority} = this.state;
   // const item = {_id, name, gender, age, zip, priority};

    return (
        _id && (
        <Wrapper>
            <Title>Patient Info </Title>
            <Label>Name: {name}</Label>
        </Wrapper>
    ));
}
};
export default ItemInfo;