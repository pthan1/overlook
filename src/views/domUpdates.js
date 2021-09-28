import { totalSpentHeader, app, userBookingContainer } from '../scripts'

const updateDom = {
  renderTotalCost(totalCost) {
    totalSpentHeader.innerHTML = "Total Spent on Bookings: $ " + totalCost.toFixed(2);
  },


  displayUserBookings(userBookings) {
    userBookings.forEach((booking) => {
      let bookingByRoomType = app.roomModel.find((hotelRoom) => { return hotelRoom.number === booking.roomNumber })

      userBookingContainer.innerHTML +=
        `
        <div class="booking-card">
          <div class="room-image"></div>
          <div class="room-details">
          <p>Date: ${booking.date}</p>
            <p>${bookingByRoomType.roomType}</p>
            <p>Bed Size: ${bookingByRoomType.bedSize}</p>
            <p>Number of Beds: ${bookingByRoomType.numBeds}</p>
          </div>
          <div class="room-cost-book-btn">Cost Per Night: $ ${bookingByRoomType.costPerNight}</div>
        </div>
        `;
    })
  }
}

export default updateDom;