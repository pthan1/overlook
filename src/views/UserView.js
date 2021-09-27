class UserView {
  constructor() {}

  displayUserBookings(userBookings) {
    userBookings.forEach(booking =>
      userBookingContainer.innerHTML += 
      `
      <div class="booking-card">
        <div class="room-image"></div>
        <div class="room-details">
          <p>${booking.room.roomType}</p>
          <p>${booking.date}</p>
          <p>Bed Size: ${booking.room.bedSize}</p>
          <p>Number of Beds: ${booking.room.numBeds}</p>
        </div>
        <div class="room-cost-book-btn">Cost Per Night: $ ${booking.room.costPerNight}</div>
      </div>
      `
    )
  } 
}



export default UserView;