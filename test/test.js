/*
 *
 * In The Name of God
 *
 * +===============================================
 * | Author:        Parham Alvani <parham.alvani@gmail.com>
 * |
 * | Creation Date: 06-11-2018
 * |
 * | File Name:     test.js
 * +===============================================
 */
/* eslint-env mocha */

const assert = require('assert')
const fs = require('fs')
const GeoTIFF = require('geotiff')
const Storage = require('../lib/storage')

require('dotenv').config()

describe('Joveyn', function () {
  // readTIFF reads a tiff image from a given path then parse its meta data.
  // This function is just for testing
  // the basic features of geotiff.js.
  // We use joveyn as our refrence point.
  const lat = 36.65449
  const lng = 57.41716
  const result = 4.337339878082275
  const path = './sample/joveyn.tif'

  it('Neghab Railway Station', async () => {
    const arrayBuffer = fs.readFileSync(path).buffer
    const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer)
    const image = await tiff.getImage() // by default, the first image is read.

    // number of pixels
    const width = image.getWidth()
    const height = image.getHeight()

    // the number of samples per pixel
    assert.ok(image.getSamplesPerPixel() === 1)

    // gets origin and resolution of the image
    // based on these it computes center of each pixel geo coordinations
    const [oX, oY] = image.getOrigin()
    const [rX, rY] = image.getResolution()

    const [ data ] = await image.readRasters()
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixel = y * width + x
        const bboxX = oX + rX * x
        const bboxY = oY + rY * y
        if (Math.min(bboxX, bboxX + rX) <= lng && lng <= Math.max(bboxX, bboxX + rX)) {
          if (Math.min(bboxY, bboxY + rY) <= lat && lat <= Math.max(bboxY, bboxY + rY)) {
            assert.ok(data[pixel] === result)
          }
        }
      }
    }
  })
})

describe('Storage', function () {
  it('I1820', async () => {
    const value = 1.33
    const lat = 35.8066282
    const lng = 51.3989276
    const date = '07-Sep-2016'

    const storage = new Storage()
    await storage.connect()
    await storage.insert(value, lat, lng, date)
    const res = await storage.fetch(35.807715, 51.398652)
    console.table(res)
    await storage.disconnect()
  })
})
