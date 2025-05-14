const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017'; // 本地连接示例
let client;//全局共享连接实例

async function connect() {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
    console.log('Connected to MongoDB!');
  }
  return client
}

module.exports.mongoClient = connect()
