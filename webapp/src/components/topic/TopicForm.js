import React, { Component, PropTypes } from 'react';
import assign                          from 'object-assign';
import FormErrors                      from '../FormErrors';


class TopicForm extends Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit     = this.handleSubmit.bind(this);
    }

    handleNameChange(e) {
        const { topic, onChange } = this.props;
        onChange(assign({}, topic, { name: e.target.value }));
    }

    handleSubmit(e) {
        e.preventDefault();

        const { onSubmit } = this.props;

        onSubmit();
    }

    render() {
        const { topic, errors } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <FormErrors errors={errors}/>
                <div>
                    <label htmlFor="topicName">name</label><br/>
                    <input
                        id="topicName"
                        type="text"
                        style={{ width: '100%', fontFamily: 'inherit', fontSize: 'inherit' }}
                        value={topic.name}
                        onChange={this.handleNameChange}
                    />
                </div>
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

TopicForm.propTypes = {
    topic: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    errors:   PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};


export default TopicForm;
