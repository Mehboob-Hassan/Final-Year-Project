import mongoose, { trusted } from 'mongoose'

const FIRSchema = new mongoose.Schema({
    complaint_id : {
        type : String,
        required : true
    },
    complainer_id : {
        type : String,
        required : true
    },
    full_name :  {
        type : String,
        required : true,
        maxlength : 50
    },
    father_name :  {
        type : String,
        required : true,
        maxlength : 50
    },
    cnic : {
        type : Number,
        required : true,
        min : [13, 'Please Enter a valid CNIC Number'],
        unique : true
    },
    landline : {
        type : Number,
        min : [9, 'Please Enter a valid Landline Number'],
        min : [11, 'Please Enter a valid Landline Number'],
        unique : true
    },
    phone : {
        type : Number,
        required: true,
        min : [9, 'Please Enter a valid Phone Number'],
        min : [11, 'Please Enter a valid Phone Number'],
        unique : true
    },
    email : {
        type : String,
        required : 'Email address is required',
        unique : true,
        lowercase : true,
    },
    present_addr :  {
        type : String,
        required : true,
        lowercase : true
    },
    home_district : {
        type : String,
        lowercase : true,
        required : true
    },
    home_pstation : {
        type : String,
        lowercase : true,
        required : true
    },
    do_incident : {
        type : Date,
        required : true,
    },
    to_incident : {
        type : String,
        timestamps : true,
        required : true,
    },
    to_report : {
        type : Date,
        required : true
    },
    to_response : {
        type : Date,
        required : true
    },
    dist_incident : {
        type : String,
        required : true,
    },
    inc_pstation :  {
        type : String,
        required : true,
        lowercase : true
    },
    inc_place :{
        type : String,
        required : true,
    },
    weapon_use : {
        type : String,
        enum : ['yes', 'no'],
        required : true
    },
    weapon_detail : {
        type : String
    },
    inc_detail :  {
        type : String,
        required : true
    },

    // cop will provide these things
    fir_time : {
        type : Date,
        required : true
    },
    seriel_num : {
        type : Number,
        required : true
    },
    section : {
        type : String,
        required : true
    },
    officer_id : {
        type : String,
        required : true
    },
    officer_name : {
        type : String,
        required : true,
    },
    officer_desig : {
        type : String,
        required : true,
    }
})

const rejCompSch = new mongoose.Schema({
    complainer_id : {
        type : String,
        required : true
    },
    dist : {
        type : String,
        required : true
    },
    pstation : {
        type : String,
        required : true
    },
    officer_name : {
        type : String,
        required : true
    },
    officer_desig : {
        type : String,
        required : true
    },
    complainer : {
        type : String,
        required : true
    },
    complain_id : {
        type : String
    },
    reason : {
        type : String,
        required : true
    }
})

const evidSchema = new mongoose.Schema({
    fir_id : {
        type : String,
        required : true
    },
    fir_dist : {
        type : String,
        required : true
    },
    fir_pstation : {
        type : String,
        required : true
    },
    submit_by_id : {
        type : String,
        required : true
    },
    submit_by_role : {
        type : String,
        enum : ['admin', 'police', 'citizen']
    },
    submit_by_desig : {
        type : String,
        required: true
    },
    date_of_submit : {
        type : Date,
        required : true
    },
    date_of_response : {
        type : Date,
        required : true
    },
    evid_detail : {
        type : String,
        required : true
    },
    evid: {
        type : String,
        required : true
    },
    remarks : {
        type : String,
        required : true
    }
})


const Review_FIR = new mongoose.model('FIR_Review', FIRSchema)
const Reject_Comp = new mongoose.model('Rejected_Complaint', rejCompSch)
const FIR = new mongoose.model('FIR', FIRSchema)
const Approved_Evid = new mongoose.model('Approved_Evid', evidSchema)
const Rejected_Evid = new mongoose.model('Rejected_Evid', evidSchema)


export { Review_FIR , Reject_Comp, FIR,  Approved_Evid, Rejected_Evid }