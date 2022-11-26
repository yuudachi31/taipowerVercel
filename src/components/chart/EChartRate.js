import React from 'react';
import { PieChart, Pie, Cell, LabelList, ResponsiveContainer } from 'recharts';

const data = [
    { name: '20', value: 20 },
    { name: '40', value: 20 },
    { name: '60', value: 20 },
    { name: '80', value: 20 },
    { name: '100', value: 20 },
];
const COLORS = ['#F66C55', '#FFBD60', '#F6EF6B', '#C0DA71', '#74C777'];

function EChartRate() {
    return (
        <ResponsiveContainer height={140}>
            <PieChart>
                <Pie
                    data={data}
                    cy={110}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={70}
                    outerRadius={90}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <text x={55} y={120} fill="#4f4f4f" textAnchor="start" font-size="12">0</text>
                <text x={65} y={60} fill="#4f4f4f" textAnchor="start" font-size="12">20</text>
                <text x={120} y={22.5} fill="#4f4f4f" textAnchor="start" font-size="12">40</text>
                <text x={185} y={22.5} fill="#4f4f4f" textAnchor="start" font-size="12">60</text>
                <text x={235} y={60} fill="#4f4f4f" textAnchor="start" font-size="12">80</text>
                <text x={255} y={120} fill="#4f4f4f" textAnchor="start" font-size="12">100</text>
                <circle cx="160" cy="110" r="12" fill="#9C9C9C"/>
                <polygon points="160,30 152.5,110 167.5,110" fill="#9C9C9C" transform="rotate(40 160 110)" />
                <text x={160} y={115} fill="white" textAnchor="middle" font-size="12">70</text>
            </PieChart>
        </ResponsiveContainer>
    );
}

export default EChartRate;