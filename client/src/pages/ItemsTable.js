import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-6';
import { DeleteButton } from '../components/buttons';
import api from '../api';
import './ItemTable.css'

import styled from 'styled-components';

import 'react-table-6/react-table.css';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

class ItemsList extends Component {
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


  render() {
    const items = this.state.items || {};
    console.log(items);

    const columns = [
      {
        Header: 'ID',
        accessor: '_id',
        filterable: true,
        Cell: props => {
          return ( 
            <span data-item-id={props.original._id}>
           <Link data-exam-id={props.original._id} to={`/item/itemPatientExam/${props.original._id}`}>
              {props.original._id}
            </Link>
            </span>
          )
        },
      },

      /*Original code: return <span data-item-id={props.original._id}>{props.original._id}</span>;*/
     /* {
        Header: 'Name',
        accessor: 'name',
        filterable: true,
        Cell: props => {
          return <span data-name={props.original.name}>{props.value}</span>;
        },
      },*/
      {
        Header: 'Gender',
        accessor: 'SEX',
        filterable: true,
        Cell: props => {
          return <span data-gender={props.original.SEX}>{props.value}</span>;
        },
      },
    {
      Header: 'Age',
      accessor: 'AGE',
      filterable: true,
      Cell: props => {
        return <span data-age={props.original.AGE}>{props.value}</span>;
      },
    },
    {
      Header: 'Zip',
      accessor: 'ZIP',
      filterable: true,
      Cell: props => {
        return <span data-zip={props.original.ZIP}>{props.value}</span>;
      },
    },/*
      {
        Header: 'Day(s)',
        accessor: 'daysOfWeek',
        filterable: true,
        Cell: props => {
          const { daysOfWeek } = props.original;
          let daysToDisplay = '';
          if (daysOfWeek && typeof daysOfWeek === 'object') {
            for (const day in daysOfWeek) {
              daysToDisplay =
                daysToDisplay === '' ? daysOfWeek[day] : `${daysToDisplay}, ${daysOfWeek[day]}`;
            }
          }
          return (
            <span
              data-daysofweek={daysOfWeek && JSON.stringify(daysOfWeek)}
              data-daysofweek-by-id={props.original._id}>
              {daysToDisplay || '-'}
            </span>
          );
        },
      },
     /* {
        Header: 'Timeframe',
        accessor: 'timeframeNote',
        Cell: props => {
          return <span data-timeframe={props.original.timeframeNote}>{props.value || '-'}</span>;
        },
      },*/
    /*  {
        Header: 'Priority',
        accessor: 'priority',
        filterable: true,
        Cell: props => {
          return <span data-priority={props.original.priority}>{props.value}</span>;
        },
      },*/
      {
        Header: 'Patient ID',
        accessor: 'PATIENT_ID',
        filterable: true,
        Cell: props => {
          return (
            <span data-patient-id={props.original.patient_id}>
           <Link data-patient-id={props.original._id} to={`/item/patient-info/${props.original._id}`}>
              {props.original.PATIENT_ID}
            </Link>
            </span>
          );
        },
      },
      {
        Header: '',
        accessor: '',
        Cell: props => {
          return (
            <Link data-update-id={props.original._id} to={`/item/update/${props.original._id}`}>
              Update Item
            </Link>
          );
        },
      },
      {
        Header: '',
        accessor: '',
        Cell: props => {
          return (
            <span data-delete-id={props.original._id}>
              <DeleteButton id={props.original._id} onDelete={this.handleRemoveItem} />
            </span>
          );
        },
      },
    ];

    return (
      <div >
        <div className='svg-title'>
        <svg width="480" height="50" viewBox="0 0 480 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.875 49H0.15625V4.1875H30.875V13.1562H9.125V22.125H23.8438V31.0938H9.125V40.0312H30.875V49ZM67.0625 49H56.625L49.9688 38.75L43.25 49H32.8125L45.0312 31.8438L32.8125 15.3438H43.25L49.9688 24.9375L56.625 15.3438H67.0625L54.8125 31.8438L67.0625 49ZM101.094 49H99.0312L95.7188 44.4062C94.9062 45.1354 94.0417 45.8229 93.125 46.4688C92.2292 47.0938 91.2812 47.6458 90.2812 48.125C89.2812 48.5833 88.25 48.9479 87.1875 49.2188C86.1458 49.4896 85.0833 49.625 84 49.625C81.6458 49.625 79.4271 49.2292 77.3438 48.4375C75.2812 47.6458 73.4688 46.5 71.9062 45C70.3646 43.4792 69.1458 41.625 68.25 39.4375C67.3542 37.25 66.9062 34.7604 66.9062 31.9688C66.9062 29.3646 67.3542 26.9792 68.25 24.8125C69.1458 22.625 70.3646 20.75 71.9062 19.1875C73.4688 17.625 75.2812 16.4167 77.3438 15.5625C79.4271 14.6875 81.6458 14.25 84 14.25C85.0833 14.25 86.1562 14.3854 87.2188 14.6562C88.2812 14.9271 89.3125 15.3021 90.3125 15.7812C91.3125 16.2604 92.2604 16.8229 93.1562 17.4688C94.0729 18.1146 94.9271 18.8125 95.7188 19.5625L99.0312 15.5938H101.094V49ZM92.5 31.9688C92.5 30.8021 92.2708 29.6771 91.8125 28.5938C91.375 27.4896 90.7708 26.5208 90 25.6875C89.2292 24.8333 88.3229 24.1562 87.2812 23.6562C86.2604 23.1354 85.1667 22.875 84 22.875C82.8333 22.875 81.7292 23.0729 80.6875 23.4688C79.6667 23.8646 78.7708 24.4479 78 25.2188C77.25 25.9896 76.6562 26.9479 76.2188 28.0938C75.7812 29.2188 75.5625 30.5104 75.5625 31.9688C75.5625 33.4271 75.7812 34.7292 76.2188 35.875C76.6562 37 77.25 37.9479 78 38.7188C78.7708 39.4896 79.6667 40.0729 80.6875 40.4688C81.7292 40.8646 82.8333 41.0625 84 41.0625C85.1667 41.0625 86.2604 40.8125 87.2812 40.3125C88.3229 39.7917 89.2292 39.1146 90 38.2812C90.7708 37.4271 91.375 36.4583 91.8125 35.375C92.2708 34.2708 92.5 33.1354 92.5 31.9688ZM150.188 49H141.688V27.75C141.688 27.1667 141.573 26.6146 141.344 26.0938C141.135 25.5729 140.833 25.1146 140.438 24.7188C140.042 24.3229 139.583 24.0208 139.062 23.8125C138.542 23.5833 137.99 23.4688 137.406 23.4688C136.823 23.4688 136.271 23.5833 135.75 23.8125C135.25 24.0208 134.802 24.3229 134.406 24.7188C134.031 25.1146 133.729 25.5729 133.5 26.0938C133.292 26.6146 133.188 27.1667 133.188 27.75V49H124.656V27.75C124.656 27.1667 124.542 26.6146 124.312 26.0938C124.104 25.5729 123.802 25.1146 123.406 24.7188C123.01 24.3229 122.552 24.0208 122.031 23.8125C121.51 23.5833 120.958 23.4688 120.375 23.4688C119.792 23.4688 119.24 23.5833 118.719 23.8125C118.219 24.0208 117.771 24.3229 117.375 24.7188C117 25.1146 116.698 25.5729 116.469 26.0938C116.26 26.6146 116.156 27.1667 116.156 27.75V49H107.625V15.5312H109.688L112 18.0938C113.188 17.0938 114.49 16.3229 115.906 15.7812C117.344 15.2188 118.833 14.9375 120.375 14.9375C121.938 14.9375 123.458 15.2292 124.938 15.8125C126.438 16.3958 127.75 17.4062 128.875 18.8438C129.396 18.1354 129.99 17.5312 130.656 17.0312C131.323 16.5312 132.021 16.125 132.75 15.8125C133.5 15.5 134.271 15.2812 135.062 15.1562C135.854 15.0104 136.635 14.9375 137.406 14.9375C139.177 14.9375 140.833 15.2708 142.375 15.9375C143.938 16.6042 145.292 17.5208 146.438 18.6875C147.604 19.8333 148.521 21.1875 149.188 22.75C149.854 24.3125 150.188 25.9792 150.188 27.75V49ZM194.094 49H185.156V13.1562H171.688V4.1875H207.531V13.1562H194.094V49ZM238.531 49H236.469L233.156 44.4062C232.344 45.1354 231.479 45.8229 230.562 46.4688C229.667 47.0938 228.719 47.6458 227.719 48.125C226.719 48.5833 225.688 48.9479 224.625 49.2188C223.583 49.4896 222.521 49.625 221.438 49.625C219.083 49.625 216.865 49.2292 214.781 48.4375C212.719 47.6458 210.906 46.5 209.344 45C207.802 43.4792 206.583 41.625 205.688 39.4375C204.792 37.25 204.344 34.7604 204.344 31.9688C204.344 29.3646 204.792 26.9792 205.688 24.8125C206.583 22.625 207.802 20.75 209.344 19.1875C210.906 17.625 212.719 16.4167 214.781 15.5625C216.865 14.6875 219.083 14.25 221.438 14.25C222.521 14.25 223.594 14.3854 224.656 14.6562C225.719 14.9271 226.75 15.3021 227.75 15.7812C228.75 16.2604 229.698 16.8229 230.594 17.4688C231.51 18.1146 232.365 18.8125 233.156 19.5625L236.469 15.5938H238.531V49ZM229.938 31.9688C229.938 30.8021 229.708 29.6771 229.25 28.5938C228.812 27.4896 228.208 26.5208 227.438 25.6875C226.667 24.8333 225.76 24.1562 224.719 23.6562C223.698 23.1354 222.604 22.875 221.438 22.875C220.271 22.875 219.167 23.0729 218.125 23.4688C217.104 23.8646 216.208 24.4479 215.438 25.2188C214.688 25.9896 214.094 26.9479 213.656 28.0938C213.219 29.2188 213 30.5104 213 31.9688C213 33.4271 213.219 34.7292 213.656 35.875C214.094 37 214.688 37.9479 215.438 38.7188C216.208 39.4896 217.104 40.0729 218.125 40.4688C219.167 40.8646 220.271 41.0625 221.438 41.0625C222.604 41.0625 223.698 40.8125 224.719 40.3125C225.76 39.7917 226.667 39.1146 227.438 38.2812C228.208 37.4271 228.812 36.4583 229.25 35.375C229.708 34.2708 229.938 33.1354 229.938 31.9688ZM278.562 31.9688C278.562 34.5938 278.115 36.9896 277.219 39.1562C276.323 41.3229 275.104 43.1875 273.562 44.75C272.021 46.2917 270.208 47.4896 268.125 48.3438C266.062 49.1979 263.844 49.625 261.469 49.625C259.115 49.625 256.896 49.1875 254.812 48.3125C252.75 47.4375 250.938 46.2188 249.375 44.6562C247.833 43.0938 246.615 41.2396 245.719 39.0938C244.823 36.9271 244.375 34.5521 244.375 31.9688V2.21875H252.938V17.8438C253.396 17.2604 253.948 16.7396 254.594 16.2812C255.26 15.8229 255.969 15.4479 256.719 15.1562C257.49 14.8646 258.281 14.6458 259.094 14.5C259.906 14.3333 260.698 14.25 261.469 14.25C263.844 14.25 266.062 14.6979 268.125 15.5938C270.208 16.4688 272.021 17.6979 273.562 19.2812C275.104 20.8646 276.323 22.7396 277.219 24.9062C278.115 27.0521 278.562 29.4062 278.562 31.9688ZM269.969 31.9688C269.969 30.6771 269.74 29.4792 269.281 28.375C268.844 27.25 268.24 26.2812 267.469 25.4688C266.698 24.6562 265.792 24.0208 264.75 23.5625C263.729 23.1042 262.635 22.875 261.469 22.875C260.302 22.875 259.198 23.1354 258.156 23.6562C257.135 24.1562 256.24 24.8333 255.469 25.6875C254.698 26.5208 254.094 27.4896 253.656 28.5938C253.219 29.6771 253 30.8021 253 31.9688C253 33.2604 253.219 34.4583 253.656 35.5625C254.094 36.6667 254.698 37.625 255.469 38.4375C256.24 39.25 257.135 39.8958 258.156 40.375C259.198 40.8333 260.302 41.0625 261.469 41.0625C262.635 41.0625 263.729 40.8333 264.75 40.375C265.792 39.8958 266.698 39.25 267.469 38.4375C268.24 37.625 268.844 36.6667 269.281 35.5625C269.74 34.4583 269.969 33.2604 269.969 31.9688ZM291.906 49H283.312V2.21875H291.906V49ZM311.75 40.8125C312.083 40.9167 312.417 40.9896 312.75 41.0312C313.083 41.0521 313.417 41.0625 313.75 41.0625C314.583 41.0625 315.385 40.9479 316.156 40.7188C316.927 40.4896 317.646 40.1667 318.312 39.75C319 39.3125 319.604 38.7917 320.125 38.1875C320.667 37.5625 321.104 36.875 321.438 36.125L327.688 42.4062C326.896 43.5312 325.979 44.5417 324.938 45.4375C323.917 46.3333 322.802 47.0938 321.594 47.7188C320.406 48.3438 319.146 48.8125 317.812 49.125C316.5 49.4583 315.146 49.625 313.75 49.625C311.396 49.625 309.177 49.1875 307.094 48.3125C305.031 47.4375 303.219 46.2188 301.656 44.6562C300.115 43.0938 298.896 41.2396 298 39.0938C297.104 36.9271 296.656 34.5521 296.656 31.9688C296.656 29.3229 297.104 26.9062 298 24.7188C298.896 22.5312 300.115 20.6667 301.656 19.125C303.219 17.5833 305.031 16.3854 307.094 15.5312C309.177 14.6771 311.396 14.25 313.75 14.25C315.146 14.25 316.51 14.4167 317.844 14.75C319.177 15.0833 320.438 15.5625 321.625 16.1875C322.833 16.8125 323.958 17.5833 325 18.5C326.042 19.3958 326.958 20.4062 327.75 21.5312L311.75 40.8125ZM316.125 23.2188C315.729 23.0729 315.333 22.9792 314.938 22.9375C314.562 22.8958 314.167 22.875 313.75 22.875C312.583 22.875 311.479 23.0938 310.438 23.5312C309.417 23.9479 308.521 24.5521 307.75 25.3438C307 26.1354 306.406 27.0938 305.969 28.2188C305.531 29.3229 305.312 30.5729 305.312 31.9688C305.312 32.2812 305.323 32.6354 305.344 33.0312C305.385 33.4271 305.438 33.8333 305.5 34.25C305.583 34.6458 305.677 35.0312 305.781 35.4062C305.885 35.7812 306.021 36.1146 306.188 36.4062L316.125 23.2188ZM385.156 4.1875L370.438 49H361.469L346.812 4.1875H357L365.938 34.0938L374.906 4.1875H385.156ZM398.625 6.4375C398.625 7.22917 398.469 7.96875 398.156 8.65625C397.865 9.34375 397.458 9.94792 396.938 10.4688C396.417 10.9688 395.802 11.375 395.094 11.6875C394.406 11.9792 393.667 12.125 392.875 12.125C392.083 12.125 391.333 11.9792 390.625 11.6875C389.938 11.375 389.333 10.9688 388.812 10.4688C388.312 9.94792 387.906 9.34375 387.594 8.65625C387.302 7.96875 387.156 7.22917 387.156 6.4375C387.156 5.66667 387.302 4.9375 387.594 4.25C387.906 3.54167 388.312 2.9375 388.812 2.4375C389.333 1.91667 389.938 1.51042 390.625 1.21875C391.333 0.90625 392.083 0.75 392.875 0.75C393.667 0.75 394.406 0.90625 395.094 1.21875C395.802 1.51042 396.417 1.91667 396.938 2.4375C397.458 2.9375 397.865 3.54167 398.156 4.25C398.469 4.9375 398.625 5.66667 398.625 6.4375ZM397.156 49H388.562V15.5312H397.156V49ZM417 40.8125C417.333 40.9167 417.667 40.9896 418 41.0312C418.333 41.0521 418.667 41.0625 419 41.0625C419.833 41.0625 420.635 40.9479 421.406 40.7188C422.177 40.4896 422.896 40.1667 423.562 39.75C424.25 39.3125 424.854 38.7917 425.375 38.1875C425.917 37.5625 426.354 36.875 426.688 36.125L432.938 42.4062C432.146 43.5312 431.229 44.5417 430.188 45.4375C429.167 46.3333 428.052 47.0938 426.844 47.7188C425.656 48.3438 424.396 48.8125 423.062 49.125C421.75 49.4583 420.396 49.625 419 49.625C416.646 49.625 414.427 49.1875 412.344 48.3125C410.281 47.4375 408.469 46.2188 406.906 44.6562C405.365 43.0938 404.146 41.2396 403.25 39.0938C402.354 36.9271 401.906 34.5521 401.906 31.9688C401.906 29.3229 402.354 26.9062 403.25 24.7188C404.146 22.5312 405.365 20.6667 406.906 19.125C408.469 17.5833 410.281 16.3854 412.344 15.5312C414.427 14.6771 416.646 14.25 419 14.25C420.396 14.25 421.76 14.4167 423.094 14.75C424.427 15.0833 425.688 15.5625 426.875 16.1875C428.083 16.8125 429.208 17.5833 430.25 18.5C431.292 19.3958 432.208 20.4062 433 21.5312L417 40.8125ZM421.375 23.2188C420.979 23.0729 420.583 22.9792 420.188 22.9375C419.812 22.8958 419.417 22.875 419 22.875C417.833 22.875 416.729 23.0938 415.688 23.5312C414.667 23.9479 413.771 24.5521 413 25.3438C412.25 26.1354 411.656 27.0938 411.219 28.2188C410.781 29.3229 410.562 30.5729 410.562 31.9688C410.562 32.2812 410.573 32.6354 410.594 33.0312C410.635 33.4271 410.688 33.8333 410.75 34.25C410.833 34.6458 410.927 35.0312 411.031 35.4062C411.135 35.7812 411.271 36.1146 411.438 36.4062L421.375 23.2188ZM479.562 36.9062C479.562 38.6562 479.229 40.3125 478.562 41.875C477.896 43.4167 476.979 44.7604 475.812 45.9062C474.667 47.0521 473.312 47.9583 471.75 48.625C470.208 49.2917 468.552 49.625 466.781 49.625C465.198 49.625 463.677 49.3542 462.219 48.8125C460.76 48.25 459.438 47.4375 458.25 46.375C457.083 47.4375 455.771 48.25 454.312 48.8125C452.875 49.3542 451.354 49.625 449.75 49.625C447.979 49.625 446.323 49.2917 444.781 48.625C443.24 47.9583 441.885 47.0521 440.719 45.9062C439.573 44.7604 438.667 43.4167 438 41.875C437.333 40.3125 437 38.6562 437 36.9062V15.5938H445.531V36.9062C445.531 37.4896 445.635 38.0417 445.844 38.5625C446.073 39.0625 446.375 39.5104 446.75 39.9062C447.146 40.2812 447.594 40.5833 448.094 40.8125C448.615 41.0208 449.167 41.125 449.75 41.125C450.333 41.125 450.885 41.0208 451.406 40.8125C451.927 40.5833 452.385 40.2812 452.781 39.9062C453.177 39.5104 453.479 39.0625 453.688 38.5625C453.917 38.0417 454.031 37.4896 454.031 36.9062V15.5938H462.531V36.9062C462.531 37.4896 462.646 38.0417 462.875 38.5625C463.104 39.0625 463.406 39.5104 463.781 39.9062C464.177 40.2812 464.625 40.5833 465.125 40.8125C465.646 41.0208 466.198 41.125 466.781 41.125C467.365 41.125 467.917 41.0208 468.438 40.8125C468.958 40.5833 469.406 40.2812 469.781 39.9062C470.177 39.5104 470.49 39.0625 470.719 38.5625C470.948 38.0417 471.062 37.4896 471.062 36.9062V15.5938H479.562V36.9062Z" fill="white"/>
</svg>


        </div>
      <div className='Table-Container'>
      <div className='Table'>
      <Wrapper>
        {(items || []).length > 0 ? ( // defeats the purpose of using `isLoading` prop?
          <ReactTable
            data={items}
            columns={columns}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={10}
          />
        ) : (
          `No items to render... :(`
        )}
      </Wrapper>
      </div>
      </div>
      </div>
    );
  }
}

export default ItemsList;
