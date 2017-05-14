import React, { Component, PropTypes } from 'react'
import Dropzone                        from 'react-dropzone'
import styled                          from 'styled-components'
import { FormattedMessage }            from 'react-intl'


const Placeholder = styled.div`
    cursor:        pointer;
    padding:       ${props => props.hasFile ? '0' : '6px 12px'};
    border-radius: 2px;
    font-size:     14px;
    border-width:  1px;
    border-color:  ${props => props.hasFile ? '#2AC8C5' : '#ccc'};
    border-style:  ${props => props.hasFile ? 'solid' : 'dotted'};
    overflow:      hidden;
`

const SelectedFile = styled.div`
    display:     flex;
    align-items: center;
`

const FilePreview = styled.div`
    width:             48px;
    height:            48px;
    background-color:  #f3f4f8;
    background-image:  url(${props => props.url});
    background-repeat: no-repeat;
    background-size:   cover;
`

const FileName = styled.span`
    padding:   6px 12px;
    font-size: 12px;
`

export default class DropzoneInput extends Component {
    static propTypes = {
        selectText:  PropTypes.string.isRequired,
        multiple:    PropTypes.bool.isRequired,
        withPreview: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        selectText:  'file_select',
        multiple:    false,
        withPreview: true,
    }

    handleChange = files => {
        const { input: { onChange } } = this.props
        onChange(files)
    }

    render() {
        const { input, meta, selectText, multiple, withPreview } = this.props

        const files    = input.value
        const hasFiles = files && Array.isArray(files)

        return (
            <div>
                <Dropzone
                    name={input.name}
                    multiple={multiple}
                    onDrop={this.handleChange}
                    style={{
                        borderWidth: 0,
                    }}
                >
                    <Placeholder hasFile={hasFiles}>
                        {!hasFiles && <FormattedMessage id={selectText}/>}
                        {hasFiles && (
                            <div>
                                {files.map((file, i) => (
                                    <SelectedFile key={i}>
                                        {withPreview && <FilePreview url={file.preview}/>}
                                        <FileName>{file.name}</FileName>
                                    </SelectedFile>
                                ))}
                            </div>
                        )}
                    </Placeholder>
                </Dropzone>
                {meta.touched && meta.error && (
                    <span className="error">{meta.error}</span>
                )}
            </div>
        )
    }
}