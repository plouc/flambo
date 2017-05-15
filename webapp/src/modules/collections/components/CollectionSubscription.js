import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import CheckIcon            from 'react-icons/lib/md/check'

import { Button }           from '../../../core/components/buttons'


const CollectionSubscription = ({
    collection, subscribe, unsubscribe, ...props,
}) => {
    if (collection.viewer_is_owner) {
        return (
            <Button
                primary
                {...props}
            >
                <FormattedMessage id="collection_owner"/>
            </Button>
        )
    }

    if (collection.viewer_is_subscriber) {
        return (
            <Button
                onClick={unsubscribe}
                primary
                {...props}
            >
                <FormattedMessage
                    id={collection.viewer_is_contributor ? 'collection_contributor' : 'collection_subscriber'}
                />
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
