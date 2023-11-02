import React, { useState } from 'react';
import JobseekerForm from './JobseekerForm';
import EmployerForm from './EmployerForm';
import Select from 'react-select';
import './MoreInfo.css'

const options = [
    { value: 'jobseeker', label: 'Jobseeker' },
    { value: 'employer', label: 'Employer' },
];

function MoreInfoForm() {
    const [userType, setUserType] = useState('jobseeker');


    return (
        <div id='contianer'>
            <h1>{userType === 'jobseeker' ? 'Jobseeker' : 'Employer'}</h1>
            <div id='select_type' >
                <label id='label_select'>I Am </label>
                {/* <select id='select_state' onChange={(e) => setUserType(e.target.value)}> */}
                <div className='User_type'>
                    <option className={userType === 'jobseeker' ? 'activ':""} onClick={(e) => setUserType(e.target.value)} value="jobseeker">Jobseeker</option>
                    <option className={userType === 'employer' ? 'activ':""} onClick={(e) => setUserType(e.target.value)} value="employer">Employer</option>
                </div>
                {/* </select> */}
            </div>
            {userType === 'jobseeker' ? <JobseekerForm /> : <EmployerForm />}
        </div>
    );
}

export default MoreInfoForm;
