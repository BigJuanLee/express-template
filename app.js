//使用Express创建http服务器
const express = require('express')
const app = express()
const helmet = require('helmet')
const uploadRouter = require('./router/upload')
const apiRouter = require('./router/api')

const path = require('path')
app.use('/upload', uploadRouter)
app.use('/api', apiRouter)

//自动添加一些重要的安全头
app.use(helmet())
// 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// 解析 application/json
app.use(express.json());
//将静态文件放到服务器上
app.use('/pictures', express.static(path.join(__dirname, 'uploads')));
app.get('/search', (req, res) => {
    const { keyword } = req.query
    res.send(`select keyword is ${keyword}`)
})

app.post('/login', (req, res) => {
    const { username, password } = req.body
    res.send(`Username: ${username}, Password: ${password}`)
})


app.listen(3000, () => {
    console.log('running in 3000');

})
