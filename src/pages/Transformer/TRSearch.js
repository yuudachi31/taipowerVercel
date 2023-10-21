
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {getTransformerList} from '../../api/frontApi'
import { saveTransData } from '../../actions/transformer';
import { connect } from "react-redux";
//antd
import { Divider, Menu, Dropdown, Space, Table, Modal, Input, Button, Checkbox, Row, Col , message} from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['A222BC3333', 'A222BC1111', 'A222BC2222'];
const plainPersentage = ['72', '82', '60'];
const defaultCheckedList = [];


function TRSearch({transformer,saveTransData}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
    getTransformerList().then((data)=>{
        if (data.errStatus) {
            message.error(data.errDetail);
          } else {
            // console.log(data)
            saveTransData(data)
            pushData()
          }
    })
        
 
    }, []);
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
        {
            title: '隔天通知',
            dataIndex: 'notify',
        },
    ];
    const data = [];
  
    // console.log(transformer)
    function pushData (){
        transformer.transformerList.forEach((element,index) => {
            data.push({
                key: index,
                see: element.coor,
                group: element.div,
                number: 'nan',
                rate: 'nan',
                vol: 'nan',
                notify: 'nan'
            })
        });
        console.log(transformer)
    }
    
    // for (let i = 0; i < 46; i++) {
    //     data.push({
    //         key: i,
    //         see: 'A222BC3333',
    //         group: `T01`,
    //         number: '001',
    //         rate: '70.3',
    //         vol: 32,
    //         notify: '是'
    //     });
    // }
    
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
            <div className='flex justify-between mb-4'>
                <button className="btn flex-none"><PrinterOutlined />匯出</button>
                <button className="border border-green-400 flex-none rounded-sm py-2 px-3 ">清除篩選</button>
                <Modal title="變壓器異常通知" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} mask={true}
                    footer={[
                        // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
                        <Button type="primary" onClick={() => setIsModalVisible(false)}>確認</Button>,
                    ]}
                >
                    <div >
                        <Row>
                            <Col span={7}>圖號座標</Col>
                            <Col span={7}>組別</Col>
                            <Col span={7}>利用率</Col>
                        </Row>
                        <Row>
                            <Col span={7}>{plainOptions[0]}</Col>
                            <Col span={7} >{plainOptions[0]}</Col>
                            <Col span={7}>56%</Col>
                        </Row>
                    </div>
                    {/* <div class="flex mb-3"><div class=" w-72">
                        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>全選</Checkbox>
                        </div>
                        </div>
                    <div class="flex mb-3">
                        <CheckboxGroup class=" w-72" options={dataCheck} value={checkedList} onChange={onChange} />
                        </div> */}
                </Modal>
            </div>

            <Table rowSelection={rowSelection} columns={columns} dataSource={transformer.transformerList} />
            
        </div>

    );

}
const mapStateToProps = ({ transformerReducer }) => ({
    transformer: transformerReducer,
  });
  
  const mapDispatchToProps = {
saveTransData
  };
  export default connect(mapStateToProps, mapDispatchToProps)(TRSearch);
