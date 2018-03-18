const Queue = require('bee-queue')
const queue = new Queue('districts')
const database = require('../database')

const districts = [
 'soho',
 'admiralty',
 'tai-hang',
 'tai-koo',
 'chai-wan',
 'ap-lei-chau',
 'shek-o',
 'western-district',
 'lan-kwai-fong',
 'wan-chai',
 'tin-hau',
 'sai-wan-ho',
 'pok-fu-lam',
 'deep-water-bay',
 'stanley',
 'sheung-wan',
 'mid-levels',
 'happy-valley',
 'north-point',
 'shau-kei-wan',
 'cyberport',
 'wong-chuk-hang',
 'central',
 'the-peak',
 'causeway-bay',
 'quarry-bay',
 'heng-fa-chuen',
 'aberdeen',
 'repulse-bay',
 'sham-shui-po',
 'yau-ma-tei',
 'hung-hom',
 'kowloon-tong',
 'san-po-kong',
 'kowloon-bay',
 'yau-tong',
 'mei-foo',
 'prince-edward',
 'jordan',
 'ho-man-tim',
 'kowloon-city',
 'diamond-hill',
 'ngau-tau-kok',
 'lei-yue-mun',
 'lai-chi-kok',
 'mong-kok',
 'tsim-sha-tsui',
 'to-kwa-wan',
 'lok-fu',
 'tsz-wan-shan',
 'kwun-tong',
 'cheung-sha-wan',
 'tai-kok-tsui',
 'knutsford-terrace',
 'shek-kip-mei',
 'wong-tai-sin',
 'choi-hung',
 'lam-tin',
 'ma-on-shan',
 'sheung-shui',
 'kwai-chung',
 'sham-tseng',
 'lau-fau-shan',
 'tai-wai',
 'tai-po',
 'lo-wu',
 'tsuen-wan',
 'tuen-mun',
 'sai-kung',
 'sha-tin',
 'tai-wo',
 'lok-ma-chau',
 'tsing-yi',
 'yeun-long',
 'Tseung-kwan-o',
 'fo-tan',
 'fanling',
 'kwai-fong',
 'ma-wan',
 'tin-shui-wai',
 'lantau-island',
 'lamma-island',
 'discovery-bay',
 'tai-o',
 'po-toi-island',
 'tung-chung',
 'cheung-chau',
 'chek-lap-kok',
 'ping-chau'
]

const connection = database.connect()

districts.forEach(district => {
 const job = queue.createJob({
  district: district
 })
 job.save()
 console.log('Job for ' + job.data.district + ' is added to queue')

 job.on('succeeded', (anwser) => {
  console.log('Found ' + anwser.restaurantCount + ' restaurants per page in ' + anwser.district)
  // database.save(connection, anwser.district, anwser.restaurantCount)
 })
})