import db from '../apiCalls';

class UserModel {
  constructor(allCustomers, singleCustomer) {
    this.allCustomers = allCustomers;
  }

  // getAllCustomers() {
  //   return db.getAllCustomers()
  //   .then(data => {return data});
  // }

  // getSingleCustomer(customerId) {
  //   this.currentUser = db.getSingleCustomer(customerId)
  //   .then(data => data);  
  //   /*returns an object:
  //   {
  //   "id": 1,
  //     "name": "Leatha Ullrich"
  //   }*/
  //   return this.currentUser;
  // }

}

export default UserModel;