import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import './Job_Details.css'
import { PiBagSimpleBold } from "react-icons/pi";
import { MdCurrencyRupee } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useAuth } from '../../../Context/Auth'
import DeleteConfarmation from "./DeleteConfarmation";

const JobDetails = () => {
  const params = useParams();
  const [job, setJob] = useState({});
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [auth, setAuth] = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (params?.slug) {
      getJob();
    }
  }, [params?.slug]);

  const getJob = async () => {
    try {
      const { data } = await axios.get(`/api/v1/job/get-job/${params.slug}`);
      setJob(data?.job);
      // getRelatedJobs(data?.job._id, data?.job.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      // Perform the delete action here
      await axios.delete(`/api/v1/job/delete-job/${job._id}`);
      console.log('Job deleted!');
      // You may want to redirect or update the UI after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    navigate(`/${auth.user?.userType}/job-Update/${params.slug}`);
  };
  

  { JSON.stringify(auth, null, 4) }
  // const getRelatedJobs = async (jobId, categoryId) => {
  //   try {
  //     const { data } = await axios.get(
  //       `/api/v1/job/related-jobs/${jobId}/${categoryId}`
  //     );
  //     setRelatedJobs(data?.jobs);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Layout>
      <div>
        <div className="row container">
          <div className="col-md-6">
          </div>
          <div className="job_details_headers">
            <div className="job_title"><h3>{job.jobTitle} </h3><span>{job.company}</span></div>
            <div className="Job__details">
              <h5><PiBagSimpleBold /> {job.experience}</h5>
              <h5> | <MdCurrencyRupee /> {job.salary}</h5>

            </div>
            <div className="Job__details">
              <h5> <IoLocationOutline /> {job.location}</h5>
              <h5>{job.employer}</h5>
            </div>
            {auth.user?.userType === 'employer' && job.employer === auth.user._id ? (<div className="apply_button"><button onClick={handleEdit}>Edit</button> <button onClick={() => setShowDeleteModal(true)} >Delete</button></div>) : (<div className="apply_button"><button>Save</button> <button>Apply</button></div>)}

          </div>
          <DeleteConfarmation
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            jobId={job._id}
            onConfirm={handleDelete}
            api={`/api/v1/job/delete-job/${job._id}`}
          />
          <div className="job_description">
            <div dangerouslySetInnerHTML={{ __html: job.description }} />
          </div>
        </div>
        <hr />
        <div className="row container">
          <h4>Similar Jobs ➡️</h4>
          {relatedJobs.length < 1 && (
            <p className="text-center">No Similar Jobs found</p>
          )}
          <div className="d-flex flex-wrap">
            {relatedJobs?.map((relatedJob) => (
              <div className="card m-2" key={relatedJob._id}>
                {/* Display related job details, e.g., jobTitle, location, etc. */}
                <div className="card-body">
                  <div className="card-name-location">
                    <h5 className="card-title">{relatedJob.jobTitle}</h5>
                    <h6 className="card-location">{relatedJob.location}</h6>
                  </div>
                  {/* Include other related job details as needed */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );

};

export default JobDetails;