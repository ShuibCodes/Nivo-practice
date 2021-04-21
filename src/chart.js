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
  const [months, setMonths] = useState([])
  const [year , setYear] = useState([])





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


const table = (data, e ) =>{
    // get array of dates when bar is clicked 
    let newArr= data.datum.dimensions[0].datum.data.results.map((d) => d.Date)
    console.log(newArr)

    // convert into Date object 
    const datesArr = newArr.map(d => ({ date: new Date(d) , count : 0}))
    console.log(datesArr)


    
    // add month array with month as an integer and the the count of months (how many times each month shows up )
    const monthArr = datesArr.map((e) => ({date: e.date.getMonth(), count: 0}))
   
    console.log(monthArr)

      // count up all months that match date, convert into sting versio of month 
    const countMonth = newArr.reduce((acc, date) => {
      const month = new Date(date).toLocaleString('default', { month: 'long' });
      // acc = { date, count }
      if (acc[month]) {
        return {
          ...acc,
          [month]: {
            date: month,
            count: acc[month]["count"] + 1
          }
        };
      }
      return {
        ...acc,
        [month]: {
          date: month,
          count: 1
        }
      };
    }, {});


    console.log(countMonth)
      setMonths(Object.values(countMonth))


    // each year 

    const countYear = newArr.reduce((acc, date) => {
      const years = new Date(date).getFullYear();
      // acc = { date, count }
      if (acc[years]) {
        return {
          ...acc,
          [years]: {
            date: years,
            count: acc[years]["count"] + 1
          }
        };
      }
      return {
        ...acc,
        [years]: {
          date: years,
          count: 1
        }
      };
    }, {});

    
    setYear(Object.values(countYear))  
    console.log(countYear)
    
    
} 
   


      
const handleChange = (e, countMonth,countYear) =>{

      
  if(e.target.value === months && countMonth){
    setYear([])
    setMonths(countMonth)
    
  
  } else if(e.target.value === year){
    setYear(countYear)
  }
   



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



      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>
            Month
            <select name="format" id="format"  onChange={(e) => {handleChange(e)}}
            >
              <option value={months}>months</option>
              <option value={year}>year</option>
            </select>
          </th>
          <th>count</th>
        </tr>
      </thead>
      <tbody>
        {months.map(({ date, count }, index) => (
          <tr key={index}>
            <td>{date}</td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
      <tbody>
        {year.map(({ date, count }, index) => (
          <tr key={index}>
            <td>{date}</td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
};
export default Chart


