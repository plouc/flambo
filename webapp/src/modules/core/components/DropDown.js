'use strict'

import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup         from 'react-addons-css-transition-group'
import classNames                      from 'classnames'


class DropDown extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)

        this.state = { opened: false }
    }

    handleClick(e) {
        const { opened } = this.state
        this.setState({ opened: !opened })
    }

    render() {
        const { opened }   = this.state
        const {
            buttonClassName,
            buttonContent,
            panelPosition,
            panelClassName,
            children
        } = this.props

        let content = null
        if (opened) {
            content = (
                <div
                    className={classNames('dropdown__panel', {
                        'dropdown__panel--opened':             opened,
                        [`dropdown__panel--${panelPosition}`]: true,
                        [panelClassName]:                      true,
                    })}
                >
                    {children}
                </div>
            )
        }

        return (
            <div
                className={classNames('dropdown', {
                })}
            >

                <div className={buttonClassName} onClick={this.handleClick}>
                    {buttonContent}
                </div>
                <ReactCSSTransitionGroup
                    transitionName="dropdown"
                    transitionEnterTimeout={400}
                    transitionLeaveTimeout={400}
                >
                    {content}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

DropDown.propTypes = {
    buttonClassName: PropTypes.string.isRequired,
    buttonContent:   PropTypes.node.isRequired,
    panelPosition:   PropTypes.oneOf(['left', 'right']).isRequired,
    panelClassName:  PropTypes.string.isRequired,
}

DropDown.defaultProps = {
    buttonClassName: 'button',
    panelPosition:   'left',
    panelClassName:  '',
}


export default DropDown
