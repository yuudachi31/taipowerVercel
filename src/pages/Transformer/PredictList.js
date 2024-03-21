//穿梭框

import { Switch, Table, Tag, Transfer, Tooltip ,Layout, Row, Col, Divider} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import difference from 'lodash/difference';
import React, { useState } from 'react';
// Customize Table Transfer
const TableTransfer = ({ onlyColumns, totalDataL, totalDataR, indexData, ...restProps }) => (
  <Transfer {...restProps}>
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
                <div class='font-bold'>第一具：{overView.type}</div>
                <div>原利用率：{overView.thereshold}</div>
                <div>新利用率：{overView.tenHour}</div>
              </div>
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
const totalDataL ={
    coor: 'B6744HD20',
    type: '燈',
    isExist: true,
    thereshold: '40%',
    tenHour: '50%'
  }
;
const totalDataR ={
    coor: 'xxxx',
    type: '燈',
    isExist: false,
    thereshold: '0%',
    tenHour: '0%'
  }
;
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

const PredictList = ({indexData}) => {
  // console.log('data', data)
  console.log('list data', indexData, indexData.light)
  const [targetKeys, setTargetKeys] = useState(originTargetKeys); //test
  const [lightDisabled, setLightDisabled] = useState(false);
  const [powerDisabled, setPowerDisabled] = useState(false);

  //設定燈資料
  let originLightTargetKeys = [];
  // const lightData = 
  if (indexData.light && indexData.light.new && indexData.light.new.data) {
    originLightTargetKeys = indexData.light.new.data.map((item) => item.key);
  } 
  const [targetLightKeys, setTargetLightKeys] = useState(originLightTargetKeys);
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
  let originPowerTargetKeys = [];
  if (indexData.power && indexData.power.new && indexData.power.new.data) {
    originPowerTargetKeys = indexData.power.new.data.map((item) => item.key);
  } 
  const [targetPowerKeys, setTargetPowerKeys] = useState(originPowerTargetKeys);
  console.log('targetPowerKeys', targetPowerKeys)
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

  // const [showSearch, setShowSearch] = useState(false);
  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };
  const onLightChange = (nextTargetKeys) => {
    setTargetLightKeys(nextTargetKeys);
  };
  const onPowerChange = (nextTargetKeys) => {
    setTargetPowerKeys(nextTargetKeys);
  };
  // const triggerDisable = (checked) => {
  //   setDisabled(checked);
  // };
  // const triggerShowSearch = (checked) => {
  //   setShowSearch(checked);
  // };
  return (
    <>
        {/* <TableTransfer
          dataSource={mockDataAll}
          targetKeys={targetKeys}
          // disabled={lightDisabled}
          // showSearch={showSearch}
          onChange={onChange}
          // filterOption={(inputValue, item) =>
          //   item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          // }
          // leftColumns={leftTableColumns}
          // rightColumns={rightTableColumns}
          onlyColumns={onlyColumns}
          totalDataL={totalDataL}
          totalDataR={totalDataR}
          indexData={mockDataAll}
          showSelectAll={false}
        />
        <Divider/> */}
        <TableTransfer
          dataSource={lightData}
          targetKeys={targetLightKeys}
          // disabled={lightDisabled}
          // showSearch={showSearch}
          onChange={onLightChange}
          // filterOption={(inputValue, item) =>
          //   item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          // }
          // leftColumns={leftTableColumns}
          // rightColumns={rightTableColumns}
          onlyColumns={onlyColumns}
          totalDataL={totalDataL}
          totalDataR={totalDataR}
          showSelectAll={false}
        />
        <Divider/>
        <TableTransfer
          dataSource={powerData}
          targetKeys={originPowerTargetKeys}
          // disabled={powerDisabled}
          // showSearch={showSearch}
          onChange={onPowerChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          // leftColumns={leftTableColumns}
          // rightColumns={rightTableColumns}
          onlyColumns={onlyColumns}
          totalDataL={totalDataL}
          totalDataR={totalDataR}
          showSelectAll={false}
        />
        {/* <Switch
          unCheckedChildren="disabled"
          checkedChildren="disabled"
          checked={disabled}
          onChange={triggerDisable}
          style={{
            marginTop: 16,
          }}
        />
        <Switch
          unCheckedChildren="showSearch"
          checkedChildren="showSearch"
          checked={showSearch}
          onChange={triggerShowSearch}
          style={{
            marginTop: 16,
          }}
        /> */}
    </>
  );
};
export default PredictList;