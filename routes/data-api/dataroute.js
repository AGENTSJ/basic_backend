const express = require('express');
const app = express();

const router = express.Router();
const Auth = require('../../middleware/auth');
const data = require('../../db/models/datamodel')


app.use(express.json());


///////////saving data///////////////////////


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

////////////fetching data/////////////////

router.get('/',Auth, async (req,res)=>{
    try{
       const collect = await data.find({user:req.user.id});
        res.json(collect);

    }catch(err){
        res.send(`server error ${err}`);
        
    }
})

///////////////update data//////////////////////////////

router.put('/update/:id',Auth,async (req,res)=>{

    try{
        const temp = await data.findOne({_id:req.params.id})
        if(temp.user!=req.user.id){//req.user taken from middle ware
            res.send('validation error').status(401);

        }else{
                let newdta = {
                    user:req.user.id,
                    data:req.body.data,
                    time:req.body.time
                }
               let collect = await data.findByIdAndUpdate(req.params.id,{$set:newdta},{new:true});
                if(collect==null){
                    res.send('not found ');
                }else{
                    res.send(`data updated`);                    
                }
        };

}catch(x)
    {
        res.send('server error').status(401);
    }
})

/////////////////////data delete//////////////////////////////

router.delete('/delete/:id',Auth,async (req,res)=>{
    try{
        const collect = await data.findOne({_id:req.params.id})
    if(collect.user!=req.user.id){
        res.send('not allowed').status(401);
    }else{
        const dta = await data.findByIdAndDelete(req.params.id);
        res.send('data deleted');
    }
    }catch(x){
        res.send(`internal server issues try again //////\n${x}`);
    }
    
})     
    
module.exports= router;