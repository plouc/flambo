import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import { Link }                        from 'react-router-dom'
import CancelIcon                      from 'material-ui/svg-icons/navigation/close'

import Helmet                          from '../../../../core/components/HelmetIntl'
import ErrorChecker                    from '../../../../core/components/errors/ErrorChecker'
import PositionForm                    from '../containers/PositionFormContainer'
import {
    Header,
    TopBar,
    Breadcrumbs,
    Title,
    MainAction,
} from '../../../../core/components/page'


export default class CreatePosition extends Component {
    static propTypes = {
        reset:      PropTypes.func.isRequired,
        create:     PropTypes.func.isRequired,
        isCreating: PropTypes.bool.isRequired,
        error:      PropTypes.object,
        history:    PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    }

    componentDidMount() {
        this.props.reset()
    }

    handleCancel = () => {
        this.props.history.push('/hr/positions')
    }

    render() {
        const {
            create,
            isCreating,
            error,
        } = this.props

        return (
            <div>
                <Helmet title="position_create"/>
                <Header>
                    <TopBar>
                        <Breadcrumbs breadcrumbs={[
                            <FormattedMessage key="hr" id="hr_management"/>,
                            <Link to="/hr/positions" key="positions">
                                <FormattedMessage id="positions"/>
                            </Link>,
                            <FormattedMessage key="create" id="create"/>,
                        ]}/>
                    </TopBar>
                    <Title>
                        <FormattedMessage id="position_create"/>
                    </Title>
                    <MainAction icon={CancelIcon} path="/hr/positions"/>
                </Header>
                <ErrorChecker error={error} />
                <PositionForm
                    onSubmit={create}
                    onCancel={this.handleCancel}
                    isSubmitting={isCreating}
                />
            </div>
        )
    }
}
