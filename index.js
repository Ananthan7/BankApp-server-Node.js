const express = require('express');
const dataService = require('./services/data-service');
const session = require('express-session');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))

app.use(session({
    secret: 'randomsecurestring',
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());

app.use((req,res,next)=>{
    next();
})

const logMiddleware = (req,res,next)=>{
    console.log(req.body);
    next()
}

// app.use(logMiddleware);
// get read
app.get('/',(req,res)=>{
    res.send('THIS IS GET METHOD')
});
// authentication
const authMiddleware = (req,res,next)=>{
    if(!req.session.currentUser){
        return res.json( {
            statusCode:401,
            status:  false,
            message: "Please Log In"
          })
        
    }
    else{
        next();
    }
}


// register API
//POST - register
app.post('/register',(req,res)=>{

    dataService.register(req.body.acno,req.body.username,req.body.password)
    .then(result=>{
      res.status(result.statusCode).json(result)
     })
    
});
  
  
//POST - login
app.post('/login',(req,res)=>{
    
    dataService.login(req,req.body.acno,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
        })
    });


//  POST deposit
app.post('/deposit', authMiddleware, (req,res)=>{
    dataService.deposit(req,req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

// POST withdraw
app.post('/withdraw',authMiddleware, (req,res)=>{
    dataService.withdraw(req,req.body.acno, req.body.password, req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
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

 
// app.post('/register', (req,res)=>{
//     const result = dataService.register(req.body.uname,req.body.acno,req.body.pswd);
//     res.status(result.statusCode).json(result)
// })

// // // login API

// app.post('/login', (req,res)=>{
//     const result = dataService.login(req,req.body.acno,req.body.pswd); //req passes session
//     res.status(result.statusCode).json(result)
// })