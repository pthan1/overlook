import {assert} from 'chai';
import UserModel from '../src/models/UserModel';
import testData from '../test/testData';

describe('UserModel', function() {
  let userModel, allCustomers, singleCustomer;
  
  beforeEach(function() {
    allCustomers = testData.allCustomers;
    singleCustomer = testData.currentCustomer;
    userModel = new UserModel(allCustomers, singleCustomer);
  })
  
  it('should store all customers', function () {
    assert.deepEqual(userModel.allCustomers, [
      {
        "id": 1,
        "name": "Leatha Ullrich"
      },
      {
        "id": 2,
        "name": "Rocio Schuster"
      },
      {
        "id": 3,
        "name": "Kelvin Schiller"
      }
    ]);
  });

  it('should store single customer', function () {
    assert.deepEqual(userModel.currentCustomer, {
      "id": 1,
      "name": "Leatha Ullrich"
    })
  });



});
