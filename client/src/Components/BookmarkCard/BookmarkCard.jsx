import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import "./BookmarkCard.css";

export default function BookmarkCard({ description, location, id }) {
  const { userContext, setUserContext } = useContext(UserContext);
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
          `http://localhost:3000/user/${userContext.id}`,
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
          updateUserContext.savedjobs = { ...parsedObj };
          setUserContext(updateUserContext);

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
        click to Unbookmark
      </button>
    );
  }

  return (
    <div className="bookmark-card">
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
