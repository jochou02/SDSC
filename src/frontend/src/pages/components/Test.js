import React, { Component } from 'react'
import styles from '../../styles/Test.module.css'
import { Link } from 'react-router-dom'
import TestProfile from './TestProfile'
import LinkTest from './LinkTest'

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {id: ''};
  }

  render() {
    return (<>
      <LinkTest 
        to={`/user/${this.props.id}`}>
      </LinkTest>
     </>);
  }
}

export default Test