import React             from 'react'
import { Route, Switch } from 'react-router-dom'

import Index             from '../containers/GroupsIndexContainer'
import View              from '../containers/GroupContainer'
import Create            from '../containers/CreateGroupContainer'


export default ({ match }) => (
    <div>
        <Route path={match.url} component={Index} exact/>
        <Switch>
            <Route path={`${match.url}/create`} component={Create}/>
            <Route path={`${match.url}/:id`}    component={View}/>
        </Switch>
    </div>
)
