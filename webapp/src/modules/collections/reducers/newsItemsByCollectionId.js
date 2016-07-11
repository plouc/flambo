/**
 * @module collections/reducers/NewsItemsBySourceId
 */
'use strict'

import factory from '../../../lib/newsItemsByIdReducerFactory'
import {
    REQUEST_COLLECTION_NEWS_ITEMS,
    RECEIVE_COLLECTION_NEWS_ITEMS,
} from '../constants/collectionsActionTypes'


export default factory(
    REQUEST_COLLECTION_NEWS_ITEMS,
    RECEIVE_COLLECTION_NEWS_ITEMS,
    'collectionId'
)
