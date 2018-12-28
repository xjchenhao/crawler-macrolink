'use strict';

const Crawler = require("async-crawler");
const getCompleteNews = require('./newsDetails');

const crawler = new Crawler();

// 获取新闻列表数据
const getNewsListDataPromise = async () => {
    let newsPagecount = 0; // 页数

    // 获取新闻列表数据
    const getNewsListData = async (pageNumber: number) => {
        return await crawler.asyncDirect({
            uri: `http://www.nhl-pharm.com/news.html?&p=${pageNumber}`,
            callback: function (error: any, res: any) {
                if (error) {
                    console.log(error);
                } else {
                    var $ = res.$;

                    const $newscenterA = $('#newscenter a');
                    const rusult: Array<object> = [];

                    newsPagecount = Number($('#newscenter').next().find('a').last().text());

                    for (let i = 0, l = $newscenterA.length; i < l; i++) {
                        const item = $newscenterA[i];
                        rusult.push({
                            title: $(item).text(),
                            href: $(item).attr('href'),
                            time:$(item).parent().next().text()
                        })
                    }

                    return rusult;
                }
            }
        });
    }

    let pageData = await getNewsListData(1);    // 获取第一页数据，并获得页数

    // 获取剩余页数的数据
    let promiseList = [];
    for (let i = 2; i <= newsPagecount; i++) {
        promiseList.push(getNewsListData(i));
    }

    const result: Array<object> = await Promise.all(promiseList);

    // 合并第一页和其余页数的数据，并返回结果
    return Array.prototype.concat.call(pageData, ...result);
}

module.exports = async () => {
    const newsListData = await getNewsListDataPromise();

    const result =await Promise.all(newsListData.map(async (item: object) => {
        return await getCompleteNews(item);
    }))

    return result;

};
