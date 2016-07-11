'use strict'

import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import CollectionNotFound              from './CollectionNotFound'
import NewsItemsList                   from '../../newsItems/components/NewsItemsList'
import NewsItemsFilters                from '../../newsItems/components/NewsItemsFilters'
import Loader                          from '../../core/components/Loader'
import Pager                           from '../../core/components/Pager'
import InternalError                   from '../../core/components/InternalError'


class Collection extends Component {
    constructor(props) {
        super(props)

        this.handlerPagerUpdate  = this.handlerPagerUpdate.bind(this)
        this.handleFiltersUpdate = this.handleFiltersUpdate.bind(this)
    }

    componentWillMount() {
        const { fetchCollectionIfNeeded, fetchCollectionNewsItems } = this.props
        const { id }                                                = this.props.params

        fetchCollectionIfNeeded(id)
        fetchCollectionNewsItems(id)
    }

    componentWillReceiveProps({ collectionId, fetchCollectionIfNeeded, fetchCollectionNewsItems }) {
        if (collectionId !== this.props.collectionId) {
            fetchCollectionIfNeeded(collectionId)
            fetchCollectionNewsItems(collectionId)
        }
    }

    handlerPagerUpdate(page, limit) {
        const { fetchCollectionNewsItems, filters } = this.props
        const { id } = this.props.params

        fetchCollectionNewsItems(id, page, limit, filters)
    }

    handleFiltersUpdate(filters) {
        const { fetchCollectionNewsItems, page, limit } = this.props
        const { id } = this.props.params

        fetchCollectionNewsItems(id, page, limit, filters)
    }

    render() {
        const { collectionId, collection, collectionStatus, collectionIsFetching } = this.props
        const { page, limit, filters, newsItems, total, newsItemsIsFetching }      = this.props

        if (collectionStatus === 404) {
            return <CollectionNotFound id={collectionId} />
        } else if (collectionStatus === 500) {
            return (
                <InternalError>
                    <p>An error occurred.</p>
                </InternalError>
            )
        }

        return (
            <div>
                <div className="content-header">
                    {!collectionIsFetching && <h1>{collection.name}</h1>}
                    <Loader loading={collectionIsFetching || newsItemsIsFetching} />
                </div>
                <div className="content-wrapper">
                    {!collectionIsFetching && (
                        <section className="section">
                            <p>{collection.description}</p>
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

Collection.propTypes = {
    fetchCollectionIfNeeded:  PropTypes.func.isRequired,
    fetchCollectionNewsItems: PropTypes.func.isRequired,
    collection:               PropTypes.object,
    collectionStatus:         PropTypes.number.isRequired,
    collectionIsFetching:     PropTypes.bool.isRequired,
    newsItems:                PropTypes.array.isRequired,
    total:                    PropTypes.number.isRequired,
    page:                     PropTypes.number.isRequired,
    limit:                    PropTypes.number.isRequired,
    filters:                  PropTypes.object.isRequired,
    newsItemsIsFetching:      PropTypes.bool.isRequired,
}


export default Collection
