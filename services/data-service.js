const db = require('./db');
let currentUser = "";
let accountDetails = {
    1000:{acno:1000,actype:"savings",username:"userone",password:"userone",balance:50000},
    1001:{acno:1001,actype:"savings",username:"usertwo",password:"usertwo",balance:5000},
    1002:{acno:1002,actype:"current",username:"userthree",password:"userthree",balance:10000},
    1003:{acno:1003,actype:"current",username:"userfour",password:"userfour",balance:6000}

};

// db connection
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
        balance:0
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
  
  
const login = (req,accno,password) =>{
  
  var acno = parseInt(accno);
  
  return db.User.findOne({acno,password})
  .then(user=>{
  
    if(user){
      req.session.currentUser = user;
      return {
        statusCode:200,
        status:  true,
        message: "Succesfully log in"
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

  
const deposit = (acno,password,amt) =>{
  
  var amount = parseInt(amt);
  return db.User.findOne({acno,password})
  .then(user=>{
  
    if(!user){
      return {
          statusCode:422,
          status:  false,
          message: "invalid user"
        }
      }
      user.balance+=amt;
      user.save();
  })
}
  
// const register = (uname, accno, pswd) => {
//     let user = accountDetails;

//     if (accno in user) {
//         return {
//             statusCode: 422,
//             status: false,
//             message: "user already exists"
//         }
//     } else {
//         user[accno] = {
//             acno: accno,
//             username: uname,
//             password: pswd,
//             balance: 0,
//         }
//         return {
//             statusCode: 200,
//             status: true,
//             message: "successfully registered"
//         }
//     };
// };

// const login = (req,acno, pswd) => {
//     let user = accountDetails;
//     if (acno in user) {
//       if (pswd == user[acno]['password']) {
//         req.session.currentUser= user[acno];
//         return {
//             statusCode: 200,
//             status: true,
//             message: "successfully login"
//         }
//       }
//       else {
//         return  {
//             statusCode: 422,
//             status: false,
//             message: "invalid password"
//         }
//       }
//     }
//     else {
//       return  {
//         statusCode: 422,
//         status: false,
//         message: "invalid accno"
//     }
//     }
//   }

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

const withdraw=(acno, pswd, amt) => {
    let amount=parseInt(amt)
    let users = accountDetails;
    if (acno in users) {
      if (pswd == users[acno]['password']) {
        users[acno]['balance'] -= amount;
        return{
            statusCode: 200,
            status: true,
            message: "success"
        };
      } else {
        return{
            statusCode: 422,
            status: false,
            message: `invalid account`
        };
      }
    } else {
        return{
            statusCode: 422,
            status: false,
            message: `invalid account`
        };
    }
  }




module.exports = {
    register,
    login,
    deposit,
    withdraw
}