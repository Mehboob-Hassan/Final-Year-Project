import express from 'express'
const router = new express.Router()
import { loginControll } from '../controllers/login_controller.js'
import { signupControll } from '../controllers/singup_controller.js'
import * as citizen from '../controllers/citizen_controller.js'
import * as police from '../controllers/police_controller.js'
import * as admin  from '../controllers/admin_controller.js'



/////

///

router.get('/', (req, res)=>{
    res.send("Hello Peeps")
})


   


router.post('/home', loginControll)
router.post('/signup', signupControll)
router.get('/home/ViewComplaints', police.viewComplaint)
router.get('/home/ViewFIRList', police.view_fir_list)
router.get('/home/FirResponse', police.fir_review_response)
router.get('/home/FirResponse/SubmitFir/:id', police.submit_fir)
router.get('/home/ViewComplaints/CreateFIR/:id', police.create_FIR)
router.get('/home/ViewComplaints/RejectionForm/:id', police.rejection_form)

router.get('/home/CitComplaintStatus/:id', citizen.view_complaint_status)
router.get('/home/viewFir/:id', citizen.view_fir)
router.get('/home/CitComplaintStatus/AcceptRes/:id', citizen.accept_review)
router.post('/home/CitComplaintStatus/RejectRes/', citizen.reject_review)

router.post('/home/ViewComplaints/RejectComp', police.reject_comp)

router.post('/home/ViewComplaints/CreateFIR/:id', police.review_FIR)

router.post('/home/Complaint', citizen.sub_complaint)

router.get('/home/SubmitEvidForm/:id', citizen.provide_evid_form)
router.get('/home/PolEvidForm/:id', police.pol_evid_form)

router.get('/home/ViewEvid', police.view_evid)
router.get('/home/ViewEvid/ApproveEvid/:id',  police.approve_evid_form)
router.get('/home/ViewEvid/RejectEvid/:id', police.reject_evid_form)

router.post('/home/ViewEvid/ViewApprovedEvid', police.view_approved_evid)
router.post('/home/PolSearchById', police.search_by_id)

// Admin Controller 
router.get('/home/AdminViewComplaints/:dist', admin.ad_view_complaints)
router.get('/home/AdminViewFIRs', admin.ad_view_firs)
router.get('/home/AdminComplaintStatus/', admin.ad_view_complaint_status)
router.get('/home/AdFIRReviews', admin.ad_view_fir_reviews)
router.get('/home/PoliceOfficers/:id', admin.view_officers_list)
router.get('/home/RejectedComplaintsList', admin.view_rejected_comp_list)
router.get('/home/PStations', admin.view_pstations)
router.get('/home/PStations/ViewFIRs/:name', admin.pstation_firs)
router.get('/home/PStations/ViewFIRReviews/:name', admin.ad_pstation_reviews)
router.get('/home/PStations/ViewComplaints/:name', admin.pstation_complnts)
router.get('/home/PoliceOfficers/OfficerFIRs/:id', admin.firsBy_officers)
router.get('/home/PStations/ViewRejectedComp/:name', admin.view_rejected_comp)
router.post('/home/SearchById', admin.search_by_id)
router.post('/home/Evidences/SearchEvidById', admin.search_evid_by_id)
router.get('/home/Evidences/:dist', admin.view_evid)
router.get('/home/Evidences/ViewEvid/:pstation', admin.new_evid)
router.get('/home/Evidences/ViewApprovedEvid/:pstation', admin.apprvd_evid)
router.get('/home/Evidences/ViewRejEvid/:pstation', admin.rej_evid)



export default router