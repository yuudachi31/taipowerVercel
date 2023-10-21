import React from "react";
import { useState } from "react";
// import DisplayTable from "./DisplayTable";

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

  const handleFileUpload = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      processCSV(text);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv.gz"
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
      </button>
      <br />
      {/* <DisplayTable value={csvArray} /> */}
    </div>
  );
};

export default UploadPage;