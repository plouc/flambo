import React, { Component } from 'react'


class Events extends Component {
    constructor(props) {
        super(props)

        this.state = {
            events: []
        }
    }

    componentWillMount() {
        let wsUrl = `ws://localhost:3000/watch`
        const ws = new WebSocket(wsUrl)

        ws.onopen = () => {
            console.log('ws connected')
        }

        ws.onmessage = event => {
            console.log(event)
            if (event.data) {
                let { events } = this.state
                events = events.slice()
                events.push(JSON.parse(event.data))
                this.setState({ events })
            }
        }
    }

    render() {
        const { events } = this.state

        return (
            <div>
                <h2>Events</h2>
                <ul>
                    {events.map(event => (
                        <li>{event.new_val.type} {event.new_val.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}


export default Events
