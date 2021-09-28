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

const searchForRoomsForm = document.querySelector('.search-for-rooms-form');
const checkInDateField = document.getElementById('check-in-date');
const checkOutDateField = document.getElementById('check-out-date');
const searchForRoomsBtn = document.querySelector('.submit-btn-search-for-rooms');
const resetFiltersBtn = document.querySelector('.reset-filters-btn');
const backToDashboardBtn = document.querySelector('.back-to-dashboard-btn');
const noResultsFoundSection = document.querySelector('.no-results-found');
const searchResultsSection = document.querySelector('.search-results-container');

const searchResultsView = document.querySelector('.search-results-view');
const loginSubmitBtn = document.querySelector('.submit-btn-login');


var allCustomers, allRooms, allBookings;

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

window.addEventListener('load', returnData);

loginSubmitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  // if (passwordField.value === 'overlook2021') {
    customerId = app.returnUserId(usernameField.value);
    let userBookings2 = app.returnUserBookings(customerId);
  
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
)

searchForRoomsBtn.addEventListener('click', function(e) {
  e.preventDefault();
  let checkInDate = checkInDateField.value;
  console.log(checkInDate)
  console.log(typeof(checkInDate))
  let newDate = dayjs(checkInDate).format('YYYY/MM/DD')
  console.log(newDate);

  let unavailableRooms = app.bookingModel.filter(booking => { 
    if (booking.date === newDate) {
    return booking;
    }}
  ).map(room => {return room.roomNumber});

  unavailableRooms = new Set(unavailableRooms);
  unavailableRooms = [...unavailableRooms];
console.log(unavailableRooms)
  // let availableRooms = unavailableRooms.filter
    // console.log(unavailableRooms);
// unavailableRooms.filter(())
  let availableRooms = app.roomModel.filter(booking => {
    if (!unavailableRooms.includes(booking.number)) {
      return booking;
    }
  })
  var bookingByRoomType2;
 console.log(availableRooms);
 console.log(searchResultsSection);
  console.log(bookingByRoomTypefoo);
  availableRooms.forEach((booking) => {
    bookingByRoomType2 = app.roomModel.find((hotelRoom) => { return hotelRoom.number === booking.roomNumber })
    // console.log(bookingByRoomType2);
    // searchResultsSection.innerHTML +=
    // `
    //     <div class="booking-card">
    //       <div class="room-image"></div>
    //       <div class="room-details">
    //       <p>Date: ${booking.date}</p>
    //         <p>${bookingByRoomType2.roomType}</p>
    //         <p>Bed Size: ${bookingByRoomType2.bedSize}</p>
    //         <p>Number of Beds: ${bookingByRoomType2.numBeds}</p>
    //       </div>
    //       <div class="room-cost-book-btn">Cost Per Night: $ ${bookingByRoomType2.costPerNight}</div>
    //     </div>
    //     `;
  });

  // console.log(filteredResults);
// console.log(filteredResults)
  // bookings array
// filter 
// return only bookings that have a matching room number for that room
// check the Dates

  displaySearchResults()

})

const displayUserDashboard = () => {
  hide(mainPageView);
  hide(searchResultsView);
  show(userDashboardView)
};

const displaySearchResults = () => {
  hide(mainPageView);
  hide(userDashboardView);
  show(searchResultsView);


}

const show = (element) => {
  element.classList.remove("hidden");
}

const hide = (element) => {
  element.classList.add("hidden");
}