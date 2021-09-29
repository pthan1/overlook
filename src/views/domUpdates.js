import { totalSpentHeader, app, userBookingContainer, noResultsFoundSection, searchResultsSection, hide, newDate} from '../scripts'

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
  },

  displaySearchResults(filteredRooms) {
    searchResultsSection.innerHTML = '';

    if (filteredRooms.length > 0) {
      hide(noResultsFoundSection);
      filteredRooms.forEach((room) => {
        searchResultsSection.innerHTML +=
          `
        <div class="booking-card">
          <div class="room-details" id="${room.number}">
            <p>Date: ${newDate}</p>
            <p>Room: ${room.number}</p>
            <p>${room.roomType}</p>
            <p>Bed Size: ${room.bedSize}</p>
            <p>Number of Beds: ${room.numBeds}</p>
            <p>Cost Per Night: $ ${room.costPerNight}</p>
            <br>
            <button class="book-now-btn" type="button">Book Now</button>
          </div>
        </div>
        `;
      });
    } else {
      updateDom.show(noResultsFoundSection);
    }
  },

  show(element) {
    element.classList.remove("hidden");
  }

}

export default updateDom;