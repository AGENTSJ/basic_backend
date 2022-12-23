const jwt = require('jsonwebtoken');


const jwt_secret = 'templateliteralisabish';

const Auth = (req,res,nex)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send('invalid request');
    }
    try{
        const verify = jwt.verify(token,jwt_secret);
        req.user=verify.user;
        nex();
    }catch(x){
        res.status(401).send(`invalid authentification /////${x}`);
    }
    
    
}

module.exports=Auth;










