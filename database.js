const config = require('./config')

const firebase = require("firebase");

const connect = function () {
 firebase.initializeApp({
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
 })
 return firebase.database() 
}

const saveRestaurantsCountPerPage = function (connection, district, restaurantPerPage) {
 // console.log('connection', connection)
 connection.ref('district/' + district).set({
  restaurantPerPage: restaurantPerPage
 })
}

const readAllRestaurantsCountPerPage = function (connection) {
 connection.ref('district/').on('value', function (snapshot){
  console.log(snapshot.val())
 })
}

module.exports = {
 connect,
 saveRestaurantsCountPerPage,
 readAllRestaurantsCountPerPage
}