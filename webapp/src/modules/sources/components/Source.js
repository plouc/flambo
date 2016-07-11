'use strict'

import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import SourceTopics                    from './SourceTopics'
import SourceNotFound                  from './SourceNotFound'
import SourceCollectButton             from '../containers/SourceCollectButton'
import sourceTitle                     from '../../../lib/sourceTitle'
import NewsItemsList                   from '../../newsItems/components/NewsItemsList'
import NewsItemsFilters                from '../../newsItems/components/NewsItemsFilters'
import Loader                          from '../../core/components/Loader'
import Pager                           from '../../core/components/Pager'
import InternalError                   from '../../core/components/InternalError'
import { FETCH_STATUS_FAILURE }        from '../../core/constants/fetchStatuses'


class Source extends Component {
    constructor(props) {
        super(props)

        this.handlerPagerUpdate  = this.handlerPagerUpdate.bind(this)
        this.handleFiltersUpdate = this.handleFiltersUpdate.bind(this)
    }

    componentWillMount() {
        const { fetchSourceIfNeeded, fetchSourceNewsItems } = this.props
        const { id } = this.props.params

        fetchSourceIfNeeded(id)
        fetchSourceNewsItems(id)
    }

    componentWillReceiveProps({ sourceId, fetchSourceIfNeeded, fetchSourceNewsItems }) {
        if (sourceId !== this.props.sourceId) {
            fetchSourceIfNeeded(sourceId)
            fetchSourceNewsItems(sourceId)
        }
    }

    handlerPagerUpdate(page, limit) {
        const { fetchSourceNewsItems, filters } = this.props
        const { id } = this.props.params

        fetchSourceNewsItems(id, page, limit, filters)
    }

    handleFiltersUpdate(filters) {
        const { fetchSourceNewsItems, page, limit } = this.props
        const { id } = this.props.params

        fetchSourceNewsItems(id, page, limit, filters)
    }

    render() {
        const { sourceId, source, sourceStatus, sourceIsFetching }            = this.props
        const { page, limit, filters, newsItems, total, newsItemsIsFetching } = this.props

        if (sourceStatus === 404) {
            return <SourceNotFound id={sourceId} />
        } else if (sourceStatus === FETCH_STATUS_FAILURE) {
            return <InternalError />
        }

        return (
            <div>
                <div className="content-header">
                    <h1>{sourceIsFetching ? '' : source.name}</h1>
                    <span className="button-group">
                        <Link
                            to={`/sources/${sourceId}/edit`}
                            className="button button--action button--small"
                        >
                            <FormattedMessage id="edit" />
                        </Link>
                        <SourceCollectButton
                            sourceId={sourceId}
                            className="button--action button--small"
                        />
                    </span>
                    <Loader loading={sourceIsFetching || newsItemsIsFetching} />
                </div>
                <div className="content-wrapper">
                    {!sourceIsFetching && (
                        <section className="section">
                            <h3>{sourceTitle(source)}</h3>
                            <p>
                                topics:&nbsp;
                                <SourceTopics source={source} topics={source.topics}/>
                            </p>
                        </section>
                    )}
                    <section className="section list-controls">
                        <NewsItemsFilters
                            filters={filters}
                            onChange={this.handleFiltersUpdate}
                        />
                        <Pager
                            page={page}
                            limit={limit}
                            count={newsItems.length}
                            total={total}
                            onChange={this.handlerPagerUpdate}
                        />
                    </section>
                    <NewsItemsList newsItems={newsItems} />
                </div>
            </div>
        )
    }
}

Source.propTypes = {
    fetchSourceIfNeeded:  PropTypes.func.isRequired,
    fetchSourceNewsItems: PropTypes.func.isRequired,
    source:               PropTypes.object,
    sourceStatus:         PropTypes.number.isRequired,
    sourceIsFetching:     PropTypes.bool.isRequired,
    newsItems:            PropTypes.array.isRequired,
    total:                PropTypes.number.isRequired,
    page:                 PropTypes.number.isRequired,
    limit:                PropTypes.number.isRequired,
    newsItemsIsFetching:  PropTypes.bool.isRequired,
}

Source.defaultProps = {
    isFetching: true,
}


export default Source
