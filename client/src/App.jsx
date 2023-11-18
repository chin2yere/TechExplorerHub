import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContext, JobsContext, ApiUrlContext } from "./UserContext";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Posts from "./Pages/Posts/Posts";
import CreatePosts from "./Pages/CreatePosts/CreatePosts";
import Opportunities from "./Pages/Opportunities/Opportunities";
import JobDetails from "./Pages/JobDetails/JobDetails";
import Bookmarks from "./Pages/Bookmarks/Bookmarks";
import JobForm from "./Pages/JobForm/JobForm";
import Admin from "./Pages/Admin/Admin";
function App() {
  const apiUrlContext =
    process.env.NODE_ENV === "production"
      ? "https://techexplorerhub-server.up.railway.app"
      : "http://localhost:3000";
  const [jobsContext, setJobsContext] = useState(() => {
    try {
      // Retrieve the user data from storage or set it to null if not found
      const storedJobs = localStorage.getItem("jobsContext");
      return storedJobs ? JSON.parse(storedJobs) : null;
    } catch (error) {
      console.error("Error parsing storedjobs:", error);
      return null;
    }
  });
  const [userContext, setUserContext] = useState(() => {
    try {
      // Retrieve the user data from storage or set it to null if not found
      const storedUser = localStorage.getItem("userContext");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  });

  useEffect(() => {
    // Save the user data to storage whenever the user state changes
    if (userContext) {
      localStorage.setItem("userContext", JSON.stringify(userContext));
    } else {
      localStorage.removeItem("userContext");
    }
    if (jobsContext) {
      localStorage.setItem("jobsContext", JSON.stringify(jobsContext));
    } else {
      localStorage.removeItem("jobsContext");
    }
  }, [userContext, jobsContext]);

  return (
    <div className="app">
      <UserContext.Provider value={{ userContext, setUserContext }}>
        <JobsContext.Provider value={{ jobsContext, setJobsContext }}>
          <ApiUrlContext.Provider value={{ apiUrlContext }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={userContext ? <Home /> : <Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/create" element={<CreatePosts />} />
                <Route path="/jobs" element={<Opportunities />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/jobs/create" element={<JobForm />} />
                <Route
                  path="/admin"
                  element={
                    userContext && userContext.is_admin == true ? (
                      <Admin />
                    ) : (
                      <Home />
                    )
                  }
                />
              </Routes>
            </BrowserRouter>
          </ApiUrlContext.Provider>
        </JobsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
