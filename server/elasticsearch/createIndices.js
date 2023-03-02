const client = require("./connect");

async function createIndices() {
    if (await client.indices.exists({index: 'items'})) {
        console.log('Index does already exist')
        return false
    }
    return await client.indices.create( {index: 'items'}, (err, res, status) => {
        console.log('Index Items created', err, res, status);
    })
}

module.exports.createIndices = createIndices