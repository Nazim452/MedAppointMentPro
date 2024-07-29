import React from 'react'
import docImg from '../../src/data/doctor.jpg'

import "../styles/RegisterStyle.css"
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Form, Input, message } from 'antd'

import axios from 'axios';





import Layout from '../components/Layout';
const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onFinishHandler = async (value) => {

    try {
      dispatch(showLoading())

      const res = await axios.post('/api/v1/user/login', value);
      window.location.reload();   //relload karne par actual data aata tha is liye yaeh automatically once time reload kar dega>>>>
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login successfully");
        navigate('/')
      }
      else {
        message.error("Email or Password is invalid")
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log("Error While Logining", error);


    }
  }




  return (
    <Layout>
      <div className="form-container">
        <div className="form">
          <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
            <h1 className='heading'>Login Form</h1>


            <Form.Item
              className='email'
              style={{ color: 'red' }}

              label="Email" name="email">
              <Input
                className='login-input'

                type='email' required placeholder='Enter Your Email'></Input>
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type='password' required placeholder='Enter Your Password'></Input>
            </Form.Item>

            <Link to="/register" className='m-2'>Not a user Register here</Link>

            <button className='btn btn-primary' type='submit'>Login</button>

          </Form>
        </div>



        <div className="reg-info">

          <div className="info">

            <h1 className='auth-heading'>"Create Your Account and Take Control of Your Health"</h1>
            <h3 className='auth-heading1'>On-Demand Health, On Your Terms – Book Now, Thrive Later!</h3>
          
          </div>


          <div className='img-box' >
            <img className="img" src={docImg} alt="" />
          </div>

        </div>

      </div>







    </Layout>
  )
}

export default Login