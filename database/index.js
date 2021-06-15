const { MongoClient } = require("mongodb");
const {db,mongoURI, paginationSize, appURL, port} = require('../config/config');
const { paginate } = require("../helpers/paginator");
const uri =mongoURI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var mongo = require('mongodb');
const { generateSdkKey } = require("../helpers/codeGenerator");
var collections =  null;


// 
//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// created by : Abdellatif Ahammad
// 


const Connect = async()=>{
    const connection = await client.connect();
    return connection;
}

const Disconnect = async()=>{
    return await client.close()
}

const Collection = async(collection)=>{
    return client.db(db).collection(collection)
}

const getFrom = async(collection)=>{
    if(collection){
    return client.db(db).collection(collection).find({})
    }else{
        return null;
    }
}

const conditions = [{field:'title',op:'=',value:"test"}] ; 
const getFromWhere = async(collection,condition,page,limit)=> {
    var cursor =[];
    switch (condition.op) {
        case "=":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :condition.value});
            break;
        case "!=":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$ne:condition.value}});
            break;
        case ">":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$gt:condition.value}});
            break;
        case "<":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$lt:condition.value}});
            break;
        case ">=":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$gte:condition.value}});
            break;
        case "<=":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$lte:condition.value}});
            break;
        case "in":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$in:condition.value}});
            break;
        case "nin":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$nin:condition.value}});
            break;
        default:
            break;
    }
    const data = paginate(cursor,limit?limit:paginationSize,page,collection)
    return data;
}


const getFromWhereIntern = async(collection,condition,page,limit)=>{
    var cursor =[];
    switch (condition.op) {
        case "=":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :condition.value}).toArray();
            break;
        case "!=":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$ne:condition.value}}).toArray();
            break;
        case ">":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$gt:condition.value}}).toArray();
            break;
        case "<":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$lt:condition.value}}).toArray();
            break;
        case ">=":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$gte:condition.value}}).toArray();
            break;
        case "<=":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$lte:condition.value}}).toArray();
            break;
        case "in":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$in:condition.value}}).toArray();
            break;
        case "nin":
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$nin:condition.value}}).toArray();
            break;
        default:
            break;
    }
    // const data = paginate(cursor,limit?limit:paginationSize,page,collection)
    return cursor;
}

const InsertOneToCollection = async(collection,data)=>{
    const col =await  client.db(db).collection(collection).insertOne(data);
    return col.insertedId; 
}

const InsertManyToCollection  = async (collection,data)=>{
    const col =  await  client.db(db).collection(collection).insertMany(data);
    return col.insertedIds;
}


const  CreateIndex = async(collection,indexs)=>{
    return await client.db(db).collection(collection).createIndex(indexs)
}

const getIndexs = async(collection)=>{
    const listOfIndexs = [];
    await client.db(db).command({listIndexes: collection}).then(res=>{
       listOfIndexs.push(...res.cursor.firstBatch);
    })
    return listOfIndexs;
}

const getCollections = async ()=>{
    const listOfCollections = await client.db(db).listCollections({},{nameOnly:true}).toArray();
    return listOfCollections;
}

const getDBInfo = async ()=>{
    const info = await client.db(db).stats();
    return info;
}

const getCollectionData = async (collection,page,limit)=>{
    if(collection){
        const col  = await  client.db(db).collection(collection).find({});
        const data = paginate(col,limit?limit:paginationSize,page,collection)
        return data;
    }else{
        return [];
    }
}

const getById = async (collection,id) => {
    if(collection&&id){
        const o_id = new mongo.ObjectID(id);
        const doc = await client.db(db).collection(collection).findOne({"_id":o_id})
        return doc;
    }else{
        []
    }
}


const getByIdAndUpdate = async (collection,id,data) => {
    if(collection&&id&&data){
        const o_id = new mongo.ObjectID(id);
        const doc = await client.db(db).collection(collection).findOneAndUpdate({"_id":o_id},{$set:data});
        return doc;
    }else{
        []
    }
}


const removeById = async (collection,id) => {
    if(collection&&id){
        const o_id = new mongo.ObjectID(id);
        const doc = await client.db(db).collection(collection).findOneAndDelete({"_id":o_id});
        return doc;
    }else{
        []
    }
}


const getDbRules =  () =>{
    return  client.db(db).collection('clover_data_rules').find({}).toArray()
}

const getGeneralConf = async (collection) => {
    return client.db(db).collection('clover_general_conf').findOne({})
}


const addStorage = (data) =>{
    return client.db(db).collection('clover_storage').insertOne(data)
}

const addManyStorage = (data) =>{
    return client.db(db).collection('clover_storage').insertMany(data)
}


const findStorage = (filename,token) =>{
    return client.db(db).collection('clover_storage').findOne({filename:filename,token:token})
}


const deleteStorage = (filename,token) =>{
    return client.db(db).collection('clover_storage').findOneAndDelete({filename:filename,token:token})
}

const countStorage  =()=>{
    return client.db(db).collection('clover_storage').find({}).count()
}

const updateReads = ()=>{
    return client.db(db).collection('clover_statistics').findOneAndUpdate({},{$inc:{read:1}})
}

const updateWrites = ()=>{
    return client.db(db).collection('clover_statistics').findOneAndUpdate({},{$inc:{write:1}})
}

const updateRequests = ()=>{
    return client.db(db).collection('clover_statistics').findOneAndUpdate({},{$inc:{total:1}})
}

const newSdkKey = ()=>{
    return client.db(db).collection('clover_general_conf').findOneAndUpdate({},{$set:{client_sdk:generateSdkKey()}})
}

module.exports={
    Connect,
    InsertOneToCollection,
    getFromWhere,
    getFromWhereIntern,
    getCollections,
    getDBInfo,
    getCollectionData,
    getFrom,
    getById,
    getByIdAndUpdate,
    removeById,
    getDbRules,
    getGeneralConf,
    addStorage,
    addManyStorage,
    findStorage,
    deleteStorage,
    countStorage,
    updateReads,
    updateWrites,
    updateRequests,
    newSdkKey

}