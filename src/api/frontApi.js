import axios from "axios";

// const baseURL = `http://localhost:5000/api/v1/`
const baseURL = `https://taipower.azurewebsites.net/`;
// const token = document.cookie.split("; ").find((row) => row.startsWith("fltk"))
//   ? true
//   : false;

export const postUser = async (username, password) => {
  try {
    // console.log('in pos');
    const _url = `${baseURL}security/login`;
    const result = await axios.post(
      _url,
      {
        user_id: username,
        passwd: password,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(result);
    if (result.status === 200) {
      return result.data;
    }
  } catch (err) {
    console.log(err.response);
    // return { "errStatus": err.response.status, "errDetail": err.response.data.detail }
  }
};

export const getUserRole = async (token) => {
  try {
    const _url = `${baseURL}security/user/me`;
    const result = await axios.get(_url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    // console.log(result);
    if (result.status === 200) {
      return result.data;
    }
  } catch (err) {
    console.log(err.response);
  }
};

export const getTransformerList = async () => {
  try {
    const _url = `${baseURL}Transformer_details`;
    const result = await axios.get(_url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${token}`
      },
    });
    // console.log(result);
    if (result.status === 200) {
      return result.data;
    }
  } catch (err) {
    console.log(err.response);
  }
};
// 包含 token 的
// headers: {
//     authorization: `Bearer ${token}`,
// }
export const getDailyRates = async () => {
  try {
    const _url = `${baseURL}dailypeak_rates    `;
    const result = await axios.get(_url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${token}`
      },
    });
    // console.log(result);
    if (result.status === 200) {
      return result.data;
    }
  } catch (err) {
    console.log(err.response);
  }
};

export const getQuarterRates  = async () => {
  try {
    const _url = `${baseURL}quarterrates    `;
    const result = await axios.get(_url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${token}`
      },
    });
    // console.log(result);
    if (result.status === 200) {
      return result.data;
    }
  } catch (err) {
    console.log(err.response);
  }
};
export const getMonthlyRates  = async (coor,div,tr_index,date_year) => {
  try {
    const _url = `${baseURL}monthlyrate/coor/${coor}/${div}/${tr_index}/${date_year}`;
    const result = await axios.get(_url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${token}`
      },
    });
    // console.log(result);
    if (result.status === 200) {
      return result.data;
    }
  } catch (err) {
    console.log(err.response);
  }
};

export const getEachTransformer  = async (cust_id,div,tr_index) => {
  try {
   
    const _url = `${baseURL}Transformer_details/${cust_id}/${div}/${tr_index}`;
    const result = await axios.get(_url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${token}`
      },
    });
    // console.log(result);
    if (result.status === 200) {
      return result.data;
    }
  } catch (err) {
    console.log(err.response);
  }
};