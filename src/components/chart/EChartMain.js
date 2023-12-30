import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { BarChart,ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Rectangle } from 'recharts';
import { renderCustomXTick, renderCustomYLeftTick, renderCustomYRightTick } from './CustomRender'
import queryString from "query-string";
const parsed = queryString.parse(window.location.search);

function EChartMain({data}) {
    // console.log(data)
    const [ticks_y, setTicks_y] = useState(['0.00', '50.00', '100.00', '150.00', '200.00']);

    const renderLegend = ({ payload=[] }) => {
        // console.log(payload)
        if (payload?.length <=0 || payload==null) return null
        // console.log(payload[0])
        else{
            return (
                <ul class="border-2 border-green-400 py-2 px-3 bg-white">
                    
                    <li key={`item-0`}>{`尖峰利用率：${payload[2].value}kW`}</li>
                    <li key={`item-1`}>{`離峰利用率：${payload[0].value}kW`}</li>
                    {/* <li key={`item-2`}>{`尖峰利用率：${payload[2].value}%`}</li> */}
                    
                </ul>
            );
        }
            
        
        
    }
    const history = useHistory();
    //Bar點擊
    const BarClickToDay = ({ payload={} }) => {
        // 使用 React Router 导航
        history.push(`/EChartDayPage?coor=${parsed.coor}&div=${parsed.div}&tr_index=${parsed.tr_index}&year=${parsed.year}&month=${parsed.month}&day=${payload.x_key}`);
    }
// console.log(data)
    return (
        <ResponsiveContainer height={400}>
            <BarChart data={data} margin={0} barGap={60}>
                <XAxis dataKey="x_key" tickLine={false} tick={renderCustomXTick} />
                {/* ticks={ticks_y} */}
                {/* dataKey="load_total" */}  
                <YAxis dataKey="uti_rate"  orientation="left" tickLine={false} tickCount={5} tick={renderCustomYLeftTick} />
                <CartesianGrid strokeDasharray="2" vertical={false} stroke="#BDBDBD" />
                <Tooltip content={renderLegend} cursor={false}/>
                <Bar dataKey="load_off" name="尖峰利用率" stackId="a" barSize={16} fill="#92D131" activeBar={{ fill: "#81C12E" }} onClick={BarClickToDay}/>
                <Bar dataKey="load_on_forChart" name="離峰利用率" stackId="a" barSize={16} fill="#55A630" activeBar={{ fill: "#4A8927"}} onClick={BarClickToDay}/>
                <Bar dataKey="load_on" name="離峰利用率" stackId="a" barSize={16} fill="transparent" />
                {/* 圖表線 */}
                {/* <Line isAnimationActive={false} type="monotone" yAxisId="uti_rate" name="尖峰利用率" dataKey="uti_rate" stroke="black" strokeWidth={2} dot={{ stroke: 'black', strokeWidth: 2 }} /> */}
                {/* 第二條線 */}
                {/* <Line isAnimationActive={false} type="monotone"  name="利用率" dataKey="uti_rate_two" stroke="green" strokeWidth={2} dot={{ stroke: 'green', strokeWidth: 2 }} /> */}
            </BarChart>
        </ResponsiveContainer>
    );

}

export default EChartMain;
