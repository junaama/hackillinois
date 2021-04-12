import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import axios from 'axios'

export default function App({ ticker }) {

  const [ data, setData ] = useState([]);

  useEffect(() => {
    async function getData() {
      const results = await axios.get(process.env.REACT_APP_FLASK_API + `/tickers/${ticker}`);
      setData(results.data);
    }

    getData();
  }, [ticker]);

  const newData = data.map(obj => {
    obj.date = obj.date.split(" ").slice(0, 4).join(" ");
    return obj;
  });

  return (
    <>
    <LineChart width={700} height={300} data={newData}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={2} />
    </LineChart>
    </>
  ); 
};