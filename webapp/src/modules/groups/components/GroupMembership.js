import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import CheckIcon            from 'react-icons/lib/md/check'

import { Button }           from '../../../core/components/buttons'


const GroupMembership = ({
    group, join, leave, ...props,
}) => {
    if (group.viewer_is_owner) {
        return (
            <Button
                primary
                {...props}
            >
                <FormattedMessage id="group_owner"/>
            </Button>
        )
    }

    if (group.viewer_is_member) {
        return (
            <Button
                onClick={leave}
                primary
                {...props}
            >
                <FormattedMessage
                    id={group.viewer_is_administrator ? 'group_administrator' : 'group_member'}
                />
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
    group: PropTypes.object.isRequired,
    join:  PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired,
}

export default GroupMembership
