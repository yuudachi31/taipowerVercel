export const renderCustomYLeftTick = ({ payload, x, y, width, height, value }) => {
    return <text class="bg-black " x={x - 4} y={y+1} fill="#4f4f4f" textAnchor="end">{`${payload.value}`}</text>;
};

export const renderCustomYRightTick = ({ payload, x, y, width, height, value }) => {
    return <text x={x + 4} y={y} fill="#4f4f4f" textAnchor="start">{`${payload.value}`}</text>;
};

export const renderCustomXTick = ({ payload, x, y, width, height, value }) => {
    return <text x={x} y={y + 14} fill="#4f4f4f" textAnchor="middle" >{`${payload.value}`}</text>;
};
export const renderCustomXTickDay = ({ payload, x, y, width, height, value }) => {
    return <text x={x-14} y={y + 14} fill="#4f4f4f" textAnchor="middle" >{`${payload.value}`}</text>;
};