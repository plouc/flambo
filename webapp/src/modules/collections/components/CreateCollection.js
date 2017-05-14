import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'

import Helmet                          from '../../../core/components/HelmetIntl'
import Form                            from '../containers/CollectionFormContainer'
import {
    Header,
    Title,
    Bar,
    Content,
} from '../../../core/components/info-page'


export default class CreateCollection extends Component {
    static propTypes = {
        reset:      PropTypes.func.isRequired,
        create:     PropTypes.func.isRequired,
        isCreating: PropTypes.bool.isRequired,
        error:      PropTypes.object,
        history:    PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
    }

    componentDidMount() {
        this.props.reset()
    }

    handleCancel = () => {
        this.props.history.push('/collections')
    }

    render() {
        const { create, isCreating } = this.props

        return (
            <div>
                <Helmet title="collection_create"/>
                <Header>
                    <span/>
                    <Title>
                        <FormattedMessage id="collection_create"/>
                    </Title>
                </Header>
                <Bar/>
                <Content>
                    <span/>
                    <Form
                        onSubmit={create}
                        onCancel={this.handleCancel}
                        isSubmitting={isCreating}
                    />
                </Content>
            </div>
        )
    }
}
