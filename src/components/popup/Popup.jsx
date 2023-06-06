import axios from "axios";
import React, { useState } from "react";
import "./popup.css";

export default function Popup({ setShow, show, rowData }) {
  const { name, email, number, nic, address } = rowData || {};

  const [employeeData, setEmployeeData] = useState({
    name: name || "",
    email: email || "",
    number: number || "",
    nic: nic || "",
    address: address || "",
  });

  const callApi = async (method, url, data) => {
    try {
      const response = await axios({
        method,
        url,
        data,
      });

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw new Error("API Error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const employee = {
      name: employeeData.name,
      email: employeeData.email,
      number: employeeData.number,
      nic: employeeData.nic,
      address: employeeData.address,
    };
    try {
      if (show === "edit") {
        await callApi(
          "PUT",
          `https://employee-manager-backend-vrfr.vercel.app/api/employees/${rowData._id}`,
          employee
        );
      } else if (show === "add") {
        await callApi(
          "POST",
          "https://employee-manager-backend-vrfr.vercel.app/api/employees",
          employee
        );
      }
      setShow(false);
      window.location.reload(false);
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="popupContainer">
      <div className="popup">
        <div className="popupHeading">
          {show === "edit" && <span>Edit Employee</span>}
          {show === "view" && <span>View Employee Data</span>}
          {show === "add" && <span>Add new Employee</span>}
          <svg
            onClick={() => setShow(false)}
            width="30px"
            cursor="pointer"
            height="30px"
            viewBox="0 0 512 512"
            version="1.1"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>cancel</title>{" "}
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                {" "}
                <g
                  id="work-case"
                  fill="#979797"
                  transform="translate(91.520000, 91.520000)"
                >
                  {" "}
                  <polygon
                    id="Close"
                    points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"
                  >
                    {" "}
                  </polygon>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </div>
        <form className="popupContent" onSubmit={handleSubmit}>
          <div className="popupInputWrap">
            {show === "edit" && <label htmlFor="">Name</label>}
            <input
              type="text"
              required
              placeholder="Enter name"
              readOnly={show === "view"}
              style={{
                backgroundColor: show === "view" ? "#ebeef0" : "",
                outline: show === "view" ? "none" : "",
              }}
              name="name"
              value={employeeData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="popupInputWrap">
            {show === "edit" && <label htmlFor="">Email</label>}
            <input
              type="email"
              required
              placeholder="Enter email"
              readOnly={show === "view"}
              style={{
                backgroundColor: show === "view" ? "#ebeef0" : "",
                outline: show === "view" ? "none" : "",
              }}
              name="email"
              value={employeeData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="popupInputWrap">
            {show === "edit" && <label htmlFor="">Number</label>}
            <input
              type="number"
              className="popupInputNumber"
              required
              placeholder="Enter number"
              readOnly={show === "view"}
              style={{
                backgroundColor: show === "view" ? "#ebeef0" : "",
                outline: show === "view" ? "none" : "",
              }}
              name="number"
              value={employeeData.number}
              onChange={handleInputChange}
            />
          </div>
          <div className="popupInputWrap">
            {show === "edit" && <label htmlFor="">NIC</label>}
            <input
              type="text"
              required
              placeholder="Enter NIC"
              readOnly={show === "view"}
              style={{
                backgroundColor: show === "view" ? "#ebeef0" : "",
                outline: show === "view" ? "none" : "",
              }}
              name="nic"
              value={employeeData.nic}
              onChange={handleInputChange}
            />
          </div>
          <div className="popupInputWrap">
            {show === "edit" && <label htmlFor="">Address</label>}
            <input
              type="text"
              required
              placeholder="Enter address"
              readOnly={show === "view"}
              style={{
                backgroundColor: show === "view" ? "#ebeef0" : "",
                outline: show === "view" ? "none" : "",
              }}
              name="address"
              value={employeeData.address}
              onChange={handleInputChange}
            />
          </div>
          {show === "edit" && (
            <button
              type="submit"
              style={{ backgroundColor: "#feca11", color: "black" }}
            >
              Edit Employee
            </button>
          )}
          {show === "add" && (
            <button type="submit" style={{ backgroundColor: "#459162" }}>
              Add Employee
            </button>
          )}
        </form>
        <div className="popupBottom">
          <button onClick={() => setShow(false)}>Close</button>
        </div>
      </div>
    </div>
  );
}

 
