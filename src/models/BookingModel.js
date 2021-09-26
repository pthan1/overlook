import db from '../apiCalls';

class BookingModel {
  constructor() {
    this.allBookings = [];
  }

  getAllBookings() {
    this.allBookings = db.getAllBookings;
    return db.getAllBookings;
  }

  addNewBooking(booking) {
    db.addNewBooking(booking);
    //updateDOMsomehow
    //figure out what view i'm doing this in, and what that view looks like    
  }

  deleteSingleBooking(bookingId) {
    db.deleteSingleBooking(bookingId);
    //updateDOMsomehow
    //figure out what view i'm doing this in, and what that view looks like    
    // Maybe on the dashboard booking card.  Add a delete button.  Attach that button's value to the booking id, and call this handler.
  }

}

export default BookingModel;