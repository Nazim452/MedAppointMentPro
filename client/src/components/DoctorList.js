import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/HomeStyle.css'
const DoctorList = ({doctor}) => {

    const navigate = useNavigate();
  return (

    <>

    <div className="card m-2" 
    onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}
    style={{cursor: 'pointer'}}
     >
        <div className="card-header">
            Dr. {doctor.firstName} {doctor.lastName}
        </div>

        <div className="card-body">
            <p>
                <b className='text'>Specialization</b> <span className='value'>{doctor.specialization}</span>
            </p>
            <p>
                <b className='text'>Experience</b> <span  className='value'>{doctor.experience}</span>
            </p>
            <p>
                <b className='text'>Timings</b> <span  className='value'>{doctor.timings[0]} - {doctor.timings[1]}</span>
            </p>
            <p>
                <b className='text'>Fees Per Cunsaltation</b> <span  className='value'>{doctor.feesPerCunsaltation}</span>
            </p>
        </div>
    </div>
    </>
  )
}

export default DoctorList