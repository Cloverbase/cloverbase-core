const { MongoClient } = require("mongodb");
const {db,mongoURI} = require('../config/config')

const uri =mongoURI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var collections =  null;

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
    var options = {
        "limit": 1,
        "skip": 3,
        "sort": "title"
    }
    switch (condition.op) {
        case "=":
            console.log("===================================");
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
            var cursor =  client.db(db).collection(collection).find({[condition.field] :{$nin:condition.value}},options);
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
    // exemple : { "title" : 1,"_id":-1 }

    return await client.db(db).collection(collection).createIndex(indexs)

}

const getIndexs = async(collection)=>{
    const listOfIndexs = [];
    await client.db(db).command({listIndexes: collection}).then(res=>{
       listOfIndexs.push(...res.cursor.firstBatch);
    })
    return listOfIndexs;

}



module.exports={
    Connect,
    InsertOneToCollection,
    getFromWhere,
}