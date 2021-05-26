const express = require('express');
const app = express();
const dataService = require('./services/data-service');

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('THIS IS GET METHOD')
});

app.post('/',(req,res)=>{
    res.send('THIS IS POST METHOD')
});
// register API

app.post('/register',(req,res)=>{
    const result = dataService.register(req.body.uname, req.body.acno, req.body.pswd)
    res.status(result.statusCode).json(result);
});

// login API
app.post('/login',(req,res)=>{
    const result = dataService.login(req.body.acno, req.body.pswd)
    res.status(result.statusCode).json(result);
});

app.put('/',(req,res)=>{
    res.send('THIS IS put METHOD')
});
app.patch('/',(req,res)=>{
    res.send('THIS IS patch METHOD')
});
app.delete('/',(req,res)=>{
    res.send('THIS IS oooo delete METHOD')
});


app.listen(3000, ()=>{
    console.log("server started");
});

