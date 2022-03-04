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
        const id = this._id;
    }

   
render(){
    return (
        <Wrapper>
            <Title>`{Patient Info }`</Title>
        </Wrapper>
    );
}
};
export default ItemInfo;