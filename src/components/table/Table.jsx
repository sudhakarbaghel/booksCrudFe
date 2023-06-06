import React, { useState } from "react";
import "./table.css";
import axios from "axios";

import Popup from "../popup/Popup";

const Table = ({ data, setShow, show }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setShow("view");
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setShow("edit");
  };
  const handleDeleteClick = async (row) => {
    try {
      await axios.delete(`/employees/${row._id}`);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data)
  return (
    <>
      {show === "view" && (
        <Popup setShow={setShow} show={show} rowData={selectedRow} />
      )}
      {show === "edit" && (
        <Popup setShow={setShow} show={show} rowData={selectedRow} />
      )}
      {/* <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>NIC</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td className="tableEmail" style={{ overflowX: "scroll" }}>
                {row.email}
              </td>
              <td>{row.number}</td>
              <td>{row.nic}</td>
              <td>{row.address}</td>
              <td className="tableButtonWrapper">
                <button
                  className="TableView"
                  onClick={() => handleViewClick(row)}
                >
                  View
                </button>
                <button
                  className="TableEdit"
                  onClick={() => handleEditClick(row)}
                >
                  Edit
                </button>
                <button
                  className="TableDelete"
                  onClick={() => handleDeleteClick(row)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
};

export default Table;
