const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


const user = require('../../db/models/model1')

app.use(express.json());

const jwt_secret = 'templateliteralisaheadache';



router.get('/',[
    body('name').isLength({min:3}),
    body('password').isLength({min:6})
],async (req,res)=>{

    try{
        const verror = validationResult(req);
        if(!verror.isEmpty()){
            res.status(400).send('provide valid formats for credentials');
        }
        else{
            
            const loger = await user.findOne({name:`${req.body.name}`});
            const vResult =await bcrypt.compare(req.body.password,loger.password);
            // console.log(vResult);
            if(vResult==true){
                const data = {
                    user:{
                        id:loger._id
                    }
                }
                const authtoken = jwt.sign(data,jwt_secret);
            
                res.json(authtoken);
            }
            else{
                res.status(401).send('invalid credentials')
            }

            
        }
        
    }catch(error){
        res.status(400).send(`internal server issues or credential error`);
    }
    

})

module.exports=router;