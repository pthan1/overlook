class UserController {
  constructor(allCustomers, allBookings, allRooms) {
    this.userModel = allCustomers;
    this.bookingModel = allBookings;
    this.roomModel = allRooms;
    this.userBookings = null;
    this.userId;
  }

  returnUserId(usernameInputValue) {
    if (usernameInputValue.startsWith('customer')) {
      let customerId = usernameInputValue.slice(8);
      return customerId;
    }
  }

  returnUserBookings(customerId) {
    this.userBookings = this.bookingModel.filter(booking => {return booking.userID === parseInt(customerId)});
    return this.userBookings;
  }

  calculateUserTotalSpentOnBookings(userBookings) {
    let totalCost = 0;
    userBookings.forEach((booking) => {
      let bookingByRoomType = this.roomModel.find((hotelRoom) => { return hotelRoom.number === booking.roomNumber })
      totalCost += bookingByRoomType.costPerNight;
    }
    )
    return totalCost;
  }
}
  
export default UserController;
