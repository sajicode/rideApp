# rideApp
A mini implementation of a ride hailing app

Will go through the app design process including how the models where created and the functions of each API.

The concept of this app is to mimick the average ride hailing app whereby a user can search for cabs based on the location of the driver.

In creating the Driver model, a geometry property was added to hold the coordinates of each driver, however, the user model has a property for the user's physical location. In the process of searching for a cab, the user's location is coverted to latitude and longitude using google apis which are then used to get drivers based on that location.

The database of choice is MongoDB with the mongoose ORM 

# CONFIGURATION

The configuration was set up for development, test and production environments.
The config.json file (ignored by git) takes the following structure:
{
  "test" {
    "PORT": your port,
    "MONGODB_URI": "mongodb://localhost/testdb",
    "SECRET": your secret
  },
  "development" {
    "PORT": your port,
    "MONGODB_URI": "mongodb://localhost/db",
    "SECRET": your secret
  }
}

#DRIVER
To call the driver apis on postman, you have to use:
localhost:your-port/api/drivers/extra-route

the localhost:your-port/api/driver is constant
the extra-route must have been specified on the DriverRoute

#Driver Model
The model is made up of a two schemas - The PointSchema holding the geo location properties and the DriverSchema holding basic properties including the PointSchema. No methods were defined on the DriverSchema and there was no form of authentication.

#USER
To call the user apis on postman, you use:
localhost:your-port/api/users/extra-route

the localhost:your-port/api/driver is constant
the extra-route must have been specified on the UserRouter

#UserModel
The User model holds a UserSchema containing several properties including the User's location.
Several methods were defined on the UserSchema =>

1. The toJSON method ensures only the specified properties of a user are returned whenever an api is queried.

2. The generateAuthToken method is used to create and sign a token and is used whenever a new user is registered or a user logs in. The token is then saved to the particular user's properties.

3. The findByToken method is a static method (defined on the User Class). It is used in authentication (determining if a user is verified).

4. The findByCredentials method is a static method. It is used to verify a user's credentials on login via the Auth.js file.

5. The presave middleware is used to hash a user password just before it is saved to the database.

#Test Seeds
For the test files, seeds were created and beforeEach functions were called on the tests which make use of the seed data.

Before each test runs, two Users and Drivers are created in order to simulate the development process inside the test environment.

#Authenticated Routes
In order to access authenticated routes, an 'x-auth' token has to be sent as part of the request header.
So, the request header should hold :
1. Content-type: Application/json
2. x-auth: Token created on user login