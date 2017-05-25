import React, { Component } from 'react'
import _                    from 'lodash'
import styled               from 'styled-components'
import Form                 from 'react-jsonschema-form'


const Container = styled.div`
    background: #17385d;
    color: white;
    border-radius: 2px;
    padding: 12px;
    font-family: 'Fira mono';
    
    fieldset {
        padding: 0;
        border: none;
        margin: 0;
    }
    legend {
        display: none;
    }
    input {
        background: #132d4b;
        border: none;
        color: inherit;
        padding: 6px 9px;
        font-size: inherit;
        border-radius: 2px;
    }
    input:focus {
        outline: 0;
        background: #102338;
    }
    label[for=root_path],
    label[for=root_query] {
        display: block;
        margin-bottom: 9px;
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        font-weight: 600;
        padding-bottom: 6px;
    }
    .field-description {
        font-size: 12px;
    }
`

const RequestInfo = styled.div`
    background: #132d4b;
    padding: 12px;
    margin: 0 -12px -12px;
`

const FieldContainer = styled.div`
    display: grid;
    grid-template-columns: 120px auto;
    grid-column-gap: 24px;
`

const CustomFieldTemplate = (props) => {
    const {
        id,
        label,
        help,
        required,
        description,
        errors,
        children,
        schema,
    } = props

    const isComposite = schema.type === 'object'

    const Wrapper = isComposite ? 'div' : FieldContainer

    return (
        <Wrapper>
            <div>
                <label htmlFor={id}>{label}{required ? "*" : null}</label>
                {help}
            </div>
            <div>
                {children}
                {description}
                {errors}
            </div>
        </Wrapper>
    )
}

class OperationConsole extends Component {
    constructor(props) {
        super(props)

        this.state = {
            request:  null,
            formData: {},
        }
    }

    handleSubmit = form => {
        const { operation, client } = this.props
        const { formData }          = form

        this.setState({ formData })

        const request = {
            method: operation.method,
            pathName: operation.path,
            parameters: {},
            requestInterceptor: request => {
                this.setState({ request })
            },
        }

        if (formData.query) {
            request.parameters = Object.assign(request.parameters, formData.query)
        }

        try {
            client.execute(request)
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.error(err.message)
                })
        } catch (err) {
            console.error(err.message)
        }
    }

    render() {
        const { operation } = this.props
        const { request, formData } = this.state

        const schema = {
            type:       'object',
            properties: {},
        }

        const paramsByLocation = _.groupBy(operation.parameters, 'in')
        if (paramsByLocation.path) {
            const pathSchema = {
                type:       'object',
                properties: {},
            }

            paramsByLocation.path.forEach(param => {
                pathSchema.properties[param.name] = param
            })

            schema.properties.path = pathSchema
        }

        if (paramsByLocation.query) {
            const querySchema = {
                type:       'object',
                properties: {},
            }

            paramsByLocation.query.forEach(param => {
                querySchema.properties[param.name] = param
            })

            schema.properties.query = querySchema
        }

        return (
            <Container>
                <Form
                    schema={schema}
                    FieldTemplate={CustomFieldTemplate}
                    onSubmit={this.handleSubmit}
                    formData={formData}
                />
                {request && (
                    <RequestInfo>
                        {request.method} {request.url}
                    </RequestInfo>
                )}
            </Container>
        )
    }
}

export default OperationConsole
