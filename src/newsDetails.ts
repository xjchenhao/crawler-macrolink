'use strict';

const Crawler = require("async-crawler");
const crawler = new Crawler();

module.exports = async (href: string) => {
    let result: any = {};

    result = await crawler.asyncDirect({
        uri: href,
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

    return result.content
}