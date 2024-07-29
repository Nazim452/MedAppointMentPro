import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import '../styles/AboutStyle.css'
import car1 from '../images/d1.jpg'
import car2 from '../images/d2.jpg'
import car3 from '../images/d3.jpg'
import car4 from '../images/d4.jpg'
import { FaArrowAltCircleRight } from "react-icons/fa";



const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Array of images
  const images = [car1, car2, car3, car4];

  // Function to handle slide change
  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  // Effect to automatically slide to the next image
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the index of the next slide
      const nextIndex = (activeIndex + 1) % images.length;
      // Update the active slide index
      setActiveIndex(nextIndex);
    }, 3000); // Adjust the interval (in milliseconds) as needed

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [activeIndex, images.length]);
  return (
    <Layout>
      <h1 className='about-heading'> Welcome to MedAppointment Pro</h1>


      <div id="carouselExampleCaptions" className="carousel slide mt-50">
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}

              type="button"
              onClick={() => handleSlideChange(index)}
              className={index === activeIndex ? "active" : ""}
              aria-current={index === activeIndex ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div key={index} className={`carousel-item ${index === activeIndex ? "active" : ""}`}>

              <img
                height={500}
                style={{ backgroundSize: 'cover' }}

                src={image} className="d-block w-100" alt={`Slide ${index + 1}`} />
              <div className="carousel-caption d-none d-md-block">
                <h5>{`MedAppointment Pro Slide  ${index + 1} label`}</h5>

                {index == 0 && <p className='slider-p'>Empowering Health, One Appointment at a Time.</p>}
                {index == 1 && <p className='slider-p' >Your Personal Healthcare Assistant.</p>}
                {index == 2 && <p className='slider-p'>Efficient Healthcare Starts Here.</p>}
                {index == 3 && <p className='slider-p'>Connecting Patients and Providers for Better Healthcare..</p>}
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" onClick={() => handleSlideChange((activeIndex - 1 + images.length) % images.length)}>
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" onClick={() => handleSlideChange((activeIndex + 1) % images.length)}>
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>






      <h3 className='about-h'> <FaArrowAltCircleRight className='about-icon' />
        Streamlining Your Healthcare Experience</h3>
      <p className='about-p'>
        At MedAppointment Pro, we believe that managing your healthcare schedule should be simple and stress-free. With our intuitive platform, patients and doctors alike can easily book and manage appointments, saving time and ensuring efficient healthcare delivery.</p>

      <h3 className='about-h'  >  <FaArrowAltCircleRight className='about-icon' /> For Patients:</h3>
      <p className='about-p'>
        Say goodbye to the frustration of long wait times and complicated appointment scheduling. MedAppointment Pro empowers you to take control of your health journey with ease. Browse through a diverse range of healthcare providers and specialties, choose convenient appointment times, and receive timely reminders to keep you on track. With our user-friendly interface, managing your appointments has never been easier. Spend less time worrying about scheduling and more time focusing on your health.</p>

      <h3 className='about-h'>  <FaArrowAltCircleRight className='about-icon' /> Key Features for Patients:</h3>

      <p className='about-p'>  Browse & Book: Explore a comprehensive list of healthcare providers and specialties, and book appointments with just a few taps.
        Convenient Reminders: Receive timely appointment reminders to help you stay organized and never miss an appointment.
        Flexible Management: Easily reschedule or cancel appointments as needed, all from the palm of your hand.
        For Doctors:</p>



      <h3 className='about-h'>     <FaArrowAltCircleRight className='about-icon' />   Key Features for Doctors:
      </h3>
      <p className='about-p'> Effortless Scheduling: Manage your appointment schedule seamlessly, avoiding double bookings and scheduling conflicts.
        Customizable Availability: Set your availability and block out time for breaks or emergencies with ease.
        Instant Notifications: Receive real-time notifications for new appointment requests and changes, ensuring you stay informed and organized.
        Join Us Today:</p>











    </Layout>
  )
}

export default About