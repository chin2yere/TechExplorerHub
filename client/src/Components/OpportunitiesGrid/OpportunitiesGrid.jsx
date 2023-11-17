import React from "react";
import { JobsContext } from "../../UserContext";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import OpportunityCard from "../OpportunityCard/OpportunityCard";
import "./OpportunitiesGrid.css";

export default function OpportunitiesGrid({ tab, filter }) {
  const { setJobsContext } = useContext(JobsContext);
  const [allJobs, setAllJobs] = useState([]);
  const [parsedJobs, setParsedJobs] = useState([]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const url = `http://localhost:3000/jobs`;
        const response = await fetch(url);
        const data = await response.json();

        setJobsContext(data);

        setAllJobs(data);
        setParsedJobs(data);
      } catch (error) {
        // Handle any network or API request errors
        alert("fetch failed: " + error);
      }
    };
    fetchOpportunities();
  }, []);
  function whatToParse() {
    if (tab == "none" || filter == "none") {
      return allJobs;
    } else if (tab == "Type") {
      const newJobs = allJobs.filter((job) => {
        if (job.type.toLowerCase() == filter.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      });
      return newJobs;
    } else if (tab == "Category") {
      const newJobs = allJobs.filter((job) => {
        if (job.category.toLowerCase() == filter.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      });
      return newJobs;
    } else if (tab == "Remote") {
      const newJobs = allJobs.filter((job) => {
        if (job.remote && filter == "Yes") {
          return true;
        } else if (!job.remote && filter == "No") {
          return true;
        } else {
          return false;
        }
      });
      return newJobs;
    } else if (tab == "PayRange") {
      const newJobs = allJobs.filter((job) => {
        if (job.payrange.toLowerCase() == filter.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      });
      return newJobs;
    }
  }
  return (
    <div className="opportunities-grid">
      <div>
        <Link to="/">
          <button className="buttons-opportunity-grid">Home</button>
        </Link>
        <Link to="/bookmarks">
          <button className="buttons-opportunity-grid">
            View Bookmarked jobs
          </button>
        </Link>
      </div>
      {whatToParse().map((job) => (
        <OpportunityCard
          key={job.id}
          description={job.description}
          location={job.location}
          id={job.id}
        />
      ))}
    </div>
  );
}
