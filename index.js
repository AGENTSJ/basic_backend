const express = require('express')
const app = express();
const connectdb = require('./db/db')
const user = require('./db/models/model1')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const Auth = require('./middleware/auth')


app.use(express.json())

const jwt_secret = 'templateliteralisaheadache';

port=2400;
connectdb();


//////routes 

app.get('/',(req,res)=>{
    res.send('im alive');
});
app.post('/test',[
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
                var collect = user(req.body);
                await collect.save()/////also can use .create for up scaled applictaions
                res.send(`saved ${req.body}`);
                } catch (err){
                    console.log(`error occured : ${err}`)
                    res.status(400).send('bad request duplicate values');
                }   
        }
    })
app.get('/test',async (req,res)=>{
    try{
        var collect =await  user.findOne({name:`${req.body.name}`});
        res.json(collect);  
    }catch {
        res.status(400).send('internal server issues');
    }
    
})


///////////login 

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

            if(req.body.password==loger.password){
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