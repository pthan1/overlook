import db from './apiCalls';

import UserController from './controllers/UserController';
import updateDom from './views/domUpdates';

import Customer from './Classes/Customer';
import './css/base.scss';
import './images/bg.jpg'

var dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export const userBookingContainer = document.querySelector('.user-booking-container');

const serverErrorSection = document.querySelector('.server-error-section');
const mainPageView = document.querySelector('.main-page');
const usernameField = document.getElementById('username-field');
const passwordField = document.getElementById('password-field');
const loginError = document.querySelector('.login-error');
const calendarError = document.querySelector('.calendar-empty-error ');

const userDashboardView = document.querySelector('.user-dashboard-view');
export const totalSpentHeader = document.querySelector('.total-spent');

const checkInDateField = document.getElementById('check-in-date');
const searchForRoomTypeField = document.getElementById('room-type');
const searchForRoomsBtn = document.querySelector('.submit-btn-search-for-rooms');
const resetFiltersBtn = document.querySelector('.reset-filters-btn');
const backToDashboardBtn = document.querySelector('.back-to-dashboard-btn');
export const noResultsFoundSection = document.querySelector('.no-results-found');
export const searchResultsSection = document.querySelector('.search-results-container');

const searchResultsView = document.querySelector('.search-results-view');
const loginSubmitBtn = document.querySelector('.submit-btn-login');


var allCustomers, allRooms;

export var allBookings;

var allCustomers2;

var customerId;

export var app;
export let newDate;

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
  .catch((error) => displayErrorMessage(error, serverErrorSection))
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
  setMinimumDateForCalendar();
});

loginSubmitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  customerId = app.returnUserId(usernameField.value);
  if (passwordField.value === 'overlook2021' && customerId > 0 && customerId < 51) {
    
      app.userId = customerId;
      let userBookings2 = app.returnUserBookings(customerId);
      
      let totalCost = app.calculateUserTotalSpentOnBookings(userBookings2);
      updateDom.renderTotalCost(totalCost);

      updateDom.displayUserBookings(userBookings2);
      displayUserDashboard();
    } else {
    updateDom.show(loginError);
  }

})

searchForRoomsBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if(checkInDateField.value) {
    let checkInDate = checkInDateField.value;
    newDate = dayjs(checkInDate).format('YYYY/MM/DD')

    let roomTypeToSearch = searchForRoomTypeField.value;

    let unavailableRoomByBooking = app.bookingModel.filter(booking => { 
      if (booking.date === newDate) {
        return booking;
      }
  })

  let unavailableRoomsRoomNumbers = unavailableRoomByBooking.map(room => {return room.roomNumber});

  unavailableRoomsRoomNumbers = new Set(unavailableRoomsRoomNumbers);
  unavailableRoomsRoomNumbers = [...unavailableRoomsRoomNumbers];

  let availableRooms = app.roomModel.filter(booking => {
    return !unavailableRoomsRoomNumbers.includes(booking.number) }
  );

  let filteredRooms = filterRoomsByRoomType(availableRooms, roomTypeToSearch);

  updateDom.displaySearchResults(filteredRooms);
  displaySearchResults()
} else {
    updateDom.show(calendarError);
}

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
  .then(updateDom.displayUserBookings(app.userBookings))
  .then(app.calculateUserTotalSpentOnBookings(app.userBookings))
  .catch((error) => displayErrorMessage(error, serverErrorSection));
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
  updateDom.hide(mainPageView);
  updateDom.hide(searchResultsView);
  updateDom.show(userDashboardView);
};

const displaySearchResults = () => {
  updateDom.hide(mainPageView);
  updateDom.hide(userDashboardView);
  updateDom.show(searchResultsView);
};

const setMinimumDateForCalendar = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + '-' + mm + '-' + dd;
  checkInDateField.setAttribute("min", today);
}

const displayErrorMessage = (error, container) => {
  updateDom.show(serverErrorSection);
  container.innerHTML = `<h2> Sorry!  Our servers are diving for pearls! </h2>`;
}

backToDashboardBtn.addEventListener('click', function() {displayUserDashboard()})