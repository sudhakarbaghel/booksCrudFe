import React, { useState } from "react";
import "./popup.css";
import callApi from "../../utills/callApi";
const BASE_URL='https://books-crud-be.vercel.app/api/books'
export default function Popup({ setShow, show, rowData, fetchEmployees }) {
  const { title, author, summary } = rowData || {};
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState({
    title: title || "",
    author: author || "",
    summary: summary || "",
  });

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const employee = {
      title: bookData.title,
      author: bookData.author,
      summary: bookData.summary,
    };

    if (
      isEmptyOrSpaces(employee.title) ||
      isEmptyOrSpaces(employee.author) ||
      isEmptyOrSpaces(employee.summary)
    ) {
      alert("Input fields cannot be empty or contain only spaces");
      setLoading(false);
      return;
    }

    try {
      if (show === "edit") {
        await callApi(
          "PUT",
          `${BASE_URL}/${rowData._id}`,
          employee
        );
      } else if (show === "add") {
        await callApi("POST", BASE_URL, employee);
      }
      setShow(false);
      fetchEmployees();
    } catch (error) {
      console.error("Submit Error:", error);
    }
    setLoading(false);
  };

  function isEmptyOrSpaces(str) {
    return str.trim() === "";
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="popupContainer">
      <div className="popup">
        <div className="popupHeading">
          {show === "edit" && <span>Edit Book</span>}
          {show === "view" && <span>View Book Data</span>}
          {show === "add" && <span>Add new Book</span>}
          <div onClick={() => setShow(false)}>{cancel}</div>
        </div>
        <form className="popupContent" onSubmit={handleSubmit}>
          <div className="popupInputWrap">
            {show === "edit" && <label htmlFor="">Title</label>}
            <input
              type="text"
              required
              placeholder="Enter title"
              readOnly={show === "view"}
              style={{
                backgroundColor: show === "view" ? "#ebeef0" : "",
                outline: show === "view" ? "none" : "",
              }}
              name="title"
              value={bookData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="popupInputWrap">
            {show === "edit" && <label htmlFor="">Author`s name</label>}
            <input
              required
              placeholder="Enter author's name"
              readOnly={show === "view"}
              style={{
                backgroundColor: show === "view" ? "#ebeef0" : "",
                outline: show === "view" ? "none" : "",
              }}
              name="author"
              value={bookData.author}
              onChange={handleInputChange}
            />
          </div>
          <div className="popupInputWrap">
            {show === "edit" && <label htmlFor="">Summary</label>}
            <textarea
              className="popupInputNumber"
              required
              placeholder="Write down the summary"
              readOnly={show === "view"}
              style={{
                backgroundColor: show === "view" ? "#ebeef0" : "",
                outline: show === "view" ? "none" : "",
                resize: "vertical",
                minHeight:70
              }}
              name="summary"
              value={bookData.summary}
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
                "Edit Book"
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
                "Add Book"
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

const cancel = (
  <svg
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
);
