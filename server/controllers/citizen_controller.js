import { Complaint, ReviewResponse, Evidence } from "../models/citizenSchema.js";
import { Review_FIR, Reject_Comp, FIR } from "../models/policeSchema.js";
import { Citizen } from "../models/schema.js";

const view_fir = async (req, res) => {
    try {
        const fir = await FIR.find({ complainer_id: req.params.id })
        if (fir) {
            res.render('viewFir', {
                fir: fir
            })
        } else {
            res.send("There is no any FIR")
        }
        // res.send(req.params.id)
    } catch (error) {
        res.send(error)
    }

    // const fir = await FIR.find({id})
}

const sub_complaint = async (req, res) => {
    try {
        // reqBody = req.body
        // const addComplaint = new Complaint({
        //     complainer_id =
        //     full_name =
        //     father_name =
        //     cnic =
        //     phone =
        //     email=
        //     present_addr =
        //     inc_place= 
        //     inc_detail=
        
        console.log(addComplaint)
        const insertComp = await addComplaint.save()
            .then(() => {
                res.render('complaint-added', {
                    data : addComplaint._id
                })
                console.log("Complaint added Successfully and Complaint ID is : ", addComplaint._id);
            }).catch((err) => {
                console.log(err);
            })
    } catch (error) {
        console.log("Can't Add Complaint");
    }
}


const view_complaint_status = async (req, res) => {
    try {
        const self_id = req.params.id;
        const fir_exist = await Review_FIR.findOne({ complainer_id: self_id })
        const rejection_exist = await Reject_Comp.findOne({ complainer_id: self_id })

        if (fir_exist) {
            res.render('review_fir', {
                data: fir_exist
            })
        }
        else if (rejection_exist) {
            res.send(rejection_exist)
        } else {
            res.send("Complaint is in pending")
        }
    } catch (error) {
        console.log(error);
    }
}

const accept_review = async (req, res) => {
    try {
        const reviewInfo = await Review_FIR.findOne({ id: req.params.id })
        const submitResponse = new ReviewResponse({
            complainer: reviewInfo.full_name,
            father_name: reviewInfo.father_name,
            cnic: reviewInfo.cnic,
            review_id: reviewInfo._id,
            response: "yes",
            remarks: ""
        })
        submitResponse.save().then(() => {
            res.send("Response Submitted")
        }).catch((err) => {
            res.send(err)
        })
    } catch (error) {
        res.send(error)
    }
}

const reject_review = async (req, res) => {
    try {
        const reviewInfo = await Review_FIR.findOne({ id: req.body.review_id })
        const submitResponse = new ReviewResponse({
            complainer: reviewInfo.full_name,
            father_name: reviewInfo.father_name,
            cnic: reviewInfo.cnic,
            review_id: reviewInfo._id,
            response: "no",
            remarks: req.body.remarks
        })
        submitResponse.save().then(() => {
            res.send("Response Submitted")
        }).catch((err) => {
            res.send(err)
        })
    } catch (error) {
        res.send(error)
    }
}

const provide_evid_form = async(req, res) => {
    const self = await Citizen.findById(req.params.id)
    const fir_id = FIR.find({ complainer_id: self._id })
    res.render('provide_evid', {
        self: self,
        fir_id: fir_id
    })
}

const provide_evid = async(req, res) => {
    try {
        const uploadFile = await new Evidence(
            {
                fir_id : req.body.fir_id,
                fir_dist : req.body.fir_dist,
                fir_pstation : req.body.fir_pstation,
                submit_by_id : req.body.submit_by_id,
                submit_by_role : req.body.submit_by_role,
                date_of_submit : Date.now(),
                evid_detail : req.body.evid_detail,
                evid : req.file.path
        })
        await uploadFile.save().then(() => {
            res.send('Evidence submitted')
        }).catch((err) => {
            res.send(err)
        })
    } catch (error) {
        console.log(error)
    }
}

export { view_fir, sub_complaint, view_complaint_status, accept_review, reject_review, provide_evid_form, provide_evid }