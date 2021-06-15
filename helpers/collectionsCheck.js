const { colver_collections } = require("../database/privateCollections")

const collectionsCheck =(collection) => {
    return colver_collections.includes(collection)
}


module.exports = {collectionsCheck}