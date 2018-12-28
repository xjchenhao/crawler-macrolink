'use strict';

const co = require('co');
const news = require("./news");

co(async function () {
    let newsData=await news();
    
    console.log(newsData);
});
