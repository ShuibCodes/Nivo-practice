import React from "react";
import { ResponsiveMarimekko } from "@nivo/marimekko";
import "./styles.css";
import {data} from './data'
import {useState} from 'react'


const App = () => {

  

  const somePredefinedFunction = () =>{
      console.log(data.filter(d => d.participation < 40))

      // console.log( data.map(d => {


      //     return ` people that agree : ${d.agree}`
      // }))
  }


  const [defs ,setDefs] = useState([
    {
        id: 'lines',
        type: 'patternLines',
        background: 'rgba(0, 0, 0, 0)',
        color: 'inherit',
        rotation: -45,
        lineWidth: 4,
        spacing: 8
    }
]);

const [toggle, setToggle] = useState(true)


  const handleClick = () =>{
 

          setDefs([
            {
                id: 'lines',
                type: 'patternLines',
                background: 'green',
                color: 'inherit',
                rotation: -45,
                lineWidth: 4,
                spacing: 8
            }
        ])
       

  }

 

  return (
    <div className="App">
    
      <ResponsiveMarimekko
        data={data}
        id="statement"
        value="participation"
        // was camel cased
        dimensions={[
          {
            id: "disagree strongly",
            value: "stronglyDisagree"
          },
          {
            id: "disagree",
            value: "disagree"
          },
          {
            id: "agree",
            value: "agree"
          },
          {
            id: "agree strongly",
            value: "stronglyAgree"
          }
        ]}
        innerPadding={12}
        axisTop={null}
        
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: "middle"
        }}
        onClick={(data, event) => somePredefinedFunction(data)}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          legend: "opinions",
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: "middle"
        }}
        margin={{ top: 40, right: 80, bottom: 100, left: 80 }}
        colors={{ scheme: "spectral" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      
        defs={defs}
        fill={[
          {
            match: {
              id: "agree strongly"
            },
            id: "lines"
          },
          {
            match: {
              id: "disagree strongly"
            },
            id: "lines"
          }
        ]}
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
    <button
      onClick={() => {
      handleClick()}}
    >
    Click Me
    </button>

    </div>
  );
}

export default App
