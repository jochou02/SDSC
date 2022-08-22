import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import styles from '../../styles/Test.module.css'

class LinkTest extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {to: ''}
  }

  render() {
    return (
    <Link to={this.props.to}>
      <button 
        className={styles.profileButton}>
      Display User Profile
      </button>
    </Link>
    )
  };
}

export default LinkTest