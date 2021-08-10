const mongoose = require("mongoose");
let {Schema}  = mongoose;

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    //TODO: come back here
    encry_password:{
        type: String,
        required: true
    },
    salt: String,
    role : {
        type: Number,
        default: 0
    },
    purshases: {
        type: Array,
        default: []
    }
});

userSchema.method = {
    securePassword: function (plainpassword) {
        if(!password)return "";
        try {
            return crypto.createHmac('sha256', this.salt).update(plainpassword).digest('hex');
        } catch (err){
            return "";
        }
    }
}


module.exports = mongoose.model("user", userSchema)
