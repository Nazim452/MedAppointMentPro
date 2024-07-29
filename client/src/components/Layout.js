
import React from 'react'
import { message, Badge } from 'antd';
import "../styles/LayoutStyle.css"
import { adminMenu, userMenu } from '../data/data'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "../styles/LayoutStyle.css"






const Layout = ({ children }) => {

  const location = useLocation();
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate();






 


  // redering menu list

  //handle logout

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout SuccessFully")
    navigate("/login");

  }

  let token = localStorage.getItem("token");
  




  return (
    <>




      <div className="main">
        <div className="layout">



          {/* <div className="sidebar">
            <div className="logo"><p className='app-name'>MEDAPPOINTMENT PRO</p></div>
            <hr />
            <div className="menu">
              {SideBarMenu.map(menu => {

                const isActive = location.pathname === menu.path
                return (
                  <>


                    <div key={menu.id}
                      className={`menu-item ${isActive && `active`}`}>
                      <i className={menu.icon}></i>

                      <Link to={menu.path}>

                        {menu.name}</Link>
                    </div>




                  </>
                )

              })}

              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>



            </div>
          </div> */}


          <div className="content">
            <div className="header">

              {/* <h2>"Your Health, Your Schedule – Seamless Appointments Anytime!"</h2> */}





              <div className="header-nav">
                <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                  <div className="container-fluid ">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                      <Link to="/" className="navbar-brand" > Dr Appointment App</Link>
                      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">







                        <li className="nav-item ">
                          <NavLink to="/" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item ">
                          <NavLink to="/about" className="nav-link">About</NavLink>
                        </li>

                        {
                         !user?.isAdmin && !user?.isDoctor && <li className="nav-item ">
                            <NavLink to="/user-appointments" className="nav-link">Appointments</NavLink>
                          </li>
                        }

                        {
                          user?.isDoctor&&<li className="nav-item ">
                          <NavLink to="/doctor-appointments" className="nav-link">Appointments</NavLink>
                        </li>
                        }

                        {
                           !user?.isAdmin && <li className="nav-item ">
                            <NavLink to="/apply-doctor" className="nav-link">Apply Doctor</NavLink>
                          </li>
                        }


                        {/* const SideBarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
      ? doctorMenu
      : userMenu; */}

                        <li className="nav-item dropdown">
                          {
                            token && <Link
                              to={"/"}

                              className="nav-link dropdown-toggle"
                              data-bs-toggle="dropdown" >
                              Dashboard
                            </Link>
                          }

                          <ul className="dropdown-menu">
                            {
                              user?.isAdmin &&
                              <li> <Link className='dropdown-item' to={"/admin/doctors"}>All Doctor</Link></li>
                            }

                            {
                              user?.isAdmin && <li> <Link className='dropdown-item' to={"/admin/users"}>All User</Link></li>
                            }
                            {
                              user?.isDoctor && !user?.isAdmin&&<li> <Link className='dropdown-item'to={`/doctor/profile/${user?._id}`}>Your Profile</Link></li>
                            }
                          


                            {
                                 <button

                                className='btn btn-danger logout-button'
                                onClick={handleLogout}>
                                Logout
                              </button>
                            }



                          </ul>
                        </li>



                        {
                          !token ? (<> <li className="nav-item">
                            <NavLink to="/register" className="nav-link" >Register</NavLink>
                          </li>
                            <li className="nav-item">
                              <NavLink to="/login" className="nav-link" >Login</NavLink>
                            </li></>) :

                            (<>

                            </>
                            )
                        }


                      </ul>
                      <div className="header-content" style={{ cursor: 'pointer' }}>
                        <Badge className="" count={user && user.notification.length} onClick={() => { navigate('/notification') }}
                        // 


                        >

                        </Badge>
                        <span className='bell'><i className='fa-solid fa-bell' onClick={() => navigate('/notification')}></i></span>
                       {
                        user?.isDoctor&& <Link to={`/doctor/profile/${user?._id}`} className='username'>{user?.name}</Link>
                       }
                       {
                        !user?.isAdmin&& !user?.isDoctor&& <Link to={'/'}className='username'>{user?.name}</Link>
                       }

                      </div>

                    </div>
                  </div>
                </nav >
              </div>












            </div>
            <div className="body">{children}</div>
          </div>



        </div>
      </div>



    </>
  )
}

export default Layout







