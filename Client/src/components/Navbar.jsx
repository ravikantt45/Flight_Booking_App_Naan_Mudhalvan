import React, { useContext } from 'react'
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const Navbar = () => {

    const navigate = useNavigate();
    const usertype = localStorage.getItem('userType');

    const {logout} = useContext(GeneralContext);

  return (
    <>
        <div className="navbar">

        {!usertype ? 
        
            <>
                <h3 >SB Flights</h3>

                <div className="nav-options" >
                    <p onClick={()=>navigate('/')}>Home</p>
                    <p onClick={()=>navigate('/auth')}>Login</p>
                </div>
            
            </>
        :
        
        <>
        {usertype === 'customer' ? 
        
        <>
            <h3 >SB Flights</h3>

            <div className="nav-options" >

                <p onClick={()=>navigate('/')}>Home</p>
                <p onClick={()=>navigate('/bookings')}>Bookings</p>
                <p onClick={logout}>Logout</p>

            </div>
        </>
            :  usertype === 'admin' ?

                    <>
                        <h3 >SB Flights (Admin)</h3>
                        <div className="nav-options" >

                            <p onClick={()=>navigate('/admin')}>Home</p>
                            <p onClick={()=>navigate('/all-users')}>Users</p>
                            <p onClick={()=>navigate('/all-bookings')}>Bookings</p>
                            <p onClick={()=>navigate('/all-flights')}>Flights</p>
                            <p onClick={logout}>Logout</p>
                        </div> 
                    </>
            
                : usertype === 'flight-operator' ?
                    <>
                        <h3 >SB Flights (Operator)</h3>
                        <div className="nav-options" >

                            <p onClick={()=>navigate('/flight-admin')}>Home</p>
                            <p onClick={()=>navigate('/flight-bookings')}>Bookings</p>
                            <p onClick={()=>navigate('/flights')}>Flights</p>
                            <p onClick={()=>navigate('/new-flight')}>Add Flight</p>
                            <p onClick={logout}>Logout</p>
                        </div> 
                    </>
            
                :

                    ""

        }
        </>
        }
        </div>
    
    </>
  )
}

export default Navbar