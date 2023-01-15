import mongoose from "mongoose";


const SignInSchema = new mongoose.Schema({
    role : {
        type : String,
        // required : true,
        lowercase : true,
        enum : ['admin', 'police', 'citizen']
    },
    cnic : {
        type : Number,
        // required : true,
        min : [13, 'Please Enter a valid CNIC Number'],
        // unique : true
    },
    full_name :  {
        type : String,
        // required : true,
        maxlength : 50
    },
    father_name :  {
        type : String,
        // required : true,
        maxlength : 50
    },
   
    cast : {
        type : String,
        // required : true
    },
    email : {
        type : String,
        // // required : 'Email address is required',
        unique : true,
        lowercase : true,
        
    },
    city :  {
        type : String,
        // required : true
    },

    postal_addr :  {
        type : String,
        // required : true
    },
    perm_addr : {
        type : String,
        // required : true
    },
    zip : {
        type : Number,
        // required : true,
        // min : [4, 'Please Enter a valid zip Number']
    },
    passw : {
        type : String,
        // required : true, 
        minlength : 8
    },
    c_passw :  {
        type : String,
        // required : true,
        minlength : 8

    }

})


const Admin = new mongoose.model('Admin', SignInSchema)
const Police = new mongoose.model('Police', SignInSchema)
const Citizen = new mongoose.model('Citizen', SignInSchema)

export { Admin , Police, Citizen}