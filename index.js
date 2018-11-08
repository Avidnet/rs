/*
 *
 * In The Name of God
 *
 * +===============================================
 * | Author:        Parham Alvani <parham.alvani@gmail.com>
 * |
 * | Creation Date: 06-11-2018
 * |
 * | File Name:     index.js
 * +===============================================
 */

require('dotenv').config()

const fs = require('fs')

// where the geotiff files are stored.
const UPLOAD_PATH = 'upload'

// make upload folder if it doesn't exist.
if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH)
}
