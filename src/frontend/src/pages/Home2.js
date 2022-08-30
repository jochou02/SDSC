import React, {useState, useEffect} from 'react'
import '../styles/App.css';
import '../styles/Home.css';
import Navbar from './Navbar';

export default function Home() {
  const [state,setState] = useState(false);

  const toggle=()=>{
    setState(!state);
  }
  return (<>
    <Navbar />
      
        <div className ='homepage-container'>
        <div className = 'welcome-sign'>
          <h1>Welcome, User!</h1>
        </div>
        <div className = 'generalConnections'>
          <div className = 'myconnections'>
            <div className = 'cntTitle'><h1>My Connections</h1></div>
            <div className = 'mycntTop'>Connection Name 1</div>
            <div className = 'mycnt'>Connection Name 2</div>
            <div className = 'mycnt'>Connection Name 3</div>
            <div className = 'mycnt'>Connection Name 4</div>
          </div>
          <div className = 'new-connections'>
          <div className = 'reqTitle'>
            <h1>Connection Requests</h1>
            <button onClick = {toggle} className ={'toggle--button ' + (state ? 'toggle--close':'')}>
              {state ? 'Opt in!' : 'Opt Out!'}
            </button>
          </div>
            <div className = 'cntReq'>
                <div className = 'reqCnt'>
                  <div className = 'name'>Connection Request Name 1</div>
                  <div className = 'courses'>
                    Mutual Courses: Ex 1, Ex 2, Ex 3                     
                    <button className= 'accept'>O</button>
                    <button className= 'deny'>X</button>
                  </div>
                  <div className = 'friendRequest'>Incoming Friend Request</div>
                </div>
                <div className = 'reqCnt'>
                  <div>
                  <div className = 'name'>Connection Request Name 2</div>
                  <div className = 'courses'>
                    Mutual Courses: Ex 1, Ex 2, Ex 3                     
                    <button className= 'accept'>O</button>
                    <button className= 'deny'>X</button>
                  </div>
                  <div className = 'friendRequest'>Outgoing Friend Request</div>
                  </div>
                  <div className= 'acceptdeclinebtns'>
                  {/* <button className= 'accept'>O</button>
                  <button className= 'deny'>X</button> */}
                  </div>                  
                </div>           
            </div>
            <h1 className = 'recTitle'>Recommended Connections</h1>
            <div className = 'recCnt'>
              <div className= "con">
                <div className = 'name'>Recommended Connection Name 1</div>
                <div className = 'courses'>
                    Mutual Courses: Ex 1, Ex 2, Ex 3                     
                    <button className= 'accept'>O</button>
                    <button className= 'deny'>X</button>
                  </div>
              </div>
              <div className= "con">
                <div className= 'name'>Recommended Connection Name 2</div>
                <div className = 'courses'>
                    Mutual Courses: Ex 1, Ex 2, Ex 3                     
                    <button className= 'accept'>O</button>
                    <button className= 'deny'>X</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </>);
  }

