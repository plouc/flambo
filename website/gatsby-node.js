//import fs from 'fs-extra'
//import _includes from 'lodash/fp/includes'

const ignorePages = ['_template.js', 'index.js', '404.md']

const buildLunrSearchIndex = pages => {
    const indexablePages = pages.filter((page) => {
        return !ignorePages.includes(page.file.basename)
    })

    console.log(`Creating search index for ${indexablePages.length} pages`)

    /*
    // create searchData JSON
    const searchData = cleanedPages.map((page) =>
        Object.assign({},
            {
                [page.path]: {
                    title: page.data.title,
                    content: fs.readFileSync(`pages/${page.file.path}`, 'utf8'),
                    url: page.path,
                },
            })
    )

    // create search_data.json file
    fs.outputJSONSync('public/search-data.json', searchData)
    */
}

exports.postBuild = (pages, callback) => {
    buildLunrSearchIndex(pages)
    callback()
}
