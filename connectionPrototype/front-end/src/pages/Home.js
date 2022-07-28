import React, { Component } from 'react';

import LoggedInTester from '../buttons/LoggedInTester';

import GenerateMatching from './components/GenerateMatching';
import MatchingReceived from './components/MatchingReceived';
import MatchingFinished from './components/MatchingFinished';

/*
    GenerateMatching takes care of generating a matching, as well as displaying
    matching that we have sent.

    Matching Received takes care of interaction between we and matching that we
    have received.


*/
class Profile extends Component {
    render() {
      return (
        <>
            <LoggedInTester />

            <GenerateMatching />
            <MatchingReceived />
            <MatchingFinished />

        </>
      );
    }
  }

  export default Profile