/**
 * @module sources/reducers/NewsItemsBySourceId
 */
'use strict'

import factory from '../../../lib/newsItemsByIdReducerFactory'
import {
    REQUEST_SOURCE_NEWS_ITEMS,
    RECEIVE_SOURCE_NEWS_ITEMS,
} from '../constants/sourcesActionTypes'


export default factory(
    REQUEST_SOURCE_NEWS_ITEMS,
    RECEIVE_SOURCE_NEWS_ITEMS,
    'sourceId'
)
