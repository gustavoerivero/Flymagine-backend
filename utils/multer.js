const multer = require('multer')

const IMAGE_FILE_TYPES = {
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/png': 'png', 
}

const DOC_FILE_TYPES = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/epub+zip': 'epub',
}

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = IMAGE_FILE_TYPES[file.mimetype]
    let error = new Error('Invalid image type')
    if (isValid) {
      error = null
    }
    cb(error, 'public/images')
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(' ').join('-')
    const extension = IMAGE_FILE_TYPES[file.mimetype]
    cb(null, `${fileName}-${Date.now()}.${extension}`)
  }
})

const docStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = DOC_FILE_TYPES[file.mimetype]
    let error = new Error('Invalid document type')
    if (isValid) {
      error = null
    }
    cb(error, 'public/docs')
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(' ').join('-')
    const extension = DOC_FILE_TYPES[file.mimetype]
    cb(null, `${fileName}-${Date.now()}.${extension}`)
  }
})

const imageUpload = multer({ storage: imageStorage })
const docUpload = multer({ storage: docStorage })

module.exports = {
  imageUpload,
  docUpload
}