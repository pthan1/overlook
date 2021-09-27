import chai from 'chai';
const expect = chai.expect;

describe('UserController', function () {
  it('should return a userId', function () {
    expect(userController.returnUserId).to.equal(50);
  });


});
