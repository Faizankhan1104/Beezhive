import React from 'react';
import './Navbar.css'
import LoginModal from '../Login/Login';
import RegistrationModal from '../Register/Register';
import { Link } from 'react-router-dom';
import { isUserLoggedIn } from '../../auth/auth';
import { useState } from 'react';

const Navbar = ({ userName }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };
  const handleRegistrationClick = () => {
    setIsRegistrationModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsRegistrationModalOpen(false);
  };
  const switchLogin = () => {
    setIsModalOpen(true);
    setIsRegistrationModalOpen(false);
  }
  const handleLogin = (email, password) => {
    // Implement your login logic here
    console.log(`Login attempted with email: ${email} and password: ${password}`);

    // Close the modal
    handleModalClose();
  };
  const handleRegistration = (name, email, password) => {
    // Implement your registration logic here
    console.log(`Registration attempted with name: ${name}, email: ${email}, and password: ${password}`);

    // Close the modal
    handleModalClose();
  };


  // ==============================================================

  const isJobSeekerLoggedIn = isUserLoggedIn();

  const navbarStyle = {
    backgroundColor: 'white', // Set the background color to white
    color: 'black', // Set the text color to black
  };

  return (
    <nav id='navbar' className="navbar navbar-expand-lg text-dark bg-white p-2">
      <div className="container-fluid">
        <a className="navbar-brand font-weight-light" href="/">
          <span className=' font-weight-bold fs-3 font-italic ' >BEEZHIVE</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active text-dark" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-dark"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Job Seeker
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="drp dropdown-item text-dark" onClick={handleLoginClick} >
                    Login
                  </Link>

                </li>
                <li>
                  <a className="drp dropdown-item text-dark" onClick={handleRegistrationClick}>
                    Register
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-dark"
                href="#"
                id="employerDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Employer
              </a>
              <LoginModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onLogin={handleLogin}
                swithx={switchLogin}
              />
              <RegistrationModal isOpen={isRegistrationModalOpen} onClose={handleModalClose} onRegister={handleRegistration} />
              <ul className="dropdown-menu" aria-labelledby="employerDropdown">
                <li>
                  <a className="drp dropdown-item" onClick={handleLoginClick}>
                    Login
                  </a>
                </li>
                <li>
                  <a className=" drp dropdown-item" onClick={handleRegistrationClick}>
                    Register
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <button className='btn btn-dark '>Post Jobs For Free</button>
        </div>

      </div>
    </nav>
  );

};

export default Navbar;
