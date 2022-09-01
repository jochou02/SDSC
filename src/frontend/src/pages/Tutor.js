import React, { useEffect, useState, useRef } from "react";
import '../styles/Tutoring.css';
import TutorBox from './components/TutorBox'
import Navbar from "./Navbar.js"; // was jsx
import {AiOutlineSearch} from 'react-icons/ai'; //npm install react-icons --save

const Tutor = () => {
    const [userInfo, setUserInfo] = useState({});
    const courseDept = useRef("");
    const courseNumber = useRef("");
    const getData = (department, number) => {
        const headers = {"Content-Type": "application/json"};

        if (localStorage.getItem('auth-token')) {
            headers["Authorization"] = localStorage.getItem('auth-token');
        }

        fetch(`http://127.0.0.1:8000/tutoring/find_tutor/${department}/${number}`, { headers, })
                    .then(response => response.json())
                    .then((data) => {
                    setUserInfo(data)
        }).catch(console.log())
    }

    // useEffect (() => {
    //     console.log("effect is ran");
    //     async function fetchData() {
    //         setLoading(true);
    //         await getData(searchClass, searchNumber);
    //         setLoading(false);
    //     }
    //     if (clicked) {
    //         fetchData();
    //         console.log("fetched data")
    //         setClicked(false);
    //     }
    // }, [clicked])

    function handleClick() {
        getData(courseDept.current.value.toUpperCase(),
                courseNumber.current.value);
        console.log(userInfo)
        parseTutors();
        console.log(tutors);
    }
    
    const tutorsList = [];
    const [tutors, setTutors] = useState([]);
    function parseTutors() {
        for (let i = 0; i < userInfo.length; i++) {
            tutorsList[i] = {
                "ID" : i+1,
                "Name" : userInfo[i].first_name,
                "Course" : courseDept.current.value.toUpperCase() + " " + courseNumber.current.value,
                "Phone_Number": userInfo[i].phone,
                "Discord": userInfo[i].discord,
                "Pfp": userInfo[i].profile_pic,
                "Email": userInfo[i].email,
                "Bio": "Hello, feel free to ask for help!",
            }
        }
        setTutors(tutorsList);
    }
    return (
        <div className="title">
            <div><Navbar /></div>
            <div><h1 class="heading">Tutors</h1></div>
            <div className="container" value="select a class">
                <div className="Search">
                    <div className="searchInputs">
                        <input type="text" 
                               placeholder="Search class dept..." 
                               ref={courseDept}>
                        </input>
                        <input type="text" 
                               placeholder="Search class number..." 
                               ref={courseNumber}>
                        </input>
                        <button onClick={handleClick}>
                            <AiOutlineSearch/>
                        </button>
                    </div>
                </div>
                {tutors.map((tutor) => 
                (<TutorBox tutor={tutor} />)
                )}
            </div>
        </div>
    )
}

export default Tutor;
