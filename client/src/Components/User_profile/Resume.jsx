// Resume.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

const Resume = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [auth, setAuth] = useAuth();
  const [resumes, setResumes] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('resume', file);
    });

    const token = auth && auth.token;

    try {
      const response = await axios.post('/api/v1/auth/upload', formData, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Files uploaded successfully');

        // Fetch updated user data after upload
        const updatedUserData = await auth.getUserData();

        // Update the auth context with the new user data
        setAuth({ ...auth, user: updatedUserData });

        // Optionally, you can reset the selectedFiles state after the upload
        setSelectedFiles([]);
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get('/api/v1/auth/resumes', {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
          },
        });

        setResumes(response.data.resumes);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    fetchResumes();
  }, [auth.token]);

  return (
    <div>
      <Navbar />
      <div className='_Myjobs'>
        <Sidebar />
        <div className='resume__'>
          <h3 className='resume_heading'>Resume</h3>
          <ul>
            {resumes.map((resume, index) => (
              <li key={index}>{resume.fileName}</li>
            ))}
          </ul>
          <p>Resume is the most important document recruiters look for. Recruiters generally do not look at profiles without resumes.</p>
          <div className='resume_upload'>
            <label htmlFor="file" className='label_resume' >Upload Resumes</label>
            <p>Supported Formats: doc, docx, rtf, pdf, upto 2 MB</p>
            <input
              type="file"
              id='file'
              name='resume'
              multiple
              className='upload_resume'
              onChange={handleFileChange} />
          </div>

          <button className='resume_btn_add' onClick={handleUpload}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
