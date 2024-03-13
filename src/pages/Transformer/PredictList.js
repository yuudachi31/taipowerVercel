//穿梭框

import { Switch, Table, Tag, Transfer, Tooltip ,Layout, Row, Col, Divider} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import difference from 'lodash/difference';
import React, { useState } from 'react';
// Customize Table Transfer
const TableTransfer = ({ onlyColumns, totalDataL, totalDataR, data, ...restProps }) => (
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
const mockTags = ['一具', '二具', '三具'];
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
  key: i.toString(),
  title: `content${i + 1}`,
  description: `電號${i + 1}`,
  electricityNum: `電號${i + 1}`,
  priceDay: `${10+ (i % 4)}`,
  tenHour: "5%",
  KW: "1000 kw",
  address: `台北市松山區${i + 1}`,
  // disabled: i % 4 === 0,
  tag: mockTags[i % 3],
}));
const originTargetKeys = mockData //設定target table的資料
  .filter((item) => Number(item.key) % 3 > 1)
  .map((item) => item.key);
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

const PredictList = ({data}) => {
  console.log('data', data)
  const [targetKeys, setTargetKeys] = useState(originTargetKeys);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };
  const triggerDisable = (checked) => {
    setDisabled(checked);
  };
  const triggerShowSearch = (checked) => {
    setShowSearch(checked);
  };
  return (
    <>
        <TableTransfer
          dataSource={mockData}
          targetKeys={targetKeys}
          // disabled={disabled}
          showSearch={showSearch}
          onChange={onChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          // leftColumns={leftTableColumns}
          // rightColumns={rightTableColumns}
          onlyColumns={onlyColumns}
          totalDataL={totalDataL}
          totalDataR={totalDataR}
          data={data}
          showSelectAll={false}
        />
        <Divider/>
        <TableTransfer
          dataSource={mockData}
          targetKeys={targetKeys}
          // disabled={disabled}
          showSearch={showSearch}
          onChange={onChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          // leftColumns={leftTableColumns}
          // rightColumns={rightTableColumns}
          onlyColumns={onlyColumns}
          totalDataL={totalDataL}
          totalDataR={totalDataR}
          data={data}
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