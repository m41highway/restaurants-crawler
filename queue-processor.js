const dateFormat = require('dateformat');

const Queue = require('bee-queue')
const queue = new Queue('districts')

// ------------------------------------------
// A wrapper to Bee Queue
// ------------------------------------------
const start = function(concurrentJob, logic) {
 // console.log('The logic ' , logic)
 queue.process(concurrentJob, logic)

 queue.on('ready', () => {
  console.log('queue now ready to start doing things ' + dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
 })

 queue.on('error', (err) => {
  console.log(`A queue error happened: ${err.message} ${dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")}`);
 })

 queue.on('succeeded', (job, result) => {
  console.log(`Job ${job.id} - ${job.data.district} succeeded with result: ${result.restaurantCount} ${dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")}`);
  console.log(result)
 })

 queue.on('retrying', (job, err) => {
  console.log(`Job ${job.id} - ${job.data.district} failed with error ${err.message} but is being retried! ${dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")}`);
 })

 queue.on('failed', (job, err) => {
  console.log(`Job ${job.id} - ${job.data.district} failed with error ${err.message} ${dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")}`);
 })

 queue.on('stalled', (jobId) => {
  console.log(`Job ${jobId} - ${job.data.district} stalled and will be reprocessed ${dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")}`);
 })
}

module.exports = {
 start: start
}