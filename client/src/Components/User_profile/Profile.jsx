import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import axios from 'axios';
import './My_jobs.css';
import { skillArrays, techStacks } from '../../Skills';
import userImg from '../../assets/profile.png';
import { useAuth } from '../../Context/Auth';
import Multiselect from 'multiselect-react-dropdown';
import AddEmploymentModal from '../AddEmploymentModal/AddEmploymentModal';
import UpdateProfile from '../Update_profile/UpdateProfile';
import { FaUserEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import AddSkillsModel from '../KeySkills/AddSkillsModel';
import DeleteConfarmation from '../Pages/JobDetails/DeleteConfarmation'


const Profile = () => {
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [currentSkills, setCurrentSkills] = useState([]);
  const [auth, setAuth] = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addSkills, setAddSkills] = useState(false)
  const [updateProfileModel, setUpdateProfileModel] = useState(false);
  const [user, setUser] = useState();
  const [employmentDetails, setEmploymentDetails] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expId, setExpId] = useState()

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log(auth.user._id)
      try {
        const response = await axios.get(`/api/v1/auth/get-User/${auth.user._id}`);


        if (response.data) {
          console.log(response.data.user)
          setUser(response.data.user);
        } else {
          console.error('Profile picture data not found in the response.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserProfile();
  }, [auth]);




  const handleaddEmployment = () => {
    setIsModalOpen(true);
  };


  const handleModalClose = () => {
    setIsModalOpen(false);
    setAddSkills(false);
    setUpdateProfileModel(false);
  };

  const handleLogin = (email, password) => {
    handleModalClose();
  };

  const handleaddSkilla = () => {
    setAddSkills(true);
  };

  const handleSkillsSubmit = () => {
    handleCloseModal();
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/job/delete-job/${employmentDetails._id}`);
      console.log('Job deleted!');
    } catch (error) {
      console.log(error);
    }
  };

  // const handleTechStackChange = (selectedList) => {
  //   setSelectedTechStack(selectedList);

  //   const selectedTechStackNames = selectedList.map((tech) => tech.id);
  //   const allSelectedSkills = selectedTechStackNames.reduce((acc, stack) => {
  //     return acc.concat(skillArrays[stack] || []);
  //   }, []);

  //   const updatedSelectedSkills = selectedSkills.filter((skill) =>
  //     allSelectedSkills.some((selectedSkill) => selectedSkill.name === skill.name)
  //   );

  //   setSelectedSkills(updatedSelectedSkills);
  //   setCurrentSkills(allSelectedSkills);
  // };

  // const handleSkillsChange = (selectedOptions) => {
  //   setSelectedSkills(selectedOptions);
  // };

  console.log(employmentDetails._id);

  const handleOpenModal = () => {
    setUpdateProfileModel(true);
  };

  const handleDeleteModel = (employmentId) => {
    setExpId(employmentId);
    setShowDeleteModal(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileUpdate = (updatedUserData) => {

  };

  useEffect(() => {
    const fetchEmploymentDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/employment/employment-details/${auth.user?._id}`);
        console.log(response.data)
        setEmploymentDetails(response.data);
      } catch (error) {
        console.error('Error fetching employment details:', error);
      }
    };

    fetchEmploymentDetails();
  }, [auth]);
  useEffect(() => {
    const fetchEmploymentDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/get-employment-details/${auth.user?._id}`);
        setEmploymentDetails(response.data);
      } catch (error) {
        console.error('Error fetching employment details:', error);
      }
    };

    fetchEmploymentDetails();
  }, [auth]);

  const handleSaveChanges = async () => {
    try {
      console.log(selectedTechStack);
      const profileData = {
        selectedTechStack,
        selectedSkills,
      };

      const response = await axios.put(`/api/v1/auth/update-user-profile/${auth.user?._id}`, profileData);

      // Handle the response or update the local state as needed
      console.log('Profile updated successfully:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <div className="profile-container">
        <Sidebar />
        <div className="_Myjobs">
          <div>
            <div className="user__profile">
              <img htmlFor='file' src={user?.profilePicture?.url || userImg} alt="Profile" className="profile--picture" />

              <div>
                <h5>{user?.name} <FaUserEdit id='edit_icon' onClick={handleOpenModal} /></h5>
                <h6>{auth?.user.email}</h6>
                <h6>
                  {user?.about}
                </h6>
              </div>
            </div>

            <div className="add__info_experience">
              <button id="text-dark" onClick={handleaddEmployment} >
                Add Employment
              </button>
            </div>
            <div className="add__info_experience">

              {employmentDetails.map((employment) => (
                <div key={employment._id}>
                  <div className='experience_section'>
                    <h5>Experience: <p>{employment.employmentExperience}</p></h5>
                    <h5>Company Name: <p>{employment.company}</p></h5>
                    <h5>Designation: <p>{employment.designation}</p></h5>
                    {employment.jobStatus === 'Current' ? (<><h5>Notice Period:<p>{employment.noticePeriod}</p></h5></>) : (<><h5>Job Status:<p>{employment.jobStatus}</p></h5></>)}
                    <div className='edit_delete_icon'>
                      <MdDelete onClick={() => handleDeleteModel(employment._id)} className='icon_delete  icon_hvr' />
                      <FiEdit className='icon_hvr' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="add__info_experience">
              <h5 className="profile_experience">Key Skills <FiEdit2 onClick={handleaddSkilla} className='icon_skills' /></h5>
              <p>
                Tell recruiters what you know or what you are known for e.g. Direct Marketing,
                Oracle, Java etc. We will send you job recommendations based on these skills.
              </p>

              <div className="add__info_experience">
                <h5 className="profile_experience">Selected Tech Stack</h5>
                {user?.selectedTechStack.map((tech) => (

                  <span className='chip__ chip' key={tech.id}>{tech.name}</span>

                ))}
              </div>

              <div className="add__info_experience">
                <h5 className="profile_experience">Selected Skills</h5>
                {user?.selectedSkills.map((skill) => (


                  <span className='chip__  chip' key={skill.id}>{skill.name}</span>


                ))}
              </div>



              {/*<div className="skills_selection">
                <label className="name_details_profile">Select Tech Stack</label>
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
                      selectedValues={selectedSkills}
                      onSelect={handleSkillsChange}
                      onRemove={handleSkillsChange}
                      displayValue="name"
                      placeholder="Select Skills"
                      showCheckbox={true}
                    />
                  </div>
                )}
              </div>
              <button className="profile_btn_add" onClick={handleSaveChanges}>
                Add
              </button> */}

            </div>
          </div>
        </div>
      </div>
      <AddEmploymentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAddEmployment={handleLogin}
      />
      <UpdateProfile
        isOpen={updateProfileModel}
        onClose={handleModalClose}
        onUpdate={handleProfileUpdate}
        userData={auth?.user}
      />
      <AddSkillsModel
        isOpen={addSkills}
        onClose={handleModalClose}
        onAddEmployment={handleSkillsSubmit}
        auth={auth}

      />
      <DeleteConfarmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        jobId={employmentDetails._id}
        onConfirm={handleDelete}
        api={`/api/v1/employment/delete-employment/${expId}`}
      />
    </div>
  );
};

export default Profile;
