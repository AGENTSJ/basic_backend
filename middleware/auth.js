const jwt = require('jsonwebtoken');


const jwt_secret = 'templateliteralisaheadache';

const Auth = async (req,res,nex)=>{
    
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send('invalid request');
    }
    try{
        const verify =await jwt.verify(token,jwt_secret);
        req.user=verify.user;
        nex();
    }catch(x){
        res.status(401).send(`invalid authentification /////${x}`);
    }
    
    
}

module.exports=Auth;










