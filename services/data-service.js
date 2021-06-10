const db = require('./db');
// let currentUser ;
let accountDetails = {
    1000:{acno:1000,actype:"savings",username:"userone",password:"userone",balance:50000},
    1001:{acno:1001,actype:"savings",username:"usertwo",password:"usertwo",balance:5000},
    1002:{acno:1002,actype:"current",username:"userthree",password:"userthree",balance:10000},
    1003:{acno:1003,actype:"current",username:"userfour",password:"userfour",balance:6000}

};

// db connection
// register API
const register = (acno,username,password)=>{
  return db.User.findOne({acno})
  .then(user=>{
  //  console.log(user);
    if(user){
      return {
        statusCode:422,
          status:  false,
          message: "User Exist please Login"
        }
    }
    else{
      const newUser = new db.User({
        acno,
        username:username,
        password:password,
        balance:0,
      })
      newUser.save();
      return {
        statusCode:200,
        status:  true,
        message: "Succesfully registerd"
      }
    }
  })
}
  
// login
const login = (req,acno,password) =>{
  
  var acno = parseInt(acno);
  
  return db.User.findOne({acno,password})
  .then(user=>{
  
    if(user){
      req.session.currentUser = user.acno;
      return {
        statusCode:200,
        status:  true,
        message: "Succesfully log in",
        name: user.username
      }
    }
    else{
      return {
        statusCode:422,
          status:  false,
          message: "Invalid credentials"
        }
    }
  })
}

  
const deposit = (req,acno,password,amt) =>{
  var amount = parseInt(amt);
  return db.User.findOne({acno,password})
  .then(user=>{
  
      if(!user){
        return {
          statusCode:422,
          status:  false,
          message: "invalid Credentials"
        }
      }
      if(req.session.currentUser != acno){
        return{
          statusCode:422,
          status:  false,
          message: "Permission denied due to unautherised access"
        }
      }

      user.balance+=amount;
      user.save();
      return {
        statusCode:200,
        status:  true,
        balance: user.balance,
        message: amount + " credited and new balance is "+ user.balance
      }
  })
}


const withdraw = (req,acno,password,amt) =>{

  var amount = parseInt(amt);

  return db.User.findOne({acno,password})
  .then(user=>{
    if(!user){
      return {
        statusCode:422,
          status:  false,
          message: "Invalid credentials"
        }
    }
    if(req.session.currentUser != acno){
      return{
        statusCode:422,
        status:  false,
        message: "Permission denied due to unautherised access"
      }
    }

   if(user.balance<amount){
    return {
      statusCode:422,
        status:  false,
        message: "Insufficient Balance"
      }
   } 
    user.balance-=amount;
    user.save();
    return {
      statusCode:200,
      status:  true,
      balance: user.balance,
      message: amount + " debited and new balance is "+ user.balance
    }
  })

}
  
// const deposit=(acno, pswd, amt) => {
//   if(!req.session.currentUser){
//     return {
//       statusCode: 422,
//       status: false,
//       message: "please login"
//     }
//   }
  
//   let amount=parseInt(amt)
//   let users = accountDetails;
//   if (acno in users) {
//     if (pswd == users[acno]['password']) {
//       users[acno]['balance'] += amount;
//       return {
//           statusCode:200,
//           status:true,
//           message: amount + "creadited balance is"+ users[acno]['balance']
//       };
//     } else {
//       return {
//           statusCode: 401,
//           status: false,
//           message: "please login"
//       }
//     }
//   } else {
//     return {
//       statusCode: 422,
//       status: false,
//       message: "invalid accno"
//   }
//   }
// }

// const withdraw=(acno, pswd, amt) => {
//     let amount=parseInt(amt)
//     let users = accountDetails;
//     if (acno in users) {
//       if (pswd == users[acno]['password']) {
//         users[acno]['balance'] -= amount;
//         return{
//             statusCode: 200,
//             status: true,
//             message: "success"
//         };
//       } else {
//         return{
//             statusCode: 422,
//             status: false,
//             message: `invalid account`
//         };
//       }
//     } else {
//         return{
//             statusCode: 422,
//             status: false,
//             message: `invalid account`
//         };
//     }
//   }




module.exports = {
    register,
    login,
    deposit,
    withdraw
}