import React from "react";
import { useState } from "react";
import axios from "axios";
// import DisplayTable from "./DisplayTable";
var reader = new FileReader();
const UploadPage = () => {
  // save the input file name to a state variable
  const [csvFile, setCsvFile] = useState(null);
  // save the file data to a state variable
  // so the DisplayTable component can use it
  const [csvArray, setCsvArray] = useState([]);

  const processCSV = (str) => {
    // split the file data into rows from the newline character
    let rows = str.split("\n");

    // remove comma
    rows = rows.map(function (row) {
      return row.replace(/,/g, " ");
    });
    setCsvArray(rows);
    console.log(csvArray);
  };

  // const handleFileUpload = () => {
  //   const file = csvFile;
  //   const reader = new FileReader();

  //   reader.onload = function (e) {
  //     const text = e.target.result;
  //     processCSV(text);
  //   };

  //   reader.readAsText(file);
  // };
  // const handleFileUpload2 =  async () => {
  const handleFileUpload2 = () => {
    let file = document.querySelector("[name=file]").files[0];
    //////解壓縮測試
    // const pako = require('pako')
    // let res = await jsReadGZFiles(file)
    // console.log(res)
    // const byteArray = new Uint8Array(res);
    // const pakoArr = pako.ungzip(byteArray);
    // console.log(pakoArr)
    ////

    const LENGTH = 1024 * 1024 * 8;
    let chunks = slice(file, LENGTH)
    // const byteArray = new Uint8Array(chunks[0]);
    // const pakoArr = pako.ungzip(byteArray);
    // console.log(pakoArr)
    const blob = new Blob(chunks, { type: 'text/csv,charset=UTF-8' });
    const csvUrl = URL.createObjectURL(file, { type: 'application/x-gzip' }); // 参考链接 https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL
    // let link = document.createElement('a');
    console.log(blob);
    // link.download = `details_${new Date().getTime()}.csv`; //文件名字 
    // link.href = csvUrl;
    // 触发下载
    // link.click();

// // 合併測試
//     const chunckNumber = !fileSize ? 1 : Math.ceil(fileSize / (8 * 1024 *1024));
    const chunckNumber = 8 * 1024 *1024;

    let fileData = [];
    chunks.forEach((blobs)=>{
      fileData.push(blobs)

    })
    console.log(fileData)
        const blob2 = new Blob(fileData, {
          type: "application/x-gzip"
        });
        
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob2);
        link.download = 'test.csv';
        link.click();
        window.URL.revokeObjectURL(link.href);
      // }
    // };
    // getFileContent(0);
  }
    /////////////////////////////上傳測試(失敗)
  //   var appUrl = "https://script.google.com/macros/s/AKfycbytmk4zI6ebjRKhUrycAyiyZxiz8zq9FZzJNwjeQWkO/dev", // 網路應用程式網址

  //     reader = new FileReader();
  //     reader.onload = getFileInfo;
  //     reader.readAsDataURL(file);
    

  //   function getFileInfo(evt) {
  //     var fileName = file.name,
  //       fileType = file.type,
  //       dataUrl = evt.target.result,
  //       files=file
  //     uploadFile(fileName, fileType, files);
  //   }
  //   const uploadFile= async(fileName, fileType,files)=>{
  //     const result = await axios.post({
  //       url: appUrl,
  //       data: {
  //         "fileName": fileName,
  //         "fileType": fileType,
  //       "files":files
  //       },
        
  //       success: function (fileUrl) { // 成功時回傳檔案網址
  //         console.log("good")
  //       },
  //       error: function (e) {
  //         console.log(JSON.stringify(e));
  //       }
  //     });
  //   }
  // };








const jsReadGZFiles = (files, type) => {
  return new Promise(function (resolve, reject) {
    let blob = new Blob([files], { type: 'application/x-gzip' })
    let reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result)
    };
    reader.readAsArrayBuffer(blob)

  })
}



function slice(file, piece = 1024 * 1024 * 5) {
  let totalSize = file.size; // 檔案總大小
  let start = 0; // 每次上傳的開始位元組
  let end = start + piece; // 每次上傳的結尾位元組
  let chunks = []
  // console.log(file)
  while (start < totalSize) {
    // 根據長度擷取每次需要上傳的資料
    // File物件繼承自Blob物件，因此包含slice方法
    let blob = file.slice(start, end);
    chunks.push(blob)
    console.log(file)
    start = end;
    end = start + piece;
  }
  return chunks
}


return (
  <div>
    {/* <input
        type="file"
        accept = {[".csv.gz",".csv"]}
        onChange={(e) => {
          setCsvFile(e.target.files[0]);
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleFileUpload();
        }}
      >
        Submit
      </button> */}
    <form enctype="multipart/form-data">
      <input type="file"
        accept={[".csv.gz", ".csv"]}

        name="file" />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleFileUpload2();
        }}
      >試傳
      </button>
    </form>
    <br />
    {/* <DisplayTable value={csvArray} /> */}

  </div>
);
};

export default UploadPage;