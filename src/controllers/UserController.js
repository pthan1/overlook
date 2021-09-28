class UserController {
  constructor(allCustomers, allBookings, allRooms) {
    this.userModel = allCustomers;
    this.bookingModel = allBookings;
    this.roomModel = allRooms;
  }

  returnUserId(usernameInputValue) {
    if (usernameInputValue.startsWith('customer')) {
      let customerId = usernameInputValue.slice(8);
      return customerId;
    }
  }

  returnUserBookings(customerId) {
    let usersBooking = this.bookingModel.filter(booking => {return booking.userID === parseInt(customerId)});
    return usersBooking;
  }

  calculateUserTotalSpentOnBookings(userBookings) {
    let totalCost = 0;
    console.log(userBookings);
    userBookings.forEach((booking) => {
      let bookingByRoomType = this.roomModel.find((hotelRoom) => { return hotelRoom.number === booking.roomNumber })
      totalCost += bookingByRoomType.costPerNight;
    }
    )
    return totalCost;
  }

  

}
  
export default UserController;
