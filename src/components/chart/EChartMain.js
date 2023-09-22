import React, { useState } from 'react';
import { BarChart,ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { renderCustomXTick, renderCustomYLeftTick, renderCustomYRightTick } from './CustomRender'

function EChartMain({data}) {
    const [ticks_y, setTicks_y] = useState(['0.00', '50.00', '100.00', '150.00', '200.00']);

    const renderLegend = ({ payload }) => {
        if (payload.length < 3) return null
        return (
            <ul class="border-2 border-green-400 py-2 px-3 bg-white">
                <li key={`item-2`}>{`尖峰利用率：${payload[2].value}%`}</li>
                <li key={`item-0`}>{`尖峰：${payload[0].value}kW`}</li>
                <li key={`item-1`}>{`離峰：${payload[1].value}kW`}</li>
            </ul>
        );
    }

    return (
        <ResponsiveContainer height={400}>
            <ComposedChart data={data} margin={0} >
                <XAxis dataKey="x_key" tickLine={false} tick={renderCustomXTick} />
                {/* ticks={ticks_y} */}
                {/* dataKey="load_total" */}
                <YAxis dataKey="uti_rate"  orientation="right" tickLine={false}  tickCount={5}  tick={renderCustomYRightTick} />   
                <YAxis dataKey="uti_rate" yAxisId="uti_rate" orientation="left" tickLine={false} tickCount={5} tick={renderCustomYLeftTick} />
                <CartesianGrid strokeDasharray="2" vertical={false} stroke="#BDBDBD" />
                <Tooltip content={renderLegend} />
                <Bar isAnimationActive={false} dataKey="load_on" name="尖峰" stackId="a" barSize={16} fill="transparent" />
                <Bar isAnimationActive={false} dataKey="load_off" name="離峰" stackId="a" fill="transparent" />
                {/* 圖表線 */}
                <Line isAnimationActive={false} type="monotone" yAxisId="uti_rate" name="尖峰利用率" dataKey="uti_rate" stroke="black" strokeWidth={2} dot={{ stroke: 'black', strokeWidth: 2 }} />
                {/* 第二條線 */}
                <Line isAnimationActive={false} type="monotone"  name="利用率" dataKey="uti_rate_two" stroke="green" strokeWidth={2} dot={{ stroke: 'green', strokeWidth: 2 }} />
            </ComposedChart>
        </ResponsiveContainer>
    );

}

export default EChartMain;
