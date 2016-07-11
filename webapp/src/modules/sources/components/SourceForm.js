import _                               from 'lodash'
import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import SourceTypeSelector              from './SourceTypeSelector'
import SourceTypes                     from './types'


class SourceForm extends Component {
    constructor(props) {
        super(props)

        this.handleNameChange   = this.handleNameChange.bind(this)
        this.handleTypeChange   = this.handleTypeChange.bind(this)
        this.handleDataChange   = this.handleDataChange.bind(this)
        this.handleThemesChange = this.handleThemesChange.bind(this)
        this.handleSubmit       = this.handleSubmit.bind(this)
    }

    handleNameChange(event) {
        const { source, onChange } = this.props
        onChange({ ...source, name: event.target.value })
    }

    handleTypeChange(type) {
        const { source, onChange } = this.props
        onChange({ ...source, type })
    }

    handleDataChange(data) {
        const { source, onChange } = this.props
        onChange({ ...source, data })
    }

    handleThemesChange(event) {
        const { source, topics, onChange } = this.props

        const options = event.target.options
        const selectedTopics  = []
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                selectedTopics.push(_.find(topics, { id: options[i].value }))
            }
        }

        onChange({
            ...source,
            topics: selectedTopics,
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        const { onSubmit } = this.props

        onSubmit()
    }

    render() {
        const { source, topics, cancelPath } = this.props

        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <label htmlFor="sourceName">name</label><br/>
                <input
                    id="sourceName"
                    type="text"
                    className="form-control form-control--full"
                    value={source.name}
                    onChange={this.handleNameChange}
                />
                <div>
                    <SourceTypeSelector
                        value={source.type}
                        onChange={this.handleTypeChange}
                    />
                </div>
                <div>
                    {React.createElement(SourceTypes[source.type], {
                        data:     source.data,
                        onChange: this.handleDataChange,
                    })}
                </div>
                <div>
                    <label htmlFor="sourceTopics">topics</label><br/>
                    <select
                        id="sourceTopics"
                        multiple={true}
                        style={{ width: '100%', height: '200px', fontFamily: 'inherit', fontSize: 'inherit' }}
                        value={(source.topics).map(topic => topic.id)}
                        onChange={this.handleThemesChange}
                    >
                        {topics.map(topic => (
                            <option key={topic.id} value={topic.id}>{topic.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-actions">
                    <button
                        className="button button--bold button--action"
                        type="submit"
                    >
                        <FormattedMessage id="form.submit"/>
                    </button>
                    <Link to={cancelPath} className="button button--bold button--warning">
                        <FormattedMessage id="form.cancel"/>
                    </Link>
                </div>

            </form>
        )
    }
}

SourceForm.propTypes = {
    source: PropTypes.shape({
        type:   PropTypes.string.isRequired,
        themes: PropTypes.array,
        data:   PropTypes.object.isRequired,
    }).isRequired,
    topics:     PropTypes.array.isRequired,
    cancelPath: PropTypes.string.isRequired,
    onChange:   PropTypes.func.isRequired,
    onSubmit:   PropTypes.func.isRequired,
}


export default SourceForm
