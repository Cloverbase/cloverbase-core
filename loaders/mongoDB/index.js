const { Connect, InsertOneToCollection, getFromWhere } = require("../../database");
const mongoose = require('mongoose');


const mongooseLoader = async (DB_name) => {
    const connection = Connect();
    mongoose.connect("mongodb://localhost:27017/clover", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("mongoose connected");
    });
    // InsertOneToCollection('clover_configuration',{admin_email:null,admin_name:"clover"});
    // InsertOneToCollection('clover_indexs',{})
    // const v = getFromWhere('movies',{field:'title',op:'nin',value: ['One piece',"test"]}).then(res=>{
    //   res.forEach(el=>{
    //     console.log(el);
    //   })
    // })

}

module.exports = mongooseLoader;