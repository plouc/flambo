const util = require('util');


module.exports = client => {
    return {
        index(newsItems) {
            console.log('————————————————————————————————————————————————');
            console.log('index');
            console.log('————————————————————————————————————————————————');
            //console.log(newsItems);

            const body = [];

            newsItems.forEach(newsItem => {
                body.push({ index:  { _index: 'flambo', _type: 'news_item' } });
                body.push(newsItem);
            });

            client.bulk({
                body
            }, (err, resp) => {
                if (err) {
                    console.error(err);
                } else {
                    if (resp.errors === true) {
                        console.error('encountred errors while indexing');
                        console.error(util.inspect(resp.items, { showHidden: true, depth: null, colors: true }));
                    } else {
                        console.log('successfully index documents');
                    }
                }
            });
        }
    }
};
