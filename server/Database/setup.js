import pool from "../config/database.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userdata = fs.readFileSync(path.resolve(__dirname, "users.json"), "utf8");
const companydata = fs.readFileSync(
  path.resolve(__dirname, "company.json"),
  "utf8"
);
const postdata = fs.readFileSync(path.resolve(__dirname, "post.json"), "utf8");
const jobsdata = fs.readFileSync(path.resolve(__dirname, "jobs.json"), "utf8");
const createUsersTable = async () => {
  try {
    const createTableQuery = `
      DROP TABLE IF EXISTS users;
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        githubId VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        avatarUrl VARCHAR(255) NOT NULL,
        accessToken VARCHAR(255) NOT NULL,
        savedJobs JSON NOT NULL,
        Role VARCHAR(255) NOT NULL,
        is_admin BOOLEAN NOT NULL
      )
    `;
    await pool.query(createTableQuery);
  } catch (error) {
    console.log(error);
  }
};

const insertUsers = async () => {
  try {
    const insertQuery = `
      INSERT INTO users ( githubId, username, avatarUrl, accessToken, savedJobs, Role, is_admin)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const users = JSON.parse(userdata);

    for (let user of users) {
      const values = [
        user.githubId,
        user.username,
        user.avatarUrl,
        user.accessToken,
        user.savedJobs,
        user.Role,
        user.is_admin,
      ];

      await pool.query(insertQuery, values);
      console.log(`✅ added ${user.username}`);
    }
  } catch (error) {
    console.log(error);
  }
};
//create company table
const createCompanyTable = async () => {
  try {
    const createTableQuery = `
      DROP TABLE IF EXISTS company;
      CREATE TABLE IF NOT EXISTS company (
        id SERIAL PRIMARY KEY,
        githubId VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        picture_url VARCHAR(255) NOT NULL
        )
    `;
    await pool.query(createTableQuery);
  } catch (error) {
    console.log(error);
  }
};

const insertCompany = async () => {
  try {
    const insertQuery = `
      INSERT INTO company ( githubId, name, description, picture_url)
      VALUES ($1, $2, $3, $4)
    `;

    const companys = JSON.parse(companydata);

    for (let company of companys) {
      const values = [
        company.githubId,
        company.name,
        company.description,
        company.picture_url,
      ];

      await pool.query(insertQuery, values);
      console.log(`✅ added ${company.name}`);
    }
  } catch (error) {
    console.log(error);
  }
};
//posts
const createPostsTable = async () => {
  try {
    const createTableQuery = `
      DROP TABLE IF EXISTS post;
      CREATE TABLE IF NOT EXISTS post (
        id SERIAL PRIMARY KEY,
        githubId VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        body TEXT NOT NULL,
        likes JSON NOT NULL,
        pending BOOLEAN NOT NULL
      )
    `;
    await pool.query(createTableQuery);
  } catch (error) {
    console.log(error);
  }
};

const insertPosts = async () => {
  try {
    const insertQuery = `
      INSERT INTO post ( githubId, title, body, likes, pending)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const posts = JSON.parse(postdata);

    for (let post of posts) {
      const values = [
        post.githubId,
        post.title,
        post.body,
        post.likes,
        post.pending,
      ];

      await pool.query(insertQuery, values);
      console.log(`✅ added ${post.title}`);
    }
  } catch (error) {
    console.log(error);
  }
};
//jobs
const createJobsTable = async () => {
  try {
    const createTableQuery = `
      DROP TABLE IF EXISTS jobs;
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        Company_ID VARCHAR(255) NOT NULL,
        Type VARCHAR(255) NOT NULL,
        Category VARCHAR(255) NOT NULL,
        Description VARCHAR(255) NOT NULL,
        Role TEXT NOT NULL,
        Location VARCHAR(255) NOT NULL,
        Remote BOOLEAN NOT NULL,
        PayRange VARCHAR(255) NOT NULL,
        URLRedirection VARCHAR(255) NOT NULL
        )
    `;
    await pool.query(createTableQuery);
  } catch (error) {
    console.log(error);
  }
};

const insertJobs = async () => {
  try {
    const insertQuery = `
      INSERT INTO jobs (Company_ID, Type, Category, Description, Role, Location, Remote, PayRange, URLRedirection )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    const jobs = JSON.parse(jobsdata);

    for (let job of jobs) {
      const values = [
        job.Company_ID,
        job.Type,
        job.Category,
        job.Description,
        job.Role,
        job.Location,
        job.Remote,
        job.PayRange,
        job.URLRedirection,
      ];

      await pool.query(insertQuery, values);
      console.log(`✅ added ${job.PayRange}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const setup = async () => {
  //await dropAllTables()
  await createUsersTable();
  await insertUsers();
  await createCompanyTable();
  await insertCompany();
  await createPostsTable();
  await insertPosts();
  await createJobsTable();
  await insertJobs();
};

export default setup;
