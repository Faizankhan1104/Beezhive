import React, { useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import { useAuth } from './Context/Auth'
import ShowJobs from './Components/showJobs/ShowJobs'
import Resume from './Components/User_profile/Resume'
import Profile from './Components/User_profile/Profile'
import My_jobs from './Components/User_profile/My_jobs'
import JobForm from './Components/Pages/JobPost/Jobform'
import JobDetails from './Components/Pages/JobDetails/Job_Details';
import UpdateJob from './Components/Pages/UpdateJob/UpdateJob'

import axios from 'axios'


axios.defaults.baseURL = "http://localhost:5000";

// Enable credentials for cross-origin requests if needed
axios.defaults.withCredentials = true;



export const App = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auth, setAuth] = useAuth();

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>

      {/* <ListsJob/> */}


      <main>

        <Routes>
          <Route path='/' element={<ShowJobs />} />
          {/* <Route path={`/${auth.user?.userType}/details`} element={""} > */}
            
            <Route path={`/${auth.user?.userType}/resume`} element={<Resume/>} />
            <Route path={`/${auth.user?.userType}/myjobs`} element={<My_jobs/>} />
            <Route path={`/${auth.user?.userType}/profile`} element={<Profile/>} />
            <Route path={`/${auth.user?.userType}/jobpost`} element={<JobForm/>} />
            <Route path="/jobs/:slug" element={<JobDetails />} />
            <Route path={`/${auth.user?.userType}/job-Update/:slug`} element={<UpdateJob/>} />
          {/* </Route> */}
          <Route path='/login' element={<Login />} />
          {/* <Route path='/jobseekerinfo/${_id}' element={<JobSeekerForm/>}/> */}

        </Routes>

      </main>



    </>
  )
}
export default App