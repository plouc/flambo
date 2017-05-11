import React, { PropTypes } from 'react'
import classNames           from 'classnames'


const Loader = ({ loading }) => (
    <div className={classNames('loader', { 'loader--loading': loading })} />
)

Loader.propTypes = {
    loading: PropTypes.bool.isRequired,
}

export default Loader
