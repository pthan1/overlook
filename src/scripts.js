var dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

import './css/base.scss';

import './images/bg.jpg'
import './images/double-bed.jpg'
import './images/junior-suite.jpg'
import './images/logo-large.png'
import './images/logo-small.png'
import './images/residential-suite.jpg'
import './images/single-bed.jpg'

import db from './apiCalls';

import UserController from './controllers/UserController';
import updateDom from './views/domUpdates';

import UserModel from './models/UserModel';
import BookingModel from './models/BookingModel';
import RoomModel from './models/RoomModel';

import UserView from './views/UserView';
import BookingView from './views/UserView'

import Customer from './Classes/Customer';

const userBookingsSection = document.querySelector('.user-bookings');
const userBookingContainer = document.querySelector('.user-booking-container');

const mainPageView = document.querySelector('.main-page');
const loginForm = document.querySelector('.login-form');
const usernameField = document.getElementById('username-field');
const passwordField = document.getElementById('password-field');

const userDashboardView = document.querySelector('.user-dashboard-view');
export const totalSpentHeader = document.querySelector('.total-spent');

const searchForRoomsForm = document.querySelector('.search-for-rooms-form');
const checkInDateField = document.getElementById('check-in-date');
const searchForRoomTypeField = document.getElementById('room-type');
const searchForRoomsBtn = document.querySelector('.submit-btn-search-for-rooms');
const resetFiltersBtn = document.querySelector('.reset-filters-btn');
const backToDashboardBtn = document.querySelector('.back-to-dashboard-btn');
const noResultsFoundSection = document.querySelector('.no-results-found');
const searchResultsSection = document.querySelector('.search-results-container');


const searchResultsView = document.querySelector('.search-results-view');
const loginSubmitBtn = document.querySelector('.submit-btn-login');


var allCustomers, allRooms;

export var allBookings;

var allCustomers2;

var customerId;

var app;

let userModel;

const getApiData = () => {
  allCustomers = db.getAllCustomers().then(data => data);
  allRooms = db.getAllRooms().then(data => data);
  allBookings = db.getAllBookings().then(data => data);
  return Promise.all([allCustomers, allRooms, allBookings])
};

function returnData() {
  getApiData().then(data => {
    allCustomers = data[0];
    allRooms = data[1];
    allBookings = data[2];
    instantiateData();
    
  })
};

const instantiateData = () => {
  allCustomers2 = allCustomers.map((customer) => {
    return new Customer(customer);
  });
  app = new UserController(allCustomers2, allBookings, allRooms)
  
};

window.addEventListener('load', function() {
  returnData();
  returnTodaysDate();
});


loginSubmitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (passwordField.value === 'overlook2021') {
    customerId = app.returnUserId(usernameField.value);
    let userBookings2 = app.returnUserBookings(customerId);
    
    let totalCost = app.calculateUserTotalSpentOnBookings(userBookings2);
    updateDom.renderTotalCost(totalCost);

    userBookings2.forEach((booking) => {
    let bookingByRoomType = app.roomModel.find((hotelRoom) => { return hotelRoom.number === booking.roomNumber })

    userBookingContainer.innerHTML += 
        `
        <div class="booking-card">
          <div class="room-image"></div>
          <div class="room-details">
          <p>Date: ${booking.date}</p>
            <p>${bookingByRoomType.roomType}</p>
            <p>Bed Size: ${bookingByRoomType.bedSize}</p>
            <p>Number of Beds: ${bookingByRoomType.numBeds}</p>
          </div>
          <div class="room-cost-book-btn">Cost Per Night: $ ${bookingByRoomType.costPerNight}</div>
        </div>
        `;
  });
  displayUserDashboard();
  }
}
)

searchForRoomsBtn.addEventListener('click', function(e) {
  e.preventDefault();
  let checkInDate = checkInDateField.value;
console.log(checkInDate);
  let newDate = dayjs(checkInDate).format('YYYY/MM/DD')

  let roomTypeToSearch = searchForRoomTypeField.value;
  console.log(roomTypeToSearch)

  let unavailableRoomByBooking = app.bookingModel.filter(booking => { 
    if (booking.date === newDate) {
    return booking;
    }}
  )
  
  let unavailableRoomsRoomNumbers = unavailableRoomByBooking.map(room => {return room.roomNumber});

  unavailableRoomsRoomNumbers = new Set(unavailableRoomsRoomNumbers);
  unavailableRoomsRoomNumbers = [...unavailableRoomsRoomNumbers];

  let availableRooms = app.roomModel.filter(booking => {
    if (!unavailableRoomsRoomNumbers.includes(booking.number)) {
      return booking;
    }
  })
console.log(availableRooms)
let filteredRooms = filterRoomsByRoomType(availableRooms, roomTypeToSearch);
  searchResultsSection.innerHTML = '';

if (filteredRooms.length > 0){
  hide(noResultsFoundSection);
filteredRooms.forEach((room) => {
  searchResultsSection.innerHTML +=
    `
        <div class="booking-card">
          <div class="room-details" id="${room.number}">
            <p>Date: ${newDate}</p>
            <p>Room: ${room.number}</p>
            <p>${room.roomType}</p>
            <p>Bed Size: ${room.bedSize}</p>
            <p>Number of Beds: ${room.numBeds}</p>
            <p>Cost Per Night: $ ${room.costPerNight}</p>
            <br>
            <button class="book-now-btn" type="button">Book Now</button>
          </div>
        </div>
        `;
});
} else {
  show(noResultsFoundSection);
}

  displaySearchResults()
  });

searchResultsSection.addEventListener('click', function (e) {
  if (e.target.className === 'book-now-btn') {
    let roomNumberOfNewBooking = e.target.closest('.room-details').id;
    
    let roomToBook = {
      "userID": parseInt(customerId),
      "date": dayjs(checkInDateField.value).format('YYYY/MM/DD'),
      "roomNumber": parseInt(roomNumberOfNewBooking)
    }
    bookRoom(roomToBook);
  }
  displayUserDashboard();

})

const bookRoom = (booking) => {
  db.addNewBooking(booking)
  .then(app.returnUserBookings(customerId))
  // .then(display the TOtal cost)
};


const filterRoomsByRoomType = (availableRooms, roomTypeToSearch) => {
  let availableRoomsByRoomType = availableRooms.filter((room) => {
    return room.roomType === roomTypeToSearch
  })
  return availableRoomsByRoomType;
  }

const returnTodaysDate = () => {
  var today = new Date();
  checkInDateField.value = today.toISOString().substr(0, 10);
}

const displayUserDashboard = () => {
  hide(mainPageView);
  hide(searchResultsView);
  show(userDashboardView);
};

const displaySearchResults = () => {
  hide(mainPageView);
  hide(userDashboardView);
  show(searchResultsView);
};


const show = (element) => {
  element.classList.remove("hidden");
};

const hide = (element) => {
  element.classList.add("hidden");
};

backToDashboardBtn.addEventListener('click', function() {displayUserDashboard()})
