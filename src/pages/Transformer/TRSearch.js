
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAbnormalTransList, getTransformerList, getTransformerListByCoor, postEmailNotify, postUser } from '../../api/frontApi'
import { saveTransData } from '../../actions/transformer';
import { connect } from "react-redux";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import ErrorModal from '../../components/ErrorModal'

//antd
import { Divider, Menu, Dropdown, Space, Table, Modal, Input, Button, Checkbox, Row, Col, message, Spin } from 'antd';
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
const containerStyle = {
    width: '100%',
    height: 200,
    overflow: 'auto',
    // border: '1px solid #f0f0f0',
    padding: '4px 8px 4px 8px',
    borderRadius: '3px'
};
function TRSearch({ transformer, saveTransData }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const [abnormalTransData, setAbnormalTransData] = useState([]);
    const [isModalDataLoading, setIsModalDataLoading] = useState(true);
    const fetchData = () => {
        getTransformerList().then((data) => {
            if (data?.errStatus) {
                setErrorStatus(data)
                setIsErrorModalOpen(true)

                console.log(data)

            } else {
                saveTransData(data)
                setIsLoading(false)

            }
        }).catch((error) => {

            console.log("s");
        });
    }
    const _logout = (e) => {
        document.cookie = "fltk=''" + ";path=/";
        document.cookie = "flid=''" + ";path=/";
        document.cookie = "fln=" + ";path=/";
        document.cookie = "user_id=" + ";path=/";
        document.cookie = "email=" + ";path=/";
        document.cookie = "chat_id=" + ";path=/";
        document.cookie = "user_name=" + ";path=/";
        document.cookie = "region_id=" + ";path=/";
        document.cookie = "region_name=" + ";path=/";
        document.cookie = "roles=" + ";path=/";
        //筆記: 有出現同名cookie的現象，結果是因為path或max-age參數如果不同會被認為不同cookie
        //另外cookie的預設max-age是-1，即關閉瀏覽器就會刪除
        // console.log("logout!")
        // console.log(document.cookie);
        _history.push('/login')
    }

    // const testArr=['g111134001@grad.ntue.edu.tw','yuudachi31@gmail.com'] 
    const params = new URLSearchParams();
    // testArr.forEach((value, index) => { 
    //     params.append(`arr[${index}]`, value); 
    // });


    useEffect(() => {
        // postEmailNotify(params)
        // const resetTime = localStorage.getItem('resetTime');
        const lastPopupDate = localStorage.getItem('lastPopupDate');
        const today = new Date();
        const todayString = today.toISOString().slice(0, 10);
        // console.log(todayString)

        // 设置定时器，在凌晨12点时清除弹窗记录
        const clearPopupAtMidnight = () => {
            const now = new Date();
            if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
                localStorage.removeItem('lastPopupDate');
            }
        };

        // 每隔一段时间检查是否到达凌晨12点
        const interval = setInterval(clearPopupAtMidnight, 60000); // 每分钟检查一次



        // // 在组件加载时设置一个定时器，用于在几秒后显示 Modal
        // const timer = setTimeout(() => {
        //     setIsModalVisible(true);
        // }, 500); // 在这里设置显示 Modal 的延迟时间，单位是毫秒
        // // 在組件卸載時清除定時器，以避免記憶體洩漏
        // return () => clearTimeout(timer);

        const reloadusr = document.cookie?.split("; ").find((row) => row.startsWith("usr"))?.split("=")[1]
        const reloadpsw = document.cookie?.split("; ").find((row) => row.startsWith("psw"))?.split("=")[1]

        getTransformerList().then((data) => {

            if (data == 401) {
                if (Number(localStorage.getItem('resetTime')) == 8) {
                    console.log(Number(localStorage.getItem('resetTime')))

                    console.log("aabb")
                    localStorage.removeItem('resetTime');

                    setLogoutModalVisible(true)
                } else if (Number(localStorage.getItem('resetTime')) < 8 && Number(localStorage.getItem('resetTime')) >= 1) {
                    console.log(Number(localStorage.getItem('resetTime')))

                    postUser(reloadusr, reloadpsw).then((data) => {
                        if (data && data.errStatus) {
                            message.error(data.errDetail);
                        } else {
                            document.cookie = "fltk=" + data.access_token + ";path=/";
                            localStorage.setItem('resetTime', Number(localStorage.getItem('resetTime')) + 1)
                            console.log("re")
                            window.location.reload()
                        }

                    })

                } else {
                    localStorage.setItem('resetTime', 1)
                    console.log(Number(localStorage.getItem('resetTime')))
                    window.location.reload()
                }


            } else {
                document.cookie = "usr=''" + ";path=/";
                document.cookie = "psw=''" + ";path=/";
                localStorage.removeItem('resetTime');
                getAbnormalTransList().then((data) => {
                    if (data?.errStatus) {
                        setErrorStatus(data)
                        setIsErrorModalOpen(true)
                    } else {

                        // console.log(data)
                        setAbnormalTransData(data)
                        // pushData()
                        console.log("saveall")
                        setIsModalDataLoading(false)
                    }
                })
                // console.log(data)
                saveTransData(data)
                setIsLoading(false)
                if (!lastPopupDate || lastPopupDate !== todayString) {
                    // 如果是第一次弹出或者上次弹出的日期不是今天，则弹出 Modal
                    setIsModalVisible(true);

                    // 更新弹窗日期为今天
                    localStorage.setItem('lastPopupDate', todayString);
                }
                // pushData()
            }
        }).catch((error) => {
            // 處理其他錯誤，例如網絡錯誤等
            // message.error("登入失敗，請檢查帳號密碼是否正確。");
            console.log(error);
        });

        return () => {
            clearInterval(interval); // 清除定时器
        };
    }, []);
    useEffect(() => {

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
                    <Link to={'/tr/info/?coor=' + text[0] + '&div=' + text[1] + '&tr_index=' + text[2]} >{text[0]}</Link>
                )
            },
            width: '20%'
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
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorStatus, setErrorStatus] = useState(200);
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
            if (data?.errStatus) {
                setErrorStatus(data)
                setIsErrorModalOpen(true)


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
            if (data?.errStatus) {
                setErrorStatus(data)
                setIsErrorModalOpen(true)


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
                <ErrorModal
                    setIsErrorModalOpen={setIsErrorModalOpen}
                    isErrorModalOpen={isErrorModalOpen}
                    errStatus={errorStatus}

                ></ErrorModal>
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
                {
                    isModalDataLoading ? (<>
                        <div style={{ height: '200px' }}>
                            <Spin tip="載入中" size="large" style={{ height: '200px' }}>
                                <div className="content" />
                            </Spin>
                        </div> </>) :
                        abnormalTransData?.length < 1 ? <>
                            無資料
                        </>
                            :
                            (<div style={containerStyle}>
                                <Row style={{ marginBottom: '8px' }} className='font-bold'>
                                    <Col span={6}>圖號座標</Col>
                                    <Col span={6}>組別</Col>
                                    <Col span={6}>第幾具</Col>
                                    <Col span={6}>利用率（%）</Col>
                                    {/* <Col span={6}>日期</Col> */}
                                </Row>
                                {abnormalTransData?.map((data, index) => (
                                    <Row key={index} style={{ borderBottom: '1px solid #f0f0f0', height: '28px' }}>
                                        <Col span={6}>{data.coor}</Col>
                                        <Col span={6}>{data.div}</Col>
                                        {data.power_type == "Y接" ?
                                            <Col span={6}>NA</Col>
                                            :
                                            <Col span={6}>{data.tr_index}</Col>
                                        }


                                        <Col span={6} style={{ color: '#F66C55' }}>{data.uti_rate.toFixed(1)}</Col>
                                        {/* <Col span={6}>{Time[index]}</Col> */}
                                    </Row>
                                ))}
                            </div>)
                }

                {/* <div class="flex mb-3"><div class=" w-72">
                        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>全選</Checkbox>
                        </div>
                        </div>
                    <div class="flex mb-3">
                        <CheckboxGroup class=" w-72" options={dataCheck} value={checkedList} onChange={onChange} />
                        </div> */}
            </Modal>
            <Modal title="登入逾時" open={logoutModalVisible} onCancel={() => { setLogoutModalVisible(false); _logout() }}
                footer={[
                    // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
                    <Button type="primary" onClick={() => { setLogoutModalVisible(false); _logout() }}>確認</Button>,
                ]}
            >
                <div>
                    請重新登入系統
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
                isLoading ? (
                    <>
                        <Spin tip="載入中" size="large">
                            <div className="content" />
                        </Spin>
                    </>) : (<Table columns={columns} dataSource={transformer.transformerList} />)
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
