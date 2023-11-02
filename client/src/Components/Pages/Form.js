// import Register from '../RegisterForm/Register';
// import JobSeekerForm from '../RegisterForm/Jobseekerinfo';
// import { useState } from 'react';
// import axios from 'axios';
// import './form.css'

// const Form = () => {
//     const [page, setPage] = useState(0);
//     const [data, setData] = useState({
//         name: '',
//         mobile: '',
//         email: '',
//         password: '',
//         country: '',
//         workStatus: '',
//         isEmployed: '',
//         prevCompany: '',
//         prevJobT: '',
//         selectVisa: '',
//         selectedSkills: '',
//         jobProfile: ''
//     });

//     const RegisterUser = async (e) => {
//         const { name, mobile, email, password, country, workStatus, isEmployed, prevCompany, prevJobT, selectVisa, selectedSkills, jobProfile } = data
//         e.preventDefault();
//         try {
//             await axios.post('/register', {
//                 name,
//                 mobile,
//                 email,
//                 password,
//                 country,
//                 workStatus,
//                 isEmployed: isEmployed === 'Yes',
//                 prevCompany,
//                 prevJobT,
//                 selectVisa,
//                 selectedSkills,
//                 jobProfile,
//             })
//             alert("registration successful")
//         } catch (error) {
//             alert('Registration failed')
//             console.log(error)
//         }

//     }

//     const titles = ["User Info", "Personal Info"];

//     const PageDisplay = () => {

//         if (page === 0) {
//             return <Register data={data} setData={setData} />;
//         } else if (page === 1) {
//             return <JobSeekerForm data={data} setData={setData} />;
//         }
//     };

//     const handlePrevClick = () => {
//         // Handle any validation or error messages related to the current page here
//         setPage((currPage) => currPage - 1);
//     };

//     return (
//         <>
//             <div>
//                 {PageDisplay()}
//             </div>
//             <div className='btn_container'>
//                 <button
//                     className='button_'
//                     disabled={page === 0}
//                     onClick={handlePrevClick}

//                 >
//                     Prev
//                 </button>
//                 <button
//                     className='button_'
//                     onClick={(e) => {
//                         if (page === titles.length - 1) {
//                             alert('Form Submitted');
//                             RegisterUser(e);
//                             console.log(data);
//                         } else {
//                             setPage((currPage) => currPage + 1);
//                         }
//                     }}
//                 >
//                     {page === titles.length - 1 ? "Submit" : "Next"}
//                 </button>
//             </div>

//         </>
//     );
// };

// export default Form
