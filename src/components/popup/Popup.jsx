import axios from "axios";
import React, { useState } from "react";
import "./popup.css";

export default function Popup({ setShow, show, rowData }) {
  const { name, email, number, nic, address } = rowData || {};
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
      setLoading(false);
      setShow(false);
      window.location.reload(false);
    } catch (error) {
      setLoading(false);
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
              disabled={loading}
            >
              {!loading ? (
                "Edit Employee"
              ) : (
                <div>
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
                  </svg>{" "}
                  Saving changes
                </div>
              )}
            </button>
          )}
          {show === "add" && (
            <button
              type="submit"
              disabled={loading}
              style={
                loading
                  ? { backgroundColor: "#83b998" } // Lighter color when loading is true
                  : { backgroundColor: "#459162" } // Default color when loading is false
              }
            >
              {!loading ? (
                "Add Employee"
              ) : (
                <div>
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
                  </svg>{" "}
                  Adding
                </div>
              )}
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
