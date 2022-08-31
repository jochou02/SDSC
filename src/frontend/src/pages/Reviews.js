import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import '../styles/App.css'
import "../styles/Reviews.css"
import StarRatingComponent from 'react-star-rating-component';

export default function Reviews() {

    const[classData,setClassData] = useState({});

    const [courseDept]  = useState(useParams().courseDept);

    const [courseNum]  = useState(useParams().courseNum);

    const[review, setReviews] = useState([ 
        // rating, description, course(course_dept, course_num,prof), student
    ])

    const[rating,makeRating] = useState("");    
    //state that holds the user's new rating

    const[description,makeDescription] = useState(""); //state that holds the user's new review

    const[prof,makeProf] = useState(""); //state that holds the prof the review is referring to
    
    const onChange = (e) => {   //function which holds user description of rating
        makeDescription(e.target.value);
    }

    const onStarClick=(e)=>{ //function which holds users rating # (1 to 5)
        makeRating(e);
        //console.log(e);
    }

    const profInput=(e)=>{ //function that holds the prof the review is referring to
        makeProf(e.target.value);
    }

    useEffect(() => {
        //GET request for class stats
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                course_dept: courseDept,
                course_num: courseNum
            })
        }

        fetch('http://127.0.0.1:8000/review/get_course_data/', requestOptions) 
            .then(response => response.json())
            .then((data) => {
                setClassData(data);
            })
        .catch(console.log)

        //GET request for reviews
        const requestOptions2 = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth-token'),
            },
            body: JSON.stringify({
                course_dept: courseDept,
                course_num: courseNum
            })
          };
        
        fetch("http://127.0.0.1:8000/review/get_reviews/", requestOptions2, ) 
            .then(response => response.json())
            .then((data) => {setReviews(data)})
        .catch(console.log)

        // eslint-disable-next-line
    }, []);

    const onSubmitEvent = (e) => {
        e.preventDefault();
        //POST request for setting reviews
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth-token'),
            },
            body: JSON.stringify({
                prof: prof,
                rating: rating,
                description: description,
                course_dept: courseDept,
                course_num: courseNum
            })
        };

        fetch('http://127.0.0.1:8000/review/set_reviews/', requestOptions, ) 
            .then(response => response.json())
        .catch(console.log)
    }
    
    return (
        <div className = "ReviewPageContainer"> 
            <div className = 'ReviewStats'>
            <div>{courseDept} {courseNum}</div>
                <div className = "classStat">
                    Avg Class Approval:
                    <div>{classData.AvgApproval}</div>    
                </div>
                <div className = "classStat">
                    Avg Hours Committed:
                    <div>{classData.AvgTime}</div>    
                </div>
                <div className = "classStat">
                    Avg Grade:
                    <div>{classData.AvgGrade}</div> 
                </div>
            </div>

            <div className = 'ReviewSection'>
            <form onSubmit = {onSubmitEvent}>
                <textarea placeholder="Write your own review!" type="text" 
                className='reviewBox' onChange={onChange} onSubmit={onSubmitEvent} 
                />
                <input type="text" placeholder="Professor Name" className='profInput' onChange={profInput}></input>
                <StarRatingComponent name = "stars" onStarClick={onStarClick}></StarRatingComponent>
                <button type ="submit" className = "reviewButton">
                Submit Review
                </button>
            </form>
            <div className = 'reviewTitle'>Reviews</div>
            {review.map(data => {
                return <div className='reviews'>
                <div className = 'profName'>{data.prof}
                <div className = 'rating_out_5'>{data.rating}</div>
                </div>
                
                <div className = 'ratingDescrption'>{data.description}</div>
                </div>
            })}
           
            </div>
        </div>
        
    );
}