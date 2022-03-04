import React, { Component } from 'react';
import api from '../api';
import { shared } from '../constants';
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
`;
  
class ItemInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id: '',
            name: '',
            gender: '',
            age : '',
            zip : '',
            daysOfWeek:'',
        };
    }

   
render(){
    const{ _id, name, gender, age, zip, daysOfWeek} = this.state;
    return (
        <Wrapper>
            <Title>Patient Info </Title>
            <Label> Name: </Label>
        </Wrapper>
    );
}
};
export default ItemInfo;