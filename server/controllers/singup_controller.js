import { Admin, Police, Citizen } from '../models/schema.js'
const signupControll = async (req, res) => {
    try {
        const reqBody = req.body
        if (reqBody.passw === reqBody.c_passw){
            if (reqBody.role === 'admin') {

                const addadmin = new Admin(
                {
                    "role" : reqBody.role,
                    "cnic" : reqBody.cnic,
                    "full_name" : reqBody.full_name,
                    "father_name" :  reqBody.father_name,
                    "cast" : reqBody.cast,
                    "email" : reqBody.email,
                    "city" :  reqBody.city,
                    "postal_addr" : reqBody.postal_addr,
                    "perm_addr" : reqBody.perm_addr,
                    "zip" : reqBody.zip,
                    "passw" : reqBody.passw,
                    "c_passw" : reqBody.c_passw
                })
 
                const insertRecord = await addadmin.save()
                    .then(() => {
                        res.render('index')
                        console.log("admin Added")
                    }).catch((err) => {
                        res.send(err)
                    })
            }

            else if (reqBody.role === 'police') {
                try {
                    const addpolice = new Police(
                        {

                        "role" : reqBody.role,
                        "cnic" : reqBody.cnic,
                        "full_name" : reqBody.full_name,
                        "father_name" :  reqBody.father_name,
                        "cast" : reqBody.cast,
                        "email" : reqBody.email,
                        "city" :  reqBody.city,
                        "postal_addr" : reqBody.postal_addr,
                        "perm_addr" : reqBody.perm_addr,
                        "zip" : reqBody.zip,
                        "passw" : reqBody.passw,
                        "c_passw" : reqBody.c_passw
                    }
                )
                    
                    const insertRecord = await addpolice.save().then(() => {
                        res.render('index')
                        console.log("police Added")
                    })
                } catch (error) {
                    console.log(error)
                }
                }
                    

                else if (reqBody.role === 'citizen') {
                    console.log(reqBody)
                    try {
                        const addCitizen = new Citizen(
                            {
                            "role" : reqBody.role,
                            "cnic" : reqBody.cnic,
                            "full_name" : reqBody.full_name,
                            "father_name" :  reqBody.father_name,
                            "cast" : reqBody.cast,
                            "email" : reqBody.email,
                            "city" :  reqBody.city,
                            "postal_addr" : reqBody.postal_addr,
                            "perm_addr" : reqBody.perm_addr,
                            "zip" : reqBody.zip,
                            "passw" : reqBody.passw,
                            "c_passw" : reqBody.c_passw
                    }
                )

                
                    await addCitizen.save().then(() => {
                       console.log("citizen added")
                    })
                

                
                
                } catch (error) {
                            res.send("there is an error in catch")
                }
            
        }else{
            console.log("failed to Post")
        }
                    
                    
    }else{
        res.status(400).send("Confirm Password is not matching with Password")
    }
    } catch (error) {
        res.sendStatus(400).send(error)
    }
}


export { signupControll }