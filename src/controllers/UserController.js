class UserController {
  constructor(allCustomers, allBookings, allRooms) {
    this.userModel = allCustomers;
    // this.userView = newUserViewInstance;
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
    console.log(this.bookingModel)  
    console.log(customerId)
    let usersBookings = this.bookingModel.filter(booking => {return booking.userID === parseInt(customerId)});
    return usersBookings;
    // this.userView.displayUserBookings(userBookings);
    // console.log('userbookings', userBookings)
    //   this.userView.displayUserBookings(userBookings);
  }
}
  


export default UserController;
