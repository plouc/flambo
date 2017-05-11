'use strict'

import React, { PropTypes } from 'react'
import NewsItemsFilters     from './NewsItemsFilters'
import Pager                from '../../core/components/Pager'


const NewsItemsListControls = ({
    page, limit, filters,
    isFetching,
    newsItems, total,
    onFiltersChange,
    onPageChange,
}) => (
    <section className="section _responsive f-card list-controls">
        <NewsItemsFilters
            filters={filters}
            onChange={onFiltersChange}
        />
        <Pager
            page={page}
            limit={limit}
            count={newsItems.length}
            total={total}
            onChange={onPageChange}
        />
    </section>
)

NewsItemsListControls.propTypes = {
    page:            PropTypes.number.isRequired,
    limit:           PropTypes.number.isRequired,
    filters:         PropTypes.object.isRequired,
    isFetching:      PropTypes.bool.isRequired,
    newsItems:       PropTypes.array.isRequired,
    total:           PropTypes.number.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    onPageChange:    PropTypes.func.isRequired,
}


export default NewsItemsListControls
