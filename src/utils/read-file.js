// const asyncFn = require('async')
const Bagpipe = require('bagpipe')
const config = require('../app/config')
const { downloadImg } = require('./download-img')

const readInImg = (wallData, dirPath) => {
  const bagpipe = new Bagpipe(config.PIPE_COUNT)

  let count = 0
  return new Promise((resolve, reject) => {
    for (let i = 0; i < wallData.length; i++) {
      bagpipe.push(
        downloadImg,
        dirPath,
        wallData[i].downloadUrl,
        wallData[i].name,
        (err, data) => {
          count++
          console.log(`${count}张图片已写入成功: ${wallData[i].downloadUrl}`)
          if (count === wallData.length) {
            resolve(count)
          }
        }
      )
    }
  })
}

module.exports = {
  readInImg
}
