'use strict';

const Crawler = require("async-crawler");
const crawler = new Crawler();

module.exports = async (item: { href: string }) => {
    let result: any = {};

    result = await crawler.asyncDirect({
        uri: `http://www.nhl-pharm.com${item.href}`,
        callback: function (error: any, res: any) {
            if (error) {
                console.log(error);
            } else {
                const $ = res.$;

                let content: string = $('#detail').html();

                content = content.replace(/src="\//, `src="http://www.nhl-pharm.com/`)

                return {
                    content,
                };
            }
        }
    });

    return {
        ...item,
        content: result.content,
    }
}