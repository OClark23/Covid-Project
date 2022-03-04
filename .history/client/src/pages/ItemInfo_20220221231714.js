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
          items: {},
        };
    }

    componentDidMount() {
        console.log('ItemsList: props');
        console.log(this.props);
        // if (((this.props.itemData || {}).items || []).length) return;
    
        this.fetchAllItems();
      }
    
      fetchAllItems = () => {
        api
          .getAllItems()
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
                    <ol key = {item._id}>,
                        Name: {item.name},
                        ID: {item.patient_id}
                    </ol>
                ))
            });
            
            
            <Label> Name: </Label>
            <InfoParagraph></InfoParagraph>
            <br/> <br/>
            <Label> Gender: </Label>
            <br/><br/>
            <Label> Age: </Label>
            <br/><br/>
            <Label>Zip: </Label>
            <br/><br/>
            <Label>Patient ID:</Label>
        </Wrapper>
        );
}
};
export default ItemInfo;