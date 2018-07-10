const expect = require('expect'),
      request = require('supertest'),
      {ObjectID} = require('mongodb'),
      {app} = require('../app'),
      {Driver} = require('../driver/DriverModel'),
      { drivers, populateDrivers } = require('./seed/seed');
      

describe('#all tests', function() {

  beforeEach(populateDrivers);

  describe('#add drivers', () => {
    it('should add a new driver', (done) => {
      let data = {
        email: "saji@dev.com", 
        firstName: "Ninja", 
        car: "Mercedes Benz",
        geometry: {
          type: 'Point',
          coordinates: [-80.253, 25.791]
        }
      };
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

  it('should GET drivers in a location', (done) => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      firstName: 'Grey',
      geometry: {
        type: 'Point',
        coordinates: [-122.4759902, 47.6147628]  
      },
      car: "Lexus 350"
    });

    const miamiDriver = new Driver({
      email: 'miami@test.com',
      firstName: 'Will',
      geometry: {
        type: 'Point',
        coordinates: [-80.253, 25.791]
      },
      car: "Lexus 450"
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()])
      .then(() => {
        request(app)
          .get('/api/drivers/location?lng=-80&lat=25')
          .expect((res) => {
            expect(res.body[0].firstName).toBe(miamiDriver.firstName);
          })
          .end(done);
      })
  });
  
});