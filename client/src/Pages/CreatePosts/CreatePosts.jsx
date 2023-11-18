import React from "react";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext, ApiUrlContext } from "../../UserContext";
import "./CreatePosts.css";

export default function CreatePosts() {
  const { apiUrlContext } = useContext(ApiUrlContext);
  const navigate = useNavigate();
  const { userContext } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      // Make the create product API request

      const response = await fetch(`${apiUrlContext}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          githubId: userContext.githubid,
          title,
          body,
          likes: {},
          pending: true,
        }),
        credentials: "include",
      });
      console.log(response);

      if (response.ok) {
        // Navigate to the business page after successful login
        navigate("/posts");
      } else {
        // Handle the create failure case
        alert("creation failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("creation failed: " + error);
    }
  };
  return (
    <div className="create-posts">
      <Link to="/">
        <button>Go to Home</button>
      </Link>
      <h3>Create a post request below</h3>{" "}
      <p>
        Please note: It takes 2 business days for our admins to review your post
        and either approve/dissapprove it
      </p>
      <form onSubmit={handleCreate}>
        <div className="group-postForm">
          <label className="label-postForm" htmlFor="postname">
            <strong>Title:</strong>
          </label>
          <input
            className="inputs-postForm"
            type="text"
            id="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="group-postForm">
          <label className="label-postForm" htmlFor="description">
            <strong>Body:</strong>
          </label>
          <textarea
            className="description"
            type="text"
            id="description"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div className="group-postForm">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
