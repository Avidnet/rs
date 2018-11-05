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


const readTIFF = async () => {
  const arrayBuffer = fs.readFileSync('./sample/joveyn.tif', null).buffer
  const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer)
  const image = await tiff.getImage() // by default, the first image is read.
  console.log(image)
}
readTIFF()
