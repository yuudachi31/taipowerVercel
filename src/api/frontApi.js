import axios from 'axios';

const baseURL = `http://localhost:5000/api/v1/`
const token = document.cookie.split('; ').find(row => row.startsWith('fltk')) ? true : false;



export const postUser = async (username, password) => {
    try {
        console.log('in pos');
        const _url = `${baseURL}user/signin`
        const result = await axios.post(_url, {
            "username": username,
            "password": password
        }, {
            headers: {
                'Accept': 'application/json'
            }
        })
        if (result.status === 200) {
            return result.data
        }
    } catch (err) {
        console.log(err.response);
        return { "errStatus": err.response.status, "errDetail": err.response.data.detail }
    }
}

// 包含 token 的
// headers: {
//     authorization: `Bearer ${token}`,
// }