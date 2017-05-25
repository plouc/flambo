import React         from 'react'
import { PrismCode } from 'react-prism'
import * as Doc      from '../commons'


export default () => {
    return (
        <div>
            <h2>Module: sources</h2>
            <pre>
                <PrismCode className="language-js">
                    {`
// importing the module
import sources from '@flambo/api-client/lib/sources'

// or using the client
import api from '@flambo/api-client'
const client = api.client({ token: 'xxxxx' })
// now sources methods can be called via client.sources.method(...args)
                    `.trim()}
                </PrismCode>
            </pre>
            <div>
                <Doc.Method>sources.find(params <Doc.Opt>opt</Doc.Opt>, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>List sources</p>
                <h4>Parameters</h4>
                    <div>params <code>Object</code></div>
                    <div>params.page <code>number</code></div>
                    <div>params.per_page <code>number</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/sources.js"
                        target="_blank"
                    >
                        sources.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/sources.js#L19"
                        target="_blank"
                    >
                        line 19
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>sources.get(id, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Get a source</p>
                <h4>Parameters</h4>
                    <div>id <code>string</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/sources.js"
                        target="_blank"
                    >
                        sources.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/sources.js#L38"
                        target="_blank"
                    >
                        line 38
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>sources.feed(id, params <Doc.Opt>opt</Doc.Opt>, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Get source feed</p>
                <h4>Parameters</h4>
                    <div>id <code>string</code></div>
                    <div>params <code>Object</code></div>
                    <div>params.page <code>number</code></div>
                    <div>params.per_page <code>number</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/sources.js"
                        target="_blank"
                    >
                        sources.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/sources.js#L59"
                        target="_blank"
                    >
                        line 59
                    </a>
                </div>
            </div>
        </div>
    )
}