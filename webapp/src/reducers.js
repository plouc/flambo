'use strict'

import { combineReducers }        from 'redux'
import { routerReducer }          from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import locale                     from './modules/core/reducers/localeReducer'
import auth                       from './modules/auth/reducers/authReducer'
import topics                     from './modules/topics/reducers/topicsReducer'
import sources                    from './modules/sources/reducers/sourcesReducer'
import sourceById                 from './modules/sources/reducers/sourceByIdReducer'
import users                      from './modules/users/reducers/usersReducer'
import userById                   from './modules/users/reducers/userByIdReducer'
import newsItems                  from './modules/newsItems/reducers/newsItemsReducer'
import newsItemsStats             from './modules/newsItems/reducers/newsItemsStatsReducer'
import newsItemsByEntityId        from './modules/newsItems/reducers/newsItemsByEntityIdReducer'
import newsItemsStatsByEntityId   from './modules/newsItems/reducers/newsItemsStatsByEntityIdReducer'
import collections                from './modules/collections/reducers/collectionsReducer'
import collectionById             from './modules/collections/reducers/collectionByIdReducer'


export default combineReducers({
    routing: routerReducer,
    form:    formReducer,
    locale,
    auth,
    topics,
    sources,
    sourceById,
    users,
    userById,
    newsItems,
    newsItemsStats,
    newsItemsByEntityId,
    newsItemsStatsByEntityId,
    collections,
    collectionById,
})
