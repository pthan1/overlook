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
    console.log(usersBooking);
    return usersBooking;
  }

  calculateUserTotalSpentOnBookings() {

  }
}
  
export default UserController;
