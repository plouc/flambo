import React, { Component, PropTypes }         from 'react'
import { FormattedMessage, FormattedRelative } from 'react-intl'
import { Prompt }                              from 'react-router-dom'
import { Field }                               from 'redux-form'
import styled                                  from 'styled-components'
import Dropzone                                from 'react-dropzone'

import { Grid, Cell, Label, Value }            from '../../../core/components/Grid'
import FormActions                             from '../../../core/components/form/FormActions'
import { FORM_NAME }                           from '../constants'


const renderDropzoneInput = (field) => {
    const files = field.input.value

    return (
        <div>
            <Dropzone
                name={field.name}
                multiple={false}
                onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
            >
                <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            {field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>}
            {files && Array.isArray(files) && (
                <ul>
                    { files.map((file, i) => <li key={i}>{file.name}</li>) }
                </ul>
            )}
        </div>
    );
}

const Container = styled.div`
    margin:     60px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .07);
`

export default class CollectionForm extends Component {
    static propTypes = {
        collection:      PropTypes.object,
        onSubmit:        PropTypes.func.isRequired,
        onCancel:        PropTypes.func.isRequired,
        change:          PropTypes.func.isRequired,
        dirty:           PropTypes.bool.isRequired,
        valid:           PropTypes.bool.isRequired,
        isSubmitting:    PropTypes.bool.isRequired,
        submitSucceeded: PropTypes.bool.isRequired,
        intl:            PropTypes.shape({ formatMessage: PropTypes.func.isRequired }).isRequired,
    }

    render() {
        const {
            collection,
            onCancel,
            handleSubmit,
            valid,
            dirty,
            submitSucceeded,
            intl: { formatMessage },
        } = this.props

        return (
            <Container>
                <form onSubmit={handleSubmit} name={FORM_NAME}>
                    <Prompt
                        when={dirty && !submitSucceeded}
                        message={formatMessage({ id: 'form_cancel_message' })}
                    />
                    <Grid>
                        <Cell>
                            <Label htmlFor="name">
                                <FormattedMessage id="name"/>
                            </Label>
                            <Field id="name" name="name" component="input" type="text"/>
                        </Cell>
                        <Cell>
                            <Label>
                                <FormattedMessage id="picture"/>
                            </Label>
                            <Field
                                name="picture"
                                component={renderDropzoneInput}
                            />
                        </Cell>
                        {collection && (
                            <Cell x="3">
                                <Label>
                                    <FormattedMessage id="created_at"/>
                                </Label>
                                <Value>
                                    <FormattedRelative
                                        value={collection.created_at}
                                        updateInterval={10000}
                                    />
                                </Value>
                            </Cell>
                        )}
                        <Cell x="1" xSpan="2">
                            <Label htmlFor="description">
                                <FormattedMessage id="description"/>
                            </Label>
                            <Field name="description" component="textarea"/>
                        </Cell>
                        {collection && (
                            <Cell>
                                <Label>
                                    <FormattedMessage id="updated_at"/>
                                </Label>
                                <Value>
                                    <FormattedRelative
                                        value={collection.updated_at}
                                        updateInterval={10000}
                                    />
                                </Value>
                            </Cell>
                        )}
                        <Cell x="2" xAlign="end">
                            <FormActions
                                onSubmit={handleSubmit}
                                onCancel={onCancel}
                                submitDisabled={!valid}
                            />
                        </Cell>
                    </Grid>
                </form>
            </Container>
        )
    }
}
