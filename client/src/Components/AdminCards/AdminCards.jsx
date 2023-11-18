import React from "react";
import { useState, useEffect } from "react";
import { ApiUrlContext } from "../../UserContext";
import "./AdminCards.css";
export default function AdminCards({
  title,
  body,
  githubid,
  likes,
  pending,
  id,
}) {
  const { apiUrlContext } = useContext(ApiUrlContext);
  const [falsePending, setFalsePending] = useState(pending);
  function toggleApproval() {
    setFalsePending(!falsePending);
  }
  const handleUpdatePosts = async (e) => {
    //e.preventDefault();

    // Make the create product API request
    try {
      const response = await fetch(`${apiUrlContext}/post/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          githubId: githubid,
          title,
          body,
          likes,
          pending: !falsePending,
        }),
        credentials: "include",
      });

      if (response.ok) {
        console.log(response);
      } else {
        // Handle the create failure case
        alert("creation failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("creation failed: " + error);
    }
  };
  function approveButton() {
    //let temp = falsePending;

    if (falsePending == true) {
      return (
        <button
          className="button-opportunity-card"
          onClick={() => {
            toggleApproval();
            handleUpdatePosts();
          }}
        >
          Approve
        </button>
      );
    } else {
      return (
        <button
          className="button-opportunity-card-bookmarked"
          onClick={() => {
            toggleApproval();
            handleUpdatePosts();
          }}
        >
          Remove approval
        </button>
      );
    }
  }

  return (
    <div className="bookmark-card">
      <h2>{title}</h2>
      <p>{body}</p>
      <div>{approveButton()}</div>
    </div>
  );
}
