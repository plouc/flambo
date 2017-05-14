import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import CheckIcon            from 'react-icons/lib/md/check'

import { Button }           from '../../../core/components/buttons'


const GroupMembership = ({ isMember, join, leave, ...props }) => {
    if (isMember) {
        return (
            <Button
                onClick={leave}
                primary
                {...props}
            >
                <FormattedMessage id="group_member"/>
                <CheckIcon style={{ marginLeft: 6 }}/>
            </Button>
        )
    }

    return (
        <Button
            onClick={join}
            label="group_join"
            primary
            {...props}
        />
    )
}

GroupMembership.propTypes = {
    isMember: PropTypes.bool.isRequired,
    join:     PropTypes.func.isRequired,
    leave:    PropTypes.func.isRequired,
}

export default GroupMembership
