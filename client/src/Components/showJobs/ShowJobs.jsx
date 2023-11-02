import React, { useState, useEffect } from 'react';
import './showJobs.css';
import userImg from '../../assets/profile.png';
import { BiChevronUp, BiChevronDown } from 'react-icons/bi'



const ShowJobs = () => {
  const [profilePicture, setProfilePicture] = useState(userImg);
  const [selectedExperience, setSelectedExperience] = useState('');
  const [superSearchText, setSuperSearchText] = useState('Welcome to Job Portal');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false);
  const [shows, setShows] = useState(false);
  const [selectedSkillContent, setSelectedSkillContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


  

  const [jobData, setJobData] = useState([
    {
      id: 1,
      title: 'Web Developer',
      company: 'ABC Tech',
      location: 'New York',
      experience: '2-5 Years',
      skills: ['JavaScript', 'HTML', 'CSS'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      title: 'Graphic Designer',
      company: 'Design Co.',
      location: 'San Francisco',
      experience: 'Fresher',
      skills: ['Photoshop', 'Illustrator', 'UI/UX'],
      description: 'Pellentesque in libero a velit vehicula feugiat id non quam.',
    },
    {
      id: 2,
      title: 'Graphic Designer',
      company: 'Design Co.',
      location: 'San Francisco',
      experience: 'Fresher',
      skills: ['Photoshop', 'Illustrator', 'UI/UX'],
      description: 'Pellentesque in libero a velit vehicula feugiat id non quam.',
    },
    // Add more job data here
  ]);

  const filteredJob = jobData.filter((job) => {
    const experienceFilter = selectedExperience === '' || job.experience === selectedExperience;
    const skillsFilter = selectedSkills.length === 0 || selectedSkills.every((skill) => job.skills.includes(skill));

    // Step 4 (continued): Apply the search query filter
    const searchQueryFilter = searchQuery === '' || job.title.toLowerCase().includes(searchQuery.toLowerCase());

    return experienceFilter && skillsFilter && searchQueryFilter;
  });


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
            {/* <div className='color'>
            <div onClick={() => setShows(!shows)} className='select_skills'><h5>Select Skills</h5></div>
            {shows && (<select size={4} className='multiselect'>
              {availableSkills.map((element, index) => (
                <option  key={index} value={element}>
                  {element}
                </option>
              ))}
            </select>)}
          </div> */}


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
                <h3>{job.title}</h3>
                <p className='pera'>{job.company}</p>
                <div className='job_details'>
                  <span className='peraSub'>{job.experience}</span>
                  <span className='peraSub'>Not Disclosed</span>
                  <span className='peraSub'>{job.location}</span>
                </div>
                <span className='peraSub'>{job.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ShowJobs;
