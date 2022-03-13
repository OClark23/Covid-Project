import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DeleteButton } from '../components/buttons';
import api from '../api';
import styled from 'styled-components';
import {FaIdCard, FaBookMedical, FaCity, FaPenSquare, FaTrash } from 'react-icons/fa';


const generateRandomImageWidth = () => {
  // between 40-69, with default of 42
  const randomNumberAsString = Math.random()
    .toString()
    .match(/[4-6]\d/) || ['42'];
  return parseInt(randomNumberAsString) * 10;
};

const generateRandomImageHeight = () => {
  // between 30-59, with default of 36
  const randomNumberAsString = Math.random()
    .toString()
    .match(/[3-5]\d/) || ['36'];
  return parseInt(randomNumberAsString) * 10;
};

const generateRandomCat = () =>
  `https://placekitten.com/${generateRandomImageWidth()}/${generateRandomImageHeight()}`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 40px 40px 40px;

  @media screen and (max-width: 420px) {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
`;

const ItemContainer = styled.div`
  align-items: flex-start;
  border: 2px #899499 solid;
  border-radius: 5%;
  display: inline-flex;
  flex-direction: column;
  margin: 1em 2.5% 2em;
  max-width: 20%;
  padding: 1em;
  text-align: left;
  width: 25vw;
`;

const ItemImage = styled.img`
  margin: auto;
  max-height: 22em;
  object-fit: contain;
  max-width: 80%;
`;

const NameHeader = styled.h1`
  font-size: 2rem;
  width: 100%;
`;

const DetailParagraph = styled.p`
  width: 100%;
  display:grid;
  align-items: center;
  grid-template-rows: 1fr;
  grid-template-columns: 20px 1fr;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

class ItemsPlain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }

  componentDidMount() {
    console.log('ItemsList: props');
    console.log(this.props);
    this.fetchAllPatients();
  }

  fetchAllPatients = () => {
    api
      .getAllPatients()
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

  deleteSinglePatient = itemId => {
    return api
      .deletePatientById(itemId)
      .then(resp => {
        console.log('deletePatientById: resp');
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'deleteSinglePatient': ${err}`);
        console.error(err);
        return err;
      });
  };
  
  handleRemoveItem = data => {
    const itemId = data;

    this.deleteSingleItem(itemId).then(resp => {
      console.log('handleRemoveItem: resp');
      console.log(resp);
      this.fetchAllItems();
    });
  };

  render() {
    const items = this.state.items || {};
    console.log(items);
    
    return(
      <Wrapper>
        {(items || []).length > 0 && it
          ? items.map(item => (
            item.PATIENT_IMAGES > 0 ? (
                <ItemContainer key={item._id}>
                <ItemImage src={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${items.PATIENT_IMAGES[0].PNG_FILENAME}`}></ItemImage>         
                <DetailParagraph>  <FaBookMedical/> Exam ID: <Link data-id={item._id} to={`/item/itemPatientExam/${item._id}`}>{item._id}</Link></DetailParagraph>
                <DetailParagraph> <FaIdCard/> Patient ID: <Link data-patient-id={item._id} to={`/item/patient-info/${item._id}`}>{item.PATIENT_ID}</Link>
                </DetailParagraph>
                <DetailParagraph><FaCity/> Zip: {item.ZIP}</DetailParagraph>
                <ButtonsWrapper>
                <FaPenSquare/>
                   <Link data-update-id={item._id} to={`/item/update/${item._id}`}>
                    Update Item
                  </Link>
                  <FaTrash/> 
                  <DeleteButton id={item._id} onDelete={this.handleRemoveItem} />
                </ButtonsWrapper>
              </ItemContainer>
            ))
          : `No items to render... :(`}
      </Wrapper>
    );
  }
}

export default ItemsPlain;
