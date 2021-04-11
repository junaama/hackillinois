import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  {
    "date": "Day 1",
    "price": 4000,
  },
  {
    "date": "Day 2",
    "price": 5000,
  },
  {
    "date": "Day 2",
    "price": 5000,
  },
];

export default function App() {
  return (
    <LineChart width={730} height={250} data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={2} />
    </LineChart>
  ); 
};