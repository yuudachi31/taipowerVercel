
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


//antd
import { Divider, Menu, Dropdown, Space, Table, Modal, Input, Button, Checkbox, Row, Col } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['A222BC3333', 'A222BC1111', 'A222BC2222'];
const Percent = ['70.3', '63.9', '80.5'];
const Group = ['TO1', 'TO2', 'TO3'];
const Time = ['2023/10/01', '2023/10/02', '2023/10/04'];
const plainPersentage = ['72', '82', '60'];
const defaultCheckedList = [];


function TRSearch() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        // 在组件加载时设置一个定时器，用于在几秒后显示 Modal
        const timer = setTimeout(() => {
            setIsModalVisible(true);
        }, 500); // 在这里设置显示 Modal 的延迟时间，单位是毫秒
        // 在組件卸載時清除定時器，以避免記憶體洩漏
        return () => clearTimeout(timer);
    }, []);
    const _history = useHistory();
    //新增群組modal
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

    const dataCheck = []
    for (let i = 0; i < 3; i++) {
        dataCheck[i] =
            plainOptions[i] + '：' + plainPersentage[i]
    };

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
        }, {
            title: '容量(單位)',
            dataIndex: 'vol',
        },
        {
            title: '利用率',
            dataIndex: 'rate',
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
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const checkAll = dataCheck.length === checkedList.length;//全選
    const indeterminate = checkedList.length > 0 && checkedList.length < dataCheck.length;//單選
    const onChange = (list) => {
        setCheckedList(list);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? dataCheck : []);
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
                <button className="btn " style={{ height: 40, width: 75 }}><PrinterOutlined />匯出</button>
                <div className="flex">

                    <button className="btn rounded-sm mr-7" style={{ height: 40, width: 100 }}>異常變壓器</button>
                    <button className="border border-green-400 rounded-sm mb-2" style={{ height: 40, width: 85 }}>清除篩選</button>
                </div>
            </div>
            <Modal title="變壓器異常通知" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} mask={true}
                footer={[
                    // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
                    <Button type="primary" onClick={() => setIsModalVisible(false)}>確認</Button>,
                ]}
            >
                <div >
                    <Row > 
                        <Col span={6} >圖號座標</Col>
                        <Col span={6}>組別</Col>
                        <Col span={6}>利用率</Col>
                        <Col span={6}>時間</Col>
                    </Row>
                    {plainOptions.map((option, index) => (
                    <Row key={index}>
                        <Col span={6} >{option}</Col>
                        <Col span={6} >{Group[index]}</Col>
                        <Col span={6} style={{ color: '#F66C55' }}>{Percent[index]}</Col>
                        <Col span={6}>{Time[index]}</Col>
                    </Row>
                    ))}
                </div>
                {/* <div class="flex mb-3"><div class=" w-72">
                        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>全選</Checkbox>
                        </div>
                        </div>
                    <div class="flex mb-3">
                        <CheckboxGroup class=" w-72" options={dataCheck} value={checkedList} onChange={onChange} />
                        </div> */}
            </Modal>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    );

}
export default TRSearch;
