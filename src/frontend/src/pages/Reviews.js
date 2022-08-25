import React, {useState, useEffect} from 'react'
import '../styles/App.css'
import "../styles/Reviews.css"
import StarRatingComponent from 'react-star-rating-component';


export default function Reviews(){
    
    const[classData,setClassData] = useState([ //temporary dummy data
        {course_name:"CSE 100", avg_approval:"93.2%", avg_hours: "11.33", avg_grade:"B (3.07)", }, //not sure if names are correct
    ]);

    const[review, setReviews] = useState([ // rating, description, course(course_dept, course_num,prof), student
        {prof:"Professor A", rating:"5",description:"Oh he decisively impression attachment friendship so if everything. Whose her enjoy chief new young. Felicity if ye required likewise so doubtful. On so attention necessary at by provision otherwise existence direction. Unpleasing up announcing unpleasant themselves oh do on. Way advantage age led listening belonging supposing."},
        {prof:"Professor B", rating:"3",description:"Oh he decisively impression attachment friendship so if everything. Whose her enjoy chief new young. Felicity if ye required likewise so doubtful. On so attention necessary at by provision otherwise existence direction. Unpleasing up announcing unpleasant themselves oh do on. Way advantage age led listening belonging supposing."},
        {prof:"Professor C", rating:"4", description:"Oh he decisively impression attachment friendship so if everything. Whose her enjoy chief new young. Felicity if ye required likewise so doubtful. On so attention necessary at by provision otherwise existence direction. Unpleasing up announcing unpleasant themselves oh do on. Way advantage age led listening belonging supposing."},
        {prof:"Professor D", rating:"2",description:"Oh he decisively impression attachment friendship so if everything. Whose her enjoy chief new young. Felicity if ye required likewise so doubtful. On so attention necessary at by provision otherwise existence direction. Unpleasing up announcing unpleasant themselves oh do on. Way advantage age led listening belonging supposing."}
    ])

    const[rating,makeRating] = useState("");    //holds the user's new rating
    const[description,makeDescription]=useState(""); //holds the user's new review

    
    const onChange = (e) => {   //holds user description of rating
        makeDescription(e.target.value);
    }

    const setRating = (e) => {   //holds users rating # (1 to 5)
        makeRating(e);
    }

    const onSubmitEvent = (e) => {  //make it so that this function creates a new review and pushes into our reviews state
        e.preventDefault();
        let a = {prof:"Professor A", rating:rating, description:description}
        review.push(a);
    }

    
    /*
    useEffect(()=>{
        const headers = {"Content-Type": "application/json"};
       
        if (localStorage.getItem('auth-token')) {
            headers["Authorization"] = localStorage.getItem('auth-token');
        }
        //fetches data for reviews
        fetch('http://127.0.0.1:8000/review/get_reviews/', { headers, }) 
                    .then(response => response.json())
                    .then((data) => {
                    setReviews(data)
        })
        .catch(console.log)

        //for class stats
        const courseName = {
            method: 'POST',
            body: JSON.stringify({
                course_name: 'CSE 100'
            })
        }

        fetch('http://127.0.0.1:8000/review/get_course_data/', courseName) 
                    .then(response => response.json())
                    .then((data) => {
                    setClassData(data)
        })
        .catch(console.log)
    })
    */

    return (
        <div className = "ReviewPageContainer">         
            <div className = 'ReviewStats'>
            {classData.map(data => {
                return <div>{data.course_name}</div>
            })}
                <div className = "classStat">
                    Avg Class Approval:
                    <div>
                    {classData.map(data => {
                    return <div>{data.avg_approval}</div>
                    })}    
                    </div>
                </div>
                <div className = "classStat">
                    Avg Hours Committed:
                    <div>
                    {classData.map(data => {
                    return <div>{data.avg_hours}</div>
                    })} 
                    </div>
                </div>
                <div className = "classStat">
                    Avg Grade:
                    <div>
                    {classData.map(data => {
                    return <div>{data.avg_grade}</div>
                    })} 
                    </div>
                </div>
            </div>
            <div className = 'ReviewSection'>
            <form>
                <textarea 
                    placeholder="Write your own review!" 
                    type="text" 
                    className='reviewBox' 
                    onChange={onChange}
                />
                
                <StarRatingComponent 
                    className = "stars" onStarClick={setRating} name="stars">
                </StarRatingComponent>

                <button 
                    type ="submit" 
                    className = "reviewButton"
                    onClick={onSubmitEvent}>
                Submit Review
                </button>
            </form>
            <div className = 'reviewTitle'>Reviews</div>
            {/* <button className = "sortBy">
                Sort By
            </button> */}
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