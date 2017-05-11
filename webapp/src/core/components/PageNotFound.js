import React         from 'react'
import NotFoundError from './errors/NotFoundError'

const PageNotFound = props => (
    <NotFoundError error={{ message: 'page_not_found' }} />
)

export default PageNotFound
