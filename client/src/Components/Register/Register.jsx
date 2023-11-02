import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios'
import LoginModal from '../Login/Login';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS for styling

const Registration = ({ isOpen, onClose, onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', {
                name,
                email,
                password,
            });
            console.log('Register succefully ');
            onClose()
            navigate('/details'); 
        } catch (error) {
            console.error('Axios error:', error);
            if (error.response) {
                console.log('Error data:', error.response.data);
                console.log('Error status:', error.response.status);
            }
        }
    };

    const handleLoginClick = () => {
        setIsModalOpen(true);


    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleLogin = (email, password) => {
        // Implement your login logic here
        console.log(`Login attempted with email: ${email} and password: ${password}`);

        // Close the modal
        handleModalClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="registration-modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <div className="registrationHead">
                    <h4>Register</h4>
                    <button className="close" onClick={onClose}>X</button>
                </div>
                <h6 onClick={handleLoginClick}>Already have an account ? </h6>
                <form onSubmit={handleSubmit}>
                    <div className="group1" id='name_group1'>
                        <label >Name</label>
                        <input
                            className="input_field"
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="group1">
                        <label >Email</label>
                        <input
                            className="input_field"
                            type="text"
                            id="email"
                            placeholder="johndoe@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="group1">
                        <label >Password</label>
                        <input
                            className="input_field"
                            type="password"
                            id="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <LoginModal
                            isOpen={isModalOpen}
                            onClose={handleModalClose}
                            onLogin={handleLogin}
                        />

                    </div>
                    <button className="register" id='register_btn'>Register</button>
                </form>
            </div>
        </Modal>
    );
};

export default Registration;