const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('THIS IS GETs METHOD')
});

app.post('/',(req,res)=>{
    res.send('THIS IS POST METHOD')
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

