const express = require('express')
const router = express.Router();
const Auth = require('../../middleware/auth')

const app = express();

app.use(express.json());



router.get('/',Auth,(req,res)=>{

    res.send(req.user);
    

})
router.get('/test',(req,res)=>{
    res.send('test run working');
})


module.exports=router;

