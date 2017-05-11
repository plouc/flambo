import React, { PropTypes } from 'react'
import { Link }             from 'react-router'


const TopicNotFound = ({ id }) => (
    <div className="not-found">
        <div>
            <h2 className="not-found__title">Oops!</h2>
            <p>No topic found for id {id}, <Link to="/topics">topic list</Link>.</p>
        </div>
    </div>
)


export default TopicNotFound
