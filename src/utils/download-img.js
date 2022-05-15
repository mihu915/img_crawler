const fs = require('fs')
const request = require('request')
const download = require('download')
const config = require('../app/config')

// 异步执行函数，用于下载图片，接收参数：图片地址，文件名，文件后缀
const downloadImg = async (filePath, img_url, file_name, callback) => {
  // 调request下的pipe方法，配合文档写入流，存储图片

  await download(img_url, filePath, {
    filename: file_name
  }).then(() => {
    callback && callback()
  })
}

module.exports = {
  downloadImg
}
