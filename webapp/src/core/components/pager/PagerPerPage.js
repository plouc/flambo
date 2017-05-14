import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import styled               from 'styled-components'

import PagerPerPageItem     from './PagerPerPageItem'


const Label = styled.span`
    margin-right: 12px;
`

const PagerPerPage = ({ perPage, options, onChange }) => (
    <div>
        <Label>
            <FormattedMessage id="pager_per_page" />
        </Label>
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
