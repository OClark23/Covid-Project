import React from 'react';
import {useParams} from 'react-router-dom';

const PatientDetails = () => {
    const{id} = useParams();
    return(
        <>
            <h1>Patient ID: {id}</h1>
        </>
    );
};

export default PatientDetails;