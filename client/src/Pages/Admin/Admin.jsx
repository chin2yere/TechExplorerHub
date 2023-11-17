import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "./Admin.css";
import AdminCards from "../../Components/AdminCards/AdminCards";
export default function Admin() {
  const navigate = useNavigate();
  const { setUserContext } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `http://localhost:3000/posts`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        // console.log(userContext);
        setPosts(data);
        // setParsedPosts(data);
      } catch (error) {
        // Handle any network or API request errors
        alert("Login failed: " + error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          setUserContext(null);
          navigate("/");
        }}
      >
        Logout
      </button>
      {posts.map((post) => (
        <AdminCards
          key={post.id}
          title={post.title}
          body={post.body}
          githubid={post.githubid}
          likes={post.likes}
          pending={post.pending}
          id={post.id}
        />
      ))}
    </div>
  );
}
