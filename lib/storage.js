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

  /**
   * insert stores given data into PostGIS. value is a double precision number.
   * lat and lng are geo location of the value. date specifies a date the image has been taken.
   * value: 1.33
   * lat:35.8066282
   * lng: 51.3989276
   * date: 07-Sep-2016
  */
  async insert (value, lat, lng, date) {
    const query = `INSERT INTO points(value, date, location) VALUES($1, $2, $3) RETURNING *`
    const res = await this.client.query(query, [value, date, `SRID=4326;POINT(${lat} ${lng})`])
    return res
  }

  /**
   * fetch retrieves value for given location with given precision that 100m is its default.
   */
  async fetch (lat, lng, precision) {
    if (!precision) {
      precision = 100
    }

    const query = `SELECT * FROM points WHERE ST_DWithin(location, 'SRID=4326;POINT(${lat} ${lng})'::geography, ${precision})`
    const res = await this.client.query(query)
    return res.rows
  }

  async disconnect () {
    await this.client.end()
  }
}

module.exports = Storage
