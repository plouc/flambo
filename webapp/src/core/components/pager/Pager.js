import React, { Component, PropTypes }  from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled                           from 'styled-components'
import PreviousIcon                     from 'react-icons/lib/fa/angle-left'
import NextIcon                         from 'react-icons/lib/fa/angle-right'

import PagerPerPage                     from './PagerPerPage'


const Container = styled.div`
    display:     flex;
    font-size:   13px;
    height:      36px;
    align-items: center;
`

const PageContainer = styled.div`
    margin-right: 12px;
`

const Page = styled.span`
    color:       #000;
    font-weight: 500;
`

const IconButton = styled.span`
    cursor:        pointer;
    user-select:   none;
    display:       flex;
    align-items:   center;
    height:        26px;
    padding:       0 6px;
    border-radius: 2px;
    color:         ${props => props.disabled ? '#bbb' : '#000'};
    
    &:hover {
        background: #fff;
    }
`

class Pager extends Component {
    static propTypes = {
        page:           PropTypes.number.isRequired,
        perPage:        PropTypes.number.isRequired,
        perPageOptions: PropTypes.array.isRequired,
        hasNext:        PropTypes.bool.isRequired,
        onChange:       PropTypes.func.isRequired,
        disabled:       PropTypes.bool.isRequired,
    }

    static defaultProps = {
        perPageOptions: [10, 20, 50],
        disabled:       false,
    }

    constructor(props) {
        super(props)

        this.handlePrevious      = this.handlePrevious.bind(this)
        this.handleNext          = this.handleNext.bind(this)
        this.handlePerPageUpdate = this.handlePerPageUpdate.bind(this)
    }

    handlePrevious() {
        const { disabled, page, perPage, onChange } = this.props
        if (!disabled && page > 1) {
            onChange(Math.max(1, page - 1), perPage)
        }
    }

    handleNext() {
        const { disabled, hasNext, page, perPage, onChange } = this.props
        if (!disabled && hasNext) {
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
        const {
            page,
            perPage,
            perPageOptions,
            hasNext,
            disabled,
            intl: { formatMessage },
        } = this.props

        return (
            <Container>
                <PageContainer>
                    <FormattedMessage id="pager_page"/>&nbsp;
                    <Page>{page}</Page>
                </PageContainer>
                {perPageOptions.length > 1 && (
                    <PagerPerPage
                        perPage={perPage}
                        options={perPageOptions}
                        onChange={this.handlePerPageUpdate}
                    />
                )}
                <IconButton
                    disabled={page <= 1 || disabled}
                    onClick={this.handlePrevious}
                    title={formatMessage({ id: 'pager_previous' })}
                >
                    <PreviousIcon size={20}/>
                </IconButton>
                <IconButton
                    disabled={!hasNext || disabled}
                    onClick={this.handleNext}
                    title={formatMessage({ id: 'pager_next' })}
                >
                    <NextIcon size={20}/>
                </IconButton>
            </Container>
        )
    }
}

export default injectIntl(Pager)
