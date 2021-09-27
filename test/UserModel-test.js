import {assert} from 'chai';
import UserModel from '../src/models/UserModel';
import testData from '../test/testData';

describe('UserModel', function() {
  let userModel;
  let allCustomers;
  
  beforeEach(function() {
    allCustomers = testData.allCustomers;
    userModel = new UserModel(allCustomers);
  })
  
  it('should store all customers', function () {
    assert.deepEqual(userModel.allCustomers, allCustomers);
  });

  it('should store return single customer', function () {
    assert.deepEqual(userModel.singleCustomer())
  });



});
