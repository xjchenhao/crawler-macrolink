'use strict';

const co = require('co');
const news = require("./news");
const newsDetails = require("./newsDetails");

co(async function () {
    let newsPromise = news('http://www.nhl-pharm.com/news.html');    // 新闻
    let noticePromise = news('http://www.nhl-pharm.com/news_gonggao.html');  // 公告

    let aboutPromise = newsDetails('http://www.nhl-pharm.com/about.html');  // 公司介绍
    let contactPromise = newsDetails('http://www.nhl-pharm.com/contact.html');  // 联系我们
    let caigouPromise = newsDetails('http://www.nhl-pharm.com/caigou.html');  // 购物供应


    const result = await Promise.all([newsPromise, noticePromise, aboutPromise, contactPromise, caigouPromise]);

    console.log(result);
});
