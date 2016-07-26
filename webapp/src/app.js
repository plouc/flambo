import 'react-select/dist/react-select.css'
import './styles/index.css'

import 'intl'
import 'intl/locale-data/jsonp/en.js'
import 'intl/locale-data/jsonp/fr.js'
import 'whatwg-fetch'
import React                    from 'react'
import { render }               from 'react-dom'
import { Provider }             from 'react-redux'
import configureStore           from './configureStore'
import { syncHistoryWithStore } from 'react-router-redux'
import {
    Router,
    Route,
    IndexRoute,
    IndexRedirect,
    hashHistory
} from 'react-router'

import App                      from './modules/core/containers/App'
import Login                    from './modules/auth/containers/LoginContainer'

import Topics                   from './modules/topics/containers/TopicsContainer'
import Topic                    from './modules/topics/containers/TopicContainer'
import CreateTopic              from './modules/topics/containers/CreateTopicContainer'
import EditTopic                from './modules/topics/containers/EditTopicContainer'

import NewsItems                from './modules/newsItems/containers/NewsItems'

import Sources                  from './modules/sources/containers/Sources'
import Source                   from './modules/sources/containers/SourceContainer'
import CreateSource             from './modules/sources/containers/CreateSourceContainer'
import EditSource               from './modules/sources/containers/EditSourceContainer'

import Users                    from './modules/users/containers/Users'
import User                     from './modules/users/containers/User'
import Profile                  from './modules/users/containers/ProfileContainer'

import Collection               from './modules/collections/containers/CollectionContainer'


const store = configureStore({})

const history = syncHistoryWithStore(hashHistory, store)

const Wrapper = ({ children }) => (children)

const requireCredentials = ({ location: { pathname, query } }, replace, next) => {
    const { auth } = store.getState()

    if (!auth.isAuthenticated) {
        replace('/login')
    }

    next()
}

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} onEnter={requireCredentials}>
                <IndexRedirect to="/news_items" />
                <Route path="topics" component={Wrapper}>
                    <IndexRoute            component={Topics}/>
                    <Route path="new"      component={CreateTopic}/>
                    <Route path=":id"      component={Topic}/>
                    <Route path=":id/edit" component={EditTopic}/>
                </Route>
                <Route path="sources" component={Wrapper}>
                    <IndexRoute            component={Sources} />
                    <Route path="new"      component={CreateSource}/>
                    <Route path=":id"      component={Source}/>
                    <Route path=":id/edit" component={EditSource}/>
                </Route>
                <Route path="/news_items" component={NewsItems}/>
                <Route path="users" component={Wrapper}>
                    <IndexRoute            component={Users}/>
                    <Route path=":id"      component={User}/>
                </Route>
                <Route path="collections" component={Wrapper}>
                    <Route path=":id"      component={Collection}/>
                </Route>
                <Route path="profile" component={Profile} />
            </Route>
            <Router path="/login" component={Login} />
        </Router>
    </Provider>
), document.getElementById('app'))
