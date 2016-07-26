'use strict'

import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import Dropzone                        from 'react-dropzone'
import classNames                      from 'classnames'
import FormFieldError                  from '../../core/components/FormFieldError'
import ButtonWithLoader                from '../../core/components/ButtonWithLoader'


class TopicForm extends Component {
    constructor(props) {
        super(props)

        this.handlePictureDrop = this.handlePictureDrop.bind(this)
    }

    componentWillMount() {
        const { fetchSourcesIfNeeded } = this.props
        fetchSourcesIfNeeded()
    }

    handlePictureDrop(files) {
        const { onFileUpload } = this.props
        onFileUpload(files[0])
    }

    render() {
        const {
            fields: { name, description, sources },
            handleSubmit,
            resetForm,
            submitting,
            withFileUpload,
        } = this.props

        return (
            <form className="section" onSubmit={handleSubmit}>
                <div className="f-form__row">
                    <label htmlFor="topicName">name</label><br/>
                    <input
                        id="topicName"
                        type="text"
                        className={classNames('form-control form-control--full', {
                            error: name.touched && name.error,
                        })}
                        {...name}
                    />
                    <FormFieldError {...name} />
                </div>
                <div className="f-form__row">
                    <label htmlFor="topicDescription">description</label><br/>
                    <textarea
                        id="topicDescription"
                        className={classNames('form-control form-control--full', {
                            error: description.touched && description.error,
                        })}
                        {...description}
                    />
                    <FormFieldError {...description} />
                </div>
                <div>
                    <label htmlFor="topicSources">sources</label><br/>
                    <select multiple {...sources}>
                        {this.props.sources.map(source => (
                            <option key={source.id} value={source.id}>{source.name}</option>
                        ))}
                    </select>
                    <FormFieldError {...sources} />
                </div>
                {withFileUpload && (
                    <Dropzone onDrop={this.handlePictureDrop} multiple={false}>
                        <div>Try dropping some files here, or click to select files to upload.</div>
                    </Dropzone>
                )}
                <div className="f-form__actions">
                    <ButtonWithLoader
                        elementType="button"
                        type="submit"
                        className="button--bold button--action"
                        label={<FormattedMessage id="form.submit"/>}
                        loading={submitting}
                    />
                    <Link to="/topics" className="button button--bold button--warning">
                        <FormattedMessage id="form.cancel"/>
                    </Link>
                </div>
            </form>
        )
    }
}

TopicForm.propTypes = {
    fetchSourcesIfNeeded: PropTypes.func.isRequired,
    sources:              PropTypes.array.isRequired,
    fields:               PropTypes.shape({
        name:        PropTypes.object.isRequired,
        description: PropTypes.object.isRequired,
        sources:     PropTypes.object.isRequired,
    }).isRequired,
    handleSubmit:         PropTypes.func.isRequired,
    submitting:           PropTypes.bool.isRequired,
    withFileUpload:       PropTypes.bool.isRequired,
    onFileUpload:         PropTypes.func,
}


export default TopicForm
