const database = require('../database')
const Queue = require('bee-queue')
const queue = new Queue('districts')
const IterateObject = require("iterate-object");

const connection = database.connect()

const getDistricts = async function () {
 let districtsObject = await database.readAllRestaurantsCountPerPage(connection)

 // limit to test
 districtsObject = {
  'kwun-tong': districtsObject['kwun-tong'],
  'aberdeen': districtsObject['aberdeen']
 }
 console.log(districtsObject)

 IterateObject(districtsObject, function (value, name) { 
  for (let i = 1; i <= 17; i++ ) {
   const job = queue.createJob({district: name, restaurantPerPage: value.restaurantPerPage, currentPage: i})

   job.save()
   console.log('Add Job ' + job.data.district + ' page ' + i + ' to queue')

   job.on('succeeded', (anwser) => {
    if (anwser.isLastPage) {
     console.log(name + ' has ' + anwser.lastPage)
     database.updatePageCountPerDistrict(connection, name, anwser.lastPage)
    }
   })
  }
 })
}
getDistricts()



 








// console.log('districtsObject', districtsObject)

// IterateObject(districtsObject, function (value, name) {
//  console.log(name, value);
// });
// 1. Get all district 's restaurant-per-page

// 2. for each district
//  2.1 create job (district, restaurt-per-page)
//  2.2 save the job
