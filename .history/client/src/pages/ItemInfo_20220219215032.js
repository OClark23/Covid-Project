import { Component } from 'react';
import api from '../api';
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
};

render(){
    
    return(
        <Wrapper>
            <Title
        </Wrapper>
    );

}
export default ItemInfo;