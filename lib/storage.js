/*
 *
 * In The Name of God
 *
 * +===============================================
 * | Author:        Parham Alvani <parham.alvani@gmail.com>
 * |
 * | Creation Date: 08-11-2018
 * |
 * | File Name:     storage.js
 * +===============================================
 */

const { Client } = require('pg')

/**
 * Storage handles PostGIS communication to store and retrieve GeoSpatial data
 */
class Storage {
  constructor () {
    // clients will also use environment variables
    // for connection information
    this.client = new Client()
  }

  async connect () {
    await this.client.connect()
  }

  async disconnect () {
    await this.client.end()
  }
}

export default Storage
