'use strict';

const co = require('co');
const news = require("./news");

co(async function () {
    let newsData = await news('http://www.nhl-pharm.com/news.html');
    let noticeData = await news('http://www.nhl-pharm.com/news_gonggao.html');

    console.log(newsData);
    console.log(noticeData);
});
