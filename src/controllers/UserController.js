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
    let usersBooking = this.bookingModel.filter(booking => {return booking.userID === parseInt(customerId)});
    return usersBooking;
    // this.userView.displayUserBookings(userBookings);
    // console.log('userbookings', userBookings)
    //   this.userView.displayUserBookings(userBookings);
  }

  setRoomTypeForBooking(userBookings) {

 
    userBookings.forEach((booking) => {
      let bookingsByRoomType = this.roomModel.find((hotelRoom) => {return hotelRoom.number === booking.roomNumber})
      updateDom.displayUserBookings(userBookings)
    });
    

  } 

}
  


export default UserController;
