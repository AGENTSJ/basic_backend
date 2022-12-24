const express = require('express')
const app = express();
const connectdb = require('./db/db')

app.use(express.json())
port=2400;


connectdb();

app.use('/',require('./routes/static-serv-api/static'));

app.use('/createuser',require('./routes/credentials-serv-api/createuser'));

app.use('/login',require('./routes/credentials-serv-api/logroute'));

app.use('/auth',require('./routes/credentials-serv-api/authRoute'));




app.listen(port,()=>{
    console.log(`\n//////////////////////////Server has opened up in ${port}//////////////////////////
    for more details click
    http://localhost:${port}`);
})