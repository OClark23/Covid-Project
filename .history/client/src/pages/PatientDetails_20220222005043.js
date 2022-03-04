import React from 'react';
import {useParams} from 'react-router-dom';

const PatientDetails = () => {
    const{_id} = useParams();
    return(
        <>
            <h1>Patient ID:{_id}</h1>      
        </>
    );
};

export default PatientDetails;