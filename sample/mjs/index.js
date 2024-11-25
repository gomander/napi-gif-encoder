/* eslint-disable no-console */
import { createReadStream } from 'node:fs'
import { join } from 'node:path'
import { argv } from 'node:process'
import JsGifEncoder from 'gif-encoder-2'
import { PNG } from 'pngjs'
import { GIFEncoder } from '../../index.mjs'

const imagePaths = [...Array(46).keys()].map((i) => `../BBB${i + 1580}.png`)

async function loadImage(path) {
  return new Promise((resolve, reject) => {
    createReadStream(path)
      .pipe(new PNG())
      .on('parsed', function () {
        resolve({
          buffer: this.data,
          width: this.width,
          height: this.height,
        })
      })
      .on('error', reject)
  })
}

async function loadImages() {
  const promises = imagePaths.map(loadImage)
  return await Promise.all(promises)
}

async function main() {
  const images = await loadImages()
  try {
    const encoder = new GIFEncoder(images[0].width, images[0].height, join(import.meta.dirname, 'output.gif'))
    encoder.setFrameRate(30)
    encoder.setSampleFactor(2)
    // encoder.setRepeat(0)
    for (const image of images) {
      encoder.addFrame(image.buffer)
    }
    console.log('Encoding with Rust GIF encoder')
    const start = new Date().getTime()
    await encoder.finish()
    const end = new Date().getTime()
    console.log(`Encode time: ${end - start}ms`)
  } catch (error) {
    console.error(`Unexpected error: ${JSON.stringify(error)}`)
  }
}

class ContextLike {
  constructor(buffer) {
    this.buffer = buffer
  }

  getImageData(sx, sy, sw, sh) {
    return { data: this.buffer }
  }
}

async function mainJs() {
  const images = await loadImages()
  const gif = new JsGifEncoder(images[0].width, images[1].height, 'neuquant', true, 46)
  gif.setFrameRate(30)
  gif.setRepeat(1)
  console.log('Encoding with JavaScript GIF encoder')
  const start = new Date().getTime()
  gif.start()
  for (const image of images) {
    gif.addFrame(new ContextLike(image))
  }
  gif.finish()
  const end = new Date().getTime()
  console.log(`Encode time: ${end - start}ms`)
}

if (argv.includes('--js')) {
  mainJs()
} else {
  main()
}
