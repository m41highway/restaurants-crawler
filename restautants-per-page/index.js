const process = require('../queue-processor')

const fetch = require('node-fetch')
const jsdom = require("jsdom")
const { JSDOM } = jsdom

const logic = function (job, done) {
 console.log('process job..' + job.data.district)
 fetch(`https://www.openrice.com/en/hongkong/restaurants/district/${job.data.district}?page=1`)
 .then(res => res.text())
 .then(pageContent => {
  const dom = new JSDOM(pageContent);
  const restaurants = dom.window.document.querySelector(".js-poi-list-content-cell-container")
  let count = 0
    for (i in restaurants.children) {
      let child = restaurants.children[i]
      if (typeof child === 'object') count ++
    }
    console.log(job.data.district + ' count=' + count)
    return done(null, {
     district: job.data.district, 
     restaurantCount: count
    })
 })
}

const concurrentJob = 2

process.start(concurrentJob, logic)
console.log('Queue server is waiting for job...')