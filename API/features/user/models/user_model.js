const  mongoose  = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        email :{
            type : String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'],
        },
        password:{
            type: String,
            required: true,
            minlength: [8, 'Password must be at least 8 characters'],
            match: [
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&/]).{8,}$/,
                'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character',
            ],
        },
        username:{
            type:String,
            require:true,
            trim:true
        }
    },  {
    versionKey: false,
  }
)

module.exports = mongoose.model('user',userSchema)