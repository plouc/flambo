import React, { PropTypes } from 'react'
import styled               from 'styled-components'

import { Button }           from '../buttons'


const Wrapper = styled.div`
    display:        flex;
    justifyContent: flex-end;
    background:     white;
`

const FormActions = ({
    onSubmit,
    submitDisabled,
    onCancel,
    cancelLabel,
    submitLabel,
    isSubmitting,
    size,
    ...props,
}) => (
    <Wrapper {...props}>
        <Button
            onClick={onCancel}
            disabled={isSubmitting}
            label={cancelLabel}
            style={{
                marginRight: `${size === 'small' ? 12 : 24}px`,
            }}
            size={size}
        />
        <Button
            onClick={onSubmit}
            disabled={submitDisabled || isSubmitting}
            label={submitLabel}
            size={size}
            primary
        />
    </Wrapper>
)

FormActions.propTypes = {
    onSubmit:       PropTypes.func.isRequired,
    submitDisabled: PropTypes.bool.isRequired,
    onCancel:       PropTypes.func.isRequired,
    cancelLabel:    PropTypes.string.isRequired,
    submitLabel:    PropTypes.string.isRequired,
    isSubmitting:   PropTypes.bool.isRequired,
    size:           PropTypes.string.isRequired,
}

FormActions.defaultProps = {
    submitDisabled: false,
    cancelLabel:    'cancel',
    submitLabel:    'submit',
    isSubmitting:   false,
    size:           'standard',
}

export default FormActions
