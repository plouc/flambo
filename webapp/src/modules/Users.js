import React, { Component } from 'react';


class Users extends Component {
    constructor(props) {
        super(props);

        this.state = { users: [] };
    }

    componentWillMount() {
        fetch('http://localhost:3000/api/v1/users')
            .then(response => response.json())
            .then(json => {
                this.setState({ users: json });
            })
            .catch(err => {
                console.error(err);
            })
        ;
    }

    render() {
        const { users } = this.state;

        return (
            <div>
                <h1>Users</h1>
                <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
                </ul>
            </div>
        );
    }
}


export default Users;
