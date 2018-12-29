'use strict';

const Crawler = require("async-crawler");

const crawler = new Crawler();

const getCompleteDataPromise = async (href: string) => {
    let result: any = {};

    result = await crawler.asyncDirect({
        uri: href,
        callback: function (error: any, res: any) {
            if (error) {
                console.log(error);
            } else {
                const $ = res.$;

                // let content: string = $('#detail').html();

                // content = content.replace(/src="\//, `src="http://www.nhl-pharm.com/`)

                const tableTrLength = $('#detail table tr').length;

                if (tableTrLength === 4) {
                    return {
                        name: $('#detail table tr').eq(0).find('td').eq(1).text().replace(/\s/g, ''),
                        alias: '',
                        casNo: $('#detail table tr').eq(1).find('td').eq(1).text().replace(/\s/g, ''),
                        molecule: $('#detail table tr').eq(2).find('td').eq(1).text().replace(/\s/g, ''),
                        moleculeValue: $('#detail table tr').eq(2).find('td').eq(2).text().replace(/\s/g, ''),
                        standard: $('#detail table tr').eq(3).find('td').eq(1).text().replace(/\s/g, ''),
                    };
                }

                if (tableTrLength === 5) {
                    return {
                        name: $('#detail table tr').eq(0).find('td').eq(1).text().replace(/\s/g, ''),
                        alias: $('#detail table tr').eq(1).find('td').eq(1).text().replace(/\s/g, ''),
                        casNo: $('#detail table tr').eq(2).find('td').eq(1).text().replace(/\s/g, ''),
                        molecule: $('#detail table tr').eq(3).find('td').eq(1).text().replace(/\s/g, ''),
                        moleculeValue: $('#detail table tr').eq(4).find('td').eq(2).text().replace(/\s/g, ''),
                        standard: $('#detail table tr').eq(5).find('td').eq(1).text().replace(/\s/g, ''),
                    };
                }

            }
        }
    });

    return result
}

const getListDataPromise = async (url: string) => {
    let newsPagecount = 0; // 页数

    // 获取新闻列表数据
    const getNewsListData = async (pageNumber: number) => {
        return await crawler.asyncDirect({
            uri: `${url}?&p=${pageNumber}`,
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

module.exports = async (url: string) => {
    const newsListData = await getListDataPromise(url);

    const result = await Promise.all(newsListData.map(async (item: { href: string }) => {
        const completeData = await getCompleteDataPromise(`http://www.nhl-pharm.com${item.href}`);

        return {
            ...item,
            ...completeData,
        };
    }))

    return result;

};
