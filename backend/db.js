const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   password: "#Sara271022@",
//   host: "localhost",
//   port: 5432,
//   database: "EmployeeDetails"
// });
const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: "postgres://default:h1oP9QjExeCV@ep-raspy-wildflower-a4rotoho-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
})

module.exports = pool;