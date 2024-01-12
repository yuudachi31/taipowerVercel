import axios from "axios";

// const baseURL = `http://localhost:5000/api/v1/`
// const baseURL = `https://taipower.azurewebsites.net/`;
const baseURL = `https://amibackendweb.azurewebsites.net/`;

 const glabalToken = document.cookie?.split("; ").find((row) => row.startsWith("fltk"))?.split("=")[1]
//  console.log(glabalToken)
// //   ? true
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
    const _url = `${baseURL}security/user/me/`;
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
    const _url = `${baseURL}transformer_details`;
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
// export const getDailyRates = async (coor,div,date_year,date_month) => {
//   try {
//     const _url = `${baseURL}/dailypeak_rate/coor/${coor}/${div}/${date_year}/${date_month}   `;
export const getDailyRates = async (coor,div,tr_index,date_year,date_month) => {
  try {
    const _url = `${baseURL}dailypeak_rate/coor/${coor}/${div}/${tr_index}/${date_year}/${date_month}   `;
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

export const getQuarterRates  = async (coor,div,tr_index,date_year,date_month,date_day) => {
  try {
    const _url = `${baseURL}quarterrate/coor/${coor}/${div}/${tr_index}/${date_year}/${date_month}/${date_day}   `;
    console.log(_url)
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
export const getQuarterRatesRange  = async (coor,div,tr_index) => {
  try {
    const _url = `${baseURL}quarterrate/interval/${coor}/${div}/${tr_index}   `;
    console.log(_url)
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
   
    const _url = `${baseURL}transformer_details/${cust_id}/${div}/${tr_index}`;
    const result = await axios.get(_url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //  Authorization: `Bearer ${glabalToken}`
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

export const postAccountUpload  = async (file) => {
  try {
   
    const _url = `${baseURL}account/upload_account`;
    const result = await axios.post(_url, 
      file
    ,{
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

export const getRegionUser  = async (regions_id) => {
  try {
   
    const _url = `${baseURL}accounts/${regions_id}`;
    const result = await axios.get(_url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${glabalToken}`
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

export const getAbnormalTransList = async () => {
  try {
    const _url = `${baseURL}transformer_detail/danger_lvs`;
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