import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-6';
import { DeleteButton } from '../components/buttons';
import api from '../api';

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
      {
        Header: 'Name',
        accessor: 'name',
        filterable: true,
        Cell: props => {
          return <span data-name={props.original.name}>{props.value}</span>;
        },
      },
      {
        Header: 'Gender',
        accessor: 'gender',
        filterable: true,
        Cell: props => {
          return <span data-gender={props.original.gender}>{props.value}</span>;
        },
      },
    {
      Header: 'Age',
      accessor: 'age',
      filterable: true,
      Cell: props => {
        return <span data-age={props.original.age}>{props.value}</span>;
      },
    },
    {
      Header: 'Zip',
      accessor: 'zip',
      filterable: true,
      Cell: props => {
        return <span data-zip={props.original.zip}>{props.value}</span>;
      },
    },
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
      {
        Header: 'Timeframe',
        accessor: 'timeframeNote',
        Cell: props => {
          return <span data-timeframe={props.original.timeframeNote}>{props.value || '-'}</span>;
        },
      },
      {
        Header: 'Priority',
        accessor: 'priority',
        filterable: true,
        Cell: props => {
          return <span data-priority={props.original.priority}>{props.value}</span>;
        },
      },
      {
        Header: 'Patient ID',
        accessor: 'PATIENT_ID',
        filterable: true,
        Cell: props => {
          return (
            <span data-patient-id={props.original.patient_id}>
           <Link data-patient-id={props.original._id} to={`/item/patient-info/${props.original._id}`}>
              {props.original._id}
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
    );
  }
}

export default ItemsList;
