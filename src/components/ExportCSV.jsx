import React from "react";
import Papa from "papaparse";

export default function exportData({ xAxis, yAxis }) {

  const xValues = xAxis;
  const yValues = yAxis;

  const data = xValues.map((x, index) => ({
    x: x,
    y: yValues[index],
  }));

  // Function to handle the onClick event and downlaod the csv file
  function handleExportClick() {
    const csv = Papa.unparse(data);
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(csvData);
    link.setAttribute("download", "mydata.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <button
        onClick={handleExportClick}
        style={{
          backgroundColor: "yellow",
          border: "None",
          fontSize: "17px",
          padding: "7px 12px",
          borderRadius: "5px",
          margin: "15px 0 5px 15px",
          cursor: "pointer",
        }}
      >
        Export
      </button>
    </div>
  );
}