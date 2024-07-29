import React, { useEffect } from 'react'
import axios from 'axios';
import Layout from '../components/Layout'
import { useState } from 'react';
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';
import '../styles/HomeStyle.css';
import logo from '../images/DoctorLogo.png';
const HomePage = () => {


  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {


    try {
      const res = await axios.get("/api/v1/user/getAllDoctor"
        , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  //taking data from the token of localStorage
          },
        });
      if (res.data.success) {
        setDoctors(res.data.data);
      }

    } catch (error) {
      console.log("Error in fetching Get All docotr list in HomePage.jsx", error);

    }

  };
  useEffect(() => {
    getUserData();

  }, [])



  return (
    <Layout>



      <div className="wrapper">

        <div className='logo-img'>
          <img  className="logoimg"src={logo} alt=""  /></div>
        <p className='img-p'>Your Health , Your Time - Appointment Excellence Unleashed!</p>


        <div className="doc-book doct-head img-p">
          <p>Click on the doctor You want to see and book Your appointment now!</p>

        </div>









        <div className="doctor-table">
          <Row className='doc-table'>

            {doctors && doctors.map((doctor, index) =>
              <DoctorList doctor={doctor} key={index} />

            )}

          </Row>
        </div>
      </div>









      {/* <h1 className='text-center'> Home Page</h1>
       <Row>

        {doctors && doctors.map((doctor)=>
          <DoctorList  doctor={doctor}/>

        )}

       </Row> */}
    </Layout>

  )
}

export default HomePage