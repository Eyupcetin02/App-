const mongoSchema = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const redisClient = require("../redis/redis")

const register = async (req, res, next) => {
  
  try {
    const { username, email, password } = req.body;
    const user = await mongoSchema.findOne({email});

    if (user) {
      return res.status(401).json({
        message: "bu kullanici zaten var",
      });
    }

    if (password.length < 6) {
      return res.status(401).json({
        message: "daha uzun bir şifre girin",
      });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await mongoSchema.create({
      username,
      email,
      password: hashedPassword,
    });
    const { SECRET_KEY } = process.env;
    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    redisClient.SET('token', token, (err, reply) => {
      if (err) {
          console.error('Redis set error:', err);
          res.status(500).send({ error: 'Redis set error' });
      } else {
          console.log('Value set successfully:', reply);
          res.status(200).send({ message: 'Value set successfully' });
      }
  });

  redisClient.SET('user', newUser.email, (err, reply) => {
    if (err) {
        console.error('Redis set error:', err);
        res.status(500).send({ error: 'Redis set error' });
    } else {
        console.log('Value set successfully:', reply);
        res.status(200).json({ message: 'Value set successfully' });
    }
});

     res.status(200).json({
       status: "OK",
      token: token,
      user: newUser,
     });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  try {

const {email , password} = req.body
const user = await mongoSchema.findOne({email})

if(!user){
    return res.status(500).json({
        message: "böyle bir kullanici yok"
    })
}
const passwordCompare = await bcrypt.compare(password , user.password)

if(!passwordCompare){
   return res.status(500).json({
        message:"yanliş şifre"
    })
}

const { SECRET_KEY } = process.env;
const token = jwt.sign({id: user._id} , SECRET_KEY , {expiresIn : "1h"})

redisClient.SET('token', token, (err, reply) => {
  if (err) {
      console.error('Redis set error:', err);
      res.status(500).send({ error: 'Redis set error' });
  } else {
      console.log('Value set successfully:', reply);
      res.status(200).send({ message: 'Value set successfully' });
  }
});

redisClient.SET('user', user.email, (err, reply) => {
  if (err) {
      console.error('Redis set error:', err);
      res.status(500).send({ error: 'Redis set error' });
  } else {
      console.log('Value set successfully:', reply);
      res.status(200).send({ message: 'Value set successfully' });
  }
});

 res.status(200).json({
   status:"OK",
   token,
  user
})

  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
};

const getToken = async(req , res)=>{
const data = await redisClient.get("token")
res.status(200).json({data : data})
}

const getUser = async(req, res)=>{

const user = await redisClient.get("user")
res.status(200).json({user : user})

}

module.exports = { register, login , getToken , getUser};
