import React, { useState, useEffect } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { renderCustomXTick, renderCustomYLeftTick, renderCustomXTickDay } from './CustomRender'

function EChartDay({data}) {
    // const [data, setData] = useState(0);

    // useEffect(() => {
    //     // init chart test data
    //     let data_temp = []
    //     let uti_rate = Math.floor(Math.random() * 50) + 40 + 1;
    //     for (let idx = 1; idx <= 12; idx++) {
    //         let load_low = 5 * idx;
    //         let load = 10 * idx;
    //         const time = ['2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'];

    //         data_temp.push({
    //             'load': load,
    //             'x_key': time,
    //             'load_low': load_low,
    //         })
    //     }

    //     setData(data_temp)

    //     console.log(data_temp)

    // }, []);

    const renderLegend = ({ payload }) => {
        if (payload?.length <= 0|| payload==null) return null
        return (
            <ul class="border-2 border-green-400 py-2 px-3 bg-white">
                <li key={`item-0`}>{`尖峰利用率：${payload[0].value}kW`}</li>
            </ul>
        );
    }


    return (
        <ResponsiveContainer height={430}>
            <ComposedChart data={data} barGap={60} margin={0} >
                <XAxis dataKey="x_key" tickLine={false} interval={0} tick={renderCustomXTickDay} />
                <YAxis allowDataOverflow={true} dataKey="load" orientation="left" tickLine={false} tickCount={5} tick={renderCustomYLeftTick } />
                <CartesianGrid strokeDasharray="2" vertical={false} stroke="#BDBDBD" />
                {/* 負載量Hover(搭配BarChart) */}
                <Tooltip content={renderLegend} />
                <Bar isAnimationActive={false} dataKey="load" name="尖峰利用率" stackId="a" barSize={16} fill="transparent" />
                
                {/* <Line isAnimationActive={false} type="monotone"  name="尖峰利用率" dataKey="load" stroke="black" strokeWidth={2} dot={{ stroke: 'black', strokeWidth: 2 }} /> */}
                <Line isAnimationActive={false} type="monotone"  name="尖峰利用率" dataKey="load" stroke="green" strokeWidth={2}  dot={{ stroke: 'green', strokeWidth: 2 }} activeDot={{ r: 7 }}/>
            </ComposedChart>
        </ResponsiveContainer>
    );

}

export default EChartDay;
