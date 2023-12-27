//帳號管理
//antd
import { Layout, Input, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
const ContainerHeight = 600;
const { Header, Content } = Layout;


export const LOG_DATA = [
  {
    log: 'B100 Login',
    time: '2023/11/19'
  },
  {
    log: 'B100 Login',
    time: '2023/11/18'
  },
  {
    log: 'B100 Login',
    time: '2023/11/17'
  },
  {
    log: 'B100 Login',
    time: '2023/11/16'
  },
  {
    log: 'B100 Login',
    time: '2023/11/15'
  },
  {
    log: 'B100 Login',
    time: '2023/11/14'
  },
  {
    log: 'B100 Login',
    time: '2023/11/13'
  },
  {
    log: 'B100 Login',
    time: '2023/11/12'
  },
  {
    log: 'B100 Login',
    time: '2023/11/11'
  },
  {
    log: 'B100 Login',
    time: '2023/11/10'
  },
  {
    log: 'B100 Login',
    time: '2023/11/09'
  },
  {
    log: 'B100 Login',
    time: '2023/11/08'
  },
  {
    log: 'B100 Login',
    time: '2023/11/07'
  },
  {
    log: 'B100 Login',
    time: '2023/11/06'
  },
  {
    log: 'B100 Login',
    time: '2023/11/05'
  },
  {
    log: 'B100 Login',
    time: '2023/11/04'
  },
  {
    log: 'B100 Login',
    time: '2023/11/03'
  },
  {
    log: 'B100 Login',
    time: '2023/11/02'
  },
  {
    log: 'B100 Login',
    time: '2023/11/01'
  },
  {
    log: 'B100 Login',
    time: '2023/10/30'
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
                    itemKey="time"
                    onScroll={onScroll}
                    class="loglist-padding"
                >
                    {(item) => (
                    <List.Item key={item.time}>
                        <List.Item.Meta
                        title={<div>{item.log}</div>}
                        />
                        <div>{item.time}</div>
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
