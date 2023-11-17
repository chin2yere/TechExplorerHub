import pool from "../config/database.js";

const findAll = () => {
  const query = "SELECT * FROM jobs ORDER BY id ASC";
  return pool.query(query);
};

const findAllByConstraint = (constraint, value) => {
  if (value) {
    const query = `SELECT * FROM jobs WHERE ${constraint} = $1 ORDER BY id ASC`;
    return pool.query(query, [value]);
  }
};

const findOne = (constraint, value) => {
  const query = `SELECT * FROM jobs WHERE ${constraint} = $1`;
  return pool.query(query, [value]);
};

const create = (
  Company_ID,
  Type,
  Category,
  Description,
  Role,
  Location,
  Remote,
  PayRange,
  URLRedirection
) => {
  const query =
    "INSERT INTO jobs (Company_ID, Type, Category, Description, Role, Location, Remote, PayRange, URLRedirection) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
  return pool.query(query, [
    Company_ID,
    Type,
    Category,
    Description,
    Role,
    Location,
    Remote,
    PayRange,
    URLRedirection,
  ]);
};

const update = (
  id,
  Company_ID,
  Type,
  Category,
  Description,
  Role,
  Location,
  Remote,
  PayRange,
  URLRedirection
) => {
  const query =
    "UPDATE jobs SET Company_ID = $2, Type = $3, Category = $4, Description = $5, Role = $6, Location = $7, Remote = $8, URLRedirection = $9 WHERE id = $1";
  return pool.query(query, [
    id,
    Company_ID,
    Type,
    Category,
    Description,
    Role,
    Location,
    Remote,
    PayRange,
    URLRedirection,
  ]);
};

const deleteJobs = (constraint, value) => {
  const query = `DELETE FROM jobs WHERE ${constraint} = $1`;
  return pool.query(query, [value]);
};
export default {
  findAll,
  findAllByConstraint,
  findOne,
  create,
  update,
  deleteJobs,
};
