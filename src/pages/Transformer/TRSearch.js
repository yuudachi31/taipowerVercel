
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTransformerList, getTransformerListByCoor } from '../../api/frontApi'
import { saveTransData } from '../../actions/transformer';
import { connect } from "react-redux";
import { Link } from 'react-router-dom/cjs/react-router-dom';

//antd
import { Divider, Menu, Dropdown, Space, Table, Modal, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { PrinterOutlined, AudioOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['A222BC3333', 'A222BC1111', 'A222BC2222'];
const Percent = ['70.3', '63.9', '80.5'];
const Group = ['TO1', 'TO2', 'TO3'];
const Time = ['2023/10/01', '2023/10/02', '2023/10/04'];
const plainPersentage = ['72', '82', '60'];
const defaultCheckedList = [];
const { Search } = Input;

function TRSearch({ transformer, saveTransData }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const fetchData = ()=>{
        getTransformerList().then((data) => {
            if (data==401) {

            } else {
                saveTransData(data)
                setIsLoading(false)
               
            }
        }).catch((error) => {
            
            console.log("s");
          });
    }
    useEffect(() => {
        getTransformerList().then((data) => {
            if (data==401) {
                window.location.reload()
            } else {
                // console.log(data)
                saveTransData(data)
                setIsLoading(false)
                // pushData()
            }
        }).catch((error) => {
            // 處理其他錯誤，例如網絡錯誤等
            // message.error("登入失敗，請檢查帳號密碼是否正確。");
            console.log("s");
          });


    }, []);
    useEffect(() => {
        const lastPopupDate = localStorage.getItem('lastPopupDate');
        const today = new Date();
        const todayString = today.toISOString().slice(0, 10);

        if (!lastPopupDate || lastPopupDate !== todayString) {
            // 如果是第一次弹出或者上次弹出的日期不是今天，则弹出 Modal
            setIsModalVisible(true);

            // 更新弹窗日期为今天
            localStorage.setItem('lastPopupDate', todayString);
        }
        // 设置定时器，在凌晨12点时清除弹窗记录
        const clearPopupAtMidnight = () => {
            const now = new Date();
            if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
                localStorage.removeItem('lastPopupDate');
            }
        };

        // 每隔一段时间检查是否到达凌晨12点
        const interval = setInterval(clearPopupAtMidnight, 60000); // 每分钟检查一次

        return () => {
            clearInterval(interval); // 清除定时器
        };

        // // 在组件加载时设置一个定时器，用于在几秒后显示 Modal
        // const timer = setTimeout(() => {
        //     setIsModalVisible(true);
        // }, 500); // 在这里设置显示 Modal 的延迟时间，单位是毫秒
        // // 在組件卸載時清除定時器，以避免記憶體洩漏
        // return () => clearTimeout(timer);


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
            dataIndex: 'coor',
            render: text => {
                return (
                    <Link to={'/tr/info/?&coor=' + text[0] + '&div=' + text[1] + '&tr_index=' + text[2]} >{text[0]}</Link>
                )
            }
        },
        {
            title: '組別',
            dataIndex: 'div',
        },
        {
            title: '第幾具',
            dataIndex: 'tr_index',
        }, {
            title: '容量(KW)',
            dataIndex: 'cap',
        },
        {
            title: '利用率(%)',
            dataIndex: 'uti_rate',
        },
        // {
        //     title: '閥值',
        //     dataIndex: 'transformer_threshold',
        // },
    ];
    const data = [];
    const [isLoading, setIsLoading] = useState(true);

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
    const clearFilters = () => {

        getTransformerList().then((data) => {
            if (data.errStatus) {
                message.error(data.errDetail);
            } else {
                // console.log(data)
                saveTransData(data)
                setIsLoading(false)
                // pushData()
            }
        })
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
    const [searchText, setSearchText] = useState('');
    // const filteredData = transformer.transformerList.filter(user => user.coor.includes(searchText) || user.div.some(div => div.includes(searchText)));
    const onSearch = (value, _e, info) => {
        setIsLoading(true)
        getTransformerListByCoor(value).then((data) => {
            if (data.errStatus) {
                message.error(data.errDetail);
            } else {
                // console.log(data)
                saveTransData(data)
                setIsLoading(false)

                // pushData()
            }
        })
    }

    return (
        <div className='wrapper px-24 py-4'>
            <div className="flex justify-end">
                {/* <button className="btn " style={{ height: 40, width: 75 }}><PrinterOutlined />匯出</button> */}
                <div className="flex mb-2">
                    <Search

                        placeholder="搜尋圖號座標"
                        size="large"
                        onSearch={onSearch}
                        style={{
                            width: 200,
                        }}
                    />
                    {/* <button className="btn rounded-sm mr-7" style={{ height: 40, width: 100 }} onClick={() => { _history.push(`/tr/abnormal`) }}>異常變壓器</button> */}
                    {/* <button onClick={clearFilters} className="border border-green-400 rounded-sm mb-2" style={{ height: 40, width: 85 }}>清除篩選</button> */}
                </div>
            </div>
            <Modal title="變壓器異常通知" open={isModalVisible} onCancel={() => setIsModalVisible(false)}
                footer={[
                    // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
                    <Button type="primary" onClick={() => setIsModalVisible(false)}>確認</Button>,
                ]}
            >
                <div >
                    <Row >
                        <Col span={6}>圖號座標</Col>
                        <Col span={6}>組別</Col>
                        <Col span={6}>利用率（%）</Col>
                        <Col span={6}>日期</Col>
                    </Row>
                    {plainOptions.map((option, index) => (
                        <Row key={index}>
                            <Col span={6}>{option}</Col>
                            <Col span={6}>{Group[index]}</Col>
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

            {
                isLoading ? (<></>) : (<Table  columns={columns} dataSource={transformer.transformerList} />)
            }

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
