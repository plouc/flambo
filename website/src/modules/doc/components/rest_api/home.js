import React from 'react'
import { PrismCode } from 'react-prism'


export default () => (
    <div>
        <h2>Authentication</h2>
        <p>
            In order to perform calls on the API, you must be authenticated,
            use the login endpoint to retrieve a token and then add an <code>Authorization</code> header
            to your requests:
        </p>
        <pre>
            <PrismCode>{`
Authorization: Bearer <TOKEN>
            `.trim()}</PrismCode>
        </pre>
        <h2>Pagination</h2>
        <p>
            Apart from using standard pagination through <code>page</code> & <code>per_page</code> query parameters,
            some endpoints use cursor based pagination, that means that you cannot jump to arbitrary
            page, you must follow first query result to fetch next one:
        </p>
        <pre>
            <PrismCode>{`
# first call, retrieving first 5 users
GET /api/v1/users?first=5

{
  "edges": [ … ],
  "pageInfo": {
    "endCursor": "eyJzZXJpYWwiOiIxNDk0ODk5MzIyMDAwMDAwMDAwMDAwMDAwMDAwNTEifQ==",
    "hasNextPage": false
  }
}

# then you can use the end cursor to fetch next users
GET /api/v1/users?first=5&after=eyJzZXJpYWwiOiIxNDk0ODk5MzIyMDAwMDAwMDAwMDAwMDAwMDAwNTEifQ==
            `.trim()}</PrismCode>
        </pre>
        <p>
            If you're curious about this pagination strategy, you should read{' '}
            <a href="http://graphql.org/learn/pagination/" target="_blank">this documentation page</a>{' '}
            from the graphql website.
        </p>
    </div>
)
