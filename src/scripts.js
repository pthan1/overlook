import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import UserController from './controllers/UserController';
import BookingController from './controllers/BookingController';

import UserModel from './models/UserModel';
import BookingModel from './models/BookingModel';

import UserView from './views/UserView';
import BookingView from './views/UserView'
import RoomModel from './models/RoomModel';

const app = new UserController(new UserModel(), new UserView(), new BookingModel(), new BookingView(), new RoomModel());

