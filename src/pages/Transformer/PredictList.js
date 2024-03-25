//穿梭框

import { Switch, Table, Tag, Transfer, Tooltip ,message, Row, Col, Divider} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import difference from 'lodash/difference';
import React, { useEffect, useState } from 'react';
// Customize Table Transfer
const TableTransfer = ({ onlyColumns, totalDataL, totalDataR, indexData, ...restProps }) => (
  <Transfer {...restProps} >
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = onlyColumns;
      const overView = direction === 'left' ? totalDataL : totalDataR;
      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };
      return (
        <>
          <Table
            rowSelection={rowSelection}
            pagination={{style:{marginRight:'20px', marginBottom:'15px'} }}
            columns={columns}
            dataSource={filteredItems}
            title={() =>   
              <div class="flex justify-between text-normal">
                <div class='font-bold'>{overView.type}</div>
                <div>原利用率：{overView.thereshold}</div>
                <div>新利用率：{overView.newThereshold}</div>
              </div>
            }
            footer={() => listDisabled?
              <div class="font-bold">無法分割</div>
              : undefined
            }
            // size="small"
            // scroll={{
            //   x: 1000,
            // }}
            style={{
              pointerEvents: listDisabled ? 'none' : undefined,
            }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        </>

      );
    }}
  </Transfer>
);
const mockLightTags = ['A', 'B', 'C', 'D', 'E'];
const mockPowerTags = ['F', 'G', 'H', 'I', 'J'];
// const totalDataL ={
//     coor: 'B6744HD20',
//     type: '燈',
//     isExist: true,
//     thereshold: '40%',
//     tenHour: '50%'
//   }
// ;
// const totalDataR ={
//     coor: 'xxxx',
//     type: '燈',
//     isExist: false,
//     thereshold: '0%',
//     tenHour: '0%'
//   }
// ;
const mockData = Array.from({
  length: 10,
}).map((_, i) => ({
  key: `ori${i + 11}`,
  title: `content${i + 1}`,
  electricityNum: `002709822${i + 1}`,
  tenHour: "5%",
  address: `台北市松山區XXXXX${i + 1}`,
  tag: mockPowerTags[i % 5],
}));
const mockData2 = Array.from({
  length: 10,
}).map((_, i) => ({
  key: `pre${i + 21}`,
  title: `content${i + 1}`,
  electricityNum: `002709855${i + 1}`,
  tenHour: "5%",
  address: `台北市松山區XXXXX${i + 1}`,
  tag: mockPowerTags[i % 5],
}));
const mockDataAll = mockData.concat(mockData2);
console.log('mockData', mockDataAll)
const originTargetKeys = mockData2.map((item) => item.key)
console.log('originTargetKeys', originTargetKeys)
// const originTargetKeys = mockData //設定target table的資料
//   .filter((item) => Number(item.key) % 3 > 1)
//   .map((item) => item.key);

const onlyColumns = [
  {
    dataIndex: 'electricityNum',
    title: '電號',
    // width: '150',
  },
  {
    dataIndex: 'tag',
    title: '相別',
    // width: '50',
    render: (tag) => <Tag>{tag}</Tag>,
  },
  {
    dataIndex: 'tenHour',
    title: '用電量',
    // width: '100',
  },
  {
    dataIndex: 'address',
    title: '地址',
    // width: '100',
    ellipsis: {
      showTitle: false,
    },
    render: (address) => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    ),
  },
];

