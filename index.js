const express = require('express')
const app = express();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const connectdb = require('./db/db')
const user = require('./db/models/model1')
const Auth = require('./middleware/auth')


app.use(express.json())

const jwt_secret = 'templateliteralisaheadache';

port=2400;
connectdb();


//////routes /////////////////////

app.get('/',(req,res)=>{
    res.send('im alive');
});
app.post('/createuser',[
    body('password').isLength({min:6}),
    body('name').isLength({min:3})
],
    async (req,res)=>{
        const verror = validationResult(req);
        if(!verror.isEmpty()){
            res.status(400).send('provide proper formats to credentials')
        }
        else{
            try{
                const salt = await bcrypt.genSalt(10);
                const hashpass = await bcrypt.hash(req.body.password,salt);
                var collect = await user.create({
                    name:req.body.name,
                    password:hashpass

                })
                res.send(`saved go to the login page`);
                } catch (err){
                    console.log(`error occured : ${err}`)
                    res.status(400).send('bad request duplicate values');
                }   
        }
    })



////////////////////////////////////login////////////////////////////////////////////////

app.get('/login',[
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

app.get('/auth',Auth,(req,res)=>{
    res.send(req.user);
    
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})