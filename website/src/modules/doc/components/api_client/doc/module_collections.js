import React         from 'react'
import { PrismCode } from 'react-prism'
import * as Doc      from '../commons'


export default () => {
    return (
        <div>
            <h2>Module: collections</h2>
            <pre>
                <PrismCode className="language-js">
                    {`
// importing the module
import collections from '@flambo/api-client/lib/collections'

// or using the client
import api from '@flambo/api-client'
const client = api.client({ token: 'xxxxx' })
// now collections methods can be called via client.collections.method(...args)
                    `.trim()}
                </PrismCode>
            </pre>
            <div>
                <Doc.Method>collections.find(params <Doc.Opt>opt</Doc.Opt>, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>List collections</p>
                <h4>Parameters</h4>
                    <div>params <code>Object</code></div>
                    <div>params.page <code>number</code></div>
                    <div>params.per_page <code>number</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/collections.js"
                        target="_blank"
                    >
                        collections.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/collections.js#L19"
                        target="_blank"
                    >
                        line 19
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>collections.get(id, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Get a collection</p>
                <h4>Parameters</h4>
                    <div>id <code>string</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/collections.js"
                        target="_blank"
                    >
                        collections.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/collections.js#L38"
                        target="_blank"
                    >
                        line 38
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>collections.create(collection, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Create a collection for the current user.</p>
                <h4>Parameters</h4>
                    <div>collection <code>Object</code></div>
                    <div>collection.name <code>string</code></div>
                    <div>collection.description <code>string</code></div>
                    <div>collection.public <code>boolean</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/collections.js"
                        target="_blank"
                    >
                        collections.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/collections.js#L59"
                        target="_blank"
                    >
                        line 59
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>collections.feed(id, params <Doc.Opt>opt</Doc.Opt>, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Get a collection feed</p>
                <h4>Parameters</h4>
                    <div>id <code>string</code></div>
                    <div>params <code>Object</code></div>
                    <div>params.page <code>number</code></div>
                    <div>params.per_page <code>number</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/collections.js"
                        target="_blank"
                    >
                        collections.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/collections.js#L78"
                        target="_blank"
                    >
                        line 78
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>collections.comments(id, params <Doc.Opt>opt</Doc.Opt>, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Get a collection comments</p>
                <h4>Parameters</h4>
                    <div>id <code>string</code></div>
                    <div>params <code>Object</code></div>
                    <div>params.page <code>number</code></div>
                    <div>params.per_page <code>number</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/collections.js"
                        target="_blank"
                    >
                        collections.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/collections.js#L104"
                        target="_blank"
                    >
                        line 104
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>collections.subscribers(id, params <Doc.Opt>opt</Doc.Opt>, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Get a collection subscribers</p>
                <h4>Parameters</h4>
                    <div>id <code>string</code></div>
                    <div>params <code>Object</code></div>
                    <div>params.page <code>number</code></div>
                    <div>params.per_page <code>number</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/collections.js"
                        target="_blank"
                    >
                        collections.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/collections.js#L130"
                        target="_blank"
                    >
                        line 130
                    </a>
                </div>
            </div>
        </div>
    )
}