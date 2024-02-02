import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AddEmployment.css'

const AddEmploymentModal = ({ isOpen, onClose, onAddEmployment }) => {
    const [experience, setExperience] = useState('');
    const [company, setCompany] = useState('');
    const [designation, setDesignation] = useState('');
    const [noticePeriod, setNoticePeriod] = useState('');
    const [jobStatus, setJobStatus] = useState('current');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(jobStatus)

        try {
            // Send a POST request to your backend endpoint for adding employment
            const response = await axios.post('/api/v1/employment/add-employment', {
                employmentExperience: experience, // Use the correct field name expected by the server
                company,
                designation,
                noticePeriod,
                jobStatus,
            });

            // Handle the response status and update the UI accordingly
            if (response.status === 201) {
                // Employment added successfully
                console.log('Employment added successfully:', response.data);

                // Call the onAddEmployment function to update the UI with the new employment data
                onAddEmployment(response.data);

                // Close the modal
                onClose();
            } else {
                // Handle other response statuses or errors
                console.error('Failed to add employment:', response.data.error);
            }
        } catch (error) {
            console.error('Error adding employment:', error);
        }
    };
    const handleExperienceChange = (e) => {
        setExperience(e.target.value);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="employment-modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <div className='modalHead'>
                    <h4>Add Employment</h4>
                    <button className="close" onClick={onClose}>X</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="group__1">
                        <label className="name_details">Experience</label>
                        <select
                            id="experienceSelector"
                            value={experience}
                            onChange={handleExperienceChange}
                        >
                            <option value="Fresher">Fresher</option>
                            <option value="0-1">0-1 years</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5-10">5-10 years</option>
                            <option value="10+">10+ years</option>
                        </select>
                    </div>
                    <div className="group__1">
                        <label htmlFor="company">Company</label>
                        <input
                            type="text"
                            id="company"
                            placeholder='e.g., ABC Ltd.'
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>
                    <div className="group__1">
                        <label htmlFor="designation">Designation</label>
                        <input
                            type="text"
                            id="designation"
                            placeholder='e.g., Software Engineer'
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                    </div>
                    <div className="group__1">
                        <label htmlFor="noticePeriod">Notice Period</label>
                        <input
                            type="text"
                            id="noticePeriod"
                            placeholder='e.g., 1 month'
                            value={noticePeriod}
                            onChange={(e) => setNoticePeriod(e.target.value)}
                        />
                    </div>
                    <div className="group__1">
                        <div className='job_status'>
                            <label>Job Status:</label>
                            <label>
                                <input
                                    type="radio"
                                    value="Current"
                                    checked={jobStatus === 'current'}
                                    onChange={() => setJobStatus('current')}
                                />
                                Current
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="Previous"
                                    checked={jobStatus === 'previous'}
                                    onChange={() => setJobStatus('previous')}
                                />
                                Previous
                            </label>
                        </div>
                    </div>
                    <button className='add-employment' >Add Employment</button>
                </form>
            </div>
        </Modal>
    );
};

export default AddEmploymentModal;
