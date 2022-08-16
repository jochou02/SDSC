import React, { Component } from 'react'
import styles from '../../styles/Test.module.css'
import { Link } from 'react-router-dom'

class Test extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<>
      <Link to="/test_profile" state={{ from: "occupation" }}>
        <button className={styles.profileButton}>Display User Profile</button>
      </Link>
     </>);
  }
}

export default Test