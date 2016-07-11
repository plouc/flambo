import { combineReducers }      from 'redux'
import { routerReducer }        from 'react-router-redux'
import locale                   from './modules/core/reducers/localeReducer'
import topics                   from './modules/topics/reducers/topicsReducer'
import topicById                from './modules/topics/reducers/topicByIdReducer'
import sources                  from './modules/sources/reducers/sourcesReducer'
import sourceById               from './modules/sources/reducers/sourceByIdReducer'
import users                    from './modules/users/reducers/usersReducer'
import userById                 from './modules/users/reducers/userByIdReducer'
import newsItems                from './modules/newsItems/reducers/newsItemsReducer'
import newsItemsBySourceId      from './modules/sources/reducers/newsItemsBySourceId'
import newsItemsByTopicId       from './modules/topics/reducers/newsItemsByTopicId'
import newsItemsByCollectionId  from './modules/collections/reducers/newsItemsByCollectionId'
import collections              from './modules/collections/reducers/collectionsReducer'
import collectionById           from './modules/collections/reducers/collectionByIdReducer'


export default combineReducers({
    routing: routerReducer,
    locale,
    topics,
    topicById,
    sources,
    sourceById,
    users,
    userById,
    newsItems,
    newsItemsBySourceId,
    newsItemsByTopicId,
    newsItemsByCollectionId,
    collections,
    collectionById,
})
