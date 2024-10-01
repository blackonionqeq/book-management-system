import * as multer from 'multer'
import * as fs from 'fs'
import { v4 } from 'uuid'

// console.log(multer)
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      console.log(__dirname)
      fs.mkdirSync('uploads')
    } catch {}

    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + v4() + '-' + file.originalname
    cb(null, uniqueSuffix)
  },
})
