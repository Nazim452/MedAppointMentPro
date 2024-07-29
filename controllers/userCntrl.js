const userModel = require('../models/userModels')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const doctorModel = require('../models/doctorModel')
const appointmentModel = require('../models/appointmentModel')
const moment = require('moment');



//Register
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email })
    if (existingUser) {
      console.log("User already registered");
      return res.status(400).json({
        success: false,
        message: "User already registered"
      })
    }
    

    const passWord = req.body.passWord;


    const newUSer = new userModel(req.body);
    await newUSer.save();
    res.status(200).send({
      success: true,
      message: "User saved successfully"
    })


  } catch (error) {
    console.log("Error in RegisterController", error);
    res.status(500).send({
      success: false,
      message: error.message

    })

  }

}



const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found");
      return res.status(200).send({
        message: "User not found",
        success: false
      })
    }

    // TODO_____________________________________Bcrypt.compare  karna hai ________

    if (user.password != req.body.password) {
      console.log("Email or password incorrect");
      return res.status(200).send({
        success: false,
        message: "Invalid password or Email",
      })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    return res.status(200).json({ message: "Login successful", success: true, token })




  } catch (error) {
    console.log("Error in loginController");
    console.log(error);
    return res.status(500).json({ success: false, message: error.message })

  }
}


const authController = async (req, res) => {
  try {

    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({

        message: 'User not found',
        success: false,
      })
    }
    else {
      res.status(200).send({
        success: true,
        // data:{
        //     name:user.name,
        //     email:user.email
        // },
        data: user


      })
    }


  } catch (error) {
    console.log("Error in USeCntrl ke auth Controller me", error);
    res.status(500).send({
      success: false,
      message: "auth Error",
      error
    })

  }
}


// APpply DOctor CTRL
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser?.notification;
    notification?.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/docotrs",
      },
    });
    await userModel.findByIdAndUpdate(adminUser?._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};




//notification ctrl
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};



// delete notifications
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
}


// get All Doct Controllers

const getAllDoctorController = async (req, res) => {
  try {
    // status of doctor:'approved' -  hai tab hi use show karn ahai
    const doctors = await doctorModel.find({ status: 'approved' });
    res.status(200).send({
      success: true,
      message: 'Doctor List fetched successfully',
      data: doctors,
    })

  } catch (error) {
    console.log("Error in getAll Doctor Controller", error);
    res.status(500).send({
      success: false,
      message: "unable to get all Doctor List",
      error,
    });

  }
}



const bookAppointmentController = async (req, res) => {
  try {
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new Appointment Request from ${req.body.userInfo.name}`,
      onCLickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};



const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};


const userAppointmentsController = async(req,res)=>{
  try {
    const appointments  = await appointmentModel.find({userId:req.body.userId});
    res.status(200).send({
      success: true,
      message:"Users Appointments fetch successfully",
      data:appointments,
    })
    
  } catch (error) {
    console.log("Error n user Appointment Controller",error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in user  Appointment controller",
    });
    
  }

}



const getUserInfo=async(req,res)=>{

  try {
      const doctor = await userModel.findOne({userId:req.body.userId});
      res.status(200).send({
          success: true,
          message: "User data fetched successfully",
          data: doctor,
        });
      
  } catch (error) {
      console.log("Error in getDuserInfoController",error);
      res.status(500).send({
          message: "Error in fetching user details getDoctorInfoController",
          success: false,
          error,
        });
      
  }

  }



module.exports = {
  loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorController,
  bookAppointmentController,
  userAppointmentsController,
  bookingAvailabilityController,

  getUserInfo
}















