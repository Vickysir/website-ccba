const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const goodsList = []

const url = 'http://www.ccba.ie/plus/list.php?tid=18';
superagent
  .get(url)
  .end((err, data) => {
    if (err) return console.log('爬取页面失败')
    parseData(data.text)
  });

function parseData(page) {
  const $ = cheerio.load(page)
  $('.gl-warp > .gl-item').each((index, item) => {
    const obj = {
      goods_img: $(item).find('img').prop('src'),
      goods_price: $(item).find('.p-price i').text(),
      goods_title: $(item).find('.p-name i').text(),
      goods_name: $(item).find('.p-name em').text()
    }
    goodsList.push(obj)
  })
  console.log(goodsList)
  fs.writeFile('./goods_list.json', JSON.stringify(goodsList), () => console.log('写入完成'))
}