const colors = require('colors');
const { Connect, InsertOneToCollection, getFromWhere, getDBInfo, getCollections, getDbRules } = require("../../database");
const mongoose = require('mongoose');
const { colver_collections, migration_data, clover_users } = require("../../database/privateCollections");
const Users = require("../../models/Users");
const { generateCode } = require("../../helpers/codeGenerator");

const mongooseLoader = async (DB_name) => {
    const connection = await Connect();
    mongoose.connect("mongodb://localhost:27017/clover", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    var db =   mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // console.log("mongoose connected");
    });
    console.log("-------*****-------");
    console.log("intial admin data check");
    var current_collections = [];
    var collections = [];
    getCollections().then(res=>{
        res.forEach(ele=>{
            current_collections.push(ele.name);
        })
    }).then(()=>{
        colver_collections.forEach(async (ele)=>{
            if(current_collections.includes(ele)){
                console.log(colors.yellow(ele + ' : collection already existe'));
            }else{
                if(ele!="clover_users"){
                    await InsertOneToCollection(ele, migration_data[ele])
                    console.log(colors.green('Migrating new collection data : '+ ele));
                }else{
                    const code  = generateCode(16);
                    const newUser = new Users({
                        email: clover_users.email,
                        password:clover_users.password,
                        active:clover_users.active,
                        role: clover_users.role,
                        verificationCode:code,
                        created_at: Date.now() 
                    });
                    newUser.setPassword(clover_users.password);
                    newUser.save().then((user)=>{
                        console.log(colors.green("Migrating new collection data with seeds : " + ele ));
                        console.log(colors.green("admin acount is created successfuly : email => " +clover_users.email));
                    }).catch(err=>{
                        console.log(err);
                    })
                } 
            } 
        }) 
    }).catch(err=>{
        console.log(err);
    })



    
    // InsertOneToCollection('clover_configuration',{admin_email:null,admin_name:"clover"});
    // InsertOneToCollection('clover_indexs',{})
    // const v = getFromWhere('movies',{field:'title',op:'nin',value: ['One piece',"test"]}).then(res=>{
    //   res.forEach(el=>{
    //     console.log(el);
    //   })
    // })

}

module.exports = mongooseLoader;