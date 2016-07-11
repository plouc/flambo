import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import NewsItemsFilters                from './NewsItemsFilters'
import NewsItemsList                   from './NewsItemsList'
import Loader                          from '../../core/components/Loader'
import Pager                           from '../../core/components/Pager'


class NewsItems extends Component {
    constructor(props) {
        super(props)

        this.handlerPagerUpdate  = this.handlerPagerUpdate.bind(this)
        this.handleFiltersUpdate = this.handleFiltersUpdate.bind(this)
    }

    componentWillMount() {
        const { fetchNewsItemsIfNeeded, page, limit, filters } = this.props
        fetchNewsItemsIfNeeded(page, limit, filters)
    }

    handlerPagerUpdate(page, limit) {
        const { fetchNewsItemsIfNeeded, filters } = this.props
        fetchNewsItemsIfNeeded(page, limit, filters)
    }

    handleFiltersUpdate(filters) {
        const { fetchNewsItemsIfNeeded, page, limit } = this.props
        fetchNewsItemsIfNeeded(page, limit, filters)
    }

    render() {
        const {
            newsItems,
            total,
            page,
            limit,
            isFetching,
            filters
        } = this.props

        return (
            <div>
                <div className="content-header">
                    <h1>
                        <FormattedMessage id="news_items" />
                    </h1>
                    <Pager
                        page={page}
                        limit={limit}
                        count={newsItems.length}
                        total={total}
                        onChange={this.handlerPagerUpdate}
                    />
                    <Loader loading={isFetching} />
                </div>
                <div className="content-wrapper">
                    <NewsItemsFilters
                        filters={filters}
                        onChange={this.handleFiltersUpdate}
                    />
                    <NewsItemsList newsItems={newsItems}/>
                </div>
            </div>
        )
    }
}

NewsItems.propTypes = {
    newsItems:  PropTypes.array.isRequired,
    total:      PropTypes.number.isRequired,
    page:       PropTypes.number.isRequired,
    limit:      PropTypes.number.isRequired,
    filters:    PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
}


export default NewsItems
