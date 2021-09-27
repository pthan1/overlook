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


import UserModel from './models/UserModel';
import BookingModel from './models/BookingModel';
import RoomModel from './models/RoomModel';

import UserView from './views/UserView';
import BookingView from './views/UserView'

const mainPageView = document.querySelector('.main-page');
const loginForm = document.querySelector('.login-form');
const usernameField = document.getElementById('username-field');
const passwordField = document.getElementById('password-field');
const loginSubmitBtn = document.querySelector('.submit-btn-login');

const userDashboardView = document.querySelector('.user-dashboard-view');
const userBookingsSection = document.querySelector('.user-bookings');
const userBookingContainer = document.querySelector('.user-booking-container');
const searchForRoomsForm = document.querySelector('.search-for-rooms-form');
const checkInDateField = document.getElementById('check-in-date');
const checkOutDateField = document.getElementById('check-out-date');
const searchForRoomsBtn = document.querySelector('submit-btn-search-for-rooms');
const resetFiltersBtn = document.querySelector('.reset-filters-btn');
const backToDashboardBtn = document.querySelector('.back-to-dashboard-btn');

const searchResultsView = document.querySelector('.search-results-view');

let allCustomers, singleCustomer, allRooms, allBookings;
let customerId;

const app = new UserController(new UserModel(allCustomers, singleCustomer), new UserView(), new BookingModel(), new BookingView(), new RoomModel());



loginSubmitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (passwordField.value === 'overlook2021') {
  customerId = app.returnUserId(usernameField.value);
  singleCustomer = getSingleCustomer(customerId);
  displayUserDashboard();
  
  }
})

const apiData = () => {
  allCustomers = db.getAllCustomers().then(data => data);
  allRooms = db.getAllRooms().then(data => data);
  allBookings = db.getAllBookings().then(data => data);
  Promise.all([allCustomers, allRooms, allBookings])
  .then(data => data)
}

const getSingleCustomer = (customerId) => {
  let customerObject = db.getSingleCustomer(customerId).then(data => data);
  Promise.all([customerObject])
  .then(data => data);
}

apiData();

const displayUserDashboard = () => {
  hide(mainPageView);
  hide(searchResultsView);
  show(userDashboardView)
}


const show = (element) => {
  element.classList.remove("hidden");
}

const hide = (element) => {
  element.classList.add("hidden");
}