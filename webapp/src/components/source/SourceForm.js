import React, { Component, PropTypes } from 'react';
import assign                          from 'object-assign';
import Api                             from '../../Api';


class SourceForm extends Component {
    constructor(props) {
        super(props);

        this.handleDataChange   = this.handleDataChange.bind(this);
        this.handleThemesChange = this.handleThemesChange.bind(this);
        this.handleSubmit       = this.handleSubmit.bind(this);

        this.state = {
            topics:  [],
            loading: true
        };
    }

    componentWillMount() {
        Api.getTopics()
            .then(topics => {
                this.setState({
                    topics,
                    loading: false
                });
            })
        ;
    }

    handleDataChange(event) {
        const { source, onChange } = this.props;
        onChange(assign({}, source, { data: event.target.value }));
    }

    handleThemesChange(event) {
        const { source, onChange } = this.props;

        const options = event.target.options;
        const themes  = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                themes.push(options[i].value);
            }
        }

        onChange(assign({}, source, { themes }));
    }

    handleSubmit(e) {
        e.preventDefault();

        const { onSubmit } = this.props;

        onSubmit();
    }

    render() {
        const { source }           = this.props;
        const { topics, loading }  = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="sourceData">data</label><br/>
                    <textarea
                        id="sourceData"
                        style={{ width: '100%', height: '80px', fontFamily: 'inherit', fontSize: 'inherit' }}
                        value={source.data}
                        onChange={this.handleDataChange}
                    />
                </div>
                {!loading && (
                    <div>
                        <label htmlFor="sourceTopics">topics</label><br/>
                        <select
                            id="sourceTopics"
                            multiple={true}
                            style={{ width: '100%', height: '200px', fontFamily: 'inherit', fontSize: 'inherit' }}
                            value={(source.themes || []).map(topic => topic.id)}
                            onChange={this.handleThemesChange}
                        >
                            {topics.map(topic => (
                                <option key={topic.id} value={topic.id}>{topic.name}</option>
                            ))}
                        </select>
                    </div>
                )}
                <button
                    style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
                    type="submit"
                >
                    save
                </button>
            </form>
        );
    }
}

SourceForm.propTypes = {
    source: PropTypes.shape({
        type:   PropTypes.string.isRequired,
        themes: PropTypes.array,
        data:   PropTypes.string.isRequired
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};


export default SourceForm;
