const { v4: uuidv4 } = require('uuid');

const generateCode =  (length)=>{
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
    charactersLength)));
   }
   return result.join('');
}

const generateSdkKey = () => {
  
  return uuidv4();

}

module.exports = {generateCode,generateSdkKey}