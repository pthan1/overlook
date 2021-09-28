import { assert } from 'chai';
import UserController from '../src/controllers/UserController';
import UserModel from '../src/models/UserModel'
import UserView from '../src/views/UserView'
import BookingModel from '../src/models/BookingModel';
import RoomModel from '../src/models/RoomModel';
import testData from '../test/testData';


describe('UserController', function () {
  let userController;


  beforeEach(function() {
    userController = new UserController(testData.allCustomers, testData.allBookings, testData.allRooms);
  });

  it('should store all customers', function () {
    assert.deepEqual(userController.userModel, [
      {
        "id": 1,
        "name": "Leatha Ullrich"
      },
      {
        "id": 2,
        "name": "Rocio Schuster"
      },
      {
        "id": 3,
        "name": "Kelvin Schiller"
      }
    ])
  });

  it('should store all bookings', function () {
    assert.deepEqual(userController.allBookings, )
  });

  it('should store all rooms', function () {
    // assert.instanceOf(userController.)
  });

  it('should return bookings for a customer Id', function () {
    expect(userController.returnUserBookings).to.deep.equal([
      {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 1,
        "date": "2020/02/05",
        "roomNumber": 12,
        "roomServiceCharges": [],
        "room": {
          "number": 12,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "twin",
          "numBeds": 2,
          "costPerNight": 172.09
        }
      }
    ]);
  });


});
