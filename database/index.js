const { MongoClient } = require("mongodb");
const {db,mongoURI, paginationSize, appURL, port} = require('../config/config');
const { paginate } = require("../helpers/paginator");
const uri =mongoURI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var collections =  null;



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
    collections = client.db(db).collections;
    return connection;
}

const Disconnect = async()=>{
    return await client.close()
}

const Collection = async(collection)=>{
    return client.db(db).collection(collection)
}

const GetFrom = async(collection)=>{
    if(collection){
    return client.db(db).collection(collection).find({})
    }else{
        return null;
    }
}

const conditions = [{field:'title',op:'=',value:"test"}]
const getFromWhere = async(collection,condition)=>{
    var cursor =[];
    // var options = {
    //     "limit": 1,
    //     "skip": 3,
    //     "sort": "title"
    // }
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
    return cursor;
}


const getFromWhereIntern = async(collection,condition)=>{
    var cursor =[];
    // var options = {
    //     "limit": 1,
    //     "skip": 3,
    //     "sort": "title"
    // }
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
        const col  = await  client.db(db).collection(collection);
        const data = paginate(col,limit?limit:paginationSize,page,collection)
        return data;
    }else{
        return [];
    }
}



module.exports={
    Connect,
    InsertOneToCollection,
    getFromWhere,
    getFromWhereIntern,
    getCollections,
    getDBInfo,
    getCollectionData,
}