import axios from 'axios';

// const baseURL = `http://localhost:5000/api/v1/`
const baseURL = `https://taipower.azurewebsites.net/`
const token = document.cookie.split('; ').find(row => row.startsWith('fltk')) ? true : false;



export const postUser = async (username, password) => {
    try {
        console.log('in pos');
        const _url = `${baseURL}security/login`
        const result = await axios.post(_url, {
            "user_id": username,
            "passwd": password
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        console.log(result)
        if (result.status === 200) {
            return result.data
        }
    } catch (err) {
        console.log(err.response);
        // return { "errStatus": err.response.status, "errDetail": err.response.data.detail }
    } 
}

// 包含 token 的
// headers: {
//     authorization: `Bearer ${token}`,
// }