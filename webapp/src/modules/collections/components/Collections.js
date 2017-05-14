import React             from 'react'
import { Route, Switch } from 'react-router-dom'

import Index             from '../containers/CollectionsIndexContainer'
import View              from '../containers/CollectionContainer'
import Create            from '../containers/CreateCollectionContainer'


export default ({ match }) => (
    <div>
        <Route path={match.url} component={Index} exact/>
        <Switch>
            <Route path={`${match.url}/create`} component={Create}/>
            <Route path={`${match.url}/:id`}    component={View}/>
        </Switch>
    </div>
)
