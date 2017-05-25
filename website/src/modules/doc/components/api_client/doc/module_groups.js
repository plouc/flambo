import React         from 'react'
import { PrismCode } from 'react-prism'
import * as Doc      from '../commons'


export default () => {
    return (
        <div>
            <h2>Module: groups</h2>
            <pre>
                <PrismCode className="language-js">
                    {`
// importing the module
import groups from '@flambo/api-client/lib/groups'

// or using the client
import api from '@flambo/api-client'
const client = api.client({ token: 'xxxxx' })
// now groups methods can be called via client.groups.method(...args)
                    `.trim()}
                </PrismCode>
            </pre>
            <div>
                <Doc.Method>groups.find(params <Doc.Opt>opt</Doc.Opt>, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>List groups</p>
                <h4>Parameters</h4>
                    <div>params <code>Object</code></div>
                    <div>params.page <code>number</code></div>
                    <div>params.per_page <code>number</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/groups.js"
                        target="_blank"
                    >
                        groups.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/groups.js#L19"
                        target="_blank"
                    >
                        line 19
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>groups.get(id, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Get a group by its ID</p>
                <h4>Parameters</h4>
                    <div>id <code>string</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/groups.js"
                        target="_blank"
                    >
                        groups.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/groups.js#L38"
                        target="_blank"
                    >
                        line 38
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>groups.create(group, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Create a new group, the owner will be the current user.</p>
                <h4>Parameters</h4>
                    <div>group <code>Object</code></div>
                    <div>group.name <code>string</code></div>
                    <div>group.slug <code>string</code></div>
                    <div>group.description <code>string</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/groups.js"
                        target="_blank"
                    >
                        groups.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/groups.js#L60"
                        target="_blank"
                    >
                        line 60
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>groups.feed(id, params <Doc.Opt>opt</Doc.Opt>, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Get a group feed</p>
                <h4>Parameters</h4>
                    <div>id <code>string</code></div>
                    <div>params <code>Object</code></div>
                    <div>params.page <code>number</code></div>
                    <div>params.per_page <code>number</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/groups.js"
                        target="_blank"
                    >
                        groups.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/groups.js#L79"
                        target="_blank"
                    >
                        line 79
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>groups.comments(id, params <Doc.Opt>opt</Doc.Opt>, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Get a group comments</p>
                <h4>Parameters</h4>
                    <div>id <code>string</code></div>
                    <div>params <code>Object</code></div>
                    <div>params.page <code>number</code></div>
                    <div>params.per_page <code>number</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/groups.js"
                        target="_blank"
                    >
                        groups.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/groups.js#L105"
                        target="_blank"
                    >
                        line 105
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>groups.sources(id, params <Doc.Opt>opt</Doc.Opt>, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Get group sources</p>
                <h4>Parameters</h4>
                    <div>id <code>string</code></div>
                    <div>params <code>Object</code></div>
                    <div>params.page <code>number</code></div>
                    <div>params.per_page <code>number</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/groups.js"
                        target="_blank"
                    >
                        groups.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/groups.js#L131"
                        target="_blank"
                    >
                        line 131
                    </a>
                </div>
            </div>
            <div>
                <Doc.Method>groups.members(id, params <Doc.Opt>opt</Doc.Opt>, clientOptions <Doc.Opt>opt</Doc.Opt>)</Doc.Method>
                <p>Get group members</p>
                <h4>Parameters</h4>
                    <div>id <code>string</code></div>
                    <div>params <code>Object</code></div>
                    <div>params.page <code>number</code></div>
                    <div>params.per_page <code>number</code></div>
                    <div>clientOptions <code>ClientOptions</code></div>
                <div>
                    source:&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/groups.js"
                        target="_blank"
                    >
                        groups.js
                    </a>,&nbsp;
                    <a
                        href="https://github.com/plouc/flambo/blob/master/packages/api-client/lib/groups.js#L157"
                        target="_blank"
                    >
                        line 157
                    </a>
                </div>
            </div>
        </div>
    )
}