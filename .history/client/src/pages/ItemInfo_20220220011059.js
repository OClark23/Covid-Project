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
  
displayPatientId = item{
    return this.getItemById(this.info._id);
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
            <Label>{this.displayPatientId()} </Label>
        </Wrapper>
        );
}
};
export default ItemInfo;