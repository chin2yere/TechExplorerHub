import React from "react";
import { useState, useEffect, useContext } from "react";
import { ApiUrlContext } from "../../UserContext";
import { useLocation, Link } from "react-router-dom";
import "./JobDetails.css";

export default function JobDetails() {
  const [job, setJob] = useState({});
  const { apiUrlContext } = useContext(ApiUrlContext);
  const location = useLocation();
  const data = location.state; // Access the passed props
  const jobId = data.jobId;
  console.log(job);

  useEffect(() => {
    const handleFetchJob = async () => {
      try {
        const url = `${apiUrlContext}/job/${"id"}/${jobId}`;
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);
        setJob(data);
        //navigate("/");
      } catch (error) {
        // Handle any network or API request errors
        alert("Login failed: " + error);
      }
    };
    handleFetchJob();
  }, []);
  return (
    <div className="row-details">
      <div className="col-details">
        <img
          className="image-details"
          src="https://usa.bootcampcdn.com/wp-content/uploads/sites/108/2022/03/TES-computer-science-careers.jpg"
          alt=""
        />
      </div>
      <div className="col-details">
        <p>
          <b>{job.description}</b>
          <br />
          <b>Location</b>:&nbsp;
          {job.location}
          <br />
          <b>PayRange</b>:&nbsp;
          {job.payrange}
          <br />
          <b>Category</b>:&nbsp;
          {job.category}
          <br />
          <b>Type:</b>&nbsp;
          {job.type}
          <br />
          <b>Role</b>:&nbsp;
          {job.role}
          <br />
          <b>
            <a href={job.urlredirection}>Click here to apply on job board</a>
          </b>
        </p>
        <Link to="/jobs">
          <button>Go to Jobs</button>
        </Link>
      </div>
    </div>
  );
}