const PredictList = ({ indexData }) => {

  console.log('list data', indexData, indexData.light)
  // const [targetKeys, setTargetKeys] = useState(originTargetKeys); //test
  const [updateOriLightThereshold, setupdateOriLightThereshold] = useState('0%'); //更新原變壓器燈利用率
  const [updateNewLightThereshold, setupdateNewLightThereshold] = useState('0%'); //更新新變壓器燈利用率
  const [updateOriPowerThereshold, setupdateOriPowerThereshold] = useState('0%'); //更新原變壓器力利用率
  const [updateNewPowerThereshold, setupdateNewPowerThereshold] = useState('0%'); //更新新變壓器力利用率
  const [targetPowerKeys, setTargetPowerKeys] = useState([]);
  const [targetLightKeys, setTargetLightKeys] = useState([]);

  // //想設定當資料切換時新利用率為0%! && 當資料變換時重新設定target key
  useEffect(() => {
    let originPowerTargetKeys = [];
    if (indexData.power && indexData.power.new && indexData.power.new.data) {
      originPowerTargetKeys = indexData.power.new.data.map((item) => item.key);
    } 
    setTargetPowerKeys(originPowerTargetKeys)
    let originLightTargetKeys = [];
    if (indexData.light && indexData.light.new && indexData.light.new.data) {
      originLightTargetKeys = indexData.light.new.data.map((item) => item.key);
    }   
    setTargetLightKeys(originLightTargetKeys)
    setupdateOriLightThereshold('0%')
    setupdateNewLightThereshold('0%')
    setupdateOriPowerThereshold('0%')
    setupdateNewPowerThereshold('0%')
    // console.log('targetPowerKeys', targetPowerKeys)

  }, [indexData]);

  //設定燈資料
  console.log('targetLightKeys', targetLightKeys)
  const lightData = [];
  if (indexData.light.ori && Array.isArray(indexData.light.ori.data)) {
    lightData.push(...indexData.light.ori.data);
  }
  // 合併 new 資訊
  if (indexData.light.new) {
    if (Array.isArray(indexData.light.new.data)) {
      lightData.push(...indexData.light.new.data);
    }
  }
  console.log('light data', lightData )

  //設定力資料
  const powerData = [];
  if (indexData.power.ori && Array.isArray(indexData.power.ori.data)) {
    powerData.push(...indexData.power.ori.data);
  }
  // 合併 new 資訊
  if (indexData.power.new) {
    if (Array.isArray(indexData.power.new.data)) {
      powerData.push(...indexData.power.new.data);
    }
  }
  console.log('power data', powerData )

  //更新移動的key
  const onLightChange = (nextTargetKeys) => {
    setTargetLightKeys(nextTargetKeys);
  };
  const onPowerChange = (nextTargetKeys) => {
    console.log('nextTargetKeys', nextTargetKeys)
    setTargetPowerKeys(nextTargetKeys);
  };

  //設定燈表格上資料
  const lightDataL ={
    coor: `${indexData.light.ori.coor}`,
    type: '燈',
    thereshold: `${indexData.power.ori.thereshold}`,
    newThereshold: updateOriLightThereshold,
  }
  const lightDataR ={
    coor: `${indexData.light.new.coor}`,
    type: '燈',
    thereshold: `${indexData.light.new.thereshold}`,
    newThereshold: updateNewLightThereshold,
  }

  //設定力表格上資料
  const powerDataL ={
    coor: `${indexData.power.ori.coor}`,
    type: '力',
    thereshold: `${indexData.power.ori.thereshold}`,
    newThereshold: updateOriPowerThereshold,
  }
  const powerDataR ={
    coor: `${indexData.power.new.coor}`,
    type: '力',
    thereshold: `${indexData.power.new.thereshold}`,
    newThereshold: updateNewPowerThereshold,
  }

  //更新利用率loading
  const theresholdSuccess = () => {
    message.loading('正在計算並更新利用率中...', 3, () => {
      message.success('已更新！');
      setupdateOriLightThereshold(`${Math.floor(Math.random() * 51) + 10}%`)
      setupdateNewLightThereshold(`${Math.floor(Math.random() * 51) + 10}%`)
      setupdateOriPowerThereshold(`${Math.floor(Math.random() * 51) + 10}%`) 
      setupdateNewPowerThereshold(`${Math.floor(Math.random() * 51) + 10}%`)
    });
    console.log('變換到右邊穿梭框的資料key值，燈：', targetLightKeys, '，力：' , targetPowerKeys)
  };

  return (
    <>
        <TableTransfer
          dataSource={lightData}
          targetKeys={targetLightKeys}
          disabled={indexData.light.disabled}
          onChange={onLightChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          onlyColumns={onlyColumns}
          totalDataL={lightDataL}
          totalDataR={lightDataR}
          showSelectAll={false}
        />
        <Divider/>
        <TableTransfer
          dataSource={powerData}
          targetKeys={targetPowerKeys}
          disabled={indexData.power.disabled}
          onChange={onPowerChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          onlyColumns={onlyColumns}
          totalDataL={powerDataL}
          totalDataR={powerDataR}
          showSelectAll={false}
        />
        <div class="flex" style={{justifyContent:'flex-end'}}>
          <button class="btn btn-orange bg-orange-400 mt-5" type="primary" onClick={theresholdSuccess}>更新利用率</button>
        </div>
    </>
  );
};
export default PredictList;