import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


//antd
import { Divider, Menu, Dropdown, Space, Table, Modal, Input, Button, Checkbox, Row, Col, Tag } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
const { Search } = Input;
function TRAbnormal() {
    
    //刪除modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const confirm = () => {
        Modal.confirm({
          title: '刪除確認',
          content: '確定刪除這些異常變壓器？',
          okText:'是',
          cancelText:'否',
          
        });
      };
    const _history = useHistory();
    const statefilters = [
        {
            text: '重度危險',
            value: '3',
        },
        {
            text: '中度危險',
            value: '2',
        },
        {
            text: '一般危險',
            value: '1',
        },
    ]
    const data = [];
    for (let i = 0; i < 45; i+=3) {
        data.push({
            key: i,
            see: 'A222BC3333',
            group: `T01`,
            number: '001',
            rate: '85.1',
            threshold: '80%',
            state: ['3'],
        },
        {
            key: i+1,
            see: 'A222BC3333',
            group: `T01`,
            number: '001',
            rate: '70.3',
            threshold: '70%',
            state: ['2'],
        },
        {
            key: i+2,
            see: 'A222BC3333',
            group: `T01`,
            number: '001',
            rate: '68.9',
            threshold: '60%',
            state: ['1'],
        });
    }
    console.log("data", data)
    const [filteredInfo, setFilteredInfo] = useState({});
    const handleChange = ( pagination, filters ) => {
        console.log('Various parameters', pagination, filters);
        setFilteredInfo(filters);
      };
    const clearFilters = () => {
        setFilteredInfo({});
    };
    const columns = [
        {
            title: '圖號座標',
            key: 'see',
            dataIndex: 'see',
            render: text => {
                return (
                    // <a href='/tr/info' >{text}</a>
                    <div>{text}</div>
                )
            }
        },
        {
            title: '組別',
            key: 'group',
            dataIndex: 'group',
        },
        {
            title: '第幾具',
            key: 'number',
            dataIndex: 'number',
        }, 
        {
            title: '利用率(%)',
            key: 'rate',
            dataIndex: 'rate',
        },
        // {
        //     title: '閥值',
        //     key: 'threshold',
        //     dataIndex: 'threshold',
        // },
        {
            title: '危險等級',
            key: 'state',
            dataIndex: 'state',
            filters: statefilters,
            filteredValue: filteredInfo.state || null,
            // onFilter: (value, record) => record.state.indexOf(value) === 0,
            
            onFilter: (value, record) => record.state.includes(value),
            ellipsis: true,
            render: (_, { state }) => (
                <>
                  {state.map((state) => {
                    let color = 'calendulagold';
                    if (state === '3') {
                        color = 'volcano';
                        state = '重度危險'
                    }
                    else if (state === '2') {
                        color = 'magenta';
                        state = '中度危險'
                    }
                    else if (state === '1'){
                        color = 'gold'
                        state = '一般危險'
                    }
                    return (
                      <Tag color={color} key={state}>
                        {state}
                      </Tag>
                    );
                  })}
                </>
              ),
        },
    ];

        const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            
            {
                key: 'all',
                text: '全選當頁',
                onSelect: (changableRowKeys) => {

                    setSelectedRowKeys(changableRowKeys);
                }
            },
            {
                key: 'none',
                text: '清空選項', // 自定义不选的文本名称
                onSelect: () => {
                    setSelectedRowKeys([]);
                },
            },
            {
                key: 'odd',
                text: '選擇奇數行',
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
                text: '選擇偶數行',
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
    const onSearch = (value, _e, info) => console.log(info?.source, value);
   
    return (
        <div className='wrapper px-24 py-4'>
            <div className="flex justify-between">
            <div className="flex">
            
                <button className="btn-red mr-4" style={{ height: 40}} onClick={confirm}>刪除</button>
                
                <button className="btn " style={{ height: 40 }}>隔天通知</button>
            </div>
                <div className="flex">
                <Search
                    size="large"
                    placeholder="搜尋圖號座標"
                    onSearch={onSearch}
                    style={{
                        width: 200,
                    }}
                />
                    <button onClick={clearFilters} className="border border-green-400 rounded-sm mb-2" style={{ height: 40, width: 85 }}>清除篩選</button>
                </div>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} onChange={handleChange}/>
        </div>
    );
   



} export default TRAbnormal;
