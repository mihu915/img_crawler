const { getImageUrl } = require('./handle-img-data')
const { dirExists } = require('../utils/create-dir')
const { readInImg } = require('../utils/read-file')

const config = require('./config')

const getImageListByCount = async (imageUrlList = [], page = 1) => {
  let newImageUrlList = []
  await getImageUrl(config.GET_TYPE, config.KEYWORD, page++).then(res => {
    imageUrlList.push(...res)
    const imageNameArray = Array.from(
      new Set(imageUrlList.map(item => item.name))
    )
    const imageUrlArray = Array.from(
      new Set(imageUrlList.map(item => item.downloadUrl))
    )

    newImageUrlList = imageNameArray.map((item, index) => {
      return {
        name: item,
        downloadUrl: imageUrlArray[index]
      }
    })

    console.log(`已解析出${newImageUrlList.length}张图片`)
  })

  if (newImageUrlList.length < config.IMAGE_COUNT) {
    return await getImageListByCount(imageUrlList, page)
  } else {
    return newImageUrlList
  }
}

const downloadImageByUrl = async imgData => {
  await dirExists(config.DOWNLOAD_PATH)
  await readInImg(imgData, config.DOWNLOAD_PATH)
}

const startCrawler = async () => {
  console.log('图片爬虫已开始执行')
  console.log(`关键字为：${config.KEYWORD}`)
  console.log(`目标爬取数量：${config.IMAGE_COUNT}`)

  console.log('开始解析图片')
  let imgData
  await getImageListByCount().then(res => {
    imgData = res.slice(0, config.IMAGE_COUNT)
    console.log(`图片解析完成，共解析出${imgData.length}条`)
  })

  console.log('开始写入图片文件')
  console.log(`存储路径为：${config.DOWNLOAD_PATH}`)
  await downloadImageByUrl(imgData)
}

module.exports = {
  getImageListByCount,
  startCrawler
}
