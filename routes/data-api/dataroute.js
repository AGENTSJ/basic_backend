const express = require('express');
const app = express();

const router = express.Router();
const Auth = require('../../middleware/auth');
const data = require('../../db/models/datamodel')


app.use(express.json());



router.post('/',Auth,async (req,res)=>{
    try{
        await data.create({
            user:req.user.id,
            data:req.body.data,
            time:req.body.time
        })
        res.send('data saved in server')

    }catch(err){
        res.send('server error try again');
    }
    
    
    
})


router.get('/',Auth, async (req,res)=>{
    try{
       const collect = await data.find({user:req.user.id});
        res.json(collect);

    }catch(err){
        res.send(`server error ${err}`);
        
    }
})



module.exports= router;