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

import Customer from './Classes/Customer';

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
    let usersBookings2 = app.returnUserBookings(customerId);

    displayUserDashboard();
    
  }
)



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