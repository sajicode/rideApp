const expect = require('expect'),
      assert = require('assert'),
      request = require('supertest'),
      {ObjectID} = require('mongodb'),
      {app} = require('../app'),
      {Driver} = require('../models/driver');




describe('#all tests', function() {
  const driverOneId = new ObjectID();
  const driverTwoId = new ObjectID();

  const drivers = [{
    _id: driverOneId,
    email: 'taxidriver@ride.com',
    firstName: "kanye"
  }, {
    _id: driverTwoId,
    email: 'cabdriver@ride.com',
    firstName: "shawn"
  }];

  const populateDrivers = function (done) {
    Driver.remove({}).then(function () {
      let driverOne = new Driver(drivers[0]).save();
      let driverTwo = new Driver(drivers[1]).save();

      return Promise.all([driverOne, driverTwo]);
    }).then(() => done());
  };

  beforeEach(populateDrivers);

  describe('#add drivers', () => {
    it('should add a new driver', (done) => {
      let data = {email: "saji@dev.com", firstName: "Ninja"}
      request(app)
        .post('/api/drivers')
        .send(data)
        .expect(200)
        .expect((res) => {
          expect(res.body.email).toBe(data.email);
          expect(res.body.firstName).toBe(data.firstName);
        })
        .end(done);
    });

    it('should not create a driver with invalid data', (done) => {
      request(app)
        .post('/api/drivers')
        .send({})
        .expect(400)
        .end(done);
    });
  });

  describe('#get drivers', () => {
    it('should fetch all drivers', (done) => {
      request(app)
        .get('/api/drivers')
        .expect(200)
        .expect((res) => {
          expect(res.body.drivers.length).toBe(2);
          expect(res.body.drivers[0].firstName).toBe("kanye");
        })
        .end(done);
    });

    it('should get a single driver', (done) => {
      request(app)
        .get(`/api/drivers/${drivers[0]._id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.firstName).toBe(drivers[0].firstName);
        })
        .end(done);
    });
  });

  describe('#update a driver', () => {
    it('should update a single driver', (done) => {
      let data = {firstName: "Beyonce"}
      request(app)
        .put(`/api/drivers/${drivers[1]._id}`)
        .send(data)
        .expect(200)
        .expect((res) => {
          expect(res.body.driver.firstName).toBe(data.firstName)
          expect(res.body.driver._id).toBe(drivers[1]._id.toHexString())
        })
        .end(done);
    });
  });

  describe('#Delete a driver', () => {
    it('should delete a driver', (done) => {
      request(app)
        .delete(`/api/drivers/${drivers[0]._id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.firstName).toBeFalsy();
        })
        .end(done);
    });
  });
  
});