import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Col, Form, Row, Input, TimePicker, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
const UserProfile = () => {
    const [userdata,setUserdata]= useState(null);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user)




    const handleFinish = async (values) => {
        try {
          dispatch(showLoading());
          const res = await axios.post(
            "/api/v1/user/profile",
            {
              ...values,
              userId: user._id,
              
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (res.data.success) {
            message.success(res.data.message);
            navigate("/");
          } else {
            message.error(res.data.success);
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
          message.error("Somthing Went Wrrong ");
        }
      };



    const getUserInfo = async () => {
        try {
          // params.id(jo hamne app.js ke colon me id provide kiya tha wo lw rah ahu)----------------Taking id from the params_
          const res = await axios.post('/api/v1/user/getUserInfo', { userId: params.id }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          if (res.data.success) {
            setUserdata(res.data.data)
          }
        } catch (error) {
          console.log("Error in getUserInfo in pRofile.js", error);
    
        }
      }
    
      useEffect(() => {
      getUserInfo();
    
      }, []);





  return (
    <Layout>
         <div className="profile">
      {userdata && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...user,
           
          }}
        >
          <h4 className="fs-4 text-center">Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                
                <Input type="email" placeholder="your email address" />
              </Form.Item>
            </Col>
           
          </Row>
          <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
          
         
        </Form>
      )}
      </div>


        
    </Layout>
  )
}

export default UserProfile