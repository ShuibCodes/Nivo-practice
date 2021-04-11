import React from "react";
import { ResponsiveMarimekko } from "@nivo/marimekko";
import "./styles.css";
import { data } from "./data";
import { useState } from "react";
import { usePartialTheme } from "@nivo/core";
import Table from 'react-bootstrap/Table'

  
  


const Chart = () => {

  // y-axis formatting 

  const format = (v) => `${v}%`

  const [binsize, setBinsize] = useState(5)
  const [temps, setTemps] = useState('')
  const [Dates,setDates] = useState('') //empty table?

 const changeBin = (e) => {
   
    setBinsize(parseInt(e.target.value))
    // console.log(parseInt(e.target.value))
 }

const getBins = (data,binsize,Temp, Date) => {
    // getting min and max  
    const min = Math.floor(Math.min(...data.map((e)=>e[Temp]))/binsize)*binsize
    const max = Math.floor(Math.max (...data.map((e)=>e[Temp]))/binsize)*binsize
    const arr = []
  // looping thru  each number < 100, then adding 6 to that number, then going to next number. i is added to the binSize (5), then next binsize will be i + 5
  for(let i = min; i <= max; i = i+ binsize){
    arr.push({binStart:i, binsize})
  }
  console.log(arr)
  arr.forEach((d)=>{
    // return count if current temp is more than 1st binstart AND temp, and less than 2nd binStart and binsze . length 
    // for each object, take the AvgTemp, if its bigger than binStart and temp, AND smaller than binstart of next one and binsze, return it as count
    d.count = Math.floor(data.filter((e)=>e[Temp] >= d.binStart && e[Temp] < d.binStart + binsize).length/data.length * 100)
    d.results = data.filter((e)=>e[Temp] >= d.binStart && e[Temp] < d.binStart + binsize)
  })
  return arr
} 

// table function 
const table = (data) =>{
    let newArr= data.datum.dimensions[0].datum.data.results.map((d) => d.Date)
    console.log(newArr)
    const Temps = data.datum.id
    setTemps(Temps)
    // const dates = newArr.filter((d) => d.substring(0, 4) === '2014');
    setDates(newArr)

    // const dates = date.filter((d) => d.substring(0, 4) === '2014');

}

const getYears = () =>{
      // get array 2014 years only 
    const four = Dates
    const fourteen = four.filter((d) => d.substring(0, 4) === '2014');
     console.log(fourteen)
}

// function to display the range of temperatures in a given bar (for the tooltip)
const range = (arr) => {
  const num = arr.binStart
  return `${num} to ${num + arr.binsize}`
}

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
        data={getBins(data,binsize,'TempAvgF', 'Date')}
        id={range}
        value='binsize'
        onClick={table}
        // onClick={() =>setString(
        //   dates.map((e =>{
        //     return(
        //       <li>{e}</li>
        //     )
        //   }))
        // )}
   
          // for each bar, map out count as dates with each temp next to it 
 
        dimensions={[
          {
            id: "", // days?
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
          legendPosition: "middle",

          
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
      <input type="number" value={binsize}  onChange={(e) => {changeBin(e)}}>

      </input>
          <div>
            <button onClick={getYears} >2014</button>
          </div>

      <Table striped bordered hover size="sm">
  <thead>
    <tr>
    
      <th>Temp Range</th>
      <th>Date</th>
  
    </tr>
  </thead>
  <tbody>
    <tr>

      <td>{temps}</td>
      <td>{Dates[1]}</td>
 
    </tr>
    <tr>
      <td></td>
      <td>{Dates[2]}</td>

  
    </tr>
    <tr>
      <td></td>
      <td>{Dates[3]}</td>

    </tr>
    <tr>
      <td></td>
      <td>{Dates[4]}</td>

    </tr>
    <tr>
      <td></td>
      <td>{Dates[5]}</td>

    </tr>
  </tbody>
</Table>
    </div>
  );
};
export default Chart


