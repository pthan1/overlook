import db from '../apiCalls';

class UserModel {
  constructor() {
    this.allUsers = this.getAllCustomers();
    this.currentUser = {};
  }

  getAllCustomers() {
    return db.getAllCustomers()
    .then(data => {return data});
  }

  getSingleCustomer(userId) {
    this.currentUser = db.getSingleCustomer(userId)
    .then(data => {return data});  
    /*returns an object:
    {
    "id": 1,
      "name": "Leatha Ullrich"
    }*/
   
    return db.getSingleCustomer(userId)
    .then(data => {return data});
  }

}

export default UserModel;