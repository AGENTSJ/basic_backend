
const express = require('express')
const app = express();
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const user = require('../../db/models/model1')


app.use(express.json())


router.post('/',[
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

 module.exports= router;