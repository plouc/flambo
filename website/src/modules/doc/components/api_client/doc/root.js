import React             from 'react'
import { Switch, Route } from 'react-router-dom'
import ModuleCollections from './module_collections'
import ModuleGroups from './module_groups'
import ModuleSources from './module_sources'
import ModuleUsers from './module_users'


export default ({ children, basePath }) => {
    return (
        <Switch>
            <Route path={basePath} exact render={() => children}/>
            <Route path={`${basePath}/module-collections`} component={(ModuleCollections)}/>
            <Route path={`${basePath}/module-groups`} component={(ModuleGroups)}/>
            <Route path={`${basePath}/module-sources`} component={(ModuleSources)}/>
            <Route path={`${basePath}/module-users`} component={(ModuleUsers)}/>
        </Switch>
    )
}