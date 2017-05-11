import React, { PropTypes } from 'react'


const CollectionNotFound = ({ id }) => (
    <div className="not-found">
        <div>
            <h2 className="not-found__title">Oops!</h2>
            <p>no collection found for id {id}</p>
        </div>
    </div>
)


export default CollectionNotFound
