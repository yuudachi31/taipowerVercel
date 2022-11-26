import React, { useState, useEffect } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function EChartMain() {
    const [data, setData] = useState(0);
    const [ticks_y, setTicks_y] = useState(['0.00', '50.00', '100.00', '150.00', '200.00']);

    useEffect(() => {
        // init chart test data
        let data_temp = []

        for (let idx = 1; idx <= 31; idx++) {

            let load_on = Math.ceil(Math.random() * 50);
            let load_off = Math.ceil(Math.random() * 20);
            let uti_rate = Math.floor(Math.random() * 50) + 40 + 1;
            let date = idx

            if (idx < 10) {
                date = `0${idx}`
            }

            data_temp.push({
                'load_on': load_on,
                'load_off': load_off,
                'load_total': load_on + load_off,
                'uti_rate': uti_rate,
                'date': date,
            })
        }

        setData(data_temp)

        console.log(data_temp)

    }, []);

    const renderCustomYLeftTick = ({ payload, x, y, width, height, value }) => {
        return <text class="bg-black" x={x - 4} y={y} fill="#4f4f4f" textAnchor="end">{`${payload.value}`}</text>;
    };

    const renderCustomYRightTick = ({ payload, x, y, width, height, value }) => {
        return <text x={x + 4} y={y} fill="#4f4f4f" textAnchor="start">{`${payload.value}`}</text>;
    };

    const renderCustomXTick = ({ payload, x, y, width, height, value }) => {
        return <text x={x} y={y + 14} fill="#4f4f4f" textAnchor="middle">{`${payload.value}`}</text>;
    };

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
        <div class="flex">
            <span class="w-max h-8 transform -rotate-90 -mr-6 translate-y-40 text-center">負載量 (kW)</span>
            <ComposedChart width={1140} height={400} data={data} barGap={60} margin={0} >
                <XAxis dataKey="date" tickLine={false} tick={renderCustomXTick} />
                <YAxis dataKey="load_total" orientation="left" tickLine={false} ticks={ticks_y} tickCount={5} tick={renderCustomYLeftTick} />
                <YAxis dataKey="uti_rate" yAxisId="uti_rate" orientation="right" tickLine={false} tickCount={5} tick={renderCustomYRightTick} />
                <CartesianGrid strokeDasharray="2" vertical={false} stroke="#BDBDBD" />
                <Tooltip content={renderLegend} />
                <Bar dataKey="load_on" name="尖峰" stackId="a" barSize={16} fill="#55A630" />
                <Bar dataKey="load_off" name="離峰" stackId="a" fill="#92D131" />
                <Line type="monotone" yAxisId="uti_rate" name="尖峰利用率" dataKey="uti_rate" stroke="black" strokeWidth={2} dot={{ stroke: 'black', strokeWidth: 2 }} />
            </ComposedChart>
            <span class="w-max h-8 transform rotate-90 -ml-8 translate-y-40 text-center">利用率 (%)</span>
        </div>
    );

}

export default EChartMain;
