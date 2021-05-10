const { Connect, InsertOneToCollection, getFromWhere } = require("../../database");



const mongooseLoader = async (DB_name) => {
    const connection = Connect();
    // InsertOneToCollection('clover_configuration',{admin_email:null,admin_name:"clover"});
    // InsertOneToCollection('clover_indexs',{})
    const v = getFromWhere('movies',{field:'title',op:'nin',value: ['One piece',"test"]}).then(res=>{
      res.forEach(el=>{
        console.log(el);
      })
    })

}

module.exports = mongooseLoader;