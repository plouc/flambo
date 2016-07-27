'use strict'

import { connect }             from 'react-redux'
import TopicSubscriptionButton from '../components/TopicSubscriptionButton'
import {
    subscribeToTopic,
    unsubscribeToTopic,
} from '../actions/topicsActions'


const mapDispatchToProps = (dispatch, { topic: { id } }) => ({
    onSubscribe: () => {
        dispatch(subscribeToTopic(id))
    },
    onUnsubscribe: () => {
        dispatch(unsubscribeToTopic(id))
    }
})

export default connect(
    () => ({}),
    mapDispatchToProps
)(TopicSubscriptionButton)
