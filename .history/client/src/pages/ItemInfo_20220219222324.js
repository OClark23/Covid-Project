import React, { Component } from 'react';
import api from '../api';
import { shared } from '../constants';
import styled from 'styled-components';


const Title = styled.h1.attrs({
    className: 'h1',
})``;

class ItemInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id: '',
        };
    }

render(){
    return(
            <Title>Patient Info</Title>
        </Wrapper>
        
    );
}
};
export default ItemInfo;