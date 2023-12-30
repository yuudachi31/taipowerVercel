import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { BarChart,ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { renderCustomXTick, renderCustomYLeftTick, renderCustomYRightTick } from './CustomRender'
import queryString from "query-string";
const parsed = queryString.parse(window.location.search);
function EChartMain({data}) {
    const [ticks_y, setTicks_y] = useState(['0.00', '50.00', '100.00', '150.00', '200.00']);

    const processedData = data.map((item, index) => ({
        ...item,
        fill: index < 6 ==='#92D131' ? '#55A630' : '#BDBDBD',
        
      }));

    const renderLegend = ({ payload={} }) => {
        if (payload?.length <=0 || payload==null) return null
        else{
           return (
            <ul class="border-2 border-green-400 py-2 px-3 bg-white">
                <li key={`item-0`}>{`利用率：${payload[3].value}%`}</li>
                {/* <li key={`item-0`}>{`尖峰：${payload[0].value}kW`}</li>
                <li key={`item-1`}>{`離峰：${payload[1].value}kW`}</li> */}
            </ul>
        ); 
        }
        
    }
    const history = useHistory();
    //Bar點擊
    const BarClickToMonth = ({ payload={} }) => {
        // 使用 React Router 导航
        console.log(payload)
        history.push(`/EChartMonthPage?coor=${parsed.coor}&div=${parsed.div}&tr_index=${parsed.tr_index}&year=${payload.year}&month=${payload.x_key.split("月")[0]}`);
    }
    return (
        <ResponsiveContainer height={400}>
            <ComposedChart data={data} margin={0} barGap={60}>
                <XAxis dataKey="x_key" tickLine={false} tick={renderCustomXTick} />
                {/* ticks={ticks_y} */}
                {/* dataKey="load_total" */}
                <YAxis dataKey="uti_rate"  orientation="left" tickLine={false} tickCount={5} tick={renderCustomYLeftTick} />
                <CartesianGrid strokeDasharray="2" vertical={false} stroke="#BDBDBD" />
                <Tooltip content={renderLegend} cursor={false}/>
                <Bar isAnimationActive={false} dataKey="load_off" name="尖峰利用率" stackId="a" barSize={16} fill="#92D131" activeBar={{ fill: "#81C12E" }} onClick={BarClickToMonth}/>
                <Bar isAnimationActive={false} dataKey="load_on_forChart" name="離峰利用率" stackId="a" barSize={16} fill="#55A630" activeBar={{ fill: "#4A8927"}} onClick={BarClickToMonth}/>
                <Bar isAnimationActive={false} dataKey="predict_bars" name="預測利用率" stackId="a" barSize={16} fill="#BDBDBD" activeBar={{ fill: "#939393"}} onClick={BarClickToMonth}/>
              {/* 這條透明bar是為了hover寫的 */}
                <Bar isAnimationActive={false} dataKey="load_on" name="離峰利用率" stackId="a" barSize={16} fill="transparent"/>
                {/* 圖表線 */}
                <Line isAnimationActive={false} type="monotone"  name="尖峰利用率" dataKey="load_on" stroke="#BDBDBD" strokeWidth={2} activeDot={{ r: 5 }} dot={{ stroke: '#BDBDBD', strokeWidth: 2 }}  />

                
            </ComposedChart>
        </ResponsiveContainer>
    );

}

export default EChartMain;
