import axios from "axios";
import React, { useState } from "react";
import "./table.css";
import { Space, Spin } from "antd";

import Popup from "../popup/Popup";

const Table = ({ data, setShow, show, fetchEmployees, loading }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [loadingRows, setLoadingRows] = useState([]);

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setShow("view");
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setShow("edit");
  };

  const handleDeleteClick = async (row) => {
    setLoadingRows((prevLoadingRows) => [...prevLoadingRows, row]);
    try {
      await axios.delete(`http://localhost:5000/api/books/${row._id}`);
      setLoadingRows((prevLoadingRows) =>
        prevLoadingRows.filter((loadingRow) => loadingRow !== row)
      );

      fetchEmployees();
    } catch (error) {
      setLoadingRows((prevLoadingRows) =>
        prevLoadingRows.filter((loadingRow) => loadingRow !== row)
      );
      console.log(error);
    }
  };

  return (
    <>
      {show === "view" && (
        <Popup
          setShow={setShow}
          show={show}
          rowData={selectedRow}
          fetchEmployees={fetchEmployees}
        />
      )}
      {show === "edit" && (
        <Popup
          setShow={setShow}
          show={show}
          rowData={selectedRow}
          fetchEmployees={fetchEmployees}
        />
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Summary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <Spin size="large" spinning={loading} />
          {data.length === 0 && !loading ? (
            <tr>
              <td>No records found!</td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                <td>{row.title}</td>
                <td className="tableEmail" style={{ overflowX: "scroll" }}>
                  {row.author}
                </td>
                <td>{row.summary}</td>

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
                    disabled={loadingRows.includes(row)}
                  >
                    {!loadingRows.includes(row) ? (
                      "Delete"
                    ) : (
                      <svg
                        className="spinner"
                        width="13"
                        height="14"
                        viewBox="0 0 13 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231 0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475 2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464 1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
                          stroke="white"
                        />
                      </svg>
                    )}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
