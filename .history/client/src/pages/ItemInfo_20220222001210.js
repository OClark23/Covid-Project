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
    margin: 0 0 30px 30px;
    float: left;
  `;
  const Label = styled.label`
  margin: 5px;
  max-width: 30%;
  float: left;
  

`;

const InfoParagraph = styled.p`
 
`;
  
class ItemInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
          _id: '',
          name: '',
          gender: '',
          zip: '',
          patient_id: ''
        };
    }

    componentDidMount() {
        console.log('Item: props');
        console.log(this.props);
        // if (((this.props.itemData || {}).items || []).length) return;
    
        this.fetchItem();
      }
    
      fetchItem = () => {
        api
          .getItem()
          .then(resp => {
            const { items } = resp.data;
            console.log('getAllItems: resp');
            console.log(items);
            this.setState({ items });
          })
          .catch(err => {
            console.error(`ERROR in 'getAllItems': ${err}`);
            console.error(err);
            return err;
          });
      };

render(){
    const items = this.state.items;
    const{ DAYS_OF_WEEK } = shared;

    return (
        <Wrapper>
            <Title>Patient Info </Title>
            {(items || []).length > 0
                ? items.map(item => (
                    <ol key = {item._id}>
                       <Label>Name:{item.name} </Label>
                       <br></br>                   
                       <Label>ID:{item._id}</Label> 
                        
                    </ol>
                ))
                : `No items to render... :(`}
            
            <Label>Patient ID:</Label>
        </Wrapper>
        );
}
};
export default ItemInfo;