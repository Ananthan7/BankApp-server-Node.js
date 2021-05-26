let accountDetails = {
    1000: {
        acno: 1000,
        username: "userone",
        password: "userone",
        balance: 50000,
    },
    1001: {
        acno: 1001,
        username: "usertwo",
        password: "usertwo",
        balance: 5000,
    },
    1002: {
        acno: 1002,
        username: "userthree",
        password: "userthree",
        balance: 10000,
    },
    1003: {
        acno: 1003,
        username: "userfour",
        password: "userfour",
        balance: 6000,
    },
};

const register = (uname, accno, pswd) => {
    let user = accountDetails;

    if (accno in user) {
        return {
            statusCode: 422,
            status: false,
            message: "user already exists"
        }
    } else {
        user[accno] = {
            acno: accno,
            username: uname,
            password: pswd,
            balance: 0,
        }
        return {
            statusCode: 200,
            status: true,
            message: "successfully registered"
        }
    };
};

const login=(acno, pswd)=>{
    let users = accountDetails;
    if (acno in users) {
      if (pswd == users[acno]['password']) {
        currentUser= users[acno]["username"];
        return {
            statusCode: 200,
            status: true,
            message: "success"
        };
      } else {
        return {
            statusCode: 422,
            status: false,
            message: "invalid account number"
        };
      }
    } else {
      return {
        statusCode: 422,
        status: false,
        message: "invalid account number"
    };
    }
  }



module.exports = {
    register,
    login
}