import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


//antd
import { Divider, Menu, Dropdown, Space, Table, Modal, Input, Button, Checkbox, Row, Col } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';

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
    const columns = [
        {
            title: '圖號座標',
            dataIndex: 'see',
            render: text => {
                return (
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
            title: '閥值',
            dataIndex: 'threshold',
        },
        {
            title: '危險等級',
            dataIndex: 'warning',
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
            threshold: '77%',
            warning: 'nan',
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
            <div className="flex justify-between">
            <div className="flex">
                <button className="btn-red mr-7" style={{ height: 40, width: 60 }} onClick={confirm}>刪除</button>
                
                <button className="btn " style={{ height: 40, width: 80 }}>隔天通知</button>
            </div>
                <div className="flex">
                    <button className="border border-green-400 rounded-sm mb-2" style={{ height: 40, width: 85 }}>清除篩選</button>
                </div>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    );
   



} export default TRAbnormal;
