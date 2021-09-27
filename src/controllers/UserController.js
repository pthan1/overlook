class UserController {
  constructor(newUserModelInstance, newUserViewInstance, newBookingModelInstance, newRoomModelInstance) {
    this.userModel = newUserModelInstance;
    this.userView = newUserViewInstance;
    this.bookingModel = newBookingModelInstance;
    this.RoomModel = newRoomModelInstance;
  }

  returnUserId(usernameInputValue) {
    if (usernameInputValue.startsWith('customer')) {
      let customerId = usernameInputValue.slice(8);
      return customerId;
    }
  }

  returnUserBookings() {
      let customerName = this.userModel.getSingleCustomer(customerId).then(data => data);
      this.bookingModel.getAllBookings();
      userBookings = this.bookingModel.filterUserBookings(customerId, this.RoomModel.allRooms);

      this.userView.displayUserBookings(userBookings);
    // console.log('userbookings', userBookings)
    //   this.userView.displayUserBookings(userBookings);
    }  
  
}

export default UserController;

