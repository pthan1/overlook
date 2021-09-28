import db from '../apiCalls';

class BookingModel {
  constructor(allBookings, userBookings) {
    this.allBookings = allBookings;
    this.userBookings = userBookings;
  }

  // getAllBookings() {
  //   this.allBookings = Promise.resolve(db.getAllBookings().then(data => data))
  //   // .then(data => data);
  //   // maybe I should return a filtered list?
  //   // console.log('allBookingsArray', db.getAllBookings()
  //   //   .then(data => { console.log(data) }));

  //   // return db.getAllBookings()
  //   // .then(data => data);

  // }

  addNewBooking(booking) {
    db.addNewBooking(booking)
    .then(data => {return data});
    this.getAllBookings();
    //updateDOMsomehow
    //figure out what view i'm doing this in, and what that view looks like 
  }

  deleteSingleBooking(bookingId) {
    db.deleteSingleBooking(bookingId)
    .then(data => {return data});
    this.getAllBookings();
    //updateDOMsomehow
    //figure out what view i'm doing this in, and what that view looks like    
    // Maybe on the dashboard booking card.  Add a delete button.  Attach that button's value to the booking id, and call this handler.
  }

  filterUserBookings(customerId, allRooms) {
    // this.allBookings = this.allBookings.then(data => data);
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