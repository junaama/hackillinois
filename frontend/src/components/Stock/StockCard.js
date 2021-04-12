//**Renders each invidual Stock Card data */
import React from "react";
/*import "./StockCard.css";*/
import stockData from "../../stockdata.json";
import UpdateWatchlist from '../Watchlist/UpdateWatchlist'
// import Graph from './StockChart'
import Example from "../Graph/Graph";

function Card(props) {
  const Response = stockData.filter((item) => {
    return item["Name"] === props.ticker;
  });

  return (
      <>
    <div className="flex items-center justify-center">
      <Example ticker={Response[0]["Ticker"]} />
      <div className="text-center bg-purple-lightest ml-5">
        <div className="">
          <p className="p-1 font-bold text-purple-darker">
            {Response[0]["Name"]} | {}
            {Response[0]["Ticker"]}
          </p>
        </div>

        <div className="bg-white">
          <p className="p-1 text-purple-darker">Recommendation: {Response[0]["Recommendation"]}</p>
        </div>
        <div className="bg-purple-darker">
          <p className="p=1 text-white">
            Sentiment: {Response[0]["Sentiment"]}
          </p>
        </div>
        <div className="bg-white">
          <p className="p-1 text-purple-darker">Confidence: {Response[0]["Confidence_Score"]}</p>
        </div>

        <div className="flex flex-row justify-between p-1">
          <div>-{Response[0]["Negative_Num"]}</div>
          <div>+{Response[0]["Positive_Num"]}</div>
        </div>
      </div>
   
    </div>
    {props.showAddWatchlist ? <UpdateWatchlist ticker={props.ticker}/>: ""}
    </>
  );
}

export default Card;
