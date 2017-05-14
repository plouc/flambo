import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import CheckIcon            from 'react-icons/lib/md/check'

import { Button }           from '../../../core/components/buttons'


const CollectionSubscription = ({
    isSubscriber, subscribe, unsubscribe, ...props,
}) => {
    if (isSubscriber) {
        return (
            <Button
                onClick={unsubscribe}
                primary
                {...props}
            >
                <FormattedMessage id="collection_subscriber"/>
                <CheckIcon style={{ marginLeft: 6 }}/>
            </Button>
        )
    }

    return (
        <Button
            onClick={subscribe}
            label="collection_subscribe"
            primary
            {...props}
        />
    )
}

CollectionSubscription.propTypes = {
    isSubscriber: PropTypes.bool.isRequired,
    subscribe:    PropTypes.func.isRequired,
    unsubscribe:  PropTypes.func.isRequired,
}

CollectionSubscription.defaultProps = {
    isSubscriber: false,
}

export default CollectionSubscription
