const process = require('../queue-processor')
const fetch = require('node-fetch')
const jsdom = require("jsdom")
const { JSDOM } = jsdom

const logic = function(job, done) {
 console.log('process job..' + job.data.district)

 fetch(`https://www.openrice.com/en/hongkong/restaurants/district/${job.data.district}?page=${job.data.currentPage}`)
 .then(res => res.text())
 .then(pageContent => {
  const dom = new JSDOM(pageContent);
  const restaurants = dom.window.document.querySelector(".js-poi-list-content-cell-container")
  let count = 0
  for (i in restaurants.children) {
    let child = restaurants.children[i]
    if (typeof child === 'object') count ++
  }
  console.log(job.data.district +  ' page ' + job.data.currentPage + ' count=' + count)
  if (count < job.data.restaurantPerPage) {
   return done(null, { isLastPage: true, lastPage: job.data.currentPage })
  } else {
   return done(null, { isLastPage: false })
  }
 })
}
const concurrentJob = 1

process.start(concurrentJob, logic)

