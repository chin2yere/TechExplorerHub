import * as React from "react";
import "./JobForm.css";
import { useState, useContext, useEffect } from "react";
import { ApiUrlContext } from "../../UserContext";
import { Link, useNavigate } from "react-router-dom";
//import { UserContext, IdContext } from "../../UserContext";
//this page basically collects information that is needed to make a network call to create a new job
export default function JobForm() {
  const { apiUrlContext } = useContext(ApiUrlContext);
  const [Category, setCategory] = useState("");
  const [Company_ID, setCompany_ID] = useState("");
  const [Type, setType] = useState("");
  const [Description, setDescription] = useState("");
  const [Role, setRole] = useState("");
  const [Location, setLocation] = useState("");
  const [Remote, setRemote] = useState(false);
  const [PayRange, setPayRange] = useState("");
  const [URLRedirection, setURLRedirection] = useState("");

  //const { idContext } = useContext(IdContext);
  const navigate = useNavigate();

  //this useeffect saved the id context to memory

  //this function sets the service to true or false on select
  function remoteSetter(value) {
    if (value === "Yes") {
      setRemote(true);
    } else {
      setRemote(false);
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      // Make the create product API request

      const response = await fetch(`${apiUrlContext}/job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Company_ID,
          Type,
          Category,
          Description,
          Role,
          Location,
          Remote,
          PayRange,
          URLRedirection,
        }),
        credentials: "include",
      });

      if (response.ok) {
        // Navigate to the business page after successful login
        navigate("/jobs");
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
    <section className="postsForm">
      <form onSubmit={handleCreate}>
        <h2>Create a job posting </h2>
        <div className="group-postForm">
          <label className="label-postForm" htmlFor="username">
            <strong>Description:</strong>
          </label>
          <textarea
            className="description"
            type="text"
            id="name"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="group-postForm">
          <label className="label-postForm" htmlFor="description">
            <strong>Location:</strong>
          </label>
          <textarea
            className="inputs-postForm"
            type="text"
            id="location"
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="group-postForm">
          <label className="label-postForm" htmlFor="price">
            <strong>Role:</strong>
          </label>
          <textarea
            className="description"
            type="text"
            id="price"
            value={Role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <div className="group-postForm">
          <label className="label-postForm" htmlFor="quantity">
            <strong>Url redirection :</strong>
          </label>
          <input
            className="inputs-postForm"
            type="text"
            id="quantity"
            value={URLRedirection}
            onChange={(e) => setURLRedirection(e.target.value)}
            required
          />
        </div>
        <div className="group-postForm">
          <label className="label-postForm" htmlFor="dropdownCategory">
            <strong>Category:</strong>
          </label>
          <select
            className="inputs-productForm"
            id="dropdownCategory"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Select a category --</option>
            <option value="Newgrad">Newgrad</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="group-postForm">
          <label className="label-postForm" htmlFor="dropdownCategory">
            <strong>Type:</strong>
          </label>
          <select
            className="inputs-postForm"
            id="dropdownCategory"
            value={Type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">-- Select a Type --</option>
            <option value="Job">Job</option>
            <option value="Conference">Conference</option>
          </select>
        </div>
        <div className="group-postForm">
          <label className="label-postForm" htmlFor="dropdownCategory">
            <strong>Pay Range:</strong>
          </label>
          <select
            className="inputs-postForm"
            id="dropdownCategory"
            value={PayRange}
            onChange={(e) => setPayRange(e.target.value)}
          >
            <option value="">-- Select a Range --</option>

            <option value="0K-50K">0K-50K</option>
            <option value="50K-100K">50K-100K</option>
            <option value="100K-150K">100K-150K</option>
            <option value="150K-200K">150K-200K</option>
            <option value="200K-250K">200K-250K</option>
            <option value="250K-300K">250K-300K</option>
          </select>
        </div>
        <div className="group-postForm">
          <label className="label-postForm" htmlFor="dropdownCategory">
            <strong>Partner company:</strong>
          </label>
          <select
            className="inputs-postForm"
            id="dropdownCategory"
            value={Company_ID}
            onChange={(e) => setCompany_ID(e.target.value)}
          >
            <option value="">-- Select a partner Company --</option>

            <option value="2">Apple Inc.</option>
            <option value="9">Google</option>
            <option value="3">Amazon</option>
            <option value="4">Microsoft</option>
            <option value="10">Facebook</option>
            <option value="6">Tesla</option>
            <option value="7">Netflix</option>
            <option value="8">Twitter</option>
          </select>
        </div>
        <div className="group-postForm">
          <label className="label-postForm" htmlFor="dropdownService">
            <strong>Remote?:</strong>
          </label>
          <select
            className="inputs-postForm"
            id="dropdownService"
            value={Remote}
            onChange={(e) => remoteSetter(e.target.value)}
          >
            <option value="">-- Select a true or false --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <button className="button-postForm" type="submit">
          Create Job
        </button>
        &nbsp;&nbsp;
      </form>
      <br />
      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </section>
  );
}
