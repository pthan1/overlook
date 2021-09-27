class UserController {
  constructor(newUserModelInstance, newUserViewInstance, newBookingModelInstance, newRoomModelInstance) {
    this.userModel = newUserModelInstance;
    this.userView = newUserViewInstance;
    this.bookingModel = newBookingModelInstance;
    this.RoomModel = newRoomModelInstance;
  }

  returnUserBookings(usernameInputValue) {
    if (usernameInputValue.startsWith('customer')) {
      let customerId = usernameInputValue.slice(8);
      
      /*returns an object:
    {
      "id": 1,
      "name": "Leatha Ullrich"
    }*/
    
      customerName = this.userModel.getSingleCustomer(customerId).name;

      userBookings = this.bookingModel.filterUserBookings(customerId, this.RoomModel.allRooms);
    
      this.userView.displayUserBookings(userBookings);
    }  
  }
}

export default UserController;

//when user logins in
//UserController takes in a string from the username field
// split up the string or take the number value from teh end
// then pass it into userModel.getSingleCustomer()