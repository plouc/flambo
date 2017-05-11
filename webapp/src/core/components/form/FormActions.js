import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import RaisedButton         from 'material-ui/RaisedButton'
import CircularProgress     from 'material-ui/CircularProgress'
import styled               from 'styled-components'


const Wrapper = styled.div`
    display:        flex;
    padding:        36px 60px;
    justifyContent: space-between;
    background:     white;
`

const FormActions = ({
    onSubmit,
    submitDisabled,
    onCancel,
    cancelLabel,
    submitLabel,
    isSubmitting,
}) => (
    <Wrapper>
        <div>
            {isSubmitting && <CircularProgress size={32} thickness={3}/>}
        </div>
        <div>
            <RaisedButton
                className="FormActions__Button FormActions__Button--cancel"
                onClick={onCancel}
                disabled={isSubmitting}
                label={<FormattedMessage id={cancelLabel}/>}
                primary={false}
                style={{ marginRight: '24px' }}
            />
            <RaisedButton
                className="FormActions__Button FormActions__Button--submit"
                onClick={onSubmit}
                disabled={submitDisabled || isSubmitting}
                label={<FormattedMessage id={submitLabel}/>}
                primary={true}
            />
        </div>
    </Wrapper>
)

FormActions.propTypes = {
    onSubmit:       PropTypes.func.isRequired,
    submitDisabled: PropTypes.bool.isRequired,
    onCancel:       PropTypes.func.isRequired,
    cancelLabel:    PropTypes.string.isRequired,
    submitLabel:    PropTypes.string.isRequired,
    isSubmitting:   PropTypes.bool.isRequired,
}

FormActions.defaultProps = {
    submitDisabled: false,
    cancelLabel:    'cancel',
    submitLabel:    'submit',
    isSubmitting:   false,
}

export default FormActions
