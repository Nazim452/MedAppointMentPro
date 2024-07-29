import React from 'react'
import Layout from './../components/Layout'
import { Tabs, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {hideLoading,showLoading} from '../redux/features/alertSlice'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import '../styles/NotificationPage.css';
const NotificationPage = () => {
    const {user} = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    //handle read notification

    const handleMarkAllRead=async()=>{
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/get-all-notification',{userId:user._id},
            {

                //Hame token dena parega kyki  userRoutes ke ander line 29 par hamne authMiddleWare bhi pass kiya hai - to auth middleWare ke liye hame token chahiyes
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(hideLoading());

            if(res.data.success){
                window.location.reload(); 
                message.success(res.data.message);
            }
            else{
                message.error(res.data.message);
            }
            
            
        } catch (error) {
            dispatch(hideLoading());

            console.log("Error in handleMarkAllRead",error);
            message.error("Something went wrong")

            
        }

    }
    
    
    
    //delete notification----SOme error_____________________


  
    const handleDeleteAllRead=async(req,res)=>{
        try {
            dispatch(showLoading());
            // userId - passed in controller
            const res = await axios.post('/api/v1/user/delete-all-notification',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                },

            })
            dispatch(hideLoading())

            if(res.data.success) {
                window.location.reload(); 
                message.success("All messages have been deleted successfully");
            }
            else{
                message.error = res.data.message;
            }
            
        } catch (error) {
            dispatch(hideLoading())
            console.log("Error in handleDeleteAllRead",error);
            message.error("Error in handleDeleteAllRead")
            
        }

    }


  return (

    <Layout >
        <h2 className='heading'>Notification Page</h2>
        <div className="notification-page">
        <Tabs className="">
            <Tabs.TabPane tab="UnRead" key={0}>
                <div className="d-flex justify-content-end">
                    <h3 className='p-2 text-primary icon' onClick={handleMarkAllRead} style={{cursor:'pointer'}}>Mark All Read
                    <span className="icon"> <i className="fa-solid fa-check-double" ></i></span>
                    </h3>
                   
                </div>


                {
                    user?.notification.map((notificationMgs,index)=>(
                        <div 
                        key={index}
                        className=""  style={{cursor:'pointer'}} >
                            <div className="notification-msg"  onClick={()=>navigate(notificationMgs.onClickPath)}>{notificationMgs.message}</div>
                        </div>  //ApplyDoctor Controller me jo onclickPAth router hai us par jayega
                        
                    ))
                }
            </Tabs.TabPane>








            <Tabs.TabPane tab="Read" key={1}>
                <div className="d-flex justify-content-end">
                    <h3 className='p-2 text-primary  '  style={{cursor:'pointer'}} onClick={handleDeleteAllRead}>Delete All Read
                    <i className="fa-solid fa-delete-left"></i></h3>
                </div>

              
                {
                    user?.seennotification.map((notificationMgs)=>(
                        <div className=""  style={{cursor:'pointer'}} >
                            <div className="notification-msg"  onClick={()=>navigate(notificationMgs.onClickPath)}>{notificationMgs.message}</div>
                        </div>  //ApplyDoctor Controller me jo onclickPAth router hai us par jayega
                        
                    ))
                }
            </Tabs.TabPane>
        </Tabs>

        </div>

    </Layout>
  )
}

export default NotificationPage