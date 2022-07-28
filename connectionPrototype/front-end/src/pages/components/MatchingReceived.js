import React, { Component } from 'react';

class MatchingReceived extends Component {
    constructor(props) {
            super(props);

            this.ShowReceived = this.ShowReceived.bind(this);

            this.handleRequestAccept = this.handleRequestAccept.bind(this);
            this.handleRequestDeny = this.handleRequestDeny.bind(this);
            this.handleRequestDelete = this.handleRequestDelete.bind(this);

            this.foo = this.foo.bind(this);
    }
    
    
    state = {
        matching_received: [],
    }

    componentWillMount() {
        const headers = {"Content-Type": "application/json"};

        if (localStorage.getItem('auth-token')) {
            headers["Authorization"] = localStorage.getItem('auth-token');
        }

        fetch('http://127.0.0.1:8000/connect/match_received/', {headers, })
        .then(res => res.json())
        .then((data) => {
            this.setState({ matching_received: data })
        })
        
        .catch(console.log)
    }

    handleRequestAccept(match) {
        const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                               'Authorization': localStorage.getItem('auth-token')},
                    body: JSON.stringify({ id_sender: match.id,
                                           id_receiver: false,
                                           mode: 'y'})
                };

                fetch('http://127.0.0.1:8000/connect/modify_pending/', requestOptions)
                      .then(response => response.json())
                      .then((data) => {
                            this.setState({})
                })
                .catch(console.log)
    }

    handleRequestDeny(match) {
        const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                               'Authorization': localStorage.getItem('auth-token')},
                    body: JSON.stringify({ id_sender: match.id,
                                           id_receiver: false,
                                           mode: 'n'})
                };

                fetch('http://127.0.0.1:8000/connect/modify_pending/', requestOptions)
                      .then(response => response.json())
                      .then((data) => {
                            this.setState({})
                })
                .catch(console.log)
    }

    handleRequestDelete(match) {
        const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Authorization': localStorage.getItem('auth-token')},
                body: JSON.stringify({ id_sender: match.id,
                                       id_receiver: false,
                                       mode: 'd'})
            };

            fetch('http://127.0.0.1:8000/connect/modify_pending/', requestOptions)
                  .then(response => response.json())
                  .then((data) => {
                        this.setState({})
            })
            .catch(console.log)
    }

    foo() {;}

    ShowReceived = ({ received }) => {
        return (
            <>
            <div className="col">
            <h1>Matchings Received</h1>
                {received.map(match => <>
                    <ul>

                        <li>{match.first_name} {match.last_name}</li>
                        <div>{match.user_college}</div>

                        <button onClick={() => this.handleRequestAccept(match)}>
                                Accept
                        </button>

                        <button onClick={() => this.handleRequestDeny(match)}>
                                Deny
                        </button>

                        <button onClick={() => this.handleRequestDelete(match)}>
                                Cancel Request
                        </button>

                        <hr />


                     </ul>
                    </>
                )}
            </div>
            </>
        );
    }

     
    render() {
        return (
            <>
            <this.ShowReceived received = {this.state.matching_received} />
            </>
        )
    }
}


export default MatchingReceived;
