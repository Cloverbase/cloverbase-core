const { getDbRules } = require("./index")

const dataRules= ()=>{
    return getDbRules()
}

module.exports = {dataRules}