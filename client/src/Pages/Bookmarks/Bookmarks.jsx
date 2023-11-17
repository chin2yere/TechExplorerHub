import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext, JobsContext } from "../../UserContext";

import "./Bookmarks.css";
import BookmarkCard from "../../Components/BookmarkCard/BookmarkCard";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const { jobsContext } = useContext(JobsContext);
  const { userContext } = useContext(UserContext);
  console.log(userContext);
  console.log(jobsContext);
  useEffect(() => {
    const savedJobs = { ...userContext.savedjobs };
    const newJobs = jobsContext.filter((job) => {
      const value = job["id"];
      //console.log(savedJobs[value]);
      if (savedJobs[value] && savedJobs[value] === true) {
        return true;
      } else {
        return false;
      }
    });
    setBookmarks(newJobs);
    //console.log(newJobs);
  }, [userContext]);
  return (
    <div className="bookmarks">
      <h1>My Bookmarks</h1>
      <Link to="/">
        <button className="buttons-opportunity-grid">Go to Home</button>
      </Link>
      <Link to="/jobs">
        <button className="buttons-opportunity-grid">Go to jobs</button>
      </Link>
      {bookmarks.map((job) => (
        <BookmarkCard
          key={job.id}
          description={job.description}
          location={job.location}
          id={job.id}
        />
      ))}
    </div>
  );
}
