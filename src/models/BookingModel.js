import db from '../apiCalls';

class BookingModel {
  constructor() {
    this.allBookings = this.getAllBookings();
    this.UserBookings = [];
  }

  getAllBookings() {
    this.allBookings = db.getAllBookings
      .then(data => return data);
    // maybe I should return a filtered list?
    return db.getAllBookings
    .then(data => return data);
  }

  addNewBooking(booking) {
    db.addNewBooking(booking)
    .then(data => return data);
    this.getAllBookings();
    //updateDOMsomehow
    //figure out what view i'm doing this in, and what that view looks like 
  }

  deleteSingleBooking(bookingId) {
    db.deleteSingleBooking(bookingId)
    .then(data => return data);
    this.getAllBookings();
    //updateDOMsomehow
    //figure out what view i'm doing this in, and what that view looks like    
    // Maybe on the dashboard booking card.  Add a delete button.  Attach that button's value to the booking id, and call this handler.
  }

  filterUserBookings(customerId, allRooms) {
    this.userBookings = this.allBookings.filter(booking => booking.userID === customerId).map(booking => {
      allRooms.forEach(room => {
        if (room.number === booking.roomNumber) {
        booking['room'] = room;
        }
      })
      return booking;
    })
    return this.userBookings;
  }

}

export default BookingModel;