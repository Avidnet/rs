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
const ImageHandler = require('../lib/image')

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

  it('Neghab Railway Station', async (done) => {
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
    done()
  })
})

describe('Storage', function () {
  it('I1820 Location', async (done) => {
    const value = 1.33
    const lat = 35.8066282 // I1820 location latitude
    const lng = 51.3989276 // I1820 location longitude
    const date = '07-Sep-2016'

    const storage = new Storage()

    await storage.connect()

    await storage.insert(value, lat, lng, date)

    const res = await storage.fetch(35.807715, 51.398652) // a point within the 10m range of I1820
    console.table(res)
    assert.ok(res[0].value === value)

    await storage.disconnect()
    done()
  })
})

describe('Image Handler', function () {
  it('Joveyn - Neghab Railway Station', async (done) => {
    const storage = new Storage()
    const ih = new ImageHandler()

    const path = './sample/joveyn.tif'
    const date = '07-Sep-2016'

    await storage.connect()

    const values = await ih.extract(path)

    for (const value of values) {
      if (value.value > 0) { // values lower than equal 0 is not valid in rs context so ignores them
        await storage.insert(value.value, value.latitude, value.longitude, date)
      }
    }

    // check the value of the lanform near the neghab railway station
    const lat = 36.65449
    const lng = 57.41716
    const result = 4.337339878082275

    const res = await storage.fetch(lat, lng, 20)
    console.table(res)
    assert.ok(res[0].value === result)

    await storage.disconnect()
    done()
  }).timeout(1000 * 1000)
})
