const User = require('../models/userModel');

const bcrypt = require('bcrypt');



module.exports.register = async(req, res,next)=>{
    
    try{
        const {username,email, password} = req.body;
        const usernameCheck  = await User.findOne({username});
        if(usernameCheck){
            return res.json({msg:"Username already exists",status:false});
        }
        const emailCheck = await User.findOne({email}); 
        if(emailCheck){
            return res.json({msg:"Email already exists",status:false});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = await User.create({
            username,
            email,
            password:hashedPassword,
        });
        delete user.password;
        return res.json({user,status:true});
    }
    catch(err){
        next(err);
    }
       
};


module.exports.login = async(req, res,next)=>{
    
    try{
        const {username, password} = req.body;
        const user  = await User.findOne({username});
        if(!user){
            return res.json({msg:"Username does not exists",status:false});
        }
        const isMatch = await bcrypt.compare(password,user.password);   
        if(!isMatch){
            return res.json({msg:"Invalid Password",status:false});
        }
        delete user.password;
        return res.json({user,status:true});
    }
    catch(err){
        next(err);
    }
       
};