import { Admin, Police, Citizen } from '../models/schema.js'

const loginControll = async(req, res)=>{
    const role = req.body.role
    const email = req.body.email
    const passw = req.body.passw
    

    

    // If login role is Admin
    if(role === 'admin'){
        try {  
            const userAcnt = await Admin.findOne({email:email})
            const userRole = await Admin.findOne({role:role})
            if(userAcnt && userRole){
                if(userAcnt.passw === passw){
                    res.status(200).json()
                }else{
                    res.status(402).json()
                }
            }else{
                res.status(404).json()
            }
        }catch (error) {
            res.status(404).json()
        }
    }


    // If login role is Police
    else if(role === 'police'){
        try {  
            const userAcnt = await Police.findOne({email:email})
            const userRole = await Police.findOne({role:role})
            if(userAcnt && userRole){
                if(userAcnt.passw === passw){
                    res.status(200).json()
                }else{
                    res.status(402).json()
                }
            }else{
                res.status(402).json()
            }
        }catch (error) {
            res.status(402).json()
        }

    }

    // If login role is Citizen
    else if(role === 'citizen'){
        
        try {  
            const userAcnt = await Citizen.findOne({email:email})
            const userRole = await Citizen.findOne({role:role})
            if(userAcnt && userRole){
                if(userAcnt.passw === passw){
                    res.status(200).json({message: "Front end data"})
                    
                }else{
                    res.status(402).json({message: "Hello"})
                    console.log("wrong credentials bro")
                    // res.send("wrong Credentials")
                }
            }else{
                res.status(402).json()
                // res.send("wrong Credentials")
            } 
        }catch (error) {
            res.status(402).json()
            // res.send("wrong Credentials")
        }
    }else{
        res.status(402).json()
    }

}


export { loginControll }