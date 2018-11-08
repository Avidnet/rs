/*
 *
 * In The Name of God
 *
 * +===============================================
 * | Author:        Parham Alvani <parham.alvani@gmail.com>
 * |
 * | Creation Date: 08-11-2018
 * |
 * | File Name:     query.js
 * +===============================================
 */
/**
 * query.js build database table if they doesn't exist.
 * This file doesn't use any of the other files of this project and runs as a standalone file.
 * node query.js
 */

require('dotenv').config()
const { Client } = require('pg')

async function createTables () {
  // clients will also use environment variables
  // for connection information
  const client = new Client()

  console.log('Waiting for PG connection')
  await client.connect()

  console.log('Waiting for create table query')
  const res = await client.query(`
  CREATE TABLE IF NOT EXISTS points (
    id SERIAL PRIMARY KEY,
    value DOUBLE PRECISION,
    location GEOGRAPHY(POINT)
  );
  `)
  console.log(res)

  await client.end()
}

createTables()
