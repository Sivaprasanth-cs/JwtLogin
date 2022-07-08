const dbConn = require("../dbConnection");
const { signJWTtoken, verifyJWTtoken } = require("../utilities/auth");
var bcrypt = require("bcryptjs");






const registeruser = async (req, res) => {
  const { username,email, password } = req.body;

  let encryptedPassword = bcrypt.hashSync(password, 8);

  let query = `INSERT INTO users (username,email,password) VALUES (?,?,?)`;
  dbConn.query(query, [username,email, encryptedPassword], (err, result, fields) => {
    console.log(err, result, fields);
    res.send("add user sucessfully");
  });
};

const loginuser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  let query = `select * from users where username=?`;
  dbConn.query(query, [username], async (err, result, fields) => {
    if (result.length > 0) {
      const { password: dbPassword, username: dbUsername, id } = result[0];
      if (dbPassword && bcrypt.compareSync(password, dbPassword)) {
        // authentication failed
        let data = { id: id, username: dbUsername };
        let token = await signJWTtoken(data);
        res.send({ token });
      } else {
        // authentication successful
        res.send({ token: null });
      }
    }
  });

  // let query = `INSERT INTO employee (name,age,emp_no,address) VALUES (?,?,?, ?)`;
};



module.exports = {
 
  loginuser,
  registeruser,
  // tokenVerify,
};
