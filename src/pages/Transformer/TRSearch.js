
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


//antd
import { Layout, Menu, Dropdown, Space, Table } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';




function TRSearch() {
    const _history = useHistory();

    const columns = [
        {
            title: '圖號座標',
            dataIndex: 'see',
            render:text=>{
                return(
                    <a href='/tr/info' >{text}</a>
                )
            }
        },
        {
            title: '組別',
            dataIndex: 'group',
        },
        {
            title: '第幾具',
            dataIndex: 'number',
        },
        {
            title: '利用率',
            dataIndex: 'rate',
        },
        {
            title: '容量',
            dataIndex: 'vol',
        },
    ];
    const data = [];
    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            see: 'A222BC3333',
            group: `T01`,
            number: '001',
            rate: '70.3',
            vol: 32,
        });
    }
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };
    return (
        <div className='wrapper px-24 py-4'>
            <div className='flex justify-between mb-4'>
                <button class="btn flex-none"><PrinterOutlined />匯出</button>
                <button class="border border-green-400 flex-none rounded-sm py-2 px-3 ">清除篩選</button>
            </div>

            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>

    );

}
export default TRSearch;
