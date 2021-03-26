import React from 'react';
import { ResponsiveMarimekko } from "@nivo/marimekko";
import "./styles.css";
import {data} from './data'
import {useState} from 'react'



const Chart = () => {
  const myFunc = () => {

    let result = data.map(item => item.AvgTempF)
      return result
   } 

    
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
        id={myFunc}
        value={"AvgTempF"}
        
        // was camel cased
        dimensions={[
          {
            id: "Date",
            value: "AvgTempF"
          },
        
      
        ]}
        innerPadding={12}
        axisTop={null}
          axisBottom={{
          
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'temp',
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
        }}
    >
    Click Me
    </button>
   
        </div>

        
    );
}

export default Chart;
