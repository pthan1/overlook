import { assert } from 'chai';
import BookingModel from '../src/models/BookingModel';
import testData from '../test/testData';

describe('BookingModel', function() {
  let bookingModel, allBookings, userBookings;

  beforeEach(function () {
    allBookings = testData.allBookings;
    userBookings = testData.userBookings;
    bookingModel = new BookingModel(allBookings, userBookings);
  });

  it('should store all booking data for hotel', function() {
    assert.deepEqual(bookingModel.allBookings, [
      {
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 9,
        "date": "2020/04/22",
        "roomNumber": 15,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t5",
        "userID": 43,
        "date": "2020/01/24",
        "roomNumber": 24,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t6",
        "userID": 13,
        "date": "2020/01/10",
        "roomNumber": 12,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t7",
        "userID": 20,
        "date": "2020/02/16",
        "roomNumber": 7,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 1,
        "date": "2020/02/05",
        "roomNumber": 12,
        "roomServiceCharges": []
      }
    ])
  });

  it('should return booking data for a user', function () {
    assert.deepEqual(bookingModel.userBookings, [
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
    ])
  });




});
