'use strict'

import React, { Component, PropTypes } from 'react'
import classNames                      from 'classnames'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import FormFieldError                  from '../../core/components/FormFieldError'
import ButtonWithLoader                from '../../core/components/ButtonWithLoader'

const types = [
    { value: '',        label: '———'     },
    { value: 'twitter', label: 'Twitter' },
    { value: 'rss',     label: 'RSS'     },
    //{ value: 'meetup',  label: 'Meetup' },
]


class DynamicSourceForm extends Component {
    constructor(props) {
        super(props)

        this.handleTypeChange = this.handleTypeChange.bind(this)
    }

    handleTypeChange(e) {
        const { fields: { type }, onTypeChange } = this.props

        onTypeChange(e.target.value)

        type.onChange(e)
    }

    render() {
        const {
            fields: { name, type },
            handleSubmit,
            resetForm,
            submitting,
        } = this.props

        const { data } = this.props.fields

        return (
            <form className="section" onSubmit={handleSubmit}>
                <div className="f-form__row">
                    <label htmlFor="sourceName">
                        <FormattedMessage id="source.form.name" />
                    </label><br/>
                    <input
                        id="sourceName"
                        type="text"
                        className={classNames('form-control form-control--full', {
                            error: name.touched && name.error,
                        })}
                        {...name}
                    />
                    <FormFieldError {...name} />
                </div>
                <div className="f-form__row">
                    <label htmlFor="sourceType">
                        <FormattedMessage id="source.form.type" />
                    </label><br/>
                    <select
                        id="sourceType"
                        className={classNames('', {
                            error: name.touched && name.error,
                        })}
                        {...type}
                        onChange={this.handleTypeChange}
                    >
                        {types.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                    <FormFieldError {...type} />
                </div>
                {data && (
                    Object.keys(data).map(dataKey => (
                        <div key={dataKey} className="f-form__row">
                            <label htmlFor={`sourceData-${type.value}-${dataKey}`}>
                                <FormattedMessage id={`source.form.data.${type.value}.${dataKey}`} />
                            </label><br/>
                            <input
                                id={`sourceData-${type.value}-${dataKey}`}
                                type="text"
                                className={classNames('form-control form-control--full', {
                                    error: data[dataKey].touched && data[dataKey].error,
                                })}
                                {...data[dataKey]}
                            />
                            <FormFieldError {...data[dataKey]} />
                        </div>
                    ))
                )}
                <div className="f-form__actions">
                    <ButtonWithLoader
                        elementType="button"
                        type="submit"
                        className="button--bold button--action"
                        label={<FormattedMessage id="form.submit"/>}
                        loading={submitting}
                    />
                    <Link to="/sources" className="button button--bold button--warning">
                        <FormattedMessage id="form.cancel"/>
                    </Link>
                </div>
            </form>
        )
    }
}

DynamicSourceForm.propTypes = {
    fields:       PropTypes.object.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting:   PropTypes.bool.isRequired,
}


export default DynamicSourceForm
