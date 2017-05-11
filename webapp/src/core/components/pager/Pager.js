import '../../styles/Pager.css'
import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import FlatButton                      from 'material-ui/FlatButton'
import ChevronLeft                     from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight                    from 'material-ui/svg-icons/navigation/chevron-right'
import PagerPerPage                    from './PagerPerPage'

export default class Pager extends Component {
    static propTypes = {
        page:           PropTypes.number.isRequired,
        perPage:        PropTypes.number.isRequired,
        perPageOptions: PropTypes.array.isRequired,
        hasNext:        PropTypes.bool.isRequired,
        onChange:       PropTypes.func.isRequired,
        disabled:       PropTypes.bool.isRequired,
        style:          PropTypes.object.isRequired,
    }

    static defaultProps = {
        page:           1,
        perPage:        10,
        perPageOptions: [10, 20, 30, 40, 50],
        disabled:       false,
        style:          {},
    }

    constructor(props) {
        super(props)

        this.handlePrevious      = this.handlePrevious.bind(this)
        this.handleNext          = this.handleNext.bind(this)
        this.handlePerPageUpdate = this.handlePerPageUpdate.bind(this)
    }

    handlePrevious() {
        const { disabled, page, perPage, onChange } = this.props
        if (!disabled) {
            onChange(Math.max(1, page - 1), perPage)
        }
    }

    handleNext() {
        const { disabled, page, perPage, onChange } = this.props
        if (!disabled) {
            onChange(page + 1, perPage)
        }
    }

    handlePerPageUpdate(perPage) {
        const { disabled, onChange } = this.props
        if (!disabled) {
            onChange(1, perPage)
        }
    }

    render() {
        const { page, perPage, perPageOptions, hasNext, disabled, style } = this.props

        const iconStyle = {
            height:       42,
            minWidth:     52,
            borderRadius: 0,
        }

        return (
            <div className="pager" style={style}>
                <div className="pager__page">
                    <FormattedMessage id="pager.page"/>&nbsp;: {page}
                </div>
                {perPageOptions.length > 1 && (
                    <PagerPerPage
                        perPage={perPage}
                        options={perPageOptions}
                        onChange={this.handlePerPageUpdate}
                    />
                )}
                <FlatButton
                    disabled={page <= 1 || disabled}
                    onClick={this.handlePrevious}
                    icon={<ChevronLeft />}
                    style={iconStyle}
                />
                <FlatButton
                    disabled={!hasNext || disabled}
                    onClick={this.handleNext}
                    icon={<ChevronRight />}
                    style={iconStyle}
                />
            </div>
        )
    }
}
