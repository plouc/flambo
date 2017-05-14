import React         from 'react'

import NotFoundError from './errors/NotFoundError'


export default () => (
    <NotFoundError error={{ message: 'page_not_found' }} />
)
