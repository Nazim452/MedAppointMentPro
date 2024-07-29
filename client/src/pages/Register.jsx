import React from 'react'
import { Form, Input,message } from 'antd'
import "../styles/RegisterStyle.css"
import {useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import docImg from '../../src/data/doctor.jpg'
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import Layout from '../components/Layout';




const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //form handler - form submit karne par value me all data aa jyega
    const onFinishHandler = async(value)=>{

        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/register',value);
            dispatch(hideLoading())
            if(res.data.success){
                message.success("Successfully registered")
                navigate("/login");
            }
            else{
                message.error(res.data.message)
            }
            
        } catch (error) {
            dispatch(hideLoading())

            console.log("Error in Register UI form",error);
            message.error("Something went wrong While registering")
            
        }
      
       
    }




  return (
    <Layout>
    <div className="form-container">
      <div className="form reg">
      <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
        <h1 className='heading'>Register Form</h1>

      
       <Form.Item label ="Name" name="name" className='nazim-item'>
            <Input type='text' placeholder='Enter Your name' className='place'></Input>
        </Form.Item>
       
        <Form.Item label ="Email" name="email">
            <Input type='email' required placeholder='Enter Your Email' className='place'></Input>
        </Form.Item>
        <Form.Item label ="Password" name="password">
            <Input type='password' required placeholder='Enter Your Password' className='place'></Input>
        </Form.Item>
      
        <Link to="/login" className='m-2'>Already user Login here</Link>

        <button className='btn btn-primary' type='submit'>Register</button>

       </Form>
      
       
      </div>

      <div className="reg-info">

        <div className="info">

            <h1 className='auth-heading'>"Create Your Account and Take Control of Your Health"</h1>
            <h3 className='auth-heading1'>On-Demand Health, On Your Terms – Book Now, Thrive Later!</h3>
           

        </div>


        <div className='img-box' >
            <img  className="img" src={docImg} alt="" />
        </div>

      </div>
    </div>





   

  
    </Layout>
  )
}

export default Register