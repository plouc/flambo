import React, { PropTypes } from 'react'
import { Field }            from 'redux-form'
import styled               from 'styled-components'

import FormActions          from '../../../core/components/form/FormActions'


const Container = styled.div`
    display:       flex;
    align-items:   flex-start;
    font-size:     14px;
    padding:       24px 24px 12px;
    border-bottom: 1px solid #eee;
`

const Avatar = styled.div`
    width:               48px;
    height:              48px;
    margin-right:        12px;
    background-size:     cover;
    background-color:    #fff;
    background-repeat:   no-repeat;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
    border:              1px solid rgba(0, 0, 0, .1);
`

const CommentForm = ({
    onCancel,
    handleSubmit,
    valid,
    me,
    intl: { formatMessage },
}) => (
    <Container>
        <Avatar url={me.avatar_url}/>
        <form
            onSubmit={handleSubmit}
            name="comment"
            style={{ flexGrow: 1 }}
        >
            <Field
                name="content"
                component="textarea"
                placeholder={formatMessage({
                    id: 'comment_form_placeholder',
                })}
                style={{ width: '100%' }}
            />
            <FormActions
                onSubmit={handleSubmit}
                onCancel={onCancel}
                submitDisabled={!valid}
                size="small"
                style={{ marginTop: '6px' }}
            />
        </form>
    </Container>
)

CommentForm.propTypes = {
    onSubmit:        PropTypes.func.isRequired,
    onCancel:        PropTypes.func.isRequired,
    change:          PropTypes.func.isRequired,
    valid:           PropTypes.bool.isRequired,
    isSubmitting:    PropTypes.bool.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
    me:              PropTypes.object.isRequired,
    intl:            PropTypes.shape({
        formatMessage: PropTypes.func.isRequired,
    }).isRequired,
}

export default CommentForm
