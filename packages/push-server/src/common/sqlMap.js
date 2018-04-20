module.exports = {
  GET_USER_BY_BEARER_TOKEN: `
  SELECT t2.*, t1.token
  FROM user_token t1
  INNER JOIN user t2 ON t1.userId = t2.id
  WHERE t1.token = :token AND t1.status = :status AND  t1.expiresDate > :expiresDate
  LIMIT 1
  `
};
