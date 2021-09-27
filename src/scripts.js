import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

import './images/bg.jpg'
import './images/double-bed.jpg'
import './images/junior-suite.jpg'
import './images/logo-large.png'
import './images/logo-small.png'
import './images/residential-suite.jpg'
import './images/single-bed.jpg'



import UserController from './controllers/UserController';
import BookingController from './controllers/BookingController';

import UserModel from './models/UserModel';
import BookingModel from './models/BookingModel';

import UserView from './views/UserView';
import BookingView from './views/UserView'
import RoomModel from './models/RoomModel';

const app = new UserController(new UserModel(), new UserView(), new BookingModel(), new BookingView(), new RoomModel());

