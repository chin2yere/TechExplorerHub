import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext, ApiUrlContext } from "../../UserContext";
import { Link } from "react-router-dom";
import "./OpportunityCard.css";

export default function OpportunityCard({ description, location, id }) {
  const { userContext, setUserContext } = useContext(UserContext);
  const { apiUrlContext } = useContext(ApiUrlContext);
  //console.log(userContext);
  const [bookedmarkedJobs, setBookmarkedJobs] = useState({
    ...userContext.savedjobs,
  });

  function bookmarkButton() {
    const handleUpdateBookmarks = async (e) => {
      //e.preventDefault();

      try {
        const parsedObj = { ...bookedmarkedJobs };
        if (bookedmarkedJobs[id]) {
          parsedObj[id] = !parsedObj[id];

          setBookmarkedJobs(parsedObj);
        } else {
          parsedObj[id] = true;

          setBookmarkedJobs(parsedObj);
          // bookedmarkedJobs[id] = true;
        }
        // Make the create product API request

        const response = await fetch(
          `${apiUrlContext}/user/${userContext.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              githubId: userContext.githubid,
              username: userContext.username,
              avatarUrl: userContext.avatarurl,
              accessToken: userContext.accesstoken,
              savedJobs: parsedObj,
              Role: userContext.role,
              is_admin: userContext.is_admin,
            }),
            credentials: "include",
          }
        );

        if (response.ok) {
          const updateUserContext = { ...userContext };
          console.log(parsedObj);
          updateUserContext.savedjobs = { ...parsedObj };
          setUserContext(updateUserContext);
          console.log(updateUserContext);
          //localStorage.removeItem("userContext");
          // localStorage.setItem(
          //   "userContext",
          //   JSON.stringify(updateUserContext)
          // );

          //setUserContext(data);
        } else {
          // Handle the create failure case
          alert("creation failed");
        }
      } catch (error) {
        // Handle any network or API request errors
        alert("creation failed: " + error);
      }
    };

    if (bookedmarkedJobs[id] && bookedmarkedJobs[id] == true) {
      function toggleBookmarked() {
        const temporaryValue = { ...bookedmarkedJobs };
        temporaryValue[id] = false;
        setBookmarkedJobs({ ...temporaryValue });
      }
      return (
        <button
          onClick={() => {
            toggleBookmarked();
            handleUpdateBookmarks();
          }}
          className="button-opportunity-card-bookmarked"
        >
          bookmarked
        </button>
      );
    } else {
      function toggleBookmarked() {
        const temporaryValue = { ...bookedmarkedJobs };
        temporaryValue[id] = true;
        setBookmarkedJobs({ ...temporaryValue });
      }
      return (
        <button
          onClick={() => {
            toggleBookmarked();
            handleUpdateBookmarks();
          }}
          className="button-opportunity-card"
        >
          bookmark
        </button>
      );
    }
  }

  return (
    <div className="opportunity-card">
      <h3>{description}</h3>
      <p>{location}</p>
      <div>{bookmarkButton()}</div>
      <br />

      <div>
        <Link key={id} to={`/jobs/${id}`} state={{ jobId: id }}>
          <button className="button-opportunity-card">View details</button>
        </Link>
      </div>
    </div>
  );
}
