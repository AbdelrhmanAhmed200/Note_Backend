
const { signJwt } = require('../../../config/jwt_token');
const usermodel = require('../models/user_model');
const bcrypt = require('bcryptjs');

exports.login = async (req,res)=>{
    try {
        let {username,pass} = req.body
        if (!username || !pass) {
        return res.status(400).json({ message: ' username, password are required' });
    }
    username = username.toLowerCase().trim()
    const existuser = await usermodel.findOne({username})
    if(!existuser){
        return res.status(401).json({message:'username or password is incorrect'})
    }

    if(!await bcrypt.compare(pass.trim(),existuser.password)){
        return res.status(401).json({
            message:'username or password is incorrect'
        })
    }
    
    const token = await signJwt({
      userId: existuser._id
    });

    return res.status(200).json({
        message:'login successful',
        token
    })


    } catch (error) {
        console.error(error);
        return res.status(500).json({
        message: 'Internal server error'
    })
    }
}