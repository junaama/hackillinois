import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend} from "recharts";

const data = [
  {
    name: "Positive",
    uv: 100,
  },
  {
    name: "Negative",
    uv: -100,
  },
];

export default function App() {
  return (
  <div className="flex items-center justify-center">
    <BarChart barCategoryGap={5}
     width={250} height={150} data={data} >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar layout="horizontal" dataKey="uv" fill="#8884d8" />
    </BarChart>
    </div>
  ); 
}
