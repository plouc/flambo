import React, { Component } from 'react';
import Combokeys            from 'combokeys';
import { Link }             from 'react-router';
import { browserHistory }   from 'react-router';
import Events               from '../components/Events';


class App extends Component {
    componentDidMount() {
        const combokeys = new Combokeys(document.documentElement);
        combokeys.bind('t', () => {
            browserHistory.push('/topics');
        });
        combokeys.bind('u', () => {
            browserHistory.push('/users');
        });
        combokeys.bind('s', () => {
            browserHistory.push('/sources');
        });
        combokeys.bind('n', () => {
            const { location: { pathname } } = this.props;

            switch (pathname) {
                case '/topics':
                    browserHistory.push('/topics/new');
                    break;

                case '/sources':
                    browserHistory.push('/sources/new');
                    break;
            }
        });
    }

    render () {
        return (
            <div style={{ fontFamily: 'consolas' }}>
                <h1>flambo</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ul role="nav" style={{ width: '15%' }}>
                        <li><Link to="/topics"      activeStyle={{ color: 'red' }}>topics [t]</Link></li>
                        <li><Link to="/topics/new"  activeStyle={{ color: 'red' }}>new topic [n]</Link></li>
                        <li><Link to="/users"       activeStyle={{ color: 'red' }}>users [u]</Link></li>
                        <li><Link to="/news_items"  activeStyle={{ color: 'red' }}>news items</Link></li>
                        <li><Link to="/sources"     activeStyle={{ color: 'red' }}>sources [s]</Link></li>
                        <li><Link to="/sources/new" activeStyle={{ color: 'red' }}>new source [n]</Link></li>
                    </ul>
                    <div style={{ width: '60%' }}>
                        {this.props.children}
                    </div>
                    <div style={{ width: '15%' }}>
                        <Events />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;