import React, { Component } from 'react';

class MatchingReceived extends Component {
    constructor(props) {
            super(props);

            this.ShowFinalized = this.ShowFinalized.bind(this);
    }


    state = {
        matching_finalized: [],
    }

    componentWillMount() {
        const headers = {"Content-Type": "application/json"};

        if (localStorage.getItem('auth-token')) {
            headers["Authorization"] = localStorage.getItem('auth-token');
        }

        fetch('http://127.0.0.1:8000/connect/match_finalized/', {headers, })
        .then(res => res.json())
        .then((data) => {
            this.setState({ matching_finalized: data })
        })

        .catch(console.log)
    }

    ShowFinalized = ({ finalized }) => {
        return (
            <>
            <div className="col">
            <h1>Recent Connections</h1>
                {finalized.map(match => <>
                    <ul>

                        <li>{match.first_name} {match.last_name}</li>
                        <div>{match.user_college}</div>

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
            <this.ShowFinalized finalized = {this.state.matching_finalized} />
            </>
        )
    }
}


export default MatchingReceived;