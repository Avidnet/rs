/*
 *
 * In The Name of God
 *
 * +===============================================
 * | Author:        Parham Alvani <parham.alvani@gmail.com>
 * |
 * | Creation Date: 08-11-2018
 * |
 * | File Name:     image.js
 * +===============================================
 */

const fs = require('fs')
const GeoTIFF = require('geotiff')

/**
 * ImageHandler handles GeoTIFF images and extracts their data.
 * It returns data in array format contains geo coordinations and value.
 */
class ImageHandler {
  /**
   * extract first opens the given image then extracts its data with mentioned format.
   */
  async extract (path) {
    const arrayBuffer = fs.readFileSync(path).buffer
    const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer)
    const image = await tiff.getImage() // by default, the first image is read.

    // number of pixels
    const width = image.getWidth()
    const height = image.getHeight()

    // gets origin and resolution of the image
    // based on these it computes center of each pixel geo coordinations
    const [oX, oY] = image.getOrigin()
    const [rX, rY] = image.getResolution()

    // values array that is returned
    let values = []

    const [ data ] = await image.readRasters()
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixel = y * width + x
        const bboxX = oX + rX * x
        const bboxY = oY + rY * y

        values.push(
          {
            value: data[pixel],
            longitude: bboxX,
            latitude: bboxY
          }
        )
      }
    }

    return values
  }
}

module.exports = ImageHandler
