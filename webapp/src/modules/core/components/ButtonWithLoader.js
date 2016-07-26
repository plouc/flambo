'use strict'

import _                    from 'lodash'
import React, { PropTypes } from 'react'
import classNames           from 'classnames'


const ButtonWithLoader = props => {
    const {
        elementType,
        loading,
        className,
        transition,
        label,
    } = props

    return React.createElement(
        elementType,
        {
            ..._.omit(props, ['elementType', 'loading', 'className', 'transition', 'label']),
            className: classNames(
                'button button--with-loader',
                `button--with-loader--${transition}`,
                className,
                { '_loading': loading }
            ),
        },
        [
            (
                <span key="loader" className="button__loader">
                    <svg className="circular-loader">
                        <circle className="circular-loader__background" r={12} cx={14} cy={14} />
                        <circle className="circular-loader__circle" r={12} cx={14} cy={14} />
                    </svg>
                </span>
            ),
            (
                <span key="label" className="button__label">
                    {label}
                </span>
            ),
        ]
    )
}

ButtonWithLoader.propTypes = {
    elementType: PropTypes.string.isRequired,
    loading:     PropTypes.bool.isRequired,
    className:   PropTypes.string,
    transition:  PropTypes.oneOf(['slide-up', 'slide-right', 'slide-down', 'slide-left']).isRequired,
    label:       PropTypes.node.isRequired,
}

ButtonWithLoader.defaultProps = {
    elementType: 'span',
    transition:  'slide-down',
}


export default ButtonWithLoader
