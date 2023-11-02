import React, {useState} from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Login/Login'
import MoreInfoForm from './Components/MoreInfo/MoreInfo'
// import LoginPopup from './Components/LoginPop/Login'
import Form from './Components/Pages/Form'

import Home from './Components/Pages/Home/Home'
import Footer from './Components/Footer/Footer'
import ShowJobs from './Components/showJobs/ShowJobs'
// import JobSeekerForm from './Components/RegisterForm/Jobseekerinfo'
import {isJobSeekerLoggedIn } from './auth/auth';
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:5000";

// Enable credentials for cross-origin requests if needed
axios.defaults.withCredentials = true;



export const App = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Navbar />
    {/* <ListsJob/> */}

   
    <main>
      
        <Routes>
        <Route path='/' element={<ShowJobs/>}/>
        
        <Route path='/register' element={<Form />}/>
        <Route path='/details' element={<MoreInfoForm />}/>
        {/* <Route path='/employRegister' element={<Register employer = "Employer"/>}/> */}
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/jobseekerinfo/${_id}' element={<JobSeekerForm/>}/> */}
        
        </Routes>

    </main>
    
    <Footer/>
    
    </>
  )
}
export default App