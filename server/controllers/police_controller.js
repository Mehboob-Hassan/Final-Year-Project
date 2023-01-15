import { Complaint, ReviewResponse, Evidence } from "../models/citizenSchema.js";
import { Review_FIR, Reject_Comp, FIR, Approved_Evid, Rejected_Evid } from "../models/policeSchema.js";
import { Police } from "../models/schema.js";



const viewComplaint = async (req, res) => {
    try {
        Complaint.find((err, data) => {
            if (!err) {
                res.render('view_complaint', {
                    list : data,
                })
            } else {
                console.log("There is no any data");
            }
        })
    } catch (error) {
        res.send(error)
    }
}


const create_FIR = async (req, res) => {
    try {
        Complaint.findById(req.params.id, (err, data) => {
            console.log("data")
            res.render('create_fir', {
                complnt: data
            })
        })
    } catch (error) {
        console.log(error)
    }
}

const review_FIR = async (req, res) => {
    try {
        const submit_FIR = new Review_FIR(req.body)
        const subFIR = await submit_FIR.save()
            .then(() => {

                res.send("FIR Submitted")
            }).catch((err) => {
                console.log(err);
            })
    } catch (error) {
        console.log(error)
    }
}

const rejection_form = async (req, res) => {
    try {
        Complaint.findOne({ id: req.params.id }, (err, data) => {
            res.render('comp_rejection_form', {
                complaint: data
            })
        })
    } catch (error) {
        console.log(error)
    }
}

const reject_comp = async (req, res) => {
    try {
        const rejectComp = new Reject_Comp(req.body)
        rejectComp.save()
            .then(() => {

                res.send("Complaint Rejected")
            }).catch((err) => {
                console.log(err);
            })
    } catch (error) {
        console.log(error)
    }
}

const fir_review_response = async (req, res) => {
    const accepted = await ReviewResponse.find({ 'response': 'yes' })
    const rejected = await ReviewResponse.find({ 'response': 'no' })
    res.render('review_response', {
        accepted: accepted,
        rejected: rejected
    })

}

const submit_fir = async (req, res) => {
    // const data = await Review_FIR.findOne({'review_id' : req.params.review_id})
    // res.send(req.body)
    const submit_fir = await new FIR(req.body)
    //     {
    //     complainer_id : data.complainer_id,
    //     full_name :  data.full_name,
    //     father_name :  data.father_name,
    //     cnic : data.cnic,
    //     landline : data.landline,
    //     phone : data.phone,
    //     email : data.email,
    //     present_addr :  data.present_addr,
    //     home_district : data.home_district,
    //     home_pstation : data.home_pstation,
    //     do_incident : data.do_incident,
    //     to_incident : data.to_incident,
    //     to_report : date.to_report,
    //     dist_incident : data.dist_incident,
    //     inc_pstation :  data.inc_pstation,
    //     inc_place : "data.inc_place",
    //     weapon_use : data.weapon_use,
    //     weapon_detail : data.weapon_detail,
    //     inc_detail :   data.inc_detail,
    //     fir_time : Date.now()
    //     seriel_num : req.body.seriel_num,
    //     section : req.body.section,
    //     officer_name : data.officer_name,
    //     officer_desig : data.officer_desig
    // })
    await submit_fir.save().then(() => {
        res.send('FIR Submitted')
    }).catch((err) => {
        res.send(err)
    })
}

const view_fir_list = async (req, res) => {
    try {
        const total_firs = await FIR.find()
        res.render('fir_list', {
            fir_list: total_firs
        })
    } catch (error) {

    }

}

const pol_evid_form = async (req, res) => {
    const self = await Police.findById(req.params.id)
    res.render('pol_evid_form', {
        self: self
    })
}

const submit_evid = async (req, res) => {
    try {
        const submit = await new Approved_Evid({
            fir_id: req.body.fir_id,
            submit_by_id: req.body.submit_by_id,
            submit_by_role: req.body.submit_by_role,
            submit_by_desig: req.body.submit_by_desig,
            date_of_submit: Date.now(),
            date_of_approve: Date.now(),
            evid_detail: req.body.evid_detail,
            evid: req.file.path,
        })
        submit.save().then(() => {
            res.send("Evidence Submitted")
        }).catch((err) => {
            res.send(err)
        })

    } catch (error) {
        res.send(error)
    }
}

const view_evid = async (req, res) => {
    try {
        Evidence.find((err, data) => {
            if (!err) {
                res.render('view_evids', {
                    data: data
                })
            } else {
                res.send(err)
            }
        })
    } catch (error) {
        res.send(error)
    }
}

const view_approved_evid = async (req, res) => {
    const viewEvid = await Approved_Evid.find({ fir_id: req.body.fir_id })
    res.render('view_aprvd_evid', {
        data: viewEvid
    })
}

const approve_evid_form = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const evid = await Evidence.findById(id)
        const submit = await new Approved_Evid({
            fir_id: evid.fir_id,
            fir_dist : evid.fir_dist,
            fir_pstation : evid.fir_pstation,
            submit_by_id: evid.submit_by_id,
            submit_by_role: evid.submit_by_role,
            submit_by_desig: "police",
            date_of_submit: evid.date_of_submit,
            date_of_response: Date.now(),
            evid_detail: evid.evid_detail,
            remarks: "Hello this is FIR after which document is going to be dlted",
            evid: evid.evid,
        })
        submit.save().then(() => {
                evid.remove()
                res.send("Evidence Approved")
        }).catch((err) => {
            res.send(err)
        })

    } catch (error) {
        res.send(error)
    }
}


const reject_evid_form = async (req, res) => {
    // const evid = await Evidence.findOne({ id:  })
    const id = req.params.id
    res.render('reject_evid', {
        id : id
    })
}

const reject_evid = async(req,res)=>{
    console.log(req.body.remarks)
    try {
        const evid = await Evidence.findById(req.body.id)
        const reject = await new Rejected_Evid({
            fir_id: evid.fir_id,
            fir_dist : evid.fir_dist,
            fir_pstation : evid.fir_pstation,
            submit_by_id: evid.submit_by_id,
            submit_by_role: evid.submit_by_role,
            submit_by_desig: "police",
            date_of_submit: evid.date_of_submit,
            date_of_response: Date.now(),
            evid_detail: evid.evid_detail,
            remarks: req.body.remarks,
            evid: evid.evid
        })
        reject.save().then(()=>{
            res.send('Evidences Rejection Submitted')
        }).catch((err) => {
            res.send(err)
        })
    } catch (error) {
        res.send(error)
    }
}

const search_by_id = async(req, res)=>{
    try {
        const searchFor = req.body.searchFor
        const pstation = req.body.pstation
        const id = req.body.Id
        console.log(searchFor)
        console.log(pstation)
        console.log(id)
        if(searchFor === 'FIR'){
            FIR.find({$and :[{inc_pstation : pstation},{_id:id}]}, (err, data)=>{
                if(data){
                    res.send(data)
                }else{
                    res.send("No such data")
                }
            })
        }
        if(searchFor === 'Complaint'){
            try {
                Complaint.find({$and :[{inc_pstation : pstation},{_id:id}]}, (err, data)=>{
                    if(data){
                        res.send(data)
                    }else{
                        res.send("No such data")
                    }
                })
            } catch (error) {
                res.send(error)
            }
        }
    } catch (error) {
        res.send(error)
    }
}


export { view_fir_list, viewComplaint, create_FIR, review_FIR, rejection_form, reject_comp, fir_review_response, submit_fir, pol_evid_form, submit_evid, view_evid, view_approved_evid, approve_evid_form, reject_evid_form, reject_evid, search_by_id }