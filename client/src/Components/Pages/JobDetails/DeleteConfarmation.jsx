import React, { useState } from 'react';
import Modal from 'react-modal';
import './DeleteConfarmation.css'; // Import the CSS for styling
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const DeleteConfarmation = ({ isOpen, onClose, onDelete, jobId, api }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (api) {
                // console.log(jobId)
                await axios.delete(api);
                console.log('Job deleted!');
                navigate(-1);
            }
        } catch (error) {
            console.error('Delete request error:', error);
        } finally {
            // Close the modal whether the delete was successful or not
            setShowDeleteModal(false);
        }
    };


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="delete-confirmation-modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <div className='delete-confirmation-head'>
                    <h4>Delete Confirmation</h4>
                    <button className="close" onClick={onClose}>X</button>
                </div>
                <p>Are you sure you want to delete?</p>
                <div className="button-group">
                    <button className='cancel-delete' onClick={onClose}>Cancel</button>
                    <button className='confirm-delete' onClick={handleSubmit}>Yes, Delete</button>

                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfarmation;
