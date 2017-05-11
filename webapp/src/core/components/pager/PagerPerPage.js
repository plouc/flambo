import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import PagerPerPageItem     from './PagerPerPageItem'


const PagerPerPage = ({ perPage, options, onChange }) => (
    <div className="pager__per-page">
        <span className="pager__per-page__label">
            <FormattedMessage id="pager.per_page" />&nbsp;:
        </span>
        {options.map(size => (
            <PagerPerPageItem
                key={size}
                perPage={perPage}
                onChange={onChange}
                value={size}
            />
        ))}
    </div>
)

PagerPerPage.propTypes = {
    perPage:  PropTypes.number.isRequired,
    options:  PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default PagerPerPage
