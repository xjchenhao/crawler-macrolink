'use strict';

const co = require('co');
const news = require("./news");
const newsDetails = require("./newsDetails");
const product = require("./product");
const environment = require("./environment");

co(async function () {
    let newsPromise = news('http://www.nhl-pharm.com/news.html');    // 新闻
    let noticePromise = news('http://www.nhl-pharm.com/news_gonggao.html');  // 公告

    let aboutPromise = newsDetails('http://www.nhl-pharm.com/about.html');  // 公司介绍
    let contactPromise = newsDetails('http://www.nhl-pharm.com/contact.html');  // 联系我们
    let caigouPromise = newsDetails('http://www.nhl-pharm.com/caigou.html');  // 购物供应

    let productPromise = product('http://www.nhl-pharm.com/product.html');  // 产品

    let environmentPromise = environment('http://www.nhl-pharm.com/qyhj.html');  // 环境


    const result = await Promise.all([newsPromise, noticePromise, aboutPromise, contactPromise, caigouPromise, productPromise, environmentPromise]);

    console.log(result);
});
