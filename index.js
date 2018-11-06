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
const fs = require('fs')
const GeoTIFF = require('geotiff')

// readTIFF reads a tiff image from a default location. This function is just for testing
// the basic features of geotiff.js.
const readTIFF = async () => {
  const arrayBuffer = fs.readFileSync('./sample/joveyn.tif', null).buffer
  const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer)
  const image = await tiff.getImage() // by default, the first image is read.

  const tileWidth = image.getTileWidth()
  const tileHeight = image.getTileHeight()
  console.log(tileWidth)
  console.log(tileHeight)

  // the number of samples per pixel
  console.log(image.getSamplesPerPixel())
  const origin = image.getOrigin()
  const resolution = image.getResolution()
  const bbox = image.getBoundingBox()
  console.log(origin)
  console.log(resolution)
  console.log(bbox)
}
readTIFF()
