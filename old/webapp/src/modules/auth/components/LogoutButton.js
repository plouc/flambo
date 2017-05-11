'use strict'

import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'


const LogoutButton = ({ onLogout }) => (
    <span className="button button--action" onClick={onLogout}>
        <FormattedMessage id="logout" />
    </span>
)

LogoutButton.propTypes = {
    onLogout: PropTypes.func.isRequired,
}


export default LogoutButton
