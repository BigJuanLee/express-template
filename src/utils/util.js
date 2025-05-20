// exports.numberParse = (req, res, next) => {
//     const numberFields = ['pageSize']
//     const query = { ...req.query }
//     numberFields.forEach(field => {
//         if (req.query[field]) {

//             query[field] = Number(query[field])
//             console.log(`转换字段：${field}，原值：${req.query[field]}，类型：${typeof req.query[field]}`);
//         }
//     })
//     req.query = query
//     next()
// }