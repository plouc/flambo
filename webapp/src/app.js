import React                             from 'react';
import { render }                        from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App          from './modules/App';
import Topics       from './modules/Topics';
import Topic        from './modules/Topic';
import CreateTopic  from './modules/CreateTopic';
import NewsItems    from './modules/NewsItems';
import Sources      from './modules/Sources';
import Source       from './modules/Source';
import CreateSource from './modules/CreateSource';
import EditSource   from './modules/EditSource';
import Users        from './modules/Users';

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/topics"           component={Topics}/>
            <Route path="/topics/new"       component={CreateTopic}/>
            <Route path="/topics/:id"       component={Topic}/>
            <Route path="/users"            component={Users}/>
            <Route path="/news_items"       component={NewsItems}/>
            <Route path="/sources"          component={Sources}/>
            <Route path="/sources/new"      component={CreateSource}/>
            <Route path="/sources/:id"      component={Source}/>
            <Route path="/sources/:id/edit" component={EditSource}/>
        </Route>
    </Router>
), document.body);