import React from "react";
import { ResponsiveMarimekko } from "@nivo/marimekko";
import "./styles.css";
import { data } from "./data";
import { useState } from "react";


const Chart = () => {

  const format = (v) => `${v}%`;

  



const getBins = (data,binsize,Temp) => {
  // getting min and max  
  const min = Math.floor(Math.min(...data.map((e)=>e[Temp]))/binsize)*binsize
  const max = Math.floor(Math.max (...data.map((e)=>e[Temp]))/binsize)*binsize
  const arr = []
// looping thru  each number < 100, then adding 6 to that number, then going to next number. i is added to the binSize (5), then next binsize will be i + 5
for(let i = 0; i <= max;   i  = i+ binsize){
  arr.push({binStart:i, binsize})
}
arr.forEach((d)=>{
  // return count if current temp is more than 1st binstart AND temp, and less than 2nd binStart and binsze . length 
  
  // for each object, take the AvgTemp, if its bigger than binStart and temp, AND smaller than binstart of next one and binsze, return it as count


   return d.count = Math.floor((data.filter((e)=>e[Temp] >= d.binStart && e[Temp] < d.binStart + binsize).length) /  Temp.length * 100)
  


})


console.log(arr)
return arr
}

const range = (arr) => {
  const num = arr.binStart
  
  return `${num} to ${num + arr.binsize}`

}






// console.log([1,2,4].filter((d)=>d >= 2 && d < 3).length)
  // x-axis needs to be avg temp lowest to highst
  // need to have binsize of 10 each bar should be same thickenss
  // button to change  Dell pattern lines from yellow to white
  const [defs, setDefs] = useState([
    {
      id: "lines",
      type: "patternLines",
      background: "yellow",
      color: "inherit",
      rotation: -45,
      lineWidth: 4,
      spacing: 8
    }
  ]);
  const colorChange = () => {
    setDefs([
      {
        id: "lines",
        type: "patternLines",
        background: "white",
        color: "inherit",
        rotation: -45,
        lineWidth: 4,
        spacing: 8
      }
    ]);
  };
  return (
    <div className="App">
      <ResponsiveMarimekko
        data={getBins(data, 10 ,'AvgTempF')}
        id= {range}
        value='binsize'
        // was camel cased
        dimensions={[
          {
            id: "", //count
            value: "count"
          }
        ]}
        innerPadding={0}
        axisTop={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "AvgTemp",
          legendOffset: 36,
          legendPosition: "middle"
        }}
        axisLeft={{
          legend: "count",
          orient: "left",
          tickSize: 5,
          tickPadding: 4,
          tickRotation: 0,
          legendOffset: -60,
          legendPosition: "middle",
          format
         
        }}
        margin={{ top: 40, right: 80, bottom: 100, left: 80 }}
        colors={{ scheme: "spectral" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        defs={defs}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 80,
            itemsSpacing: 0,
            itemWidth: 140,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "right-to-left",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "square",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000"
                }
              }
            ]
          }
        ]}
      />
      {/* <div
          // style={{display:"flex"}}
        >{Content}</div> */}
      <button onClick={() => {}}>Click Me</button>
    </div>
  );
};
export default Chart