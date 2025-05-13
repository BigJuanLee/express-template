const express = require('express')
const router = express.Router()
const fs = require('fs-extra')
const path = require('path')
//解析格式为form-data数据的第三方库
const multer = require('multer')
//配置multer储存引擎 目录和文件名(加上时间戳)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const ext = path.extname(file.originalname)
        cb(null, uniqueSuffix + ext)
    }
})

const upload = multer({ storage })

router.get('/getFilesList', async (req, res) => {
    const files = await fs.readdir('uploads')
    res.json({ files })
})
router.get('/getUploadFile', async (req, res) => {
    const { filename } = req.query
    if (!filename) {
        return res.status(400).send('缺少文件名')
    }
    const filePath = path.join('uploads', filename)

    try {
        await fs.access(filePath, fs.constants.F_OK)

        const ext = path.extname(filename).toLowerCase()
        const contentType = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif'
        }[ext] || 'application/octet-stream';

        res.setHeader('Content-Type', contentType)
        const readStream = fs.createReadStream(filePath)
        readStream.pipe(res)

        readStream.on('error', err => {
            res.status(500).send(`文件传输失败:${err}`)
        })
    } catch (err) {
        res.status(404).send(`文件不存在${err}`)
    }
})

//单个文件上传，字段名为file
router.post('/singleFile', upload.single('file'), (req, res) => {
    // console.log(req.body, 61);//获取文本字段
    // console.log(req.file, 62);//获取上传的文件
    res.send('upload success')
})

module.exports = router