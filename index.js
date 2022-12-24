const express = require('express')
const app = express();
const connectdb = require('./db/db')

app.use(express.json())
port=2400;


connectdb();


app.use('/createuser',require('./routes/credentials/createuser'));

app.use('/login',require('./routes/credentials/logroute'));

app.use('/auth',require('./routes/credentials/authRoute'));

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})