import React, { Component } from 'react';
import Test from '../components/Test';

class MatchingReceived extends Component {
    constructor(props) {
            super(props);

            this.ShowReceived = this.ShowReceived.bind(this);
            this.ShowFinalized = this.ShowFinalized.bind(this);

            this.handleRequestAccept = this.handleRequestAccept.bind(this);
            this.handleRequestDeny = this.handleRequestDeny.bind(this);
            this.handleRequestDelete = this.handleRequestDelete.bind(this);

            this.updateReceived = this.updateReceived.bind(this);
            this.updateFinalized = this.updateFinalized.bind(this);
    }

    state = {
        matching_received: [],
        matching_finalized: [],
    }

    componentDidMount() {
        this.updateReceived();
        this.updateFinalized();
    }

    updateReceived() {
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

    updateFinalized() {
        const headers = {"Content-Type": "application/json"};

            if (localStorage.getItem('auth-token')) {
                headers["Authorization"] = localStorage.getItem('auth-token');
            }

            fetch('http://127.0.0.1:8000/connect/match_finalized/', {headers, })
            .then(res => res.json())
            .then((data) => {
                this.setState({ matching_finalized: data })
                //console.log(data);
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
                    this.setState({}, () => {this.updateReceived(); this.updateFinalized();})
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
                    this.setState({}, () => {this.updateReceived();})
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
                        this.setState({}, () => {this.updateReceived();})
            })
            .catch(console.log)
    }

    ShowReceived = ({ received }) => {
        return (
            <>
            <div className="col">
            <h1>Matchings Received</h1>
                {received.map(match => <>
                    {match.isDenied ? <></> : <>
                        <ul>

                            <li>{match.first_name} {match.last_name}</li>
                            <div>{match.user_college}</div>

                            <button onClick={() => this.handleRequestAccept(match)}>
                                    Accept
                            </button>

                            <button onClick={() => this.handleRequestDeny(match)}>
                                    Deny
                            </button>

                            <hr />

                        </ul>
                    </>}
                    </>
                )}
            </div>
            </>
        );
    }

    ShowFinalized = ({ finalized }) => {
        //console.log(finalized);
            return (
                <>
                <div className="col">
                <h1>Recent Connections</h1>
                    {finalized.map((match) => <>
                        <ul>

                            <li >
                            {match.first_name} {match.last_name}</li>
                            <div>{match.user_college}</div>
                            <Test id={match.id}/>

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
            <this.ShowFinalized finalized = {this.state.matching_finalized} />
            </>
        )
    }
}


export default MatchingReceived;
