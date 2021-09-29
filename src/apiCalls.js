import UserController from "./controllers/UserController";
import { allBookings, app } from "./scripts";

export const db = {

  // in userModel.js
  getAllCustomers() {
    return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json())
    .then(data => data.customers);
  },
  
  // in BookingModel.js
  getAllRooms () {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
    .then(data => data.rooms);
  },
  
  // in BookingModel.js
  getAllBookings() {
    return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
    .then(data => data.bookings);
  },

  // in BookingModel.js
  addNewBooking(booking) {
    let newBooking;
    return fetch('http://localhost:3001/api/v1/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(resp => newBooking = resp.newBooking);
},

  // in BookingModel.js
  deleteSingleBooking(bookingId) {
    return fetch(`http://localhost:3001/api/v1/bookings/${bookingId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          console.log(`HTTP error! status: ${response.status}`)
        }
        response.json()
      })
    .then(data => data);
  }
}

export default db;
