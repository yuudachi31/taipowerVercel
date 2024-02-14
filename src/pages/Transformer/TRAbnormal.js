import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAbnormalTransList, getAbnormalTransByCoor, deleteDangerTrans, addNoticeNextDay } from '../../api/frontApi'
import { saveAbnormalTransData } from '../../actions/transformer';
import { connect } from "react-redux";

//antd
import { Divider, Menu, Dropdown, Space, Table, Modal, Input, Button, Checkbox, Row, Col, Tag, message } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
const { Search } = Input;
function TRAbnormal({ transformer, saveAbnormalTransData }) {

    //刪除modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const confirmOkAction = () => {
        setIsLoading(true)
        if (selectedRowKeys.length < 1) {
            setIsLoading(false)

        } else {
            selectedRowKeys.forEach((el, index) => {
                setIsLoading(true)
                let ABNtr = transformer.ABNtransformerList[el]
                console.log()
                deleteDangerTrans(ABNtr.coor[0], ABNtr.coor[1], ABNtr.coor[2]).then((data) => {
                    if (data.errStatus) {
                        message.error(data.errDetail);
                    } else {

                        console.log("delete")
                        if (index === selectedRowKeys.length - 1) {
                            getAbnormalTransList().then((data) => {
                                if (data.errStatus) {
                                    message.error(data.errDetail);
                                } else {
                                    // console.log(data)
                                    saveAbnormalTransData(data)
                                    // pushData()
                                    console.log("saveall")
                                    setIsLoading(false)
                                }
                            })
                        }
                    }
                })
                // console.log(ABNtr.coor[0], ABNtr.coor[1], ABNtr.coor[2])

            })
        }
    }
    const noticeOkAction = () => {
        // setIsLoading(true)
        if (selectedRowKeys.length < 1) {
            // setIsLoading(false)

        } else {
            let noticeList = []
            selectedRowKeys.forEach((el, index) => {
                // setIsLoading(true)
                let ABNtr = transformer.ABNtransformerList[el]
                // console.log(ABNtr)
                if (ABNtr.tr_index !== 'NA') {
                    noticeList.push({
                        coor: ABNtr.coor[0],
                        div: ABNtr.coor[1],
                        tr_index: ABNtr.coor[2]
                    })
                } else {
                    noticeList.push({
                        coor: ABNtr.coor[0],
                        div: ABNtr.coor[1],
                        tr_index: 1
                    })
                }
                //    console.log(noticeList)


                // deleteDangerTrans(ABNtr.coor[0], ABNtr.coor[1], ABNtr.coor[2]).then((data) => {
                //     if (data.errStatus) {
                //         message.error(data.errDetail);
                //     } else {

                //         console.log("delete")
                //         if (index === selectedRowKeys.length - 1) {
                //             getAbnormalTransList().then((data) => {
                //                 if (data.errStatus) {
                //                     message.error(data.errDetail);
                //                 } else {
                //                     // console.log(data)
                //                     saveAbnormalTransData(data)
                //                     // pushData()
                //                     console.log("saveall")
                //                     setIsLoading(false)
                //                 }
                //             })
                //         }
                //     }
                // })
                // console.log(ABNtr.coor[0], ABNtr.coor[1], ABNtr.coor[2])

            })
            addNoticeNextDay(noticeList).then(data => {
                if (data.errStatus) {
                    message.error(data.errDetail);
                } else {
                    console.log(data)
                }
            })
        }
    }
    const confirm = () => {
        Modal.confirm({
            title: '刪除確認',
            content: '確定刪除這些異常變壓器？',
            okText: '是',
            cancelText: '否',
            onOk: confirmOkAction

        });
    };
    const noticeNextDay = () => {
        Modal.confirm({
            title: '隔天通知',
            content: '確定將所選變壓器設為隔天通知？',
            okText: '是',
            cancelText: '否',
            onOk: noticeOkAction

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
    // console.log(transformer.ABNtransformerList)
    for (let i = 0; i < 45; i += 3) {
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
                key: i + 1,
                see: 'A222BC3333',
                group: `T01`,
                number: '001',
                rate: '70.3',
                threshold: '70%',
                state: ['2'],
            },
            {
                key: i + 2,
                see: 'A222BC3333',
                group: `T01`,
                number: '001',
                rate: '68.9',
                threshold: '60%',
                state: ['1'],
            });
    }
    // console.log("data", data)
    const [filteredInfo, setFilteredInfo] = useState("");
    const [searchInfo, setSearchInfo] = useState("");

    const handleChange = (pagination, filters) => {
        console.log('Various parameters', pagination, filters);
        setFilteredInfo(filters);
    };
    const clearFilters = () => {
        setIsLoading(true)
        setFilteredInfo({});
        getAbnormalTransList().then((data) => {
            if (data.errStatus) {
                message.error(data.errDetail);
            } else {
                // console.log(data)
                saveAbnormalTransData(data)
                // pushData()
                console.log("saveall")
                setIsLoading(false)
            }
        })
    };
    const columns = [
        {
            title: '圖號座標',
            key: 'coor',
            dataIndex: 'coor',
            render: text => {
                return (
                    // <a href='/tr/info' >{text}</a>
                    <div>{text[0]}</div>
                )
            }
        },
        {
            title: '組別',
            key: 'div',
            dataIndex: 'div',
        },
        {
            title: '第幾具',
            key: 'tr_index',
            dataIndex: 'tr_index',
        },
        {
            title: '利用率(%)',
            key: 'uti_rate',
            dataIndex: 'uti_rate',
        },
        // {
        //     title: '閥值',
        //     key: 'threshold',
        //     dataIndex: 'threshold',
        // },
        {
            title: '危險等級',
            key: 'danger_lv',
            dataIndex: 'danger_lv',
            filters: statefilters,
            filteredValue: filteredInfo.danger_lv || null,
            // onFilter: (value, record) => record.state.indexOf(value) === 0,

            onFilter: (value, record) => record.danger_lv.includes(value),
            ellipsis: true,
            render: (_, { danger_lv }) => (
                <>
                    {danger_lv?.map((danger_lv) => {
                        let color = 'calendulagold';
                        if (danger_lv === '3') {
                            color = 'volcano';
                            danger_lv = '重度危險'
                        }
                        else if (danger_lv === '2') {
                            color = 'magenta';
                            danger_lv = '中度危險'
                        }
                        else if (danger_lv === '1') {
                            color = 'gold'
                            danger_lv = '一般危險'
                        }
                        return (
                            <Tag color={color} key={danger_lv}>
                                {danger_lv}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        console.log(newSelectedRowKeys)


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
    const onSearch = (value, _e, info) => {
        setIsLoading(true)
        console.log(info?.source, value);
        getAbnormalTransByCoor(value).then((data) => {
            if (data.errStatus) {
                message.error(data.errDetail);
            } else {
                // console.log(data)
                saveAbnormalTransData(data)
                setIsLoading(false)

                // pushData()
            }
        })


    }
    useEffect(() => {
        setIsLoading(true)
        getAbnormalTransList().then((data) => {

            if (data.errStatus) {
                message.error(data.errDetail);
            } else {
                // console.log(data)
                saveAbnormalTransData(data)
                // pushData()
                console.log("saveall")
                setIsLoading(false)
            }
        })
    }, [])




    return (
        <div className='wrapper px-24 py-4'>
            <div className="flex justify-between">
                <div className="flex">

                    <button className="btn-red mr-4" style={{ height: 40 }} onClick={confirm}>刪除</button>

                    <button className="btn " style={{ height: 40 }} onClick={noticeNextDay}>隔天通知</button>
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
            {
                isLoading ? (<></>) : (<Table rowSelection={rowSelection} columns={columns} dataSource={transformer.ABNtransformerList} onChange={handleChange} />)
            }

        </div>
    );




}
const mapStateToProps = ({ transformerReducer }) => ({
    transformer: transformerReducer,
});

const mapDispatchToProps = {
    saveAbnormalTransData
};
export default connect(mapStateToProps, mapDispatchToProps)(TRAbnormal);

