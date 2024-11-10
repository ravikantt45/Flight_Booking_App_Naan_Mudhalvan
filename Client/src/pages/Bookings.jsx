import React, { useEffect, useState } from 'react'
import '../styles/Bookings.css'
import axios from 'axios';

const Bookings = () => {


  const [bookings, setBookings] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(()=>{
    fetchBookings();
  }, [])

  const fetchBookings = async () =>{
    await axios.get('http://localhost:6001/fetch-bookings').then(
      (response)=>{
        setBookings(response.data.reverse());
      }
    )
  }
  const cancelTicket = async (id) =>{
    await axios.put(`http://localhost:6001/cancel-ticket/${id}`).then(
      (response)=>{
        alert("Ticket cancelled!!");
        fetchBookings();
      }
    )
  }

  return (
    <div className="user-bookingsPage">
      <h1>Bookings</h1>

      <div className="user-bookings">

        {bookings.filter(booking=> booking.user === userId).map((booking)=>{
          return(
            <div className="user-booking" key={booking._id}>
            <p><b>Booking ID:</b> {booking._id}</p>
            <span>
              <p><b>Mobile:</b> {booking.mobile}</p>
              <p><b>Email:</b> {booking.email}</p>
            </span>
            <span>
              <p><b>Flight Id:</b> {booking.flightId}</p>
              <p><b>Flight name:</b> {booking.flightName}</p>
            </span>
            <span>
              <p><b>On-boarding:</b> {booking.departure}</p>
              <p><b>Destination:</b> {booking.destination}</p>
            </span>
            <span>

              <div>
                <p><b>Passengers:</b></p>
                <ol>
                  {booking.passengers.map((passenger, i)=>{
                    return(
                      <li key={i}><p><b>Name:</b> {passenger.name},  <b>Age:</b> {passenger.age}</p></li>
                    )
                  })}
                </ol>
              </div>
              {booking.bookingStatus === 'confirmed' ? <p><b>Seats:</b> {booking.seats}</p> : ""}
              
            </span>
            <span>
              <p><b>Booking date:</b> {booking.bookingDate.slice(0,10)}</p>
              <p><b>Journey date:</b> {booking.journeyDate.slice(0,10)}</p>
            </span>
            <span>
              <p><b>Journey Time:</b> {booking.journeyTime}</p>
              <p><b>Total price:</b> {booking.totalPrice}</p>
            </span>
              {booking.bookingStatus === 'cancelled' ?
                <p style={{color: "red"}}><b>Booking status:</b> {booking.bookingStatus}</p>
                :
                <p><b>Booking status:</b> {booking.bookingStatus}</p>
              }
            {booking.bookingStatus === 'confirmed' ?
              <div>
                <button className="btn btn-danger" onClick={()=> cancelTicket(booking._id)}>Cancel Ticket</button>
              </div>
            
            :
            <></>}
          </div>
          )
        })}

          
      </div>
    </div>
  )
}

export default Bookings