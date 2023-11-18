import React from "react";
import "./PostCard.css";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { UserContext, ApiUrlContext } from "../../UserContext";
import { useEffect, useState, useContext } from "react";

export default function PostCard({
  title,
  body,
  likes,
  id,
  githubId,
  pending,
}) {
  const { userContext } = useContext(UserContext);
  const { apiUrlContext } = useContext(ApiUrlContext);
  const userId = userContext.id;
  const [liked, setLiked] = useState(() => {
    if (likes[userId] && likes[userId] === true) {
      return true;
    } else {
      return false;
    }
  });
  //console.log(githubId);
  function toggleLike() {
    setLiked(!liked);
  }
  function likedButton() {
    if (liked) {
      return <FcLike />;
    } else {
      return <FcLikePlaceholder />;
    }
  }

  const handleUpdatePosts = async (e) => {
    //e.preventDefault();

    try {
      if (likes[userContext.id]) {
        likes[userContext.id] = !likes[userContext.id];
      } else {
        likes[userContext.id] = true;
      }
      // Make the create product API request

      const response = await fetch(`${apiUrlContext}/post/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          githubId,
          title,
          body,
          likes,
          pending,
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

  function handleClickLike() {
    toggleLike();
    handleUpdatePosts();
  }
  //useEffect(() => {}, []);
  return (
    <div className="post-card">
      <h3>{title}</h3>
      <p>{body}</p>
      <button onClick={handleClickLike}>{likedButton()}</button>
    </div>
  );
}
