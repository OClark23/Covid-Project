import React from 'react';
import {useParams} from 'react-router-dom';

const PatientDetails = () => {
    console.log
    const{id} = useParams();
    return(
        <>
            <h1>Patient ID: </h1>
        </>
    );
};

export default PatientDetails;