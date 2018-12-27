'use strict';

const Crawler = require("async-crawler");
const co = require('co');

const crawler = new Crawler();

co(function* () {

    const result = yield crawler.asyncDirect({
        uri: 'http://www.nhl-pharm.com/news.html',
        callback: function (error: any, res: any) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                const $newscenterA = $('#newscenter a');
                const rusult: Array<object> = [];

                for (let i = 0, l = $newscenterA.length; i < l; i++) {
                    const item = $newscenterA[i];
                    rusult.push({
                        title: $(item).text(),
                        href: $(item).attr('href'),
                    })
                }

                return rusult;
            }
        }
    });

    console.log(result);


});