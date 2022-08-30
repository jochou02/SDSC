import React, { Component } from 'react'
import styles from '../../styles/LinkProfile.module.css'
import { Link } from 'react-router-dom'

class LinkProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };
  }

  render() {
    return (<>
      <Link to={`/user/${this.props.id}`}>
        <button 
          className={styles.profileButton}>
        Display User Profile
        </button>
      </Link>
     </>);
  }
}

export default LinkProfile