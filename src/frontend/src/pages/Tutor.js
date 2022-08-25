import React, { useEffect, useState } from "react";
import './App.css';
import TutorBox from "./TutorBox";
import myjson from "./Sample.json";
import myclasses from "./Classes.json";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import Navbar from "./Navbar.jsx";
import axios from 'axios';

const Tutor = () => {
    const [classSelected, setClassSelected] = useState([]);

    //Pull data
    /*axios.get("http://127.0.0.1:8000/api/students/")
        .then(function (response) {
            console.log(response.data);
    })*/
    //Retrieve the list of courses the tutors can teach
    const classBank = myjson.tutor.map((tutor) => tutor.Course);
    //Retrieves the list of tutors
    const tutors = myjson.tutor.map((tutor) => tutor);

    let selectedTutors = [];

    //When selected a class, will see if tutor is tutoring 
    //the course, setting true and false. Then sets it.
    const handleChange = (selectedOption) => {
        console.log("handleChange", selectedOption);
        for (let i = 0; i < classBank.length; i++) {
            if (classBank[i] === selectedOption.label) {
                selectedTutors[i] = true;
            }
            else {
                selectedTutors[i] = false;
            }
        }
        setClassSelected(availbleTutors());
    }
    
    //puts available tutors inside an array and returns it
    function availbleTutors() {
        let displayTutors = [];
        let displayTutorIndex = 0;
        for (let i = 0; i < selectedTutors.length; i++) {
            if (selectedTutors[i]) {
                displayTutors[displayTutorIndex] = tutors[i];
                displayTutorIndex++;
            }
        }
        return displayTutors;
    }

    //Search bar functionality, renders the available classes as it is being searched
    const loadOptions = (searchValue, callBack) => {
        setTimeout( () => {
          const filteredOptions = myclasses.filter((option) => 
            option.label.toLowerCase().includes(searchValue.toLowerCase())
          );
          console.log('loadOptions', searchValue, filteredOptions);
          callBack(filteredOptions);
        }, 2000);
    }
    
    return (
        <div className="title">
            <div><Navbar /></div>
            <div><h1 class="heading">Tutors</h1></div>
            <div className="container" value="select a class">
                <AsyncSelect loadOptions={loadOptions} onChange={handleChange}/>
                {classSelected.map((tutor) => (
                    <TutorBox tutor={tutor}/>
                ))}
            </div>
        </div>
    )
}

export default Tutor;