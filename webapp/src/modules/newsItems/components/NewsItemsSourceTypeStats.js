'use strict'

import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'


class NewsItemsSourceTypeStats extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(sourceType) {
        const { filters, onChange } = this.props
        onChange({ ...filters, sourceType: [sourceType] })
    }

    render() {
        const { buckets } = this.props

        return (
            <div className="section">
                <h3 className="news-items__stat__title">
                    <FormattedMessage id="news_items.stats.source_type" />
                </h3>
                <div className="news-items__stat__source-types">
                    {buckets.map(bucket => (
                        <div key={bucket.key} onClick={() => this.handleClick(bucket.key)}>
                            <span>{bucket.key}</span>
                            <span>{bucket.doc_count}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}


NewsItemsSourceTypeStats.propTypes = {
    buckets:  PropTypes.array.isRequired,
    filters:  PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default NewsItemsSourceTypeStats
