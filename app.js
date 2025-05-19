//使用Express创建http服务器
const express = require('express')
const app = express()

//自动添加一些重要的安全头
const helmet = require('helmet')
app.use(helmet())
const path = require('path')


const uploadRouter = require(path.join(__dirname, 'src/router/upload'))
const apiRouter = require(path.join(__dirname, 'src/router/api'))
// 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// 解析 application/json
app.use(express.json());


//使用路由
app.use('/upload', uploadRouter)
app.use('/api', apiRouter)




//将静态文件放到服务器上
app.use('/pictures', express.static(path.join(__dirname, 'uploads')));

//连接mongodb
const { mongoClient } = require('./connect')
mongoClient.then(() => {
    app.listen(3000, () => {
        console.log('running in 3000');

    })
}).catch(err => {
    console.error('failed to connect to mongodb', err)
    process.exit(1)
})

process.on('SIGINT', async () => {
    //关闭进程时断开连接
    const client = await mongoClient;
    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
});


