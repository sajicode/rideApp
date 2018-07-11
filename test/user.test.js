const expect = require('expect'),
      request = require('supertest'),
      { ObjectID } = require('mongodb'),
      { app } = require('../app'),
      { User } = require('../user/UserModel'),
      { users, populateUsers } = require('./seed/seed');

describe('#all user tests', () => {

  beforeEach(populateUsers);

  describe('POST /users', () => {

    it('should create a new user', (done) => {

      var data = {
        email: "example@test.com",
        firstName: "Moyosore",
        password: "testing123",
        location: "Ikoyi-Lekki"
      };

      request(app)
        .post('/api/users/register')
        .send(data)
        .expect(200)
        .expect((res) => {
          expect(res.body.email).toBe(data.email);
        })
        .end((err) => {
          if(err) {
            return done(err);
          }

          let email = data.email, password = data.password;
          User.findOne({email})
            .then((user) => {
              expect(user).toBeTruthy();
              expect(user.password).not.toBe(password);
              done();
            }).catch((err) => done(err));
        });
    });

    it('should return validation errors if request is invalid', (done) => {
      let email = "wale@dev.com", password = "5678";

      request(app)
        .post('/api/users/register')
        .send({email, password})
        .expect(400)
        .end(done);
    });

    it('should not create user if email is in use', (done) => {
      
      var data = {
        email: "wendy@dev.com",
        firstName: "Yewande",
        password: "testing123",
        location: "Amsterdam"
      };

      request(app)
        .post('/api/users/register')
        .send(data)
        .expect(400)
        .end(done);

    });

    it('should login registered users and return auth token', (done) => {
      
      request(app)
        .post('/api/users/login')
        .send({
          email: users[0].email,
          password: users[0].password
        })
        .expect(200)
        .expect((res) => {
          expect(res.headers['x-auth']).toBeTruthy();
        })
        .end((err, res) => {
          if(err) {
            return done(err);
          }

          User.findById(users[0]._id)
            .then((user) => {
              expect(user.toObject().tokens[0]).toMatchObject({
                access: 'auth',
                token: res.headers['x-auth']
              });
              done();
            }).catch((err) => done(err));
        });
    });

    it('should reject an invalid login', (done) => {

      let data = {
        email: users[1].email,
        password: "deoladoyin"
      };

      request(app)
        .post('/api/users/login')
        .send(data)
        .expect(400)
        .expect((res) => {
          expect(res.headers['x-auth']).toBeFalsy();
        })
        .end((err, res) => {
          if(err) {
            return done(err);
          }

          User.findById(users[1]._id)
            .then((user) => {
              expect(user.tokens.length).toBe(0);
              done();
            }).catch((err) => done(err));
        })    
    });
  });
  
});