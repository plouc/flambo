import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'


const InternalError = () => (
    <div className="not-found">
        <div>
            <h2 className="not-found__title">Oops!</h2>
            <p>
                <FormattedMessage id="internal_error.message" />
            </p>
        </div>
    </div>
)


export default InternalError
