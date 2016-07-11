import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import Dropzone                        from 'react-dropzone'
import FormErrors                      from '../../core/components/FormErrors'


class TopicForm extends Component {
    constructor(props) {
        super(props)

        this.handleNameChange        = this.handleNameChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleSubmit            = this.handleSubmit.bind(this)
        this.handlePictureDrop       = this.handlePictureDrop.bind(this)
    }

    handleNameChange(e) {
        const { topic, onChange } = this.props
        onChange({ ...topic, name: e.target.value })
    }

    handleDescriptionChange(e) {
        const { topic, onChange } = this.props
        onChange({ ...topic, description: e.target.value })
    }

    handlePictureDrop(files) {
        const { onFileUpload } = this.props
        onFileUpload(files[0])
    }

    handleSubmit(e) {
        e.preventDefault()

        const { onSubmit } = this.props

        onSubmit()
    }

    render() {
        const { topic, errors, withFileUpload } = this.props

        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <FormErrors errors={errors}/>
                <div>
                    <label htmlFor="topicName">name</label><br/>
                    <input
                        id="topicName"
                        type="text"
                        className="form-control form-control--full"
                        value={topic.name}
                        onChange={this.handleNameChange}
                    />
                </div>
                <div>
                    <label htmlFor="topicDescription">description</label><br/>
                    <textarea
                        id="topicDescription"
                        value={topic.description}
                        className="form-control form-control--full"
                        onChange={this.handleDescriptionChange}
                    />
                </div>
                {withFileUpload && (
                    <Dropzone onDrop={this.handlePictureDrop} multiple={false}>
                        <div>Try dropping some files here, or click to select files to upload.</div>
                    </Dropzone>
                )}
                <div className="form-actions">
                    <button
                        className="button button--bold button--action"
                        type="submit"
                    >
                        <FormattedMessage id="form.submit"/>
                    </button>
                    <Link to="/topics" className="button button--bold button--warning">
                        <FormattedMessage id="form.cancel"/>
                    </Link>
                </div>
            </form>
        )
    }
}

TopicForm.propTypes = {
    topic:          PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    errors:         PropTypes.array.isRequired,
    onChange:       PropTypes.func.isRequired,
    onSubmit:       PropTypes.func.isRequired,
    withFileUpload: PropTypes.bool.isRequired,
    onFileUpload:   PropTypes.func.isRequired,
}


export default TopicForm
