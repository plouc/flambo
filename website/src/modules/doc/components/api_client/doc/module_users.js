import React         from 'react'
import { PrismCode } from 'react-prism'
import * as Doc      from '../commons'


export default () => {
    return (
        <div>
            <h2>Module: users</h2>
            <pre>
                <PrismCode className="language-js">
                    {`
// importing the module
import users from '@flambo/api-client/lib/users'

// or using the client
import api from '@flambo/api-client'
const client = api.client({ token: 'xxxxx' })
// now users methods can be called via client.users.method(...args)
                    `.trim()}
                </PrismCode>
            </pre>
            <div>
                <Doc.Method>users.find(params <Doc.Opt>opt</Doc.Opt>, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>List users</p>
                <h4>Parameters</h4>
                    <div>params <code>Object</code></div>
                    <div>params.page <code>number</code></div>
                    <div>params.per_page <code>number</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/users.js"
                        target="_blank"
                    >
                        users.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/users.js#L19"
                        target="_blank"
                    >
                        line 19
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>users.get(id, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Get a user</p>
                <h4>Parameters</h4>
                    <div>id <code>string</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/users.js"
                        target="_blank"
                    >
                        users.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/users.js#L38"
                        target="_blank"
                    >
                        line 38
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>users.feed(id, params <Doc.Opt>opt</Doc.Opt>, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Get user feed</p>
                <h4>Parameters</h4>
                    <div>id <code>string</code></div>
                    <div>params <code>Object</code></div>
                    <div>params.page <code>number</code></div>
                    <div>params.per_page <code>number</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/users.js"
                        target="_blank"
                    >
                        users.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/users.js#L59"
                        target="_blank"
                    >
                        line 59
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>users.comments(id, params <Doc.Opt>opt</Doc.Opt>, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Get user comments</p>
                <h4>Parameters</h4>
                    <div>id <code>string</code></div>
                    <div>params <code>Object</code></div>
                    <div>params.page <code>number</code></div>
                    <div>params.per_page <code>number</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/users.js"
                        target="_blank"
                    >
                        users.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/users.js#L85"
                        target="_blank"
                    >
                        line 85
                    </a>
                </div>
            </div>
        </div>
    )
}