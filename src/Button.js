import React from 'react';

const StateButton = ({clickHandler}) => {

    
    return (
        <div>
        <button onClick={() => clickHandler()}> Who Disagreed </button> 
        </div>
    );
}

export default StateButton;
