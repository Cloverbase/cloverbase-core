const { getCollections, getDBInfo,getCollectionData, InsertOneToCollection, getFromWhere, getById, getByIdAndUpdate, removeById, updateReads, updateWrites, updateRequests, newSdkKey } = require('../../database');
const { collectionsCheck } = require('../../helpers/collectionsCheck');
const { sendEmail } = require('../../services/mails');

// 
//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// created by : Abdellatif Ahammad
// 


exports.hello = async(req,res,next)=>{
    res.json("hi this is clover ");
}

exports.dbInfo = async (req,res,next)=>{
    await updateReads();
    await updateRequests();
    const db_info = await getDBInfo();
    return res.json(db_info);
}

exports.getDbCollections = async (req,res,next)=>{
    await updateReads();
    await updateRequests();
    const collections = await  getCollections();
    return res.json({data:collections});
}

exports.collectionData = async (req,res,next)=>{
    await updateReads();
    await updateRequests();
    if(req.params.collection){  
        if(!collectionsCheck(req.params.collection)){
            const collection = await getCollectionData(req.params.collection,req.query.page?req.query.page:1,req.query.limit);
            return res.json(collection);
        }else{
            res.status(400).json({"error":"you can not access to this collections"})
        }
    }else{
        return [];
    }
}


exports.addToCollection = async (req,res,next) =>{
    await updateWrites();
    await updateRequests();
    if(req.params.collection && req.body.data){
    if(!collectionsCheck(req.params.collection)){
       InsertOneToCollection(req.params.collection,req.body.data).then(id=>{
        res.status(200);
        return  res.json({"id":id});
       }).catch(err=>{
           res.status(500);
           res.json({"errors":{msg:"server side error",err:err}})
       })}else{
        res.status(400).json({"error":"you can not access to this collections"})
       }
    }else{
        res.status(400)
        return res.json({"errors":"Invalid params"})
    }
}

exports.getFromCollectionWhere = async (req,res,next)=>{
    await updateReads();
    await updateRequests();
    if(req.params.collection && req.body.query){
    if(!collectionsCheck(req.params.collection)){
        getFromWhere(req.params.collection,req.body.query,req.query.page?req.query.page:1,req.query.limit).then(data=>{
            res.status(200)
            res.json(data)
        }).catch(err=>{
            res.status(500)
            res.json({"errors":err})
        })
    }else{
        res.status(400).json({"error":"you can not access to this collections"})
    }
    }else{
        res.status(400)
        return res.json({"errors":"Invalid params"})
    }
}


exports.getDocument = async (req,res,next)=>{
    await updateReads();
    await updateRequests();
    if(req.params.collection && req.params.document){
     if(!collectionsCheck(req.params.collection)){
        getById(req.params.collection,req.params.document).then(data=>{
          return res.status(200).json({"data":data})
        })
    }else{
        res.status(400).json({"error":"you can not access to this collections"});
    }
    }
}

exports.updateDocument = async (req,res,next) => {
    await updateWrites();
    await updateRequests();
    if(req.params.collection && req.params.document && req.body.data) {
    if(!collectionsCheck(req.params.collection)){
        getByIdAndUpdate(req.params.collection,req.params.document,req.body.data).then(data=>{
            return res.status(200).json({"data":data})
          }).catch(err=>{
              console.log(err);
          })
        }else{
            res.status(400).json({"error":"you can not access to this collections"});
        }
    }

}

exports.deleteDocument = async (req,res,next) => {
    await updateWrites();
    await updateRequests();
    if(req.params.collection && req.params.document) {
    if(!collectionsCheck(req.params.collection)){
        removeById(req.params.collection,req.params.document).then(data=>{
            return res.status(200).json({"data":data})
          }).catch(err=>{
            console.log(err);
          })
        }else{
        res.status(400).json({"error":"you can not access to this collections"});
        }
    }
}


// 
// Admin functions
// 

exports.adminCloverUpdateDocument = async (req,res,next) =>{
    await updateWrites();
    await updateRequests();
    if(req.params.collection && req.params.document && req.body.data) {
            getByIdAndUpdate(req.params.collection,req.params.document,req.body.data).then(data=>{
                return res.status(200).json({"data":data})
              }).catch(err=>{
                  console.log(err);
              })
    }
}


exports.adminCloverGetDocument = async (req,res,next)=>{
    await updateReads();
    await updateRequests();
    if(req.params.collection && req.params.document){
        getById(req.params.collection,req.params.document).then(data=>{
          return res.status(200).json({"data":data})
        })
    }
}


exports.adminCloverGetFromCollectionWhere = async (req,res,next)=>{
    await updateReads();
    await updateRequests();
    if(req.params.collection && req.body.query){
        getFromWhere(req.params.collection,req.body.query,req.query.page?req.query.page:1,req.query.limit).then(data=>{
            res.status(200)
            res.json(data)
        }).catch(err=>{
            res.status(500)
            res.json({"errors":err})
        })
    }else{
        res.status(400)
        return res.json({"errors":"Invalid params"})
    }
}



exports.adminCloverAddToCollection = async (req,res,next) =>{
    await updateWrites();
    await updateRequests();
    if(req.params.collection && req.body.data){
       InsertOneToCollection(req.params.collection,req.body.data).then(id=>{
        res.status(200);
        return  res.json({"id":id});
       }).catch(err=>{
           res.status(500);
           res.json({"errors":{msg:"server side error",err:err}})
       })
    }else{
        res.status(400)
        return res.json({"errors":"Invalid params"})
    }
}


exports.adminCloverCollectionData = async (req,res,next)=>{
    await updateReads();
    await updateRequests();
    if(req.params.collection){  
            const collection = await getCollectionData(req.params.collection,req.query.page?req.query.page:1,req.query.limit);
            return res.json(collection);
    }else{
        return [];
    }
}


exports.adminCloverDeleteDocument = async (req,res,next) => {
    await updateWrites();
    await updateRequests();
    if(req.params.collection && req.params.document) {
        removeById(req.params.collection,req.params.document).then(data=>{
            return res.status(200).json({"data":data})
          }).catch(err=>{
            console.log(err);
          })
    }
}

exports.adminCloverGenerateNewSdk = async (req,res,next) =>{
    await updateWrites();
    await updateRequests();
    return newSdkKey();
}

// exports.adminCloverUpdateConf  = async (req,res,next) =>{

//     if(req.params.collection ) {
//         UpdateCloverConf(req.params.collection,req.params.document,req.body.data).then(data=>{
//             return res.status(200).json({"data":data})
//           }).catch(err=>{
//               console.log(err);
//           })
//     }

// }