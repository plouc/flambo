/**
 * @module topics/reducers/NewsItemsByTopicId
 */
'use strict'

import factory from '../../../lib/newsItemsByIdReducerFactory'
import {
    REQUEST_TOPIC_NEWS_ITEMS,
    RECEIVE_TOPIC_NEWS_ITEMS,
} from '../constants/topicsActionTypes'


export default factory(
    REQUEST_TOPIC_NEWS_ITEMS,
    RECEIVE_TOPIC_NEWS_ITEMS,
    'topicId'
)
