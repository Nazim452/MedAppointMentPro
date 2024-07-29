const mongoose = require('mongoose');
// import nodemailer from 'nodemailer';
const nodemailer  = require('nodemailer');

const userSchema = new mongoose.Schema({
    name:{
        type:'String',
        required: true,
    },
    email:{
        type:'String',
        required: true,
    },
    password:{
        type:'String',
        required: true,
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    isDoctor:{
        type:Boolean,
        default: false
    },
    notification:{
        type:Array,
        default:[]
    },
    seennotification:{
        type:Array,
        default:[]
    },
})




userSchema.post("save", async function(doc){
    try {
        console.log("DOC--------------->>>>>>>>>>>>>",doc);
        //1st -- create Transpoter
        //shift all thi one in configure folder
        let transpoter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
               user: process.env.MAIL_USER, 
               pass:process.env.MAIL_PASS,

            },

        })

        //send mail

        try {
            let info = await transpoter.sendMail({
                from:`Nazim`,
                to:doc.email   ,                    // jo db me enry th usme mail bhi tha us mail ko bheja ja raha hia
                subject:"Welcome to MedAppointment Pro",
                html:`<h1>Founder of MedAppointment Pro - Nazim </h1><h2>Unlock Your potential today with MedAppointment Pro </h2>  <h3>Welcome to MedAppointment Pro, your personalized healthcare companion! 🩺✨ We're thrilled to have you join us on your journey to better health. With a focus on convenience and care, our app simplifies booking appointments with top doctors. Explore our features tailored just for you and experience the future of healthcare, curated by our founder, Nazim. Let's prioritize your well-being together!" </h3> `
            })
            console.log("INfo------------->>>>>>>>>>>>>",info);
            
        } catch (error) {
            console.log(error);
            console.error(error);
            console.log("Something Went Wrong While sending mail");
            
        }

       

        
    } catch (error) {
        console.error(error);
        console.log("Error while sending mail");
        
    }
})




const userModel = mongoose.model("users",userSchema);
module.exports =userModel;









