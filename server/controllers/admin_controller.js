import { Complaint } from "../models/citizenSchema.js";
import { FIR } from "../models/policeSchema.js";
import { Review_FIR, Reject_Comp, Approved_Evid, Rejected_Evid } from "../models/policeSchema.js";
import { Police } from "../models/schema.js";
import { Evidence } from '../models/citizenSchema.js'
import  fs  from "fs";
import path from "path";
import { fileURLToPath } from 'url'; 
import e from "express";

// Import dirname from path as we're using ECMAScript where __dirname is not avalaible
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const ad_view_complaints = (req, res)=>{
    try {
        const dist = req.params.dist
        console.log(dist)
        const jsonPath = 'C:/Users/DELL/Desktop/fir_registeration_sys/server/DummyAPI/pstations.json'
        const read = fs.readFile(jsonPath, 'utf-8', (err, data)=>{
            const contents = JSON.parse(data)
            console.log(contents.dist)
            const pstations = contents.police_stations;
            res.render('list_pstations', {
                pstations : pstations,
                dist : dist
            })
        })
            
    } catch (error) {
        console.log(error)
    }
}

const ad_view_firs = async(req, res)=>{
    try {
        const jsonPath = 'C:/Users/DELL/Desktop/fir_registeration_sys/server/DummyAPI/pstations.json'
        const read = fs.readFile(jsonPath, 'utf-8', (err, data)=>{
            const contents = JSON.parse(data)
            const pstations = contents.police_stations;
            res.render('list_pstations', {
                pstations : pstations,
                class : "display:none"
            })
        })
            
    } catch (error) {
        console.log(error)
    }
}

const ad_view_complaint_status = async (req, res) => {
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

const ad_view_fir_reviews = async(req, res)=>{
    try {
        const jsonPath = 'C:/Users/DELL/Desktop/fir_registeration_sys/server/DummyAPI/pstations.json'
        const read = fs.readFile(jsonPath, 'utf-8', (err, data)=>{
            const contents = JSON.parse(data)
            const pstations = contents.police_stations;
            res.render('ad_fir_reviews', {
                pstations : pstations
            })
        })
            
    } catch (error) {
        console.log(error)
    }
}


const view_officers_list = async(req, res)=>{
    const params = req.params.id
    console.log(params)
    Police.find({apointed_dist : params}, (err, data)=>{
        if(!err){
            res.render('officers_list', {
                data : data
            })
        }else{
            res.send(err)
        }
    })
}

const view_rejected_comp_list = async(req, res)=>{
    try {
        const jsonPath = 'C:/Users/DELL/Desktop/fir_registeration_sys/server/DummyAPI/pstations.json'
        const read = fs.readFile(jsonPath, 'utf-8', (err, data)=>{
            const contents = JSON.parse(data)
            const pstations = contents.police_stations;
            res.render('ad_fir_reviews', {
                pstations : pstations
            })
        })
            
    } catch (error) {
        console.log(error)
    }
}

const view_pstations = async(req, res)=>{
    try {
        const jsonPath = 'C:/Users/DELL/Desktop/fir_registeration_sys/server/DummyAPI/pstations.json'
        const read = fs.readFile(jsonPath, 'utf-8', (err, data)=>{
            const contents = JSON.parse(data)
            const pstations = contents.police_stations;
            res.render('list_pstations', {
                pstations : pstations
            })
        })
            
    } catch (error) {
        console.log(error)
    }
}


const pstation_firs = async(req, res)=>{
    // adminDist = 
    const pstation = await FIR.find({inc_pstation : req.params.name})
    res.send(pstation)
}

const pstation_complnts = async(req, res)=>{
    console.log(req.params.name)
    const pstation = await Complaint.find({inc_pstation : req.params.name})
    res.send(pstation)
}

const firsBy_officers = async(req, res)=>{
    console.log(req.params.id)
    FIR.find({officer_id:req.params.id}, (err, data)=>{
        res.send(data)
    })
}


const ad_pstation_reviews = async(req, res)=>{
    const params = req.params.name
    Review_FIR.find({inc_pstation : params}, (err,data)=>{
        res.send(data)
    })
}

const view_rejected_comp = async(req,res)=>{
    const params = req.params.name
    Reject_Comp.find({pstation : params}, (err,data)=>{
        res.send(data)
    })
}

const search_by_id = async(req, res)=>{
    try {
        const searchFor = req.body.searchFor
        const dist = req.body.dist
        const id = req.body.firId
        console.log(searchFor)
        console.log(id)
        console.log(dist)

        if(searchFor === 'Officer'){
            Police.find({$and :[{apointed_dist : dist},{_id:id}]}, (err, data)=>{
                if(data){
                    res.send(data)
                }else{
                    res.send("No such data")
                }
            })
        }
        if(searchFor === 'FIR'){
            FIR.find({$and :[{dist_incident : dist},{_id:id}]}, (err, data)=>{
                if(data){
                    res.send(data)
                }else{
                    res.send("No such data")
                }
            })
        }
        if(searchFor === 'Complaint'){
            try {
                Complaint.find({$and :[{dist_incident : dist},{_id:id}]}, (err, data)=>{
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


const search_evid_by_id = async(req, res)=>{
    try {
        const id = req.body.firId
        const new_evid = await Evidence.find({fir_id : id})
        const aprvd_evid = await Approved_Evid.find({fir_id : id})
        if(new_evid != null){
            res.send(new_evid)
        }
        if(aprvd_evid != null){
            res.send(aprvd_evid)
        }else{
            res.send("No such data")
        }
    } catch (error) {
        res.send(error)
    }
}



const view_evid = async(req, res)=>{
    try {
        const jsonPath = 'C:/Users/DELL/Desktop/fir_registeration_sys/server/DummyAPI/pstations.json'
        const read = fs.readFile(jsonPath, 'utf-8', (err, data)=>{
            const contents = JSON.parse(data)
            const pstations = contents.pstations;
            res.render('admin_evid', {
                pstations : pstations
            })
        })
    } catch (error) {
        res.send(error)
    }
}


const new_evid = async(req, res)=>{
    const pstation = req.params.pstation
    console.log(pstation)
    Evidence.find({fir_pstation : pstation}, (err, data)=>{
        res.send(data)
    })
}
const apprvd_evid = async(req, res)=>{
    try {
    const pstation = req.params.pstation
    console.log(pstation)
    Approved_Evid.find({fir_pstation : pstation}, (err, data)=>{
        res.send(data)
    })
    } catch (error) {
        res.send(error)
    }
}
const rej_evid = async(req, res)=>{
    try {
    const pstation = req.params.pstation
    console.log(pstation)
    Approved_Evid.find({fir_pstation : pstation}, (err, data)=>{
        res.send(data)
    })
    } catch (error) {
        res.send(error)
    }
}
export { ad_view_complaints, ad_view_firs, ad_view_complaint_status, ad_view_fir_reviews, ad_pstation_reviews, view_officers_list, view_rejected_comp_list, view_pstations, pstation_firs, pstation_complnts, firsBy_officers, view_rejected_comp, search_by_id, search_evid_by_id, view_evid, new_evid, apprvd_evid, rej_evid}
