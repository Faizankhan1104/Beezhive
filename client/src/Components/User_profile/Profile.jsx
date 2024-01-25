import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import "./My_jobs.css"
import { skillArrays, techStacks } from '../../Skills'
import userImg from '../../assets/profile.png';
import { useAuth } from '../../Context/Auth';
import Multiselect from 'multiselect-react-dropdown';

const Profile = () => {
    const [profilePicture, setProfilePicture] = useState(userImg);
    const [experience, setExperience] = useState('Fresher');
    const [selectedTechStack, setSelectedTechStack] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [currentSkills, setCurrentSkills] = useState([]);
    const [auth, setAuth] = useAuth();
    const [industry_type, setIndustry_type] = useState();
    const [company, setCompany] = useState();
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
    const handleExperienceChange = (e) => {
        setExperience(e.target.value);
    };
    const handleTechStackChange = (selectedList) => {
        setSelectedTechStack(selectedList);

        // Get the skills for all selected tech stacks
        const selectedTechStackNames = selectedList.map((tech) => tech.id);
        const allSelectedSkills = selectedTechStackNames.reduce((acc, stack) => {
            return acc.concat(skillArrays[stack] || []);
        }, []);

        // Filter out any skills that are not in the current selection
        const updatedSelectedSkills = selectedSkills.filter((skill) =>
            allSelectedSkills.some((selectedSkill) => selectedSkill.name === skill.name)
        );

        setSelectedSkills(updatedSelectedSkills);
        setCurrentSkills(allSelectedSkills);
    };

    const handleSkillsChange = (selectedOptions) => {
        setSelectedSkills(selectedOptions);
    };

    return (
        <div>
            <div className="profile-container">

                <Sidebar />
                <div className='_Myjobs'>

                    <div>
                        <div className='user__profile'>
                            <img src={profilePicture} alt='Profile' className='profile--picture' />
                            <input
                                type='file'
                                accept='image/*'
                                onChange={handleProfilePictureChange}
                                className='file-input'
                            />
                            <div>
                                <h3>{auth?.user.name}</h3>
                                <h6>{auth?.user.email}</h6>
                                <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, deserunt.</h6>
                            </div>
                        </div>
                        {auth?.user.userType === 'employer' ? (<div className='add__info_experience'>
                            <h3 className='profile_experience'>Company Details</h3>
                            <div className='experience_info'>
                                <div className='inp_details'>
                                    <label className='name_details' >Company Name</label>
                                    <input placeholder='i.e Amazone' className='input_field_details ' type="text" value={company} onChange={(e) => setCompany(e.target.value)} required /><br /><br />
                                </div>
                                <div className='inp_details'>
                                    <label className='name_details' >Industry Type</label>
                                    <input placeholder='i.e Information And Technology' className='input_field_details ' type="text" value={industry_type} onChange={(e) => setIndustry_type(e.target.value)} required /><br /><br />
                                </div>
                            </div>
                            <div className='experience_info'>

                                <div className='inp_details'>
                                    <label className='name_details'>Company Email</label>
                                    <input placeholder='i.e Amazone' className='input_field_details ' type="text" value={company} onChange={(e) => setCompany(e.target.value)} required /><br /><br />
                                </div>
                                <div className='inp_details'>
                                    <label className='name_details'>Phone Number</label>
                                    <input placeholder='i.e Amazone' className='input_field_details ' type="text" value={company} onChange={(e) => setCompany(e.target.value)} required /><br /><br />
                                </div>
                                <div className='inp_details'>
                                    <label className='name_details'>Company Website</label>
                                    <input placeholder='i.e Amazone' className='input_field_details ' type="text" value={company} onChange={(e) => setCompany(e.target.value)} required /><br /><br />
                                </div>
                                <div className='inp_details'>
                                    <label className='name_details'>Company Location</label>
                                    <input placeholder='i.e Amazone' className='input_field_details ' type="text" value={company} onChange={(e) => setCompany(e.target.value)} required /><br /><br />
                                </div>
                            </div>
                            <div className='inp_details'>
                                <label className='name_details' >About Company</label>
                                <textarea
                                    className='description_textarea'
                                    id="description"
                                    name="description"
                                    value={""}
                                    onChange={""}
                                    placeholder="Enter job description..."
                                    rows="5"
                                    cols="100"
                                    required
                                ></textarea><br /><br />
                            </div>
                        </div>) : (<>
                            <div className='add__info_experience'>
                                <h3 className='profile_experience'>Employment</h3>
                                <div className='experience_info'>

                                    <div className='inp_detail_profile'>
                                        <label className='name_details'>Experience</label>
                                        <select id="experienceSelector"
                                            value={experience} onChange={handleExperienceChange} >
                                            <option value="Fresher">Fresher</option>
                                            <option value="0-1">0-1 years</option>
                                            <option value="1-3">1-3 years</option>
                                            <option value="3-5">3-5 years</option>
                                            <option value="5-10">5-10 years</option>
                                            <option value="10+">10+ years</option>
                                        </select>
                                    </div>
                                    <div className='inp_details'>
                                        <label className='name_details' >Company Name</label>
                                        <input placeholder='i.e Amazone' className='input_field_details ' type="text" value={company} onChange={(e) => setCompany(e.target.value)} required /><br /><br />
                                    </div>
                                </div>
                                <div className='experience_info'>

                                    <div className='inp_detail_profile'>
                                        <label className='name_details'>Designation</label>
                                        <input placeholder='i.e Amazone' className='input_field_details ' type="text" value={company} onChange={(e) => setCompany(e.target.value)} required /><br /><br />
                                    </div>
                                    <div className='inp_details'>
                                        <label className='name_details' >Job Profile</label>
                                        <input placeholder='i.e Amazone' className='input_field_details ' type="text" value={company} onChange={(e) => setCompany(e.target.value)} required /><br /><br />
                                    </div>
                                </div>
                            </div>
                            <div className='add__info_experience'>
                                <h3 className='profile_experience'>Key Skilla</h3>
                                <p>Tell recruiters what you know or what you are known for e.g. Direct Marketing, Oracle, Java etc. We will send you job recommendations based on these skills.</p>
                                <div className='skills_selection'>
                                    <label className='name_details_profile'>Select Tech Stack</label>
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
                                            <label className='name_details_profile'>Add Skills</label>
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
                                <button className='profile_btn_add'>Add</button>
                            </div>

                        </>)}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile