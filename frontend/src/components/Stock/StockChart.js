//**Renders Stock Chart */
import React from "react";

function Graph(){
    return(
<div className="bg-blue-800 text-white py-5 px-5">
  <div className="flex flex-wrap items-end">
    <div className="flex-1">
      <h3 className="text-lg font-semibold leading-tight">Stocks Graph</h3>
    </div>
  </div>
  <div>
    <canvas id="chart" className="bg-blue-800"></canvas>
  </div>
</div>

    
    );
}
export default Graph;