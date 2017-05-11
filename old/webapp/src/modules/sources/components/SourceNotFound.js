import React, { PropTypes } from 'react'
import { Link }             from 'react-router'


const SourceNotFound = ({ id }) => (
    <div className="not-found">
        <div>
            <h2 className="not-found__title">Oops!</h2>
            <p>No source found for id {id}, <Link to="/sources">source list</Link>.</p>
        </div>
    </div>
)


export default SourceNotFound
