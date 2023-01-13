


//antd
import { Layout, Divider } from 'antd';
import { useHistory } from 'react-router-dom';

const { Sider } = Layout;

function ManageMenu({ data, menuActive }) {
    const _history = useHistory()

    function handleClickMenu(idx) {
        if (_history.location.pathname !== data[idx].route) {
            _history.push(data[idx].route)
        }
    }

    return (
        <Sider width={290}>
            <div class="grid grid-flow-col auto-cols-min px-6 pt-12 pb-8">
                <div class="w-14 h-14 rounded-full bg-gray-300 row-span-2 mr-6"></div>
                <div class="text-base font-bold mb-3">User_001</div>
                <span class="text-gray-300">管理者</span>
            </div>
            <Divider />
            <div class="grid gap-4 px-5 py-8">
                <button class={`menu-btn ${menuActive == data[0].name ? 'menu-btn-active' : ''}`} onClick={() => handleClickMenu(0)}>{data[0].icon}<span class="ml-6">{data[0].title}</span></button>
                <button class={`menu-btn ${menuActive == data[1].name ? 'menu-btn-active' : ''}`} onClick={() => handleClickMenu(1)}>{data[1].icon}<span class="ml-6">{data[1].title}</span></button>
            </div>
        </Sider>
    );

}
export default ManageMenu;
