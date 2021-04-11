//**Renders each invidual Stock Card data */
import React from 'react';
import './StockCard.css'

function Card({CompanyName, CompanyAbr, Recommend, Sentiment, ConfidenceScore}){
    return(
        <div className="card-container">

            <div className="card-content">
                <div className="card-title">
                    <h1>{CompanyName}</h1>
                </div>
                <div className="card-abrv">
                    <p>{CompanyAbr}</p>
                </div>
                <div className="card-recommend">
                    <p>{Recommend}</p>
                </div>
                <div className="card-sentiment">
                    <p>{Sentiment}</p>
                </div>
                <div className="card-score">
                    <p>{ConfidenceScore}</p>
                </div>
            </div>

    </div>
    )
}

export default Card