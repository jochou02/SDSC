import { keyboard } from '@testing-library/user-event/dist/keyboard';
import React, {Component, useState, useEffect} from 'react';
import '../../App.css';
import "../Courses.css";


export default function Courses(){
    const [value,setValue] = useState(''); //what is typed into the search bar
    const [data, setData] = useState([  //using temporary dummy data
        {course_dept: 'a'},
        {course_dept: 'b'},
        {course_dept: 'c'}
    ]);  //data of current courses
    const [filteredData, setFilteredData] = useState([
        {course_dept: 'a'},
        {course_dept: 'b'},
        {course_dept: 'c'}
    ]); //data of current courses that match what is typed into the search bar

    const [data2,setData2] = useState([
        {course_dept: 'a'},
        {course_dept: 'b'},
        {course_dept: 'c'}
    ]); //data of completed courses
    const [filteredData2, setFilteredData2] = useState([
        {course_dept: 'a'},
        {course_dept: 'b'},
        {course_dept: 'c'}
    ]); //data of completed couress that match what is typed into the search bar 

    const onChange = (event) =>{        //sets value to whatever is typed into the search bar
        setValue(event.target.value);
    }
    
    const OnSearch = () => {    //filters data with what is typed into search bar and stores into filteredData state
        //api to fetch search result

        // once component did mount, should have searchVslue and data state  
        //filters the current courses     
        let filtered = []
        for(let i=0;i<data.length;i++){
            console.log(data[i].course_dept);
            if(data[i].course_dept.includes(value)){
                console.log("abc")
                filtered.push(data[i]);
            }
        }

        console.log(JSON.stringify(filtered));
        setFilteredData(filtered);
       
        //filters the completed courses
        let filtered2 = []
        for(let i=0;i<data2.length;i++){
            console.log(data2[i].course_dept);
            if(data2[i].course_dept.includes(value)){
                console.log("abc")
                filtered2.push(data2[i]);
            }
        }

        setFilteredData2(filtered2);
        
    }

    useEffect(() => {   //pulls in information from data base and puts it into data state
        // Update the document title using the browser API
        const headers = {"Content-Type": "application/json"};

        if (localStorage.getItem('auth-token')) {
            headers["Authorization"] = localStorage.getItem('auth-token');
        }

        fetch('http://127.0.0.1:8000/tutoring/get_current_courses/', { headers, })
                    .then(response => response.json())
                    .then((data) => {
                    setData(data)
                    setFilteredData(data)
        })
        .catch(console.log)
        fetch('http://127.0.0.1:8000/tutoring/get_completed_courses/', { headers, })
                    .then(response => response.json())
                    .then((data) => {
                    setData2(data)
                    setFilteredData2(data)
        })
        .catch(console.log)
      });


    return (
       <div className = 'CoursePageContainer'>  
            <input type = "text" placeholder = "Search for classes" value = {value} onChange = {onChange} className = 'ClassSearchBar'/>
            <div className = 'searchButton'>
            <button onClick = {()=>OnSearch(value)}> Search </button>
            </div>


        <div className = 'CurrentCourses'>        
            <div className='currentCourseTitle'>
                Current Courses - Fall 2022 
                {/* <button className = "sortByTop">
                Sort By
                </button> */}
            </div>

            {filteredData.map(filtered => {
            return <div className = 'currentCourse'> {filtered.course_dept}</div>
        })}
        </div>
        
        <div className = 'CompletedCourses'>
            <div className = 'completedCourseTitle'>
                Completed Courses
                {/* <button className = "sortByBottom">
                Sort By
                </button> */}
            </div>
            {filteredData2.map(filtered => {
            return <div className = 'completedCourse'> {filtered.course_dept}</div>
        })}
        </div>
        </div>
    );
}