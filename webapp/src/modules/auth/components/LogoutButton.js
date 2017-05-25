import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button }           from '../../../core/components/buttons'


const LogoutButton = ({ logout }) => (
    <Button inverted onClick={logout}>
        <FormattedMessage id="logout" />
    </Button>
)

LogoutButton.propTypes = {
    logout: PropTypes.func.isRequired,
}

export default LogoutButton
