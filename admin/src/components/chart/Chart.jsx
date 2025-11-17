import "./chart.css";

import { LineChart, 
         Line, 
         XAxis, 
         CartesianGrid, 
         Tooltip, 
         ResponsiveContainer } from 'recharts';


export default function Chart ({title, data, dataKey, grid}) {


   return ( 
      <div className="chart">
             <h3 className="chart-title">{title}</h3>
             <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart 
                   data={data}>
                  <XAxis dataKey="name" stroke="#4d4c63"/>
                  <Line type="monotone" dataKey={dataKey} stroke="#4d4c63"/>
                  <Tooltip />
                 {grid && <CartesianGrid stroke="lightgray" strokeDasharray="5 5"/> }
                </LineChart>
             </ResponsiveContainer>
      </div>
    );

   }
