import React, { useState, useEffect } from 'react';
import { BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { renderCustomXTick, renderCustomYLeftTick } from './CustomRender'

function EChartDay() {
    const [data, setData] = useState(0);

    useEffect(() => {
        // init chart test data
        let data_temp = []

        for (let idx = 1; idx <= 12; idx++) {

            let load = 10 * idx;
            let time = '10:00'

            data_temp.push({
                'load': load,
                'x_key': time,
            })
        }

        setData(data_temp)

        console.log(data_temp)

    }, []);

    const renderLegend = ({ payload }) => {
        if (payload.length <= 0) return null
        return (
            <ul class="border-2 border-green-400 py-2 px-3 bg-white">
                <li key={`item-0`}>{`負載量：${payload[0].value}kW`}</li>
            </ul>
        );
    }

    return (
        <ResponsiveContainer height={400}>
            <BarChart width="100%" height="100%" data={data} barGap={60} margin={0} >
                <XAxis dataKey="x_key" tickLine={false} tick={renderCustomXTick} />
                <YAxis dataKey="load" orientation="left" tickLine={false} tickCount={5} tick={renderCustomYLeftTick} />
                <CartesianGrid strokeDasharray="2" vertical={false} stroke="#BDBDBD" />
                {/* 負載量Hover(搭配BarChart) */}
                <Tooltip content={renderLegend} />
                <Bar isAnimationActive={false} dataKey="load" name="尖峰" stackId="a" barSize={16} fill="#55A630" />
            </BarChart>
        </ResponsiveContainer>
    );

}

export default EChartDay;
