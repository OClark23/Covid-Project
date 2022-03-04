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
        this.info = {
            _id: '',
            name: '',
            gender: '',
            age : '',
            zip : '',
            daysOfWeek:{},
        };
    }

componentDidMount() {
    const itemId = this.props.match.params.id;
    this.fetchSingleItem(itemId).then(resp => {
    const { item } = resp.data;
    this.setState({ ...item });
});
}

displayPatientId = itemId{
    const patitentId = 
}

render(){
    const{ _id, name, gender, age, zip, daysOfWeek} = this.info;
    const{ DAYS_OF_WEEK } = shared;

    return (
        <Wrapper>
            <Title>Patient Info </Title>
            <Label> Name: </Label>
            <br/> <br/>
            <Label> Gender: </Label>
            <br/><br/>
            <Label> Age: </Label>
            <br/><br/>
            <Label>Zip: </Label>
            <br/><br/>
            <Label>Days: </Label>
            <Label>{this.state._id}</Label>

        </Wrapper>
        );
}
};
export default ItemInfo;