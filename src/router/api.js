const express = require('express')
const router = express.Router()
const { getCollection } = require('../utils/dbHelper')

router.get('/logs', async (req, res) => {
    try {
        const logCollection = await getCollection('t_database', 'menu')
        /*
            find(query,projection)
            query:
            精确值 { age: 25 }
            比较操作符 { age: { $gt: 18 } }
            $ne不等于 $gt大于 $gte大于等于 $lt小于 $lte小于等于
            逻辑操作符 {
                $or: [
                    { status: "pending" },
                    { status: "expired" }
                ]
            }
            $or满足任一条件 $not不满足指定条件 $nor不满足所有条件
            数组操作符 { roles: { $in: ["admin", "editor"] } }
            $in匹配数组中任意一个值 $nin不匹配数组中的任何值 $all匹配包含所有指定值的数组 $elemMatch匹配数组中满足条件的元素
            嵌套文档查询
            {
                items: {
                    $elemMatch: { productId: 123, quantity: { $gt: 2 } }
                }
            }
            projection:
            { name: 1, email: 1 }控制字段返回 1显示 0隐藏不能混用除了_id
        */
        const data = await logCollection.find().toArray()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/insertMenu', async (req, res) => {
    try {
        const menuCollection = await getCollection('t_database', 'menu')
        const { name, shape, } = req.body
        const result = await menuCollection.insertOne({ name, shape })
        res.json(result)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/insertManyMenu', async (req, res) => {
    try {
        const menuCollection = await getCollection('t_database', 'menu')
        const { docs } = req.body
        const result = await menuCollection.insertMany(docs)
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: error.errorResponse.message })
    }
})

module.exports = router