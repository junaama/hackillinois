//**Renders Stock Chart */
import React from 'react';
import {Line} from 'react-chartjs-2';
import stockData from "../../stockdata.json";

function Chart(props) {
    const Response = stockData.filter((item) => {
      return item["Name"] === props.ticker;
    });
    const state = {
        labels: ['3/31', '4/01', '4/02', '4/03', '4/04', '4/05', '4/06', '4/07', '4/08', '4/09'],
        datasets: [
          {
            label: 'Stock Price',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [Response[0]["Price_1"], Response[0]["Price_2"], Response[0]["Price_3"], Response[0]["Price_4"], Response[0]["Price_5"], Response[0]["Price_6"], Response[0]["Price_7"]]
          }
        ]
      }
    return (
        <div>
          <Line
            data={state}
            options={{
              title:{
                display:true,
                text: Response[0]["Name"],
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </div>
      );
}

export default Chart;

