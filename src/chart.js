import React from 'react';
import { ResponsiveMarimekko } from "@nivo/marimekko";
import "./styles.css";
import {data} from './data'
import {useState} from 'react'



const Chart = () => {

   //formatting x-axis & y-axis as percentage 
    // const format = v => `${v}%`
    
    // State variable to add message when each bar is clicked
    // const [Content ,setContent] = useState('')

    //   const clickHandler = (data) =>{
    //    console.log(`${data.key} = ${data.value}`)
    //   setContent( <p>`${data.key} = ${data.value}`</p>)
    // }
    
    // button to change  Dell pattern lines from yellow to white
    const [defs ,setDefs] = useState([
      {
          id: 'lines',
          type: 'patternLines',
          background: 'yellow', 
          color: 'inherit',
          rotation: -45,
          lineWidth: 4,
          spacing: 8
      }
  ]);
  
  
    const colorChange = () =>{
           setDefs([
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'white',
                  color: 'inherit',
                  rotation: -45,
                  lineWidth: 4,
                  spacing: 8
              }
          ])
         
    }



    return (
      
        <div    className="App">
          <ResponsiveMarimekko
        data={data}
        id="Date"
        value="TempAvgF"
        
        // was camel cased
        dimensions={[
          {
            id: "Date",
            value: "AvgTempF"
          },
        
      
        ]}
        innerPadding={12}
        axisTop={null}
        // onClick={(data) => {
        //   console.log(
        //     `${data["id"]} for ${data["key"]} = ${data["value"]}`
        //   );
   
        //   setContent(`  ${data["key"]} = ${data["value"]}%`)
        // }}
        
        axisBottom={{
          
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'share of market',
            legendOffset: 36,
            legendPosition: 'middle'
            
        }}
      
        
        axisLeft={{
            legend:'count',
            orient: 'left',
            tickSize: 5,
            tickPadding: 4,
            tickRotation: 0,
            legendOffset: -60,
            legendPosition: 'middle',
  
        }}
        
        margin={{ top: 40, right: 80, bottom: 100, left: 80 }}
        colors={{ scheme: "spectral" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      
        defs={defs}
        // fill={[
        //   {
        //     match: {
        //       id: "dell"
        //     },
        //     id: "lines"
        //   },
        //   {
        //     match: {
        //       id: "dell"
        //     },
        //     id: "lines"
        //   }
        // ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 80,
                itemsSpacing: 0,
                itemWidth: 140,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'right-to-left',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'square',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}





      />
        {/* <div
          // style={{display:"flex"}}
        >{Content}</div> */}
    <button
      onClick={() => {
      colorChange()}}
    >
    Click Me
    </button>
   
        </div>

        
    );
}

export default Chart;
