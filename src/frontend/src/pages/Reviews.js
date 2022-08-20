import React, {useState, useEffect} from 'react'
import '../../App.css'
import "../Reviews.css";


export default function Reviews(){
    const[classData,setClassData] = useState([ //temporary dummy data
        {course_name:"CSE 100", avg_approval:"93.2%", avg_hours: "11.33", avg_grade:"B (3.07)", },
    ]);
    
    const[review, setReviews] = useState([
        {prof_name:"Professor A", class_time_held:"Fall 2021", rating:"5",class_review:"Oh he decisively impression attachment friendship so if everything. Whose her enjoy chief new young. Felicity if ye required likewise so doubtful. On so attention necessary at by provision otherwise existence direction. Unpleasing up announcing unpleasant themselves oh do on. Way advantage age led listening belonging supposing."},
        {prof_name:"Professor B", class_time_held:"Spring 2020", rating:"3",class_review:"Oh he decisively impression attachment friendship so if everything. Whose her enjoy chief new young. Felicity if ye required likewise so doubtful. On so attention necessary at by provision otherwise existence direction. Unpleasing up announcing unpleasant themselves oh do on. Way advantage age led listening belonging supposing."},
        {prof_name:"Professor C", class_time_held:"Winter 2017", rating:"4", class_review:"Oh he decisively impression attachment friendship so if everything. Whose her enjoy chief new young. Felicity if ye required likewise so doubtful. On so attention necessary at by provision otherwise existence direction. Unpleasing up announcing unpleasant themselves oh do on. Way advantage age led listening belonging supposing."},
        {prof_name:"Professor D", class_time_held:"Summer 2019", rating:"2",class_review:"Oh he decisively impression attachment friendship so if everything. Whose her enjoy chief new young. Felicity if ye required likewise so doubtful. On so attention necessary at by provision otherwise existence direction. Unpleasing up announcing unpleasant themselves oh do on. Way advantage age led listening belonging supposing."}
    ])
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
            <button className = "reviewButton">
                Leave A Review!
            </button>
            <div className = 'reviewTitle'>Reviews</div>
            {/* <button className = "sortBy">
                Sort By
            </button> */}
            {review.map(data => {
                return <div className='reviews'>
                <div className = 'profName'>{data.prof_name}
                <div className ='classTime'>{data.class_time_held}</div>
                <div className = 'rating_out_5'>{data.rating}</div>
                </div>
                
                <div className = 'ratingDescrption'>{data.class_review}</div>
                </div>
            })}
           
            </div>
        </div>
        
    );
}