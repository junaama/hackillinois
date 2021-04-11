//**Renders each invidual Stock Card data */
import React from 'react';
import './StockCard.css'
import stockData from '../../stockdata.json'

function Card(props){
    const Response= stockData.filter((item) =>{
        return item["Name"] === props.ticker
    });

    console.log(Response);
    return(
        <div className="card-container">
            <div className="card-content">
                <div className="card-title">
                    <h3>{Response[0]["Name"]}</h3>
                </div>
                <div className="card-abrv">
                    <p>{Response[0]["Ticker"]}</p>
                </div>
                <div className="card-recommend">
                    <p>{Response[0]["Recommendation"]}</p>
                </div>
                <div className="card-sentiment">
                    <p>{Response[0]["Sentiment"]}</p>
                </div>
                <div className="card-score">
                    <p>{Response[0]["Confidence Score"]}</p>
                </div>
            </div>
            <div>
  </div>
    </div>

    )
}

export default Card