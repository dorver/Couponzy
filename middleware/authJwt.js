const jwt = require("jsonwebtoken");
const config = require('config');
const db = require('../config/db');
const User = db.user;
const Role = db.role;

// verifyToken = (req, res, next) => {
//   let token = req.headers["x-access-token"];
// console.log(token);
//   if (!token) {
//     return res.status(403).send({ message: "No token provided!" });
//   }

// //   jwt.verify(token, config.secret, (err, decoded) => {
// //     if (err) {
// //       return res.status(401).send({ message: "Unauthorized!" });
// //     }
//   //verify token
//   try{
//     const decoded = jwt.verify(token, config.get('secret'));
//     console.log(decoded);
//     req.userId = decoded.id;
//     console.log(decoded.id);
//     next();    next();
// } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' })
// }
   
//   }
  

verifyToken = (req, res, next) => {
    //get token from header
    const token = req.header('x-access-token');

    //check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    //verify token
    try{
        const decoded = jwt.verify(token, config.get('secret'));

        req.userId = decoded.id;
        console.log(decoded.id);
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}

isAdmin = (req, res, next) => {
  //  console.log(req);
  User.findById(req.userId).exec((err, user) => {

    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log(user);
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;