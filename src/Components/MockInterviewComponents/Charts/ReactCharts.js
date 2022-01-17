import { Chart } from 'react-google-charts';

import React from 'react'

function ReactCharts() {
    return (
        // <div className='content'>
            // <div className='formComponent'>
            <>
            
                <Chart
                    chartType={"Bar"}
                    //   options={...}
                    data={[["Mock_Attempt", "Score"], [1, 5], [2, 8], [3, 4]]}
                    width="80%"
                    height="10rem"
                    legendToggle
                />

                <Chart
                    chartType={'PieChart'}
                    data={[["Batch_Name", "StudentCOunt"], ['Daisy21', 6], ['MERN', 4]]}
                    height="10rem"
                    width="55%"
                />
            </>
            // </div>
        // </div>
    )
}

export default ReactCharts;