import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import Rss from './rss'
import Meetup from './meetup'


export default ({ match }) => (
    <div>
        <Switch>
            <Route path={`${match.url}`} exact component={Home}/>
            <Route path={`${match.url}/rss`} component={Rss}/>
            <Route path={`${match.url}/meetup`} component={Meetup}/>
        </Switch>
    </div>
)