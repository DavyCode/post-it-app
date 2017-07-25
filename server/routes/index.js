const signInRoute = require('./signInRoute');
const signUpRoute = require('./signUpRoute');
const googleSignIn = require('./signInGoogle');
const createGroup = require('./createGroupRoute');
const addUserRoute = require('./addUserRoute');
const messageRoute = require('./messageRoute');
const signOutRoute = require('./signOutRoute');
const getAllUsers = require('./getAllUsers');
const getGroups = require('./getGroups');
const getGroupUsers = require('./getGroupUsers');

module.exports = (app, firebase) => {
  app.use((err, req, res, next) => {
  //  add real time listner
    firebase.auth().onAuthStateChanged((currUser) => {
      if (currUser) {
        res.send('Welcome to PostIt...');
      } else {
        res.status(401);
        res.send('You need to log in first!: ' + res.status(401));
      }
    });
    next();
  });

  //  Post Routes

  signInRoute(app, firebase);
  signUpRoute(app, firebase);
  googleSignIn(app, firebase);
  createGroup(app, firebase);
  addUserRoute(app, firebase);
  messageRoute(app, firebase);
  signOutRoute(app, firebase);

  // Get Routes

  getAllUsers(app, firebase);
  getGroupUsers(app, firebase);
  getGroups(app, firebase);
};