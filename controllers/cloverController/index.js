const { getCollections, getDBInfo,getCollectionData } = require('../../database');


//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// created by : Abdellatif Ahammad
// 


exports.hello = async(req,res,next)=>{
    return res.json({grating:"hello this is clover core API!"})
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