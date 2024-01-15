//帳號管理
//antd
import { Layout, Input, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
const ContainerHeight = 600;
const { Header, Content } = Layout;


export const LOG_DATA = [
  // {
  //   user_id:'user_id',
  //   user_name:'user_name',
  //   region_name:'region_name',
  //   event: 'event',
  //   grant_time: 'grant_time'
  // },
  {
    user_id:'001',
    user_name:'001',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/19'
  },
  {
    user_id:'002',
    user_name:'002',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/18'
  },
  {
    user_id:'003',
    user_name:'003',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/17'
  },
  {
    user_id:'004',
    user_name:'004',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/16'
  },
  {
    user_id:'005',
    user_name:'005',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/15'
  },
  {
    user_id:'006',
    user_name:'006',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/14'
  },
  {
    user_id:'007',
    user_name:'007',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/13'
  },
  {
    user_id:'008',
    user_name:'008',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/12'
  },
  {
    user_id:'009',
    user_name:'009',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/11'
  },
  {
    user_id:'010',
    user_name:'010',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/10'
  },
  {
    user_id:'011',
    user_name:'011',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/09'
  },
  {
    user_id:'012',
    user_name:'012',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/08'
  },
  {
    user_id:'013',
    user_name:'013',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/07'
  },
  {
    user_id:'014',
    user_name:'014',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/06'
  },
  {
    user_id:'015',
    user_name:'015',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/05'
  },
  {
    user_id:'016',
    user_name:'016',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/04'
  },
  {
    user_id:'017',
    user_name:'017',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/03'
  },
  {
    user_id:'018',
    user_name:'018',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/02'
  },
  {
    user_id:'019',
    user_name:'019',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/11/01'
  },
  {
    user_id:'020',
    user_name:'020',
    region_name:'005',
    event: 'B100 Login',
    grant_time: '2023/10/30'
  },
];

function UserLog() { 
  const [data, setData] = useState([]);
  const appendData = () => {
    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData(data.concat(body.results));
    //     message.success(`${body.results.length} more items loaded!`);
    //   });
    setData(LOG_DATA);
    message.success(`${LOG_DATA.length} 項新資料已被加載!`);
  };

  useEffect(() => {
    appendData();
  }, []);
  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };


  return (
    <Layout class="px-20 py-12 manage-wrapper bg-gray-100 minHeight">
      <Header class="pt-4 pb-8 flex space-x-7 items-center">
        <h2 class="flex-auto font-bold text-2xl">檢視記錄檔</h2>
      </Header>
      <Content>
        <Layout>
          {/* <Header class="pl-16 user-grid-row h-14 bg-purple-400 text-white font-medium text-base"> */}
              <List>
                <VirtualList
                    data={LOG_DATA}
                    height={ContainerHeight}
                    itemHeight={47}
                    itemKey="grant_time"
                    onScroll={onScroll}
                    class="loglist-padding"
                >
                    {(item) => (
                    <List.Item key={item.grant_time}>
                        <List.Item.Meta
                        title={<div>{item.user_id}</div>}
                        />
                        <List.Item.Meta
                        title={<div>{item.user_name}</div>}
                        />
                        <List.Item.Meta
                        title={<div>{item.region_name}</div>}
                        />
                        <List.Item.Meta
                        title={<div>{item.grant_time}</div>}
                        />
                        <div>{item.event}</div>
                    </List.Item>
                    )}
                </VirtualList>
            </List>
        </Layout>
      </Content>
    </Layout>
  );

}
export default UserLog;
