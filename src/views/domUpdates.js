import { totalSpentHeader } from '../scripts'

const updateDom = {
  renderTotalCost(totalCost) {
    totalSpentHeader.innerHTML = "Total Spent on Bookings: $ " + totalCost.toFixed(2);
  }


  // displayUserBookings(userBookings) {
  //   userBookingsSection.innerHTML = '';
  //   userBookingsSection.innerHTML +=
  //     `
  //       <div class="booking-card">
  //         <div class="room-image"></div>
  //         <div class="room-details">
  //           <p>${userBookings.roomType}</p>
  //           <p>Bed Size: ${userBookings.bedSize}</p>
  //           <p>Number of Beds: ${userBookings.numBeds}</p>
  //         </div>
  //         <div class="room-cost-book-btn">Cost Per Night: $ ${userBookings.costPerNight}</div>
  //       </div>
  //       `;
  // }
}

export default updateDom;