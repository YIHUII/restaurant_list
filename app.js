const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.includes(keyword)
  })
  res.render('index', { restaurants: restaurants })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  // const restOne = {
  //   id: 1,
  //   name: 'Sababa 沙巴巴中東美食',
  //   name_en: 'Sababa Pita Bar',
  //   category: '中東料理',
  //   image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg',
  //   location: '台北市羅斯福路三段 283 巷 17 號',
  //   phone: '02 2363 8009',
  //   google_map: 'https://goo.gl/maps/BJdmLuVdDbw',
  //   rating: 4.1,
  //   description: '沙巴巴批塔是台灣第一家純手工批塔專賣店,只選用最新鮮的頂級原料,以及道地的中東家傳配方。'
  // }
  res.render('show', { restaurant: restaurant })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})