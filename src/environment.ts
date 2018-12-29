'use strict';

const Crawler = require("async-crawler");

const crawler = new Crawler();

const getListDataPromise = async (url: string) => {
    let pagecount = 0; // 页数

    // 获取新闻列表数据
    const getNewsListData = async (pageNumber: number) => {
        return await crawler.asyncDirect({
            uri: `${url}?&p=${pageNumber}`,
            callback: function (error: any, res: any) {
                if (error) {
                    console.log(error);
                } else {
                    var $ = res.$;

                    const $detailImg = $('#detail img');
                    const rusult: Array<object> = [];

                    pagecount = Number($('#detail table').find('a').last().text());

                    for (let i = 0, l = $detailImg.length; i < l; i++) {
                        const item = $detailImg[i];
                        rusult.push({
                            imgSrc: `http://www.nhl-pharm.com/${$(item).attr('src')}`,
                            name: $(item).next().text(),
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
    for (let i = 2; i <= pagecount; i++) {
        promiseList.push(getNewsListData(i));
    }

    const result: Array<object> = await Promise.all(promiseList);

    // 合并第一页和其余页数的数据，并返回结果
    return Array.prototype.concat.call(pageData, ...result);
}

module.exports = async (url: string) => {
    const newsListData = await getListDataPromise(url);

    const result = await Promise.all(newsListData.map(async (item: { href: string }) => {
        // const completeData = await getCompleteDataPromise(`http://www.nhl-pharm.com${item.href}`);

        return {
            ...item,
            // ...completeData,
        };
    }))

    return result;

};
