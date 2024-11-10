import React, { useEffect, useState } from 'react'
import '../styles/Admin.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Admin = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setbookingCount] = useState(0);
  const [flightsCount, setFlightsCount] = useState(0);


  useEffect(()=>{

    fetchData();
  }, [])

  const fetchData = async () =>{
    await axios.get('http://localhost:6001/fetch-users').then(
      (response)=>{
        
        setUserCount(response.data.length -1);
        setUsers(response.data.filter(user => user.approval === 'not-approved'));
      }
    );
    await axios.get('http://localhost:6001/fetch-bookings').then(
      (response)=>{
        setbookingCount(response.data.length);
      }
    );
    await axios.get('http://localhost:6001/fetch-flights').then(
      (response)=>{
        setFlightsCount(response.data.length);
      }
    );
  }



  const approveRequest = async (id) =>{
      try{

          await axios.post('http://localhost:6001/approve-operator', {id}).then(
            (response)=>{
              alert("Operator approved!!");
              fetchData();
            }
          )

      }catch(err){

      }
  }

  const rejectRequest = async (id) =>{
    try{

      await axios.post('http://localhost:6001/reject-operator', {id}).then(
        (response)=>{
          alert("Operator rejected!!");
          fetchData();
        }
      )

    }catch(err){

    }
  }

  return (
    <>

      <div className="admin-page">

        <div className="admin-page-cards">

            <div className="card admin-card users-card">
                <h4>Users</h4>
                <p> {userCount} </p>
                <button className="btn btn-primary" onClick={()=>navigate('/all-users')}>View all</button>
            </div>

            <div className="card admin-card transactions-card">
                <h4>Bookings</h4>
                <p> {bookingCount} </p>
                <button className="btn btn-primary" onClick={()=>navigate('/all-bookings')}>View all</button>
            </div>

            <div className="card admin-card deposits-card">
                <h4>Flights</h4>
                <p> {flightsCount} </p>
                <button className="btn btn-primary" onClick={()=>navigate('/all-flights')}>View all</button>
            </div>


        </div>

        <div className="admin-requests-container">

            <h3>New Operator Applications</h3>

            <div className="admin-requests">

              {
                users.length === 0 ?
                  <p>No new requests..</p>
                :
                  <>
                  {users.map((user)=>{
                    return(
                      <div className="admin-request" key={user._id}>
                        <span><b>Operator name: </b> {user.username}</span>
                        <span><b>Operator email: </b> {user.email}</span>
                        <div className="admin-request-actions">
                          <button className='btn btn-primary' onClick={()=> approveRequest(user._id)}>Approve</button>
                          <button className='btn btn-danger' onClick={()=> rejectRequest(user._id)}>Reject</button>
                        </div>
                      </div>
                    )
                  })}
                  </>

              }


            </div>

        </div>

    </div>
    
    </>
  )
}

export default Admin