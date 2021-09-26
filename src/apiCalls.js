const db = {

  // in userModel.js
  getAllCustomers() {
    return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
  },

  // in UserModel.js
  getSingleCustomer(userId) {
    return fetch('http://localhost:3001/api/v1/customers/' + userId)
      .then(response => response.json())
      .then(data => data)
      .catch(err => console.log(err));
  },
  
  // in BookingModel.js
  getAllRooms () {
   return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
    .then(data => data.rooms)
    .catch(err => console.log(err));
  },
  
  // in BookingModel.js
  getAllBookings() {
    return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
    .then(data => data.bookings)
    .catch(err => console.log(err));
  },

  // in BookingModel.js
  addNewBooking(booking) {
    return fetch('http://localhost:3001/api/v1/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err))
  },

  // in BookingModel.js
  deleteSingleBooking(bookingId) {
    return fetch(`http://localhost:3001/api/v1/bookings/${bookingId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
  }
}

export default db;
