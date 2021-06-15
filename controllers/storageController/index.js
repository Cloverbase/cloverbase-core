
//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// created by : Abdellatif Ahammad
// 

const { addStorage, addManyStorage, findStorage, deleteStorage, countStorage, updateReads, updateRequests, updateWrites } = require("../../database")
const { generateSdkKey, generateCode } = require("../../helpers/codeGenerator")

const path = require('path');
const { appURL, port } = require("../../config/config");

exports.uploadFile = async (req, res, next) => {
    await updateRequests();
    const file = req.file

    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }else{
      var data = {path:file.path,originalname:file.originalname,mimetype:file.mimetype,filename:file.filename,size:file.size,token:generateCode(16),created_at:Date.now()}
      addStorage(data).then(done=>{
        res.send({...data,imgURL:appURL+":"+port+"/api/clover_storage/"+ file.path+"?token="+data.token});
      })
    }
      
}



exports.uploadMultipleFiles = async (req, res, next) => {
  await updateWrites();
  await updateRequests();
    const files = req.files
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }else{
      var filesList = []
      var finalList = []
      files.forEach(file => {
        const data = {path:file.path,originalname:file.originalname,mimetype:file.mimetype,filename:file.filename,size:file.size,token:generateCode(16),created_at:Date.now()}
        filesList.push(data)
        finalList.push({...data,imgURL:appURL+":"+port+"/api/clover_storage/"+ file.path+"?token="+data.token})
      });
      addManyStorage(filesList).then(done=>{
        res.send(filesList)
      })
    }

}


exports.serveFiles = async (req,res,next) => {
  await updateReads()
  await updateRequests();
  const token = req.query.token;
  if(token && req.params.file){
    findStorage(req.params.file,token).then(data=>{
      if(data){
        const file = path.join(__dirname, '../../uploads/'+req.params.file);
        res.sendFile(file);
      }else{
        res.status(404).json({"error":"no file with this credential was found"})
      }
    })
  }else{
    res.status(404).json({"error":"no file can be find without valid token"});
  }
}


exports.deleteFile = async (req,res,next) =>{
  await updateWrites()
  await updateRequests();
  const token = req.query.token;
  if(token && req.params.file){
    deleteStorage(req.params.file,token).then(data=>{
      if(data.value){
        res.status(200).json({data});
      }else{
        res.status(404).json({"error":"no file with this credential was found"})
      }
    })
  }else{
    res.status(404).json({"error":"no file can be deleted without valid token"});
  }
}


exports.totalStoredFiles = (req,res,next) =>{
    countStorage().then(data=>{
        res.status(200).json({data});
    })
}

