const { getCollections, getDBInfo,getCollectionData, InsertOneToCollection, getFromWhere } = require('../../database');
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
    // try{
    // await sendEmail({from: 'e-ahammad.a@ucd.ma',
    // to: 'abdellatif.ahammad@gmail.com',
    // subject: 'Hi plaese can you send me the last file that work on!',
    // // html: '<b>This is bold text</b>',
    // text: 'in few minures plese'}).then((result,err)=>{
    //         if(result){
    //             console.log("sent successfully");
    //             console.log(result);
    //             return res.json({grating:"hello this is clover core API!"})
    //         }else{
    //             console.log(err);
    //             console.log(result);
    //             return res.json({grating:"nope"})
    //         }
    // })
    // } catch  (err) { 
    //     console.log(err);
    // }
    res.json("hi this is clover ");
}

exports.dbInfo = async (req,res,next)=>{
    const db_info = await getDBInfo();
    return res.json(db_info);
}

exports.getDbCollections = async (req,res,next)=>{
    const collections = await  getCollections();
    return res.json({data:collections});
}

exports.collectionData = async (req,res,next)=>{
    if(req.params.collection){  
        const collection = await getCollectionData(req.params.collection,req.query.page?req.query.page:1,req.query.limit);
        return res.json(collection);
    }else{
        return [];
    }
}


exports.addToCollection = async (req,res,next) =>{
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

exports.getFromCollectionWhere = async (req,res,next)=>{
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