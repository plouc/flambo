import React, { Component, PropTypes } from 'react'
import classNames                      from 'classnames'


class Pager extends Component {
    constructor(props) {
        super(props)

        this.handlePreviousClick = this.handlePreviousClick.bind(this)
        this.handleNextClick     = this.handleNextClick.bind(this)
    }

    handlePreviousClick() {
        const { onChange, page, limit } = this.props
        if (page > 1) {
            onChange(page - 1, limit)
        }
    }

    handleNextClick() {
        const { onChange, page, limit, total } = this.props
        if (page < Math.ceil(total / limit)) {
            onChange(page + 1, limit)
        }
    }

    render() {
        const { page, limit, count, total } = this.props

        if (total === 0) {
            return null
        }

        const start = (page - 1) * limit
        const end   = start + count

        const hasPrevious = start > 0
        const hasNext     = end < total

        return (
            <div className="pager">
                <span className="pager__start">{start + 1}</span>
                -
                <span className="pager__end">{end}</span>
                &nbsp;of&nbsp;
                <span className="pager__total">{total}</span>
                <div style={{ display: 'inline-block' }}>
                    <span className="button-group">
                        <span
                            className={classNames('button button--action button--small', {
                                'button--disabled': !hasPrevious,
                            })}
                            onClick={this.handlePreviousClick}
                        >&lt;</span>
                        <span
                            className={classNames('button button--action button--small', {
                                'button--disabled': !hasNext,
                            })}
                            onClick={this.handleNextClick}
                        >&gt;</span>
                    </span>
                </div>
            </div>
        )
    }
}

Pager.propTypes = {
    page:     PropTypes.number.isRequired,
    limit:    PropTypes.number.isRequired,
    count:    PropTypes.number.isRequired,
    total:    PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default Pager
