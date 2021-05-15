const { appURL, port } = require("../config/config");


//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// created by : Abdellatif Ahammad
// 


const paginate = async (collection,paginationSize,page,collectionName)=>{
    const data =await  collection.find({}).skip(page?(Number(page)-1)*paginationSize:0).limit(Number(paginationSize)).toArray();
    const total  = await collection.countDocuments();
    const last = (total>paginationSize?paginationSize!==0?Math.floor(Number(total)/paginationSize):1:1);
    const conf = {
        "total" : total,
        "per_page" : paginationSize,
        "data": data,
        "current_page" : page,
        "last_page" : paginationSize!==0?Math.floor(Number(total)/paginationSize):1,
        "first_page_url":appURL+":"+ port + '/api/clover/collection/' + collectionName + "/" + 1,
        "last_page_url":appURL+":"+ port + '/api/clover/collection/' + collectionName + "/" + last,
        "next_page_url":Number(page) < last ?appURL+":"+ port + '/api/clover/collection/' + collectionName + "/" + (Number(page)+1):null,
        "prev_page_url":Number(page) >1? appURL+":"+ port + '/api/clover/collection/' + collectionName + "/" + (Number(page)-1):null,
        "path": appURL+":"+ port + '/api/clover/collection/' + collectionName,
        "from" : page?(Number(page)-1)*paginationSize:0,
        "to" : page?Number(page)*paginationSize:paginationSize,
    }
    return conf;
}


module.exports = {paginate}