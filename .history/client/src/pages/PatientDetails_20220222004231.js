import React from 'react';
import {useParams} from 'react-router-dom';

const PatientDetails = () => {
    alert('test');
    const{id} = useParams();
    return(
        <>
            <h1>Patient ID: </h1>
        </>
    );
};

export default PatientDetails;