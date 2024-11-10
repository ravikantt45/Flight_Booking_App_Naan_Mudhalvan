import React, { useEffect, useState } from 'react'
import '../styles/NewFlight.css'
import axios from 'axios';

const NewFlight = () => {


    const [userDetails, setUserDetails] = useState();

    useEffect(()=>{
      fetchUserData();
    }, [])

    const fetchUserData = async () =>{
      try{
        const id = localStorage.getItem('userId');
        await axios.get(`http://localhost:6001/fetch-user/${id}`).then(
          (response)=>{
            setUserDetails(response.data);
            console.log(response.data);
          }
        )

      }catch(err){

      }
    } 



    const [flightName, setFlightName] = useState(localStorage.getItem('username'));

    const [flightId, setFlightId] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [startTime, setStartTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [totalSeats, setTotalSeats] = useState(0);
    const [basePrice, setBasePrice] = useState(0);
  
    const handleSubmit = async () =>{
  
      const inputs = {flightName, flightId, origin, destination, 
                        departureTime: startTime, arrivalTime, basePrice, totalSeats};
  
      await axios.post('http://localhost:6001/add-Flight', inputs).then(
        async (response)=>{
          alert('Flight added successfully!!');
          setFlightName('');
          setFlightId('');
          setOrigin('');
          setStartTime('');
          setArrivalTime('');
          setDestination('');
          setBasePrice(0);
          setTotalSeats(0);
        }
      )
  
    }
  
    
  
  
    return (
      <div className='NewFlightPage'>


        {userDetails ?
        <>
          {userDetails.approval === 'not-approved' ?
            <div className="notApproved-box">
              <h3>Approval Required!!</h3>
              <p>Your application is under processing. It needs an approval from the administrator. Kindly please be patience!!</p>
            </div>


          : userDetails.approval === 'approved' ?

              <div className="NewFlightPageContainer">
  
                  <h2>Add new Flight</h2>
                
                <span className='newFlightSpan1'>
                  <div className="form-floating mb-3">
                          <input type="text" className="form-control" id="floatingInputemail" value={flightName} onChange={(e)=> setFlightName(e.target.value)} disabled />
                          <label htmlFor="floatingInputemail">Flight Name</label>
                    </div>
                    <div className="form-floating mb-3">
                          <input type="text" className="form-control" id="floatingInputmobile" value={flightId} onChange={(e)=> setFlightId(e.target.value)} />
                          <label htmlFor="floatingInputmobile">Flight Id</label>
                    </div>
                </span>
                <span>
                <div className="form-floating">
                    <select className="form-select form-select-sm mb-3" aria-label=".form-select-sm example" value={origin} onChange={(e)=> setOrigin(e.target.value)} >
                      <option value="" selected disabled>Select</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Banglore">Banglore</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Indore">Indore</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Pune">Pune</option>
                      <option value="Trivendrum">Trivendrum</option>
                      <option value="Bhopal">Bhopal</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="varanasi">varanasi</option>
                      <option value="Jaipur">Jaipur</option>
                    </select>
                    <label htmlFor="floatingSelect">Departure City</label>
                  </div>
                    <div className="form-floating mb-3">
                          <input type="time" className="form-control" id="floatingInputmobile" value={startTime} onChange={(e)=> setStartTime(e.target.value)} />
                          <label htmlFor="floatingInputmobile">Departure Time</label>
                    </div>
                </span>
                <span>
                    <div className="form-floating">
                      <select className="form-select form-select-sm mb-3" aria-label=".form-select-sm example" value={destination} onChange={(e)=> setDestination(e.target.value)} >
                        <option value="" selected disabled>Select</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Banglore">Banglore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Indore">Indore</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Pune">Pune</option>
                        <option value="Trivendrum">Trivendrum</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="varanasi">varanasi</option>
                        <option value="Jaipur">Jaipur</option>
                      </select>
                      <label htmlFor="floatingSelect">Destination City</label>
                    </div>
                    <div className="form-floating mb-3">
                          <input type="time" className="form-control" id="floatingInputArrivalTime" value={arrivalTime} onChange={(e)=> setArrivalTime(e.target.value)} />
                          <label htmlFor="floatingInputArrivalTime">Arrival time</label>
                    </div>
                </span>
                <span className='newFlightSpan2'>
                  <div className="form-floating mb-3">
                          <input type="number" className="form-control" id="floatingInpuSeats" value={totalSeats} onChange={(e)=> setTotalSeats(e.target.value)} />
                          <label htmlhtmlFor="floatingInpuSeats">Total seats</label>
                    </div>
                    <div className="form-floating mb-3">
                          <input type="number" className="form-control" id="floatingInputBasePrice" value={basePrice} onChange={(e)=> setBasePrice(e.target.value)} />
                          <label htmlhtmlFor="floatingInputBasePrice">Base price</label>
                    </div>
                </span>
                
                <button className='btn btn-primary' onClick={handleSubmit}>Add now</button>
              </div>

          :
            ""
          }
        </>
      :
       ""
      }
  
        
      </div>
    )
  }

export default NewFlight