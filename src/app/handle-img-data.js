const axios = require('axios')
const cheerio = require('cheerio')
const getImageUrl = (getType, keyword, page) => {
  let url = `https://cn.bing.com/images/search`
  console.log(`正在解析第${page}页图片数据`)
  switch (getType) {
    case 'bing':
      url = `https://cn.bing.com/images/search`
      break
    default:
      break
  }

  const imageData = []

  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      params: {
        q: keyword,
        first: page,
        tsc: 'ImageHoverTitle',
        form: 'HDRSC2'
      }
    })
      .then(res => {
        const $ = cheerio.load(res.data)
        const imgEl = $('.imgpt>.iusc').find('.mimg')
        const formatEl = $('.imgpt>.img_info').find('.nowrap')

        imgEl.each((i, item) => {
          const imageUrl = $(item).attr('src') ?? $(item).attr('data-src')
          const imageFormat = $(formatEl[i]).text().split(' ')[4]
          if (imageUrl) {
            const downloadUrl = imageUrl.split('?')[0]
            const name = downloadUrl.split('.')[4] + '.' + imageFormat
            imageData.push({ downloadUrl, name })
          }
        })
        resolve(imageData)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

module.exports = {
  getImageUrl
}
