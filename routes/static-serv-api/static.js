const express = require('express')
const router = express.Router();
const app = express();
const path = require('path');
app.use(express.static('../../static'));

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/static/home.html'));
})


module.exports=router;
