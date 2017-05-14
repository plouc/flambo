import React             from 'react'
import { Route, Switch } from 'react-router-dom'

import Index             from '../containers/UsersIndexContainer'
import View              from '../containers/UserContainer'


export default ({ match }) => (
    <div>
        <Route path={match.url} component={Index} exact/>
        <Switch>
            <Route path={`${match.url}/:id`} component={View}/>
        </Switch>
    </div>
)
