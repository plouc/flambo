import React         from 'react'
import { PrismCode } from 'react-prism'
import * as Doc      from '../commons'


export default () => {
    return (
        <div>
            <h2>Module: {{module.name}}</h2>
            <pre>
                <PrismCode className="language-js">
                    {`
// importing the module
import {{module.name}} from '@flambo/api-client/lib/{{module.name}}'

// or using the client
import api from '@flambo/api-client'
const client = api.client({ token: 'xxxxx' })
// now {{module.name}} methods can be called via client.{{module.name}}.method(...args)
                    `.trim()}
                </PrismCode>
            </pre>
            {{#module.methods}}
            <div>
                <Doc.Method>{{module.name}}.{{name}}{{#signature}}{{{.}}}{{/signature}}</Doc.Method>
                <p>{{description}}</p>
                <h4>Parameters</h4>
                {{#params}}
                    <div>{{name}} <code>{{type.names.0}}</code></div>
                {{/params}}
                <div>
                    source:&nbsp;
                    <a
                        href="{{{source.file}}}"
                        target="_blank"
                    >
                        {{meta.filename}}
                    </a>,&nbsp;
                    <a
                        href="{{{source.file}}}#L{{meta.lineno}}"
                        target="_blank"
                    >
                        line {{meta.lineno}}
                    </a>
                </div>
            </div>
            {{/module.methods}}
        </div>
    )
}