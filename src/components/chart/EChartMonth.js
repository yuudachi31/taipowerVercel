import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { BarChart, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { renderCustomXTick, renderCustomYLeftTick, renderCustomYRightTick } from './CustomRender'
import qs from "qs";

function EChartMain({ data ,searchCoor,searchDiv,searchTrIndex}) {
    const [ticks_y, setTicks_y] = useState(['0.00', '50.00', '100.00', '150.00', '200.00']);

    const processedData = data.map((item, index) => ({
        ...item,
        fill: index < 6 === '#92D131' ? '#55A630' : '#BDBDBD',

    }));

    const renderLegend = ({ payload = {} }) => {
        if (payload?.length <= 0 || payload == null) return null
        else {
            return (
                <ul class="border-2 border-green-400 py-2 px-3 bg-white">
                    {payload[1]?.value == 0 ?
                        <>
                            {payload[3]!=undefined && payload[0] ? (
                                <>
                                    <li key={`item-0`}>{`十小時率：${payload[3]?.value}`}</li>
                                    <li key={`item-1`}>{`KNN：${payload[2]?.value}`}</li>
                                    {/* <li key={`item-2`}>{`純AMI：${payload[0]?.value}kW`}</li> */}
                                    <li key={`item-2`}>{`AMI：${payload[0]?.value}`}</li>
                                    <li key={`item-3`}>{`保證利用率：${payload[4]?.value}`}</li>

                                </>) : (<></>)}

                        </>
                        :
                        <>

                            {payload[2] ? (
                                <>
                                       <li key={`item-0`}>{`十小時率：${payload[2]?.value}`}</li>
                                    <li key={`item-1`}>{`KNN：${payload[1]?.value}`}</li>
                                    {/* <li key={`item-2`}>{`純AMI：${payload[0]?.value}kW`}</li> */}
                                    <li key={`item-2`}>{`預測AMI：${payload[0]?.value}`}</li>
                                    <li key={`item-3`}>{`預測保證利用率：${payload[3]?.value}`}</li>
                                    

                                </>
                            ) : (<></>)}
                        </>
                    }

                    {/* <li key={`item-0`}>{`利用率：${payload[3].value}%`}</li> */}
                    {/* <li key={`item-0`}>{`尖峰：${payload[0].value}kW`}</li>
                <li key={`item-1`}>{`離峰：${payload[1].value}kW`}</li> */}
                </ul>
            );
        }

    }
    const history = useHistory();
    //Bar點擊
    const BarClickToMonth = ({ payload = {} }) => {
        // 使用 React Router 导航
        const parsed = qs.parse(window.location.search);
        console.log(payload)
        console.log(parsed)
        if(searchCoor&&searchDiv&&searchTrIndex){
            history.push(`/EChartMonthPage?&coor=${searchCoor}&div=${searchDiv}&tr_index=${searchTrIndex}&year=${payload.year}&month=${payload.x_key.split("月")[0]}`);
        }else{
            history.push(`/EChartMonthPage?&coor=${parsed.coor}&div=${parsed.div}&tr_index=${parsed.tr_index}&year=${payload.year}&month=${payload.x_key.split("月")[0]}`);
        }
    }
    return (
        <ResponsiveContainer height={500}>
            <ComposedChart data={data} margin={0} barGap={60}>
                <XAxis dataKey="x_key" tickLine={false} tick={renderCustomXTick} />
                {/* ticks={ticks_y} */}
                {/* dataKey="load_total" */}
                <YAxis dataKey="uti_rate" orientation="left" tickLine={false} tickCount={6} tick={renderCustomYLeftTick} />
                <CartesianGrid strokeDasharray="2" vertical={false} stroke="#BDBDBD" />
                <Tooltip content={renderLegend} cursor={false} />
                <Bar isAnimationActive={false} dataKey="load_on" name="尖峰利用率" stackId="a" barSize={20} fill="#55A630" activeBar={{ fill: "#4A8927" }} onClick={BarClickToMonth} />
                {/* <Bar isAnimationActive={false} dataKey="load_on_forChart" name="離峰利用率" stackId="a" barSize={20} fill="#55A630" activeBar={{ fill: "#4A8927" }} onClick={BarClickToMonth} /> */}
                <Bar isAnimationActive={false} dataKey="predict_bars" name="預測利用率" stackId="a" barSize={20} fill="#BDBDBD" activeBar={{ fill: "#939393" }} onClick={BarClickToMonth} />
                {/* 這條透明bar是為了hover寫的 */}
                {/* <Bar isAnimationActive={false} dataKey="load_on" name="離峰利用率" stackId="a" barSize={20} fill="transparent" /> */}
                {/* 圖表線 */}


                <Line isAnimationActive={false} type="monotone"  name="KNN" dataKey="knn" stroke="green" strokeWidth={2} dot={{ stroke: 'green', strokeWidth: 2 }} />
                <Line isAnimationActive={false} type="monotone"  name="十小時率" dataKey="ten" stroke="orange" strokeWidth={2} dot={{ stroke: 'orange', strokeWidth: 2 }} />
                <Line isAnimationActive={false} type="monotone" name="保證利用率" dataKey="guartRate" stroke="black" strokeWidth={2} activeDot={{ r: 5 }} dot={{ stroke: 'black', strokeWidth: 2 }} />
                <Line isAnimationActive={false} type="monotone" name="預測保證利用率" dataKey="preGuartRate" stroke="#BDBDBD" strokeWidth={2} activeDot={{ r: 5 }} dot={{ stroke: '#BDBDBD', strokeWidth: 2 }} />
            </ComposedChart>
        </ResponsiveContainer>
    );

}

export default EChartMain;
