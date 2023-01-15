import mongoose from 'mongoose'

const cmplntSchema = new mongoose.Schema({
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
    incident_dateTime : {
        type : Date,
        required : true,
    },
    inc_place : {
        type : String,
        required : true,
    },
    inc_detail :  {
        type : String,
        required : true,
        minlength : 10
    }
})

const reviewResponseSchema = new mongoose.Schema({
    complainer : {
        type : String ,
        required : true
    },
    father_name : {
        type : String,
        required : true
    },
    cnic : {
        type : Number,
        required : true
    },
    review_id : {
        type : "String",
        required : true
    },
    response : {
        type : String,
        enum : ['yes', 'no'],
        lowercase : true
    },
    remarks : {
        type : String
    },

})

const evidSchema = new mongoose.Schema({
    fir_id : {
        type : String,
        required : true
    },
    fir_pstation : {
        type : String,
        required : true
    },
    fir_dist : {
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
    date_of_submit : {
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
    }
})

const Evidence = new mongoose.model('New_Evidence', evidSchema)
const ReviewResponse = new mongoose.model('Review_Response', reviewResponseSchema)
const Complaint = new mongoose.model('Complaint', cmplntSchema)

export { Complaint, ReviewResponse, Evidence }