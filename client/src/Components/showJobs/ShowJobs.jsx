import React, { useState, useEffect } from 'react';
import './showJobs.css';
import userImg from '../../assets/profile.png';
import { BiChevronUp, BiChevronDown } from 'react-icons/bi'
import Layout from '../Layout/Layout';
import { useAuth } from '../../Context/Auth'
import axios from 'axios';
import { GiMoneyStack } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineWorkHistory } from "react-icons/md";
import { Link } from 'react-router-dom';
import striptags from 'striptags';


const ShowJobs = () => {
  const [profilePicture, setProfilePicture] = useState(userImg);
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useAuth();
  const [selectedSkillContent, setSelectedSkillContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobData, setJobData] = useState([]);
  const [filteredJob, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`/api/v1/job/getjobs`);
        // Assuming the job data is stored in the 'jobs' property of the response
        setJobData(response.data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
  
    fetchJobs();
  }, []);


  useEffect(() => {

    const updatedFilteredJobs = jobData.filter((job) => {
      console.log('Job:', job); // Add this line
      const matchesExperience = selectedExperience === '' || job.experience === selectedExperience;
      const matchesSkills = selectedSkills.length === 0 || selectedSkills.every((skill) => job.skills.includes(skill));
      const matchesSearchQuery =
        searchQuery === '' || (job.title && job.title.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesExperience && matchesSkills && matchesSearchQuery;
    });

    setFilteredJobs(updatedFilteredJobs);


  }, [selectedExperience, selectedSkills, searchQuery, jobData]);



  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const handleSkillClick = (content) => {
    setSelectedSkillContent(content);
  };
  const availableSkills = [
    'Skills',
    'JavaScript',
    'Python',
    'Java',
    'HTML',
    'CSS',
    'React',
    'Node.js',
    'SQL',
    'NoSQL',
    'Machine Learning',
    'Cybersecurity',
    'AWS',
    'Azure',
    'Networking',
    'Operating Systems',
  ];


  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };


  const handleSkillsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedSkills(selectedOptions);
  };

  const filteredJobs = jobData.filter((job) => {
    const experienceFilter = selectedExperience === '' || job.experience === selectedExperience;
    const skillsFilter = selectedSkills.length === 0 || selectedSkills.every((skill) => job.skills.includes(skill));
    return experienceFilter && skillsFilter;
  });




  return (
    <Layout>
      <section className=' job_section'>
        <div className='super_Seacrh'>
          <div className="search-bar">
            <input
              className='input_search'
              type="text"
              placeholder="Search by job title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            // Step 3: Attach onChange event handler
            />
            <button className='search_btn'>Search</button>
          </div>
        </div>

        <div className='container'>
          <div className="sidebar" >
            <div className='profile_div'>
              <div className='profile-picture-container'>
                <img src={profilePicture} alt='Profile' className='profile-picture' />
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleProfilePictureChange}
                  className='file-input'
                />
              </div>
              <p className='name'>John Doe</p>
              <p>Email: john@example.com</p>
              <p>Bio: Passionate developer exploring new opportunities.</p>
            </div>

            <div className='all_filters'>
              <h5>All Filter</h5>

              <div className='skills_select'>

                <select name='select' multiple className='multiselect' > ({
                  availableSkills.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))
                })
                </select>


              </div>

              <div className="range">
                <div className='exp' onClick={() => setShow(!show)}><h5 >Experience </h5> {show ? <BiChevronUp className='exp_icon' /> : <BiChevronDown className='exp_icon' />}</div>

                {show && (<div className="field">
                  <div className="value-left">{value}</div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={value}
                    step="1"
                    onChange={handleChange}
                  />
                  <div className="value right">30</div>
                </div>)
                }

              </div>


            </div>


          </div>
          <div className='jobList'>
            <ul>
              {filteredJobs.map((job) => (
                <li className='lists' key={job.id}>
                  <h3>{job.jobTitle}</h3>
                  <p className='pera'>{job.company}</p>
                  <div className='job_details'>
                    <span className='peraSub'><MdOutlineWorkHistory /> {job.experience}</span>
                    <span className='peraSub'><GiMoneyStack /> {job.salary}</span>
                    <span className='peraSub'><IoLocationOutline /> {job.location}</span>
                  </div>
                  <div className='peraSub apply_job'>{striptags(job.description).substring(0, 75) + "..."}
                  <Link to={`/jobs/${job.slug}`}>Apply</Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShowJobs;
