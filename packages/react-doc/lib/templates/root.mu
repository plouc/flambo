import React             from 'react'
import { Switch, Route } from 'react-router-dom'
{{#items}}
import {{component}} from './{{file}}'
{{/items}}


export default ({ children, basePath }) => {
    return (
        <Switch>
            <Route path={basePath} exact render={() => children}/>
        {{#items}}
            <Route path={`${basePath}/{{path}}`} component={({{component}})}/>
        {{/items}}
        </Switch>
    )
}