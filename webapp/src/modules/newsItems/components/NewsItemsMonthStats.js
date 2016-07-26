import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import Histogram                       from '../../core/components/Histogram'


class NewsItemsMonthStats extends Component {
    render() {
        const { buckets } = this.props

        return (
            <div className="section">
                <h3 className="news-items__stat__title">
                    <FormattedMessage id="news_items.stats.monthly" />
                </h3>
                <Histogram buckets={buckets}/>
            </div>
        )
    }
}


NewsItemsMonthStats.propTypes = {
    buckets: PropTypes.array.isRequired,
}


export default NewsItemsMonthStats
