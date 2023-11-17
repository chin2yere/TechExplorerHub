import users_sequelize from "../models/users_sequelize.js";
import post_sequelize from "../models/post_sequelize.js";
import company_sequelize from "../models/company_sequelize.js";
import jobs_sequelize from "../models/jobs_sequelize.js";

// get all video games from the database
const getUsers = async (req, res) => {
  try {
    const results = await users_sequelize.findAll();
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsersByConstraint = async (req, res) => {
  try {
    const constraint = req.params.constraint;
    const value = req.params.value;
    const results = await users_sequelize.findAllByConstraint(
      constraint,
      parseInt(value)
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get video games by ID from the database
const getUserByConstraint = async (req, res) => {
  try {
    const constraint = req.params.constraint;
    const value = req.params.value;
    //console.log(constraint, value);
    const results = await users_sequelize.findOne(constraint, parseInt(value));
    console.log(results.rows);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create new blog post
const createUser = async (req, res) => {
  try {
    const {
      githubId,
      username,
      avatarUrl,
      accessToken,
      savedJobs,
      Role,
      is_admin,
    } = req.body;
    const results = await users_sequelize.create(
      githubId,
      username,
      avatarUrl,
      accessToken,
      savedJobs,
      Role,
      is_admin
    );
    res.status(201).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update existing blog post
const updateUser = async (req, res) => {
  //console.log(req.body);
  try {
    const {
      githubId,
      username,
      avatarUrl,
      accessToken,
      savedJobs,
      Role,
      is_admin,
    } = req.body;
    const results = await users_sequelize.update(
      req.params.id,
      githubId,
      username,
      avatarUrl,
      accessToken,
      savedJobs,
      Role,
      is_admin
    );
    //console.log(results);
    res.status(201).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete existing blog post
const deleteUser = async (req, res) => {
  try {
    const { constraint, value } = req.body;
    const results = await users_sequelize.deleteUser(constraint, value);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//now for company

const getCompanys = async (req, res) => {
  try {
    const results = await company_sequelize.findAll();
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCompanysByConstraint = async (req, res) => {
  try {
    const constraint = req.params.constraint;
    const value = req.params.value;
    const results = await company_sequelize.findAllByConstraint(
      constraint,
      value
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get video games by ID from the database
const getCompanyByConstraint = async (req, res) => {
  try {
    const constraint = req.params.constraint;
    const value = req.params.value;
    const results = await company_sequelize.findOne(constraint, value);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create new blog post
const createCompany = async (req, res) => {
  try {
    const { githubId, name, description, picture_url } = req.body;
    const results = await company_sequelize.create(
      githubId,
      name,
      description,
      picture_url
    );
    res.status(201).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update existing blog post
const updateCompany = async (req, res) => {
  try {
    const { githubId, name, description, picture_url } = req.body;
    const results = await company_sequelize.update(
      req.params.id,
      githubId,
      name,
      description,
      picture_url
    );
    res.status(201).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete existing blog post
const deleteCompany = async (req, res) => {
  try {
    const { constraint, value } = req.body;
    const results = await company_sequelize.deleteCompany(constraint, value);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// now for posts

const getPosts = async (req, res) => {
  try {
    const results = await post_sequelize.findAll();
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPostsByConstraint = async (req, res) => {
  try {
    const constraint = req.params.constraint;
    const value = req.params.value;
    const results = await post_sequelize.findAllByConstraint(constraint, value);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get video games by ID from the database
const getPostByConstraint = async (req, res) => {
  try {
    const constraint = req.params.constraint;
    const value = req.params.value;
    const results = await post_sequelize.findOne(constraint, value);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create new blog post
const createPost = async (req, res) => {
  try {
    const { githubId, title, body, likes, pending } = req.body;
    console.log(req.body);
    const results = await post_sequelize.create(
      githubId,
      title,
      body,
      likes,
      pending
    );
    res.status(201).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update existing blog post
const updatePost = async (req, res) => {
  try {
    const { githubId, title, body, likes, pending } = req.body;
    //console.log(req.body);
    const results = await post_sequelize.update(
      req.params.id,
      githubId,
      title,
      body,
      likes,
      pending
    );
    res.status(201).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete existing blog post
const deletePost = async (req, res) => {
  try {
    const { constraint, value } = req.body;
    const results = await post_sequelize.deletePost(constraint, value);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//everything jobs
const getJobs = async (req, res) => {
  try {
    const results = await jobs_sequelize.findAll();
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getJobsByConstraint = async (req, res) => {
  try {
    const constraint = req.params.constraint;
    const value = req.params.value;
    const results = await jobs_sequelize.findAllByConstraint(constraint, value);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get video games by ID from the database
const getJobByConstraint = async (req, res) => {
  try {
    const constraint = req.params.constraint;
    const value = req.params.value;
    //console.log(req.body);
    const results = await jobs_sequelize.findOne(constraint, parseInt(value));
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create new blog post
const createJob = async (req, res) => {
  try {
    const {
      Company_ID,
      Type,
      Category,
      Description,
      Role,
      Location,
      Remote,
      PayRange,
      URLRedirection,
    } = req.body;
    console.log(req.body);
    const results = await jobs_sequelize.create(
      Company_ID,
      Type,
      Category,
      Description,
      Role,
      Location,
      Remote,
      PayRange,
      URLRedirection
    );
    res.status(201).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update existing blog post
const updateJob = async (req, res) => {
  try {
    const {
      Company_ID,
      Type,
      Category,
      Description,
      Role,
      Location,
      Remote,
      PayRange,
      URLRedirection,
    } = req.body;
    //console.log(req.body);
    const results = await jobs_sequelize.update(
      req.params.id,
      Company_ID,
      Type,
      Category,
      Description,
      Role,
      Location,
      Remote,
      PayRange,
      URLRedirection
    );
    res.status(201).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete existing blog post
const deleteJob = async (req, res) => {
  try {
    const { constraint, value } = req.body;
    const results = await jobs_sequelize.deleteJobs(constraint, value);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  getUsers,
  getUsersByConstraint,
  getUserByConstraint,
  createUser,
  updateUser,
  deleteUser,
  getCompanys,
  getCompanysByConstraint,
  getCompanyByConstraint,
  createCompany,
  updateCompany,
  deleteCompany,
  getPosts,
  getPostsByConstraint,
  getPostByConstraint,
  createPost,
  updatePost,
  deletePost,
  getJobs,
  getJobsByConstraint,
  getJobByConstraint,
  createJob,
  updateJob,
  deleteJob,
};
