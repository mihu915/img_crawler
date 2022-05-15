const dotenv = require('dotenv')

dotenv.config()

const {
  IMAGE_COUNT,
  KEYWORD,
  GET_TYPE = 'bing',
  DOWNLOAD_PATH = './resources',
  PIPE_COUNT
} = process.env

module.exports = {
  IMAGE_COUNT: parseInt(IMAGE_COUNT),
  KEYWORD,
  GET_TYPE,
  DOWNLOAD_PATH,
  PIPE_COUNT: parseInt(PIPE_COUNT)
}
