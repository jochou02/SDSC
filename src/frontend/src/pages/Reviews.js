import React, {useState, useEffect} from 'react'
import '../../App.css'
import "../Reviews.css";


export default function Reviews(){

    return (
        <div className = "ReviewPageContainer">
            <div className = 'ReviewStats'>
                Course Stats
                <div className = "classStat">
                    Avg Class Approval:
                    <div>93.2%</div>
                </div>
                <div className = "classStat">
                    Avg Hours Committed:
                    <div>11.33/ week</div>
                </div>
                <div className = "classStat">
                    Avg Grade:
                    <div>B (3.07)</div>
                </div>
            </div>
            <div className = 'ReviewSection'>
            <button className = "reviewButton">
                Leave A Review!
            </button>
            <div className = 'reviewTitle'>Reviews</div>
            <button className = "sortBy">
                Sort By
            </button>
            <div className='reviews'>
                <div className = 'profName'>Professor Name - Quarter Year</div>
                {/* <div>Rating</div> */}
                <div className = 'ratingDescription'>Oh he decisively impression attachment friendship so if everything. Whose her enjoy chief new young. Felicity if ye required likewise so doubtful. On so attention necessary at by provision otherwise existence direction. Unpleasing up announcing unpleasant themselves oh do on. Way advantage age led listening belonging supposing.
</div>
            </div>
            <div className='reviews'>
                <div className = 'profName'>Professor Name - Quarter Year</div>
                {/* <div>Rating</div> */}
                <div className = 'ratingDescription'>Oh he decisively impression attachment friendship so if everything. Whose her enjoy chief new young. Felicity if ye required likewise so doubtful. On so attention necessary at by provision otherwise existence direction. Unpleasing up announcing unpleasant themselves oh do on. Way advantage age led listening belonging supposing.
</div>
            </div>
            <div className='reviews'>
                <div className = 'profName'>Professor Name - Quarter Year</div>
                {/* <div>Rating</div> */}
                <div className = 'ratingDescription'>Oh he decisively impression attachment friendship so if everything. Whose her enjoy chief new young. Felicity if ye required likewise so doubtful. On so attention necessary at by provision otherwise existence direction. Unpleasing up announcing unpleasant themselves oh do on. Way advantage age led listening belonging supposing.
</div>
            </div>
            <div className='reviews'>
                <div className = 'profName'>Professor Name - Quarter Year</div>
                {/* <div>Rating</div> */}
                <div className = 'ratingDescription'>Oh he decisively impression attachment friendship so if everything. Whose her enjoy chief new young. Felicity if ye required likewise so doubtful. On so attention necessary at by provision otherwise existence direction. Unpleasing up announcing unpleasant themselves oh do on. Way advantage age led listening belonging supposing.
</div>
            </div>
            </div>
        </div>
        
    );
}