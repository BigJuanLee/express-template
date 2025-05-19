const { mongoClient } = require('../../connect')

async function getDB(dbName = 'local') {
    const client = await mongoClient
    return client.db(dbName)
}

async function getCollection(dbName, collectionName) {
    const db = await getDB(dbName)
    return db.collection(collectionName)
}

module.exports = { getCollection }