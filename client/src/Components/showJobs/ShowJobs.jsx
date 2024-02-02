import React, { useState, useEffect } from 'react';
import './showJobs.css';
import userImg from '../../assets/profile.png';
import searchImg from '../../assets/searchImage.jpg';
import { BiChevronUp, BiChevronDown } from 'react-icons/bi'
import Layout from '../Layout/Layout';
import { useAuth } from '../../Context/Auth'
import axios from 'axios';
import { GiMoneyStack } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineWorkHistory } from "react-icons/md";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import striptags from 'striptags';
import LoginModal from '../Login/Login';
import Multiselect from 'multiselect-react-dropdown';
import { skillArrays, techStacks } from '../../Skills';



const ShowJobs = () => {
  const [profilePicture, setProfilePicture] = useState(userImg);
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectSkills, setSelectSkills] = useState([]);
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useAuth();
  const [selectedSkillContent, setSelectedSkillContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobData, setJobData] = useState([]);
  const [filteredJob, setFilteredJobs] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experience, setExperience] = useState('');
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [currentSkills, setCurrentSkills] = useState([]);

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

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogin = (email, password) => {
    console.log(`Login attempted with email: ${email} and password: ${password}`);
    handleModalClose();
  };

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

  const handleTechStackChange = (selectedList) => {
    setSelectedTechStack(selectedList);

    const selectedTechStackNames = selectedList.map((tech) => tech.id);
    const allSelectedSkills = selectedTechStackNames.reduce((acc, stack) => {
      return acc.concat(skillArrays[stack] || []);
    }, []);

    const updatedSelectedSkills = selectSkills.filter((skill) =>
      allSelectedSkills.some((selectedSkill) => selectedSkill.name === skill.name)
    );

    setSelectedSkills(updatedSelectedSkills);
    setCurrentSkills(allSelectedSkills);
  };

  const handleSkillsChange = (selectedOptions) => {
    setSelectSkills(selectedOptions);
  }; 


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

  const handleApplyClick = (job) => {
    // Redirect to the appropriate page when Apply is clicked
    if (!auth?.user?._id) {
      setIsModalOpen(true);
    } else if (!auth.user.userType === "employer" && !auth.user.resume) {
      navigate(`/${auth.user?.userType}/resume`);
    } else if (job.applicants && job.applicants.includes(auth.user._id)) {
      navigate(`/jobs/${job.slug}`);
    } else {
      navigate(`/jobs/${job.slug}`);
    }
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


  // const handleSkillsChange = (e) => {
  //   const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
  //   setSelectedSkills(selectedOptions);
  // };

  const filteredJobs = jobData.filter((job) => {
    const experienceFilter = selectedExperience === '' || job.experience === selectedExperience;
    const skillsFilter = selectedSkills.length === 0 || selectedSkills.every((skill) => job.skills.includes(skill));
    return experienceFilter && skillsFilter;
  });




  return (
    <Layout>
      <section className=' job_section'>
        <div className='super_Seacrh'>
          <img src={searchImg} alt="searchImage" />
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
            {/* <div className='profile_div'>
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
            </div> */}

            <div className='all_filters'>
              <h3>All Filter</h3>

              <div className="group__1">
                <h5 className="name_details">Experience</h5>
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
            </div>

            <div className="skills_selection">
              <h5 className="name_details_profile">Tech Stack</h5>
              <Multiselect
                options={techStacks}
                selectedValues={selectedTechStack}
                onSelect={handleTechStackChange}
                onRemove={handleTechStackChange}
                displayValue="name"
                placeholder="Select Tech Stack"
                showCheckbox={true}
                
              />

              {selectedTechStack.length > 0 && (
                <div>
                  <label className="name_details_profile">Add Skills </label>
                  <Multiselect
                    options={currentSkills}
                    selectedValues={selectSkills}
                    onSelect={handleSkillsChange}
                    onRemove={handleSkillsChange}
                    displayValue="name"
                    placeholder="Select Skills"
                    showCheckbox={true}
                  />
                </div>
              )}
            </div>


          </div>
          <div className='jobList'>
            <ul>
              {filteredJobs.map((job) => (
                <li className='lists' key={job.id}>
                  <h5>{job.jobTitle}</h5>
                  <p className='pera'>{job.company}</p>
                  <div className='job_details'>
                    <span className='peraSub'><MdOutlineWorkHistory /> {job.experience}</span>
                    <span className='peraSub'><GiMoneyStack /> {job.salary}</span>
                    <span className='peraSub'><IoLocationOutline /> {job.location}</span>
                  </div>
                  <div className='peraSub apply_job'>{striptags(job.description).substring(0, 75) + "..."}
                    {job.applicants && job.applicants.includes(auth?.user?._id) ? (<Link to={`/jobs/${job.slug}`}>Applied</Link>) : (<button onClick={() => handleApplyClick(job)}>Apply</button>)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <LoginModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onLogin={handleLogin}
        />
      </section>
    </Layout>
  );
};

export default ShowJobs;
