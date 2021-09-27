class UserView {
  constructor() {}

  displayUserBookings(userBookings) {
   userBookings.forEach(booking =>
    bookingsDisplay.innerHTML += `
    ${booking.date}
    ${booking.roomNumber}
    ${booking.room.roomType}
    ${booking.room.bedSize}
    ${booking.room.numBeds}
    ${booking.room.costPerNight}
    `
    )
  } 
}



export default UserView;