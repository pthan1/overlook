import db from '../apiCalls';
class UserModel {
  constructor() {
    this.allUsers = [];
    this.currentUser = {};
  }

  getAllCustomers() {
    this.allUsers = db.getAllCustomers();
    return db.getAllCustomers();
  }

  getSingleCustomer(userId) {
    this.currentUser = db.getSingleCustomer(userId);
    return db.getSingleCustomer(userId);
  }

}

export default UserModel;