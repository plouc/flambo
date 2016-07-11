import 'react-select/dist/react-select.css'
import './styles/index.css'

//import 'intl'
//import 'intl/locale-data/jsonp/en.js'
//import 'intl/locale-data/jsonp/fr.js'
//import 'whatwg-fetch'
import React                    from 'react'
import { render }               from 'react-dom'
import { Provider }             from 'react-redux'
import configureStore           from './configureStore'
import { syncHistoryWithStore } from 'react-router-redux'
import App                      from './modules/core/containers/App'
import Topics                   from './modules/topics/containers/Topics'
import Topic                    from './modules/topics/containers/Topic'
import CreateTopic              from './modules/topics/containers/CreateTopic'
import EditTopic                from './modules/topics/containers/EditTopic'
import NewsItems                from './modules/newsItems/containers/NewsItems'
import Sources                  from './modules/sources/containers/Sources'
import Source                   from './modules/sources/containers/Source'
import CreateSource             from './modules/sources/containers/CreateSource'
import EditSource               from './modules/sources/containers/EditSource'
import Users                    from './modules/users/containers/Users'
import User                     from './modules/users/containers/User'
import Collection               from './modules/collections/containers/Collection'
import {
    Router,
    Route,
    IndexRoute,
    hashHistory
} from 'react-router'


const store = configureStore({})

const history = syncHistoryWithStore(hashHistory, store)

const Wrapper = ({ children }) => (children)

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
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
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'))
