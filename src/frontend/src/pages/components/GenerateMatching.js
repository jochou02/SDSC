import React, { Component } from 'react';

class GenerateMatching extends Component {
    constructor(props) {
            super(props);

            this.handleRequestMatch = this.handleRequestMatch.bind(this);
            this.handleGenerateMatch = this.handleGenerateMatch.bind(this);
            this.handleRequestDelete = this.handleRequestDelete.bind(this);

            this.foo = this.foo.bind(this);
    }
    
    
    state = {
        matching_sent: [],
        matching_latest: [],

        matching_requested: false
    }

    // Update the list of all matching the user has received
    componentDidMount() {
        // GET request to appropriate API.
        const headers = {"Content-Type": "application/json"};

        if (localStorage.getItem('auth-token')) {
            headers["Authorization"] = localStorage.getItem('auth-token');
        }

        fetch('http://127.0.0.1:8000/connect/match_sent/', {headers, })
        .then(res => res.json())
        .then((data) => {
            this.setState({ matching_sent: data })
        })
        
        .catch(console.log)
    }
    
    // Generate a match by calling GenerateMatchingView in backend using GET method
    handleGenerateMatch() {
        const headers = {"Content-Type": "application/json"};

        if (localStorage.getItem('auth-token')) {
            headers["Authorization"] = localStorage.getItem('auth-token');
        }

        fetch('http://127.0.0.1:8000/connect/generate_match/', {headers, })
        .then((res) => {res.json()})
        .then((data) => {
            this.setState({ matching_latest: data,
                            matching_requested: true})
        })
        
        .catch(console.log)
    }

    // Pushes this request into the PendingMatching table, by calling 
    // GenerateMatchingView in backend using POST method
    handleRequestMatch() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('auth-token') },
            body: JSON.stringify({ id_receiver: this.state.matching_latest.id})
        };
        fetch('http://127.0.0.1:8000/connect/generate_match/', requestOptions)
            .then(response => response.json())
            .then(() => {
            this.setState({}, (this.foo()))
        });
    }

    handleRequestDelete(match) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Authorization': localStorage.getItem('auth-token')},
            body: JSON.stringify({ id_sender: false,
                                   id_receiver: match.id,
                                   mode: 'd'})
        };

        fetch('http://127.0.0.1:8000/connect/modify_pending/', requestOptions)
              .then(response => response.json())
              .then((data) => {
                    this.setState({}, () => this.foo(false))
        })
        .catch(console.log)

    }

    foo(refresh=true) {
        const headers = {"Content-Type": "application/json"};

        if (localStorage.getItem('auth-token')) {
            headers["Authorization"] = localStorage.getItem('auth-token');
        }

        fetch('http://127.0.0.1:8000/connect/match_sent/', {headers, })
        .then(res => res.json())
        .then((data) => {
            this.setState({ matching_sent: data })
        })

        .catch(console.log)

        if (refresh)
            this.handleGenerateMatch()
    }
 
    // Format the output
    ShowSent = ({ sent }) => {
        return (
            <>
            <div className="col">
            <h1>Matchings Sent</h1>
                {sent.map(match => <>
                    <ul>
                    
                        <li>Name : {match.first_name} {match.last_name}</li>
                        <div>
                            College: {match.user_college} Major: {match.user_major}
                            &emsp;&emsp;&emsp; {match.isDenied ? <> Denied </> : <> Pending </>}
                        </div>



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

    // Format the output
    ShowMatching = ({ match }) => {
        let prompt;
        if (this.state.matching_requested) {
            prompt = <>
            <div>Name: {match.first_name} {match.last_name}</div>
            <div>College: {match.user_college}</div>

            {/* 
                Call GenerateMatchingView in backend using POST by calling 
                handleRequestMatch()
            */}

            <button onClick={this.handleRequestMatch}>
                Send Request
            </button>

            <br />
            </>;
        } else {
            prompt = <>
                <div>Welcome!</div>
    
                <div>Click Match Me! to receive a matching.</div><br />
            </>
        }

        return (
            <>
            <div className="col">
            <h1>Your Match </h1>
                    {prompt}
            </div>
            </>
        );
    }

    render() {
        return (
            <>
            <this.ShowMatching match={this.state.matching_latest} /> 

            {/* Generates a new match whenever clicked */}
            <button onClick={this.handleGenerateMatch}>       
                Match Me!
            </button>
            <this.ShowSent sent={this.state.matching_sent} />

            <br />
            </>
        )
    }
}

export default GenerateMatching;