import pool from "./database.js";
import GitHubStrategy from "passport-github2";

const options = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  //callbackURL: 'http://localhost:3001/auth/github/callback'
};

const verify = async (accessToken, refreshToken, profile, callback) => {
  const {
    _json: { id, login, avatar_url },
  } = profile;

  const userData = {
    githubId: id,
    username: login,
    avatarUrl: avatar_url,
    accessToken: login,
    savedJobs: {},
    Role: "Student",
    is_admin: false,
  };

  try {
    const results = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [userData.username]
    );
    const user = results.rows[0];

    if (!user) {
      const results = await pool.query(
        `INSERT INTO users (githubId, username, avatarUrl, accessToken, savedJobs, Role, is_admin)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
          userData.githubId,
          userData.username,
          userData.avatarUrl,
          accessToken,
          userData.savedJobs,
          userData.Role,
          userData.is_admin,
        ]
      );

      const newUser = results.rows[0];
      return callback(null, newUser);
    }

    return callback(null, user);
  } catch (error) {
    return callback(error);
  }
};

export const GitHub = new GitHubStrategy(options, verify);
//export default router
